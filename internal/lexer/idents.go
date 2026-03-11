package lexer

import "strings"

// UnquoteIdent strips surrounding bracket ([…]) or double-quote ("…") quoting
// from a SQL identifier, returning the bare name. Escape sequences inside the
// delimiters are also unescaped: ]] → ] for bracket-quoted, "" → " for
// double-quoted. Bare identifiers (no surrounding delimiters) are returned
// unchanged.
func UnquoteIdent(name string) string {
	if len(name) < 2 {
		return name
	}
	if name[0] == '[' && name[len(name)-1] == ']' {
		inner := name[1 : len(name)-1]
		return strings.ReplaceAll(inner, "]]", "]")
	}
	if name[0] == '"' && name[len(name)-1] == '"' {
		inner := name[1 : len(name)-1]
		return strings.ReplaceAll(inner, `""`, `"`)
	}
	return name
}

// NeedsQuoting reports whether bare identifier name must be quoted to be valid
// SQL. A name needs quoting if it is empty, starts with a digit, contains
// whitespace, or is a reserved keyword.
func NeedsQuoting(name string) bool {
	if len(name) == 0 {
		return true
	}
	if isDigit(name[0]) {
		return true
	}
	for _, ch := range name {
		if isWhitespace(byte(ch)) {
			return true
		}
	}
	return isKeyword(name)
}
