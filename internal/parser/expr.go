package parser

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// Expr is the interface implemented by all expression nodes.
type Expr interface{ exprNode() }

// RawExpr wraps a pre-rendered expression string. It is the universal fallback:
// any expression that has not yet been structured by the parser is stored as a
// RawExpr and Render()s back to its original text unchanged.
type RawExpr struct{ Text string }

// IdentExpr is a simple or dot-qualified identifier (e.g. "t.id", "schema.table").
type IdentExpr struct{ Parts []string }

// LiteralExpr is a literal token: string, integer, float, or keyword literal.
type LiteralExpr struct{ Token lexer.Token }

// WindowSpec holds the OVER clause of a window function call.
type WindowSpec struct {
	PartitionBy []Expr      // PARTITION BY expressions; nil if absent
	OrderBy     []OrderItem // ORDER BY items; nil if absent
	FrameUnit   string      // "rows" or "range"; empty if no frame clause
	FrameStart  string      // frame start boundary (e.g. "unbounded preceding", "current row")
	FrameEnd    string      // frame end boundary; empty for single-bound frame
}

// FunctionCallExpr is a function call: name(args…) or name(*).
type FunctionCallExpr struct {
	Name string
	Args []Expr
	Star bool        // true for count(*)
	Over *WindowSpec // non-nil for window functions with OVER clause
}

// BinaryExpr is a binary operation: left op right (e.g. "a.id = b.id").
type BinaryExpr struct {
	Left  Expr
	Op    string
	Right Expr
}

// ParenExpr is a parenthesised sub-expression.
type ParenExpr struct{ Inner Expr }

// AndChain is a flat list of terms connected by AND. Storing terms separately
// enables multi-line WHERE formatting (#101) without changing Render output.
type AndChain struct{ Terms []Expr }

// OrChain is a flat list of terms connected by OR.
type OrChain struct{ Terms []Expr }

func (*RawExpr) exprNode()          {}
func (*IdentExpr) exprNode()        {}
func (*LiteralExpr) exprNode()      {}
func (*FunctionCallExpr) exprNode() {}
func (*BinaryExpr) exprNode()       {}
func (*ParenExpr) exprNode()        {}
func (*AndChain) exprNode()         {}
func (*OrChain) exprNode()          {}

// Render converts e back to its normalised string representation.
// For RawExpr this is an identity; compound nodes join their children.
// Render(nil) returns "".
func Render(e Expr) string {
	if e == nil {
		return ""
	}
	switch v := e.(type) {
	case *RawExpr:
		return v.Text
	case *IdentExpr:
		return strings.Join(v.Parts, ".")
	case *LiteralExpr:
		return v.Token.Value
	case *FunctionCallExpr:
		var result string
		if v.Star {
			result = v.Name + "(*)"
		} else {
			args := make([]string, len(v.Args))
			for i, a := range v.Args {
				args[i] = Render(a)
			}
			result = v.Name + "(" + strings.Join(args, ", ") + ")"
		}
		if v.Over != nil {
			var overParts []string
			if len(v.Over.PartitionBy) > 0 {
				parts := make([]string, len(v.Over.PartitionBy))
				for i, e := range v.Over.PartitionBy {
					parts[i] = Render(e)
				}
				overParts = append(overParts, "partition by "+strings.Join(parts, ", "))
			}
			if len(v.Over.OrderBy) > 0 {
				items := make([]string, len(v.Over.OrderBy))
				for i, ob := range v.Over.OrderBy {
					s := Render(ob.Value)
					if ob.Direction == DirectionAsc {
						s += " asc"
					} else if ob.Direction == DirectionDesc {
						s += " desc"
					}
					items[i] = s
				}
				overParts = append(overParts, "order by "+strings.Join(items, ", "))
			}
			if v.Over.FrameUnit != "" {
				frame := v.Over.FrameUnit
				if v.Over.FrameEnd != "" {
					frame += " between " + v.Over.FrameStart + " and " + v.Over.FrameEnd
				} else {
					frame += " " + v.Over.FrameStart
				}
				overParts = append(overParts, frame)
			}
			result += " over (" + strings.Join(overParts, " ") + ")"
		}
		return result
	case *BinaryExpr:
		return Render(v.Left) + " " + v.Op + " " + Render(v.Right)
	case *ParenExpr:
		return "(" + Render(v.Inner) + ")"
	case *AndChain:
		terms := make([]string, len(v.Terms))
		for i, t := range v.Terms {
			terms[i] = Render(t)
		}
		return strings.Join(terms, " and ")
	case *OrChain:
		terms := make([]string, len(v.Terms))
		for i, t := range v.Terms {
			terms[i] = Render(t)
		}
		return strings.Join(terms, " or ")
	}
	return ""
}

// Walk visits every node in e in pre-order, calling fn on each.
func Walk(e Expr, fn func(Expr)) {
	if e == nil {
		return
	}
	fn(e)
	switch v := e.(type) {
	case *FunctionCallExpr:
		for _, a := range v.Args {
			Walk(a, fn)
		}
		if v.Over != nil {
			for _, e := range v.Over.PartitionBy {
				Walk(e, fn)
			}
			for _, ob := range v.Over.OrderBy {
				Walk(ob.Value, fn)
			}
		}
	case *BinaryExpr:
		Walk(v.Left, fn)
		Walk(v.Right, fn)
	case *ParenExpr:
		Walk(v.Inner, fn)
	case *AndChain:
		for _, t := range v.Terms {
			Walk(t, fn)
		}
	case *OrChain:
		for _, t := range v.Terms {
			Walk(t, fn)
		}
	}
}

// AndTerms returns the flat slice of AND terms if e is an *AndChain,
// otherwise returns []Expr{e}. AndTerms(nil) returns nil.
func AndTerms(e Expr) []Expr {
	if e == nil {
		return nil
	}
	if chain, ok := e.(*AndChain); ok {
		return chain.Terms
	}
	return []Expr{e}
}
