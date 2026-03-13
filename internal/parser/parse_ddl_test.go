package parser

import "testing"

// ─── helpers ──────────────────────────────────────────────────────────────────

// mustParseColDef parses a single column definition from sql and returns the
// resulting ColumnDef. It fails the test immediately on any parse error.
func mustParseColDef(t *testing.T, sql string) ColumnDef {
	t.Helper()
	p := newTestParser(sql)
	col, err := p.parseColumnDef()
	if err != nil {
		t.Fatalf("parseColumnDef(%q): unexpected error: %v", sql, err)
	}
	return col
}

// renderExpr returns Render(e) when e is non-nil, or "" when nil.
func renderExpr(e Expr) string {
	if e == nil {
		return ""
	}
	return Render(e)
}

// ─── parseDataType tests ──────────────────────────────────────────────────────

func TestParseDataType(t *testing.T) {
	tests := []struct {
		name    string
		input   string
		want    string
		wantErr bool
	}{
		// Plain types — no parameter list
		{name: "keyword type lowercase", input: "int", want: "INT"},
		{name: "keyword type uppercase", input: "INTEGER", want: "INTEGER"},
		{name: "ident type", input: "bigint", want: "BIGINT"},
		{name: "keyword type mixed case", input: "Varchar", want: "VARCHAR"},

		// Single numeric parameter
		{name: "varchar with length", input: "varchar(255)", want: "VARCHAR(255)"},
		{name: "char with length", input: "char(10)", want: "CHAR(10)"},
		{name: "float with precision", input: "float(53)", want: "FLOAT(53)"},

		// Two numeric parameters
		{name: "numeric with precision and scale", input: "numeric(10, 2)", want: "NUMERIC(10, 2)"},
		{name: "decimal with precision and scale", input: "DECIMAL(18,6)", want: "DECIMAL(18, 6)"},

		// MAX keyword as parameter — the fix from #157
		{name: "nvarchar max lowercase", input: "nvarchar(max)", want: "NVARCHAR(MAX)"},
		{name: "nvarchar max uppercase", input: "nvarchar(MAX)", want: "NVARCHAR(MAX)"},
		{name: "varchar max", input: "varchar(max)", want: "VARCHAR(MAX)"},
		{name: "varbinary max", input: "varbinary(max)", want: "VARBINARY(MAX)"},

		// Error cases
		{name: "numeric literal as type name", input: "123", wantErr: true},
		{name: "invalid param token", input: "varchar(*)", wantErr: true},
		{name: "unclosed paren", input: "varchar(", wantErr: true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			p := newTestParser(tt.input)
			got, err := p.parseDataType()

			if tt.wantErr {
				if err == nil {
					t.Errorf("parseDataType(%q): expected error, got %q", tt.input, got)
				}
				return
			}

			if err != nil {
				t.Fatalf("parseDataType(%q): unexpected error: %v", tt.input, err)
			}
			if got != tt.want {
				t.Errorf("parseDataType(%q): got %q, want %q", tt.input, got, tt.want)
			}
		})
	}
}

// ─── parseColumnDef tests ─────────────────────────────────────────────────────

