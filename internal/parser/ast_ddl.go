package parser

// --- Shared column/constraint primitives --------------------------------------

// Nullability represents an optional nullability constraint on a column.
type Nullability int

const (
	// NullabilityNone indicates no nullability constraint was specified.
	NullabilityNone Nullability = iota
	// NullabilityNotNull represents NOT NULL.
	NullabilityNotNull
	// NullabilityNull represents NULL.
	NullabilityNull
)

// RefAction represents an ON DELETE / ON UPDATE referential action.
type RefAction int

const (
	// RefActionNone indicates no referential action was specified.
	RefActionNone RefAction = iota
	// RefActionCascade represents CASCADE.
	RefActionCascade
	// RefActionSetNull represents SET NULL.
	RefActionSetNull
	// RefActionSetDefault represents SET DEFAULT.
	RefActionSetDefault
	// RefActionNoAction represents NO ACTION.
	RefActionNoAction
)

// ColumnReference holds the target of an inline REFERENCES clause.
type ColumnReference struct {
	Table    string
	Columns  []string  // column names; empty means implicit reference to table's PK
	OnDelete RefAction // ON DELETE action; RefActionNone if not specified
	OnUpdate RefAction // ON UPDATE action; RefActionNone if not specified
}

// IdentitySpec holds the optional IDENTITY column attribute.
// Seed and Increment are the raw token values (e.g. "1").
// Both are empty when IDENTITY was written without explicit arguments.
type IdentitySpec struct {
	Seed      string
	Increment string
}

// ColumnDef is one column in a CREATE TABLE column list.
// For regular columns, DataType is set and Computed is false.
// For computed columns (AS expr), Computed is true and ComputedExpr holds the expression;
// DataType is empty. Persisted is only meaningful when Computed is true.
type ColumnDef struct {
	Name              string           // column name
	DataType          string           // pre-rendered type string e.g. "INTEGER", "VARCHAR(255)", "NUMERIC(10, 2)"; stored verbatim because the formatter emits it unchanged and lint rules match on the string directly
	Computed          bool             // true for AS <expr> computed columns
	ComputedExpr      Expr             // expression for computed columns; nil for regular columns
	Persisted         bool             // PERSISTED keyword present (computed columns only)
	Identity          *IdentitySpec    // optional IDENTITY attribute; nil if absent
	PrimaryKey        bool             // PRIMARY KEY inline constraint
	DefaultConstraint string           // optional CONSTRAINT name preceding DEFAULT; empty if unnamed
	Default           Expr             // DEFAULT expression; nil means no DEFAULT clause
	Nullability       Nullability      // optional nullability constraint
	Unique            bool             // UNIQUE inline constraint
	Check             Expr             // optional inline CHECK expression (without outer parens); nil if absent
	References        *ColumnReference // optional inline REFERENCES clause
}

// --- CREATE TABLE / INDEX -----------------------------------------------------

// CreateTableStmt represents: CREATE TABLE <name> (<columns> [, <constraints>]).
type CreateTableStmt struct {
	Name        string // table name (unquoted or quoted)
	Columns     []ColumnDef
	Constraints []TableConstraint
}

func (*CreateTableStmt) statementNode() {}

// IndexColumn is one column entry in a CREATE INDEX column list.
type IndexColumn struct {
	Name      string
	Direction Direction
}

// IndexClustering identifies whether a CREATE INDEX specifies CLUSTERED,
// NONCLUSTERED, or neither.
type IndexClustering int

const (
	// IndexClusteringDefault indicates no clustering keyword was specified.
	IndexClusteringDefault IndexClustering = iota
	// IndexClusteringClustered represents the CLUSTERED keyword.
	IndexClusteringClustered
	// IndexClusteringNonclustered represents the NONCLUSTERED keyword.
	IndexClusteringNonclustered
)

// CreateIndexStmt represents:
//
//	CREATE [UNIQUE] [CLUSTERED|NONCLUSTERED] INDEX [IF NOT EXISTS] <name>
//	  ON <table> (<cols>)
//	  [INCLUDE (<cols>)]
//	  [WHERE <predicate>]
//	  [WITH (<options>)]
type CreateIndexStmt struct {
	Unique      bool
	Clustering  IndexClustering
	IfNotExists bool
	Name        string
	Table       string
	Columns     []IndexColumn
	Include     []string // covering columns in INCLUDE (...); nil if absent
	Where       string   // raw filter predicate; stored verbatim because filtered-index predicate linting is not yet in scope; empty if absent
	WithOptions string   // raw content of WITH (...) including surrounding parens; stored verbatim because individual option linting is not yet in scope; empty if absent
}

func (*CreateIndexStmt) statementNode() {}

// --- Table constraints --------------------------------------------------------

// TableConstraintType identifies the kind of table-level constraint.
type TableConstraintType int

const (
	// ConstraintPrimaryKey is a PRIMARY KEY table constraint.
	ConstraintPrimaryKey TableConstraintType = iota
	// ConstraintForeignKey is a FOREIGN KEY table constraint.
	ConstraintForeignKey
	// ConstraintCheck is a CHECK table constraint.
	ConstraintCheck
	// ConstraintUnique is a UNIQUE table constraint.
	ConstraintUnique
)

