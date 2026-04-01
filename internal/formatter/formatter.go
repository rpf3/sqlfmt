// Package formatter renders a parsed SQL AST back to formatted SQL text.
// It applies the style rules in a config.Config — keyword casing, indent
// style, and comma placement — to produce consistent, deterministic output.
//
// The public entry point is Format, which parses and formats input in one step.
// The internal formatter type provides kw(), indent(), and ident() helpers
// shared by all statement-specific formatters in the package.
package formatter

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/lexer"
	"github.com/rpf3/sqlfmt/internal/parser"
)

// Format takes raw SQL and returns formatted SQL using cfg to control style.
// It returns an error if the input cannot be parsed.
func Format(input string, cfg config.Config) (string, error) {
	result := parser.Parse(input)
	if len(result.Errors) > 0 {
		return "", result.Errors[0]
	}

	f := &formatter{cfg: cfg}
	var parts []string
	for _, stmt := range result.Statements {
		parts = append(parts, f.formatStatement(stmt))
	}
	return strings.Join(parts, "\n\n") + "\n", nil
}

// formatter holds configuration and provides all formatting methods.
type formatter struct {
	cfg config.Config
}

// kw transforms a canonical lowercase keyword phrase according to cfg.KeywordCase.
func (f *formatter) kw(s string) string {
	if f.cfg.KeywordCase == config.KeywordUpper {
		return strings.ToUpper(s)
	}
	return s
}

// ident formats a structured identifier field according to cfg.QuoteIdentifiers.
// It always strips surrounding [brackets] or "double-quotes" first.
// When QuoteIdentifiers is true (or when the bare name requires quoting), the
// result is wrapped in [square brackets] with ] escaped as ]]. Otherwise the
// bare name is returned as-is.
func (f *formatter) ident(name string) string {
	raw := lexer.UnquoteIdent(name)
	if f.cfg.QuoteIdentifiers || lexer.NeedsQuoting(raw) {
		return "[" + strings.ReplaceAll(raw, "]", "]]") + "]"
	}
	return raw
}

// indent returns the configured indentation string (tab or spaces).
func (f *formatter) indent() string {
	if f.cfg.IndentStyle == config.IndentSpaces {
		return strings.Repeat(" ", f.cfg.IndentWidth)
	}
	return "\t"
}

func (f *formatter) formatStatement(stmt parser.Statement) string {
	switch s := stmt.(type) {
	case *parser.CreateTableStmt:
		return f.formatCreateTable(s)
	case *parser.CreateIndexStmt:
		return f.formatCreateIndex(s)
	case *parser.AlterTableStmt:
		return f.formatAlterTable(s)
	case *parser.DropStmt:
		return f.formatDrop(s)
	case *parser.TruncateStmt:
		return f.formatTruncate(s)
	case *parser.CreateSchemaStmt:
		return f.formatCreateSchema(s)
	case *parser.CreateViewStmt:
		return f.formatCreateView(s)
	case *parser.CreateTypeStmt:
		return f.formatCreateType(s)
	case *parser.CreateProcStmt:
		return f.formatCreateProc(s)
	case *parser.CreateFuncStmt:
		return f.formatCreateFunc(s)
	case *parser.DeleteStmt:
		return f.formatDelete(s)
	case *parser.InsertStmt:
		return f.formatInsert(s)
	case *parser.UpdateStmt:
		return f.formatUpdate(s)
	case *parser.SetStmt:
		return f.formatSet(s)
	case *parser.SetVarStmt:
		return f.formatSetVar(s)
	case *parser.DeclareStmt:
		return f.formatDeclare(s)
	case *parser.MergeStmt:
		return f.formatMerge(s)
	case *parser.SelectStmt:
		return f.formatSelectStmt(s)
	case *parser.IfStmt:
		return f.formatIf(s)
	case *parser.WhileStmt:
		return f.formatWhile(s)
	case *parser.TryCatchStmt:
		return f.formatTryCatch(s)
	case *parser.UseStmt:
		return f.formatUse(s)
	case *parser.BreakStmt:
		return f.formatBreak()
	case *parser.ContinueStmt:
		return f.formatContinue()
	case *parser.ReturnStmt:
		return f.formatReturn(s)
	case *parser.ThrowStmt:
		return f.formatThrow(s)
	case *parser.RaiserrorStmt:
		return f.formatRaiserror(s)
	case *parser.PrintStmt:
		return f.formatPrint(s)
	case *parser.ExecStmt:
		return f.formatExec(s)
	case *parser.ExecuteAsStmt:
		return f.formatExecuteAs(s)
	case *parser.RevertStmt:
		return f.formatRevert()
	case *parser.DeclareCursorStmt:
		return f.formatDeclareCursor(s)
	case *parser.OpenCursorStmt:
		return f.formatOpenCursor(s)
	case *parser.CloseCursorStmt:
		return f.formatCloseCursor(s)
	case *parser.DeallocateCursorStmt:
		return f.formatDeallocateCursor(s)
	case *parser.FetchCursorStmt:
		return f.formatFetchCursor(s)
	case *parser.TransactionStmt:
		return f.formatTransaction(s)
	case *parser.RawStmt:
		return s.Text + ";"
	}
	return ""
}

