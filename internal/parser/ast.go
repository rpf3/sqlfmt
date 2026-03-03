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

// ─── SELECT statement ─────────────────────────────────────────────────────────

// SelectItem is one entry in a SELECT list.
type SelectItem struct {
	Expr  string // normalised expression (keywords lowercased); "*" for SELECT *
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
	On            string   // ON condition (raw expression); empty for CROSS or USING
	Using         []string // USING column list; empty if ON or CROSS
}

// OrderItem is one term in an ORDER BY list.
type OrderItem struct {
	Expr      string
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
// WHERE representation: exactly one of Where or WhereSubq is non-empty.
// Where holds a raw predicate expression for simple cases.
// WhereSubq holds a structured subquery; WherePred holds the optional
// prefix before the subquery (e.g. "t.id in" or "exists").
type SelectStmt struct {
	CTEs      []CTEDef // WITH clause; nil if no CTEs
	Distinct  bool
	Columns   []SelectItem
	From      SelectFromSource
	Joins     []JoinClause // nil if no JOINs
	Where     string       // raw WHERE predicate; empty if WhereSubq is set
	WherePred string       // expression before a WHERE subquery (e.g. "t.id in", "exists")
	WhereSubq *SelectStmt  // structured WHERE subquery; nil if Where is set
	GroupBy   []string     // GROUP BY expressions; nil if absent
	Having    string       // raw HAVING predicate; empty if absent
	OrderBy   []OrderItem  // ORDER BY items; nil if absent
	Offset    string       // n from OFFSET n ROWS; empty if absent
	Fetch     string       // n from FETCH NEXT n ROWS ONLY; empty if absent
	Limit     string       // n from LIMIT n (non-ANSI); empty if absent
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
