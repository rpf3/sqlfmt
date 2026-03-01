package formatter

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/parser"
)

// Format takes raw SQL and returns formatted SQL.
// It returns an error if the input cannot be parsed.
func Format(input string) (string, error) {
	result := parser.Parse(input)
	if len(result.Errors) > 0 {
		return "", result.Errors[0]
	}

	var parts []string
	for _, stmt := range result.Statements {
		parts = append(parts, formatStatement(stmt))
	}
	return strings.Join(parts, "\n\n") + "\n", nil
}

func formatStatement(stmt parser.Statement) string {
	switch s := stmt.(type) {
	case *parser.CreateTableStmt:
		return formatCreateTable(s)
	case *parser.CreateIndexStmt:
		return formatCreateIndex(s)
	case *parser.AlterTableStmt:
		return formatAlterTable(s)
	case *parser.DropStmt:
		return formatDrop(s)
	}
	return ""
}

func formatDrop(s *parser.DropStmt) string {
	var b strings.Builder
	b.WriteString("drop ")
	switch s.Type {
	case parser.DropTable:
		b.WriteString("table ")
	case parser.DropView:
		b.WriteString("view ")
	case parser.DropIndex:
		b.WriteString("index ")
	}
	if s.IfExists {
		b.WriteString("if exists ")
	}
	b.WriteString(s.Name)
	b.WriteString(";")
	return b.String()
}

func formatCreateIndex(s *parser.CreateIndexStmt) string {
	var b strings.Builder
	b.WriteString("create ")
	if s.Unique {
		b.WriteString("unique ")
	}
	b.WriteString("index ")
	if s.IfNotExists {
		b.WriteString("if not exists ")
	}
	b.WriteString(s.Name)
	b.WriteString("\n\ton ")
	b.WriteString(s.Table)
	b.WriteString(" (")
	var colParts []string
	for _, col := range s.Columns {
		part := col.Name
		if col.Desc {
			part += " desc"
		}
		colParts = append(colParts, part)
	}
	b.WriteString(strings.Join(colParts, ", "))
	b.WriteString(");")
	return b.String()
}

// normalizeDefaultExpr lowercases the default expression unless it is a
// string literal (single-quoted), which must be preserved verbatim.
func normalizeDefaultExpr(v string) string {
	if len(v) > 0 && v[0] == '\'' {
		return v
	}
	return strings.ToLower(v)
}

// writeColumnDef writes the canonical form of a column definition to b.
// It does not include any leading indentation or comma — the caller handles that.
func writeColumnDef(b *strings.Builder, col parser.ColumnDef) {
	b.WriteString(col.Name)
	b.WriteString(" ")
	b.WriteString(strings.ToLower(col.DataType))
	if col.PrimaryKey {
		b.WriteString(" primary key")
	}
	if col.Default != "" {
		b.WriteString(" default ")
		b.WriteString(normalizeDefaultExpr(col.Default))
	}
	switch col.Nullability {
	case parser.NullabilityNotNull:
		b.WriteString(" not null")
	case parser.NullabilityNull:
		b.WriteString(" null")
	}
	if col.Unique {
		b.WriteString(" unique")
	}
	if col.Check != "" {
		b.WriteString(" check (")
		b.WriteString(col.Check)
		b.WriteString(")")
	}
	if col.References != nil {
		b.WriteString(" references ")
		b.WriteString(col.References.Table)
		if len(col.References.Columns) > 0 {
			b.WriteString(" (")
			b.WriteString(strings.Join(col.References.Columns, ", "))
			b.WriteString(")")
		}
	}
}

// writeTableConstraint writes the canonical form of a table constraint to b,
// starting with "constraint <name>\n\t\t" for named constraints (matching the
// indentation used in both CREATE TABLE and ALTER TABLE ADD).
func writeTableConstraint(b *strings.Builder, tc parser.TableConstraint) {
	if tc.Name != "" {
		b.WriteString("constraint ")
		b.WriteString(tc.Name)
		b.WriteString("\n\t\t")
	}
	switch tc.Type {
	case parser.ConstraintPrimaryKey:
		b.WriteString("primary key (")
		b.WriteString(strings.Join(tc.Columns, ", "))
		b.WriteString(")")
	case parser.ConstraintForeignKey:
		b.WriteString("foreign key (")
		b.WriteString(strings.Join(tc.Columns, ", "))
		b.WriteString(") references ")
		b.WriteString(tc.RefTable)
		if len(tc.RefColumns) > 0 {
			b.WriteString(" (")
			b.WriteString(strings.Join(tc.RefColumns, ", "))
			b.WriteString(")")
		}
	case parser.ConstraintUnique:
		b.WriteString("unique (")
		b.WriteString(strings.Join(tc.Columns, ", "))
		b.WriteString(")")
	case parser.ConstraintCheck:
		b.WriteString("check (")
		b.WriteString(tc.Check)
		b.WriteString(")")
	}
}

func formatCreateTable(s *parser.CreateTableStmt) string {
	var b strings.Builder
	b.WriteString("create table ")
	b.WriteString(s.Name)
	b.WriteString("\n(\n")

	for i, col := range s.Columns {
		if i == 0 {
			b.WriteString("\t")
		} else {
			b.WriteString(",\t")
		}
		writeColumnDef(&b, col)
		b.WriteString("\n")
	}

	if len(s.Constraints) > 0 {
		b.WriteString("\n") // blank line separates columns from constraints
	}
	for _, tc := range s.Constraints {
		b.WriteString(",\t")
		writeTableConstraint(&b, tc)
		b.WriteString("\n")
	}

	b.WriteString(");")
	return b.String()
}

func formatAlterTable(s *parser.AlterTableStmt) string {
	var b strings.Builder
	b.WriteString("alter table ")
	b.WriteString(s.Name)
	b.WriteString("\n\t")

	switch s.Action.Type {
	case parser.AlterAddColumn:
		b.WriteString("add column ")
		writeColumnDef(&b, *s.Action.Column)
	case parser.AlterDropColumn:
		b.WriteString("drop column ")
		b.WriteString(s.Action.ColumnName)
	case parser.AlterAddConstraint:
		b.WriteString("add ")
		writeTableConstraint(&b, *s.Action.Constraint)
	case parser.AlterDropConstraint:
		b.WriteString("drop constraint ")
		b.WriteString(s.Action.ConstraintName)
	case parser.AlterRenameTable:
		b.WriteString("rename to ")
		b.WriteString(s.Action.NewName)
	case parser.AlterRenameColumn:
		b.WriteString("rename column ")
		b.WriteString(s.Action.ColumnName)
		b.WriteString(" to ")
		b.WriteString(s.Action.NewName)
	}

	b.WriteString(";")
	return b.String()
}
