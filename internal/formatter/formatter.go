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

	var b strings.Builder
	for _, stmt := range result.Statements {
		formatStatement(&b, stmt)
	}
	return b.String(), nil
}

func formatStatement(b *strings.Builder, stmt parser.Statement) {
	switch s := stmt.(type) {
	case *parser.CreateTableStmt:
		formatCreateTable(b, s)
	}
}

func formatCreateTable(b *strings.Builder, s *parser.CreateTableStmt) {
	b.WriteString("CREATE TABLE ")
	b.WriteString(s.Name)
	b.WriteString(" (\n")

	for i, col := range s.Columns {
		b.WriteString("    ")
		b.WriteString(col.Name)
		b.WriteString(" ")
		b.WriteString(col.DataType)
		if i < len(s.Columns)-1 {
			b.WriteString(",")
		}
		b.WriteString("\n")
	}

	b.WriteString(");\n")
}
