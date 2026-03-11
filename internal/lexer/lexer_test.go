package lexer

import (
	"testing"
)

// ─── TokenType.String() ───────────────────────────────────────────────────────

func TestTokenTypeString(t *testing.T) {
	tests := []struct {
		tokenType TokenType
		want      string
	}{
		{EOF, "EOF"},
		{Illegal, "Illegal"},
		{Ident, "Ident"},
		{QuotedIdent, "QuotedIdent"},
		{StringLit, "StringLit"},
		{IntLit, "IntLit"},
		{FloatLit, "FloatLit"},
		{Keyword, "Keyword"},
		{Eq, "Eq"},
		{NotEq, "NotEq"},
		{Lt, "Lt"},
		{Gt, "Gt"},
		{LtEq, "LtEq"},
		{GtEq, "GtEq"},
		{Plus, "Plus"},
		{Minus, "Minus"},
		{Star, "Star"},
		{Slash, "Slash"},
		{Concat, "Concat"},
		{LParen, "LParen"},
		{RParen, "RParen"},
		{Comma, "Comma"},
		{Semicolon, "Semicolon"},
		{Dot, "Dot"},
		{Colon, "Colon"},
		{LineComment, "LineComment"},
		{BlockComment, "BlockComment"},
		{TokenType(9999), "TokenType(9999)"},
	}
	for _, tc := range tests {
		t.Run(tc.want, func(t *testing.T) {
			if got := tc.tokenType.String(); got != tc.want {
				t.Errorf("got %q, want %q", got, tc.want)
			}
		})
	}
}

// ─── Token.String() ───────────────────────────────────────────────────────────

