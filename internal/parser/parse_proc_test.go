package parser

import "testing"

// ─── parseDeclare tests ───────────────────────────────────────────────────────

func mustParseDeclare(t *testing.T, sql string) *DeclareStmt {
	t.Helper()
	result := Parse(sql)
	if len(result.Errors) > 0 {
		t.Fatalf("Parse(%q): unexpected errors: %v", sql, result.Errors)
	}
	if len(result.Statements) != 1 {
		t.Fatalf("Parse(%q): expected 1 statement, got %d", sql, len(result.Statements))
	}
	stmt, ok := result.Statements[0].(*DeclareStmt)
	if !ok {
		t.Fatalf("Parse(%q): expected *DeclareStmt, got %T", sql, result.Statements[0])
	}
	return stmt
}

func TestParseDeclare(t *testing.T) {
	// ── Scalar variables ──────────────────────────────────────────────────────

	t.Run("single scalar no default", func(t *testing.T) {
		stmt := mustParseDeclare(t, "declare @count int;")
		if len(stmt.Vars) != 1 {
			t.Fatalf("Vars: got %d, want 1", len(stmt.Vars))
		}
		v := stmt.Vars[0]
		if v.Name != "@count" {
			t.Errorf("Vars[0].Name: got %q, want %q", v.Name, "@count")
		}
		if v.Type != "INT" {
			t.Errorf("Vars[0].Type: got %q, want %q", v.Type, "INT")
		}
		if v.Default != nil {
			t.Errorf("Vars[0].Default: got %q, want nil", renderExpr(v.Default))
		}
		if v.Columns != nil {
			t.Errorf("Vars[0].Columns: got %v, want nil", v.Columns)
		}
	})

	t.Run("single scalar with int default", func(t *testing.T) {
		stmt := mustParseDeclare(t, "declare @count int = 0;")
		v := stmt.Vars[0]
		if renderExpr(v.Default) != "0" {
			t.Errorf("Vars[0].Default: got %q, want %q", renderExpr(v.Default), "0")
		}
	})

	t.Run("single scalar with string default", func(t *testing.T) {
		stmt := mustParseDeclare(t, "declare @status varchar(20) = 'active';")
		v := stmt.Vars[0]
		if v.Type != "VARCHAR(20)" {
			t.Errorf("Vars[0].Type: got %q, want %q", v.Type, "VARCHAR(20)")
		}
		if renderExpr(v.Default) != "'active'" {
			t.Errorf("Vars[0].Default: got %q, want %q", renderExpr(v.Default), "'active'")
		}
	})

	t.Run("single scalar with null default", func(t *testing.T) {
		stmt := mustParseDeclare(t, "declare @val int = null;")
		if renderExpr(stmt.Vars[0].Default) != "null" {
			t.Errorf("Vars[0].Default: got %q, want %q", renderExpr(stmt.Vars[0].Default), "null")
		}
	})

	t.Run("single scalar with MAX type", func(t *testing.T) {
		stmt := mustParseDeclare(t, "declare @body nvarchar(max);")
		if stmt.Vars[0].Type != "NVARCHAR(MAX)" {
			t.Errorf("Vars[0].Type: got %q, want %q", stmt.Vars[0].Type, "NVARCHAR(MAX)")
		}
	})

	// ── Multiple scalar variables ─────────────────────────────────────────────

	t.Run("multiple scalars no defaults", func(t *testing.T) {
		stmt := mustParseDeclare(t, "declare @a int, @b varchar(10), @c bit;")
		if len(stmt.Vars) != 3 {
			t.Fatalf("Vars: got %d, want 3", len(stmt.Vars))
		}
		wantNames := []string{"@a", "@b", "@c"}
		wantTypes := []string{"INT", "VARCHAR(10)", "BIT"}
		for i, n := range wantNames {
			if stmt.Vars[i].Name != n {
				t.Errorf("Vars[%d].Name: got %q, want %q", i, stmt.Vars[i].Name, n)
			}
			if stmt.Vars[i].Type != wantTypes[i] {
				t.Errorf("Vars[%d].Type: got %q, want %q", i, stmt.Vars[i].Type, wantTypes[i])
			}
		}
	})

	t.Run("multiple scalars mixed defaults", func(t *testing.T) {
		stmt := mustParseDeclare(t, "declare @a int = 1, @b varchar(10), @c bit = 0;")
		if len(stmt.Vars) != 3 {
			t.Fatalf("Vars: got %d, want 3", len(stmt.Vars))
		}
		if renderExpr(stmt.Vars[0].Default) != "1" {
			t.Errorf("Vars[0].Default: got %q, want %q", renderExpr(stmt.Vars[0].Default), "1")
		}
		if stmt.Vars[1].Default != nil {
			t.Errorf("Vars[1].Default: got %q, want nil", renderExpr(stmt.Vars[1].Default))
		}
		if renderExpr(stmt.Vars[2].Default) != "0" {
			t.Errorf("Vars[2].Default: got %q, want %q", renderExpr(stmt.Vars[2].Default), "0")
		}
	})

	// ── Table variables ───────────────────────────────────────────────────────

	t.Run("table variable single column", func(t *testing.T) {
		stmt := mustParseDeclare(t, "declare @t table (id int not null);")
		if len(stmt.Vars) != 1 {
			t.Fatalf("Vars: got %d, want 1", len(stmt.Vars))
		}
		v := stmt.Vars[0]
		if v.Name != "@t" {
			t.Errorf("Vars[0].Name: got %q, want %q", v.Name, "@t")
		}
		if v.Type != "" {
			t.Errorf("Vars[0].Type: got %q, want empty (table variable)", v.Type)
		}
		if len(v.Columns) != 1 {
			t.Fatalf("Vars[0].Columns: got %d, want 1", len(v.Columns))
		}
		if v.Columns[0].Name != "id" {
			t.Errorf("Columns[0].Name: got %q, want %q", v.Columns[0].Name, "id")
		}
		if v.Columns[0].DataType != "INT" {
			t.Errorf("Columns[0].DataType: got %q, want %q", v.Columns[0].DataType, "INT")
		}
	})

	t.Run("table variable multiple columns", func(t *testing.T) {
		stmt := mustParseDeclare(t, "declare @staging table (id int not null, name nvarchar(max) null, active bit not null);")
		v := stmt.Vars[0]
		if len(v.Columns) != 3 {
			t.Fatalf("Columns: got %d, want 3", len(v.Columns))
		}
		if v.Columns[1].DataType != "NVARCHAR(MAX)" {
			t.Errorf("Columns[1].DataType: got %q, want %q", v.Columns[1].DataType, "NVARCHAR(MAX)")
		}
	})

	// ── Error cases ───────────────────────────────────────────────────────────

	t.Run("missing variable name", func(t *testing.T) {
		result := Parse("declare int;")
		if len(result.Errors) == 0 {
			t.Error("expected parse errors for missing variable name, got none")
		}
	})

	t.Run("invalid default value", func(t *testing.T) {
		result := Parse("declare @x int = (select 1);")
		if len(result.Errors) == 0 {
			t.Error("expected parse errors for subquery default value, got none")
		}
	})
}

