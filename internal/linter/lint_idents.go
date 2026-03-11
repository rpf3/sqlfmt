package linter

import (
	"fmt"
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/lexer"
	"github.com/rpf3/sqlfmt/internal/parser"
)

// checkIdentSpaces emits an identifier-with-spaces warning when name (after
// unquoting) contains embedded whitespace. ctx describes the identifier
// location for the message (e.g. `table "orders": column`).
func (l *linter) checkIdentSpaces(name, ctx string) {
	bare := lexer.UnquoteIdent(name)
	if strings.ContainsAny(bare, " \t") {
		l.warn(config.RuleIdentifierWithSpaces,
			fmt.Sprintf("%s %q contains spaces; identifiers with spaces require quoting everywhere — consider renaming",
				ctx, bare))
	}
}

// checkIdentsWithSpaces visits all user-defined identifier names in stmt and
// warns via checkIdentSpaces for any that contain embedded whitespace.
func (l *linter) checkIdentsWithSpaces(stmt parser.Statement) {
	switch s := stmt.(type) {
	case *parser.CreateTableStmt:
		l.checkIdentSpaces(s.Name, "table")
		for _, col := range s.Columns {
			l.checkIdentSpaces(col.Name, fmt.Sprintf("table %q: column", s.Name))
		}
		for _, tc := range s.Constraints {
			if tc.Name != "" {
				l.checkIdentSpaces(tc.Name, fmt.Sprintf("table %q: constraint", s.Name))
			}
		}

	case *parser.CreateIndexStmt:
		l.checkIdentSpaces(s.Name, "index")

	case *parser.CreateViewStmt:
		l.checkIdentSpaces(s.Name, "view")

	case *parser.AlterTableStmt:
		l.checkIdentSpaces(s.Name, "table")
		switch s.Action.Type {
		case parser.AlterAddColumn:
			if s.Action.Column != nil {
				l.checkIdentSpaces(s.Action.Column.Name,
					fmt.Sprintf("table %q: column", s.Name))
			}
		case parser.AlterRenameTable:
			l.checkIdentSpaces(s.Action.NewName, "table")
		case parser.AlterRenameColumn:
			l.checkIdentSpaces(s.Action.NewName,
				fmt.Sprintf("table %q: column", s.Name))
		}

	case *parser.CreateTypeStmt:
		l.checkIdentSpaces(s.Name, "type")
		for _, col := range s.Columns {
			l.checkIdentSpaces(col.Name, fmt.Sprintf("type %q: column", s.Name))
		}
		for _, tc := range s.Constraints {
			if tc.Name != "" {
				l.checkIdentSpaces(tc.Name, fmt.Sprintf("type %q: constraint", s.Name))
			}
		}

	case *parser.CreateProcStmt:
		l.checkIdentSpaces(s.Name, "procedure")

	case *parser.CreateFuncStmt:
		l.checkIdentSpaces(s.Name, "function")
	}
}
