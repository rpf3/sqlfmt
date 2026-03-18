// Package linter checks parsed SQL against a configurable set of style and
// correctness rules, returning a slice of Warning values.
//
// Rules are organised by SQL domain (select, dml, ddl, proc) and are enabled
// or disabled via config.Config.LintRules. Some rules are opt-in and default
// to off; see config.DefaultSeverity. The linter recurses into subqueries,
// CTEs, and procedural control-flow bodies (IF/WHILE/TRY-CATCH) so that rules
// apply to nested SQL regardless of how deeply it is embedded.
package linter

import (
	"fmt"
	"sort"
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

// Warning represents a single lint warning emitted by the linter.
type Warning struct {
	Rule     string
	Message  string
	Severity config.RuleSeverity
}

// Lint parses input SQL and returns any lint warnings found.
// It returns an error if the input cannot be parsed.
func Lint(input string, cfg config.Config) ([]Warning, error) {
	result := parser.Parse(input)
	if len(result.Errors) > 0 {
		return nil, result.Errors[0]
	}

	l := &linter{cfg: cfg}
	for i, stmt := range result.Statements {
		l.checkStatement(stmt)
		if !result.SemicolonPresent[i] {
			l.warn(config.RuleMissingTrailingSemicolon, "statement is missing a trailing semicolon")
		}
	}
	l.checkOneObjectPerFile(result.Statements)
	l.checkMustBeOnlyStatement(result.Statements)
	return l.warnings, nil
}

// checkOneObjectPerFile warns when a file defines more than one distinct
// primary DDL object. Primary objects are CREATE TABLE and CREATE VIEW.
// CREATE INDEX is subordinate: it is exempt unless its ON table differs from
// the file's single CREATE TABLE. ALTER TABLE and DROP are always exempt.
func (l *linter) checkOneObjectPerFile(stmts []parser.Statement) {
	sev := l.severity(config.RuleOneObjectPerFile)
	if sev == config.RuleSeverityOff {
		return
	}

	seen := map[string]bool{}
	var primaryTable string // name from the first CREATE TABLE, if any

	for _, stmt := range stmts {
		switch s := stmt.(type) {
		case *parser.CreateTableStmt:
			seen[s.Name] = true
			if primaryTable == "" {
				primaryTable = s.Name
			}
		case *parser.CreateViewStmt:
			seen[s.Name] = true
		}
	}

	// A CREATE INDEX that references a table other than the primary CREATE TABLE
	// implies a second object is present in the file.
	for _, stmt := range stmts {
		if s, ok := stmt.(*parser.CreateIndexStmt); ok {
			if primaryTable != "" && s.Table != primaryTable {
				seen[s.Table] = true
			}
		}
	}

	if len(seen) <= 1 {
		return
	}

	names := make([]string, 0, len(seen))
	for n := range seen {
		names = append(names, fmt.Sprintf("%q", n))
	}
	sort.Strings(names)
	l.warn(config.RuleOneObjectPerFile,
		fmt.Sprintf("file defines multiple objects (%s); each object should have its own file",
			strings.Join(names, ", ")))
}

// checkMustBeOnlyStatement warns when CREATE VIEW, CREATE PROCEDURE,
// CREATE FUNCTION, or CREATE TYPE AS TABLE appears alongside other statements
// in the same batch. These DDL statements require an exclusive batch in T-SQL.
func (l *linter) checkMustBeOnlyStatement(stmts []parser.Statement) {
	sev := l.severity(config.RuleMustBeOnlyStatement)
	if sev == config.RuleSeverityOff {
		return
	}
	if len(stmts) <= 1 {
		return
	}
	for _, stmt := range stmts {
		switch s := stmt.(type) {
		case *parser.CreateViewStmt:
			l.warn(config.RuleMustBeOnlyStatement,
				fmt.Sprintf("CREATE VIEW %q must be the only statement in the batch", s.Name))
		case *parser.CreateProcStmt:
			l.warn(config.RuleMustBeOnlyStatement,
				fmt.Sprintf("CREATE PROCEDURE %q must be the only statement in the batch", s.Name))
		case *parser.CreateFuncStmt:
			l.warn(config.RuleMustBeOnlyStatement,
				fmt.Sprintf("CREATE FUNCTION %q must be the only statement in the batch", s.Name))
		case *parser.CreateTypeStmt:
			if s.Kind == parser.CreateTypeTable {
				l.warn(config.RuleMustBeOnlyStatement,
					fmt.Sprintf("CREATE TYPE %q must be the only statement in the batch", s.Name))
			}
		}
	}
}

// linter holds configuration and accumulates warnings during a lint run.
type linter struct {
	cfg      config.Config
	warnings []Warning
}

// severity returns the configured severity for a rule. An explicit entry in
// LintRules takes precedence; otherwise DefaultSeverity applies (most rules
// default to warn, opt-in rules default to off).
func (l *linter) severity(rule string) config.RuleSeverity {
	if s, ok := l.cfg.LintRules[rule]; ok {
		return s
	}
	return config.DefaultSeverity(rule)
}

func (l *linter) warn(rule, message string) {
	sev := l.severity(rule)
	if sev == config.RuleSeverityOff {
		return
	}
	w := Warning{Rule: rule, Message: message, Severity: sev}
	l.warnings = append(l.warnings, w)
}

func (l *linter) checkStatement(stmt parser.Statement) {
	switch s := stmt.(type) {
	case *parser.CreateTableStmt:
		l.checkCreateTable(s)
	case *parser.CreateIndexStmt:
		l.checkCreateIndex(s)
	case *parser.SelectStmt:
		l.checkSelectStmt(s)
	case *parser.InsertStmt:
		l.checkInsertStmt(s)
	case *parser.UpdateStmt:
		l.checkUpdateStmt(s)
	case *parser.DeleteStmt:
		l.checkDeleteStmt(s)
	case *parser.MergeStmt:
		l.checkMergeStmt(s)
	case *parser.CreateProcStmt:
		l.checkCreateProc(s)
	case *parser.CreateFuncStmt:
		l.checkCreateFunc(s)
	case *parser.TryCatchStmt:
		l.checkTryCatch(s)
		l.checkStmtList(s.TryBody)
		l.checkStmtList(s.CatchBody)
	case *parser.IfStmt:
		l.checkStmtList(s.Then)
		l.checkStmtList(s.Else)
	case *parser.WhileStmt:
		l.checkStmtList(s.Body)
	case *parser.ExecStmt:
		l.checkExecStmt(s)
	case *parser.DeclareStmt:
		l.checkDeclareStmt(s)
	}
	l.checkSchemaQualification(stmt)
	l.checkIdentsWithSpaces(stmt)
}

// checkStmtList runs checkStatement on each statement in a slice.
// Used to recurse into IF/WHILE/TRY-CATCH bodies.
func (l *linter) checkStmtList(stmts []parser.Statement) {
	for _, stmt := range stmts {
		l.checkStatement(stmt)
	}
}

func (l *linter) checkCreateIndex(s *parser.CreateIndexStmt) {
	for _, col := range s.Columns {
		if col.Direction == parser.DirectionNone {
			l.warn(
				config.RuleIndexDirection,
				fmt.Sprintf(
					"index %q: column %q has no explicit direction; specify ASC or DESC",
					s.Name, col.Name,
				),
			)
		}
	}
}

// isMaxType reports whether dataType is a variable-length type with a MAX
// length parameter, e.g. VARCHAR(MAX) or NVARCHAR(MAX).
func isMaxType(dataType string) bool {
	return strings.Contains(strings.ToUpper(dataType), "(MAX)")
}

func (l *linter) checkCreateTable(s *parser.CreateTableStmt) {
	for _, col := range s.Columns {
		if isMaxType(col.DataType) {
			l.warn(config.RuleNoVarcharMax,
				fmt.Sprintf("table %q: column %q uses %s; consider a bounded length unless large values are expected",
					s.Name, col.Name, col.DataType))
		}
		if col.PrimaryKey {
			l.warn(
				config.RuleInlinePrimaryKey,
				fmt.Sprintf(
					"table %q: column %q uses an inline PRIMARY KEY; use a named table-level constraint instead",
					s.Name, col.Name,
				),
			)
		}
		if col.Default != nil && col.DefaultConstraint == "" {
			l.warn(
				config.RuleUnnamedDefault,
				fmt.Sprintf(
					"table %q: column %q has an unnamed DEFAULT; add CONSTRAINT <name> before DEFAULT",
					s.Name, col.Name,
				),
			)
		}
		if col.Computed && !col.Persisted && col.Nullability != parser.NullabilityNone {
			l.warn(
				config.RuleComputedColumnNullability,
				fmt.Sprintf(
					"table %q: column %q has a nullability constraint but is not PERSISTED; NOT NULL / NULL is only valid on a PERSISTED computed column",
					s.Name, col.Name,
				),
			)
		}
	}
	for _, tc := range s.Constraints {
		if tc.Type == parser.ConstraintPrimaryKey && tc.Name == "" {
			l.warn(
				config.RuleUnnamedPrimaryKey,
				fmt.Sprintf(
					"table %q: PRIMARY KEY constraint has no name; add CONSTRAINT <name> before PRIMARY KEY",
					s.Name,
				),
			)
		}
		if tc.Type == parser.ConstraintForeignKey {
			if tc.OnDelete == parser.RefActionCascade {
				l.warn(
					config.RuleNoCascadeFk,
					fmt.Sprintf(
						"table %q: foreign key %q uses ON DELETE CASCADE; prefer an explicit action (SET NULL, SET DEFAULT, NO ACTION)",
						s.Name, tc.Name,
					),
				)
			}
			if tc.OnUpdate == parser.RefActionCascade {
				l.warn(
					config.RuleNoCascadeFk,
					fmt.Sprintf(
						"table %q: foreign key %q uses ON UPDATE CASCADE; prefer an explicit action (SET NULL, SET DEFAULT, NO ACTION)",
						s.Name, tc.Name,
					),
				)
			}
		}
	}
	for _, col := range s.Columns {
		if col.References != nil {
			if col.References.OnDelete == parser.RefActionCascade {
				l.warn(
					config.RuleNoCascadeFk,
					fmt.Sprintf(
						"table %q: column %q uses ON DELETE CASCADE; prefer an explicit action (SET NULL, SET DEFAULT, NO ACTION)",
						s.Name, col.Name,
					),
				)
			}
			if col.References.OnUpdate == parser.RefActionCascade {
				l.warn(
					config.RuleNoCascadeFk,
					fmt.Sprintf(
						"table %q: column %q uses ON UPDATE CASCADE; prefer an explicit action (SET NULL, SET DEFAULT, NO ACTION)",
						s.Name, col.Name,
					),
				)
			}
		}
	}
}
