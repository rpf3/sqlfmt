package formatter

import (
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

// writeProcParamList renders a parenthesised, comma-separated parameter list
// into b. It is shared by formatCreateProc and formatCreateFunc.
func (f *formatter) writeProcParamList(b *strings.Builder, params []parser.ProcParam) {
	if len(params) == 0 {
		return
	}
	rendered := make([]string, 0, len(params))
	for _, p := range params {
		var pb strings.Builder
		pb.WriteString(p.Name)
		pb.WriteString(" " + f.kw(strings.ToLower(p.DataType)))
		if p.Default != nil {
			pb.WriteString(" = " + parser.Render(p.Default))
		}
		if p.Direction == parser.ParamDirectionOut {
			pb.WriteString(" " + f.kw("output"))
		}
		rendered = append(rendered, pb.String())
	}
	b.WriteString("\n(")
	f.writeCommaList(b, rendered)
	b.WriteString("\n)")
}

func (f *formatter) formatCreateProc(s *parser.CreateProcStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("create procedure "))
	b.WriteString(f.ident(s.Name))
	f.writeProcParamList(&b, s.Params)

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

func (f *formatter) formatCreateFunc(s *parser.CreateFuncStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("create function "))
	b.WriteString(f.ident(s.Name))

	f.writeProcParamList(&b, s.Params)

	switch s.Kind {
	case parser.CreateFuncScalar:
		b.WriteString("\n" + f.kw("returns") + " " + f.kw(strings.ToLower(s.ReturnsType)))
		b.WriteString("\n" + f.kw("as") + " " + f.kw("begin"))
		for i, stmt := range s.Body {
			if i > 0 {
				b.WriteString("\n")
			}
			b.WriteString("\n")
			b.WriteString(f.indentBodyStmt(stmt))
		}
		b.WriteString("\n" + f.kw("end"))

	case parser.CreateFuncInlineTable:
		b.WriteString("\n" + f.kw("returns table"))
		b.WriteString("\n" + f.kw("as") + " " + f.kw("return"))
		b.WriteString("\n(")
		b.WriteString("\n" + f.indentCTE(s.InlineSelect))
		b.WriteString("\n)")

	case parser.CreateFuncMultiTable:
		b.WriteString("\n" + f.kw("returns") + " " + s.ReturnsVar + " " + f.kw("table"))
		b.WriteString("\n(")
		ind := f.indent()
		totalItems := len(s.ReturnsTable)
		for i, col := range s.ReturnsTable {
			if f.cfg.CommaStyle == config.CommaTrailing {
				b.WriteString("\n" + ind)
				f.writeColumnDef(&b, col)
				if i < totalItems-1 {
					b.WriteString(",")
				}
			} else {
				if i == 0 {
					b.WriteString("\n" + ind)
				} else {
					b.WriteString("\n," + ind)
				}
				f.writeColumnDef(&b, col)
			}
		}
		b.WriteString("\n)")
		b.WriteString("\n" + f.kw("as") + " " + f.kw("begin"))
		for i, stmt := range s.Body {
			if i > 0 {
				b.WriteString("\n")
			}
			b.WriteString("\n")
			b.WriteString(f.indentBodyStmt(stmt))
		}
		b.WriteString("\n" + f.kw("end"))
	}

	b.WriteString(";")
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

// formatSet formats a SET statement.
func (f *formatter) formatSet(s *parser.SetStmt) string {
	var b strings.Builder
	switch s.Kind {
	case parser.SetTransactionIsolation:
		b.WriteString(f.kw("set transaction isolation level "))
		b.WriteString(strings.ToLower(s.IsolationLevel))
		b.WriteString(";")
	case parser.SetIdentityInsert:
		b.WriteString(f.kw("set identity_insert "))
		b.WriteString(s.Table)
		b.WriteString(" ")
		if s.Enabled {
			b.WriteString(f.kw("on"))
		} else {
			b.WriteString(f.kw("off"))
		}
		b.WriteString(";")
	default: // SetSimple
		b.WriteString(f.kw("set "))
		b.WriteString(strings.ToLower(s.Option))
		b.WriteString(" ")
		b.WriteString(strings.ToLower(s.Value))
		b.WriteString(";")
	}
	return b.String()
}

func (f *formatter) formatDeclare(s *parser.DeclareStmt) string {
	ind := f.indent()
	var b strings.Builder

	// Table variable — single var with a column list.
	if len(s.Vars) == 1 && len(s.Vars[0].Columns) > 0 {
		v := s.Vars[0]
		b.WriteString(f.kw("declare "))
		b.WriteString(v.Name)
		b.WriteString(" " + f.kw("table"))
		b.WriteString("\n(\n")
		cols := v.Columns
		for i, col := range cols {
			if f.cfg.CommaStyle == config.CommaTrailing {
				b.WriteString(ind)
				f.writeColumnDef(&b, col)
				if i < len(cols)-1 {
					b.WriteString(",")
				}
			} else {
				if i == 0 {
					b.WriteString(ind)
				} else {
					b.WriteString("," + ind)
				}
				f.writeColumnDef(&b, col)
			}
			b.WriteString("\n")
		}
		b.WriteString(");")
		return b.String()
	}

	// Single scalar variable — keep on one line.
	if len(s.Vars) == 1 {
		v := s.Vars[0]
		b.WriteString(f.kw("declare "))
		b.WriteString(v.Name)
		b.WriteString(" ")
		b.WriteString(strings.ToLower(v.Type))
		if v.Default != nil {
			b.WriteString(" = ")
			b.WriteString(parser.Render(v.Default))
		}
		b.WriteString(";")
		return b.String()
	}

	// Multiple scalar variables — one per line via comma list.
	b.WriteString(f.kw("declare"))
	items := make([]string, len(s.Vars))
	for i, v := range s.Vars {
		item := v.Name + " " + strings.ToLower(v.Type)
		if v.Default != nil {
			item += " = " + parser.Render(v.Default)
		}
		items[i] = item
	}
	f.writeCommaList(&b, items)
	b.WriteString(";")
	return b.String()
}
