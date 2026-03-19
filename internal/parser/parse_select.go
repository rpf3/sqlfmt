package parser

import (
	"fmt"
	"strings"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// isSetOpKeyword reports whether the current token starts a set operator
// (UNION, INTERSECT, or EXCEPT).
func (p *parser) isSetOpKeyword() bool {
	return p.curKeyword("UNION") || p.curKeyword("INTERSECT") || p.curKeyword("EXCEPT")
}

// parseSelectBranch parses one SELECT branch: SELECT [DISTINCT] cols FROM …
// [JOINs] [WHERE] [GROUP BY] [HAVING]. It stops before ORDER BY, OFFSET,
// FETCH, set operators (UNION/INTERSECT/EXCEPT), semicolons, and
// closing parentheses. The ORDER BY and pagination clauses are parsed by the
// enclosing parseSelectCore so they apply to the whole compound query.
func (p *parser) parseSelectBranch() (*SelectStmt, error) {
	p.advance() // consume SELECT

	stmt := &SelectStmt{}

	if p.curKeyword("DISTINCT") {
		p.advance()
		stmt.Distinct = true
	}

	if p.curKeyword("TOP") {
		p.advance() // consume TOP
		if p.curIs(lexer.LParen) {
			p.advance() // consume (
			topExpr, _ := p.parseExprRaw(func() bool { return false })
			p.advance() // consume )
			stmt.Top = topExpr
		} else {
			// bare TOP n without parentheses
			stmt.Top = p.cur.Value
			p.advance()
		}
		if p.curKeyword("PERCENT") {
			p.advance()
			stmt.TopPercent = true
		}
		if p.curKeyword("WITH") && p.peekKeyword("TIES") {
			p.advance() // consume WITH
			p.advance() // consume TIES
			stmt.TopWithTies = true
		}
	}

	cols, err := p.parseSelectList()
	if err != nil {
		return nil, err
	}
	stmt.Columns = cols

	// SELECT INTO: INTO <table> appears between column list and FROM.
	if p.curKeyword("INTO") {
		p.advance() // consume INTO
		intoName, err := p.parseQualifiedName()
		if err != nil {
			return nil, err
		}
		stmt.Into = intoName
	}

	if p.curKeyword("FROM") {
		p.advance() // consume FROM

		from, err := p.parseFromSource()
		if err != nil {
			return nil, err
		}
		stmt.From = from
	}

	joins, err := p.parseJoinClauses()
	if err != nil {
		return nil, err
	}
	stmt.Joins = joins

	if p.curKeyword("WHERE") {
		p.advance()
		// Stop before a subquery opening so we can parse it structurally.
		stopFn := func() bool {
			return (p.curIs(lexer.LParen) && p.peekKeyword("SELECT")) ||
				p.curKeyword("GROUP") || p.curKeyword("HAVING") ||
				p.curKeyword("WINDOW") ||
				p.curKeyword("ORDER") || p.curKeyword("OFFSET") ||
				p.curKeyword("FETCH") ||
				p.curKeyword("OPTION") ||
				p.isSetOpKeyword() ||
				p.curIs(lexer.Semicolon) || p.curIs(lexer.RParen)
		}
		whereExpr := p.parseAndChain(stopFn)
		if p.curIs(lexer.LParen) && p.peekKeyword("SELECT") {
			p.advance() // consume (
			subq, err := p.parseSelectCore()
			if err != nil {
				return nil, err
			}
			if _, err := p.expect(lexer.RParen); err != nil {
				return nil, err
			}
			stmt.WherePred = Render(whereExpr)
			stmt.WhereSubq = subq
		} else {
			stmt.Where = whereExpr
		}
	}

	if p.curKeyword("GROUP") && p.peekKeyword("BY") {
		p.advance() // consume GROUP
		p.advance() // consume BY
		groupBy, err := p.parseGroupByList()
		if err != nil {
			return nil, err
		}
		stmt.GroupBy = groupBy
	}

	if p.curKeyword("HAVING") {
		p.advance()
		stmt.Having = p.parseAndChain(func() bool {
			return p.curKeyword("WINDOW") ||
				p.curKeyword("ORDER") || p.curKeyword("OFFSET") ||
				p.curKeyword("FETCH") ||
				p.isSetOpKeyword() ||
				p.curIs(lexer.Semicolon) || p.curIs(lexer.RParen)
		})
	}

	// WINDOW clause: one or more named window definitions
	if p.curKeyword("WINDOW") {
		p.advance() // consume WINDOW
		for {
			nameTok, err := p.expectIdent()
			if err != nil {
				return nil, err
			}
			if err := p.expectKeyword("AS"); err != nil {
				return nil, err
			}
			if _, err := p.expect(lexer.LParen); err != nil {
				return nil, err
			}
			spec, _ := p.parseExprRaw(func() bool { return false })
			p.advance() // consume closing )
			stmt.Windows = append(stmt.Windows, WindowDef{Name: nameTok.Value, Spec: spec})
			if !p.curIs(lexer.Comma) {
				break
			}
			p.advance() // consume ',' between window definitions
		}
	}

	return stmt, nil
}

// parseSelectCore parses a full SELECT statement (possibly compound via set
// operators) through all clauses including ORDER BY and pagination. It does
// NOT consume a trailing semicolon or closing parenthesis — the caller
// handles those. It is used both for top-level SELECTs and for subqueries.
func (p *parser) parseSelectCore() (*SelectStmt, error) {
	stmt, err := p.parseSelectBranch()
	if err != nil {
		return nil, err
	}

	// Set operators: UNION [ALL] / INTERSECT / EXCEPT
	for p.isSetOpKeyword() {
		var opType SetOpType
		switch {
		case p.curKeyword("UNION"):
			p.advance() // consume UNION
			if p.curKeyword("ALL") {
				p.advance() // consume ALL
				opType = SetOpUnionAll
			} else {
				opType = SetOpUnion
			}
		case p.curKeyword("INTERSECT"):
			p.advance()
			opType = SetOpIntersect
		default: // EXCEPT
			p.advance()
			opType = SetOpExcept
		}

		if !p.curKeyword("SELECT") {
			return nil, fmt.Errorf(
				"expected SELECT after set operator at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		branch, err := p.parseSelectBranch()
		if err != nil {
			return nil, err
		}
		stmt.SetOps = append(stmt.SetOps, SetOp{Op: opType, Select: branch})
	}

	// ORDER BY / pagination — apply to the whole compound query (or plain SELECT).
	if p.curKeyword("ORDER") && p.peekKeyword("BY") {
		p.advance() // consume ORDER
		p.advance() // consume BY
		orderBy, err := p.parseOrderByList()
		if err != nil {
			return nil, err
		}
		stmt.OrderBy = orderBy
	}

	if p.curKeyword("OFFSET") {
		p.advance()
		tok, err := p.expect(lexer.IntLit)
		if err != nil {
			return nil, err
		}
		stmt.Offset = tok.Value
		if p.curKeyword("ROWS") || p.curKeyword("ROW") {
			p.advance()
			stmt.OffsetHasRows = true
		}
	}

	if p.curKeyword("FETCH") {
		p.advance()
		if !p.curKeyword("NEXT") && !p.curKeyword("FIRST") {
			return nil, fmt.Errorf(
				"expected NEXT or FIRST after FETCH at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		p.advance() // consume NEXT or FIRST
		tok, err := p.expect(lexer.IntLit)
		if err != nil {
			return nil, err
		}
		stmt.Fetch = tok.Value
		if p.curKeyword("ROWS") || p.curKeyword("ROW") {
			p.advance()
		}
		if p.curKeyword("ONLY") {
			p.advance()
		}
	}

	// FOR XML / FOR JSON — must appear after all other clauses.
	if p.curKeyword("FOR") {
		p.advance() // consume FOR
		switch {
		case p.curIs(lexer.Ident) && strings.EqualFold(p.cur.Value, "XML"):
			stmt.ForKind = ForXML
		case p.curIs(lexer.Ident) && strings.EqualFold(p.cur.Value, "JSON"):
			stmt.ForKind = ForJSON
		default:
			return nil, fmt.Errorf(
				"expected XML or JSON after FOR at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		p.advance() // consume XML or JSON
		// Collect the raw options (mode keyword + any comma-separated directives)
		// up to the terminating semicolon or a depth-0 closing paren (subquery boundary).
		// Inner parens like PATH('order') are tracked by depth so they are included.
		var tokBuf []lexer.Token
		depth := 0
		for p.cur.Type != lexer.EOF && !p.curIs(lexer.Semicolon) {
			if p.curIs(lexer.RParen) && depth == 0 {
				break
			}
			if p.curIs(lexer.LParen) {
				depth++
			} else if p.curIs(lexer.RParen) {
				depth--
			}
			tokBuf = append(tokBuf, p.cur)
			p.advance()
		}
		stmt.ForOpts = joinBodyTokens(tokBuf)
	}

	opt, err := p.parseOptionClause()
	if err != nil {
		return nil, err
	}
	stmt.Option = opt

	return stmt, nil
}

// parseSelect handles a top-level SELECT statement, delegating to
// parseSelectCore and then consuming the trailing semicolon.
func (p *parser) parseSelect() (Statement, error) {
	stmt, err := p.parseSelectCore()
	if err != nil {
		return nil, err
	}
	p.consumeSemicolon()
	return stmt, nil
}

// parseSelectList parses a comma-separated list of SELECT items.
func (p *parser) parseSelectList() ([]SelectItem, error) {
	var items []SelectItem
	for {
		item, err := p.parseSelectItem()
		if err != nil {
			return nil, err
		}
		items = append(items, item)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	return items, nil
}

// parseSelectItem parses one SELECT list entry: <expr> [AS <alias>].
func (p *parser) parseSelectItem() (SelectItem, error) {
	expr := p.parseExpr(func() bool {
		return p.curIs(lexer.Comma) || p.curIs(lexer.Semicolon) ||
			p.curKeyword("FROM") || p.curKeyword("INTO") || p.curKeyword("AS")
	})

	var alias string
	if p.curKeyword("AS") {
		p.advance()
		tok, err := p.expectIdent()
		if err != nil {
			return SelectItem{}, err
		}
		alias = tok.Value
	}

	item := SelectItem{Value: expr, Alias: alias}
	return item, nil
}

// parseValuesRows parses a VALUES (...) [, (...)]... row list.
// On entry: p.cur is the VALUES keyword.
// On exit: p.cur is positioned after the last closing paren of the last row.
func (p *parser) parseValuesRows() ([][]Expr, error) {
	p.advance() // consume VALUES
	var rows [][]Expr
	for {
		row, err := p.parseValueRow()
		if err != nil {
			return nil, err
		}
		rows = append(rows, row)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ',' between rows
	}
	return rows, nil
}

// parseFromSource parses the target of a FROM clause: either a named table
// or a derived table (SELECT ...) subquery. Bare aliases (without AS) are
// also accepted for the lint rule in #34.
func (p *parser) parseFromSource() (SelectFromSource, error) {
	// Derived table: (SELECT ...)
	if p.curIs(lexer.LParen) && p.peekKeyword("SELECT") {
		p.advance() // consume (
		subq, err := p.parseSelectCore()
		if err != nil {
			return SelectFromSource{}, err
		}
		if _, err := p.expect(lexer.RParen); err != nil {
			return SelectFromSource{}, err
		}
		source := SelectFromSource{Subquery: subq}
		if p.curKeyword("AS") {
			p.advance()
			aliasTok, err := p.expectIdent()
			if err != nil {
				return SelectFromSource{}, err
			}
			source.Alias = aliasTok.Value
			source.AliasExplicit = true
		} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
			source.Alias = p.cur.Value
			p.advance()
		}
		return source, nil
	}

	// VALUES derived table: (VALUES (...) [, (...)]...) AS alias [(cols)]
	if p.curIs(lexer.LParen) && p.peekKeyword("VALUES") {
		p.advance() // consume (
		rows, err := p.parseValuesRows()
		if err != nil {
			return SelectFromSource{}, err
		}
		if _, err := p.expect(lexer.RParen); err != nil {
			return SelectFromSource{}, err
		}
		source := SelectFromSource{ValuesRows: rows}
		if p.curKeyword("AS") {
			p.advance()
			aliasTok, err := p.expectIdent()
			if err != nil {
				return SelectFromSource{}, err
			}
			source.Alias = aliasTok.Value
			source.AliasExplicit = true
		} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
			source.Alias = p.cur.Value
			p.advance()
		}
		if p.curIs(lexer.LParen) {
			cols, err := p.parseIdentList()
			if err != nil {
				return SelectFromSource{}, err
			}
			source.ValuesCols = cols
		}
		return source, nil
	}

	// Named table
	name, err := p.parseQualifiedName()
	if err != nil {
		return SelectFromSource{}, err
	}
	source := SelectFromSource{Name: name}

	// Optional TVF argument list: name(args...)
	if p.curIs(lexer.LParen) {
		args, err := p.parseParenRaw()
		if err != nil {
			return SelectFromSource{}, err
		}
		source.TVFArgs = args
		if builtinFunctions[strings.ToUpper(source.Name)] {
			source.Name = strings.ToLower(source.Name)
		}
	}

	// Optional PIVOT / UNPIVOT postfix operator before the alias.
	if p.curKeyword("PIVOT") || p.curKeyword("UNPIVOT") {
		pivot, err := p.parsePivotClause()
		if err != nil {
			return SelectFromSource{}, err
		}
		source.Pivot = pivot
	}

	if p.curKeyword("AS") {
		p.advance()
		aliasTok, err := p.expectIdent()
		if err != nil {
			return SelectFromSource{}, err
		}
		source.Alias = aliasTok.Value
		source.AliasExplicit = true
	} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
		// bare alias without AS
		source.Alias = p.cur.Value
		p.advance()
	}

	// Optional table hints: [[AS] alias] WITH (hint, ...)
	// Hints follow the alias per the T-SQL grammar.
	if p.curKeyword("WITH") && p.peek.Type == lexer.LParen {
		p.advance() // consume WITH
		hints, err := p.parseParenRaw()
		if err != nil {
			return SelectFromSource{}, err
		}
		source.Hints = hints
	}

	return source, nil
}

// parsePivotClause parses a PIVOT or UNPIVOT postfix operator:
//
//	PIVOT   ( aggregate(col) FOR pivot_col IN (col_list) )
//	UNPIVOT ( value_col      FOR pivot_col IN (col_list) )
//
// The PIVOT/UNPIVOT keyword is consumed on entry. The trailing alias is
// parsed by the caller (parseFromSource) using the standard alias logic.
func (p *parser) parsePivotClause() (*PivotClause, error) {
	kind := PivotPivot
	if p.curKeyword("UNPIVOT") {
		kind = PivotUnpivot
	}
	p.advance() // consume PIVOT / UNPIVOT

	if _, err := p.expect(lexer.LParen); err != nil {
		return nil, err
	}

	// Read aggregate expression (PIVOT) or value column (UNPIVOT) up to FOR.
	value, _ := p.parseExprRaw(func() bool { return p.curKeyword("FOR") })

	if err := p.expectKeyword("FOR"); err != nil {
		return nil, err
	}

	// Read the pivot column name up to IN.
	forCol, _ := p.parseExprRaw(func() bool { return p.curKeyword("IN") })

	if err := p.expectKeyword("IN"); err != nil {
		return nil, err
	}

	// IN (col_list) — store content without outer parens.
	raw, err := p.parseParenRaw()
	if err != nil {
		return nil, err
	}
	inList := raw[1 : len(raw)-1] // strip surrounding ( )

	if _, err := p.expect(lexer.RParen); err != nil {
		return nil, err
	}

	pivot := &PivotClause{Kind: kind, Value: value, ForColumn: forCol, InList: inList}
	return pivot, nil
}

// parseGroupByList parses a comma-separated list of GROUP BY items,
// each of which may be a plain expression, ROLLUP(...), CUBE(...),
// GROUPING SETS(...), or a grand-total ().
func (p *parser) parseGroupByList() ([]GroupByItem, error) {
	var items []GroupByItem
	for {
		item, err := p.parseGroupByItem()
		if err != nil {
			return nil, err
		}
		items = append(items, item)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	return items, nil
}

// parseGroupByItem parses one element of a GROUP BY list.
func (p *parser) parseGroupByItem() (GroupByItem, error) {
	// ROLLUP(...)
	if p.curKeyword("ROLLUP") {
		p.advance() // consume ROLLUP
		raw, err := p.parseParenRaw()
		if err != nil {
			return GroupByItem{}, err
		}
		return GroupByItem{Modifier: GroupByRollup, RawArgs: raw}, nil
	}
	// CUBE(...)
	if p.curKeyword("CUBE") {
		p.advance() // consume CUBE
		raw, err := p.parseParenRaw()
		if err != nil {
			return GroupByItem{}, err
		}
		return GroupByItem{Modifier: GroupByCube, RawArgs: raw}, nil
	}
	// GROUPING SETS(...)
	if p.curKeyword("GROUPING") && p.peekKeyword("SETS") {
		p.advance() // consume GROUPING
		p.advance() // consume SETS
		raw, err := p.parseParenRaw()
		if err != nil {
			return GroupByItem{}, err
		}
		return GroupByItem{Modifier: GroupBySets, RawArgs: raw}, nil
	}
	// () — grand total grouping set
	if p.curIs(lexer.LParen) && p.peek.Type == lexer.RParen {
		p.advance() // consume (
		p.advance() // consume )
		return GroupByItem{Modifier: GroupByGrandTotal, RawArgs: "()"}, nil
	}
	// Plain expression
	stopFn := func() bool {
		return p.curIs(lexer.Comma) || p.curKeyword("HAVING") ||
			p.curKeyword("WINDOW") ||
			p.curKeyword("ORDER") || p.curKeyword("OFFSET") ||
			p.curKeyword("FETCH") ||
			p.isSetOpKeyword() ||
			p.curIs(lexer.Semicolon)
	}
	expr := p.parseExpr(stopFn)
	return GroupByItem{Modifier: GroupBySimple, Expr: expr}, nil
}

// parseParenRaw consumes '(' <raw-content> ')' and returns the whole
// thing including the surrounding parens as a normalised raw string.
func (p *parser) parseParenRaw() (string, error) {
	if _, err := p.expect(lexer.LParen); err != nil {
		return "", err
	}
	raw, _ := p.parseExprRaw(func() bool { return false })
	p.advance() // consume closing )
	return "(" + raw + ")", nil
}

// parseOrderByList parses a comma-separated list of ORDER BY items.
// Each item is an expression with an optional ASC or DESC direction keyword.
func (p *parser) parseOrderByList() ([]OrderItem, error) {
	var items []OrderItem
	for {
		expr := p.parseExpr(func() bool {
			return p.curKeyword("ASC") || p.curKeyword("DESC") ||
				p.curIs(lexer.Comma) ||
				p.curKeyword("OFFSET") || p.curKeyword("FETCH") ||
				p.curKeyword("FOR") ||
				p.curKeyword("LIMIT") || p.curIs(lexer.Semicolon)
		})
		item := OrderItem{Value: expr}
		if p.curKeyword("DESC") {
			p.advance()
			item.Direction = DirectionDesc
		} else if p.curKeyword("ASC") {
			p.advance()
			item.Direction = DirectionAsc
		}
		items = append(items, item)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	return items, nil
}

// isNextJoin reports whether the current token starts a JOIN clause.
// It uses peek-ahead to avoid false-positives on SQL functions named LEFT,
// RIGHT, etc.: LEFT(str, n) has peek=LParen, while LEFT JOIN has peek=JOIN
// and LEFT OUTER JOIN has peek=OUTER.
func (p *parser) isNextJoin() bool {
	return p.curKeyword("JOIN") ||
		(p.curKeyword("INNER") && p.peekKeyword("JOIN")) ||
		(p.curKeyword("LEFT") && (p.peekKeyword("JOIN") || p.peekKeyword("OUTER"))) ||
		(p.curKeyword("RIGHT") && (p.peekKeyword("JOIN") || p.peekKeyword("OUTER"))) ||
		(p.curKeyword("FULL") && (p.peekKeyword("OUTER") || p.peekKeyword("JOIN"))) ||
		(p.curKeyword("CROSS") && (p.peekKeyword("JOIN") || p.peekKeyword("APPLY"))) ||
		(p.curKeyword("OUTER") && p.peekKeyword("APPLY"))
}

// parseJoinClauses consumes zero or more JOIN clauses following a FROM source.
// Each clause is: <join-type> <table> [AS <alias>] ON <expr>.
// parseJoinType consumes the join-keyword sequence and returns the
// corresponding JoinType constant. It is called once per iteration of the
// parseJoinClauses loop, with p.cur already positioned at the first keyword
// of the join (INNER, LEFT, JOIN, CROSS, OUTER, NATURAL, etc.).
func (p *parser) parseJoinType() (JoinType, error) {
	switch {
	case p.curKeyword("INNER"):
		p.advance() // consume INNER
		p.advance() // consume JOIN
		return JoinInner, nil
	case p.curKeyword("JOIN"):
		p.advance() // consume JOIN (bare, means INNER)
		return JoinInner, nil
	case p.curKeyword("LEFT"):
		p.advance() // consume LEFT
		if p.curKeyword("OUTER") {
			p.advance() // consume optional OUTER
		}
		if err := p.expectKeyword("JOIN"); err != nil {
			return 0, err
		}
		return JoinLeft, nil
	case p.curKeyword("RIGHT"):
		p.advance() // consume RIGHT
		if p.curKeyword("OUTER") {
			p.advance() // consume optional OUTER
		}
		if err := p.expectKeyword("JOIN"); err != nil {
			return 0, err
		}
		return JoinRight, nil
	case p.curKeyword("FULL"):
		p.advance() // consume FULL
		if p.curKeyword("OUTER") {
			p.advance() // consume optional OUTER
		}
		if err := p.expectKeyword("JOIN"); err != nil {
			return 0, err
		}
		return JoinFullOuter, nil
	case p.curKeyword("CROSS"):
		p.advance() // consume CROSS
		if p.curKeyword("APPLY") {
			p.advance() // consume APPLY
			return JoinCrossApply, nil
		}
		p.advance() // consume JOIN
		return JoinCross, nil
	case p.curKeyword("OUTER"):
		p.advance() // consume OUTER
		if err := p.expectKeyword("APPLY"); err != nil {
			return 0, err
		}
		return JoinOuterApply, nil
	}
	return 0, fmt.Errorf("unexpected join keyword at %d:%d: %s %q",
		p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value)
}

func (p *parser) parseJoinClauses() ([]JoinClause, error) {
	var joins []JoinClause
	for p.isNextJoin() {
		joinType, err := p.parseJoinType()
		if err != nil {
			return nil, err
		}

		// APPLY joins (CROSS APPLY / OUTER APPLY) have a different source syntax:
		// either a TVF with parenthesised args or a (SELECT ...) subquery.
		if joinType == JoinCrossApply || joinType == JoinOuterApply {
			jc := JoinClause{Type: joinType}
			if p.curIs(lexer.LParen) && p.peekKeyword("SELECT") {
				// subquery source: (SELECT ...)
				p.advance() // consume (
				subq, err := p.parseSelectCore()
				if err != nil {
					return nil, err
				}
				if _, err := p.expect(lexer.RParen); err != nil {
					return nil, err
				}
				jc.Subquery = subq
			} else {
				// TVF source: schema.name(args...)
				tvfName, err := p.parseQualifiedName()
				if err != nil {
					return nil, err
				}
				jc.Name = tvfName
				if p.curIs(lexer.LParen) {
					p.advance() // consume (
					tvfArgs, _ := p.parseExprRaw(func() bool { return false })
					p.advance() // consume )
					jc.TVFArgs = "(" + tvfArgs + ")"
				}
			}
			if p.curKeyword("AS") {
				p.advance()
				aliasTok, err := p.expectIdent()
				if err != nil {
					return nil, err
				}
				jc.Alias = aliasTok.Value
				jc.AliasExplicit = true
			} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
				jc.Alias = p.cur.Value
				p.advance()
			}
			joins = append(joins, jc)
			continue
		}

		// VALUES derived table: (VALUES (...) [, (...)]...) AS alias [(cols)]
		if p.curIs(lexer.LParen) && p.peekKeyword("VALUES") {
			p.advance() // consume (
			rows, err := p.parseValuesRows()
			if err != nil {
				return nil, err
			}
			if _, err := p.expect(lexer.RParen); err != nil {
				return nil, err
			}
			jc := JoinClause{Type: joinType, ValuesRows: rows}
			if p.curKeyword("AS") {
				p.advance()
				aliasTok, err := p.expectIdent()
				if err != nil {
					return nil, err
				}
				jc.Alias = aliasTok.Value
				jc.AliasExplicit = true
			} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
				jc.Alias = p.cur.Value
				p.advance()
			}
			if p.curIs(lexer.LParen) {
				cols, err := p.parseIdentList()
				if err != nil {
					return nil, err
				}
				jc.ValuesCols = cols
			}
			if p.curKeyword("ON") {
				p.advance()
				jc.On = p.parseAndChain(func() bool {
					return p.isNextJoin() ||
						p.curKeyword("WHERE") || p.curKeyword("GROUP") ||
						p.curKeyword("HAVING") || p.curKeyword("ORDER") ||
						p.curKeyword("OFFSET") || p.curKeyword("FETCH") ||
						p.curKeyword("OPTION") ||
						p.isSetOpKeyword() ||
						p.curIs(lexer.Semicolon)
				})
			}
			joins = append(joins, jc)
			continue
		}

		joinName, err := p.parseQualifiedName()
		if err != nil {
			return nil, err
		}
		jc := JoinClause{Type: joinType, Name: joinName}

		// Optional TVF argument list: name(args...)
		if p.curIs(lexer.LParen) {
			args, err := p.parseParenRaw()
			if err != nil {
				return nil, err
			}
			jc.TVFArgs = args
			if builtinFunctions[strings.ToUpper(jc.Name)] {
				jc.Name = strings.ToLower(jc.Name)
			}
		}

		// Optional alias (AS or bare)
		if p.curKeyword("AS") {
			p.advance()
			aliasTok, err := p.expectIdent()
			if err != nil {
				return nil, err
			}
			jc.Alias = aliasTok.Value
			jc.AliasExplicit = true
		} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
			jc.Alias = p.cur.Value
			p.advance()
		}

		// Optional table hints: [[AS] alias] WITH (hint, ...)
		// Hints follow the alias per the T-SQL grammar.
		if p.curKeyword("WITH") && p.peek.Type == lexer.LParen {
			p.advance() // consume WITH
			hints, err := p.parseParenRaw()
			if err != nil {
				return nil, err
			}
			jc.Hints = hints
		}

		// ON condition or USING column list
		if p.curKeyword("ON") {
			p.advance()
			jc.On = p.parseAndChain(func() bool {
				return p.isNextJoin() ||
					p.curKeyword("WHERE") || p.curKeyword("GROUP") ||
					p.curKeyword("HAVING") || p.curKeyword("ORDER") ||
					p.curKeyword("OFFSET") || p.curKeyword("FETCH") ||
					p.curKeyword("LIMIT") || p.isSetOpKeyword() ||
					p.curIs(lexer.Semicolon)
			})
		}

		joins = append(joins, jc)
	}
	return joins, nil
}

// parseWithSelect handles: WITH <name> AS (<select>) [, <name> AS (<select>)] ... SELECT ...
// parseCTEDefs parses the CTE list following a WITH keyword:
//
//	WITH name AS ( <select> ) [, name AS ( <select> ) ...]
//
// WITH is consumed on entry. The caller is responsible for parsing the main
// SELECT body that follows.
func (p *parser) parseCTEDefs() ([]CTEDef, bool, error) {
	p.advance() // consume WITH
	recursive := false
	if p.curKeyword("RECURSIVE") {
		p.advance() // consume RECURSIVE
		recursive = true
	}
	var ctes []CTEDef
	for {
		nameTok, err := p.expectIdent()
		if err != nil {
			return nil, false, err
		}
		if err := p.expectKeyword("AS"); err != nil {
			return nil, false, err
		}
		if _, err := p.expect(lexer.LParen); err != nil {
			return nil, false, err
		}
		body, err := p.parseSelectCore()
		if err != nil {
			return nil, false, err
		}
		if _, err := p.expect(lexer.RParen); err != nil {
			return nil, false, err
		}
		ctes = append(ctes, CTEDef{Name: nameTok.Value, Select: body})

		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	return ctes, recursive, nil
}

func (p *parser) parseWithSelect() (Statement, error) {
	ctes, recursive, err := p.parseCTEDefs()
	if err != nil {
		return nil, err
	}

	switch {
	case p.curKeyword("SELECT"):
		stmt, err := p.parseSelectCore()
		if err != nil {
			return nil, err
		}
		stmt.CTEs = ctes
		stmt.Recursive = recursive
		p.consumeSemicolon()
		return stmt, nil

	case p.curKeyword("INSERT"):
		raw, err := p.parseInsert()
		if err != nil {
			return nil, err
		}
		raw.(*InsertStmt).CTEs = ctes
		return raw, nil

	case p.curKeyword("UPDATE"):
		raw, err := p.parseUpdate()
		if err != nil {
			return nil, err
		}
		raw.(*UpdateStmt).CTEs = ctes
		return raw, nil

	case p.curKeyword("DELETE"):
		raw, err := p.parseDelete()
		if err != nil {
			return nil, err
		}
		raw.(*DeleteStmt).CTEs = ctes
		return raw, nil

	default:
		return nil, fmt.Errorf(
			"expected SELECT, INSERT, UPDATE, or DELETE after WITH clause at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
}
