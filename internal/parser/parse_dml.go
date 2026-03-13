package parser

import (
	"fmt"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// parseInsert handles:
//
//	INSERT INTO <table> [(cols)] VALUES (...) [, (...)] [;]
//	INSERT INTO <table> [(cols)] SELECT ... [;]
func (p *parser) parseInsert() (Statement, error) {
	p.advance() // consume INSERT
	if err := p.expectKeyword("INTO"); err != nil {
		return nil, err
	}
	tableName, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	stmt := &InsertStmt{Table: tableName}

	// Optional column list: (col1, col2, ...)
	if p.curIs(lexer.LParen) {
		cols, err := p.parseIdentList()
		if err != nil {
			return nil, err
		}
		stmt.Columns = cols
	}

	if p.curKeyword("VALUES") {
		p.advance() // consume VALUES
		for {
			row, err := p.parseValueRow()
			if err != nil {
				return nil, err
			}
			stmt.Values = append(stmt.Values, row)
			if !p.curIs(lexer.Comma) {
				break
			}
			p.advance() // consume ',' between rows
		}
	} else if p.curKeyword("SELECT") {
		sel, err := p.parseSelectCore()
		if err != nil {
			return nil, err
		}
		stmt.Select = sel
	} else {
		return nil, fmt.Errorf(
			"expected VALUES or SELECT after INSERT INTO %s at %d:%d",
			stmt.Table, p.cur.Line, p.cur.Column,
		)
	}

	p.consumeSemicolon()
	return stmt, nil
}

// parseValueRow parses one parenthesised list of value expressions: (expr, expr, ...)
func (p *parser) parseValueRow() ([]Expr, error) {
	if _, err := p.expect(lexer.LParen); err != nil {
		return nil, err
	}
	var exprs []Expr
	for {
		expr := p.parseExpr(func() bool {
			return p.curIs(lexer.Comma) || p.curIs(lexer.RParen)
		})
		exprs = append(exprs, expr)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ',' between expressions
	}
	if _, err := p.expect(lexer.RParen); err != nil {
		return nil, err
	}
	return exprs, nil
}

// parseUpdate handles:
//
//	ANSI:       UPDATE <table> SET <col=expr> [, ...] [WHERE <predicate>] [;]
//	SQL Server: UPDATE <alias> SET <col=expr> [, ...] FROM <table> [AS <alias>] [JOINs] [WHERE <predicate>] [;]
func (p *parser) parseUpdate() (Statement, error) {
	p.advance() // consume UPDATE

	target, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	stmt := &UpdateStmt{Target: target}

	sets, err := p.parseSetClause()
	if err != nil {
		return nil, err
	}
	stmt.Sets = sets

	if p.curKeyword("FROM") {
		from, err := p.parseUpdateFrom()
		if err != nil {
			return nil, err
		}
		stmt.From = from
	}

	if p.curKeyword("WHERE") {
		p.advance()
		stmt.Where = p.parseAndChain(func() bool {
			return p.curIs(lexer.Semicolon) || p.curIs(lexer.EOF)
		})
	}

	p.consumeSemicolon()
	return stmt, nil
}

// parseUpdateFrom parses: FROM <table> [AS <alias>] [JOINs]
func (p *parser) parseUpdateFrom() (*UpdateFromSource, error) {
	p.advance() // consume FROM

	fromName, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	from := &UpdateFromSource{Name: fromName}

	if p.curKeyword("AS") {
		p.advance()
		aliasTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		from.Alias = aliasTok.Value
	} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
		// implicit alias — Keyword tokens (WHERE, JOIN, etc.) are excluded by type
		from.Alias = p.cur.Value
		p.advance()
	}

	if p.isNextJoin() {
		joins, err := p.parseJoinClauses()
		if err != nil {
			return nil, err
		}
		from.Joins = joins
	}

	return from, nil
}