// ─── parseProcParams tests ────────────────────────────────────────────────────

// parseProcParams stops at AS/BEGIN/)/EOF, so we can feed it just the param
// fragment without needing a full CREATE PROC statement.
func mustParseProcParams(t *testing.T, sql string) []ProcParam {
	t.Helper()
	p := newTestParser(sql)
	params, err := p.parseProcParams()
	if err != nil {
		t.Fatalf("parseProcParams(%q): unexpected error: %v", sql, err)
	}
	return params
}

func TestParseProcParams(t *testing.T) {
	// ── Empty / no params ─────────────────────────────────────────────────────

	t.Run("no params terminated by AS", func(t *testing.T) {
		params := mustParseProcParams(t, "as")
		if len(params) != 0 {
			t.Errorf("params: got %d, want 0", len(params))
		}
	})

	t.Run("empty parenthesised list", func(t *testing.T) {
		params := mustParseProcParams(t, "()")
		if len(params) != 0 {
			t.Errorf("params: got %d, want 0", len(params))
		}
	})

	// ── Single param — basic ──────────────────────────────────────────────────

	t.Run("single param no default", func(t *testing.T) {
		params := mustParseProcParams(t, "@count int")
		if len(params) != 1 {
			t.Fatalf("params: got %d, want 1", len(params))
		}
		if params[0].Name != "@count" {
			t.Errorf("Name: got %q, want %q", params[0].Name, "@count")
		}
		if params[0].DataType != "INT" {
			t.Errorf("DataType: got %q, want %q", params[0].DataType, "INT")
		}
		if params[0].Direction != ParamDirectionIn {
			t.Errorf("Direction: got %v, want ParamDirectionIn", params[0].Direction)
		}
		if params[0].Default != nil {
			t.Errorf("Default: got %q, want nil", renderExpr(params[0].Default))
		}
	})

	t.Run("single param with MAX type", func(t *testing.T) {
		params := mustParseProcParams(t, "@body nvarchar(max)")
		if len(params) != 1 {
			t.Fatalf("params: got %d, want 1", len(params))
		}
		if params[0].DataType != "NVARCHAR(MAX)" {
			t.Errorf("DataType: got %q, want %q", params[0].DataType, "NVARCHAR(MAX)")
		}
	})

	// ── Single param — defaults ───────────────────────────────────────────────

	t.Run("single param with int default", func(t *testing.T) {
		params := mustParseProcParams(t, "@count int = 0")
		if renderExpr(params[0].Default) != "0" {
			t.Errorf("Default: got %q, want %q", renderExpr(params[0].Default), "0")
		}
	})

	t.Run("single param with string default", func(t *testing.T) {
		params := mustParseProcParams(t, "@status varchar(20) = 'active'")
		if renderExpr(params[0].Default) != "'active'" {
			t.Errorf("Default: got %q, want %q", renderExpr(params[0].Default), "'active'")
		}
	})

	t.Run("single param with null default", func(t *testing.T) {
		params := mustParseProcParams(t, "@val int = null")
		if renderExpr(params[0].Default) != "null" {
			t.Errorf("Default: got %q, want %q", renderExpr(params[0].Default), "null")
		}
	})

	// ── Single param — direction / modifiers ──────────────────────────────────

	t.Run("output keyword", func(t *testing.T) {
		params := mustParseProcParams(t, "@result int output")
		if params[0].Direction != ParamDirectionOut {
			t.Errorf("Direction: got %v, want ParamDirectionOut", params[0].Direction)
		}
	})

	t.Run("out alias", func(t *testing.T) {
		params := mustParseProcParams(t, "@result int out")
		if params[0].Direction != ParamDirectionOut {
			t.Errorf("Direction: got %v, want ParamDirectionOut", params[0].Direction)
		}
	})

	t.Run("readonly consumed without error", func(t *testing.T) {
		// READONLY is a hint (input-only); it is consumed but does not set Direction.
		params := mustParseProcParams(t, "@data nvarchar(max) readonly")
		if len(params) != 1 {
			t.Fatalf("params: got %d, want 1", len(params))
		}
		if params[0].Direction != ParamDirectionIn {
			t.Errorf("Direction: got %v, want ParamDirectionIn", params[0].Direction)
		}
	})

	// ── Parenthesised form ────────────────────────────────────────────────────

	t.Run("single param in parens", func(t *testing.T) {
		params := mustParseProcParams(t, "(@count int)")
		if len(params) != 1 {
			t.Fatalf("params: got %d, want 1", len(params))
		}
		if params[0].Name != "@count" {
			t.Errorf("Name: got %q, want %q", params[0].Name, "@count")
		}
	})

	// ── Multiple params ───────────────────────────────────────────────────────

	t.Run("multiple params no parens", func(t *testing.T) {
		params := mustParseProcParams(t, "@a int, @b varchar(10), @c bit")
		if len(params) != 3 {
			t.Fatalf("params: got %d, want 3", len(params))
		}
		wantNames := []string{"@a", "@b", "@c"}
		wantTypes := []string{"INT", "VARCHAR(10)", "BIT"}
		for i, n := range wantNames {
			if params[i].Name != n {
				t.Errorf("params[%d].Name: got %q, want %q", i, params[i].Name, n)
			}
			if params[i].DataType != wantTypes[i] {
				t.Errorf("params[%d].DataType: got %q, want %q", i, params[i].DataType, wantTypes[i])
			}
		}
	})

	t.Run("multiple params with parens mixed attributes", func(t *testing.T) {
		params := mustParseProcParams(t, "(@id int, @name nvarchar(max) = null, @result int output)")
		if len(params) != 3 {
			t.Fatalf("params: got %d, want 3", len(params))
		}
		// @id — plain input
		if params[0].Direction != ParamDirectionIn || params[0].Default != nil {
			t.Errorf("params[0]: got direction=%v default=%q, want input/nil",
				params[0].Direction, renderExpr(params[0].Default))
		}
		// @name — has default
		if renderExpr(params[1].Default) != "null" {
			t.Errorf("params[1].Default: got %q, want %q", renderExpr(params[1].Default), "null")
		}
		// @result — output
		if params[2].Direction != ParamDirectionOut {
			t.Errorf("params[2].Direction: got %v, want ParamDirectionOut", params[2].Direction)
		}
	})

	// ── Error cases ───────────────────────────────────────────────────────────

	t.Run("non-ident parameter name", func(t *testing.T) {
		p := newTestParser("123 int")
		_, err := p.parseProcParams()
		if err == nil {
			t.Error("expected error for numeric parameter name, got nil")
		}
	})
}
