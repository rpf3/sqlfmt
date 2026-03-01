package parser

// Statement is the common interface for all top-level SQL statements.
type Statement interface{ statementNode() }

// CreateTableStmt represents: CREATE TABLE <name> (<columns>)
type CreateTableStmt struct {
	Name    string      // table name (unquoted or quoted)
	Columns []ColumnDef
}

func (*CreateTableStmt) statementNode() {}

// ColumnDef is one column in a CREATE TABLE column list.
type ColumnDef struct {
	Name     string // column name
	DataType string // e.g. "INTEGER", "TEXT", "VARCHAR(255)"
}
