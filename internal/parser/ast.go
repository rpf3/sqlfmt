package parser

// Statement is the common interface for all top-level SQL statements.
type Statement interface{ statementNode() }

// Direction represents an explicit or absent sort direction on an index column or ORDER BY item.
type Direction int

const (
	// DirectionNone indicates no sort direction was specified by the user.
	DirectionNone Direction = iota
	// DirectionAsc represents an explicit ASC sort direction.
	DirectionAsc
	// DirectionDesc represents an explicit DESC sort direction.
	DirectionDesc
)

// --- SELECT statement ---------------------------------------------------------

// SetOpType identifies the kind of set operation joining two SELECT branches.
type SetOpType int

const (
	// SetOpUnion represents UNION (distinct rows).
	SetOpUnion SetOpType = iota
	// SetOpUnionAll represents UNION ALL.
	SetOpUnionAll
	// SetOpIntersect represents INTERSECT.
	SetOpIntersect
	// SetOpExcept represents EXCEPT.
	SetOpExcept
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
	// JoinInner represents [INNER] JOIN.
	JoinInner JoinType = iota
	// JoinLeft represents LEFT [OUTER] JOIN.
	JoinLeft
	// JoinRight represents RIGHT [OUTER] JOIN.
	JoinRight
	// JoinFullOuter represents FULL OUTER JOIN.
	JoinFullOuter
	// JoinCross represents CROSS JOIN.
	JoinCross
	// JoinCrossApply represents CROSS APPLY.
	JoinCrossApply
	// JoinOuterApply represents OUTER APPLY.
	JoinOuterApply
)

// JoinClause is one JOIN clause attached to a SELECT's FROM source.
type JoinClause struct {
	Type          JoinType
	Name          string      // joined table name; empty for APPLY subquery sources or VALUES sources
	Hints         string      // table hints e.g. "(nolock)"; empty if none
	Alias         string      // table alias; empty if none
	AliasExplicit bool        // true when the AS keyword preceded the alias
	On            Expr        // ON condition; nil for CROSS
	TVFArgs       string      // parenthesised arg list for APPLY TVF sources e.g. "(@id)"; stored verbatim because TVF argument linting is not yet in scope; empty for regular joins
	Subquery      *SelectStmt // subquery source for APPLY (SELECT ...) form; nil for regular joins
	ValuesRows    [][]Expr    // non-nil when join source is a (VALUES (...), ...) row constructor
	ValuesCols    []string    // column aliases declared after the table alias; nil if absent
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
	Spec string // raw window spec content between the parens; stored verbatim — named WINDOW definitions are emitted unchanged by the formatter
}

// PivotKind identifies whether a FROM-source pivot operator is PIVOT or UNPIVOT.
type PivotKind int

const (
	// PivotPivot represents the PIVOT operator.
	PivotPivot PivotKind = iota
	// PivotUnpivot represents the UNPIVOT operator.
	PivotUnpivot
)

// PivotClause holds the parsed PIVOT or UNPIVOT operator attached to a FROM source.
//
//	PIVOT   ( aggregate(value_col) FOR pivot_col IN (col_list) )
//	UNPIVOT ( value_col            FOR pivot_col IN (col_list) )
type PivotClause struct {
	Kind      PivotKind
	Value     string // PIVOT: aggregate expression e.g. "sum(amount)"; UNPIVOT: value column name; stored verbatim — formatter emits it unchanged
	ForColumn string // column name after FOR
	InList    string // raw content of IN (...) without surrounding parens; stored verbatim — formatter re-wraps the parens and emits the list unchanged
}

// GroupByModifier identifies the form of a GROUP BY item.
type GroupByModifier int

const (
	// GroupBySimple is a plain GROUP BY expression.
	GroupBySimple GroupByModifier = iota
	// GroupByRollup represents ROLLUP(...).
	GroupByRollup
	// GroupByCube represents CUBE(...).
	GroupByCube
	// GroupBySets represents GROUPING SETS(...).
	GroupBySets
	// GroupByGrandTotal represents the () grand total grouping.
	GroupByGrandTotal
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
// Exactly one of Name (a table name), Subquery, or ValuesRows is non-zero.
type SelectFromSource struct {
	Name          string       // table name; empty for a subquery or VALUES source
	TVFArgs       string       // parenthesised arg list for TVF sources e.g. "(@id)"; stored verbatim because TVF argument linting is not yet in scope; empty for plain tables
	Hints         string       // table hints e.g. "(nolock)"; empty if none
	Subquery      *SelectStmt  // derived table; nil for a named table or VALUES source
	ValuesRows    [][]Expr     // non-nil when source is a (VALUES (...), ...) row constructor; mutually exclusive with Name and Subquery
	ValuesCols    []string     // column aliases declared after the table alias e.g. (status_code, label); nil if absent
	Alias         string       // alias for any kind; empty if no alias
	AliasExplicit bool         // true when the AS keyword preceded the alias
	Pivot         *PivotClause // non-nil when a PIVOT or UNPIVOT operator follows the named source
}

// ForClauseKind identifies whether a FOR clause is FOR XML or FOR JSON.
type ForClauseKind int

const (
	// ForNone indicates no FOR clause is present.
	ForNone ForClauseKind = iota
	// ForXML represents a FOR XML clause.
	ForXML
	// ForJSON represents a FOR JSON clause.
	ForJSON
)

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
	Into          string // table name for SELECT INTO; empty if absent
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
	ForKind       ForClauseKind // ForXML or ForJSON; ForNone if absent
	ForOpts       string        // raw options after the XML/JSON mode keyword e.g. "PATH, ROOT('r')"; stored verbatim because FOR XML/JSON option linting is not yet in scope; empty if absent
	Option        string        // raw content of OPTION(...) including surrounding parens e.g. "(recompile)"; stored verbatim because individual hint linting is not yet in scope; empty if absent
}

func (*SelectStmt) statementNode() {}
