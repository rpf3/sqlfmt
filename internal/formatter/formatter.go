package formatter

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

// Format takes raw SQL and returns formatted SQL using cfg to control style.
// It returns an error if the input cannot be parsed.
func Format(input string, cfg config.Config) (string, error) {
	result := parser.Parse(input)
	if len(result.Errors) > 0 {
		return "", result.Errors[0]
	}

	f := &formatter{cfg: cfg}
	var parts []string
	for _, stmt := range result.Statements {
		parts = append(parts, f.formatStatement(stmt))
	}
	return strings.Join(parts, "\n\n") + "\n", nil
}

// formatter holds configuration and provides all formatting methods.
type formatter struct {
	cfg config.Config
}

// kw transforms a canonical lowercase keyword phrase according to cfg.KeywordCase.
func (f *formatter) kw(s string) string {
	if f.cfg.KeywordCase == config.KeywordUpper {
		return strings.ToUpper(s)
	}
	return s
}

// indent returns the configured indentation string (tab or spaces).
func (f *formatter) indent() string {
	if f.cfg.IndentStyle == config.IndentSpaces {
		return strings.Repeat(" ", f.cfg.IndentWidth)
	}
	return "\t"
}

func (f *formatter) formatStatement(stmt parser.Statement) string {
	switch s := stmt.(type) {
	case *parser.CreateTableStmt:
		return f.formatCreateTable(s)
	case *parser.CreateIndexStmt:
		return f.formatCreateIndex(s)
	case *parser.AlterTableStmt:
		return f.formatAlterTable(s)
	case *parser.DropStmt:
		return f.formatDrop(s)
	case *parser.SelectStmt:
		return f.formatSelectStmt(s)
	}
	return ""
}

// writeCommaList writes a list of pre-formatted items to b using the configured
// comma style. Each item is placed on its own line with one level of indentation.
func (f *formatter) writeCommaList(b *strings.Builder, items []string) {
	ind := f.indent()
	for i, item := range items {
		b.WriteString("\n")
		if f.cfg.CommaStyle == config.CommaTrailing {
			b.WriteString(ind)
			b.WriteString(item)
			if i < len(items)-1 {
				b.WriteString(",")
			}
		} else {
			// leading comma
			if i == 0 {
				b.WriteString(ind)
			} else {
				b.WriteString("," + ind)
			}
			b.WriteString(item)
		}
	}
}

func (f *formatter) formatSelectStmt(s *parser.SelectStmt) string {
	ind := f.indent()
	var b strings.Builder

	// SELECT [DISTINCT]
	if s.Distinct {
		b.WriteString(f.kw("select distinct"))
	} else {
		b.WriteString(f.kw("select"))
	}

	// SELECT list
	cols := make([]string, 0, len(s.Columns))
	for _, col := range s.Columns {
		c := col.Expr
		if col.Alias != "" {
			c += " " + f.kw("as") + " " + col.Alias
		}
		cols = append(cols, c)
	}
	f.writeCommaList(&b, cols)

	// FROM
	b.WriteString("\n" + f.kw("from"))
	b.WriteString("\n" + ind)
	b.WriteString(s.From.Name)
	if s.From.Alias != "" {
		b.WriteString(" " + f.kw("as") + " " + s.From.Alias)
	}

	// JOINs — added in #41

	// WHERE
	if s.Where != "" {
		b.WriteString("\n" + f.kw("where"))
		b.WriteString("\n" + ind)
		b.WriteString(s.Where)
	}

	// GROUP BY
	if len(s.GroupBy) > 0 {
		b.WriteString("\n" + f.kw("group by"))
		f.writeCommaList(&b, s.GroupBy)
	}

	// HAVING
	if s.Having != "" {
		b.WriteString("\n" + f.kw("having"))
		b.WriteString("\n" + ind)
		b.WriteString(s.Having)
	}

	// ORDER BY
	if len(s.OrderBy) > 0 {
		b.WriteString("\n" + f.kw("order by"))
		orderItems := make([]string, 0, len(s.OrderBy))
		for _, item := range s.OrderBy {
			oi := item.Expr
			switch item.Direction {
			case parser.DirectionDesc:
				oi += " " + f.kw("desc")
			case parser.DirectionAsc:
				oi += " " + f.kw("asc")
			}
			orderItems = append(orderItems, oi)
		}
		f.writeCommaList(&b, orderItems)
	}

	// OFFSET n ROWS
	if s.Offset != "" {
		b.WriteString("\n" + f.kw("offset"))
		b.WriteString("\n" + ind + s.Offset + " " + f.kw("rows"))
	}

	// FETCH NEXT n ROWS ONLY
	if s.Fetch != "" {
		b.WriteString("\n" + f.kw("fetch next"))
		b.WriteString("\n" + ind + s.Fetch + " " + f.kw("rows only"))
	}

	// LIMIT n (non-ANSI; lint rule #35 warns about this)
	if s.Limit != "" {
		b.WriteString("\n" + f.kw("limit"))
		b.WriteString("\n" + ind + s.Limit)
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