func TestTokenString(t *testing.T) {
	tok := Token{Type: Ident, Value: "foo", Line: 1, Column: 5}
	want := `Token{Ident "foo" 1:5}`
	if got := tok.String(); got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

// ─── isKeyword ────────────────────────────────────────────────────────────────

func TestIsKeyword(t *testing.T) {
	trueWords := []string{
		"SELECT", "select", "Select",
		"FROM", "WHERE", "JOIN",
		"NULL", "TRUE", "FALSE",
	}
	for _, w := range trueWords {
		if !isKeyword(w) {
			t.Errorf("isKeyword(%q) = false, want true", w)
		}
	}
	falseWords := []string{"foo", "mytable", "selectx", ""}
	for _, w := range falseWords {
		if isKeyword(w) {
			t.Errorf("isKeyword(%q) = true, want false", w)
		}
	}
}

// ─── Tokenize integration tests ───────────────────────────────────────────────

// tokenize is a helper that asserts no error and returns just the tokens.
func tokenize(t *testing.T, input string) []Token {
	t.Helper()
	tokens, err := Tokenize(input)
	if err != nil {
		t.Fatalf("Tokenize(%q) returned unexpected error: %v", input, err)
	}
	return tokens
}

// types extracts just the TokenType values from a token slice.
func types(tokens []Token) []TokenType {
	out := make([]TokenType, len(tokens))
	for i, tok := range tokens {
		out[i] = tok.Type
	}
	return out
}

// values extracts just the Value strings from a token slice.
func values(tokens []Token) []string {
	out := make([]string, len(tokens))
	for i, tok := range tokens {
		out[i] = tok.Value
	}
	return out
}

func TestTokenizeEmpty(t *testing.T) {
	tokens := tokenize(t, "")
	if len(tokens) != 1 || tokens[0].Type != EOF {
		t.Errorf("empty input: got %v, want [EOF]", tokens)
	}
}

func TestTokenizeWhitespaceOnly(t *testing.T) {
	tokens := tokenize(t, "   \t\n  ")
	if len(tokens) != 1 || tokens[0].Type != EOF {
		t.Errorf("whitespace-only input: got %v, want [EOF]", tokens)
	}
}

func TestTokenizeIdents(t *testing.T) {
	tests := []struct {
		input string
		want  TokenType
	}{
		{"foo", Ident},
		{"my_table", Ident},
		{"_col", Ident},
		{"x1", Ident},
	}
	for _, tc := range tests {
		t.Run(tc.input, func(t *testing.T) {
			tokens := tokenize(t, tc.input)
			if tokens[0].Type != tc.want {
				t.Errorf("got %v, want %v", tokens[0].Type, tc.want)
			}
			if tokens[0].Value != tc.input {
				t.Errorf("value: got %q, want %q", tokens[0].Value, tc.input)
			}
		})
	}
}

func TestTokenizeKeywords(t *testing.T) {
	tests := []struct {
		input string
	}{
		{"SELECT"},
		{"select"},
		{"Select"},
		{"FROM"},
		{"WHERE"},
		{"JOIN"},
		{"NULL"},
	}
	for _, tc := range tests {
		t.Run(tc.input, func(t *testing.T) {
			tokens := tokenize(t, tc.input)
			if tokens[0].Type != Keyword {
				t.Errorf("%q: got type %v, want Keyword", tc.input, tokens[0].Type)
			}
			// Value must preserve original casing
			if tokens[0].Value != tc.input {
				t.Errorf("%q: value %q does not preserve casing", tc.input, tokens[0].Value)
			}
		})
	}
}

func TestTokenizeQuotedIdent(t *testing.T) {
	tests := []struct {
		input string
		value string
	}{
		{`"foo"`, `"foo"`},
		{`"My Table"`, `"My Table"`},
		{`"say ""hello"""`, `"say ""hello"""`},
	}
	for _, tc := range tests {
		t.Run(tc.input, func(t *testing.T) {
			tokens := tokenize(t, tc.input)
			if tokens[0].Type != QuotedIdent {
				t.Errorf("got type %v, want QuotedIdent", tokens[0].Type)
			}
			if tokens[0].Value != tc.value {
				t.Errorf("value: got %q, want %q", tokens[0].Value, tc.value)
			}
		})
	}
}

func TestTokenizeStringLit(t *testing.T) {
	tests := []struct {
		input string
		value string
	}{
		{`'hello'`, `'hello'`},
		{`'it''s'`, `'it''s'`},
		{`''`, `''`},
	}
	for _, tc := range tests {
		t.Run(tc.input, func(t *testing.T) {
			tokens := tokenize(t, tc.input)
			if tokens[0].Type != StringLit {
				t.Errorf("got type %v, want StringLit", tokens[0].Type)
			}
			if tokens[0].Value != tc.value {
				t.Errorf("value: got %q, want %q", tokens[0].Value, tc.value)
			}
		})
	}
}

func TestTokenizeNumbers(t *testing.T) {
	tests := []struct {
		input    string
		wantType TokenType
	}{
		{"42", IntLit},
		{"0", IntLit},
		{"3.14", FloatLit},
		{".5", FloatLit},
		{"1e10", FloatLit},
		{"1E+10", FloatLit},
		{"1.5e-3", FloatLit},
		{".5e2", FloatLit},
	}
	for _, tc := range tests {
		t.Run(tc.input, func(t *testing.T) {
			tokens := tokenize(t, tc.input)
			if tokens[0].Type != tc.wantType {
				t.Errorf("%q: got type %v, want %v", tc.input, tokens[0].Type, tc.wantType)
			}
			if tokens[0].Value != tc.input {
				t.Errorf("%q: value %q, want verbatim", tc.input, tokens[0].Value)
			}
		})
	}
}

func TestTokenizeOperators(t *testing.T) {
	tests := []struct {
		input    string
		wantType TokenType
		wantVal  string
	}{
		{"=", Eq, "="},
		{"<>", NotEq, "<>"},
		{"!=", NotEq, "!="},
		{"<", Lt, "<"},
		{">", Gt, ">"},
		{"<=", LtEq, "<="},
		{">=", GtEq, ">="},
		{"+", Plus, "+"},
		{"-", Minus, "-"},
		{"*", Star, "*"},
		{"/", Slash, "/"},
		{"||", Concat, "||"},
	}
	for _, tc := range tests {
		t.Run(tc.input, func(t *testing.T) {
			tokens := tokenize(t, tc.input)
			if tokens[0].Type != tc.wantType {
				t.Errorf("%q: got type %v, want %v", tc.input, tokens[0].Type, tc.wantType)
			}
			if tokens[0].Value != tc.wantVal {
				t.Errorf("%q: value %q, want %q", tc.input, tokens[0].Value, tc.wantVal)
			}
		})
	}
}

func TestTokenizePunctuation(t *testing.T) {
	tests := []struct {
		input    string
		wantType TokenType
	}{
		{"(", LParen},
		{")", RParen},
		{",", Comma},
		{";", Semicolon},
		{".", Dot},
		{":", Colon},
	}
	for _, tc := range tests {
		t.Run(tc.input, func(t *testing.T) {
			tokens := tokenize(t, tc.input)
			if tokens[0].Type != tc.wantType {
				t.Errorf("%q: got type %v, want %v", tc.input, tokens[0].Type, tc.wantType)
			}
			if tokens[0].Value != tc.input {
				t.Errorf("%q: value %q, want verbatim", tc.input, tokens[0].Value)
			}
		})
	}
}

func TestTokenizeLineComment(t *testing.T) {
	input := "-- this is a comment\nfoo"
	tokens := tokenize(t, input)
	if tokens[0].Type != LineComment {
		t.Fatalf("got type %v, want LineComment", tokens[0].Type)
	}
	if tokens[0].Value != "-- this is a comment" {
		t.Errorf("value: got %q, want %q", tokens[0].Value, "-- this is a comment")
	}
	if tokens[1].Type != Ident {
		t.Errorf("second token: got %v, want Ident", tokens[1].Type)
	}
}

func TestTokenizeBlockComment(t *testing.T) {
	tests := []struct {
		input     string
		wantValue string
	}{
		{"/* hello */", "/* hello */"},
		{"/* multi\nline */", "/* multi\nline */"},
	}
	for _, tc := range tests {
		t.Run(tc.input, func(t *testing.T) {
			tokens := tokenize(t, tc.input)
			if tokens[0].Type != BlockComment {
				t.Errorf("got type %v, want BlockComment", tokens[0].Type)
			}
			if tokens[0].Value != tc.wantValue {
				t.Errorf("value: got %q, want %q", tokens[0].Value, tc.wantValue)
			}
		})
	}
}

// ─── Illegal token tests ──────────────────────────────────────────────────────

func TestTokenizeIllegalChar(t *testing.T) {
	tokens, err := Tokenize("@")
	if err == nil {
		t.Fatal("expected error for illegal char, got nil")
	}
	if tokens[0].Type != Illegal {
		t.Errorf("got type %v, want Illegal", tokens[0].Type)
	}
	if tokens[0].Value != "@" {
		t.Errorf("value: got %q, want %q", tokens[0].Value, "@")
	}
}

func TestTokenizeIllegalContinuesScanning(t *testing.T) {
	// Lexer should emit Illegal and keep going.
	// '@foo' is now a valid T-SQL variable ident; '$bar' produces Illegal '$' + Ident 'bar'.
	tokens, _ := Tokenize("@foo $bar")
	var illegalCount int
	for _, tok := range tokens {
		if tok.Type == Illegal {
			illegalCount++
		}
	}
	if illegalCount != 1 {
		t.Errorf("got %d Illegal tokens, want 1", illegalCount)
	}
	// '@foo' (whole) and 'bar' should be present as idents.
	var identValues []string
	for _, tok := range tokens {
		if tok.Type == Ident {
			identValues = append(identValues, tok.Value)
		}
	}
	if len(identValues) != 2 || identValues[0] != "@foo" || identValues[1] != "bar" {
		t.Errorf("idents: got %v, want [@foo bar]", identValues)
	}
}

func TestTokenizeAtVar(t *testing.T) {
	// @local and @@system variables should tokenize as Ident with sigil included.
	tests := []struct {
		input string
		want  string
	}{
		{"@customer_id", "@customer_id"},
		{"@@rowcount", "@@rowcount"},
		{"@@IDENTITY", "@@IDENTITY"},
	}
	for _, tc := range tests {
		tokens, err := Tokenize(tc.input)
		if err != nil {
			t.Errorf("Tokenize(%q): unexpected error %v", tc.input, err)
			continue
		}
		// Expect Ident + EOF
		if len(tokens) < 1 || tokens[0].Type != Ident {
			t.Errorf("Tokenize(%q): got type %v, want Ident", tc.input, tokens[0].Type)
			continue
		}
		if tokens[0].Value != tc.want {
			t.Errorf("Tokenize(%q): got value %q, want %q", tc.input, tokens[0].Value, tc.want)
		}
	}
}

func TestTokenizeUnterminatedString(t *testing.T) {
	tokens, err := Tokenize("'unterminated")
	if err == nil {
		t.Fatal("expected error, got nil")
	}
	if tokens[0].Type != Illegal {
		t.Errorf("got type %v, want Illegal", tokens[0].Type)
	}
}

func TestTokenizeUnterminatedQuotedIdent(t *testing.T) {
	tokens, err := Tokenize(`"unterminated`)
	if err == nil {
		t.Fatal("expected error, got nil")
	}
	if tokens[0].Type != Illegal {
		t.Errorf("got type %v, want Illegal", tokens[0].Type)
	}
}

func TestTokenizeUnterminatedBlockComment(t *testing.T) {
	tokens, err := Tokenize("/* unterminated")
	if err == nil {
		t.Fatal("expected error, got nil")
	}
	if tokens[0].Type != Illegal {
		t.Errorf("got type %v, want Illegal", tokens[0].Type)
	}
}

// ─── Position tracking ────────────────────────────────────────────────────────

func TestTokenizePositions(t *testing.T) {
	input := "SELECT\n  foo"
	tokens := tokenize(t, input)

	if tokens[0].Line != 1 || tokens[0].Column != 1 {
		t.Errorf("SELECT: got %d:%d, want 1:1", tokens[0].Line, tokens[0].Column)
	}
	// "foo" is on line 2, 2 spaces in → column 3
	if tokens[1].Line != 2 || tokens[1].Column != 3 {
		t.Errorf("foo: got %d:%d, want 2:3", tokens[1].Line, tokens[1].Column)
	}
}

// ─── SELECT-related keyword coverage ─────────────────────────────────────────

func TestTokenizeSelectKeywords(t *testing.T) {
	// All keywords required for SELECT parsing and formatting. This test acts
	// as a compile-time guard: if a keyword is accidentally removed from the
	// keywords map, at least one case here will fail.
	words := []string{
		// Core SELECT
		"SELECT", "DISTINCT", "FROM", "WHERE", "AS",
		"GROUP", "BY", "HAVING", "ORDER", "ASC", "DESC",
		// Row limiting
		"OFFSET", "ROWS", "ROW", "FETCH", "NEXT", "FIRST", "ONLY", "LIMIT",
		// Joins
		"JOIN", "INNER", "LEFT", "RIGHT", "FULL", "OUTER", "CROSS",
		"ON", "USING",
		// Subqueries and CTEs
		"EXISTS", "IN", "WITH",
		// Window functions
		"OVER", "PARTITION",
		// Logic
		"AND", "OR", "NOT", "IS", "NULL", "BETWEEN", "LIKE",
	}
	for _, w := range words {
		t.Run(w, func(t *testing.T) {
			tokens := tokenize(t, w)
			if tokens[0].Type != Keyword {
				t.Errorf("%q: got type %v, want Keyword", w, tokens[0].Type)
			}
		})
	}
}

// ─── Full SELECT statement ────────────────────────────────────────────────────

func TestTokenizeSelectStatement(t *testing.T) {
	input := `SELECT id, name FROM users WHERE id = 1;`
	tokens := tokenize(t, input)

	wantTypes := []TokenType{
		Keyword, // SELECT
		Ident,   // id
		Comma,
		Ident,   // name
		Keyword, // FROM
		Ident,   // users
		Keyword, // WHERE
		Ident,   // id
		Eq,
		IntLit, // 1
		Semicolon,
		EOF,
	}
	gotTypes := types(tokens)
	if len(gotTypes) != len(wantTypes) {
		t.Fatalf("got %d tokens, want %d\ntokens: %v", len(gotTypes), len(wantTypes), tokens)
	}
	for i, want := range wantTypes {
		if gotTypes[i] != want {
			t.Errorf("token[%d]: got %v, want %v", i, gotTypes[i], want)
		}
	}

	wantValues := []string{
		"SELECT", "id", ",", "name", "FROM", "users", "WHERE", "id", "=", "1", ";", "",
	}
	gotValues := values(tokens)
	for i, want := range wantValues {
		if gotValues[i] != want {
			t.Errorf("token[%d] value: got %q, want %q", i, gotValues[i], want)
		}
	}
}

// ─── EOF is sticky ────────────────────────────────────────────────────────────

func TestNextReturnsEOFRepeatedly(t *testing.T) {
	l := New("x")
	l.Next() // x
	for i := 0; i < 5; i++ {
		tok := l.Next()
		if tok.Type != EOF {
			t.Errorf("call %d after exhaustion: got %v, want EOF", i+1, tok.Type)
		}
	}
}

// ─── Dot disambiguation ───────────────────────────────────────────────────────

func TestTokenizeDotVsFloat(t *testing.T) {
	// "users.col" → Ident Dot Ident
	tokens := tokenize(t, "users.col")
	wantTypes := []TokenType{Ident, Dot, Ident, EOF}
	gotTypes := types(tokens)
	for i, want := range wantTypes {
		if gotTypes[i] != want {
			t.Errorf("token[%d]: got %v, want %v", i, gotTypes[i], want)
		}
	}

	// ".5" → FloatLit
	tokens2 := tokenize(t, ".5")
	if tokens2[0].Type != FloatLit {
		t.Errorf(".5: got %v, want FloatLit", tokens2[0].Type)
	}
}

// ─── Temp table names ─────────────────────────────────────────────────────────

func TestTokenizeTempTableNames(t *testing.T) {
	tests := []struct {
		input     string
		wantType  TokenType
		wantValue string
	}{
		{"#staging", Ident, "#staging"},
		{"##global_temp", Ident, "##global_temp"},
		{"#t1", Ident, "#t1"},
		{"##x", Ident, "##x"},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			tokens := tokenize(t, tt.input)
			if tokens[0].Type != tt.wantType {
				t.Errorf("type: got %v, want %v", tokens[0].Type, tt.wantType)
			}
			if tokens[0].Value != tt.wantValue {
				t.Errorf("value: got %q, want %q", tokens[0].Value, tt.wantValue)
			}
		})
	}

	t.Run("bare hash is illegal", func(t *testing.T) {
		tok := New("#").Next()
		if tok.Type != Illegal {
			t.Errorf("bare #: got %v, want Illegal", tok.Type)
		}
	})

	t.Run("hash before digit is illegal", func(t *testing.T) {
		tok := New("#1bad").Next()
		if tok.Type != Illegal {
			t.Errorf("#1bad first token: got %v, want Illegal", tok.Type)
		}
	})
}
