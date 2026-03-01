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
		b.WriteString("\n")
	}

	b.WriteString(");")
	return b.String()
}
