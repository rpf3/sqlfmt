package formatter

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

func (f *formatter) formatCreateSchema(s *parser.CreateSchemaStmt) string {
	out := f.kw("create schema ") + s.Name
	if s.Authorization != "" {
		out += " " + f.kw("authorization") + " " + s.Authorization
	}
	return out + ";"
}

func (f *formatter) formatCreateView(s *parser.CreateViewStmt) string {
	kw := "create view "
	if s.IsAlter {
		kw = "alter view "
	}
	return f.kw(kw) + f.ident(s.Name) + f.kw(" as") + "\n" + f.formatSelectStmt(s.Select)
}

func (f *formatter) formatTruncate(s *parser.TruncateStmt) string {
	return f.kw("truncate table ") + f.ident(s.Name) + ";"
}

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
	case parser.DropProcedure:
		b.WriteString(f.kw("procedure "))
	case parser.DropFunction:
		b.WriteString(f.kw("function "))
	}
	if s.IfExists {
		b.WriteString(f.kw("if exists "))
	}
	b.WriteString(f.ident(s.Name))
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
	b.WriteString(f.ident(s.Name))
	b.WriteString("\n")
	b.WriteString(ind)
	b.WriteString(f.kw("on "))
	b.WriteString(f.ident(s.Table))
	b.WriteString(" (")
	var colParts []string
	for _, col := range s.Columns {
		part := f.ident(col.Name)
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

// refActionStr returns the canonical keyword string for a referential action.
// Returns "" for RefActionNone so callers can skip unset actions.
func (f *formatter) refActionStr(a parser.RefAction) string {
	switch a {
	case parser.RefActionCascade:
		return f.kw("cascade")
	case parser.RefActionSetNull:
		return f.kw("set null")
	case parser.RefActionSetDefault:
		return f.kw("set default")
	case parser.RefActionNoAction:
		return f.kw("no action")
	}
	return ""
}

// writeRefActions appends ON DELETE / ON UPDATE clauses to b, wrapped onto a
// new line at the given indent. Both actions are written on the same
// continuation line. No output is produced when neither action is set.
func (f *formatter) writeRefActions(b *strings.Builder, ind string, onDelete, onUpdate parser.RefAction) {
	deleteStr := f.refActionStr(onDelete)
	updateStr := f.refActionStr(onUpdate)
	if deleteStr == "" && updateStr == "" {
		return
	}
	b.WriteString("\n" + ind)
	if deleteStr != "" {
		b.WriteString(f.kw("on delete") + " " + deleteStr)
	}
	if updateStr != "" {
		if deleteStr != "" {
			b.WriteString(" ")
		}
		b.WriteString(f.kw("on update") + " " + updateStr)
	}
}

// writeColumnDef writes the canonical form of a column definition to b.
// It does not include any leading indentation or comma — the caller handles that.
func (f *formatter) writeColumnDef(b *strings.Builder, col parser.ColumnDef) {
	ind := f.indent()
	b.WriteString(f.ident(col.Name))
	b.WriteString(" ")
	b.WriteString(f.kw(strings.ToLower(col.DataType)))
	if col.Identity != nil {
		b.WriteString(" " + f.kw("identity"))
		if col.Identity.Seed != "" {
			b.WriteString("(" + col.Identity.Seed + ", " + col.Identity.Increment + ")")
		}
	}
	if col.PrimaryKey {
		b.WriteString(" " + f.kw("primary key"))
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
	if col.Check != nil {
		b.WriteString(" " + f.kw("check") + " (")
		b.WriteString(parser.Render(col.Check))
		b.WriteString(")")
	}
	if col.References != nil {
		b.WriteString(" " + f.kw("references") + " ")
		b.WriteString(f.ident(col.References.Table))
		if len(col.References.Columns) > 0 {
			b.WriteString(" (")
			refCols := make([]string, len(col.References.Columns))
			for i, c := range col.References.Columns {
				refCols[i] = f.ident(c)
			}
			b.WriteString(strings.Join(refCols, ", "))
			b.WriteString(")")
		}
		f.writeRefActions(b, ind+ind, col.References.OnDelete, col.References.OnUpdate)
	}
	if col.Default != nil {
		b.WriteString("\n")
		b.WriteString(ind + ind)
		if col.DefaultConstraint != "" {
			b.WriteString(f.kw("constraint") + " ")
			b.WriteString(f.ident(col.DefaultConstraint))
			b.WriteString(" ")
		}
		b.WriteString(f.kw("default") + " ")
		b.WriteString(f.normalizeDefaultExpr(parser.Render(col.Default)))
	}
}

// writeTableConstraint writes the canonical form of a table constraint to b.
func (f *formatter) writeTableConstraint(b *strings.Builder, tc parser.TableConstraint) {
	ind := f.indent()
	if tc.Name != "" {
		b.WriteString(f.kw("constraint "))
		b.WriteString(f.ident(tc.Name))
		b.WriteString("\n")
		b.WriteString(ind)
		b.WriteString(ind)
	}
	switch tc.Type {
	case parser.ConstraintPrimaryKey:
		b.WriteString(f.kw("primary key") + " (")
		pkCols := make([]string, len(tc.Columns))
		for i, c := range tc.Columns {
			pkCols[i] = f.ident(c)
		}
		b.WriteString(strings.Join(pkCols, ", "))
		b.WriteString(")")
	case parser.ConstraintForeignKey:
		b.WriteString(f.kw("foreign key") + " (")
		fkCols := make([]string, len(tc.Columns))
		for i, c := range tc.Columns {
			fkCols[i] = f.ident(c)
		}
		b.WriteString(strings.Join(fkCols, ", "))
		b.WriteString(") " + f.kw("references") + " ")
		b.WriteString(f.ident(tc.RefTable))
		if len(tc.RefColumns) > 0 {
			b.WriteString(" (")
			refCols := make([]string, len(tc.RefColumns))
			for i, c := range tc.RefColumns {
				refCols[i] = f.ident(c)
			}
			b.WriteString(strings.Join(refCols, ", "))
			b.WriteString(")")
		}
		f.writeRefActions(b, ind+ind, tc.OnDelete, tc.OnUpdate)
	case parser.ConstraintUnique:
		b.WriteString(f.kw("unique") + " (")
		uqCols := make([]string, len(tc.Columns))
		for i, c := range tc.Columns {
			uqCols[i] = f.ident(c)
		}
		b.WriteString(strings.Join(uqCols, ", "))
		b.WriteString(")")
	case parser.ConstraintCheck:
		b.WriteString(f.kw("check") + " (")
		b.WriteString(parser.Render(tc.Check))
		b.WriteString(")")
	}
}

// writeColumnDefList writes cols into b with comma-style handling.
// itemIdx is the position of the first item in the global list (may be non-zero
// when columns are followed by constraints); totalItems is the combined count.
// Returns the updated itemIdx after all cols are written.
func (f *formatter) writeColumnDefList(b *strings.Builder, cols []parser.ColumnDef, itemIdx, totalItems int) int {
	ind := f.indent()
	for _, col := range cols {
		if f.cfg.CommaStyle == config.CommaTrailing {
			b.WriteString(ind)
			f.writeColumnDef(b, col)
			if itemIdx < totalItems-1 {
				b.WriteString(",")
			}
		} else {
			if itemIdx == 0 {
				b.WriteString(ind)
			} else {
				b.WriteString("," + ind)
			}
			f.writeColumnDef(b, col)
		}
		b.WriteString("\n")
		itemIdx++
	}
	return itemIdx
}

// writeTableConstraintList writes constraints into b with comma-style handling.
// itemIdx is the position of the first constraint in the global list (after any
// preceding columns); totalItems is the combined count. Returns the updated itemIdx.
func (f *formatter) writeTableConstraintList(b *strings.Builder, constraints []parser.TableConstraint, itemIdx, totalItems int) int {
	ind := f.indent()
	for _, tc := range constraints {
		if f.cfg.CommaStyle == config.CommaTrailing {
			b.WriteString(ind)
			f.writeTableConstraint(b, tc)
			if itemIdx < totalItems-1 {
				b.WriteString(",")
			}
		} else {
			b.WriteString("," + ind)
			f.writeTableConstraint(b, tc)
		}
		b.WriteString("\n")
		itemIdx++
	}
	return itemIdx
}

func (f *formatter) formatCreateTable(s *parser.CreateTableStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("create table "))
	b.WriteString(f.ident(s.Name))
	b.WriteString("\n(\n")

	totalItems := len(s.Columns) + len(s.Constraints)
	itemIdx := f.writeColumnDefList(&b, s.Columns, 0, totalItems)
	if len(s.Constraints) > 0 {
		b.WriteString("\n") // blank line separates columns from constraints
		f.writeTableConstraintList(&b, s.Constraints, itemIdx, totalItems)
	}

	b.WriteString(");")
	return b.String()
}

func (f *formatter) formatAlterTable(s *parser.AlterTableStmt) string {
	ind := f.indent()
	var b strings.Builder
	b.WriteString(f.kw("alter table "))
	b.WriteString(f.ident(s.Name))
	b.WriteString("\n")
	b.WriteString(ind)

	switch s.Action.Type {
	case parser.AlterAddColumn:
		b.WriteString(f.kw("add column "))
		f.writeColumnDef(&b, *s.Action.Column)
	case parser.AlterDropColumn:
		b.WriteString(f.kw("drop column "))
		b.WriteString(f.ident(s.Action.ColumnName))
	case parser.AlterAddConstraint:
		b.WriteString(f.kw("add "))
		f.writeTableConstraint(&b, *s.Action.Constraint)
	case parser.AlterDropConstraint:
		b.WriteString(f.kw("drop constraint "))
		b.WriteString(f.ident(s.Action.ConstraintName))
	case parser.AlterRenameTable:
		b.WriteString(f.kw("rename to "))
		b.WriteString(f.ident(s.Action.NewName))
	case parser.AlterRenameColumn:
		b.WriteString(f.kw("rename column "))
		b.WriteString(f.ident(s.Action.ColumnName))
		b.WriteString(" " + f.kw("to") + " ")
		b.WriteString(f.ident(s.Action.NewName))
	}

	b.WriteString(";")
	return b.String()
}