// parseSetClause parses: SET col = expr [, col = expr ...]
// Column names may be qualified (e.g. t.col); the LHS is parsed with explicit
// dot-checking rather than parseExprRaw because UPDATE SET always assigns to a
// simple or qualified column name, never a computed expression.
func (p *parser) parseSetClause() ([]UpdateSet, error) {
	if err := p.expectKeyword("SET"); err != nil {
		return nil, err
	}
	var sets []UpdateSet
	for {
		colTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		colName := colTok.Value
		if p.curIs(lexer.Dot) {
			p.advance() // consume '.'
			fieldTok, err := p.expectIdent()
			if err != nil {
				return nil, err
			}
			colName = colName + "." + fieldTok.Value
		}

		if _, err := p.expect(lexer.Eq); err != nil {
			return nil, err
		}

		expr := p.parseExpr(func() bool {
			return p.curIs(lexer.Comma) ||
				p.curKeyword("WHERE") ||
				p.curKeyword("FROM") ||
				p.curIs(lexer.Semicolon) ||
				p.curIs(lexer.EOF)
		})
		sets = append(sets, UpdateSet{Column: colName, Value: expr})

		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ',' between assignments
	}
	return sets, nil
}

// parseDelete handles:
//
//	DELETE FROM <table> [AS <alias>] [WHERE <predicate>] [;]
//	DELETE <alias> FROM <table> AS <alias> [WHERE <predicate>] [;]
//
// The second form is the SQL Server style where the target alias appears
// before FROM as well as in the AS clause after the table name.
func (p *parser) parseDelete() (Statement, error) {
	p.advance() // consume DELETE

	// Optional pre-FROM alias (SQL Server style: DELETE alias FROM ...).
	// We detect it by checking whether the current token is an identifier
	// immediately followed by the FROM keyword.
	if (p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent)) && p.peekKeyword("FROM") {
		p.advance() // consume alias — the AS clause after the table is authoritative
	}

	if err := p.expectKeyword("FROM"); err != nil {
		return nil, err
	}

	deleteName, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}

	stmt := &DeleteStmt{Table: deleteName}

	if p.curKeyword("AS") {
		p.advance()
		aliasTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		stmt.Alias = aliasTok.Value
		stmt.AliasExplicit = true
	} else if (p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent)) && !p.curKeyword("WHERE") {
		stmt.Alias = p.cur.Value
		p.advance()
	}

	if p.curKeyword("WHERE") {
		p.advance()
		stmt.Where = p.parseAndChain(func() bool {
			return p.curIs(lexer.Semicolon) || p.curIs(lexer.EOF)
		})
	}

	p.consumeSemicolon()

	return stmt, nil
}

// parseMerge handles:
//
//	MERGE [INTO] <target> [AS <alias>]
//	USING <source> [AS <alias>]
//	ON <condition>
//	WHEN MATCHED [AND <cond>] THEN UPDATE SET ... | DELETE
//	WHEN NOT MATCHED [BY TARGET|SOURCE] [AND <cond>] THEN INSERT ... | UPDATE SET ... | DELETE
//	[;]
func (p *parser) parseMerge() (Statement, error) {
	p.advance() // consume MERGE
	if p.curKeyword("INTO") {
		p.advance() // consume optional INTO
	}

	mergeTarget, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	stmt := &MergeStmt{Target: mergeTarget}

	if p.curKeyword("AS") {
		p.advance()
		aliasTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		stmt.TargetAlias = aliasTok.Value
	} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
		stmt.TargetAlias = p.cur.Value
		p.advance()
	}

	if err := p.expectKeyword("USING"); err != nil {
		return nil, err
	}

	source, err := p.parseFromSource()
	if err != nil {
		return nil, err
	}
	stmt.Source = source

	if err := p.expectKeyword("ON"); err != nil {
		return nil, err
	}

	// The ON condition may be paren-wrapped in canonical output (for round-trip
	// idempotency). Consume the outer parens so the stored expression is bare.
	var on Expr
	if p.curIs(lexer.LParen) {
		p.advance()
		on = p.parseExpr(func() bool {
			return p.curIs(lexer.RParen) || p.curIs(lexer.EOF)
		})
		if _, err := p.expect(lexer.RParen); err != nil {
			return nil, err
		}
	} else {
		on = p.parseExpr(func() bool {
			return p.curKeyword("WHEN") || p.curIs(lexer.Semicolon) || p.curIs(lexer.EOF)
		})
	}
	stmt.On = on

	for p.curKeyword("WHEN") {
		clause, err := p.parseMergeWhenClause()
		if err != nil {
			return nil, err
		}
		stmt.Clauses = append(stmt.Clauses, clause)
	}

	p.consumeSemicolon()
	return stmt, nil
}

