package parser

// ─── Shared column/constraint primitives ──────────────────────────────────────

// Nullability represents an optional nullability constraint on a column.
type Nullability int

const (
	NullabilityNone    Nullability = iota // constraint not specified
	NullabilityNotNull                    // NOT NULL
	NullabilityNull                       // NULL
)

// RefAction represents an ON DELETE / ON UPDATE referential action.
type RefAction int

const (
	RefActionNone       RefAction = iota // not specified
	RefActionCascade                     // CASCADE
	RefActionSetNull                     // SET NULL
	RefActionSetDefault                  // SET DEFAULT
	RefActionNoAction                    // NO ACTION
	RefActionRestrict                    // RESTRICT
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
type ColumnDef struct {
	Name              string           // column name
	DataType          string           // e.g. "INTEGER", "TEXT", "VARCHAR(255)", "NUMERIC(10, 2)"
	Identity          *IdentitySpec    // optional IDENTITY attribute; nil if absent
	PrimaryKey        bool             // PRIMARY KEY inline constraint
	DefaultConstraint string           // optional CONSTRAINT name preceding DEFAULT; empty if unnamed
	Default           Expr             // DEFAULT expression; nil means no DEFAULT clause
	Nullability       Nullability      // optional nullability constraint
	Unique            bool             // UNIQUE inline constraint
	Check             Expr             // optional inline CHECK expression (without outer parens); nil if absent
	References        *ColumnReference // optional inline REFERENCES clause
}

// ─── CREATE TABLE / INDEX ─────────────────────────────────────────────────────

// CreateTableStmt represents: CREATE TABLE <name> (<columns> [, <constraints>])
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

// CreateIndexStmt represents: CREATE [UNIQUE] INDEX [IF NOT EXISTS] <name> ON <table> (<cols>)
type CreateIndexStmt struct {
	Unique      bool
	IfNotExists bool
	Name        string
	Table       string
	Columns     []IndexColumn
}

func (*CreateIndexStmt) statementNode() {}

// ─── Table constraints ────────────────────────────────────────────────────────

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
	Columns    []string  // local column names (PK, FK)
	RefTable   string    // for FK: referenced table name
	RefColumns []string  // for FK: referenced column names; empty means implicit PK reference
	OnDelete   RefAction // for FK: ON DELETE action; RefActionNone if not specified
	OnUpdate   RefAction // for FK: ON UPDATE action; RefActionNone if not specified
	Check      Expr      // for CHECK: expression (without outer parens); nil for non-CHECK constraints
}

// ─── ALTER TABLE ──────────────────────────────────────────────────────────────

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

// ─── DROP / TRUNCATE / VIEW ───────────────────────────────────────────────────

// DropObjectType identifies what kind of object a DROP statement targets.
type DropObjectType int

const (
	DropTable     DropObjectType = iota // DROP TABLE
	DropView                            // DROP VIEW
	DropIndex                           // DROP INDEX
	DropProcedure                       // DROP PROCEDURE / DROP PROC
	DropFunction                        // DROP FUNCTION
)

// DropStmt represents: DROP (TABLE|VIEW|INDEX|PROCEDURE|FUNCTION) [IF EXISTS] <name>
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
	IsAlter bool
	Name    string
	Select  *SelectStmt
}

func (*CreateViewStmt) statementNode() {}

// ─── CREATE SCHEMA ────────────────────────────────────────────────────────────

// CreateSchemaStmt represents: CREATE SCHEMA <name> [AUTHORIZATION <owner>]
type CreateSchemaStmt struct {
	Name          string // schema name
	Authorization string // optional owner; empty if absent
}

func (*CreateSchemaStmt) statementNode() {}

// ─── CREATE TYPE ──────────────────────────────────────────────────────────────

// CreateTypeKind identifies the variant of a CREATE TYPE statement.
type CreateTypeKind int

const (
	CreateTypeAlias CreateTypeKind = iota // CREATE TYPE <name> FROM <base_type> [NULL|NOT NULL]
	CreateTypeTable                       // CREATE TYPE <name> AS TABLE (<col_defs>)
)

// CreateTypeStmt represents:
//
//	CREATE TYPE <name> FROM <base_type> [NULL|NOT NULL]          -- alias type
//	CREATE TYPE <name> AS TABLE (<col_defs> [, <constraints>])   -- table type
type CreateTypeStmt struct {
	Name        string // type name (may be schema-qualified, e.g. dbo.SSN)
	Kind        CreateTypeKind
	BaseType    string            // for CreateTypeAlias: base data type (e.g. "varchar(11)")
	Nullability Nullability       // for CreateTypeAlias: optional nullability; NullabilityNone if absent
	Columns     []ColumnDef       // for CreateTypeTable: column definitions
	Constraints []TableConstraint // for CreateTypeTable: table-level constraints
}

func (*CreateTypeStmt) statementNode() {}
