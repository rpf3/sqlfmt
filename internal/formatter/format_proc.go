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
	if s.IsAlter {
		b.WriteString(f.kw("alter procedure "))
	} else {
		b.WriteString(f.kw("create procedure "))
	}
	b.WriteString(f.ident(s.Name))
	f.writeProcParamList(&b, s.Params)

	if len(s.WithOptions) == 1 {
		b.WriteString("\n" + f.kw("with") + " " + s.WithOptions[0])
	} else if len(s.WithOptions) > 1 {
		b.WriteString("\n" + f.kw("with"))
		f.writeCommaList(&b, s.WithOptions)
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

func (f *formatter) formatCreateFunc(s *parser.CreateFuncStmt) string {
	var b strings.Builder
	if s.IsAlter {
		b.WriteString(f.kw("alter function "))
	} else {
		b.WriteString(f.kw("create function "))
	}
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
		case parser.NullabilityNone:
			// no nullability keyword
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

// formatSetVar formats a SET @var <op> <expr> statement.
func (f *formatter) formatSetVar(s *parser.SetVarStmt) string {
	return f.kw("set") + " " + s.Var + " " + s.Op + " " + parser.Render(s.Value) + ";"
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

// formatWhile formats a WHILE loop. The body is always emitted as a
// BEGIN...END block for consistency.
func (f *formatter) formatWhile(s *parser.WhileStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("while ") + s.Condition)
	b.WriteString("\n" + f.kw("begin"))
	f.writeBodyStmts(&b, s.Body)
	b.WriteString("\n" + f.kw("end") + ";")
	return b.String()
}

// formatTryCatch formats a TRY/CATCH block. The try and catch bodies are
// emitted as indented statement lists. end try and begin catch appear on
// consecutive lines with no blank line between them — they are structurally
// paired delimiters, not independent statements.
func (f *formatter) formatTryCatch(s *parser.TryCatchStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("begin try"))
	f.writeBodyStmts(&b, s.TryBody)
	b.WriteString("\n" + f.kw("end try"))
	b.WriteString("\n" + f.kw("begin catch"))
	f.writeBodyStmts(&b, s.CatchBody)
	b.WriteString("\n" + f.kw("end catch") + ";")
	return b.String()
}

// formatTransaction formats a transaction control statement.
// Canonical output: "begin transaction [name]", "commit transaction",
// "rollback transaction [name]", "save transaction name".
// TRAN abbreviations and WORK are normalised away.
func (f *formatter) formatTransaction(s *parser.TransactionStmt) string {
	switch s.Kind {
	case parser.TxnBegin:
		if s.Name != "" {
			return f.kw("begin transaction") + " " + s.Name + ";"
		}
		return f.kw("begin transaction") + ";"
	case parser.TxnCommit:
		return f.kw("commit transaction") + ";"
	case parser.TxnRollback:
		if s.Name != "" {
			return f.kw("rollback transaction") + " " + s.Name + ";"
		}
		return f.kw("rollback transaction") + ";"
	case parser.TxnSave:
		return f.kw("save transaction") + " " + s.Name + ";"
	}
	return ""
}

// formatBreak formats a BREAK statement.
func (f *formatter) formatBreak() string { return f.kw("break") + ";" }

// formatContinue formats a CONTINUE statement.
func (f *formatter) formatContinue() string { return f.kw("continue") + ";" }

// formatUse formats a USE statement.
func (f *formatter) formatUse(s *parser.UseStmt) string {
	return f.kw("use") + " " + f.ident(s.Database) + ";"
}

// formatReturn formats a RETURN statement.
// Bare RETURN produces "return;". RETURN with a value produces "return <expr>;".
func (f *formatter) formatReturn(s *parser.ReturnStmt) string {
	if s.Value == nil {
		return f.kw("return") + ";"
	}
	return f.kw("return") + " " + parser.Render(s.Value) + ";"
}

// formatThrow formats a THROW statement. A bare THROW (re-raise) produces
// "throw;". A THROW with arguments produces "throw <n>, '<msg>', <state>;".
func (f *formatter) formatThrow(s *parser.ThrowStmt) string {
	if len(s.Args) == 0 {
		return f.kw("throw") + ";"
	}
	return f.kw("throw") + " " + s.Args[0] + ", " + s.Args[1] + ", " + s.Args[2] + ";"
}

// formatRaiserror formats a RAISERROR statement.
// Produces "raiserror(<msg>, <sev>, <state>);" with an optional
// "with <option>" suffix when a WITH clause was present.
func (f *formatter) formatRaiserror(s *parser.RaiserrorStmt) string {
	out := f.kw("raiserror") + "(" + s.Args[0] + ", " + s.Args[1] + ", " + s.Args[2] + ")"
	if len(s.WithOptions) > 0 {
		out += " " + f.kw("with") + " " + strings.Join(s.WithOptions, ", ")
	}
	return out + ";"
}

// formatPrint formats a PRINT statement.
func (f *formatter) formatPrint(s *parser.PrintStmt) string {
	return f.kw("print") + " " + s.Value + ";"
}

// formatExec formats an EXEC / EXECUTE statement. A single argument stays on
// the same line as the procedure name; multiple arguments are written one per
// line using the configured comma style.
func (f *formatter) formatExec(s *parser.ExecStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("exec"))

	if s.ReturnVar != "" {
		b.WriteString(" " + s.ReturnVar + " =")
	}

	// Dynamic SQL: EXEC (@expr)
	if s.Proc == "" {
		b.WriteString(" " + s.Args[0].Value + ";")
		return b.String()
	}

	b.WriteString(" " + f.ident(s.Proc))

	if len(s.Args) == 0 {
		b.WriteString(";")
		return b.String()
	}

	rendered := make([]string, len(s.Args))
	for i, arg := range s.Args {
		if arg.IsOutput {
			rendered[i] = arg.Value + " " + f.kw("output")
		} else {
			rendered[i] = arg.Value
		}
	}
	if len(rendered) == 1 {
		b.WriteString(" " + rendered[0] + ";")
	} else {
		f.writeCommaList(&b, rendered)
		b.WriteString(";")
	}

	return b.String()
}

