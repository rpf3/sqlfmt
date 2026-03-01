package parser

// Statement is the common interface for all top-level SQL statements.
type Statement interface{ statementNode() }

// CreateTableStmt represents: CREATE TABLE <name> (<columns>)
type CreateTableStmt struct {
	Name    string      // table name (unquoted or quoted)
	Columns []ColumnDef
}

func (*CreateTableStmt) statementNode() {}

// Nullability represents an optional nullability constraint on a column.
type Nullability int

const (
	NullabilityNone    Nullability = iota // constraint not specified
	NullabilityNotNull                    // NOT NULL
	NullabilityNull                       // NULL
)

// ColumnDef is one column in a CREATE TABLE column list.
type ColumnDef struct {
	Name        string      // column name
	DataType    string      // e.g. "INTEGER", "TEXT", "VARCHAR(255)"
	PrimaryKey  bool        // PRIMARY KEY inline constraint
	Nullability Nullability // optional nullability constraint
}
