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
	var b strings.Builder
	b.WriteString(f.kw("truncate table "))
	b.WriteString(f.ident(s.Name))
	if s.Partitions != "" {
		b.WriteString("\n")
		b.WriteString(f.indent())
		b.WriteString(f.kw("with "))
		b.WriteString(s.Partitions)
	}
	b.WriteString(";")
	return b.String()
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
	case parser.DropTrigger:
		b.WriteString(f.kw("trigger "))
	case parser.DropSequence:
		b.WriteString(f.kw("sequence "))
	}
	if s.IfExists {
		b.WriteString(f.kw("if exists "))
	}
	b.WriteString(f.ident(s.Name))
	b.WriteString(";")
	return b.String()
}

func (f *formatter) formatCreateSequence(s *parser.CreateSequenceStmt) string {
	ind := f.indent()
	var b strings.Builder
	b.WriteString(f.kw("create sequence "))
	b.WriteString(f.ident(s.Name))
	if s.DataType != "" {
		b.WriteString("\n" + ind + f.kw("as ") + f.kw(strings.ToLower(s.DataType)))
	}
	if s.Start != "" {
		b.WriteString("\n" + ind + f.kw("start with ") + s.Start)
	}
	if s.Increment != "" {
		b.WriteString("\n" + ind + f.kw("increment by ") + s.Increment)
	}
	if s.MinValue != "" {
		b.WriteString("\n" + ind + f.kw("minvalue ") + s.MinValue)
	} else if s.NoMinValue {
		b.WriteString("\n" + ind + f.kw("no minvalue"))
	}
	if s.MaxValue != "" {
		b.WriteString("\n" + ind + f.kw("maxvalue ") + s.MaxValue)
	} else if s.NoMaxValue {
		b.WriteString("\n" + ind + f.kw("no maxvalue"))
	}
	if s.Cycle {
		b.WriteString("\n" + ind + f.kw("cycle"))
	} else if s.NoCycle {
		b.WriteString("\n" + ind + f.kw("no cycle"))
	}
	if s.Cache != "" {
		b.WriteString("\n" + ind + f.kw("cache ") + s.Cache)
	} else if s.NoCache {
		b.WriteString("\n" + ind + f.kw("no cache"))
	}
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
	switch s.Clustering {
	case parser.IndexClusteringClustered:
		b.WriteString(f.kw("clustered "))
	case parser.IndexClusteringNonclustered:
		b.WriteString(f.kw("nonclustered "))
	case parser.IndexClusteringDefault:
		// no clustering keyword
	}
	b.WriteString(f.kw("index "))
	if s.IfNotExists {
		b.WriteString(f.kw("if not exists "))
	}
	b.WriteString(f.ident(s.Name))
	b.WriteString("\n" + ind + f.kw("on ") + f.ident(s.Table) + " (")
	var colParts []string
	for _, col := range s.Columns {
		part := f.ident(col.Name)
		switch col.Direction {
		case parser.DirectionAsc:
			part += " " + f.kw("asc")
		case parser.DirectionDesc:
			part += " " + f.kw("desc")
		case parser.DirectionNone:
			// no direction keyword
		}
		colParts = append(colParts, part)
	}
	b.WriteString(strings.Join(colParts, ", "))
	b.WriteString(")")
	if len(s.Include) > 0 {
		if len(s.Include) == 1 {
			b.WriteString("\n" + ind + f.kw("include") + " (" + f.ident(s.Include[0]) + ")")
		} else {
			b.WriteString("\n" + ind + f.kw("include"))
			b.WriteString("\n" + ind + "(")
			b.WriteString("\n" + ind + ind + f.ident(s.Include[0]))
			for _, col := range s.Include[1:] {
				b.WriteString("\n" + ind + "," + ind + f.ident(col))
			}
			b.WriteString("\n" + ind + ")")
		}
	}
	if s.Where != "" {
		b.WriteString("\n" + ind + f.kw("where") + " " + s.Where)
	}
	if s.WithOptions != "" {
		b.WriteString("\n" + ind + f.kw("with") + " " + strings.ToLower(s.WithOptions))
	}
	b.WriteString(";")
	return b.String()
}

