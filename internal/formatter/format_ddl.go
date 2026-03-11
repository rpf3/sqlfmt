package formatter

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

func (f *formatter) formatInsert(s *parser.InsertStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("insert into "))
	b.WriteString(f.ident(s.Table))

	// Optional column list: vertical block, same comma style as SELECT columns.
	if len(s.Columns) > 0 {
		b.WriteString("\n(")
		f.writeCommaList(&b, s.Columns)
		b.WriteString("\n)")
	}

	if s.Select != nil {
		b.WriteString("\n")
		b.WriteString(f.formatSelectStmt(s.Select))
		return b.String() // formatSelectStmt supplies the trailing ";"
	}

	// VALUES form — each row is a vertical block; rows separated by trailing ","
	b.WriteString("\n")
	b.WriteString(f.kw("values"))
	for i, row := range s.Values {
		b.WriteString("\n(")
		rowStrs := make([]string, len(row))
		for j, v := range row {
			rowStrs[j] = parser.Render(v)
		}
		f.writeCommaList(&b, rowStrs)
		b.WriteString("\n)")
		if i < len(s.Values)-1 {
			b.WriteString(",") // structural row separator, not a list comma
		}
	}
	b.WriteString(";")
	return b.String()
}

func (f *formatter) formatUpdate(s *parser.UpdateStmt) string {
	ind := f.indent()
	var b strings.Builder
	b.WriteString(f.kw("update"))
	b.WriteString("\n")
	b.WriteString(ind)
	b.WriteString(f.ident(s.Target))

	b.WriteString("\n")
	b.WriteString(f.kw("set"))

	setStrs := make([]string, len(s.Sets))
	for i, set := range s.Sets {
		setStrs[i] = set.Column + " = " + parser.Render(set.Value)
	}
	f.writeCommaList(&b, setStrs)

	if s.From != nil {
		b.WriteString("\n")
		b.WriteString(f.kw("from"))
		b.WriteString("\n")
		b.WriteString(ind)
		b.WriteString(f.ident(s.From.Name))
		if s.From.Alias != "" {
			b.WriteString(f.kw(" as "))
			b.WriteString(f.ident(s.From.Alias))
		}
		for _, jc := range s.From.Joins {
			b.WriteString("\n" + f.kw(joinKeyword(jc.Type)))
			b.WriteString("\n" + ind + f.ident(jc.Name))
			if jc.Alias != "" {
				b.WriteString(" " + f.kw("as") + " " + f.ident(jc.Alias))
			}
			if jc.On != nil {
				terms := parser.AndTerms(jc.On)
				b.WriteString("\n" + ind + ind + f.kw("on") + " " + parser.Render(terms[0]))
				for _, term := range terms[1:] {
					b.WriteString("\n" + ind + ind + f.kw("and") + " " + parser.Render(term))
				}
			}
		}
	}

	if s.Where != nil {
		b.WriteString("\n" + f.kw("where"))
		f.writeExprPred(&b, s.Where)
	}
	b.WriteString(";")
	return b.String()
}

func (f *formatter) formatDelete(s *parser.DeleteStmt) string {
	ind := f.indent()
	var b strings.Builder
	if s.Alias != "" {
		// Multi-line form: DELETE <alias> FROM <table> AS <alias>
		b.WriteString(f.kw("delete"))
		b.WriteString("\n")
		b.WriteString(ind)
		b.WriteString(f.ident(s.Alias))
		b.WriteString("\n")
		b.WriteString(f.kw("from"))
		b.WriteString("\n")
		b.WriteString(ind)
		b.WriteString(f.ident(s.Table))
		b.WriteString(f.kw(" as "))
		b.WriteString(f.ident(s.Alias))
	} else if s.Where != nil {
		// No alias but WHERE present: table on its own line for readability
		b.WriteString(f.kw("delete from"))
		b.WriteString("\n")
		b.WriteString(ind)
		b.WriteString(f.ident(s.Table))
	} else {
		// No alias, no WHERE: compact single line
		b.WriteString(f.kw("delete from "))
		b.WriteString(f.ident(s.Table))
	}
	if s.Where != nil {
		b.WriteString("\n" + f.kw("where"))
		f.writeExprPred(&b, s.Where)
	}
	b.WriteString(";")
	return b.String()
}

