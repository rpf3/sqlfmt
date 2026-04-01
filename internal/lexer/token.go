package lexer

import "fmt"

// TokenType identifies the syntactic category of a Token.
type TokenType int

const (
	// EOF is returned repeatedly once the input is exhausted.
	EOF TokenType = iota
	// Illegal represents an unrecognized character or malformed literal.
	// The lexer emits one Illegal token and continues rather than halting,
	// so all bad characters are surfaced in a single pass.
	Illegal

	// Ident is an unquoted identifier token (e.g. foo, my_table).
	Ident
	// QuotedIdent is a double-quoted identifier token (e.g. "My Table").
	QuotedIdent
	// StringLit is a single-quoted string literal token (e.g. 'hello').
	StringLit
	// IntLit is an integer literal token (e.g. 42) or hex literal (e.g. 0xFF).
	IntLit
	// FloatLit is a floating-point literal token (e.g. 3.14, .5, 1e10).
	FloatLit

	// Keyword is a single type for all SQL reserved words.
	// The Value field preserves original casing; normalization is the
	// formatter's responsibility, not the lexer's.
	Keyword

	// Eq represents the = comparison or assignment operator.
	Eq
	// NotEq represents the <> or != not-equal operator.
	NotEq
	// Lt represents the < less-than operator.
	Lt
	// Gt represents the > greater-than operator.
	Gt
	// LtEq represents the <= less-than-or-equal operator.
	LtEq
	// GtEq represents the >= greater-than-or-equal operator.
	GtEq
	// Plus represents the + addition operator.
	Plus
	// Minus represents the - subtraction or negation operator.
	Minus
	// Star represents the * multiplication or wildcard token.
	Star
	// Slash represents the / division operator.
	Slash
	// Percent represents the % modulo operator.
	Percent
	// Concat represents the || string concatenation operator.
	Concat
	// Ampersand represents the & bitwise AND operator.
	Ampersand
	// Pipe represents the | bitwise OR operator.
	Pipe
	// Caret represents the ^ bitwise XOR operator.
	Caret
	// Tilde represents the ~ bitwise NOT (unary) operator.
	Tilde

	// PlusEq represents the += compound assignment operator.
	PlusEq
	// MinusEq represents the -= compound assignment operator.
	MinusEq
	// StarEq represents the *= compound assignment operator.
	StarEq
	// SlashEq represents the /= compound assignment operator.
	SlashEq
	// PercentEq represents the %= compound assignment operator.
	PercentEq

	// LParen represents the ( left parenthesis.
	LParen
	// RParen represents the ) right parenthesis.
	RParen
	// Comma represents the , separator.
	Comma
	// Semicolon represents the ; statement terminator.
	Semicolon
	// Dot represents the . member-access separator.
	Dot
	// Colon represents the : label separator.
	Colon

	// LineComment is a -- comment token; includes the leading --.
	// User comments must never be dropped.
	LineComment
	// BlockComment is a /* ... */ comment token; includes the delimiters.
	// User comments must never be dropped.
	BlockComment
)

var tokenTypeNames = map[TokenType]string{
	EOF:          "EOF",
	Illegal:      "Illegal",
	Ident:        "Ident",
	QuotedIdent:  "QuotedIdent",
	StringLit:    "StringLit",
	IntLit:       "IntLit",
	FloatLit:     "FloatLit",
	Keyword:      "Keyword",
	Eq:           "Eq",
	NotEq:        "NotEq",
	Lt:           "Lt",
	Gt:           "Gt",
	LtEq:         "LtEq",
	GtEq:         "GtEq",
	Plus:         "Plus",
	Minus:        "Minus",
	Star:         "Star",
	Slash:        "Slash",
	Percent:      "Percent",
	Concat:       "Concat",
	Ampersand:    "Ampersand",
	Pipe:         "Pipe",
	Caret:        "Caret",
	Tilde:        "Tilde",
	PlusEq:       "PlusEq",
	MinusEq:      "MinusEq",
	StarEq:       "StarEq",
	SlashEq:      "SlashEq",
	PercentEq:    "PercentEq",
	LParen:       "LParen",
	RParen:       "RParen",
	Comma:        "Comma",
	Semicolon:    "Semicolon",
	Dot:          "Dot",
	Colon:        "Colon",
	LineComment:  "LineComment",
	BlockComment: "BlockComment",
}

// String returns the name of the token type, e.g. "Ident", "EOF".
func (t TokenType) String() string {
	if name, ok := tokenTypeNames[t]; ok {
		return name
	}
	return fmt.Sprintf("TokenType(%d)", int(t))
}

// Token is a single lexical unit produced by the lexer.
type Token struct {
	Type   TokenType
	Value  string // verbatim source text; never normalized by the lexer
	Line   int    // 1-based line number
	Column int    // 1-based byte offset within the line
}

// String returns a human-readable representation useful for debugging and
// test failure messages.
func (t Token) String() string {
	return fmt.Sprintf("Token{%s %q %d:%d}", t.Type, t.Value, t.Line, t.Column)
}
