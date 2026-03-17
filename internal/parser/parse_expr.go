package parser

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// sqlDataTypes is the set of SQL data type names that sqlfmt normalises to
// lowercase regardless of how they appear in the source. These tokenize as
// Ident (not Keyword) so they are not covered by the keyword lowercasing path.
var sqlDataTypes = map[string]bool{
	// Exact numerics
	"BIGINT": true, "INT": true, "INTEGER": true, "SMALLINT": true, "TINYINT": true,
	"DECIMAL": true, "NUMERIC": true, "MONEY": true, "SMALLMONEY": true, "BIT": true,
	// Approximate numerics
	"FLOAT": true, "REAL": true,
	// Character strings
	"CHAR": true, "VARCHAR": true, "TEXT": true,
	"NCHAR": true, "NVARCHAR": true, "NTEXT": true,
	// Binary
	"BINARY": true, "VARBINARY": true, "IMAGE": true,
	// Date / time
	"DATE": true, "TIME": true, "DATETIME": true, "DATETIME2": true,
	"DATETIMEOFFSET": true, "SMALLDATETIME": true,
	// Other
	"UNIQUEIDENTIFIER": true, "XML": true, "SQL_VARIANT": true,
}

// builtinFunctions is the set of SQL built-in function names that sqlfmt
// normalises to lowercase regardless of how they appear in the source.
var builtinFunctions = map[string]bool{
	// Aggregate
	"COUNT": true, "SUM": true, "AVG": true, "MAX": true, "MIN": true,
	"STRING_AGG": true,
	// Window
	"ROW_NUMBER": true, "RANK": true, "DENSE_RANK": true, "NTILE": true,
	"LAG": true, "LEAD": true, "FIRST_VALUE": true, "LAST_VALUE": true,
	"CUME_DIST": true, "PERCENT_RANK": true,
	// Null / conditional
	"COALESCE": true, "NULLIF": true, "ISNULL": true, "IIF": true,
	// String
	"UPPER": true, "LOWER": true, "TRIM": true, "LTRIM": true, "RTRIM": true,
	"LEN": true, "SUBSTRING": true,
	"REPLACE": true, "CHARINDEX": true, "PATINDEX": true, "STUFF": true,
	"CONCAT": true,
	// Date / time
	"GETDATE": true, "DATEADD": true, "DATEDIFF": true,
	"DATEPART": true, "DATENAME": true, "YEAR": true, "MONTH": true, "DAY": true,
	"EOMONTH": true, "SYSDATETIME": true, "FORMAT": true,
	// Type conversion (CAST is already a keyword)
	"CONVERT": true, "TRY_CAST": true, "TRY_CONVERT": true,
	"PARSE": true, "TRY_PARSE": true,
	// Numeric
	"ROUND": true, "FLOOR": true, "CEILING": true,
	"ABS": true, "POWER": true, "SQRT": true, "SIGN": true,
	// JSON (SQL Server 2016+)
	"JSON_VALUE": true, "JSON_QUERY": true, "JSON_MODIFY": true,
	"ISJSON": true, "JSON_PATH_EXISTS": true,
}

// exprToken returns the normalised string for a single expression token:
// keywords are lowercased; known built-in function names and SQL data type
// names are lowercased; @@system variables are lowercased; everything else
// is preserved verbatim (user-defined names).
func exprToken(tok lexer.Token) string {
	if tok.Type == lexer.Keyword {
		return strings.ToLower(tok.Value)
	}
	if tok.Type == lexer.Ident {
		upper := strings.ToUpper(tok.Value)
		if builtinFunctions[upper] || sqlDataTypes[upper] {
			return strings.ToLower(tok.Value)
		}
		if strings.HasPrefix(tok.Value, "@@") {
			return strings.ToLower(tok.Value)
		}
	}
	return tok.Value
}

// isFunctionKeyword reports whether a keyword acts as a function call and
// should therefore not have a space inserted between it and an opening
// parenthesis. CAST(x AS t) is the canonical example.
// Clause/operator keywords such as OVER, IN, and EXISTS keep their spaces.
func isFunctionKeyword(kw string) bool {
	switch strings.ToUpper(kw) {
	case "CAST", "CONVERT", "COALESCE", "NULLIF", "ISNULL",
		"TRY_CAST", "TRY_CONVERT":
		return true
	}
	return false
}

