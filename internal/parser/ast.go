package parser

// Statement is the common interface for all top-level SQL statements.
type Statement interface{ statementNode() }

// CreateTableStmt represents: CREATE TABLE <name> (<columns> [, <constraints>])
type CreateTableStmt struct {
	Name        string // table name (unquoted or quoted)
	Columns     []ColumnDef
	Constraints []TableConstraint
}

func (*CreateTableStmt) statementNode() {}

// Direction represents an explicit or absent sort direction on an index column.
type Direction int

const (
	DirectionNone Direction = iota // no direction specified by the user
	DirectionAsc                   // explicit ASC
	DirectionDesc                  // explicit DESC
)

// IndexColumn is one column entry in a CREATE INDEX column list.
type IndexColumn struct {
	Name      string
	Direction Direction
}

// CreateIndexStmt represents: CREATE [UNIQUE] INDEX [IF NOT EXISTS] <name> ON <table> (<cols>)
type CreateIndexStmt struct {
	Unique      bool
	IfNotExists bool
	Name        string
	Table       string
	Columns     []IndexColumn
}

func (*CreateIndexStmt) statementNode() {}

// TableConstraintType identifies the kind of table-level constraint.
type TableConstraintType int

const (
	ConstraintPrimaryKey TableConstraintType = iota
	ConstraintForeignKey
	ConstraintCheck
	ConstraintUnique
)

// TableConstraint is a table-level constraint entry in a CREATE TABLE column list.
type TableConstraint struct {
	Name       string // optional constraint name from CONSTRAINT <name>; empty if unnamed
	Type       TableConstraintType
	Columns    []string // local column names (PK, FK)
	RefTable   string   // for FK: referenced table name
	RefColumns []string // for FK: referenced column names; empty means implicit PK reference
	Check      string   // for CHECK: normalised expression text (without outer parens)
}

// Nullability represents an optional nullability constraint on a column.
type Nullability int

const (
	NullabilityNone    Nullability = iota // constraint not specified
	NullabilityNotNull                    // NOT NULL
	NullabilityNull                       // NULL
)

// ColumnReference holds the target of an inline REFERENCES clause.
type ColumnReference struct {
	Table   string
	Columns []string // column names; empty means implicit reference to table's PK
}

// AlterTableActionType identifies which ALTER TABLE action is being performed.
type AlterTableActionType int

const (
	AlterAddColumn      AlterTableActionType = iota // ADD COLUMN <col_def>
	AlterDropColumn                                 // DROP COLUMN <name>
	AlterAddConstraint                              // ADD [CONSTRAINT <name>] <constraint>
	AlterDropConstraint                             // DROP CONSTRAINT <name>
	AlterRenameTable                                // RENAME TO <new_name>
	AlterRenameColumn                               // RENAME COLUMN <old> TO <new>
)

// AlterTableAction holds the data for one ALTER TABLE action.
// Only the fields relevant to the action Type are populated.
type AlterTableAction struct {
	Type           AlterTableActionType
	Column         *ColumnDef       // AlterAddColumn
	ColumnName     string           // AlterDropColumn; also the old name for AlterRenameColumn
	Constraint     *TableConstraint // AlterAddConstraint
	ConstraintName string           // AlterDropConstraint
	NewName        string           // AlterRenameTable and AlterRenameColumn
}

// AlterTableStmt represents: ALTER TABLE <name> <action>
type AlterTableStmt struct {
	Name   string
	Action AlterTableAction
}

func (*AlterTableStmt) statementNode() {}

// DropObjectType identifies what kind of object a DROP statement targets.
type DropObjectType int

const (
	DropTable DropObjectType = iota // DROP TABLE
	DropView                        // DROP VIEW
	DropIndex                       // DROP INDEX
)

// DropStmt represents: DROP (TABLE|VIEW|INDEX) [IF EXISTS] <name>
type DropStmt struct {
	Type     DropObjectType
	IfExists bool
	Name     string
}

func (*DropStmt) statementNode() {}

// TruncateStmt represents: TRUNCATE [TABLE] <name>
type TruncateStmt struct {
	Name string // table name
}

