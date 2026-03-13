package parser

// Statement is the common interface for all top-level SQL statements.
type Statement interface{ statementNode() }

// Direction represents an explicit or absent sort direction on an index column or ORDER BY item.
type Direction int

const (
	DirectionNone Direction = iota // no direction specified by the user
	DirectionAsc                   // explicit ASC
	DirectionDesc                  // explicit DESC
)

// ─── SELECT statement ─────────────────────────────────────────────────────────

// SetOpType identifies the kind of set operation joining two SELECT branches.
type SetOpType int

const (
	SetOpUnion     SetOpType = iota // UNION (distinct)
	SetOpUnionAll                   // UNION ALL
	SetOpIntersect                  // INTERSECT
	SetOpExcept                     // EXCEPT
)

// SetOp pairs a set operator with the right-hand SELECT branch.
type SetOp struct {
	Op     SetOpType
	Select *SelectStmt
}

// SelectItem is one entry in a SELECT list.
type SelectItem struct {
	Value Expr   // expression; "*" for SELECT *
	Alias string // alias from AS <name>; empty if no alias
}

// JoinType identifies the kind of JOIN.
type JoinType int

const (
	JoinInner        JoinType = iota // [INNER] JOIN
	JoinLeft                         // LEFT [OUTER] JOIN
	JoinRight                        // RIGHT [OUTER] JOIN
	JoinFullOuter                    // FULL OUTER JOIN
	JoinCross                        // CROSS JOIN
	JoinNatural                      // NATURAL JOIN
	JoinNaturalLeft                  // NATURAL LEFT JOIN
	JoinNaturalRight                 // NATURAL RIGHT JOIN
	JoinCrossApply                   // CROSS APPLY
	JoinOuterApply                   // OUTER APPLY
)

// JoinClause is one JOIN clause attached to a SELECT's FROM source.
type JoinClause struct {
	Type          JoinType
	Name          string      // joined table name; empty for APPLY subquery sources
	Alias         string      // table alias; empty if none
	AliasExplicit bool        // true when the AS keyword preceded the alias
	On            Expr        // ON condition; nil for CROSS or USING
	Using         []string    // USING column list; empty if ON or CROSS
	TVFArgs       string      // parenthesised arg list for APPLY TVF sources; empty for regular joins
	Subquery      *SelectStmt // subquery source for APPLY (SELECT ...) form; nil for regular joins
}

// OrderItem is one term in an ORDER BY list.
type OrderItem struct {
	Value     Expr
	Direction Direction
}

// CTEDef is one name/body pair in a WITH clause.
type CTEDef struct {
	Name   string
	Select *SelectStmt
}

// WindowDef is one named window definition in a WINDOW clause.
type WindowDef struct {
	Name string // window name
	Spec string // raw window spec content (between the parens)
}

// PivotKind identifies whether a FROM-source pivot operator is PIVOT or UNPIVOT.
type PivotKind int

const (
	PivotPivot   PivotKind = iota // PIVOT
	PivotUnpivot                  // UNPIVOT
)

// PivotClause holds the parsed PIVOT or UNPIVOT operator attached to a FROM source.
//
//	PIVOT   ( aggregate(value_col) FOR pivot_col IN (col_list) )
//	UNPIVOT ( value_col            FOR pivot_col IN (col_list) )
type PivotClause struct {
	Kind      PivotKind
	Value     string // PIVOT: aggregate expression; UNPIVOT: value column name
	ForColumn string // column name after FOR
	InList    string // raw content of IN (...) without surrounding parens
}

// GroupByModifier identifies the form of a GROUP BY item.
type GroupByModifier int

const (
	GroupBySimple     GroupByModifier = iota // plain expression
	GroupByRollup                            // ROLLUP(...)
	GroupByCube                              // CUBE(...)
	GroupBySets                              // GROUPING SETS(...)
	GroupByGrandTotal                        // () grand total
)

// GroupByItem is one element in a GROUP BY clause.
// For GroupBySimple, Expr holds the expression.
// For GroupByRollup, GroupByCube, and GroupBySets, RawArgs holds the
// parenthesised argument list as a raw string (e.g. "(a, b)").
// For GroupByGrandTotal, RawArgs is "()".
type GroupByItem struct {
	Modifier GroupByModifier
	Expr     Expr   // GroupBySimple only
	RawArgs  string // Rollup / Cube / Sets / GrandTotal
}

// SelectFromSource is the target of a FROM clause.
// Exactly one of Name (a table name) or Subquery is non-zero.
type SelectFromSource struct {
	Name          string       // table name; empty for a subquery
	Subquery      *SelectStmt  // derived table; nil for a named table
	Alias         string       // alias for either kind; empty if no alias
	AliasExplicit bool         // true when the AS keyword preceded the alias
	Pivot         *PivotClause // non-nil when a PIVOT or UNPIVOT operator follows the named source
}

// SelectStmt represents a [WITH ...] SELECT statement.
//
// WHERE representation: exactly one of Where or WhereSubq is non-nil.
// Where holds a predicate expression for simple cases.
// WhereSubq holds a structured subquery; WherePred holds the optional
// prefix before the subquery (e.g. "t.id in" or "exists").
type SelectStmt struct {
	CTEs          []CTEDef // WITH clause; nil if no CTEs
	Recursive     bool     // true when WITH RECURSIVE was used
	Distinct      bool
	Top           string // expression inside TOP(...); empty if absent
	TopPercent    bool   // true when PERCENT modifier present
	TopWithTies   bool   // true when WITH TIES modifier present
	Columns       []SelectItem
	From          SelectFromSource
	Joins         []JoinClause  // nil if no JOINs
	Where         Expr          // WHERE predicate; nil if WhereSubq is set
	WherePred     string        // expression before a WHERE subquery (e.g. "t.id in", "exists")
	WhereSubq     *SelectStmt   // structured WHERE subquery; nil if Where is set
	GroupBy       []GroupByItem // GROUP BY items; nil if absent
	Having        Expr          // HAVING predicate; nil if absent
	Windows       []WindowDef   // WINDOW clause definitions; nil if absent
	SetOps        []SetOp       // UNION/INTERSECT/EXCEPT branches; nil for a plain SELECT
	OrderBy       []OrderItem   // ORDER BY items; nil if absent; applies to whole compound query when SetOps non-nil
	Offset        string        // n from OFFSET n ROWS; empty if absent
	OffsetHasRows bool          // true when ROWS or ROW keyword followed the offset value
	Fetch         string        // n from FETCH NEXT n ROWS ONLY; empty if absent
	Limit         string        // n from LIMIT n (non-ANSI); empty if absent
}

func (*SelectStmt) statementNode() {}