// TableConstraint is a table-level constraint entry in a CREATE TABLE column list.
type TableConstraint struct {
	Name       string // optional constraint name from CONSTRAINT <name>; empty if unnamed
	Type       TableConstraintType
	Columns    []string  // local column names (PK, FK)
	RefTable   string    // for FK: referenced table name
	RefColumns []string  // for FK: referenced column names; empty means implicit PK reference
	OnDelete   RefAction // for FK: ON DELETE action; RefActionNone if not specified
	OnUpdate   RefAction // for FK: ON UPDATE action; RefActionNone if not specified
	Check      Expr      // for CHECK: expression (without outer parens); nil for non-CHECK constraints
}

// --- ALTER TABLE --------------------------------------------------------------

// AlterTableActionType identifies which ALTER TABLE action is being performed.
type AlterTableActionType int

const (
	// AlterAddColumn represents ADD COLUMN <col_def>.
	AlterAddColumn AlterTableActionType = iota
	// AlterDropColumn represents DROP COLUMN <name>.
	AlterDropColumn
	// AlterAddConstraint represents ADD [CONSTRAINT <name>] <constraint>.
	AlterAddConstraint
	// AlterDropConstraint represents DROP CONSTRAINT <name>.
	AlterDropConstraint
	// AlterAlterColumn represents ALTER COLUMN <col_def>.
	AlterAlterColumn
	// AlterEnableConstraint represents ENABLE CONSTRAINT <name|ALL>.
	AlterEnableConstraint
	// AlterDisableConstraint represents DISABLE CONSTRAINT <name|ALL>.
	AlterDisableConstraint
	// AlterCheckConstraint represents CHECK CONSTRAINT <name|ALL>.
	AlterCheckConstraint
	// AlterNocheckConstraint represents NOCHECK CONSTRAINT <name|ALL>.
	AlterNocheckConstraint
)

// AlterTableAction holds the data for one ALTER TABLE action.
// Only the fields relevant to the action Type are populated.
type AlterTableAction struct {
	Type           AlterTableActionType
	Column         *ColumnDef       // AlterAddColumn, AlterAlterColumn
	ColumnName     string           // AlterDropColumn
	Constraint     *TableConstraint // AlterAddConstraint
	ConstraintName string           // AlterDropConstraint
}

// AlterTableStmt represents: ALTER TABLE <name> <action>.
type AlterTableStmt struct {
	Name   string
	Action AlterTableAction
}

func (*AlterTableStmt) statementNode() {}

// --- DROP / TRUNCATE / VIEW ---------------------------------------------------

// DropObjectType identifies what kind of object a DROP statement targets.
type DropObjectType int

const (
	// DropTable represents DROP TABLE.
	DropTable DropObjectType = iota
	// DropView represents DROP VIEW.
	DropView
	// DropIndex represents DROP INDEX.
	DropIndex
	// DropProcedure represents DROP PROCEDURE / DROP PROC.
	DropProcedure
	// DropFunction represents DROP FUNCTION.
	DropFunction
)

// DropStmt represents: DROP (TABLE|VIEW|INDEX|PROCEDURE|FUNCTION) [IF EXISTS] <name>.
type DropStmt struct {
	Type     DropObjectType
	IfExists bool
	Name     string
}

func (*DropStmt) statementNode() {}

// TruncateStmt represents: TRUNCATE [TABLE] <name> [WITH (PARTITIONS (...))].
type TruncateStmt struct {
	Name       string // table name
	Partitions string // WITH (PARTITIONS (...)) clause stored verbatim because the partition list is not in scope for formatting; empty if absent
}

func (*TruncateStmt) statementNode() {}

// CreateViewStmt represents: CREATE VIEW <name> AS <select>.
type CreateViewStmt struct {
	IsAlter bool
	Name    string
	Select  *SelectStmt
}

func (*CreateViewStmt) statementNode() {}

// --- CREATE SCHEMA ------------------------------------------------------------

// CreateSchemaStmt represents: CREATE SCHEMA <name> [AUTHORIZATION <owner>].
type CreateSchemaStmt struct {
	Name          string // schema name
	Authorization string // optional owner; empty if absent
}

func (*CreateSchemaStmt) statementNode() {}

// --- CREATE TYPE --------------------------------------------------------------

// CreateTypeKind identifies the variant of a CREATE TYPE statement.
type CreateTypeKind int

const (
	// CreateTypeAlias represents CREATE TYPE <name> FROM <base_type> [NULL|NOT NULL].
	CreateTypeAlias CreateTypeKind = iota
	// CreateTypeTable represents CREATE TYPE <name> AS TABLE (<col_defs>).
	CreateTypeTable
)

// CreateTypeStmt represents:
//
//	CREATE TYPE <name> FROM <base_type> [NULL|NOT NULL]          -- alias type
//	CREATE TYPE <name> AS TABLE (<col_defs> [, <constraints>])   -- table type
type CreateTypeStmt struct {
	Name        string // type name (may be schema-qualified, e.g. dbo.SSN)
	Kind        CreateTypeKind
	BaseType    string            // for CreateTypeAlias: pre-rendered base type e.g. "varchar(11)"; stored verbatim because the formatter emits it unchanged
	Nullability Nullability       // for CreateTypeAlias: optional nullability; NullabilityNone if absent
	Columns     []ColumnDef       // for CreateTypeTable: column definitions
	Constraints []TableConstraint // for CreateTypeTable: table-level constraints
}

func (*CreateTypeStmt) statementNode() {}
