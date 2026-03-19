package formatter

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

// formatExpr renders an expression, applying block-style formatting for window
// function OVER clauses. The spec (PARTITION BY, ORDER BY, frame) is placed on
// its own indented line inside the parentheses rather than inline:
//
//	fn() over (
//		partition by x order by y rows between …
//	)
//
// All other expression types fall through to parser.Render.
func (f *formatter) formatExpr(e parser.Expr) string {
	fn, ok := e.(*parser.FunctionCallExpr)
	if !ok || fn.Over == nil {
		return parser.Render(e)
	}

	// Build the function-call portion (without OVER).
	var fnStr string
	if fn.Star {
		fnStr = fn.Name + "(*)"
	} else {
		args := make([]string, len(fn.Args))
		for i, a := range fn.Args {
			args[i] = parser.Render(a)
		}
		fnStr = fn.Name + "(" + strings.Join(args, ", ") + ")"
	}

	// Named window reference: render inline without a block.
	if fn.Over.Ref != "" {
		return fnStr + " " + f.kw("over") + " " + fn.Over.Ref
	}

	// Build OVER spec parts with keyword casing applied.
	var overParts []string
	if len(fn.Over.PartitionBy) > 0 {
		parts := make([]string, len(fn.Over.PartitionBy))
		for i, pb := range fn.Over.PartitionBy {
			parts[i] = parser.Render(pb)
		}
		overParts = append(overParts, f.kw("partition by")+" "+strings.Join(parts, ", "))
	}
	if len(fn.Over.OrderBy) > 0 {
		items := make([]string, len(fn.Over.OrderBy))
		for i, ob := range fn.Over.OrderBy {
			s := parser.Render(ob.Value)
			switch ob.Direction {
			case parser.DirectionAsc:
				s += " " + f.kw("asc")
			case parser.DirectionDesc:
				s += " " + f.kw("desc")
			case parser.DirectionNone:
				// no direction keyword
			}
			items[i] = s
		}
		overParts = append(overParts, f.kw("order by")+" "+strings.Join(items, ", "))
	}
	if fn.Over.FrameUnit != "" {
		frame := f.kw(fn.Over.FrameUnit)
		if fn.Over.FrameEnd != "" {
			frame += " " + f.kw("between") + " " + f.kw(fn.Over.FrameStart) +
				" " + f.kw("and") + " " + f.kw(fn.Over.FrameEnd)
		} else {
			frame += " " + f.kw(fn.Over.FrameStart)
		}
		overParts = append(overParts, frame)
	}

	spec := strings.Join(overParts, " ")
	ind := f.indent()
	if spec == "" {
		return fnStr + " " + f.kw("over") + " ()"
	}
	return fnStr + " " + f.kw("over") + " (\n" + ind + ind + spec + "\n" + ind + ")"
}

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

