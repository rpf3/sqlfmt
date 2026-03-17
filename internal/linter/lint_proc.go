package linter

import (
	"fmt"
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

// splitArgs splits a raw EXEC argument string on depth-0 commas (commas not
// inside parentheses). Returns nil when s is empty.
func splitArgs(s string) []string {
	if s == "" {
		return nil
	}
	var parts []string
	depth := 0
	start := 0
	for i := 0; i < len(s); i++ {
		switch s[i] {
		case '(':
			depth++
		case ')':
			depth--
		case ',':
			if depth == 0 {
				parts = append(parts, strings.TrimSpace(s[start:i]))
				start = i + 1
			}
		}
	}
	parts = append(parts, strings.TrimSpace(s[start:]))
	return parts
}

// checkExecStmt applies lint rules to an EXEC statement.
func (l *linter) checkExecStmt(s *parser.ExecStmt) {
	// Dynamic SQL and no-arg calls are exempt.
	if s.Proc == "" || s.Args == "" {
		return
	}
	args := splitArgs(s.Args)
	// Single positional arg is a common convention with no ordering ambiguity.
	if len(args) <= 1 {
		return
	}
	for _, arg := range args {
		if !strings.Contains(arg, "=") {
			l.warn(config.RuleExecNamedParams,
				fmt.Sprintf("exec %s: use named parameters (@param = value) instead of positional arguments", s.Proc))
			return
		}
	}
}

// checkDeclareStmt applies lint rules to a DECLARE statement.
func (l *linter) checkDeclareStmt(s *parser.DeclareStmt) {
	for _, v := range s.Vars {
		if isMaxType(v.Type) {
			l.warn(config.RuleNoVarcharMax,
				fmt.Sprintf("variable %q uses %s; consider a bounded length unless large values are expected",
					v.Name, v.Type))
		}
	}
}

// checkCreateProc applies lint rules to a CREATE PROCEDURE statement.
func (l *linter) checkCreateProc(s *parser.CreateProcStmt) {
	if !s.HasBeginEnd {
		l.warn(config.RuleMissingBeginEnd,
			fmt.Sprintf("procedure %q: body should be wrapped in BEGIN ... END", s.Name))
	}
	for _, p := range s.Params {
		if isMaxType(p.DataType) {
			l.warn(config.RuleNoVarcharMax,
				fmt.Sprintf("procedure %q: parameter %q uses %s; consider a bounded length unless large values are expected",
					s.Name, p.Name, p.DataType))
		}
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
	for _, p := range s.Params {
		if isMaxType(p.DataType) {
			l.warn(config.RuleNoVarcharMax,
				fmt.Sprintf("function %q: parameter %q uses %s; consider a bounded length unless large values are expected",
					s.Name, p.Name, p.DataType))
		}
	}
	// Inline TVFs use RETURN (...) — BEGIN/END does not apply.
	if s.Kind == parser.CreateFuncInlineTable {
		return
	}
	if !s.HasBeginEnd {
		l.warn(config.RuleMissingBeginEnd,
			fmt.Sprintf("function %q: body should be wrapped in BEGIN ... END", s.Name))
	}
}