func (*TruncateStmt) statementNode() {}

// CreateViewStmt represents: CREATE VIEW <name> AS <select>
type CreateViewStmt struct {
	Name   string
	Select *SelectStmt
}

func (*CreateViewStmt) statementNode() {}

// DeleteStmt represents: DELETE [<alias>] FROM <table> [AS <alias>] [WHERE <predicate>]
type DeleteStmt struct {
	Table         string // table name
	Alias         string // table alias; empty if none
	AliasExplicit bool   // true when the AS keyword preceded the alias
	Where         Expr   // WHERE predicate; nil if absent
}

func (*DeleteStmt) statementNode() {}

// InsertStmt represents INSERT INTO <table> [(cols)] VALUES (...) [, (...)]
// or INSERT INTO <table> [(cols)] <select>.
// Exactly one of Values or Select is non-nil.
type InsertStmt struct {
	Table   string
	Columns []string    // target column list; nil if no explicit column list
	Values  [][]string  // rows of raw value expressions; nil if Select is set
	Select  *SelectStmt // INSERT … SELECT form; nil if Values is set
}

func (*InsertStmt) statementNode() {}

// SetStmt represents: SET <option> <value>
// Covers the common single-option, single-value form used in T-SQL session
// configuration (e.g. SET NOCOUNT ON, SET XACT_ABORT ON, SET ROWCOUNT 100).
// Multi-word variants (SET TRANSACTION ISOLATION LEVEL, SET IDENTITY_INSERT)
// are handled separately in #92.
type SetStmt struct {
	Option string // option name, uppercased (e.g. "NOCOUNT", "XACT_ABORT")
	Value  string // option value verbatim (e.g. "ON", "OFF", "100")
}

func (*SetStmt) statementNode() {}

// UpdateSet is one col = expr assignment in an UPDATE SET clause.
type UpdateSet struct {
	Column string // column name, possibly qualified (e.g. "o.status")
	Expr   string // raw value expression (keywords normalised)
}

// UpdateFromSource is the FROM clause in a SQL Server style UPDATE.
// It names the table (and optional alias) that the UPDATE alias refers to,
// plus any JOINs needed for the WHERE predicate.
type UpdateFromSource struct {
	Name  string       // table name
	Alias string       // AS alias; empty if none
	Joins []JoinClause // additional JOINs after the main FROM table
}

// UpdateStmt represents an UPDATE statement.
//
// ANSI:       UPDATE <table> SET <col=expr> [WHERE <pred>]
// SQL Server: UPDATE <alias> SET <col=expr> FROM <table> AS <alias> [JOINs] [WHERE <pred>]
//
// When From is nil the statement is ANSI style and Target is the table name.
// When From is non-nil the statement is SQL Server style: Target is the alias
// that appears after UPDATE, and From holds the FROM clause details.
type UpdateStmt struct {
	Target string            // table name (ANSI) or alias (SQL Server)
	Sets   []UpdateSet       // SET assignments; always non-empty
	From   *UpdateFromSource // non-nil for SQL Server FROM style
	Where  Expr              // WHERE predicate; nil if absent
}

func (*UpdateStmt) statementNode() {}

// MergeMatchType identifies what a WHEN clause matches.
type MergeMatchType int

const (
	MergeMatched            MergeMatchType = iota // WHEN MATCHED
	MergeNotMatchedByTarget                       // WHEN NOT MATCHED [BY TARGET]
	MergeNotMatchedBySource                       // WHEN NOT MATCHED BY SOURCE
)

// MergeActionType identifies the action in a WHEN clause.
type MergeActionType int

const (
	MergeActionUpdate MergeActionType = iota
	MergeActionDelete
	MergeActionInsert
)

// MergeWhenClause is one WHEN … THEN … clause in a MERGE statement.
type MergeWhenClause struct {
	MatchType MergeMatchType
	Condition Expr // optional AND <condition>; nil if absent
	Action    MergeActionType
	Sets      []UpdateSet // for MergeActionUpdate
	Columns   []string    // for MergeActionInsert: column list; nil if absent
	Values    []string    // for MergeActionInsert: single row of value expressions
}