// parseMergeMatchType parses the MATCHED / NOT MATCHED [BY SOURCE|TARGET]
// portion of a WHEN clause. MATCHED, SOURCE, and TARGET are non-reserved SQL
// words — curValue is used so they are recognised regardless of token type.
func (p *parser) parseMergeMatchType() (MergeMatchType, error) {
	if p.curValue("MATCHED") {
		p.advance()
		return MergeMatched, nil
	}
	if p.curKeyword("NOT") {
		p.advance()
		if !p.curValue("MATCHED") {
			return 0, fmt.Errorf(
				"expected MATCHED after WHEN NOT at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		p.advance()
		if p.curKeyword("BY") {
			p.advance()
			if p.curValue("SOURCE") {
				p.advance()
				return MergeNotMatchedBySource, nil
			}
			if p.curValue("TARGET") {
				p.advance()
				return MergeNotMatchedByTarget, nil
			}
			return 0, fmt.Errorf(
				"expected SOURCE or TARGET after WHEN NOT MATCHED BY at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		return MergeNotMatchedByTarget, nil
	}
	return 0, fmt.Errorf(
		"expected MATCHED or NOT after WHEN at %d:%d, got %s %q",
		p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
	)
}

// parseMergeAction parses the UPDATE SET … | DELETE | INSERT … portion that
// follows THEN in a WHEN clause, writing results directly into clause.
func (p *parser) parseMergeAction(clause *MergeWhenClause) error {
	switch {
	case p.curKeyword("UPDATE"):
		p.advance()
		sets, err := p.parseMergeSetClause()
		if err != nil {
			return err
		}
		clause.Action = MergeActionUpdate
		clause.Sets = sets
	case p.curKeyword("DELETE"):
		p.advance()
		clause.Action = MergeActionDelete
	case p.curKeyword("INSERT"):
		p.advance()
		if p.curIs(lexer.LParen) {
			cols, err := p.parseIdentList()
			if err != nil {
				return err
			}
			clause.Columns = cols
		}
		if err := p.expectKeyword("VALUES"); err != nil {
			return err
		}
		row, err := p.parseValueRow()
		if err != nil {
			return err
		}
		clause.Action = MergeActionInsert
		clause.Values = row
	default:
		return fmt.Errorf(
			"expected UPDATE, DELETE, or INSERT after THEN at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	return nil
}

// parseMergeWhenClause parses one WHEN … THEN … clause.
func (p *parser) parseMergeWhenClause() (MergeWhenClause, error) {
	p.advance() // consume WHEN

	var clause MergeWhenClause
	matchType, err := p.parseMergeMatchType()
	if err != nil {
		return MergeWhenClause{}, err
	}
	clause.MatchType = matchType

	if p.curKeyword("AND") {
		p.advance()
		// AND conditions may also be paren-wrapped in canonical output.
		var cond Expr
		if p.curIs(lexer.LParen) {
			p.advance()
			cond = p.parseExpr(func() bool {
				return p.curIs(lexer.RParen) || p.curIs(lexer.EOF)
			})
			if _, err := p.expect(lexer.RParen); err != nil {
				return MergeWhenClause{}, err
			}
		} else {
			cond = p.parseExpr(func() bool {
				return p.curKeyword("THEN")
			})
		}
		clause.Condition = cond
	}

	if err := p.expectKeyword("THEN"); err != nil {
		return MergeWhenClause{}, err
	}

	if err := p.parseMergeAction(&clause); err != nil {
		return MergeWhenClause{}, err
	}

	return clause, nil
}

// parseMergeSetClause parses: SET col = expr [, col = expr ...]
// Like parseSetClause but stops at WHEN (next clause boundary) in addition
// to the standard terminators.
func (p *parser) parseMergeSetClause() ([]UpdateSet, error) {
	if err := p.expectKeyword("SET"); err != nil {
		return nil, err
	}
	var sets []UpdateSet
	for {
		colTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		colName := colTok.Value
		if p.curIs(lexer.Dot) {
			p.advance()
			fieldTok, err := p.expectIdent()
			if err != nil {
				return nil, err
			}
			colName = colName + "." + fieldTok.Value
		}
		if _, err := p.expect(lexer.Eq); err != nil {
			return nil, err
		}
		expr := p.parseExpr(func() bool {
			return p.curIs(lexer.Comma) ||
				p.curKeyword("WHEN") ||
				p.curIs(lexer.Semicolon) ||
				p.curIs(lexer.EOF)
		})
		sets = append(sets, UpdateSet{Column: colName, Value: expr})
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance()
	}
	return sets, nil
}
