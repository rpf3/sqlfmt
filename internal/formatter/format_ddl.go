package formatter

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

func (f *formatter) formatDrop(s *parser.DropStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("drop "))
	switch s.Type {
	case parser.DropTable:
		b.WriteString(f.kw("table "))
	case parser.DropView:
		b.WriteString(f.kw("view "))
	case parser.DropIndex:
		b.WriteString(f.kw("index "))
	}
	if s.IfExists {
		b.WriteString(f.kw("if exists "))
	}
	b.WriteString(s.Name)
	b.WriteString(";")
	return b.String()
}

func (f *formatter) formatCreateIndex(s *parser.CreateIndexStmt) string {
	ind := f.indent()
	var b strings.Builder
	b.WriteString(f.kw("create "))
	if s.Unique {
		b.WriteString(f.kw("unique "))
	}
	b.WriteString(f.kw("index "))
	if s.IfNotExists {
		b.WriteString(f.kw("if not exists "))
	}
	b.WriteString(s.Name)
	b.WriteString("\n")
	b.WriteString(ind)
	b.WriteString(f.kw("on "))
	b.WriteString(s.Table)
	b.WriteString(" (")
	var colParts []string
	for _, col := range s.Columns {
		part := col.Name
		if col.Direction == parser.DirectionDesc {
			part += " " + f.kw("desc")
		}
		colParts = append(colParts, part)
	}
	b.WriteString(strings.Join(colParts, ", "))
	b.WriteString(");")
	return b.String()
}

// normalizeDefaultExpr normalises the default expression according to keyword
// case, unless it is a string literal (single-quoted), which is preserved verbatim.
func (f *formatter) normalizeDefaultExpr(v string) string {
	if len(v) > 0 && v[0] == '\'' {
		return v
	}
	return f.kw(strings.ToLower(v))
}

// writeColumnDef writes the canonical form of a column definition to b.
// It does not include any leading indentation or comma — the caller handles that.
func (f *formatter) writeColumnDef(b *strings.Builder, col parser.ColumnDef) {
	b.WriteString(col.Name)
	b.WriteString(" ")
	b.WriteString(f.kw(strings.ToLower(col.DataType)))
	if col.PrimaryKey {
		b.WriteString(" " + f.kw("primary key"))
	}
	if col.Default != "" {
		if col.DefaultConstraint != "" {
			b.WriteString(" " + f.kw("constraint") + " ")
			b.WriteString(col.DefaultConstraint)
		}
		b.WriteString(" " + f.kw("default") + " ")
		b.WriteString(f.normalizeDefaultExpr(col.Default))
	}
	switch col.Nullability {
	case parser.NullabilityNotNull:
		b.WriteString(" " + f.kw("not null"))
	case parser.NullabilityNull:
		b.WriteString(" " + f.kw("null"))
	}
	if col.Unique {
		b.WriteString(" " + f.kw("unique"))
	}
	if col.Check != "" {
		b.WriteString(" " + f.kw("check") + " (")
		b.WriteString(col.Check)
		b.WriteString(")")
	}
	if col.References != nil {
		b.WriteString(" " + f.kw("references") + " ")
		b.WriteString(col.References.Table)
		if len(col.References.Columns) > 0 {
			b.WriteString(" (")
			b.WriteString(strings.Join(col.References.Columns, ", "))
			b.WriteString(")")
		}
	}
}

// writeTableConstraint writes the canonical form of a table constraint to b.
func (f *formatter) writeTableConstraint(b *strings.Builder, tc parser.TableConstraint) {
	ind := f.indent()
	if tc.Name != "" {
		b.WriteString(f.kw("constraint "))
		b.WriteString(tc.Name)
		b.WriteString("\n")
		b.WriteString(ind)
		b.WriteString(ind)
	}
	switch tc.Type {
	case parser.ConstraintPrimaryKey:
		b.WriteString(f.kw("primary key") + " (")
		b.WriteString(strings.Join(tc.Columns, ", "))
		b.WriteString(")")
	case parser.ConstraintForeignKey:
		b.WriteString(f.kw("foreign key") + " (")
		b.WriteString(strings.Join(tc.Columns, ", "))
		b.WriteString(") " + f.kw("references") + " ")
		b.WriteString(tc.RefTable)
		if len(tc.RefColumns) > 0 {
			b.WriteString(" (")
			b.WriteString(strings.Join(tc.RefColumns, ", "))
			b.WriteString(")")
		}
	case parser.ConstraintUnique:
		b.WriteString(f.kw("unique") + " (")
		b.WriteString(strings.Join(tc.Columns, ", "))
		b.WriteString(")")
	case parser.ConstraintCheck:
		b.WriteString(f.kw("check") + " (")
		b.WriteString(tc.Check)
		b.WriteString(")")
	}
}

func (f *formatter) formatCreateTable(s *parser.CreateTableStmt) string {
	ind := f.indent()
	var b strings.Builder
	b.WriteString(f.kw("create table "))
	b.WriteString(s.Name)
	b.WriteString("\n(\n")

	totalItems := len(s.Columns) + len(s.Constraints)
	itemIdx := 0

	for _, col := range s.Columns {
		if f.cfg.CommaStyle == config.CommaTrailing {
			b.WriteString(ind)
			f.writeColumnDef(&b, col)
			if itemIdx < totalItems-1 {
				b.WriteString(",")
			}
		} else {
			// leading comma style
			if itemIdx == 0 {
				b.WriteString(ind)
			} else {
				b.WriteString("," + ind)
			}
			f.writeColumnDef(&b, col)
		}
		b.WriteString("\n")
		itemIdx++
	}

	if len(s.Constraints) > 0 {
		b.WriteString("\n") // blank line separates columns from constraints
	}
	for _, tc := range s.Constraints {
		if f.cfg.CommaStyle == config.CommaTrailing {
			b.WriteString(ind)
			f.writeTableConstraint(&b, tc)
			if itemIdx < totalItems-1 {
				b.WriteString(",")
			}
		} else {
			// leading comma style
			b.WriteString("," + ind)
			f.writeTableConstraint(&b, tc)
		}
		b.WriteString("\n")
		itemIdx++
	}

	b.WriteString(");")
	return b.String()
}

func (f *formatter) formatAlterTable(s *parser.AlterTableStmt) string {
	ind := f.indent()
	var b strings.Builder
	b.WriteString(f.kw("alter table "))
	b.WriteString(s.Name)
	b.WriteString("\n")
	b.WriteString(ind)

	switch s.Action.Type {
	case parser.AlterAddColumn:
		b.WriteString(f.kw("add column "))
		f.writeColumnDef(&b, *s.Action.Column)
	case parser.AlterDropColumn:
		b.WriteString(f.kw("drop column "))
		b.WriteString(s.Action.ColumnName)
	case parser.AlterAddConstraint:
		b.WriteString(f.kw("add "))
		f.writeTableConstraint(&b, *s.Action.Constraint)
	case parser.AlterDropConstraint:
		b.WriteString(f.kw("drop constraint "))
		b.WriteString(s.Action.ConstraintName)
	case parser.AlterRenameTable:
		b.WriteString(f.kw("rename to "))
		b.WriteString(s.Action.NewName)
	case parser.AlterRenameColumn:
		b.WriteString(f.kw("rename column "))
		b.WriteString(s.Action.ColumnName)
		b.WriteString(" " + f.kw("to") + " ")
		b.WriteString(s.Action.NewName)
	}

	b.WriteString(";")
	return b.String()
}
