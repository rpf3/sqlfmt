package parser

// ─── DELETE ───────────────────────────────────────────────────────────────────

// DeleteStmt represents: DELETE [TOP (n)] [<alias>] FROM <table> [AS <alias>] [WHERE <predicate>]
type DeleteStmt struct {
	Top           string // expression inside TOP(n); empty if absent
	Table         string // table name
	Alias         string // table alias; empty if none
	AliasExplicit bool   // true when the AS keyword preceded the alias
	Where         Expr   // WHERE predicate; nil if absent
}

func (*DeleteStmt) statementNode() {}

// ─── INSERT ───────────────────────────────────────────────────────────────────

// InsertStmt represents INSERT INTO <table> [(cols)] VALUES (...) [, (...)]
// or INSERT INTO <table> [(cols)] <select>.
// Exactly one of Values or Select is non-nil.
type InsertStmt struct {
	Table   string
	Columns []string    // target column list; nil if no explicit column list
	Values  [][]Expr    // rows of value expressions; nil if Select is set
	Select  *SelectStmt // INSERT … SELECT form; nil if Values is set
}

func (*InsertStmt) statementNode() {}

// ─── UPDATE ───────────────────────────────────────────────────────────────────

// UpdateSet is one col = expr assignment in an UPDATE SET clause.
type UpdateSet struct {
	Column string // column name, possibly qualified (e.g. "o.status")
	Value  Expr   // right-hand side expression
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
// ANSI:       UPDATE [TOP (n)] <table> SET <col=expr> [WHERE <pred>]
// SQL Server: UPDATE [TOP (n)] <alias> SET <col=expr> FROM <table> AS <alias> [JOINs] [WHERE <pred>]
//
// When From is nil the statement is ANSI style and Target is the table name.
// When From is non-nil the statement is SQL Server style: Target is the alias
// that appears after UPDATE, and From holds the FROM clause details.
type UpdateStmt struct {
	Top    string            // expression inside TOP(n); empty if absent
	Target string            // table name (ANSI) or alias (SQL Server)
	Sets   []UpdateSet       // SET assignments; always non-empty
	From   *UpdateFromSource // non-nil for SQL Server FROM style
	Where  Expr              // WHERE predicate; nil if absent
}

func (*UpdateStmt) statementNode() {}

// ─── MERGE ────────────────────────────────────────────────────────────────────

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
	Values    []Expr      // for MergeActionInsert: single row of value expressions
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