// writeExprPred writes a predicate expression as one indented line per AND term.
// It must be called immediately after the caller writes the keyword (WHERE,
// HAVING) on its own line. Single-term expressions produce one indented line.
// Multi-term AndChain expressions produce one line per term, all at the same
// indent level: the first term plain, subsequent terms prefixed with "and ".
// Terms that match an IN (list) pattern are expanded into a vertical paren block.
func (f *formatter) writeExprPred(b *strings.Builder, e parser.Expr) {
	ind := f.indent()
	terms := parser.AndTerms(e)
	for i, term := range terms {
		rendered := parser.Render(term)
		lhs, inKw, items, isInList := splitInList(rendered)
		var prefix string
		if i == 0 {
			prefix = "\n" + ind
		} else {
			prefix = "\n" + ind + f.kw("and") + " "
		}
		if isInList {
			b.WriteString(prefix + lhs + " " + f.kw(inKw))
			f.writeInListBlock(b, items)
		} else {
			b.WriteString(prefix + rendered)
		}
	}
}

// splitInList detects an "expr IN (item, ...)" or "expr NOT IN (item, ...)"
// pattern in a rendered expression string. Returns the LHS, the keyword phrase
// ("in" or "not in"), and the trimmed items. Returns ok=false if the string
// does not match or if the parens contain a subquery.
func splitInList(text string) (lhs, kw string, items []string, ok bool) {
	lower := strings.ToLower(text)
	var afterKw int
	if i := strings.Index(lower, " not in ("); i >= 0 {
		lhs = text[:i]
		kw = "not in"
		afterKw = i + len(" not in (")
	} else if i := strings.Index(lower, " in ("); i >= 0 {
		lhs = text[:i]
		kw = "in"
		afterKw = i + len(" in (")
	} else {
		return "", "", nil, false
	}
	if !strings.HasSuffix(text, ")") {
		return "", "", nil, false
	}
	body := text[afterKw : len(text)-1]
	if strings.Contains(strings.ToLower(body), "select") {
		return "", "", nil, false
	}
	return lhs, kw, splitDepthZeroCommas(body), true
}

// splitDepthZeroCommas splits s on commas at parenthesis depth 0, trimming
// whitespace from each resulting part. It is used wherever a parenthetical
// comma-separated list needs to be expanded into individual items.
func splitDepthZeroCommas(s string) []string {
	var parts []string
	depth, start := 0, 0
	for i, ch := range s {
		switch ch {
		case '(':
			depth++
		case ')':
			depth--
		case ',':
			if depth == 0 {
				parts = append(parts, strings.TrimSpace(s[start:i]))
				start = i + 1
			}
		}
	}
	return append(parts, strings.TrimSpace(s[start:]))
}

// writeInListBlock writes an IN list as a vertical paren block at the current
// indent level. Opening ( and closing ) sit at ind; items are at ind+ind with
// the leading comma placed at ind to align with the parens.
func (f *formatter) writeInListBlock(b *strings.Builder, items []string) {
	ind := f.indent()
	b.WriteString("\n" + ind + "(")
	for i, item := range items {
		b.WriteString("\n")
		if f.cfg.CommaStyle == config.CommaTrailing {
			b.WriteString(ind + ind + item)
			if i < len(items)-1 {
				b.WriteString(",")
			}
		} else {
			// leading comma: align comma at ind, value at ind+ind
			if i == 0 {
				b.WriteString(ind + ind + item)
			} else {
				b.WriteString(ind + "," + ind + item)
			}
		}
	}
	b.WriteString("\n" + ind + ")")
}

// writeCommaList writes a list of pre-formatted items to b using the configured
// comma style. Each item is placed on its own line with one level of indentation.
func (f *formatter) writeCommaList(b *strings.Builder, items []string) {
	ind := f.indent()
	for i, item := range items {
		b.WriteString("\n")
		if f.cfg.CommaStyle == config.CommaTrailing {
			b.WriteString(ind)
			b.WriteString(item)
			if i < len(items)-1 {
				b.WriteString(",")
			}
		} else {
			// leading comma
			if i == 0 {
				b.WriteString(ind)
			} else {
				b.WriteString("," + ind)
			}
			b.WriteString(item)
		}
	}
}
