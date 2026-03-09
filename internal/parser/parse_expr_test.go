package parser

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// newTestParser creates a parser positioned at the first token of sql.
func newTestParser(sql string) *parser {
	p := &parser{lex: lexer.New(sql)}
	p.advance() // load cur
	p.advance() // load peek
	return p
}

// alwaysFalse is a stop function that never fires; used when we want to
// consume until EOF.
func alwaysFalse() bool { return false }

// ─── parseAndChain tests ──────────────────────────────────────────────────────

// TestParseAndChain_SingleTerm verifies that a predicate with no AND returns a
// plain *RawExpr, not an *AndChain.
func TestParseAndChain_SingleTerm(t *testing.T) {
	p := newTestParser("a = 1")
	e := p.parseAndChain(alwaysFalse)

	raw, ok := e.(*RawExpr)
	if !ok {
		t.Fatalf("expected *RawExpr, got %T", e)
	}
	if raw.Text != "a = 1" {
		t.Errorf("Text: got %q, want %q", raw.Text, "a = 1")
	}
}

// TestParseAndChain_TwoTerms verifies that two AND-separated terms produce an
// *AndChain with exactly two elements.
func TestParseAndChain_TwoTerms(t *testing.T) {
	p := newTestParser("a = 1 AND b = 2")
	e := p.parseAndChain(alwaysFalse)

	chain, ok := e.(*AndChain)
	if !ok {
		t.Fatalf("expected *AndChain, got %T", e)
	}
	if len(chain.Terms) != 2 {
		t.Fatalf("Terms: got %d, want 2", len(chain.Terms))
	}
	if Render(chain.Terms[0]) != "a = 1" {
		t.Errorf("Terms[0]: got %q, want %q", Render(chain.Terms[0]), "a = 1")
	}
	if Render(chain.Terms[1]) != "b = 2" {
		t.Errorf("Terms[1]: got %q, want %q", Render(chain.Terms[1]), "b = 2")
	}
}

// TestParseAndChain_ThreeTerms verifies that three AND-separated terms produce
// a flat *AndChain with three elements (no nesting).
func TestParseAndChain_ThreeTerms(t *testing.T) {
	p := newTestParser("x > 0 AND y < 10 AND z = 5")
	e := p.parseAndChain(alwaysFalse)

	chain, ok := e.(*AndChain)
	if !ok {
		t.Fatalf("expected *AndChain, got %T", e)
	}
	if len(chain.Terms) != 3 {
		t.Fatalf("Terms: got %d, want 3", len(chain.Terms))
	}
	want := []string{"x > 0", "y < 10", "z = 5"}
	for i, w := range want {
		if got := Render(chain.Terms[i]); got != w {
			t.Errorf("Terms[%d]: got %q, want %q", i, got, w)
		}
	}
}

// TestParseAndChain_NestedParens verifies that AND inside parentheses is NOT
// split — the depth guard must hold.
func TestParseAndChain_NestedParens(t *testing.T) {
	p := newTestParser("(a = 1 AND b = 2)")
	e := p.parseAndChain(alwaysFalse)

	raw, ok := e.(*RawExpr)
	if !ok {
		t.Fatalf("expected *RawExpr (paren guard), got %T", e)
	}
	want := "(a = 1 and b = 2)"
	if raw.Text != want {
		t.Errorf("Text: got %q, want %q", raw.Text, want)
	}
}

// TestParseAndChain_RenderIdentity verifies the key invariant:
// Render(parseAndChain(…)) == text produced by parseExprRaw for all inputs.
// We test this with a multi-term expression and a nested paren expression.
func TestParseAndChain_RenderIdentity(t *testing.T) {
	cases := []string{
		"a = 1",
		"a = 1 AND b = 2",
		"a = 1 AND b = 2 AND c = 3",
		"(a = 1 AND b = 2)",
		"t.id = s.id AND t.type = 'x'",
	}
	for _, sql := range cases {
		// Obtain the reference string via parseExprRaw.
		pRef := newTestParser(sql)
		want, _ := pRef.parseExprRaw(alwaysFalse)

		// Obtain the Expr via parseAndChain and Render it.
		pChain := newTestParser(sql)
		got := Render(pChain.parseAndChain(alwaysFalse))

		if got != want {
			t.Errorf("sql=%q: Render=%q, want=%q", sql, got, want)
		}
	}
}