// MergeStmt represents a MERGE statement.
type MergeStmt struct {
	Target      string            // target table name
	TargetAlias string            // target alias; empty if none
	Source      SelectFromSource  // USING source: named table or derived table
	On          Expr              // ON condition
	Clauses     []MergeWhenClause // WHEN clauses; always non-empty
}

func (*MergeStmt) statementNode() {}

// ─── SELECT statement ─────────────────────────────────────────────────────────

// SelectItem is one entry in a SELECT list.
type SelectItem struct {
	Value Expr   // expression; "*" for SELECT *
	Alias string // alias from AS <name>; empty if no alias
}

// JoinType identifies the kind of JOIN.
type JoinType int

const (
	JoinInner     JoinType = iota // [INNER] JOIN
	JoinLeft                      // LEFT [OUTER] JOIN
	JoinRight                     // RIGHT [OUTER] JOIN
	JoinFullOuter                 // FULL OUTER JOIN
	JoinCross                     // CROSS JOIN
)

// JoinClause is one JOIN clause attached to a SELECT's FROM source.
type JoinClause struct {
	Type          JoinType
	Name          string   // joined table name
	Alias         string   // table alias; empty if none
	AliasExplicit bool     // true when the AS keyword preceded the alias
	On            Expr     // ON condition; nil for CROSS or USING
	Using         []string // USING column list; empty if ON or CROSS
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

// SelectFromSource is the target of a FROM clause.
// Exactly one of Name (a table name) or Subquery is non-zero.
type SelectFromSource struct {
	Name          string      // table name; empty for a subquery
	Subquery      *SelectStmt // derived table; nil for a named table
	Alias         string      // alias for either kind; empty if no alias
	AliasExplicit bool        // true when the AS keyword preceded the alias
}

// SelectStmt represents a [WITH ...] SELECT statement.
//
// WHERE representation: exactly one of Where or WhereSubq is non-nil.
// Where holds a predicate expression for simple cases.
// WhereSubq holds a structured subquery; WherePred holds the optional
// prefix before the subquery (e.g. "t.id in" or "exists").
type SelectStmt struct {
	CTEs          []CTEDef // WITH clause; nil if no CTEs
	Distinct      bool
	Columns       []SelectItem
	From          SelectFromSource
	Joins         []JoinClause // nil if no JOINs
	Where         Expr         // WHERE predicate; nil if WhereSubq is set
	WherePred     string       // expression before a WHERE subquery (e.g. "t.id in", "exists")
	WhereSubq     *SelectStmt  // structured WHERE subquery; nil if Where is set
	GroupBy       []Expr       // GROUP BY expressions; nil if absent
	Having        Expr         // HAVING predicate; nil if absent
	OrderBy       []OrderItem  // ORDER BY items; nil if absent
	Offset        string       // n from OFFSET n ROWS; empty if absent
	OffsetHasRows bool         // true when ROWS or ROW keyword followed the offset value
	Fetch         string       // n from FETCH NEXT n ROWS ONLY; empty if absent
	Limit         string       // n from LIMIT n (non-ANSI); empty if absent
}

func (*SelectStmt) statementNode() {}

// ─── CREATE TABLE ─────────────────────────────────────────────────────────────

// ColumnDef is one column in a CREATE TABLE column list.
type ColumnDef struct {
	Name              string           // column name
	DataType          string           // e.g. "INTEGER", "TEXT", "VARCHAR(255)", "NUMERIC(10, 2)"
	PrimaryKey        bool             // PRIMARY KEY inline constraint
	DefaultConstraint string           // optional CONSTRAINT name preceding DEFAULT; empty if unnamed
	Default           string           // DEFAULT expression verbatim; empty means no DEFAULT clause
	Nullability       Nullability      // optional nullability constraint
	Unique            bool             // UNIQUE inline constraint
	Check             string           // optional inline CHECK expression (without outer parens); empty if absent
	References        *ColumnReference // optional inline REFERENCES clause
}
