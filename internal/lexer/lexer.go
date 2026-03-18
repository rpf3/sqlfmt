// Package lexer converts raw SQL text into a stream of tokens.
// It uses a pull-based model: the parser calls Next() to consume one token at
// a time, which lets the recursive-descent parser manage its own lookahead
// buffer without the lexer needing to know how much look-ahead is required.
//
// Tokens are classified as keywords, identifiers, literals, operators, and
// punctuation. Keyword recognition is case-insensitive. Line and column
// positions are recorded on every token to support error messages.
package lexer

import "fmt"

// Lexer converts raw SQL text into a stream of Tokens.
// It is pull-based: the parser calls Next() to consume one token at a time,
// which allows recursive-descent parsers to manage their own lookahead buffer.
type Lexer struct {
	input  string
	pos    int // current read position (next byte to consume)
	line   int // current 1-based line number
	column int // current 1-based column (byte offset within line)
}

// New creates a Lexer for the given SQL input string.
func New(input string) *Lexer {
	return &Lexer{
		input:  input,
		pos:    0,
		line:   1,
		column: 1,
	}
}

// Next returns the next Token from the input.
// After the input is exhausted, it returns EOF tokens indefinitely.
func (l *Lexer) Next() Token {
	l.skipWhitespace()

	if l.pos >= len(l.input) {
		return l.makeToken(EOF, "")
	}

	ch := l.input[l.pos]

	// N'...' Unicode string literals must be detected before the generic ident
	// reader, because readIdent would consume 'N' as an identifier token and
	// leave the following string for a separate call.
	if (ch == 'N' || ch == 'n') && l.peekAt(1) == '\'' {
		return l.readNString()
	}

	// Identifiers and keywords
	if isIdentStart(ch) {
		return l.readIdent()
	}

	// T-SQL temp table names: #local or ##global followed by identifier chars.
	// A bare '#' with no following identifier is left to fall through to Illegal.
	if ch == '#' {
		next := l.peekAt(1)
		if next == '#' && isIdentStart(l.peekAt(2)) {
			return l.readTempTableIdent()
		}
		if isIdentStart(next) {
			return l.readTempTableIdent()
		}
	}

	// T-SQL variable names: @local or @@system followed by identifier chars.
	// A bare '@' with no following identifier is left to fall through to Illegal.
	if ch == '@' {
		next := l.peekAt(1)
		if next == '@' && isIdentStart(l.peekAt(2)) {
			return l.readAtVar()
		}
		if isIdentStart(next) {
			return l.readAtVar()
		}
	}

	// T-SQL pseudo-column $action (used in MERGE OUTPUT clauses).
	// A bare '$' with no following identifier is left to fall through to Illegal.
	if ch == '$' && isIdentStart(l.peekAt(1)) {
		return l.readDollarIdent()
	}

	// Numbers: digit or leading-dot float (.5)
	if isDigit(ch) {
		return l.readNumber()
	}
	if ch == '.' {
		if next := l.peekAt(1); isDigit(next) {
			return l.readNumber()
		}
		return l.consumeSingle(Dot)
	}

	// String literals
	if ch == '\'' {
		return l.readString()
	}

	// Quoted identifiers — ANSI double-quote or T-SQL bracket style.
	if ch == '"' {
		return l.readQuotedIdent()
	}
	if ch == '[' {
		return l.readBracketIdent()
	}

	// Comments
	if ch == '-' && l.peekAt(1) == '-' {
		return l.readLineComment()
	}
	if ch == '/' && l.peekAt(1) == '*' {
		return l.readBlockComment()
	}

	// Multi-character operators — longer sequences must be tried first.
	switch ch {
	case '<':
		switch l.peekAt(1) {
		case '=':
			return l.consumeDouble(LtEq)
		case '>':
			return l.consumeDouble(NotEq)
		}
		return l.consumeSingle(Lt)
	case '>':
		if l.peekAt(1) == '=' {
			return l.consumeDouble(GtEq)
		}
		return l.consumeSingle(Gt)
	case '!':
		if l.peekAt(1) == '=' {
			return l.consumeDouble(NotEq)
		}
		// bare '!' is not standard SQL; treat as illegal
		return l.consumeIllegal()
	case '|':
		if l.peekAt(1) == '|' {
			return l.consumeDouble(Concat)
		}
		return l.consumeSingle(Pipe)
	case '&':
		return l.consumeSingle(Ampersand)
	case '^':
		return l.consumeSingle(Caret)
	case '~':
		return l.consumeSingle(Tilde)
	}

	// Single-character tokens.
	switch ch {
	case '=':
		return l.consumeSingle(Eq)
	case '+':
		return l.consumeSingle(Plus)
	case '-':
		return l.consumeSingle(Minus)
	case '*':
		return l.consumeSingle(Star)
	case '/':
		return l.consumeSingle(Slash)
	case '%':
		return l.consumeSingle(Percent)
	case '(':
		return l.consumeSingle(LParen)
	case ')':
		return l.consumeSingle(RParen)
	case ',':
		return l.consumeSingle(Comma)
	case ';':
		return l.consumeSingle(Semicolon)
	case ':':
		return l.consumeSingle(Colon)
	}

	// Unrecognized character
	return l.consumeIllegal()
}

