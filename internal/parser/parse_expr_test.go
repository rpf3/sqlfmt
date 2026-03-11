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
// We test this with a multi-term expression and a nested paren expression,
// and with function calls appearing as AND terms.
func TestParseAndChain_RenderIdentity(t *testing.T) {
	cases := []string{
		"a = 1",
		"a = 1 AND b = 2",
		"a = 1 AND b = 2 AND c = 3",
		"(a = 1 AND b = 2)",
		"t.id = s.id AND t.type = 'x'",
		"count(*) > 0 AND sum(t.v) > 100",
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

// ─── parseFunctionCall / parseWindowSpec tests ────────────────────────────────

// TestParseFunctionCall_Star verifies that count(*) produces a FunctionCallExpr
// with Star=true and renders back to "count(*)".
func TestParseFunctionCall_Star(t *testing.T) {
	p := newTestParser("count(*)")
	e := p.parseExpr(alwaysFalse)

	fn, ok := e.(*FunctionCallExpr)
	if !ok {
		t.Fatalf("expected *FunctionCallExpr, got %T", e)
	}
	if fn.Name != "count" {
		t.Errorf("Name: got %q, want %q", fn.Name, "count")
	}
	if !fn.Star {
		t.Error("Star: expected true")
	}
	if fn.Over != nil {
		t.Error("Over: expected nil")
	}
	if got := Render(e); got != "count(*)" {
		t.Errorf("Render: got %q, want %q", got, "count(*)")
	}
}

// TestParseFunctionCall_NoArgs verifies that now() produces a FunctionCallExpr
// with no Args and renders back to "now()".
func TestParseFunctionCall_NoArgs(t *testing.T) {
	p := newTestParser("now()")
	e := p.parseExpr(alwaysFalse)

	fn, ok := e.(*FunctionCallExpr)
	if !ok {
		t.Fatalf("expected *FunctionCallExpr, got %T", e)
	}
	if fn.Name != "now" {
		t.Errorf("Name: got %q, want %q", fn.Name, "now")
	}
	if len(fn.Args) != 0 {
		t.Errorf("Args: got %d, want 0", len(fn.Args))
	}
	if got := Render(e); got != "now()" {
		t.Errorf("Render: got %q, want %q", got, "now()")
	}
}

// TestParseFunctionCall_SingleArg verifies that sum(t.total) produces a
// FunctionCallExpr with one arg and renders back correctly.
func TestParseFunctionCall_SingleArg(t *testing.T) {
	p := newTestParser("sum(t.total)")
	e := p.parseExpr(alwaysFalse)

	fn, ok := e.(*FunctionCallExpr)
	if !ok {
		t.Fatalf("expected *FunctionCallExpr, got %T", e)
	}
	if fn.Name != "sum" {
		t.Errorf("Name: got %q, want %q", fn.Name, "sum")
	}
	if len(fn.Args) != 1 {
		t.Fatalf("Args: got %d, want 1", len(fn.Args))
	}
	if got := Render(fn.Args[0]); got != "t.total" {
		t.Errorf("Args[0]: got %q, want %q", got, "t.total")
	}
	if got := Render(e); got != "sum(t.total)" {
		t.Errorf("Render: got %q, want %q", got, "sum(t.total)")
	}
}

// TestParseFunctionCall_MultiArg verifies that coalesce(t.a, 'x') produces a
// FunctionCallExpr with two args.
func TestParseFunctionCall_MultiArg(t *testing.T) {
	p := newTestParser("coalesce(t.a, 'x')")
	e := p.parseExpr(alwaysFalse)

	fn, ok := e.(*FunctionCallExpr)
	if !ok {
		t.Fatalf("expected *FunctionCallExpr, got %T", e)
	}
	if fn.Name != "coalesce" {
		t.Errorf("Name: got %q, want %q", fn.Name, "coalesce")
	}
	if len(fn.Args) != 2 {
		t.Fatalf("Args: got %d, want 2", len(fn.Args))
	}
	if got := Render(e); got != "coalesce(t.a, 'x')" {
		t.Errorf("Render: got %q, want %q", got, "coalesce(t.a, 'x')")
	}
}

// TestParseFunctionCall_Nested verifies that coalesce(nullif(t.v, ”), 'x')
// lifts the inner nullif call into a nested *FunctionCallExpr.
func TestParseFunctionCall_Nested(t *testing.T) {
	p := newTestParser("coalesce(nullif(t.v, ''), 'x')")
	e := p.parseExpr(alwaysFalse)

	fn, ok := e.(*FunctionCallExpr)
	if !ok {
		t.Fatalf("expected *FunctionCallExpr, got %T", e)
	}
	if len(fn.Args) != 2 {
		t.Fatalf("Args: got %d, want 2", len(fn.Args))
	}
	inner, ok := fn.Args[0].(*FunctionCallExpr)
	if !ok {
		t.Fatalf("Args[0]: expected *FunctionCallExpr, got %T", fn.Args[0])
	}
	if inner.Name != "nullif" {
		t.Errorf("inner Name: got %q, want %q", inner.Name, "nullif")
	}
	if got := Render(e); got != "coalesce(nullif(t.v, ''), 'x')" {
		t.Errorf("Render: got %q, want %q", got, "coalesce(nullif(t.v, ''), 'x')")
	}
}

// TestParseWindowFunc_OrderOnly verifies that row_number() OVER (ORDER BY t.id DESC)
// produces a FunctionCallExpr with an Over clause with one OrderBy item.
func TestParseWindowFunc_OrderOnly(t *testing.T) {
	p := newTestParser("row_number() over (order by t.id desc)")
	e := p.parseExpr(alwaysFalse)

	fn, ok := e.(*FunctionCallExpr)
	if !ok {
		t.Fatalf("expected *FunctionCallExpr, got %T", e)
	}
	if fn.Name != "row_number" {
		t.Errorf("Name: got %q, want %q", fn.Name, "row_number")
	}
	if fn.Over == nil {
		t.Fatal("Over: expected non-nil")
	}
	if len(fn.Over.PartitionBy) != 0 {
		t.Errorf("PartitionBy: got %d items, want 0", len(fn.Over.PartitionBy))
	}
	if len(fn.Over.OrderBy) != 1 {
		t.Fatalf("OrderBy: got %d items, want 1", len(fn.Over.OrderBy))
	}
	if got := Render(fn.Over.OrderBy[0].Value); got != "t.id" {
		t.Errorf("OrderBy[0].Value: got %q, want %q", got, "t.id")
	}
	if fn.Over.OrderBy[0].Direction != DirectionDesc {
		t.Errorf("OrderBy[0].Direction: got %v, want DirectionDesc", fn.Over.OrderBy[0].Direction)
	}
	want := "row_number() over (order by t.id desc)"
	if got := Render(e); got != want {
		t.Errorf("Render: got %q, want %q", got, want)
	}
}

// TestParseWindowFunc_PartitionAndOrder verifies a full window spec with both
// PARTITION BY and ORDER BY clauses.
func TestParseWindowFunc_PartitionAndOrder(t *testing.T) {
	p := newTestParser("sum(t.v) over (partition by t.cid order by t.date asc)")
	e := p.parseExpr(alwaysFalse)

	fn, ok := e.(*FunctionCallExpr)
	if !ok {
		t.Fatalf("expected *FunctionCallExpr, got %T", e)
	}
	if fn.Over == nil {
		t.Fatal("Over: expected non-nil")
	}
	if len(fn.Over.PartitionBy) != 1 {
		t.Fatalf("PartitionBy: got %d items, want 1", len(fn.Over.PartitionBy))
	}
	if got := Render(fn.Over.PartitionBy[0]); got != "t.cid" {
		t.Errorf("PartitionBy[0]: got %q, want %q", got, "t.cid")
	}
	if len(fn.Over.OrderBy) != 1 {
		t.Fatalf("OrderBy: got %d items, want 1", len(fn.Over.OrderBy))
	}
	if fn.Over.OrderBy[0].Direction != DirectionAsc {
		t.Errorf("OrderBy[0].Direction: got %v, want DirectionAsc", fn.Over.OrderBy[0].Direction)
	}
	want := "sum(t.v) over (partition by t.cid order by t.date asc)"
	if got := Render(e); got != want {
		t.Errorf("Render: got %q, want %q", got, want)
	}
}

// TestParseExpr_FuncCallNotAtStart verifies that a function call embedded
// mid-expression (not at the start) remains a *RawExpr.
func TestParseExpr_FuncCallNotAtStart(t *testing.T) {
	p := newTestParser("t.id = count(*)")
	e := p.parseExpr(alwaysFalse)

	_, isRaw := e.(*RawExpr)
	if !isRaw {
		t.Fatalf("expected *RawExpr for mid-expression function call, got %T", e)
	}
	if got := Render(e); got != "t.id = count(*)" {
		t.Errorf("Render: got %q, want %q", got, "t.id = count(*)")
	}
}
