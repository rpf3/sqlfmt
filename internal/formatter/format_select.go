package formatter

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

// indentBodyStmt formats a procedure/function body statement with each
// non-empty line prefixed by ind (single indent). The trailing semicolon
// from formatStatement is preserved as-is.
func (f *formatter) indentBodyStmt(stmt parser.Statement) string {
	inner := f.formatStatement(stmt)
	prefix := f.indent()
	lines := strings.Split(inner, "\n")
	var b strings.Builder
	for i, line := range lines {
		if i > 0 {
			b.WriteString("\n")
		}
		if line != "" {
			b.WriteString(prefix + line)
		}
	}
	return b.String()
}

// indentCTE formats s as a SELECT body with each non-empty line prefixed by
// ind (single indent). Used for CTE bodies where the surrounding ( ) are at
// column zero.
func (f *formatter) indentCTE(s *parser.SelectStmt) string {
	inner := f.formatSelectStmt(s)
	inner = strings.TrimSuffix(inner, ";")
	prefix := f.indent()
	lines := strings.Split(inner, "\n")
	var b strings.Builder
	for i, line := range lines {
		if i > 0 {
			b.WriteString("\n")
		}
		if line != "" {
			b.WriteString(prefix + line)
		}
	}
	return b.String()
}

// indentSubquery formats s as a SELECT body with each non-empty line
// prefixed by ind+ind (double indent). The surrounding ( ) delimiters and
// any alias are the caller's responsibility.
func (f *formatter) indentSubquery(s *parser.SelectStmt) string {
	inner := f.formatSelectStmt(s)
	inner = strings.TrimSuffix(inner, ";")
	prefix := f.indent() + f.indent()
	lines := strings.Split(inner, "\n")
	var b strings.Builder
	for i, line := range lines {
		if i > 0 {
			b.WriteString("\n")
		}
		if line != "" {
			b.WriteString(prefix + line)
		}
	}
	return b.String()
}