// Tokenize is a convenience wrapper that drives the lexer to EOF and returns
// all tokens as a slice. It returns an error if any Illegal token is found.
// Intended primarily for tests and diagnostic tooling.
func Tokenize(input string) ([]Token, error) {
	l := New(input)
	var tokens []Token
	var firstErr error
	for {
		tok := l.Next()
		tokens = append(tokens, tok)
		if tok.Type == Illegal && firstErr == nil {
			firstErr = fmt.Errorf("illegal token %q at %d:%d", tok.Value, tok.Line, tok.Column)
		}
		if tok.Type == EOF {
			break
		}
	}
	return tokens, firstErr
}

// --- Navigation primitives ---------------------------------------------------

// peek returns the current byte without consuming it, or 0 at EOF.
func (l *Lexer) peek() byte {
	if l.pos >= len(l.input) {
		return 0
	}
	return l.input[l.pos]
}

// peekAt returns the byte at pos+offset without consuming anything, or 0 if
// out of range.
func (l *Lexer) peekAt(offset int) byte {
	idx := l.pos + offset
	if idx >= len(l.input) {
		return 0
	}
	return l.input[idx]
}

// advance consumes and returns the current byte, updating line/column tracking.
func (l *Lexer) advance() byte {
	if l.pos >= len(l.input) {
		return 0
	}
	ch := l.input[l.pos]
	l.pos++
	if ch == '\n' {
		l.line++
		l.column = 1
	} else {
		l.column++
	}
	return ch
}

// skipWhitespace consumes all whitespace characters.
// Whitespace is silently discarded: the formatter regenerates all spacing
// from scratch based on the AST, so there is no benefit in tokenizing it.
func (l *Lexer) skipWhitespace() {
	for l.pos < len(l.input) && isWhitespace(l.input[l.pos]) {
		l.advance()
	}
}

// makeToken creates a Token at the current position with the given type and value.
// The position fields are captured before any advance so they point to the
// first character of the token.
func (l *Lexer) makeToken(tokenType TokenType, value string) Token {
	return Token{Type: tokenType, Value: value, Line: l.line, Column: l.column}
}

// makeTokenAt creates a Token with position fields set to a previously saved
// line/column rather than the current position.
func (l *Lexer) makeTokenAt(tokenType TokenType, value string, line, col int) Token {
	return Token{Type: tokenType, Value: value, Line: line, Column: col}
}

// consumeSingle emits a single-character token and advances past it.
func (l *Lexer) consumeSingle(tokenType TokenType) Token {
	line, col := l.line, l.column
	ch := l.advance()
	return l.makeTokenAt(tokenType, string(ch), line, col)
}

// consumeDouble emits a two-character token and advances past both bytes.
func (l *Lexer) consumeDouble(tokenType TokenType) Token {
	line, col := l.line, l.column
	a := l.advance()
	b := l.advance()
	return l.makeTokenAt(tokenType, string([]byte{a, b}), line, col)
}

// consumeIllegal emits an Illegal token for the current byte and advances.
func (l *Lexer) consumeIllegal() Token {
	line, col := l.line, l.column
	ch := l.advance()
	return l.makeTokenAt(Illegal, string(ch), line, col)
}

// --- Sub-readers -------------------------------------------------------------

// readIdent scans a bare identifier or keyword starting at the current position.
// Keywords and identifiers share the same character rules; the distinction is
// made by looking up the uppercased word in the keywords map.
func (l *Lexer) readIdent() Token {
	line, col := l.line, l.column
	start := l.pos
	for l.pos < len(l.input) && isIdentContinue(l.input[l.pos]) {
		l.advance()
	}
	word := l.input[start:l.pos]
	tokenType := Ident
	if isKeyword(word) {
		tokenType = Keyword
	}
	return l.makeTokenAt(tokenType, word, line, col)
}

