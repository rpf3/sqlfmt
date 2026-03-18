package parser

// --- Shared proc/func primitives ---------------------------------------------

// ParamDirection indicates whether a procedure/function parameter is input or output.
type ParamDirection int

const (
	ParamDirectionIn  ParamDirection = iota // default: input parameter
	ParamDirectionOut                       // OUTPUT or OUT keyword
)

// ProcParam is one parameter in a CREATE PROCEDURE or CREATE FUNCTION parameter list.
type ProcParam struct {
	Name      string         // parameter name including sigil (e.g. "@customer_id")
	DataType  string         // pre-rendered type string e.g. "INT", "NVARCHAR(20)"; stored verbatim because the formatter emits it unchanged and no lint rule needs to decompose it
	Direction ParamDirection // ParamDirectionIn (default) or ParamDirectionOut
	Default   Expr           // default from = <expr>; nil if absent
}

// --- CREATE PROCEDURE ---------------------------------------------------------

// CreateProcStmt represents:
//
//	CREATE PROCEDURE <name>
//	    [@param datatype [= default] [OUTPUT]] [, ...]
//	AS
//	BEGIN
//	    <body>
//	END
type CreateProcStmt struct {
	IsAlter     bool        // true when this was ALTER PROCEDURE
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

// --- CREATE FUNCTION ----------------------------------------------------------

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
	IsAlter      bool        // true when this was ALTER FUNCTION
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

// --- SET ----------------------------------------------------------------------

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

// SetVarStmt represents: SET @var <op> <expr> [;]
// where <op> is one of = | += | -= | *= | /= | %=.
type SetVarStmt struct {
	Var   string // variable name including sigil (e.g. "@counter")
	Op    string // assignment operator: "=", "+=", "-=", "*=", "/=", "%="
	Value Expr   // right-hand side expression
}

func (*SetVarStmt) statementNode() {}

// --- DECLARE ------------------------------------------------------------------

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

// --- IF / ELSE ----------------------------------------------------------------

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

// --- WHILE --------------------------------------------------------------------

// WhileStmt represents a T-SQL WHILE loop.
//
//	WHILE <condition> BEGIN <body> END
//	WHILE <condition> <single-stmt>
//
// The formatter always normalises the body to BEGIN...END form.
type WhileStmt struct {
	Condition string      // raw condition expression (e.g. "@i < 10")
	Body      []Statement // loop body statements
}

func (*WhileStmt) statementNode() {}

// --- TRY / CATCH --------------------------------------------------------------

// TryCatchStmt represents a T-SQL TRY/CATCH block.
//
//	BEGIN TRY
//	    <try_body>
//	END TRY
//	BEGIN CATCH
//	    <catch_body>
//	END CATCH
type TryCatchStmt struct {
	TryBody   []Statement // statements inside BEGIN TRY ... END TRY
	CatchBody []Statement // statements inside BEGIN CATCH ... END CATCH
}

func (*TryCatchStmt) statementNode() {}

// --- BREAK / CONTINUE ---------------------------------------------------------

// BreakStmt represents a T-SQL BREAK statement inside a WHILE loop.
type BreakStmt struct{}

func (*BreakStmt) statementNode() {}

// ContinueStmt represents a T-SQL CONTINUE statement inside a WHILE loop.
type ContinueStmt struct{}

func (*ContinueStmt) statementNode() {}

// --- RETURN -------------------------------------------------------------------

// ReturnStmt represents a T-SQL RETURN statement.
//
//	RETURN          -- bare return (exits procedure with no value)
//	RETURN <expr>   -- return a scalar value from a function
type ReturnStmt struct {
	Value Expr // nil for bare RETURN; scalar expression otherwise
}

func (*ReturnStmt) statementNode() {}

// --- THROW --------------------------------------------------------------------

// ThrowStmt represents a T-SQL THROW statement.
//
//	THROW;                                    -- re-raise current exception
//	THROW <error_number>, <message>, <state>; -- raise new exception
//
// Args is nil for a bare re-raise; len==3 for a raise with arguments
// [error_number, message, state] stored as raw token values.
type ThrowStmt struct {
	Args []string // nil = bare re-raise; len==3 = [error_number, message, state]
}

func (*ThrowStmt) statementNode() {}

// --- PRINT --------------------------------------------------------------------

// PrintStmt represents a T-SQL PRINT statement.
//
//	PRINT <expr>
//
// Value is stored as a raw expression string — the argument may be a string
// literal, a variable, a concatenation, or any scalar expression.
type PrintStmt struct {
	Value string // raw expression, e.g. "'Hello'", "@msg", "'Count: ' + cast(@n as varchar)"
}

func (*PrintStmt) statementNode() {}

// --- TRANSACTION --------------------------------------------------------------

// TransactionStmtKind identifies the kind of transaction control statement.
type TransactionStmtKind int

const (
	TxnBegin    TransactionStmtKind = iota // BEGIN TRANSACTION
	TxnCommit                              // COMMIT [TRANSACTION]
	TxnRollback                            // ROLLBACK [TRANSACTION] [name]
	TxnSave                                // SAVE TRANSACTION name
)

// TransactionStmt represents a transaction control statement.
type TransactionStmt struct {
	Kind TransactionStmtKind
	Name string // optional transaction/savepoint name; empty if absent
}

func (*TransactionStmt) statementNode() {}

// --- EXEC ---------------------------------------------------------------------

// ExecStmt represents a T-SQL EXEC / EXECUTE statement.
//
//	EXEC [[@retvar =] <proc_name>] [<args>]
//	EXEC (<dynamic_sql_expr>)
//
// For a normal procedure call Proc holds the (schema-qualified) name and Args
// holds the raw argument list (everything between the proc name and the
// terminating semicolon). For a dynamic-SQL EXEC (e.g. EXEC (@sql)) Proc is
// empty and Args holds the full parenthesised expression.
//
// Argument parsing is kept as a raw string to avoid combinatorial complexity;
// a future issue can add structured argument nodes.
type ExecStmt struct {
	ReturnVar string // optional capture: @var in "@var = proc_name …"; empty if absent
	Proc      string // procedure name, possibly schema-qualified; empty for dynamic SQL
	Args      string // raw argument list; empty if no arguments
}

func (*ExecStmt) statementNode() {}
