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
	case *parser.CreateViewStmt:
		return f.formatCreateView(s)
	case *parser.DeleteStmt:
		return f.formatDelete(s)
	case *parser.InsertStmt:
		return f.formatInsert(s)
	case *parser.UpdateStmt:
		return f.formatUpdate(s)
	case *parser.SetStmt:
		return f.formatSet(s)
	case *parser.MergeStmt:
		return f.formatMerge(s)
	case *parser.SelectStmt:
		return f.formatSelectStmt(s)
	}
	return ""
}

// writeExprPred writes a predicate expression as one indented line per AND term.
// It must be called immediately after the caller writes the keyword (WHERE,
// HAVING) on its own line. Single-term expressions produce one indented line.
// Multi-term AndChain expressions produce one line per term, all at the same
// indent level: the first term plain, subsequent terms prefixed with "and ".
func (f *formatter) writeExprPred(b *strings.Builder, e parser.Expr) {
	ind := f.indent()
	terms := parser.AndTerms(e)
	b.WriteString("\n" + ind + parser.Render(terms[0]))
	for _, term := range terms[1:] {
		b.WriteString("\n" + ind + f.kw("and") + " " + parser.Render(term))
	}
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