// formatExecuteAs formats an EXECUTE AS security-context statement.
// Produces "execute as <context>;" or "exec as <context>;", preserving
// which keyword alias the user wrote. The context keyword (USER, LOGIN,
// CALLER, SELF) has keyword casing applied; any string literal content
// after the keyword is preserved verbatim.
func (f *formatter) formatExecuteAs(s *parser.ExecuteAsStmt) string {
	ctx := s.Context
	if sp := strings.IndexByte(ctx, ' '); sp >= 0 {
		ctx = f.kw(strings.ToLower(ctx[:sp])) + ctx[sp:]
	} else {
		ctx = f.kw(strings.ToLower(ctx))
	}
	return f.kw(s.Keyword) + " " + f.kw("as") + " " + ctx + ";"
}

// formatRevert formats a REVERT statement.
func (f *formatter) formatRevert() string {
	return f.kw("revert") + ";"
}

// formatDeclareCursor formats a DECLARE CURSOR statement.
//
// Canonical output:
//
//	declare <name> [insensitive] cursor
//	    [local|global]
//	    [forward_only|scroll]
//	    [static|keyset|dynamic|fast_forward]
//	    [read_only|scroll_locks|optimistic]
//	    [type_warning]
//	for
//	<select>;
//	[for update [of col, ...];]
func (f *formatter) formatDeclareCursor(s *parser.DeclareCursorStmt) string {
	ind := f.indent()
	var b strings.Builder

	b.WriteString(f.kw("declare") + " " + f.ident(s.Name))
	if s.Insensitive {
		b.WriteString(" " + f.kw("insensitive"))
	}
	b.WriteString(" " + f.kw("cursor"))

	if s.Scope != "" {
		b.WriteString("\n" + ind + f.kw(strings.ToLower(s.Scope)))
	}
	if s.ScrollMode != "" {
		b.WriteString("\n" + ind + f.kw(strings.ToLower(s.ScrollMode)))
	}
	if s.CursorType != "" {
		b.WriteString("\n" + ind + f.kw(strings.ToLower(s.CursorType)))
	}
	if s.Locking != "" {
		b.WriteString("\n" + ind + f.kw(strings.ToLower(s.Locking)))
	}
	if s.TypeWarning {
		b.WriteString("\n" + ind + f.kw("type_warning"))
	}

	b.WriteString("\n" + f.kw("for"))
	selectSQL := f.formatSelectStmt(s.Select)
	b.WriteString("\n" + strings.TrimSuffix(selectSQL, ";"))

	if s.ForUpdate {
		b.WriteString("\n" + f.kw("for") + " " + f.kw("update"))
		if len(s.UpdateCols) > 0 {
			b.WriteString(" " + f.kw("of"))
			f.writeCommaList(&b, s.UpdateCols)
		}
	}

	b.WriteString(";")
	return b.String()
}

// formatOpenCursor formats an OPEN <cursor_name> statement.
func (f *formatter) formatOpenCursor(s *parser.OpenCursorStmt) string {
	return f.kw("open") + " " + f.ident(s.Name) + ";"
}

// formatCloseCursor formats a CLOSE <cursor_name> statement.
func (f *formatter) formatCloseCursor(s *parser.CloseCursorStmt) string {
	return f.kw("close") + " " + f.ident(s.Name) + ";"
}

// formatDeallocateCursor formats a DEALLOCATE <cursor_name> statement.
func (f *formatter) formatDeallocateCursor(s *parser.DeallocateCursorStmt) string {
	return f.kw("deallocate") + " " + f.ident(s.Name) + ";"
}

// formatFetchCursor formats a FETCH CURSOR statement.
//
//	fetch next from vend_cursor;
//	fetch absolute 5 from vend_cursor into
//		@vendor_id,
//		@vendor_name;
func (f *formatter) formatFetchCursor(s *parser.FetchCursorStmt) string {
	var b strings.Builder
	b.WriteString(f.kw("fetch") + " " + f.kw(strings.ToLower(s.Direction)))
	if s.Offset != "" {
		b.WriteString(" " + s.Offset)
	}
	b.WriteString(" " + f.kw("from") + " " + f.ident(s.Name))
	if len(s.Into) > 0 {
		b.WriteString(" " + f.kw("into"))
		f.writeCommaList(&b, s.Into)
	}
	b.WriteString(";")
	return b.String()
}