// readAtVar scans a T-SQL variable name: @local or @@system.
// The leading @ or @@ is included in the token value, which is returned as an Ident.
// Called only when the '@' is followed by a valid identifier start character.
func (l *Lexer) readAtVar() Token {
	line, col := l.line, l.column
	start := l.pos
	l.advance() // consume first '@'
	if l.peek() == '@' {
		l.advance() // consume second '@' for @@system
	}
	for l.pos < len(l.input) && isIdentContinue(l.input[l.pos]) {
		l.advance()
	}
	return l.makeTokenAt(Ident, l.input[start:l.pos], line, col)
}

// readDollarIdent scans a T-SQL pseudo-column name such as $action.
// The leading $ is included in the token value, returned as an Ident.
// Called only when the '$' is followed by a valid identifier start character.
func (l *Lexer) readDollarIdent() Token {
	line, col := l.line, l.column
	start := l.pos
	l.advance() // consume '$'
	for l.pos < len(l.input) && isIdentContinue(l.input[l.pos]) {
		l.advance()
	}
	return l.makeTokenAt(Ident, l.input[start:l.pos], line, col)
}

// readTempTableIdent scans a T-SQL temporary table name: #name or ##name.
// The leading # or ## is included in the token value.
// Called only when the '#' is followed by a valid identifier start character.
func (l *Lexer) readTempTableIdent() Token {
	line, col := l.line, l.column
	start := l.pos
	l.advance() // consume first '#'
	if l.peek() == '#' {
		l.advance() // consume second '#' for ##global
	}
	for l.pos < len(l.input) && isIdentContinue(l.input[l.pos]) {
		l.advance()
	}
	return l.makeTokenAt(Ident, l.input[start:l.pos], line, col)
}

// readBracketIdent scans a T-SQL bracket-quoted identifier: [name].
// A doubled closing bracket (]]) is the escape for a literal ] inside the name.
// On unterminated input an Illegal token is returned with the partial content.
func (l *Lexer) readBracketIdent() Token {
	line, col := l.line, l.column
	start := l.pos
	l.advance() // consume opening '['
	for l.pos < len(l.input) {
		ch := l.input[l.pos]
		if ch == ']' {
			l.advance() // consume ']'
			if l.pos < len(l.input) && l.input[l.pos] == ']' {
				l.advance() // consume second ']' of ]] escape
				continue
			}
			return l.makeTokenAt(QuotedIdent, l.input[start:l.pos], line, col)
		}
		l.advance()
	}
	return l.makeTokenAt(Illegal, l.input[start:l.pos], line, col)
}

// readQuotedIdent scans a double-quoted identifier.
// A doubled double-quote ("") is the ANSI SQL escape for a literal quote
// inside a quoted identifier.
// On unterminated input an Illegal token is returned with the partial content.
func (l *Lexer) readQuotedIdent() Token {
	line, col := l.line, l.column
	start := l.pos
	l.advance() // consume opening '"'
	for l.pos < len(l.input) {
		ch := l.input[l.pos]
		if ch == '"' {
			l.advance() // consume closing '"' (or first '"' of escape)
			if l.pos < len(l.input) && l.input[l.pos] == '"' {
				l.advance() // consume second '"' of "" escape
				continue
			}
			return l.makeTokenAt(QuotedIdent, l.input[start:l.pos], line, col)
		}
		l.advance()
	}
	// Unterminated — emit Illegal with whatever we collected
	return l.makeTokenAt(Illegal, l.input[start:l.pos], line, col)
}

// readString scans a single-quoted string literal.
// A doubled single-quote (”) is the ANSI SQL escape for a literal quote
// inside a string.
// On unterminated input an Illegal token is returned with the partial content.
func (l *Lexer) readString() Token {
	line, col := l.line, l.column
	start := l.pos
	l.advance() // consume opening '\''
	for l.pos < len(l.input) {
		ch := l.input[l.pos]
		if ch == '\'' {
			l.advance() // consume closing '\'' (or first '\'' of escape)
			if l.pos < len(l.input) && l.input[l.pos] == '\'' {
				l.advance() // consume second '\'' of '' escape
				continue
			}
			return l.makeTokenAt(StringLit, l.input[start:l.pos], line, col)
		}
		l.advance()
	}
	// Unterminated
	return l.makeTokenAt(Illegal, l.input[start:l.pos], line, col)
}

