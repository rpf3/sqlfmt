package parser

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// builtinFunctions is the set of SQL built-in function names that sqlfmt
// normalises to lowercase regardless of how they appear in the source.
var builtinFunctions = map[string]bool{
	// Aggregate
	"COUNT": true, "SUM": true, "AVG": true, "MAX": true, "MIN": true,
	"STRING_AGG": true, "LISTAGG": true, "GROUP_CONCAT": true,
	// Window
	"ROW_NUMBER": true, "RANK": true, "DENSE_RANK": true, "NTILE": true,
	"LAG": true, "LEAD": true, "FIRST_VALUE": true, "LAST_VALUE": true,
	"CUME_DIST": true, "PERCENT_RANK": true,
	// Null / conditional
	"COALESCE": true, "NULLIF": true, "ISNULL": true, "NVL": true,
	"IFNULL": true, "IIF": true,
	// String
	"UPPER": true, "LOWER": true, "TRIM": true, "LTRIM": true, "RTRIM": true,
	"LEN": true, "LENGTH": true, "SUBSTRING": true, "SUBSTR": true,
	"REPLACE": true, "CHARINDEX": true, "PATINDEX": true, "STUFF": true,
	"CONCAT": true,
	// Date / time
	"GETDATE": true, "NOW": true, "DATEADD": true, "DATEDIFF": true,
	"DATEPART": true, "DATENAME": true, "YEAR": true, "MONTH": true, "DAY": true,
	"EOMONTH": true, "SYSDATETIME": true, "FORMAT": true,
	// Type conversion (CAST is already a keyword)
	"CONVERT": true, "TRY_CAST": true, "TRY_CONVERT": true,
	"PARSE": true, "TRY_PARSE": true,
	// Numeric
	"ROUND": true, "FLOOR": true, "CEILING": true,
	"ABS": true, "POWER": true, "SQRT": true, "SIGN": true,
}

// exprToken returns the normalised string for a single expression token:
// keywords are lowercased; known built-in function names are lowercased;
// everything else is preserved verbatim.
func exprToken(tok lexer.Token) string {
	if tok.Type == lexer.Keyword {
		return strings.ToLower(tok.Value)
	}
	if tok.Type == lexer.Ident && builtinFunctions[strings.ToUpper(tok.Value)] {
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

// parseExpr wraps parseExprRaw into a RawExpr, providing a zero-behaviour-change
// bridge from string-based parsing to the Expr interface. Callers that do not
// need AND-splitting should use this instead of parseExprRaw directly.
func (p *parser) parseExpr(stopFn func() bool) Expr {
	text, _ := p.parseExprRaw(stopFn)
	return &RawExpr{Text: text}
}

// parseAndChain splits an expression on top-level AND tokens, returning an
// AndChain when more than one term is found, or a single RawExpr otherwise.
// This enables the formatter to emit multi-line WHERE/HAVING/ON predicates
// (#101) while keeping Render(result) == parseExprRaw(same stopFn) for all
// inputs — golden tests remain byte-identical.
func (p *parser) parseAndChain(stopFn func() bool) Expr {
	var terms []Expr
	for {
		// Read one AND-term: stop at AND (at depth 0) or at the caller's stop.
		text, _ := p.parseExprRaw(func() bool {
			return p.curKeyword("AND") || stopFn()
		})
		terms = append(terms, &RawExpr{Text: text})

		// If the caller's stop condition fired (not AND), we're done.
		if !p.curKeyword("AND") {
			break
		}
		p.advance() // consume AND
	}

	if len(terms) == 1 {
		return terms[0]
	}
	return &AndChain{Terms: terms}
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