func TestParseColumnDef(t *testing.T) {
	// wantCol is the expected state of a ColumnDef after parsing. Fields left
	// at their zero value are asserted to be at their zero value too.
	type wantCol struct {
		name              string
		dataType          string
		identity          *IdentitySpec
		primaryKey        bool
		nullability       Nullability
		defaultVal        string // Render(col.Default); "" means nil
		defaultConstraint string
		unique            bool
		check             string // Render(col.Check); "" means nil
		refTable          string
		refCols           []string
	}

	check := func(t *testing.T, input string, got ColumnDef, want wantCol) {
		t.Helper()
		if got.Name != want.name {
			t.Errorf("Name: got %q, want %q", got.Name, want.name)
		}
		if got.DataType != want.dataType {
			t.Errorf("DataType: got %q, want %q", got.DataType, want.dataType)
		}
		// Identity
		if want.identity == nil && got.Identity != nil {
			t.Errorf("Identity: got %+v, want nil", got.Identity)
		} else if want.identity != nil {
			if got.Identity == nil {
				t.Fatalf("Identity: got nil, want %+v", want.identity)
			}
			if got.Identity.Seed != want.identity.Seed {
				t.Errorf("Identity.Seed: got %q, want %q", got.Identity.Seed, want.identity.Seed)
			}
			if got.Identity.Increment != want.identity.Increment {
				t.Errorf("Identity.Increment: got %q, want %q", got.Identity.Increment, want.identity.Increment)
			}
		}
		if got.PrimaryKey != want.primaryKey {
			t.Errorf("PrimaryKey: got %v, want %v", got.PrimaryKey, want.primaryKey)
		}
		if got.Nullability != want.nullability {
			t.Errorf("Nullability: got %v, want %v", got.Nullability, want.nullability)
		}
		if renderExpr(got.Default) != want.defaultVal {
			t.Errorf("Default: got %q, want %q", renderExpr(got.Default), want.defaultVal)
		}
		if got.DefaultConstraint != want.defaultConstraint {
			t.Errorf("DefaultConstraint: got %q, want %q", got.DefaultConstraint, want.defaultConstraint)
		}
		if got.Unique != want.unique {
			t.Errorf("Unique: got %v, want %v", got.Unique, want.unique)
		}
		if renderExpr(got.Check) != want.check {
			t.Errorf("Check: got %q, want %q", renderExpr(got.Check), want.check)
		}
		refTable := ""
		var refCols []string
		if got.References != nil {
			refTable = got.References.Table
			refCols = got.References.Columns
		}
		if refTable != want.refTable {
			t.Errorf("References.Table: got %q, want %q", refTable, want.refTable)
		}
		if len(refCols) != len(want.refCols) {
			t.Errorf("References.Columns: got %v, want %v", refCols, want.refCols)
		} else {
			for i, c := range want.refCols {
				if refCols[i] != c {
					t.Errorf("References.Columns[%d]: got %q, want %q", i, refCols[i], c)
				}
			}
		}
	}

	// ── Basic ────────────────────────────────────────────────────────────────

	t.Run("plain type", func(t *testing.T) {
		col := mustParseColDef(t, "id int")
		check(t, "id int", col, wantCol{name: "id", dataType: "INT"})
	})

	t.Run("parameterised type", func(t *testing.T) {
		col := mustParseColDef(t, "name varchar(255)")
		check(t, "name varchar(255)", col, wantCol{name: "name", dataType: "VARCHAR(255)"})
	})

	t.Run("MAX param type", func(t *testing.T) {
		col := mustParseColDef(t, "body nvarchar(max)")
		check(t, "body nvarchar(max)", col, wantCol{name: "body", dataType: "NVARCHAR(MAX)"})
	})

	// ── IDENTITY ─────────────────────────────────────────────────────────────

	t.Run("identity bare", func(t *testing.T) {
		col := mustParseColDef(t, "id int identity")
		check(t, "id int identity", col, wantCol{
			name:     "id",
			dataType: "INT",
			identity: &IdentitySpec{},
		})
	})

	t.Run("identity with default args", func(t *testing.T) {
		col := mustParseColDef(t, "id int identity(1, 1)")
		check(t, "id int identity(1, 1)", col, wantCol{
			name:     "id",
			dataType: "INT",
			identity: &IdentitySpec{Seed: "1", Increment: "1"},
		})
	})

	t.Run("identity with non-default args", func(t *testing.T) {
		col := mustParseColDef(t, "id int identity(100, 10)")
		check(t, "id int identity(100, 10)", col, wantCol{
			name:     "id",
			dataType: "INT",
			identity: &IdentitySpec{Seed: "100", Increment: "10"},
		})
	})

	// ── PRIMARY KEY ───────────────────────────────────────────────────────────

	t.Run("primary key inline", func(t *testing.T) {
		col := mustParseColDef(t, "id int primary key")
		check(t, "id int primary key", col, wantCol{name: "id", dataType: "INT", primaryKey: true})
	})

	// ── Nullability ───────────────────────────────────────────────────────────

	t.Run("not null", func(t *testing.T) {
		col := mustParseColDef(t, "id int not null")
		check(t, "id int not null", col, wantCol{
			name:        "id",
			dataType:    "INT",
			nullability: NullabilityNotNull,
		})
	})

	t.Run("null", func(t *testing.T) {
		col := mustParseColDef(t, "id int null")
		check(t, "id int null", col, wantCol{
			name:        "id",
			dataType:    "INT",
			nullability: NullabilityNull,
		})
	})

	t.Run("nullability absent", func(t *testing.T) {
		col := mustParseColDef(t, "id int")
		check(t, "id int", col, wantCol{
			name:        "id",
			dataType:    "INT",
			nullability: NullabilityNone,
		})
	})

	// ── DEFAULT ───────────────────────────────────────────────────────────────

	t.Run("default int literal", func(t *testing.T) {
		col := mustParseColDef(t, "qty int default 0")
		check(t, "qty int default 0", col, wantCol{
			name: "qty", dataType: "INT", defaultVal: "0",
		})
	})

	t.Run("default string literal", func(t *testing.T) {
		col := mustParseColDef(t, "status varchar(20) default 'active'")
		check(t, "status varchar(20) default 'active'", col, wantCol{
			name: "status", dataType: "VARCHAR(20)", defaultVal: "'active'",
		})
	})

	t.Run("default keyword (NULL)", func(t *testing.T) {
		col := mustParseColDef(t, "note varchar(255) default null")
		check(t, "note varchar(255) default null", col, wantCol{
			name: "note", dataType: "VARCHAR(255)", defaultVal: "null",
		})
	})

	t.Run("default before nullability", func(t *testing.T) {
		col := mustParseColDef(t, "qty int default 0 not null")
		check(t, "qty int default 0 not null", col, wantCol{
			name:        "qty",
			dataType:    "INT",
			defaultVal:  "0",
			nullability: NullabilityNotNull,
		})
	})

	t.Run("default after nullability", func(t *testing.T) {
		col := mustParseColDef(t, "qty int not null default 0")
		check(t, "qty int not null default 0", col, wantCol{
			name:        "qty",
			dataType:    "INT",
			nullability: NullabilityNotNull,
			defaultVal:  "0",
		})
	})

	t.Run("named constraint default before nullability", func(t *testing.T) {
		col := mustParseColDef(t, "qty int constraint df_qty default 0 not null")
		check(t, "qty int constraint df_qty default 0 not null", col, wantCol{
			name:              "qty",
			dataType:          "INT",
			defaultConstraint: "df_qty",
			defaultVal:        "0",
			nullability:       NullabilityNotNull,
		})
	})

	t.Run("named constraint default after nullability", func(t *testing.T) {
		col := mustParseColDef(t, "qty int not null constraint df_qty default 0")
		check(t, "qty int not null constraint df_qty default 0", col, wantCol{
			name:              "qty",
			dataType:          "INT",
			nullability:       NullabilityNotNull,
			defaultConstraint: "df_qty",
			defaultVal:        "0",
		})
	})

	// ── UNIQUE ────────────────────────────────────────────────────────────────

	t.Run("unique", func(t *testing.T) {
		col := mustParseColDef(t, "code varchar(10) unique")
		check(t, "code varchar(10) unique", col, wantCol{
			name: "code", dataType: "VARCHAR(10)", unique: true,
		})
	})

	// ── CHECK ─────────────────────────────────────────────────────────────────

	t.Run("check expression", func(t *testing.T) {
		col := mustParseColDef(t, "qty int check (qty > 0)")
		check(t, "qty int check (qty > 0)", col, wantCol{
			name: "qty", dataType: "INT", check: "qty > 0",
		})
	})

	// ── REFERENCES ────────────────────────────────────────────────────────────

	t.Run("references with column list", func(t *testing.T) {
		col := mustParseColDef(t, "user_id int references users(id)")
		check(t, "user_id int references users(id)", col, wantCol{
			name:     "user_id",
			dataType: "INT",
			refTable: "users",
			refCols:  []string{"id"},
		})
	})

	t.Run("references without column list", func(t *testing.T) {
		col := mustParseColDef(t, "user_id int references users")
		check(t, "user_id int references users", col, wantCol{
			name:     "user_id",
			dataType: "INT",
			refTable: "users",
		})
	})

	// ── Combinations ──────────────────────────────────────────────────────────

	t.Run("identity not null", func(t *testing.T) {
		col := mustParseColDef(t, "id int identity not null")
		check(t, "id int identity not null", col, wantCol{
			name:        "id",
			dataType:    "INT",
			identity:    &IdentitySpec{},
			nullability: NullabilityNotNull,
		})
	})

	// Note: PRIMARY KEY is only parsed in the slot before nullability.
	// "id int identity(1,1) not null primary key" is NOT currently supported —
	// PRIMARY KEY after NOT NULL is silently ignored. This is a known parser
	// limitation to be addressed in #191 (refactor / attribute ordering).
	t.Run("identity with args primary key not null", func(t *testing.T) {
		col := mustParseColDef(t, "id int identity(1,1) primary key not null")
		check(t, "id int identity(1,1) primary key not null", col, wantCol{
			name:        "id",
			dataType:    "INT",
			identity:    &IdentitySpec{Seed: "1", Increment: "1"},
			primaryKey:  true,
			nullability: NullabilityNotNull,
		})
	})

	t.Run("not null with named constraint default", func(t *testing.T) {
		col := mustParseColDef(t, "name varchar(255) not null constraint df_name default 'unknown'")
		check(t, "name varchar(255) not null constraint df_name default 'unknown'", col, wantCol{
			name:              "name",
			dataType:          "VARCHAR(255)",
			nullability:       NullabilityNotNull,
			defaultConstraint: "df_name",
			defaultVal:        "'unknown'",
		})
	})

	// ── Error cases ───────────────────────────────────────────────────────────

	t.Run("missing type name", func(t *testing.T) {
		p := newTestParser("123 int")
		_, err := p.parseColumnDef()
		if err == nil {
			t.Error("expected error for numeric column name, got nil")
		}
	})

	t.Run("constraint without default", func(t *testing.T) {
		p := newTestParser("id int constraint ck_id check (id > 0)")
		_, err := p.parseColumnDef()
		if err == nil {
			t.Error("expected error for CONSTRAINT not followed by DEFAULT, got nil")
		}
	})
}