// writeValuesSource writes a VALUES(...) derived-table source into b.
// The opening ( sits on its own line at root level (following the from/join
// keyword line); the values keyword and each row paren are indented one level
// via writeInListBlock; the closing ) as alias and optional column-alias list
// follow at root level.
func (f *formatter) writeValuesSource(b *strings.Builder, rows [][]parser.Expr, alias string, cols []string) {
	ind := f.indent()
	b.WriteString("\n(")
	b.WriteString("\n" + ind + f.kw("values"))
	for i, row := range rows {
		rowStrs := make([]string, len(row))
		for j, v := range row {
			rowStrs[j] = parser.Render(v)
		}
		f.writeInListBlock(b, rowStrs)
		if i < len(rows)-1 {
			b.WriteString(",")
		}
	}
	b.WriteString("\n)")
	if alias != "" {
		b.WriteString(" " + f.kw("as") + " " + f.ident(alias))
	}
	if len(cols) > 0 {
		b.WriteString("\n(")
		f.writeCommaList(b, cols)
		b.WriteString("\n)")
	}
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

// writeCTEList renders a WITH clause (one or more CTEs) into b.
// recursive is only meaningful for SELECT; DML callers pass false.
func (f *formatter) writeCTEList(b *strings.Builder, ctes []parser.CTEDef, recursive bool) {
	for i, cte := range ctes {
		switch {
		case i == 0:
			withKw := f.kw("with")
			if recursive {
				withKw = f.kw("with recursive")
			}
			b.WriteString(withKw + " " + f.ident(cte.Name) + " " + f.kw("as"))
		case f.cfg.CommaStyle == config.CommaTrailing:
			b.WriteString(f.ident(cte.Name) + " " + f.kw("as"))
		default:
			b.WriteString(", " + f.ident(cte.Name) + " " + f.kw("as"))
		}
		b.WriteString("\n(\n")
		b.WriteString(f.indentCTE(cte.Select))
		if i < len(ctes)-1 && f.cfg.CommaStyle == config.CommaTrailing {
			b.WriteString("\n),\n")
		} else {
			b.WriteString("\n)\n")
		}
	}
}

func (f *formatter) formatSelectStmt(s *parser.SelectStmt) string {
	ind := f.indent()
	var b strings.Builder

	// WITH clause (CTEs)
	f.writeCTEList(&b, s.CTEs, s.Recursive)

	// SELECT [DISTINCT] [TOP (...) [PERCENT] [WITH TIES]]
	if s.Distinct {
		b.WriteString(f.kw("select distinct"))
	} else {
		b.WriteString(f.kw("select"))
	}
	if s.Top != "" {
		top := " " + f.kw("top") + " (" + s.Top + ")"
		if s.TopPercent {
			top += " " + f.kw("percent")
		}
		if s.TopWithTies {
			top += " " + f.kw("with ties")
		}
		b.WriteString(top)
	}

	// SELECT list
	cols := make([]string, 0, len(s.Columns))
	for _, col := range s.Columns {
		c := f.formatExpr(col.Value)
		if col.Alias != "" {
			c += " " + f.kw("as") + " " + f.ident(col.Alias)
		}
		cols = append(cols, c)
	}

	hasFrom := s.From.Name != "" || s.From.Subquery != nil || len(s.From.ValuesRows) > 0

	// No-FROM SELECT: single column stays on the same line (e.g. "select 1;").
	// When INTO is present the column list uses the normal multi-line style
	// so the INTO clause is consistently indented below it.
	if !hasFrom {
		if len(cols) == 1 && s.Into == "" {
			b.WriteString(" " + cols[0])
		} else {
			f.writeCommaList(&b, cols)
		}
		if s.Into != "" {
			b.WriteString("\n" + f.kw("into"))
			b.WriteString("\n" + ind + f.ident(s.Into))
		}
		b.WriteString(";")
		return b.String()
	}
	f.writeCommaList(&b, cols)
	// INTO clause (SELECT INTO) appears between column list and FROM.
	if s.Into != "" {
		b.WriteString("\n" + f.kw("into"))
		b.WriteString("\n" + ind + f.ident(s.Into))
	}
	b.WriteString("\n" + f.kw("from"))
	if s.From.Subquery != nil {
		b.WriteString("\n" + ind + "(")
		b.WriteString("\n" + f.indentSubquery(s.From.Subquery))
		b.WriteString("\n" + ind + ")")
		if s.From.Alias != "" {
			b.WriteString(" " + f.kw("as") + " " + f.ident(s.From.Alias))
		}
	} else if len(s.From.ValuesRows) > 0 {
		f.writeValuesSource(&b, s.From.ValuesRows, s.From.Alias, s.From.ValuesCols)
	} else {
		b.WriteString("\n" + ind)
		b.WriteString(f.ident(s.From.Name))
		if s.From.TVFArgs != "" {
			b.WriteString(s.From.TVFArgs)
		}
		if s.From.Pivot != nil {
			b.WriteString(f.formatPivot(s.From.Pivot))
		}
		if s.From.Alias != "" {
			b.WriteString(" " + f.kw("as") + " " + f.ident(s.From.Alias))
		}
		if s.From.Hints != "" {
			b.WriteString(" " + f.kw("with") + " " + strings.ToLower(s.From.Hints))
		}
	}

	// JOINs
	for _, jc := range s.Joins {
		b.WriteString("\n" + f.kw(joinKeyword(jc.Type)))
		if jc.Subquery != nil {
			// APPLY (SELECT ...) subquery source
			b.WriteString("\n" + ind + "(")
			b.WriteString("\n" + f.indentSubquery(jc.Subquery))
			b.WriteString("\n" + ind + ")")
			if jc.Alias != "" {
				b.WriteString(" " + f.kw("as") + " " + f.ident(jc.Alias))
			}
		} else if len(jc.ValuesRows) > 0 {
			f.writeValuesSource(&b, jc.ValuesRows, jc.Alias, jc.ValuesCols)
			if jc.On != nil {
				terms := parser.AndTerms(jc.On)
				b.WriteString("\n" + ind + f.kw("on") + " " + parser.Render(terms[0]))
				for _, term := range terms[1:] {
					b.WriteString("\n" + ind + f.kw("and") + " " + parser.Render(term))
				}
			}
		} else {
			b.WriteString("\n" + ind + f.ident(jc.Name))
			if jc.TVFArgs != "" {
				b.WriteString(jc.TVFArgs)
			}
			if jc.Alias != "" {
				b.WriteString(" " + f.kw("as") + " " + f.ident(jc.Alias))
			}
			if jc.Hints != "" {
				b.WriteString(" " + f.kw("with") + " " + strings.ToLower(jc.Hints))
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
		// Single modifier with no other items: keyword on the "group by" line,
		// arguments indented on the next line (e.g. "group by rollup\n\t(a, b)").
		if len(s.GroupBy) == 1 && s.GroupBy[0].Modifier != parser.GroupBySimple && s.GroupBy[0].Modifier != parser.GroupByGrandTotal {
			item := s.GroupBy[0]
			b.WriteString(" " + f.kw(groupByModKeyword(item.Modifier)))
			b.WriteString("\n" + ind + item.RawArgs)
		} else {
			groupByStrs := make([]string, len(s.GroupBy))
			for i, item := range s.GroupBy {
				if item.Modifier == parser.GroupBySimple {
					groupByStrs[i] = parser.Render(item.Expr)
				} else {
					groupByStrs[i] = f.kw(groupByModKeyword(item.Modifier)) + item.RawArgs
				}
			}
			f.writeCommaList(&b, groupByStrs)
		}
	}

	// HAVING
	if s.Having != nil {
		b.WriteString("\n" + f.kw("having"))
		f.writeExprPred(&b, s.Having)
	}

	// WINDOW clause
	for i, w := range s.Windows {
		if i == 0 {
			b.WriteString("\n" + f.kw("window") + " " + f.ident(w.Name) + " " + f.kw("as"))
		} else {
			b.WriteString(",\n" + f.ident(w.Name) + " " + f.kw("as"))
		}
		b.WriteString("\n(\n" + ind + w.Spec + "\n)")
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
			case parser.DirectionNone:
				// no direction keyword
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

	// FOR XML / FOR JSON
	if s.ForKind != parser.ForNone {
		if s.ForKind == parser.ForXML {
			b.WriteString("\n" + f.kw("for xml"))
		} else {
			b.WriteString("\n" + f.kw("for json"))
		}
		if s.ForOpts != "" {
			b.WriteString("\n" + ind + strings.ToLower(s.ForOpts))
		}
	}

	f.writeOptionClause(&b, s.Option)

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

// formatPivot renders a PIVOT or UNPIVOT operator as:
//
//	pivot
//	(
//		<value>
//		for <col>
//		in (<col_list>)
//	)
//
// The trailing alias is written by the caller.
func (f *formatter) formatPivot(p *parser.PivotClause) string {
	ind := f.indent()
	var b strings.Builder
	if p.Kind == parser.PivotUnpivot {
		b.WriteString("\n" + f.kw("unpivot"))
	} else {
		b.WriteString("\n" + f.kw("pivot"))
	}
	b.WriteString("\n(")
	b.WriteString("\n" + ind + p.Value)
	b.WriteString("\n" + ind + f.kw("for") + " " + p.ForColumn)
	b.WriteString("\n" + ind + f.kw("in"))
	f.writeInListBlock(&b, splitDepthZeroCommas(p.InList))
	b.WriteString("\n)")
	return b.String()
}

// groupByModKeyword returns the canonical lowercase keyword phrase for a
// GroupByModifier. GroupBySimple and GroupByGrandTotal have no keyword prefix.
func groupByModKeyword(mod parser.GroupByModifier) string {
	switch mod {
	case parser.GroupByRollup:
		return "rollup"
	case parser.GroupByCube:
		return "cube"
	case parser.GroupBySets:
		return "grouping sets"
	case parser.GroupBySimple, parser.GroupByGrandTotal:
		return ""
	}
	return ""
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
	case parser.JoinCrossApply:
		return "cross apply"
	case parser.JoinOuterApply:
		return "outer apply"
	}
	return "join"
}
