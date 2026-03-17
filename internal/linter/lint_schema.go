package linter

import (
	"fmt"
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

// isSchemaQualified reports whether name is explicitly schema-qualified.
// A name is qualified if it contains a dot (e.g. "dbo.orders").
// Temp table names (#local, ##global) cannot carry a schema prefix and are
// treated as already-qualified to avoid false positives.
func isSchemaQualified(name string) bool {
	return strings.HasPrefix(name, "#") || strings.Contains(name, ".")
}

// warnUnqualified emits a missing-schema-name warning for name if it is not
// schema-qualified. ctx describes the SQL location (e.g. "SELECT FROM").
func (l *linter) warnUnqualified(name, ctx string) {
	if name == "" || isSchemaQualified(name) {
		return
	}
	l.warn(config.RuleMissingSchemaName,
		fmt.Sprintf("%s references %q without a schema qualifier; use schema.name (e.g. dbo.%s)", ctx, name, name))
}

// checkSchemaQualification checks all table references in stmt for missing
// schema qualifiers. It covers DML table references, CREATE INDEX ON, and
// FOREIGN KEY REFERENCES in CREATE TABLE — the places where schema-qualified
// names most matter for query correctness and portability.
func (l *linter) checkSchemaQualification(stmt parser.Statement) {
	switch s := stmt.(type) {
	case *parser.InsertStmt:
		l.warnUnqualified(s.Table, "INSERT INTO")

	case *parser.DeleteStmt:
		l.warnUnqualified(s.Table, "DELETE FROM")

	case *parser.UpdateStmt:
		if s.From == nil {
			// ANSI UPDATE: Target is the table name.
			l.warnUnqualified(s.Target, "UPDATE")
		} else {
			// SQL Server UPDATE … FROM: Target is an alias; the table is in From.
			l.warnUnqualified(s.From.Name, "UPDATE FROM")
			for _, jc := range s.From.Joins {
				l.warnUnqualified(jc.Name, "JOIN")
			}
		}

	case *parser.MergeStmt:
		l.warnUnqualified(s.Target, "MERGE INTO")
		l.warnUnqualified(s.Source.Name, "MERGE USING")

	case *parser.SelectStmt:
		l.checkSchemaSelect(s)

	case *parser.CreateIndexStmt:
		// The table the index is ON is a reference, not a definition.
		l.warnUnqualified(s.Table, "CREATE INDEX ON")

	case *parser.CreateTableStmt:
		// FOREIGN KEY REFERENCES reference another table.
		for _, tc := range s.Constraints {
			if tc.Type == parser.ConstraintForeignKey {
				l.warnUnqualified(tc.RefTable,
					fmt.Sprintf("table %q: REFERENCES", s.Name))
			}
		}

	case *parser.CreateTypeStmt:
		// The type itself should be schema-qualified.
		l.warnUnqualified(s.Name, "CREATE TYPE")
		// Table types may contain FK REFERENCES columns — check those too.
		for _, tc := range s.Constraints {
			if tc.Type == parser.ConstraintForeignKey {
				l.warnUnqualified(tc.RefTable,
					fmt.Sprintf("type %q: REFERENCES", s.Name))
			}
		}

	case *parser.CreateProcStmt:
		l.warnUnqualified(s.Name, "CREATE PROCEDURE")

	case *parser.CreateFuncStmt:
		l.warnUnqualified(s.Name, "CREATE FUNCTION")

	case *parser.ExecStmt:
		// Dynamic SQL (Proc == "") has no qualifiable name; skip.
		l.warnUnqualified(s.Proc, "EXEC")
	}
}

// checkSchemaSelect recurses into CTEs and subqueries, checking each named
// table reference (FROM clause and JOINs) for schema qualification.
func (l *linter) checkSchemaSelect(s *parser.SelectStmt) {
	for _, cte := range s.CTEs {
		l.checkSchemaSelect(cte.Select)
	}
	l.warnUnqualified(s.From.Name, "SELECT FROM")
	for _, jc := range s.Joins {
		l.warnUnqualified(jc.Name, "JOIN")
	}
	if s.From.Subquery != nil {
		l.checkSchemaSelect(s.From.Subquery)
	}
	if s.WhereSubq != nil {
		l.checkSchemaSelect(s.WhereSubq)
	}
	for _, setOp := range s.SetOps {
		l.checkSchemaSelect(setOp.Select)
	}
}
