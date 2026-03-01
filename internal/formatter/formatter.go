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
	}
	return ""
}

// normalizeDefaultExpr lowercases the default expression unless it is a
// string literal (single-quoted), which must be preserved verbatim.
func normalizeDefaultExpr(v string) string {
	if len(v) > 0 && v[0] == '\'' {
		return v
	}
	return strings.ToLower(v)
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
		b.WriteString("\n")
	}

	if len(s.Constraints) > 0 {
		b.WriteString("\n") // blank line separates columns from constraints
	}
	for _, tc := range s.Constraints {
		b.WriteString(",\t")
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
		case parser.ConstraintCheck:
			b.WriteString("check (")
			b.WriteString(tc.Check)
			b.WriteString(")")
		}
		b.WriteString("\n")
	}

	b.WriteString(");")
	return b.String()
}