// needsSelectSpace reports whether a space should be written between two
// consecutive tokens when building a normalised expression string.
// It applies SQL conventions: no space around dots, no space between an
// identifier and its opening paren (function call), no space before a
// closing paren or comma.
// prevValue is the raw value of the previous token; it is used to
// distinguish function-call keywords (CAST, COALESCE, …) from clause
// keywords (OVER, IN, EXISTS, …) when prev is Keyword and cur is LParen.
func needsSelectSpace(prev, cur lexer.TokenType, prevValue string) bool {
	if prev == lexer.LParen || prev == lexer.Dot {
		return false
	}
	if cur == lexer.RParen || cur == lexer.Dot || cur == lexer.Comma {
		return false
	}
	// No space between an identifier or function-call keyword and the
	// following open-paren.  Clause/operator keywords (OVER, IN, EXISTS)
	// keep their space.
	if cur == lexer.LParen {
		if prev == lexer.Ident || prev == lexer.QuotedIdent {
			return false
		}
		if prev == lexer.Keyword && isFunctionKeyword(prevValue) {
			return false
		}
	}
	return true
}

// parseExpr parses a single expression, lifting top-level function calls into
// *FunctionCallExpr nodes when possible. Falls back to *RawExpr otherwise.
// Callers that do not need AND-splitting should use this instead of parseExprRaw directly.
func (p *parser) parseExpr(stopFn func() bool) Expr {
	return p.parseExprNode(stopFn)
}

