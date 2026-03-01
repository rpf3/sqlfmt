package parser

// Statement is the common interface for all top-level SQL statements.
type Statement interface{ statementNode() }

// CreateTableStmt represents: CREATE TABLE <name> (<columns> [, <constraints>])
type CreateTableStmt struct {
	Name        string           // table name (unquoted or quoted)
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
	Name       string              // optional constraint name from CONSTRAINT <name>; empty if unnamed
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
