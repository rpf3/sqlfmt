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

// IndexColumn is one column entry in a CREATE INDEX column list.
type IndexColumn struct {
	Name string
	Desc bool // true = DESC; false = ASC (the default)
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

// ColumnDef is one column in a CREATE TABLE column list.
type ColumnDef struct {
	Name        string           // column name
	DataType    string           // e.g. "INTEGER", "TEXT", "VARCHAR(255)", "NUMERIC(10, 2)"
	PrimaryKey  bool             // PRIMARY KEY inline constraint
	Default     string           // DEFAULT expression verbatim; empty means no DEFAULT clause
	Nullability Nullability      // optional nullability constraint
	Unique      bool             // UNIQUE inline constraint
	Check       string           // optional inline CHECK expression (without outer parens); empty if absent
	References  *ColumnReference // optional inline REFERENCES clause
}
