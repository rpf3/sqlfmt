package linter

import (
	"fmt"

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
	for _, stmt := range result.Statements {
		l.checkStatement(stmt)
	}
	return l.warnings, nil
}

// linter holds configuration and accumulates warnings during a lint run.
type linter struct {
	cfg      config.Config
	warnings []Warning
}

// severity returns the configured severity for a rule, defaulting to warn.
func (l *linter) severity(rule string) config.RuleSeverity {
	if s, ok := l.cfg.LintRules[rule]; ok {
		return s
	}
	return config.RuleSeverityWarn
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

func (l *linter) checkCreateTable(s *parser.CreateTableStmt) {
	for _, col := range s.Columns {
		if col.PrimaryKey {
			l.warn(
				config.RuleInlinePrimaryKey,
				fmt.Sprintf(
					"table %q: column %q uses an inline PRIMARY KEY; use a named table-level constraint instead",
					s.Name, col.Name,
				),
			)
		}
		if col.Default != "" && col.DefaultConstraint == "" {
			l.warn(
				config.RuleUnnamedDefault,
				fmt.Sprintf(
					"table %q: column %q has an unnamed DEFAULT; add CONSTRAINT <name> before DEFAULT",
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
	}
}