func (f *formatter) formatCreateView(s *parser.CreateViewStmt) string {
	return f.kw("create view ") + f.ident(s.Name) + f.kw(" as") + "\n" + f.formatSelectStmt(s.Select)
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

// writeColumnDef writes the canonical form of a column definition to b.
// It does not include any leading indentation or comma — the caller handles that.
func (f *formatter) writeColumnDef(b *strings.Builder, col parser.ColumnDef) {
	ind := f.indent()
	b.WriteString(f.ident(col.Name))
	b.WriteString(" ")
	b.WriteString(f.kw(strings.ToLower(col.DataType)))
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

func (f *formatter) formatCreateTable(s *parser.CreateTableStmt) string {
	ind := f.indent()
	var b strings.Builder
	b.WriteString(f.kw("create table "))
	b.WriteString(f.ident(s.Name))
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

func (f *formatter) formatMerge(s *parser.MergeStmt) string {
	ind := f.indent()
	var b strings.Builder

	// merge into <target> [as <alias>]
	b.WriteString(f.kw("merge into ") + f.ident(s.Target))
	if s.TargetAlias != "" {
		b.WriteString(f.kw(" as ") + f.ident(s.TargetAlias))
	}

	// using <source> [as <alias>]
	if s.Source.Subquery != nil {
		// Subquery: "using" appended to target line; paren block at root level
		// with single-indented body (same depth as a CTE body).
		b.WriteString(" " + f.kw("using"))
		b.WriteString("\n(")
		b.WriteString("\n" + f.indentCTE(s.Source.Subquery))
		b.WriteString("\n)")
		if s.Source.Alias != "" {
			b.WriteString(f.kw(" as ") + f.ident(s.Source.Alias))
		}
	} else {
		b.WriteString("\n" + f.kw("using ") + f.ident(s.Source.Name))
		if s.Source.Alias != "" {
			b.WriteString(f.kw(" as ") + f.ident(s.Source.Alias))
		}
	}

	// on condition — always wrapped in a paren block for readability
	b.WriteString("\n" + f.kw("on"))
	b.WriteString("\n(")
	b.WriteString("\n" + ind + parser.Render(s.On))
	b.WriteString("\n)")

	for _, clause := range s.Clauses {
		b.WriteString("\n")
		switch clause.MatchType {
		case parser.MergeMatched:
			b.WriteString(f.kw("when matched"))
		case parser.MergeNotMatchedByTarget:
			b.WriteString(f.kw("when not matched"))
		case parser.MergeNotMatchedBySource:
			b.WriteString(f.kw("when not matched by source"))
		}

		if clause.Condition != nil {
			// AND condition in a paren block; "then" on its own line.
			b.WriteString(f.kw(" and"))
			b.WriteString("\n(")
			b.WriteString("\n" + ind + parser.Render(clause.Condition))
			b.WriteString("\n)")
			b.WriteString("\n" + f.kw("then"))
		} else {
			b.WriteString(f.kw(" then"))
		}

		switch clause.Action {
		case parser.MergeActionDelete:
			b.WriteString(f.kw(" delete"))

		case parser.MergeActionUpdate:
			b.WriteString(f.kw(" update set"))
			for i, set := range clause.Sets {
				item := set.Column + " = " + parser.Render(set.Value)
				if i == 0 {
					b.WriteString("\n" + ind + item)
				} else {
					b.WriteString("\n,\t" + item)
				}
			}

		case parser.MergeActionInsert:
			b.WriteString(f.kw(" insert"))
			if len(clause.Columns) > 0 {
				b.WriteString("\n(")
				for i, col := range clause.Columns {
					if i == 0 {
						b.WriteString("\n" + ind + col)
					} else {
						b.WriteString("\n,\t" + col)
					}
				}
				b.WriteString("\n)")
			}
			b.WriteString("\n" + f.kw("values"))
			b.WriteString("\n(")
			for i, val := range clause.Values {
				if i == 0 {
					b.WriteString("\n" + ind + parser.Render(val))
				} else {
					b.WriteString("\n,\t" + parser.Render(val))
				}
			}
			b.WriteString("\n)")
		}
	}

	b.WriteString(";")
	return b.String()
}

func (f *formatter) formatCreateProc(s *parser.CreateProcStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("create procedure "))
	b.WriteString(f.ident(s.Name))

	// Parameter list — wrapped in ( ), one per line, same comma style as columns.
	if len(s.Params) > 0 {
		params := make([]string, 0, len(s.Params))
		for _, p := range s.Params {
			var pb strings.Builder
			pb.WriteString(p.Name)
			pb.WriteString(" " + f.kw(strings.ToLower(p.DataType)))
			if p.Default != nil {
				pb.WriteString(" = " + parser.Render(p.Default))
			}
			if p.Direction == parser.ParamDirectionOut {
				pb.WriteString(" " + f.kw("output"))
			}
			params = append(params, pb.String())
		}
		b.WriteString("\n(")
		f.writeCommaList(&b, params)
		b.WriteString("\n)")
	}

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

func (f *formatter) formatCreateType(s *parser.CreateTypeStmt) string {
	ind := f.indent()
	var b strings.Builder
	b.WriteString(f.kw("create type "))
	b.WriteString(f.ident(s.Name))

	switch s.Kind {
	case parser.CreateTypeAlias:
		b.WriteString("\n" + ind + f.kw("from") + " ")
		b.WriteString(f.kw(strings.ToLower(s.BaseType)))
		switch s.Nullability {
		case parser.NullabilityNotNull:
			b.WriteString(" " + f.kw("not null"))
		case parser.NullabilityNull:
			b.WriteString(" " + f.kw("null"))
		}

	case parser.CreateTypeTable:
		b.WriteString(" " + f.kw("as table"))
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
			b.WriteString("\n")
		}
		for _, tc := range s.Constraints {
			if f.cfg.CommaStyle == config.CommaTrailing {
				b.WriteString(ind)
				f.writeTableConstraint(&b, tc)
				if itemIdx < totalItems-1 {
					b.WriteString(",")
				}
			} else {
				b.WriteString("," + ind)
				f.writeTableConstraint(&b, tc)
			}
			b.WriteString("\n")
			itemIdx++
		}

		b.WriteString(")")
	}

	b.WriteString(";")
	return b.String()
}

// formatSet formats a SET statement as a single line: set <option> <value>;
func (f *formatter) formatSet(s *parser.SetStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("set "))
	b.WriteString(strings.ToLower(s.Option))
	b.WriteString(" ")
	b.WriteString(strings.ToLower(s.Value))
	b.WriteString(";")
	return b.String()
}