// parseAndChain splits an expression on top-level AND tokens, returning an
// AndChain when more than one term is found, or a single node otherwise.
// This enables the formatter to emit multi-line WHERE/HAVING/ON predicates
// (#101) while keeping Render(result) == parseExprRaw(same stopFn) for all
// inputs — golden tests remain byte-identical.
func (p *parser) parseAndChain(stopFn func() bool) Expr {
	var terms []Expr
	for {
		// Read one AND-term: stop at AND (at depth 0) or at the caller's stop.
		term := p.parseExprNode(func() bool {
			return p.curKeyword("AND") || stopFn()
		})
		terms = append(terms, term)

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

// parseExprNode wraps parseExprRaw but lifts top-level function calls into
// *FunctionCallExpr nodes. When the expression does not start with a function
// call, or when the function call is only part of a larger expression (e.g.
// count(*) + 1), it falls back to *RawExpr — preserving the Render invariant.
func (p *parser) parseExprNode(stopFn func() bool) Expr {
	if p.cur.Type == lexer.Ident && p.peek.Type == lexer.LParen {
		fn := p.parseFunctionCall()
		// If the function call consumed the entire expression, return it structured.
		if p.cur.Type == lexer.EOF || p.cur.Type == lexer.RParen || stopFn() {
			return fn
		}
		// More tokens follow — render fn back to string and accumulate the rest.
		rest, _ := p.parseExprRaw(stopFn)
		return &RawExpr{Text: Render(fn) + " " + rest}
	}
	text, _ := p.parseExprRaw(stopFn)
	return &RawExpr{Text: text}
}

// parseFunctionCall parses a function call starting at the current Ident token.
// On entry: p.cur is the function name Ident; p.peek is LParen.
// On exit: p.cur is positioned after the closing RParen (and OVER clause if present).
func (p *parser) parseFunctionCall() *FunctionCallExpr {
	name := exprToken(p.cur) // normalize (lowercase built-in names)
	p.advance()              // consume ident
	p.advance()              // consume (

	fn := &FunctionCallExpr{Name: name}

	if p.cur.Type == lexer.Star {
		fn.Star = true
		p.advance() // consume *
		p.advance() // consume )
	} else {
		for p.cur.Type != lexer.RParen && p.cur.Type != lexer.EOF {
			arg := p.parseExprNode(func() bool {
				return p.cur.Type == lexer.Comma || p.cur.Type == lexer.RParen
			})
			fn.Args = append(fn.Args, arg)
			if p.cur.Type == lexer.Comma {
				p.advance() // consume ,
			}
		}
		if p.cur.Type == lexer.RParen {
			p.advance() // consume )
		}
	}

	// Window function: check for OVER (
	if p.curKeyword("OVER") && p.peek.Type == lexer.LParen {
		p.advance() // consume OVER
		fn.Over = p.parseWindowSpec()
	}

	return fn
}

// parseWindowSpec parses the parenthesised OVER clause of a window function.
// On entry: p.cur is LParen (the opening paren of the OVER clause).
// On exit: p.cur is positioned after the closing RParen.
func (p *parser) parseWindowSpec() *WindowSpec {
	p.advance() // consume (
	ws := &WindowSpec{}

	if p.curKeyword("PARTITION") {
		p.advance() // consume PARTITION
		p.advance() // consume BY
		for {
			expr := p.parseExprNode(func() bool {
				return p.cur.Type == lexer.Comma ||
					p.curKeyword("ORDER") ||
					p.cur.Type == lexer.RParen
			})
			ws.PartitionBy = append(ws.PartitionBy, expr)
			if p.cur.Type == lexer.Comma {
				p.advance()
			} else {
				break
			}
		}
	}

	if p.curKeyword("ORDER") {
		p.advance() // consume ORDER
		p.advance() // consume BY
		for {
			val := p.parseExprNode(func() bool {
				return p.curKeyword("ASC") || p.curKeyword("DESC") ||
					p.cur.Type == lexer.Comma || p.cur.Type == lexer.RParen
			})
			dir := DirectionNone
			if p.curKeyword("ASC") {
				dir = DirectionAsc
				p.advance()
			} else if p.curKeyword("DESC") {
				dir = DirectionDesc
				p.advance()
			}
			ws.OrderBy = append(ws.OrderBy, OrderItem{Value: val, Direction: dir})
			if p.cur.Type == lexer.Comma {
				p.advance()
			} else {
				break
			}
		}
	}

	if p.cur.Type == lexer.RParen {
		p.advance() // consume )
	}
	return ws
}

// parseExprRaw reads tokens into a normalised expression string, tracking
// parenthesis depth. At depth > 0 all tokens are consumed unconditionally.
// At depth 0, reading stops when stopFn returns true, when an unmatched
// RParen is reached, or at EOF. Keywords are lowercased; spacing follows
// SQL conventions via needsSelectSpace.
//
// Two additional depth counters suppress premature AND-chain splitting:
//   - betweenPending: set by BETWEEN, cleared when its range AND is consumed.
//   - caseDepth: incremented by CASE, decremented by END.
//
// The stopFn is only consulted when depth == 0, caseDepth == 0, and
// betweenPending is false, ensuring AND inside BETWEEN…AND and CASE…END
// is never mistaken for a top-level chain separator.
func (p *parser) parseExprRaw(stopFn func() bool) (string, error) {
	var b strings.Builder
	var prevType lexer.TokenType
	var prevValue string
	hasToken := false
	depth := 0
	caseDepth := 0
	betweenPending := false

	for {
		tok := p.cur
		switch {
		case tok.Type == lexer.EOF:
			return b.String(), nil
		case tok.Type == lexer.RParen && depth == 0:
			return b.String(), nil // unmatched close-paren; leave for caller
		case depth == 0 && caseDepth == 0 && !betweenPending && stopFn():
			return b.String(), nil
		}

		if tok.Type == lexer.LParen {
			depth++
		} else if tok.Type == lexer.RParen {
			depth-- // depth was > 0 here
		}

		// Track BETWEEN…AND and CASE…END to suppress AND-chain splitting
		// on range-separator and intra-CASE ANDs.
		if tok.Type == lexer.Keyword {
			switch strings.ToUpper(tok.Value) {
			case "BETWEEN":
				betweenPending = true
			case "AND":
				if betweenPending {
					betweenPending = false // this AND is the range separator; reset
				}
			case "CASE":
				caseDepth++
			case "END":
				if caseDepth > 0 {
					caseDepth--
				}
			}
		}

		if hasToken && needsSelectSpace(prevType, tok.Type, prevValue) {
			b.WriteByte(' ')
		}
		b.WriteString(exprToken(tok))
		prevType = tok.Type
		prevValue = tok.Value
		hasToken = true
		p.advance()
	}
}
