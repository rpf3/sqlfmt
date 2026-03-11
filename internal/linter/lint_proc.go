package linter

import (
	"fmt"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

// checkCreateProc applies lint rules to a CREATE PROCEDURE statement.
func (l *linter) checkCreateProc(s *parser.CreateProcStmt) {
	if !s.HasBeginEnd {
		l.warn(config.RuleMissingBeginEnd,
			fmt.Sprintf("procedure %q: body should be wrapped in BEGIN ... END", s.Name))
	}
}

// checkCreateFunc applies lint rules to a CREATE FUNCTION statement.
func (l *linter) checkCreateFunc(s *parser.CreateFuncStmt) {
	// Inline TVFs use RETURN (...) — BEGIN/END does not apply.
	if s.Kind == parser.CreateFuncInlineTable {
		return
	}
	if !s.HasBeginEnd {
		l.warn(config.RuleMissingBeginEnd,
			fmt.Sprintf("function %q: body should be wrapped in BEGIN ... END", s.Name))
	}
}
