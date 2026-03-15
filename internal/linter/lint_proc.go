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

// containsThrow reports whether any ThrowStmt is reachable within stmts,
// recursing into IfStmt, WhileStmt, and TryCatchStmt bodies.
func containsThrow(stmts []parser.Statement) bool {
	for _, stmt := range stmts {
		switch s := stmt.(type) {
		case *parser.ThrowStmt:
			return true
		case *parser.IfStmt:
			if containsThrow(s.Then) || containsThrow(s.Else) {
				return true
			}
		case *parser.WhileStmt:
			if containsThrow(s.Body) {
				return true
			}
		case *parser.TryCatchStmt:
			if containsThrow(s.TryBody) || containsThrow(s.CatchBody) {
				return true
			}
		}
	}
	return false
}

// checkTryCatch applies lint rules to a TRY/CATCH block.
func (l *linter) checkTryCatch(s *parser.TryCatchStmt) {
	if len(s.CatchBody) == 0 {
		l.warn(config.RuleEmptyCatch, "CATCH block is empty; errors will be silently swallowed")
		return
	}
	if !containsThrow(s.CatchBody) {
		l.warn(config.RuleCatchWithoutThrow, "CATCH block does not contain THROW; the error will not be re-raised to the caller")
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