func (f *formatter) formatSelectStmt(s *parser.SelectStmt) string {
	ind := f.indent()
	var b strings.Builder

	// WITH clause (CTEs)
	for i, cte := range s.CTEs {
		if i == 0 {
			b.WriteString(f.kw("with") + " " + f.ident(cte.Name) + " " + f.kw("as"))
		} else if f.cfg.CommaStyle == config.CommaTrailing {
			b.WriteString(f.ident(cte.Name) + " " + f.kw("as"))
		} else {
			// leading comma: ", name as"
			b.WriteString(", " + f.ident(cte.Name) + " " + f.kw("as"))
		}
		b.WriteString("\n(\n")
		b.WriteString(f.indentCTE(cte.Select))
		// close paren with comma separator between CTEs
		if i < len(s.CTEs)-1 && f.cfg.CommaStyle == config.CommaTrailing {
			b.WriteString("\n),\n")
		} else {
			b.WriteString("\n)\n")
		}
	}

	// SELECT [DISTINCT]
	if s.Distinct {
		b.WriteString(f.kw("select distinct"))
	} else {
		b.WriteString(f.kw("select"))
	}

	// SELECT list
	cols := make([]string, 0, len(s.Columns))
	for _, col := range s.Columns {
		c := parser.Render(col.Value)
		if col.Alias != "" {
			c += " " + f.kw("as") + " " + f.ident(col.Alias)
		}
		cols = append(cols, c)
	}
	f.writeCommaList(&b, cols)

	// FROM
	b.WriteString("\n" + f.kw("from"))
	if s.From.Subquery != nil {
		b.WriteString("\n" + ind + "(")
		b.WriteString("\n" + f.indentSubquery(s.From.Subquery))
		b.WriteString("\n" + ind + ")")
		if s.From.Alias != "" {
			b.WriteString(" " + f.kw("as") + " " + f.ident(s.From.Alias))
		}
	} else {
		b.WriteString("\n" + ind)
		b.WriteString(f.ident(s.From.Name))
		if s.From.Alias != "" {
			b.WriteString(" " + f.kw("as") + " " + f.ident(s.From.Alias))
		}
	}

	// JOINs
	for _, jc := range s.Joins {
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
		} else if len(jc.Using) > 0 {
			b.WriteString("\n" + ind + ind + f.kw("using") + " (" + strings.Join(jc.Using, ", ") + ")")
		}
	}

	// WHERE
	if s.Where != nil {
		b.WriteString("\n" + f.kw("where"))
		f.writeExprPred(&b, s.Where)
	} else if s.WhereSubq != nil {
		b.WriteString("\n" + f.kw("where"))
		if s.WherePred != "" {
			b.WriteString("\n" + ind + s.WherePred)
		}
		b.WriteString("\n" + ind + "(")
		b.WriteString("\n" + f.indentSubquery(s.WhereSubq))
		b.WriteString("\n" + ind + ")")
	}

	// GROUP BY
	if len(s.GroupBy) > 0 {
		b.WriteString("\n" + f.kw("group by"))
		groupByStrs := make([]string, len(s.GroupBy))
		for i, g := range s.GroupBy {
			groupByStrs[i] = parser.Render(g)
		}
		f.writeCommaList(&b, groupByStrs)
	}

	// HAVING
	if s.Having != nil {
		b.WriteString("\n" + f.kw("having"))
		f.writeExprPred(&b, s.Having)
	}

	// Set operations: UNION [ALL] / INTERSECT / EXCEPT
	for _, setOp := range s.SetOps {
		b.WriteString("\n" + f.kw(setOpKeyword(setOp.Op)))
		branch := f.formatSelectStmt(setOp.Select)
		branch = strings.TrimSuffix(branch, ";")
		b.WriteString("\n" + branch)
	}

	// ORDER BY
	if len(s.OrderBy) > 0 {
		b.WriteString("\n" + f.kw("order by"))
		orderItems := make([]string, 0, len(s.OrderBy))
		for _, item := range s.OrderBy {
			oi := parser.Render(item.Value)
			switch item.Direction {
			case parser.DirectionDesc:
				oi += " " + f.kw("desc")
			case parser.DirectionAsc:
				oi += " " + f.kw("asc")
			}
			orderItems = append(orderItems, oi)
		}
		f.writeCommaList(&b, orderItems)
	}

	// OFFSET n ROWS
	if s.Offset != "" {
		b.WriteString("\n" + f.kw("offset"))
		b.WriteString("\n" + ind + s.Offset + " " + f.kw("rows"))
	}

	// FETCH NEXT n ROWS ONLY
	if s.Fetch != "" {
		b.WriteString("\n" + f.kw("fetch next"))
		b.WriteString("\n" + ind + s.Fetch + " " + f.kw("rows only"))
	}

	// LIMIT n (non-ANSI; lint rule #35 warns about this)
	if s.Limit != "" {
		b.WriteString("\n" + f.kw("limit"))
		b.WriteString("\n" + ind + s.Limit)
	}

	b.WriteString(";")
	return b.String()
}

// setOpKeyword returns the canonical lowercase keyword phrase for a SetOpType.
func setOpKeyword(op parser.SetOpType) string {
	switch op {
	case parser.SetOpUnion:
		return "union"
	case parser.SetOpUnionAll:
		return "union all"
	case parser.SetOpIntersect:
		return "intersect"
	case parser.SetOpExcept:
		return "except"
	}
	return "union"
}

// joinKeyword returns the canonical lowercase keyword phrase for a JoinType.
// Bare JOIN and INNER JOIN both normalise to "inner join".
// LEFT/RIGHT OUTER JOIN normalises to "left join"/"right join" (OUTER omitted).
func joinKeyword(jt parser.JoinType) string {
	switch jt {
	case parser.JoinInner:
		return "inner join"
	case parser.JoinLeft:
		return "left join"
	case parser.JoinRight:
		return "right join"
	case parser.JoinFullOuter:
		return "full outer join"
	case parser.JoinCross:
		return "cross join"
	}
	return "join"
}
