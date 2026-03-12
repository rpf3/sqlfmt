package parser

import (
	"fmt"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// isSetOpKeyword reports whether the current token starts a set operator
// (UNION, INTERSECT, or EXCEPT).
func (p *parser) isSetOpKeyword() bool {
	return p.curKeyword("UNION") || p.curKeyword("INTERSECT") || p.curKeyword("EXCEPT")
}

// parseSelectBranch parses one SELECT branch: SELECT [DISTINCT] cols FROM …
// [JOINs] [WHERE] [GROUP BY] [HAVING]. It stops before ORDER BY, OFFSET,
// FETCH, LIMIT, set operators (UNION/INTERSECT/EXCEPT), semicolons, and
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

	if err := p.expectKeyword("FROM"); err != nil {
		return nil, err
	}

	from, err := p.parseFromSource()
	if err != nil {
		return nil, err
	}
	stmt.From = from

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
				p.curKeyword("FETCH") || p.curKeyword("LIMIT") ||
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
				p.curKeyword("FETCH") || p.curKeyword("LIMIT") ||
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

	if p.curKeyword("LIMIT") {
		p.advance()
		tok, err := p.expect(lexer.IntLit)
		if err != nil {
			return nil, err
		}
		stmt.Limit = tok.Value
	}

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
		return p.curIs(lexer.Comma) || p.curKeyword("FROM") || p.curKeyword("AS")
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

	// Named table
	name, err := p.parseQualifiedName()
	if err != nil {
		return SelectFromSource{}, err
	}
	source := SelectFromSource{Name: name}

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

	return source, nil
}

// parseGroupByList parses a comma-separated list of GROUP BY expressions.
func (p *parser) parseGroupByList() ([]Expr, error) {
	var exprs []Expr
	for {
		expr := p.parseExpr(func() bool {
			return p.curIs(lexer.Comma) || p.curKeyword("HAVING") ||
				p.curKeyword("WINDOW") ||
				p.curKeyword("ORDER") || p.curKeyword("OFFSET") ||
				p.curKeyword("FETCH") || p.curKeyword("LIMIT") ||
				p.isSetOpKeyword() ||
				p.curIs(lexer.Semicolon)
		})
		exprs = append(exprs, expr)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	return exprs, nil
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
		(p.curKeyword("OUTER") && p.peekKeyword("APPLY")) ||
		p.curKeyword("NATURAL")
}

// parseJoinClauses consumes zero or more JOIN clauses following a FROM source.
// Each clause is: <join-type> <table> [AS <alias>] (ON <expr> | USING (<cols>)).
func (p *parser) parseJoinClauses() ([]JoinClause, error) {
	var joins []JoinClause
	for p.isNextJoin() {
		var joinType JoinType
		switch {
		case p.curKeyword("INNER"):
			p.advance() // consume INNER
			p.advance() // consume JOIN
			joinType = JoinInner
		case p.curKeyword("JOIN"):
			p.advance() // consume JOIN (bare, means INNER)
			joinType = JoinInner
		case p.curKeyword("LEFT"):
			p.advance() // consume LEFT
			if p.curKeyword("OUTER") {
				p.advance() // consume optional OUTER
			}
			if err := p.expectKeyword("JOIN"); err != nil {
				return nil, err
			}
			joinType = JoinLeft
		case p.curKeyword("RIGHT"):
			p.advance() // consume RIGHT
			if p.curKeyword("OUTER") {
				p.advance() // consume optional OUTER
			}
			if err := p.expectKeyword("JOIN"); err != nil {
				return nil, err
			}
			joinType = JoinRight
		case p.curKeyword("FULL"):
			p.advance() // consume FULL
			if p.curKeyword("OUTER") {
				p.advance() // consume optional OUTER
			}
			if err := p.expectKeyword("JOIN"); err != nil {
				return nil, err
			}
			joinType = JoinFullOuter
		case p.curKeyword("CROSS"):
			p.advance() // consume CROSS
			if p.curKeyword("APPLY") {
				p.advance() // consume APPLY
				joinType = JoinCrossApply
			} else {
				p.advance() // consume JOIN
				joinType = JoinCross
			}
		case p.curKeyword("OUTER"):
			p.advance() // consume OUTER
			if err := p.expectKeyword("APPLY"); err != nil {
				return nil, err
			}
			joinType = JoinOuterApply
		case p.curKeyword("NATURAL"):
			p.advance() // consume NATURAL
			switch {
			case p.curKeyword("LEFT"):
				p.advance() // consume LEFT
				if p.curKeyword("OUTER") {
					p.advance() // consume optional OUTER
				}
				if err := p.expectKeyword("JOIN"); err != nil {
					return nil, err
				}
				joinType = JoinNaturalLeft
			case p.curKeyword("RIGHT"):
				p.advance() // consume RIGHT
				if p.curKeyword("OUTER") {
					p.advance() // consume optional OUTER
				}
				if err := p.expectKeyword("JOIN"); err != nil {
					return nil, err
				}
				joinType = JoinNaturalRight
			default:
				if err := p.expectKeyword("JOIN"); err != nil {
					return nil, err
				}
				joinType = JoinNatural
			}
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

		joinName, err := p.parseQualifiedName()
		if err != nil {
			return nil, err
		}
		jc := JoinClause{Type: joinType, Name: joinName}

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
		} else if p.curKeyword("USING") {
			p.advance()
			cols, err := p.parseIdentList()
			if err != nil {
				return nil, err
			}
			jc.Using = cols
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

	if !p.curKeyword("SELECT") {
		return nil, fmt.Errorf(
			"expected SELECT after WITH clause at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	stmt, err := p.parseSelectCore()
	if err != nil {
		return nil, err
	}
	stmt.CTEs = ctes
	stmt.Recursive = recursive

	p.consumeSemicolon()
	return stmt, nil
}
