package parser

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// exprToken returns the normalised string for a single expression token:
// keywords are lowercased; everything else is preserved verbatim.
func exprToken(tok lexer.Token) string {
	if tok.Type == lexer.Keyword {
		return strings.ToLower(tok.Value)
	}
	return tok.Value
}

// needsSelectSpace reports whether a space should be written between two
// consecutive tokens when building a normalised expression string.
// It applies SQL conventions: no space around dots, no space between an
// identifier and its opening paren (function call), no space before a
// closing paren or comma.
func needsSelectSpace(prev, cur lexer.TokenType) bool {
	if prev == lexer.LParen || prev == lexer.Dot {
		return false
	}
	if cur == lexer.RParen || cur == lexer.Dot || cur == lexer.Comma {
		return false
	}
	// No space between bare identifier and open-paren (function call).
	// Keyword-before-paren (e.g. OVER (...), IN (...)) keeps the space.
	if cur == lexer.LParen && (prev == lexer.Ident || prev == lexer.QuotedIdent) {
		return false
	}
	return true
}

// parseExprRaw reads tokens into a normalised expression string, tracking
// parenthesis depth. At depth > 0 all tokens are consumed unconditionally.
// At depth 0, reading stops when stopFn returns true, when an unmatched
// RParen is reached, or at EOF. Keywords are lowercased; spacing follows
// SQL conventions via needsSelectSpace.
func (p *parser) parseExprRaw(stopFn func() bool) (string, error) {
	var b strings.Builder
	var prevType lexer.TokenType
	hasToken := false
	depth := 0

	for {
		tok := p.cur
		switch {
		case tok.Type == lexer.EOF:
			return b.String(), nil
		case tok.Type == lexer.RParen && depth == 0:
			return b.String(), nil // unmatched close-paren; leave for caller
		case depth == 0 && stopFn():
			return b.String(), nil
		}

		if tok.Type == lexer.LParen {
			depth++
		} else if tok.Type == lexer.RParen {
			depth-- // depth was > 0 here
		}

		if hasToken && needsSelectSpace(prevType, tok.Type) {
			b.WriteByte(' ')
		}
		b.WriteString(exprToken(tok))
		prevType = tok.Type
		hasToken = true
		p.advance()
	}
}
