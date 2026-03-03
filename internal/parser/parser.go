package parser

import (
	"fmt"
	"strings"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// ParseResult holds the output of a parse run.
type ParseResult struct {
	Statements []Statement
	Errors     []error
}

// Parse parses input and returns a ParseResult.
// On any unrecognised token or unexpected structure, an error is recorded
// and parsing stops for that statement (no recovery yet).
func Parse(input string) ParseResult {
	p := &parser{lex: lexer.New(input)}
	p.advance() // load cur
	p.advance() // load peek
	return p.parseAll()
}

// ─── parser internals ────────────────────────────────────────────────────────

type parser struct {
	lex  *lexer.Lexer
	cur  lexer.Token
	peek lexer.Token
}

// advance shifts the lookahead window forward by one token, skipping comments.
func (p *parser) advance() {
	p.cur = p.peek
	for {
		tok := p.lex.Next()
		if tok.Type != lexer.LineComment && tok.Type != lexer.BlockComment {
			p.peek = tok
			return
		}
	}
}

// curIs reports whether cur has the given type.
func (p *parser) curIs(t lexer.TokenType) bool { return p.cur.Type == t }

// curKeyword reports whether cur is the keyword kw (case-insensitive).
func (p *parser) curKeyword(kw string) bool {
	return p.cur.Type == lexer.Keyword && strings.EqualFold(p.cur.Value, kw)
}

// peekKeyword reports whether peek is the keyword kw (case-insensitive).
func (p *parser) peekKeyword(kw string) bool {
	return p.peek.Type == lexer.Keyword && strings.EqualFold(p.peek.Value, kw)
}

// expect consumes cur if it matches t and returns it; otherwise records an
// error and returns the zero Token.
func (p *parser) expect(t lexer.TokenType) (lexer.Token, error) {
	tok := p.cur
	if tok.Type != t {
		return lexer.Token{}, fmt.Errorf(
			"expected %s at %d:%d, got %s %q",
			t, tok.Line, tok.Column, tok.Type, tok.Value,
		)
	}
	p.advance()
	return tok, nil
}

// expectKeyword consumes cur if it is the keyword kw; otherwise records an error.
func (p *parser) expectKeyword(kw string) error {
	if !p.curKeyword(kw) {
		return fmt.Errorf(
			"expected keyword %s at %d:%d, got %s %q",
			strings.ToUpper(kw), p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	p.advance()
	return nil
}

// expectIdent consumes cur if it is a bare or quoted identifier.
func (p *parser) expectIdent() (lexer.Token, error) {
	tok := p.cur
	if tok.Type != lexer.Ident && tok.Type != lexer.QuotedIdent {
		return lexer.Token{}, fmt.Errorf(
			"expected identifier at %d:%d, got %s %q",
			tok.Line, tok.Column, tok.Type, tok.Value,
		)
	}
	p.advance()
	return tok, nil
}

// parseIdentList parses a parenthesised comma-separated list of identifiers.
func (p *parser) parseIdentList() ([]string, error) {
	if _, err := p.expect(lexer.LParen); err != nil {
		return nil, err
	}
	var idents []string
	for {
		tok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		idents = append(idents, tok.Value)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	if _, err := p.expect(lexer.RParen); err != nil {
		return nil, err
	}
	return idents, nil
}

// parseAll drives the top-level parse loop.
func (p *parser) parseAll() ParseResult {
	var res ParseResult
	for !p.curIs(lexer.EOF) {
		// Skip stray semicolons between statements.
		if p.curIs(lexer.Semicolon) {
			p.advance()
			continue
		}
		stmt, err := p.parseStatement()
		if err != nil {
			res.Errors = append(res.Errors, err)
			return res
		}
		res.Statements = append(res.Statements, stmt)
	}
	return res
}

// parseStatement dispatches on the current keyword.
func (p *parser) parseStatement() (Statement, error) {
	if p.curKeyword("CREATE") {
		return p.parseCreate()
	}
	if p.curKeyword("ALTER") {
		return p.parseAlter()
	}
	if p.curKeyword("DROP") {
		return p.parseDrop()
	}
	if p.curKeyword("SELECT") {
		return p.parseSelect()
	}
	if p.curKeyword("WITH") {
		return p.parseWithSelect()
	}
	if p.curKeyword("TRUNCATE") {
		return p.parseTruncate()
	}
	if p.curKeyword("DELETE") {
		return p.parseDelete()
	}
	return nil, fmt.Errorf(
		"unexpected token %s %q at %d:%d",
		p.cur.Type, p.cur.Value, p.cur.Line, p.cur.Column,
	)
}
