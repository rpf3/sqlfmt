package parser

// ─── Shared proc/func primitives ─────────────────────────────────────────────

// ParamDirection indicates whether a procedure/function parameter is input or output.
type ParamDirection int

const (
	ParamDirectionIn  ParamDirection = iota // default: input parameter
	ParamDirectionOut                       // OUTPUT or OUT keyword
)

// ProcParam is one parameter in a CREATE PROCEDURE or CREATE FUNCTION parameter list.
type ProcParam struct {
	Name      string         // parameter name including sigil (e.g. "@customer_id")
	DataType  string         // data type (e.g. "INT", "NVARCHAR(20)")
	Direction ParamDirection // ParamDirectionIn (default) or ParamDirectionOut
	Default   Expr           // default from = <expr>; nil if absent
}

// ─── CREATE PROCEDURE ─────────────────────────────────────────────────────────

// CreateProcStmt represents:
//
//	CREATE PROCEDURE <name>
//	    [@param datatype [= default] [OUTPUT]] [, ...]
//	AS
//	BEGIN
//	    <body>
//	END
type CreateProcStmt struct {
	Name        string      // procedure name (may be schema-qualified)
	Params      []ProcParam // parameter list; nil if no parameters
	HasBeginEnd bool        // true when body was explicitly wrapped in BEGIN...END
	Body        []Statement // body statements; fully-parsed where possible, *RawStmt otherwise
}

func (*CreateProcStmt) statementNode() {}

// RawStmt holds an unparsed statement body — used as a fallback for statement
// types the parser does not yet fully support (e.g. EXEC, IF, WHILE, RETURN).
type RawStmt struct {
	Text string // token-normalised statement text, without trailing semicolon
}

func (*RawStmt) statementNode() {}

// ─── CREATE FUNCTION ──────────────────────────────────────────────────────────

// CreateFuncKind identifies the variant of a CREATE FUNCTION statement.
type CreateFuncKind int

const (
	CreateFuncScalar      CreateFuncKind = iota // RETURNS <type> AS BEGIN...END
	CreateFuncInlineTable                       // RETURNS TABLE AS RETURN (SELECT...)
	CreateFuncMultiTable                        // RETURNS @var TABLE (...) AS BEGIN...END
)

// CreateFuncStmt represents a CREATE FUNCTION statement.
//
//	Scalar:      CREATE FUNCTION <name> (<params>) RETURNS <type> AS BEGIN <body> END
//	Inline TVF:  CREATE FUNCTION <name> (<params>) RETURNS TABLE AS RETURN (<select>)
//	Multi TVF:   CREATE FUNCTION <name> (<params>) RETURNS @var TABLE (<cols>) AS BEGIN <body> END
type CreateFuncStmt struct {
	Name         string      // function name (may be schema-qualified)
	Params       []ProcParam // parameter list; nil if no parameters
	Kind         CreateFuncKind
	ReturnsType  string      // scalar: data type (e.g. "INT"); inline: "TABLE"
	ReturnsVar   string      // multi-table: table variable name (e.g. "@result")
	ReturnsTable []ColumnDef // multi-table: column definitions for the return table
	HasBeginEnd  bool        // true when body was explicitly wrapped in BEGIN...END (scalar + multi-table only)
	Body         []Statement // scalar + multi-table: BEGIN...END body
	InlineSelect *SelectStmt // inline TVF: the SELECT inside RETURN (...)
}

func (*CreateFuncStmt) statementNode() {}

// ─── SET ──────────────────────────────────────────────────────────────────────

// SetKind distinguishes the three forms of the SET statement.
type SetKind int

const (
	SetSimple               SetKind = iota // SET <option> <value>
	SetTransactionIsolation                // SET TRANSACTION ISOLATION LEVEL <level>
	SetIdentityInsert                      // SET IDENTITY_INSERT <table> ON|OFF
)

// SetStmt represents a T-SQL SET statement.
type SetStmt struct {
	Kind SetKind

	// SetSimple fields:
	Option string // option name, uppercased (e.g. "NOCOUNT")
	Value  string // option value verbatim (e.g. "ON", "100")

	// SetTransactionIsolation fields:
	IsolationLevel string // e.g. "READ COMMITTED", "SERIALIZABLE"

	// SetIdentityInsert fields:
	Table   string // table name, possibly schema-qualified (e.g. "dbo.orders")
	Enabled bool   // true = ON, false = OFF
}

func (*SetStmt) statementNode() {}

// ─── DECLARE ──────────────────────────────────────────────────────────────────

// VarDecl is one variable declaration in a DECLARE statement.
// Exactly one of Type (scalar) or Columns (table variable) is populated.
type VarDecl struct {
	Name    string      // includes @ prefix, e.g. "@count"
	Type    string      // data type for scalar variable; empty for table variable
	Default Expr        // optional initialiser after =; nil if absent
	Columns []ColumnDef // column list for table variable; nil for scalar
}

// DeclareStmt represents a T-SQL DECLARE statement.
//
//	DECLARE @name type [= default] [, @name2 type2 ...]  -- scalar variable(s)
//	DECLARE @name TABLE (<col_defs>)                      -- table variable
type DeclareStmt struct {
	Vars []VarDecl
}

func (*DeclareStmt) statementNode() {}

// ─── IF / ELSE ────────────────────────────────────────────────────────────────

// IfStmt represents a T-SQL IF [ELSE] statement.
//
//	IF <condition> BEGIN <then> END [ELSE BEGIN <else> END]
//	IF <condition> <single-then-stmt> [ELSE <single-else-stmt>]
//
// The formatter always normalises both branches to BEGIN...END form.
type IfStmt struct {
	Condition string      // raw condition expression (e.g. "@count > 0")
	Then      []Statement // body of the IF branch
	Else      []Statement // body of the ELSE branch; nil if no ELSE
}

func (*IfStmt) statementNode() {}