// normalizeDefaultExpr normalises the default expression according to keyword
// case, unless it is a string literal (single-quoted), which is preserved verbatim.
func (f *formatter) normalizeDefaultExpr(v string) string {
	if v != "" && v[0] == '\'' {
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
	case parser.RefActionNone:
		return ""
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

	// Computed column: <name> as <expr> [persisted] [not null|null]
	if col.Computed {
		b.WriteString(" " + f.kw("as") + " ")
		b.WriteString(parser.Render(col.ComputedExpr))
		if col.Persisted {
			b.WriteString(" " + f.kw("persisted"))
		}
		switch col.Nullability {
		case parser.NullabilityNotNull:
			b.WriteString(" " + f.kw("not null"))
		case parser.NullabilityNull:
			b.WriteString(" " + f.kw("null"))
		case parser.NullabilityNone:
			// no nullability keyword
		}
		return
	}

	b.WriteString(" ")
	b.WriteString(f.kw(strings.ToLower(col.DataType)))
	if col.Collate != "" {
		b.WriteString(" " + f.kw("collate") + " " + col.Collate)
	}
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
	case parser.NullabilityNone:
		// no nullability keyword
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
	case parser.AlterAlterColumn:
		b.WriteString(f.kw("alter column "))
		f.writeColumnDef(&b, *s.Action.Column)
	case parser.AlterEnableConstraint:
		b.WriteString(f.kw("enable constraint "))
		if s.Action.ConstraintName == "all" {
			b.WriteString(f.kw("all"))
		} else {
			b.WriteString(f.ident(s.Action.ConstraintName))
		}
	case parser.AlterDisableConstraint:
		b.WriteString(f.kw("disable constraint "))
		if s.Action.ConstraintName == "all" {
			b.WriteString(f.kw("all"))
		} else {
			b.WriteString(f.ident(s.Action.ConstraintName))
		}
	case parser.AlterCheckConstraint:
		b.WriteString(f.kw("check constraint "))
		if s.Action.ConstraintName == "all" {
			b.WriteString(f.kw("all"))
		} else {
			b.WriteString(f.ident(s.Action.ConstraintName))
		}
	case parser.AlterNocheckConstraint:
		b.WriteString(f.kw("nocheck constraint "))
		if s.Action.ConstraintName == "all" {
			b.WriteString(f.kw("all"))
		} else {
			b.WriteString(f.ident(s.Action.ConstraintName))
		}
	}

	b.WriteString(";")
	return b.String()
}

// formatAlterIndex formats an ALTER INDEX statement.
func (f *formatter) formatAlterIndex(s *parser.AlterIndexStmt) string {
	ind := f.indent()
	var b strings.Builder
	b.WriteString(f.kw("alter index") + " ")
	if s.All {
		b.WriteString(f.kw("all"))
	} else {
		b.WriteString(f.ident(s.Name))
	}
	var action string
	switch s.Action {
	case parser.AlterIndexRebuild:
		action = f.kw("rebuild")
	case parser.AlterIndexReorganize:
		action = f.kw("reorganize")
	case parser.AlterIndexDisable:
		action = f.kw("disable")
	}
	b.WriteString("\n" + ind + f.kw("on") + " " + f.ident(s.Table) + " " + action)
	if s.WithOptions != "" {
		b.WriteString("\n" + ind + f.kw("with") + " " + strings.ToLower(s.WithOptions))
	}
	b.WriteString(";")
	return b.String()
}

func (f *formatter) formatCreateTrigger(s *parser.CreateTriggerStmt) string {
	var b strings.Builder
	kw := "create trigger "
	if s.IsAlter {
		kw = "alter trigger "
	}
	b.WriteString(f.kw(kw) + f.ident(s.Name))
	b.WriteString("\n" + f.kw("on") + " " + f.ident(s.Table))

	switch s.Timing {
	case parser.TriggerTimingAfter:
		b.WriteString("\n" + f.kw("after"))
	case parser.TriggerTimingInstead:
		b.WriteString("\n" + f.kw("instead of"))
	}

	events := make([]string, len(s.Events))
	for i, ev := range s.Events {
		switch ev {
		case parser.TriggerEventInsert:
			events[i] = f.kw("insert")
		case parser.TriggerEventUpdate:
			events[i] = f.kw("update")
		case parser.TriggerEventDelete:
			events[i] = f.kw("delete")
		}
	}
	b.WriteString(" " + strings.Join(events, ", "))

	b.WriteString("\n" + f.kw("as") + " " + f.kw("begin"))
	for i, stmt := range s.Body {
		if i > 0 {
			b.WriteString("\n")
		}
		b.WriteString("\n")
		b.WriteString(f.indentBodyStmt(stmt))
	}
	b.WriteString("\n" + f.kw("end") + ";")
	return b.String()
}

func (f *formatter) formatTriggerToggle(s *parser.TriggerToggleStmt) string {
	var b strings.Builder
	if s.Enable {
		b.WriteString(f.kw("enable trigger "))
	} else {
		b.WriteString(f.kw("disable trigger "))
	}
	if s.Name == "all" {
		b.WriteString(f.kw("all"))
	} else {
		b.WriteString(f.ident(s.Name))
	}
	b.WriteString(" " + f.kw("on") + " ")
	if s.Scope == "database" {
		b.WriteString(f.kw("database"))
	} else {
		b.WriteString(f.ident(s.Scope))
	}
	b.WriteString(";")
	return b.String()
}
