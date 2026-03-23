// Package parser implements a recursive-descent parser for T-SQL.
// It converts a token stream produced by the lexer into an abstract syntax
// tree (AST) composed of Statement and Expr values.
//
// The parser maintains a two-token lookahead window (cur and peek). It is
// intentionally non-recovering: when an unexpected token is encountered inside
// a statement, an error is recorded in ParseResult.Errors and parsing of that
// statement stops. Subsequent statements in the same batch are still attempted,
// so a multi-statement file with one bad statement does not block the rest.
//
// Comments are stripped by the lexer and do not appear in the AST.
package parser

import (
	"fmt"
	"strings"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// ParseResult holds the output of a parse run.
type ParseResult struct {
	Statements       []Statement
	SemicolonPresent []bool // one entry per Statement; true when the statement had a trailing semicolon
	Errors           []error
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

// --- parser internals --------------------------------------------------------

type parser struct {
	lex              *lexer.Lexer
	cur              lexer.Token
	peek             lexer.Token
	lastHadSemicolon bool // set by consumeSemicolon; read by parseAll
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

// consumeSemicolon records whether the current token is a semicolon and, if so,
// advances past it. Call this at the end of each top-level statement parser.
func (p *parser) consumeSemicolon() {
	p.lastHadSemicolon = p.curIs(lexer.Semicolon)
	if p.lastHadSemicolon {
		p.advance()
	}
}

// curIs reports whether cur has the given type.
func (p *parser) curIs(t lexer.TokenType) bool { return p.cur.Type == t }

// curKeyword reports whether cur is the keyword kw (case-insensitive).
func (p *parser) curKeyword(kw string) bool {
	return p.cur.Type == lexer.Keyword && strings.EqualFold(p.cur.Value, kw)
}

// curValue reports whether the current token's value equals v (case-insensitive),
// regardless of token type. Used for non-reserved SQL words (MATCHED, SOURCE,
// TARGET) that should remain usable as unquoted identifiers.
func (p *parser) curValue(v string) bool {
	return strings.EqualFold(p.cur.Value, v)
}

// peekValue reports whether peek's value matches v (case-insensitive), regardless of token type.
func (p *parser) peekValue(v string) bool {
	return strings.EqualFold(p.peek.Value, v)
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

// parseQualifiedName parses a possibly schema-qualified name of the form
// ident[.ident]* (e.g. "orders", "dbo.orders", "db.dbo.orders"). It returns
// the full dotted string so that the rest of the parser sees a single value.
func (p *parser) parseQualifiedName() (string, error) {
	tok, err := p.expectIdent()
	if err != nil {
		return "", err
	}
	name := tok.Value
	for p.curIs(lexer.Dot) {
		p.advance() // consume '.'
		part, err := p.expectIdent()
		if err != nil {
			return "", err
		}
		name = name + "." + part.Value
	}
	return name, nil
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
		res.SemicolonPresent = append(res.SemicolonPresent, p.lastHadSemicolon)
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
	if p.curKeyword("INSERT") {
		return p.parseInsert()
	}
	if p.curKeyword("UPDATE") {
		return p.parseUpdate()
	}
	if p.curKeyword("SET") {
		return p.parseSet()
	}
	if p.curKeyword("MERGE") {
		return p.parseMerge()
	}
	if p.curKeyword("DECLARE") {
		return p.parseDeclare()
	}
	if p.curKeyword("IF") {
		return p.parseIf()
	}
	if p.curKeyword("WHILE") {
		return p.parseWhile()
	}
	if p.curKeyword("BEGIN") && p.peekKeyword("TRY") {
		return p.parseTryCatch()
	}
	if p.curKeyword("BEGIN") && (p.peekKeyword("TRANSACTION") || p.peekValue("TRAN")) {
		return p.parseTransaction()
	}
	if p.curKeyword("COMMIT") || p.curKeyword("ROLLBACK") {
		return p.parseTransaction()
	}
	if p.curValue("SAVE") && (p.peekKeyword("TRANSACTION") || p.peekValue("TRAN")) {
		return p.parseTransaction()
	}
	if p.curKeyword("BREAK") {
		p.advance()
		p.consumeSemicolon()
		return &BreakStmt{}, nil
	}
	if p.curKeyword("CONTINUE") {
		p.advance()
		p.consumeSemicolon()
		return &ContinueStmt{}, nil
	}
	if p.curKeyword("RETURN") {
		return p.parseReturn()
	}
	if p.curKeyword("THROW") {
		return p.parseThrow()
	}
	if p.curValue("RAISERROR") {
		return p.parseRaiserror()
	}
	if p.curKeyword("PRINT") {
		return p.parsePrint()
	}
	if (p.curKeyword("EXEC") || p.curKeyword("EXECUTE")) && p.peekKeyword("AS") {
		return p.parseExecuteAs()
	}
	if p.curKeyword("EXEC") || p.curKeyword("EXECUTE") {
		return p.parseExec()
	}
	if p.curKeyword("OPEN") {
		return p.parseOpenCursor()
	}
	if p.curKeyword("CLOSE") {
		return p.parseCloseCursor()
	}
	if p.curKeyword("DEALLOCATE") {
		return p.parseDeallocateCursor()
	}
	if p.curKeyword("FETCH") {
		return p.parseFetchCursor()
	}
	if p.curKeyword("REVERT") {
		return p.parseRevert()
	}
	return nil, fmt.Errorf(
		"unexpected token %s %q at %d:%d",
		p.cur.Type, p.cur.Value, p.cur.Line, p.cur.Column,
	)
}