// readNumber scans an integer or floating-point literal.
// Supported forms:
//   - integer:        42
//   - decimal:        3.14
//   - leading-dot:    .5
//   - exponent:       1e10, 1E+10, 1.5e-3, .5e2
//
// The type is IntLit when there is no decimal point or exponent; FloatLit otherwise.
// This distinction matters because some SQL constructs (e.g. LIMIT) require a
// whole number, and keeping the types distinct avoids re-parsing in the parser.
func (l *Lexer) readNumber() Token {
	line, col := l.line, l.column
	start := l.pos

	// Hex literal: 0x[0-9A-Fa-f]* — must be checked before the decimal path.
	if l.peek() == '0' && (l.peekAt(1) == 'x' || l.peekAt(1) == 'X') {
		l.advance() // consume '0'
		l.advance() // consume 'x'/'X'
		for l.pos < len(l.input) && isHexDigit(l.input[l.pos]) {
			l.advance()
		}
		return l.makeTokenAt(IntLit, l.input[start:l.pos], line, col)
	}

	isFloat := false

	// Optional leading-dot (.5)
	if l.peek() == '.' {
		isFloat = true
		l.advance()
	}

	// Integer digits
	for l.pos < len(l.input) && isDigit(l.input[l.pos]) {
		l.advance()
	}

	// Optional fractional part (only if we started with digits, not a dot)
	if !isFloat && l.pos < len(l.input) && l.input[l.pos] == '.' {
		isFloat = true
		l.advance() // consume '.'
		for l.pos < len(l.input) && isDigit(l.input[l.pos]) {
			l.advance()
		}
	}

	// Optional exponent part
	if l.pos < len(l.input) && (l.input[l.pos] == 'e' || l.input[l.pos] == 'E') {
		isFloat = true
		l.advance() // consume 'e'/'E'
		if l.pos < len(l.input) && (l.input[l.pos] == '+' || l.input[l.pos] == '-') {
			l.advance() // consume sign
		}
		for l.pos < len(l.input) && isDigit(l.input[l.pos]) {
			l.advance()
		}
	}

	tokenType := IntLit
	if isFloat {
		tokenType = FloatLit
	}
	return l.makeTokenAt(tokenType, l.input[start:l.pos], line, col)
}

// readNString scans a T-SQL Unicode string literal of the form N'...'.
// The entire N'...' sequence is returned as a single StringLit token, with
// the N prefix included in Token.Value so the formatter emits it verbatim.
// Called only when the current byte is N/n and the next byte is a single quote.
func (l *Lexer) readNString() Token {
	line, col := l.line, l.column
	start := l.pos
	l.advance() // consume 'N' prefix
	l.advance() // consume opening '\''
	for l.pos < len(l.input) {
		ch := l.input[l.pos]
		if ch == '\'' {
			l.advance() // consume closing '\'' (or first '\'' of '' escape)
			if l.pos < len(l.input) && l.input[l.pos] == '\'' {
				l.advance() // consume second '\'' of '' escape
				continue
			}
			return l.makeTokenAt(StringLit, l.input[start:l.pos], line, col)
		}
		l.advance()
	}
	return l.makeTokenAt(Illegal, l.input[start:l.pos], line, col)
}

// readLineComment scans from -- to end-of-line (or EOF).
// The token value includes the leading -- characters.
func (l *Lexer) readLineComment() Token {
	line, col := l.line, l.column
	start := l.pos
	for l.pos < len(l.input) && l.input[l.pos] != '\n' {
		l.advance()
	}
	return l.makeTokenAt(LineComment, l.input[start:l.pos], line, col)
}

// readBlockComment scans a /* ... */ comment.
// The token value includes both delimiters.
// On unterminated input an Illegal token is returned with the partial content.
func (l *Lexer) readBlockComment() Token {
	line, col := l.line, l.column
	start := l.pos
	l.advance() // consume '/'
	l.advance() // consume '*'
	for l.pos < len(l.input) {
		if l.input[l.pos] == '*' && l.peekAt(1) == '/' {
			l.advance() // consume '*'
			l.advance() // consume '/'
			return l.makeTokenAt(BlockComment, l.input[start:l.pos], line, col)
		}
		l.advance()
	}
	// Unterminated block comment
	return l.makeTokenAt(Illegal, l.input[start:l.pos], line, col)
}

// --- Character classification -------------------------------------------------

func isLetter(ch byte) bool {
	return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')
}

func isDigit(ch byte) bool {
	return ch >= '0' && ch <= '9'
}

// isIdentStart matches the first character of an unquoted identifier.
// SQL identifiers start with a letter or underscore.
func isIdentStart(ch byte) bool {
	return isLetter(ch) || ch == '_'
}

// isIdentContinue matches subsequent characters of an unquoted identifier.
func isIdentContinue(ch byte) bool {
	return isLetter(ch) || isDigit(ch) || ch == '_'
}

func isHexDigit(ch byte) bool {
	return isDigit(ch) || (ch >= 'a' && ch <= 'f') || (ch >= 'A' && ch <= 'F')
}

func isWhitespace(ch byte) bool {
	return ch == ' ' || ch == '\t' || ch == '\n' || ch == '\r'
}
