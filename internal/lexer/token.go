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

	// Identifiers and literals.
	Ident       // unquoted identifier: foo, my_table
	QuotedIdent // double-quoted identifier: "My Table"
	StringLit   // single-quoted string: 'hello'
	IntLit      // integer literal: 42
	FloatLit    // floating-point literal: 3.14, .5, 1e10

	// Keyword is a single type for all SQL reserved words.
	// The Value field preserves original casing; normalization is the
	// formatter's responsibility, not the lexer's.
	Keyword

	// Operators.
	Eq        // =
	NotEq     // <> or !=
	Lt        // <
	Gt        // >
	LtEq      // <=
	GtEq      // >=
	Plus      // +
	Minus     // -
	Star      // *
	Slash     // /
	Percent   // %
	Concat    // ||
	Ampersand // & (bitwise AND)
	Pipe      // | (bitwise OR)
	Caret     // ^ (bitwise XOR)
	Tilde     // ~ (bitwise NOT, unary)

	// Punctuation.
	LParen    // (
	RParen    // )
	Comma     // ,
	Semicolon // ;
	Dot       // .
	Colon     // :

	// Comments are preserved as tokens — user comments must never be dropped.
	LineComment  // -- comment text (includes leading --)
	BlockComment // /* comment text */ (includes delimiters)
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
