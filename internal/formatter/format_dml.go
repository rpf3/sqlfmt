package formatter

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/parser"
)

// writeOutputClause writes an OUTPUT clause into b.
// The keyword sits on its own line; columns are indented one level via
// writeCommaList — matching the style used for SELECT column lists.
// An optional INTO <var> [(cols)] follows on its own line.
func (f *formatter) writeOutputClause(b *strings.Builder, out *parser.OutputClause) {
	if out == nil {
		return
	}
	ind := f.indent()
	b.WriteString("\n" + f.kw("output"))
	cols := make([]string, len(out.Columns))
	for i, col := range out.Columns {
		s := parser.Render(col.Value)
		if col.Alias != "" {
			s += " " + f.kw("as") + " " + col.Alias
		}
		cols[i] = s
	}
	f.writeCommaList(b, cols)
	if out.Into != "" {
		b.WriteString("\n" + ind + f.kw("into") + " " + out.Into)
		if len(out.IntoCols) > 0 {
			b.WriteString("\n(")
			f.writeCommaList(b, out.IntoCols)
			b.WriteString("\n)")
		}
	}
}

func (f *formatter) formatInsert(s *parser.InsertStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("insert into "))
	b.WriteString(f.ident(s.Table))

	// Optional column list: vertical block, same comma style as SELECT columns.
	if len(s.Columns) > 0 {
		b.WriteString("\n(")
		f.writeCommaList(&b, s.Columns)
		b.WriteString("\n)")
	}

	f.writeOutputClause(&b, s.Output)

	if s.Select != nil {
		b.WriteString("\n")
		b.WriteString(f.formatSelectStmt(s.Select))
		return b.String() // formatSelectStmt supplies the trailing ";"
	}

	// VALUES form — each row is a vertical block; rows separated by trailing ","
	b.WriteString("\n")
	b.WriteString(f.kw("values"))
	for i, row := range s.Values {
		b.WriteString("\n(")
		rowStrs := make([]string, len(row))
		for j, v := range row {
			rowStrs[j] = parser.Render(v)
		}
		f.writeCommaList(&b, rowStrs)
		b.WriteString("\n)")
		if i < len(s.Values)-1 {
			b.WriteString(",") // structural row separator, not a list comma
		}
	}
	b.WriteString(";")
	return b.String()
}

func (f *formatter) formatUpdate(s *parser.UpdateStmt) string {
	ind := f.indent()
	var b strings.Builder
	b.WriteString(f.kw("update"))
	if s.Top != "" {
		b.WriteString(" " + f.kw("top") + " (" + s.Top + ")")
	}
	b.WriteString("\n")
	b.WriteString(ind)
	b.WriteString(f.ident(s.Target))

	b.WriteString("\n")
	b.WriteString(f.kw("set"))

	setStrs := make([]string, len(s.Sets))
	for i, set := range s.Sets {
		setStrs[i] = set.Column + " = " + parser.Render(set.Value)
	}
	f.writeCommaList(&b, setStrs)

	if s.From != nil {
		b.WriteString("\n")
		b.WriteString(f.kw("from"))
		b.WriteString("\n")
		b.WriteString(ind)
		b.WriteString(f.ident(s.From.Name))
		if s.From.Alias != "" {
			b.WriteString(f.kw(" as "))
			b.WriteString(f.ident(s.From.Alias))
		}
		for _, jc := range s.From.Joins {
			b.WriteString("\n" + f.kw(joinKeyword(jc.Type)))
			b.WriteString("\n" + ind + f.ident(jc.Name))
			if jc.Alias != "" {
				b.WriteString(" " + f.kw("as") + " " + f.ident(jc.Alias))
			}
			if jc.On != nil {
				terms := parser.AndTerms(jc.On)
				b.WriteString("\n" + ind + ind + f.kw("on") + " " + parser.Render(terms[0]))
				for _, term := range terms[1:] {
					b.WriteString("\n" + ind + ind + f.kw("and") + " " + parser.Render(term))
				}
			}
		}
	}

	f.writeOutputClause(&b, s.Output)

	if s.Where != nil {
		b.WriteString("\n" + f.kw("where"))
		f.writeExprPred(&b, s.Where)
	}
	b.WriteString(";")
	return b.String()
}

