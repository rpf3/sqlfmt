package lexer

import "testing"

func TestUnquoteIdent(t *testing.T) {
	cases := []struct {
		input string
		want  string
	}{
		{`orders`, `orders`},
		{`[orders]`, `orders`},
		{`[My Table]`, `My Table`},
		{`[a]]b]`, `a]b`}, // ]] escape inside bracket ident
		{`"orders"`, `orders`},
		{`"My Col"`, `My Col`},
		{`""`, ``},
		{`[`, `[`}, // unterminated — returned as-is
		{``, ``},
	}
	for _, tc := range cases {
		got := UnquoteIdent(tc.input)
		if got != tc.want {
			t.Errorf("UnquoteIdent(%q) = %q, want %q", tc.input, got, tc.want)
		}
	}
}

func TestNeedsQuoting(t *testing.T) {
	cases := []struct {
		name string
		want bool
	}{
		{"orders", false},
		{"customer_id", false},
		{"", true},         // empty always needs quoting
		{"2bad", true},     // starts with digit
		{"My Table", true}, // contains space
		{"order", true},    // reserved keyword
		{"select", true},   // reserved keyword
		{"status", false},  // not a keyword
	}
	for _, tc := range cases {
		got := NeedsQuoting(tc.name)
		if got != tc.want {
			t.Errorf("NeedsQuoting(%q) = %v, want %v", tc.name, got, tc.want)
		}
	}
}

func TestBracketIdentLexer(t *testing.T) {
	cases := []struct {
		input     string
		wantType  TokenType
		wantValue string
	}{
		{`[orders]`, QuotedIdent, `[orders]`},
		{`[My Table]`, QuotedIdent, `[My Table]`},
		{`[a]]b]`, QuotedIdent, `[a]]b]`}, // ]] escape
	}
	for _, tc := range cases {
		l := New(tc.input)
		tok := l.Next()
		if tok.Type != tc.wantType {
			t.Errorf("input %q: Type = %v, want %v", tc.input, tok.Type, tc.wantType)
		}
		if tok.Value != tc.wantValue {
			t.Errorf("input %q: Value = %q, want %q", tc.input, tok.Value, tc.wantValue)
		}
	}
}
