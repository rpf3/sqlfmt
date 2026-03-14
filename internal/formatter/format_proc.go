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
		itemIdx := f.writeColumnDefList(&b, s.Columns, 0, totalItems)
		if len(s.Constraints) > 0 {
			b.WriteString("\n")
			f.writeTableConstraintList(&b, s.Constraints, itemIdx, totalItems)
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
	var b strings.Builder

	// Table variable — single var with a column list.
	if len(s.Vars) == 1 && len(s.Vars[0].Columns) > 0 {
		v := s.Vars[0]
		b.WriteString(f.kw("declare "))
		b.WriteString(v.Name)
		b.WriteString(" " + f.kw("table"))
		b.WriteString("\n(\n")
		f.writeColumnDefList(&b, v.Columns, 0, len(v.Columns))
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

// writeBodyStmts writes a slice of body statements into b with blank-line
// separation between them, each indented by one level via indentBodyStmt.
func (f *formatter) writeBodyStmts(b *strings.Builder, stmts []parser.Statement) {
	for i, stmt := range stmts {
		if i > 0 {
			b.WriteString("\n")
		}
		b.WriteString("\n")
		b.WriteString(f.indentBodyStmt(stmt))
	}
}

// formatIf formats an IF [ELSE] statement. Both branches are always emitted
// as BEGIN...END blocks regardless of how the source was written, for
// consistency with the rest of the codebase's proc-body style.
func (f *formatter) formatIf(s *parser.IfStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("if ") + s.Condition)
	b.WriteString("\n" + f.kw("begin"))
	f.writeBodyStmts(&b, s.Then)
	if len(s.Else) == 0 {
		b.WriteString("\n" + f.kw("end") + ";")
	} else {
		b.WriteString("\n" + f.kw("end"))
		b.WriteString("\n" + f.kw("else"))
		b.WriteString("\n" + f.kw("begin"))
		f.writeBodyStmts(&b, s.Else)
		b.WriteString("\n" + f.kw("end") + ";")
	}
	return b.String()
}