func (f *formatter) formatDelete(s *parser.DeleteStmt) string {
	ind := f.indent()
	var b strings.Builder
	topClause := ""
	if s.Top != "" {
		topClause = " " + f.kw("top") + " (" + s.Top + ")"
	}
	if s.Alias != "" {
		// Multi-line form: DELETE [TOP (n)] <alias> FROM <table> AS <alias>
		b.WriteString(f.kw("delete") + topClause)
		b.WriteString("\n")
		b.WriteString(ind)
		b.WriteString(f.ident(s.Alias))
		b.WriteString("\n")
		b.WriteString(f.kw("from"))
		b.WriteString("\n")
		b.WriteString(ind)
		b.WriteString(f.ident(s.Table))
		b.WriteString(f.kw(" as "))
		b.WriteString(f.ident(s.Alias))
	} else if s.Where != nil {
		// No alias but WHERE present: table on its own line for readability
		b.WriteString(f.kw("delete") + topClause + " " + f.kw("from"))
		b.WriteString("\n")
		b.WriteString(ind)
		b.WriteString(f.ident(s.Table))
	} else {
		// No alias, no WHERE: compact single line
		b.WriteString(f.kw("delete") + topClause + " " + f.kw("from "))
		b.WriteString(f.ident(s.Table))
	}
	f.writeOutputClause(&b, s.Output)

	if s.Where != nil {
		b.WriteString("\n" + f.kw("where"))
		f.writeExprPred(&b, s.Where)
	}
	b.WriteString(";")
	return b.String()
}

// writeMergeWhenClause renders a single WHEN … THEN … clause into b.
func (f *formatter) writeMergeWhenClause(b *strings.Builder, clause parser.MergeWhenClause) {
	ind := f.indent()

	switch clause.MatchType {
	case parser.MergeMatched:
		b.WriteString(f.kw("when matched"))
	case parser.MergeNotMatchedByTarget:
		b.WriteString(f.kw("when not matched"))
	case parser.MergeNotMatchedBySource:
		b.WriteString(f.kw("when not matched by source"))
	}

	if clause.Condition != nil {
		// AND condition in a paren block; "then" on its own line.
		b.WriteString(f.kw(" and"))
		b.WriteString("\n(")
		b.WriteString("\n" + ind + parser.Render(clause.Condition))
		b.WriteString("\n)")
		b.WriteString("\n" + f.kw("then"))
	} else {
		b.WriteString(f.kw(" then"))
	}

	switch clause.Action {
	case parser.MergeActionDelete:
		b.WriteString(f.kw(" delete"))

	case parser.MergeActionUpdate:
		b.WriteString(f.kw(" update set"))
		for i, set := range clause.Sets {
			item := set.Column + " = " + parser.Render(set.Value)
			if i == 0 {
				b.WriteString("\n" + ind + item)
			} else {
				b.WriteString("\n,\t" + item)
			}
		}

	case parser.MergeActionInsert:
		b.WriteString(f.kw(" insert"))
		if len(clause.Columns) > 0 {
			b.WriteString("\n(")
			for i, col := range clause.Columns {
				if i == 0 {
					b.WriteString("\n" + ind + col)
				} else {
					b.WriteString("\n,\t" + col)
				}
			}
			b.WriteString("\n)")
		}
		b.WriteString("\n" + f.kw("values"))
		b.WriteString("\n(")
		for i, val := range clause.Values {
			if i == 0 {
				b.WriteString("\n" + ind + parser.Render(val))
			} else {
				b.WriteString("\n,\t" + parser.Render(val))
			}
		}
		b.WriteString("\n)")
	}
}

func (f *formatter) formatMerge(s *parser.MergeStmt) string {
	ind := f.indent()
	var b strings.Builder

	// merge into <target> [as <alias>]
	b.WriteString(f.kw("merge into ") + f.ident(s.Target))
	if s.TargetAlias != "" {
		b.WriteString(f.kw(" as ") + f.ident(s.TargetAlias))
	}

	// using <source> [as <alias>]
	if s.Source.Subquery != nil {
		// Subquery: "using" appended to target line; paren block at root level
		// with single-indented body (same depth as a CTE body).
		b.WriteString(" " + f.kw("using"))
		b.WriteString("\n(")
		b.WriteString("\n" + f.indentCTE(s.Source.Subquery))
		b.WriteString("\n)")
		if s.Source.Alias != "" {
			b.WriteString(f.kw(" as ") + f.ident(s.Source.Alias))
		}
	} else {
		b.WriteString("\n" + f.kw("using ") + f.ident(s.Source.Name))
		if s.Source.Alias != "" {
			b.WriteString(f.kw(" as ") + f.ident(s.Source.Alias))
		}
	}

	// on condition — always wrapped in a paren block for readability
	b.WriteString("\n" + f.kw("on"))
	b.WriteString("\n(")
	b.WriteString("\n" + ind + parser.Render(s.On))
	b.WriteString("\n)")

	for _, clause := range s.Clauses {
		b.WriteString("\n")
		f.writeMergeWhenClause(&b, clause)
	}

	f.writeOutputClause(&b, s.Output)

	b.WriteString(";")
	return b.String()
}
