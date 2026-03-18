package parser

import (
	"fmt"
	"strings"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// parseSet handles SET statement variants:
//   - SET <option> <value>               (SetSimple)
//   - SET TRANSACTION ISOLATION LEVEL …  (SetTransactionIsolation)
//   - SET IDENTITY_INSERT <table> ON|OFF (SetIdentityInsert)
func (p *parser) parseSet() (Statement, error) {
	p.advance() // consume SET
	switch strings.ToUpper(p.cur.Value) {
	case "TRANSACTION":
		return p.parseSetTransaction()
	case "IDENTITY_INSERT":
		return p.parseSetIdentityInsert()
	default:
		return p.parseSetSimple()
	}
}

// parseSetSimple handles: SET <option> <value> [;].
func (p *parser) parseSetSimple() (Statement, error) {
	if p.cur.Type != lexer.Ident && p.cur.Type != lexer.Keyword {
		return nil, fmt.Errorf(
			"expected option name after SET at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	option := strings.ToUpper(p.cur.Value)
	p.advance()

	if p.cur.Type != lexer.Ident && p.cur.Type != lexer.Keyword &&
		p.cur.Type != lexer.IntLit && p.cur.Type != lexer.FloatLit {
		return nil, fmt.Errorf(
			"expected value after SET %s at %d:%d, got %s %q",
			option, p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	value := p.cur.Value
	p.advance()

	p.consumeSemicolon()

	stmt := &SetStmt{Kind: SetSimple, Option: option, Value: value}
	return stmt, nil
}

// parseSetTransaction handles: SET TRANSACTION ISOLATION LEVEL <level> [;].
func (p *parser) parseSetTransaction() (Statement, error) {
	p.advance() // consume TRANSACTION

	if err := p.expectKeyword("ISOLATION"); err != nil {
		return nil, err
	}
	if err := p.expectKeyword("LEVEL"); err != nil {
		return nil, err
	}

	// Read isolation level: 1 or 2 tokens.
	first := strings.ToUpper(p.cur.Value)
	p.advance()

	var level string
	switch first {
	case "READ":
		second := strings.ToUpper(p.cur.Value)
		if second != "COMMITTED" && second != "UNCOMMITTED" {
			return nil, fmt.Errorf(
				"expected COMMITTED or UNCOMMITTED after READ at %d:%d, got %q",
				p.cur.Line, p.cur.Column, p.cur.Value,
			)
		}
		level = "READ " + second
		p.advance()
	case "REPEATABLE":
		if err := p.expectKeyword("READ"); err != nil {
			return nil, err
		}
		level = "REPEATABLE READ"
	case "SERIALIZABLE", "SNAPSHOT":
		level = first
	default:
		return nil, fmt.Errorf(
			"unknown isolation level %q at %d:%d",
			first, p.cur.Line, p.cur.Column,
		)
	}

	p.consumeSemicolon()

	stmt := &SetStmt{Kind: SetTransactionIsolation, IsolationLevel: level}
	return stmt, nil
}

// parseSetIdentityInsert handles: SET IDENTITY_INSERT <table> ON|OFF [;].
func (p *parser) parseSetIdentityInsert() (Statement, error) {
	p.advance() // consume IDENTITY_INSERT

	if p.cur.Type != lexer.Ident && p.cur.Type != lexer.Keyword {
		return nil, fmt.Errorf(
			"expected table name after SET IDENTITY_INSERT at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	table := p.cur.Value
	p.advance()

	// Handle schema-qualified name (schema.table).
	if p.cur.Type == lexer.Dot {
		p.advance() // consume dot
		if p.cur.Type != lexer.Ident && p.cur.Type != lexer.Keyword {
			return nil, fmt.Errorf(
				"expected table name after dot at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		table = table + "." + p.cur.Value
		p.advance()
	}

	onOff := strings.ToUpper(p.cur.Value)
	if onOff != "ON" && onOff != "OFF" {
		return nil, fmt.Errorf(
			"expected ON or OFF after SET IDENTITY_INSERT %s at %d:%d, got %q",
			table, p.cur.Line, p.cur.Column, p.cur.Value,
		)
	}
	enabled := onOff == "ON"
	p.advance()

	p.consumeSemicolon()

	stmt := &SetStmt{Kind: SetIdentityInsert, Table: table, Enabled: enabled}
	return stmt, nil
}
