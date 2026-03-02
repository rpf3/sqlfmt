package linter

import (
	"fmt"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

// Warning represents a single lint warning emitted by the linter.
type Warning struct {
	Rule    string
	Message string
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

func (l *linter) warn(rule, message string) {
	w := Warning{Rule: rule, Message: message}
	l.warnings = append(l.warnings, w)
}

func (l *linter) checkStatement(stmt parser.Statement) {
	switch s := stmt.(type) {
	case *parser.CreateTableStmt:
		l.checkCreateTable(s)
	}
}

func (l *linter) checkCreateTable(s *parser.CreateTableStmt) {
	for _, col := range s.Columns {
		if col.PrimaryKey {
			l.warn(
				"inline-primary-key",
				fmt.Sprintf(
					"table %q: column %q uses an inline PRIMARY KEY; use a named table-level constraint instead",
					s.Name, col.Name,
				),
			)
		}
	}
	for _, tc := range s.Constraints {
		if tc.Type == parser.ConstraintPrimaryKey && tc.Name == "" {
			l.warn(
				"unnamed-primary-key",
				fmt.Sprintf(
					"table %q: PRIMARY KEY constraint has no name; add CONSTRAINT <name> before PRIMARY KEY",
					s.Name,
				),
			)
		}
	}
}
