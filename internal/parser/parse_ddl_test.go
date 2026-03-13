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

// ─── parseTableConstraint tests ───────────────────────────────────────────────

func mustParseTableConstraint(t *testing.T, sql string) TableConstraint {
	t.Helper()
	p := newTestParser(sql)
	tc, err := p.parseTableConstraint()
	if err != nil {
		t.Fatalf("parseTableConstraint(%q): unexpected error: %v", sql, err)
	}
	return tc
}

func TestParseTableConstraint(t *testing.T) {
	// ── PRIMARY KEY ───────────────────────────────────────────────────────────

	t.Run("unnamed primary key single column", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "primary key (id)")
		if tc.Name != "" {
			t.Errorf("Name: got %q, want empty", tc.Name)
		}
		if tc.Type != ConstraintPrimaryKey {
			t.Errorf("Type: got %v, want ConstraintPrimaryKey", tc.Type)
		}
		if len(tc.Columns) != 1 || tc.Columns[0] != "id" {
			t.Errorf("Columns: got %v, want [id]", tc.Columns)
		}
	})

	t.Run("named primary key single column", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "constraint pk_orders primary key (id)")
		if tc.Name != "pk_orders" {
			t.Errorf("Name: got %q, want %q", tc.Name, "pk_orders")
		}
		if tc.Type != ConstraintPrimaryKey {
			t.Errorf("Type: got %v, want ConstraintPrimaryKey", tc.Type)
		}
		if len(tc.Columns) != 1 || tc.Columns[0] != "id" {
			t.Errorf("Columns: got %v, want [id]", tc.Columns)
		}
	})

	t.Run("named primary key composite", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "constraint pk_items primary key (order_id, product_id)")
		if tc.Name != "pk_items" {
			t.Errorf("Name: got %q, want %q", tc.Name, "pk_items")
		}
		if tc.Type != ConstraintPrimaryKey {
			t.Errorf("Type: got %v, want ConstraintPrimaryKey", tc.Type)
		}
		wantCols := []string{"order_id", "product_id"}
		if len(tc.Columns) != len(wantCols) {
			t.Fatalf("Columns: got %v, want %v", tc.Columns, wantCols)
		}
		for i, c := range wantCols {
			if tc.Columns[i] != c {
				t.Errorf("Columns[%d]: got %q, want %q", i, tc.Columns[i], c)
			}
		}
	})

	// ── FOREIGN KEY ───────────────────────────────────────────────────────────

	t.Run("unnamed foreign key with ref columns", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "foreign key (user_id) references users (id)")
		if tc.Name != "" {
			t.Errorf("Name: got %q, want empty", tc.Name)
		}
		if tc.Type != ConstraintForeignKey {
			t.Errorf("Type: got %v, want ConstraintForeignKey", tc.Type)
		}
		if len(tc.Columns) != 1 || tc.Columns[0] != "user_id" {
			t.Errorf("Columns: got %v, want [user_id]", tc.Columns)
		}
		if tc.RefTable != "users" {
			t.Errorf("RefTable: got %q, want %q", tc.RefTable, "users")
		}
		if len(tc.RefColumns) != 1 || tc.RefColumns[0] != "id" {
			t.Errorf("RefColumns: got %v, want [id]", tc.RefColumns)
		}
	})

	t.Run("named foreign key with ref columns", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "constraint fk_orders_user foreign key (user_id) references users (id)")
		if tc.Name != "fk_orders_user" {
			t.Errorf("Name: got %q, want %q", tc.Name, "fk_orders_user")
		}
		if tc.Type != ConstraintForeignKey {
			t.Errorf("Type: got %v, want ConstraintForeignKey", tc.Type)
		}
		if tc.RefTable != "users" {
			t.Errorf("RefTable: got %q, want %q", tc.RefTable, "users")
		}
	})

	t.Run("foreign key without ref column list", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "foreign key (user_id) references users")
		if tc.RefTable != "users" {
			t.Errorf("RefTable: got %q, want %q", tc.RefTable, "users")
		}
		if len(tc.RefColumns) != 0 {
			t.Errorf("RefColumns: got %v, want empty", tc.RefColumns)
		}
	})

	t.Run("foreign key composite columns", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "foreign key (order_id, product_id) references order_items (order_id, product_id)")
		wantLocal := []string{"order_id", "product_id"}
		wantRef := []string{"order_id", "product_id"}
		if len(tc.Columns) != len(wantLocal) {
			t.Fatalf("Columns: got %v, want %v", tc.Columns, wantLocal)
		}
		if len(tc.RefColumns) != len(wantRef) {
			t.Fatalf("RefColumns: got %v, want %v", tc.RefColumns, wantRef)
		}
	})

	// ── UNIQUE ────────────────────────────────────────────────────────────────

	t.Run("unnamed unique", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "unique (email)")
		if tc.Name != "" {
			t.Errorf("Name: got %q, want empty", tc.Name)
		}
		if tc.Type != ConstraintUnique {
			t.Errorf("Type: got %v, want ConstraintUnique", tc.Type)
		}
		if len(tc.Columns) != 1 || tc.Columns[0] != "email" {
			t.Errorf("Columns: got %v, want [email]", tc.Columns)
		}
	})

	t.Run("named unique", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "constraint uq_users_email unique (email)")
		if tc.Name != "uq_users_email" {
			t.Errorf("Name: got %q, want %q", tc.Name, "uq_users_email")
		}
		if tc.Type != ConstraintUnique {
			t.Errorf("Type: got %v, want ConstraintUnique", tc.Type)
		}
	})

	// ── CHECK ─────────────────────────────────────────────────────────────────

	t.Run("unnamed check", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "check (qty > 0)")
		if tc.Name != "" {
			t.Errorf("Name: got %q, want empty", tc.Name)
		}
		if tc.Type != ConstraintCheck {
			t.Errorf("Type: got %v, want ConstraintCheck", tc.Type)
		}
		if renderExpr(tc.Check) != "qty > 0" {
			t.Errorf("Check: got %q, want %q", renderExpr(tc.Check), "qty > 0")
		}
	})

	t.Run("named check", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "constraint chk_qty check (qty > 0)")
		if tc.Name != "chk_qty" {
			t.Errorf("Name: got %q, want %q", tc.Name, "chk_qty")
		}
		if tc.Type != ConstraintCheck {
			t.Errorf("Type: got %v, want ConstraintCheck", tc.Type)
		}
		if renderExpr(tc.Check) != "qty > 0" {
			t.Errorf("Check: got %q, want %q", renderExpr(tc.Check), "qty > 0")
		}
	})

	t.Run("check with nested parens", func(t *testing.T) {
		tc := mustParseTableConstraint(t, "check (status in ('active', 'pending'))")
		// parseCheckExpr joins every token with a single space, so commas are
		// surrounded by spaces: "( 'active' , 'pending' )"
		if renderExpr(tc.Check) != "status in ( 'active' , 'pending' )" {
			t.Errorf("Check: got %q, want %q", renderExpr(tc.Check), "status in ( 'active' , 'pending' )")
		}
	})

	// ── Error cases ───────────────────────────────────────────────────────────

	t.Run("unknown constraint keyword", func(t *testing.T) {
		p := newTestParser("index (id)")
		_, err := p.parseTableConstraint()
		if err == nil {
			t.Error("expected error for unknown constraint type, got nil")
		}
	})

	t.Run("constraint name without constraint body", func(t *testing.T) {
		p := newTestParser("constraint pk_foo index (id)")
		_, err := p.parseTableConstraint()
		if err == nil {
			t.Error("expected error for CONSTRAINT name followed by unknown keyword, got nil")
		}
	})
}

// ─── parseCreateTable tests ───────────────────────────────────────────────────

func mustParseCreateTable(t *testing.T, sql string) *CreateTableStmt {
	t.Helper()
	result := Parse(sql)
	if len(result.Errors) > 0 {
		t.Fatalf("Parse(%q): unexpected errors: %v", sql, result.Errors)
	}
	if len(result.Statements) != 1 {
		t.Fatalf("Parse(%q): expected 1 statement, got %d", sql, len(result.Statements))
	}
	stmt, ok := result.Statements[0].(*CreateTableStmt)
	if !ok {
		t.Fatalf("Parse(%q): expected *CreateTableStmt, got %T", sql, result.Statements[0])
	}
	return stmt
}

func TestParseCreateTable(t *testing.T) {
	// ── Name forms ────────────────────────────────────────────────────────────

	t.Run("simple name", func(t *testing.T) {
		stmt := mustParseCreateTable(t, "create table orders (id int);")
		if stmt.Name != "orders" {
			t.Errorf("Name: got %q, want %q", stmt.Name, "orders")
		}
	})

	t.Run("schema-qualified name", func(t *testing.T) {
		stmt := mustParseCreateTable(t, "create table dbo.orders (id int);")
		if stmt.Name != "dbo.orders" {
			t.Errorf("Name: got %q, want %q", stmt.Name, "dbo.orders")
		}
	})

	t.Run("temp table", func(t *testing.T) {
		stmt := mustParseCreateTable(t, "create table #staging (id int);")
		if stmt.Name != "#staging" {
			t.Errorf("Name: got %q, want %q", stmt.Name, "#staging")
		}
	})

	// ── Column counts ─────────────────────────────────────────────────────────

	t.Run("single column", func(t *testing.T) {
		stmt := mustParseCreateTable(t, "create table t (id int);")
		if len(stmt.Columns) != 1 {
			t.Fatalf("Columns: got %d, want 1", len(stmt.Columns))
		}
		if stmt.Columns[0].Name != "id" {
			t.Errorf("Columns[0].Name: got %q, want %q", stmt.Columns[0].Name, "id")
		}
		if stmt.Columns[0].DataType != "INT" {
			t.Errorf("Columns[0].DataType: got %q, want %q", stmt.Columns[0].DataType, "INT")
		}
	})

	t.Run("multiple columns", func(t *testing.T) {
		stmt := mustParseCreateTable(t, "create table t (id int not null, name varchar(255) not null, active bit null);")
		if len(stmt.Columns) != 3 {
			t.Fatalf("Columns: got %d, want 3", len(stmt.Columns))
		}
		wantNames := []string{"id", "name", "active"}
		for i, n := range wantNames {
			if stmt.Columns[i].Name != n {
				t.Errorf("Columns[%d].Name: got %q, want %q", i, stmt.Columns[i].Name, n)
			}
		}
	})

	// ── Columns and constraints separated ─────────────────────────────────────

	t.Run("columns then table pk", func(t *testing.T) {
		stmt := mustParseCreateTable(t,
			"create table t (id int not null, name varchar(255) not null, constraint pk_t primary key (id));",
		)
		if len(stmt.Columns) != 2 {
			t.Fatalf("Columns: got %d, want 2", len(stmt.Columns))
		}
		if len(stmt.Constraints) != 1 {
			t.Fatalf("Constraints: got %d, want 1", len(stmt.Constraints))
		}
		pk := stmt.Constraints[0]
		if pk.Type != ConstraintPrimaryKey {
			t.Errorf("Constraints[0].Type: got %v, want ConstraintPrimaryKey", pk.Type)
		}
		if pk.Name != "pk_t" {
			t.Errorf("Constraints[0].Name: got %q, want %q", pk.Name, "pk_t")
		}
		if len(pk.Columns) != 1 || pk.Columns[0] != "id" {
			t.Errorf("Constraints[0].Columns: got %v, want [id]", pk.Columns)
		}
	})

	t.Run("columns then table fk", func(t *testing.T) {
		stmt := mustParseCreateTable(t,
			"create table t (id int not null, user_id int not null, constraint fk_t_user foreign key (user_id) references users (id));",
		)
		if len(stmt.Columns) != 2 {
			t.Fatalf("Columns: got %d, want 2", len(stmt.Columns))
		}
		if len(stmt.Constraints) != 1 {
			t.Fatalf("Constraints: got %d, want 1", len(stmt.Constraints))
		}
		fk := stmt.Constraints[0]
		if fk.Type != ConstraintForeignKey {
			t.Errorf("Constraints[0].Type: got %v, want ConstraintForeignKey", fk.Type)
		}
		if fk.RefTable != "users" {
			t.Errorf("Constraints[0].RefTable: got %q, want %q", fk.RefTable, "users")
		}
	})

	t.Run("constraint listed before column in source", func(t *testing.T) {
		// parseColumnList dispatches on keyword — constraint-first order must still
		// produce the correct Columns/Constraints split.
		stmt := mustParseCreateTable(t,
			"create table t (constraint pk_t primary key (id), id int not null);",
		)
		if len(stmt.Columns) != 1 {
			t.Fatalf("Columns: got %d, want 1", len(stmt.Columns))
		}
		if len(stmt.Constraints) != 1 {
			t.Fatalf("Constraints: got %d, want 1", len(stmt.Constraints))
		}
		if stmt.Columns[0].Name != "id" {
			t.Errorf("Columns[0].Name: got %q, want %q", stmt.Columns[0].Name, "id")
		}
	})

	t.Run("multiple table constraints", func(t *testing.T) {
		stmt := mustParseCreateTable(t,
			"create table t ("+
				"id int not null, user_id int not null, email varchar(255) not null, "+
				"constraint pk_t primary key (id), "+
				"constraint fk_t_user foreign key (user_id) references users (id), "+
				"constraint uq_t_email unique (email)"+
				");",
		)
		if len(stmt.Columns) != 3 {
			t.Fatalf("Columns: got %d, want 3", len(stmt.Columns))
		}
		if len(stmt.Constraints) != 3 {
			t.Fatalf("Constraints: got %d, want 3", len(stmt.Constraints))
		}
		wantTypes := []TableConstraintType{ConstraintPrimaryKey, ConstraintForeignKey, ConstraintUnique}
		for i, wt := range wantTypes {
			if stmt.Constraints[i].Type != wt {
				t.Errorf("Constraints[%d].Type: got %v, want %v", i, stmt.Constraints[i].Type, wt)
			}
		}
	})

	// ── Inline column attributes survive round-trip through parseColumnList ───

	t.Run("inline identity and nullability preserved", func(t *testing.T) {
		stmt := mustParseCreateTable(t,
			"create table t (id int identity(1,1) not null, name nvarchar(max) null);",
		)
		id := stmt.Columns[0]
		if id.Identity == nil {
			t.Fatal("Columns[0].Identity: got nil, want non-nil")
		}
		if id.Identity.Seed != "1" || id.Identity.Increment != "1" {
			t.Errorf("Columns[0].Identity: got {%q,%q}, want {1,1}", id.Identity.Seed, id.Identity.Increment)
		}
		if id.Nullability != NullabilityNotNull {
			t.Errorf("Columns[0].Nullability: got %v, want NullabilityNotNull", id.Nullability)
		}
		name := stmt.Columns[1]
		if name.DataType != "NVARCHAR(MAX)" {
			t.Errorf("Columns[1].DataType: got %q, want %q", name.DataType, "NVARCHAR(MAX)")
		}
		if name.Nullability != NullabilityNull {
			t.Errorf("Columns[1].Nullability: got %v, want NullabilityNull", name.Nullability)
		}
	})

	// ── Error cases ───────────────────────────────────────────────────────────

	t.Run("missing opening paren", func(t *testing.T) {
		result := Parse("create table t id int;")
		if len(result.Errors) == 0 {
			t.Error("expected parse errors, got none")
		}
	})

	t.Run("empty column list", func(t *testing.T) {
		result := Parse("create table t ();")
		if len(result.Errors) == 0 {
			t.Error("expected parse errors for empty column list, got none")
		}
	})
}

// ─── parseCreateIndex tests ───────────────────────────────────────────────────

func mustParseCreateIndex(t *testing.T, sql string) *CreateIndexStmt {
	t.Helper()
	result := Parse(sql)
	if len(result.Errors) > 0 {
		t.Fatalf("Parse(%q): unexpected errors: %v", sql, result.Errors)
	}
	if len(result.Statements) != 1 {
		t.Fatalf("Parse(%q): expected 1 statement, got %d", sql, len(result.Statements))
	}
	stmt, ok := result.Statements[0].(*CreateIndexStmt)
	if !ok {
		t.Fatalf("Parse(%q): expected *CreateIndexStmt, got %T", sql, result.Statements[0])
	}
	return stmt
}

func TestParseCreateIndex(t *testing.T) {
	// ── Unique flag ───────────────────────────────────────────────────────────

	t.Run("non-unique index", func(t *testing.T) {
		stmt := mustParseCreateIndex(t, "create index ix_orders_user on orders (user_id);")
		if stmt.Unique {
			t.Error("Unique: got true, want false")
		}
		if stmt.Name != "ix_orders_user" {
			t.Errorf("Name: got %q, want %q", stmt.Name, "ix_orders_user")
		}
		if stmt.Table != "orders" {
			t.Errorf("Table: got %q, want %q", stmt.Table, "orders")
		}
	})

	t.Run("unique index", func(t *testing.T) {
		stmt := mustParseCreateIndex(t, "create unique index uq_users_email on users (email);")
		if !stmt.Unique {
			t.Error("Unique: got false, want true")
		}
	})

	// ── IF NOT EXISTS ─────────────────────────────────────────────────────────

	t.Run("if not exists", func(t *testing.T) {
		stmt := mustParseCreateIndex(t, "create index if not exists ix_orders_user on orders (user_id);")
		if !stmt.IfNotExists {
			t.Error("IfNotExists: got false, want true")
		}
		if stmt.Name != "ix_orders_user" {
			t.Errorf("Name: got %q, want %q", stmt.Name, "ix_orders_user")
		}
	})

	t.Run("unique if not exists", func(t *testing.T) {
		stmt := mustParseCreateIndex(t, "create unique index if not exists uq_col on t (col);")
		if !stmt.Unique {
			t.Error("Unique: got false, want true")
		}
		if !stmt.IfNotExists {
			t.Error("IfNotExists: got false, want true")
		}
	})

	// ── Table name forms ──────────────────────────────────────────────────────

	t.Run("schema-qualified table", func(t *testing.T) {
		stmt := mustParseCreateIndex(t, "create index ix_name on dbo.orders (id);")
		if stmt.Table != "dbo.orders" {
			t.Errorf("Table: got %q, want %q", stmt.Table, "dbo.orders")
		}
	})

	// ── Column directions ─────────────────────────────────────────────────────

	t.Run("single column no direction", func(t *testing.T) {
		stmt := mustParseCreateIndex(t, "create index ix on t (col);")
		if len(stmt.Columns) != 1 {
			t.Fatalf("Columns: got %d, want 1", len(stmt.Columns))
		}
		if stmt.Columns[0].Name != "col" {
			t.Errorf("Columns[0].Name: got %q, want %q", stmt.Columns[0].Name, "col")
		}
		if stmt.Columns[0].Direction != DirectionNone {
			t.Errorf("Columns[0].Direction: got %v, want DirectionNone", stmt.Columns[0].Direction)
		}
	})

	t.Run("single column asc", func(t *testing.T) {
		stmt := mustParseCreateIndex(t, "create index ix on t (col asc);")
		if stmt.Columns[0].Direction != DirectionAsc {
			t.Errorf("Columns[0].Direction: got %v, want DirectionAsc", stmt.Columns[0].Direction)
		}
	})

	t.Run("single column desc", func(t *testing.T) {
		stmt := mustParseCreateIndex(t, "create index ix on t (col desc);")
		if stmt.Columns[0].Direction != DirectionDesc {
			t.Errorf("Columns[0].Direction: got %v, want DirectionDesc", stmt.Columns[0].Direction)
		}
	})

	t.Run("multiple columns mixed directions", func(t *testing.T) {
		stmt := mustParseCreateIndex(t, "create index ix on t (a asc, b desc, c);")
		if len(stmt.Columns) != 3 {
			t.Fatalf("Columns: got %d, want 3", len(stmt.Columns))
		}
		wantDirs := []Direction{DirectionAsc, DirectionDesc, DirectionNone}
		wantNames := []string{"a", "b", "c"}
		for i, d := range wantDirs {
			if stmt.Columns[i].Direction != d {
				t.Errorf("Columns[%d].Direction: got %v, want %v", i, stmt.Columns[i].Direction, d)
			}
			if stmt.Columns[i].Name != wantNames[i] {
				t.Errorf("Columns[%d].Name: got %q, want %q", i, stmt.Columns[i].Name, wantNames[i])
			}
		}
	})

	// ── Error cases ───────────────────────────────────────────────────────────

	t.Run("missing on keyword", func(t *testing.T) {
		result := Parse("create index ix_name orders (id);")
		if len(result.Errors) == 0 {
			t.Error("expected parse errors for missing ON keyword, got none")
		}
	})

	t.Run("empty column list", func(t *testing.T) {
		result := Parse("create index ix on t ();")
		if len(result.Errors) == 0 {
			t.Error("expected parse errors for empty column list, got none")
		}
	})
}

// ─── parseAlterTableAction tests ─────────────────────────────────────────────

func mustParseAlterTable(t *testing.T, sql string) *AlterTableStmt {
	t.Helper()
	result := Parse(sql)
	if len(result.Errors) > 0 {
		t.Fatalf("Parse(%q): unexpected errors: %v", sql, result.Errors)
	}
	if len(result.Statements) != 1 {
		t.Fatalf("Parse(%q): expected 1 statement, got %d", sql, len(result.Statements))
	}
	stmt, ok := result.Statements[0].(*AlterTableStmt)
	if !ok {
		t.Fatalf("Parse(%q): expected *AlterTableStmt, got %T", sql, result.Statements[0])
	}
	return stmt
}

func TestParseAlterTableAction(t *testing.T) {
	// ── ADD COLUMN ────────────────────────────────────────────────────────────

	t.Run("add column basic", func(t *testing.T) {
		stmt := mustParseAlterTable(t, "alter table orders add column status varchar(20) not null;")
		if stmt.Name != "orders" {
			t.Errorf("Name: got %q, want %q", stmt.Name, "orders")
		}
		if stmt.Action.Type != AlterAddColumn {
			t.Fatalf("Action.Type: got %v, want AlterAddColumn", stmt.Action.Type)
		}
		col := stmt.Action.Column
		if col == nil {
			t.Fatal("Action.Column: got nil")
		}
		if col.Name != "status" {
			t.Errorf("Column.Name: got %q, want %q", col.Name, "status")
		}
		if col.DataType != "VARCHAR(20)" {
			t.Errorf("Column.DataType: got %q, want %q", col.DataType, "VARCHAR(20)")
		}
		if col.Nullability != NullabilityNotNull {
			t.Errorf("Column.Nullability: got %v, want NullabilityNotNull", col.Nullability)
		}
	})

	t.Run("add column with identity", func(t *testing.T) {
		stmt := mustParseAlterTable(t, "alter table t add column id int identity(1,1) not null;")
		col := stmt.Action.Column
		if col == nil {
			t.Fatal("Action.Column: got nil")
		}
		if col.Identity == nil {
			t.Fatal("Column.Identity: got nil, want non-nil")
		}
		if col.Identity.Seed != "1" || col.Identity.Increment != "1" {
			t.Errorf("Column.Identity: got {%q,%q}, want {1,1}", col.Identity.Seed, col.Identity.Increment)
		}
	})

	t.Run("add column with default", func(t *testing.T) {
		stmt := mustParseAlterTable(t, "alter table t add column active bit not null default 1;")
		col := stmt.Action.Column
		if col == nil {
			t.Fatal("Action.Column: got nil")
		}
		if renderExpr(col.Default) != "1" {
			t.Errorf("Column.Default: got %q, want %q", renderExpr(col.Default), "1")
		}
	})

	// ── ADD CONSTRAINT ────────────────────────────────────────────────────────

	t.Run("add named primary key constraint", func(t *testing.T) {
		stmt := mustParseAlterTable(t, "alter table t add constraint pk_t primary key (id);")
		if stmt.Action.Type != AlterAddConstraint {
			t.Fatalf("Action.Type: got %v, want AlterAddConstraint", stmt.Action.Type)
		}
		tc := stmt.Action.Constraint
		if tc == nil {
			t.Fatal("Action.Constraint: got nil")
		}
		if tc.Name != "pk_t" {
			t.Errorf("Constraint.Name: got %q, want %q", tc.Name, "pk_t")
		}
		if tc.Type != ConstraintPrimaryKey {
			t.Errorf("Constraint.Type: got %v, want ConstraintPrimaryKey", tc.Type)
		}
	})

	t.Run("add unnamed foreign key constraint", func(t *testing.T) {
		stmt := mustParseAlterTable(t, "alter table t add foreign key (user_id) references users (id);")
		if stmt.Action.Type != AlterAddConstraint {
			t.Fatalf("Action.Type: got %v, want AlterAddConstraint", stmt.Action.Type)
		}
		tc := stmt.Action.Constraint
		if tc == nil {
			t.Fatal("Action.Constraint: got nil")
		}
		if tc.Type != ConstraintForeignKey {
			t.Errorf("Constraint.Type: got %v, want ConstraintForeignKey", tc.Type)
		}
		if tc.RefTable != "users" {
			t.Errorf("Constraint.RefTable: got %q, want %q", tc.RefTable, "users")
		}
	})

	// ── DROP COLUMN ───────────────────────────────────────────────────────────

	t.Run("drop column", func(t *testing.T) {
		stmt := mustParseAlterTable(t, "alter table orders drop column status;")
		if stmt.Action.Type != AlterDropColumn {
			t.Fatalf("Action.Type: got %v, want AlterDropColumn", stmt.Action.Type)
		}
		if stmt.Action.ColumnName != "status" {
			t.Errorf("Action.ColumnName: got %q, want %q", stmt.Action.ColumnName, "status")
		}
	})

	// ── DROP CONSTRAINT ───────────────────────────────────────────────────────

	t.Run("drop constraint", func(t *testing.T) {
		stmt := mustParseAlterTable(t, "alter table orders drop constraint pk_orders;")
		if stmt.Action.Type != AlterDropConstraint {
			t.Fatalf("Action.Type: got %v, want AlterDropConstraint", stmt.Action.Type)
		}
		if stmt.Action.ConstraintName != "pk_orders" {
			t.Errorf("Action.ConstraintName: got %q, want %q", stmt.Action.ConstraintName, "pk_orders")
		}
	})

	// ── RENAME ────────────────────────────────────────────────────────────────

	t.Run("rename table", func(t *testing.T) {
		stmt := mustParseAlterTable(t, "alter table orders rename to purchases;")
		if stmt.Action.Type != AlterRenameTable {
			t.Fatalf("Action.Type: got %v, want AlterRenameTable", stmt.Action.Type)
		}
		if stmt.Action.NewName != "purchases" {
			t.Errorf("Action.NewName: got %q, want %q", stmt.Action.NewName, "purchases")
		}
	})

	t.Run("rename column", func(t *testing.T) {
		stmt := mustParseAlterTable(t, "alter table orders rename column status to order_status;")
		if stmt.Action.Type != AlterRenameColumn {
			t.Fatalf("Action.Type: got %v, want AlterRenameColumn", stmt.Action.Type)
		}
		if stmt.Action.ColumnName != "status" {
			t.Errorf("Action.ColumnName: got %q, want %q", stmt.Action.ColumnName, "status")
		}
		if stmt.Action.NewName != "order_status" {
			t.Errorf("Action.NewName: got %q, want %q", stmt.Action.NewName, "order_status")
		}
	})

	// ── Error cases ───────────────────────────────────────────────────────────

	t.Run("unknown action keyword", func(t *testing.T) {
		result := Parse("alter table t modify column id int;")
		if len(result.Errors) == 0 {
			t.Error("expected parse errors for unknown action keyword, got none")
		}
	})

	t.Run("drop without column or constraint", func(t *testing.T) {
		result := Parse("alter table t drop index ix;")
		if len(result.Errors) == 0 {
			t.Error("expected parse errors for DROP without COLUMN or CONSTRAINT, got none")
		}
	})

	t.Run("rename without to or column", func(t *testing.T) {
		result := Parse("alter table t rename id to user_id;")
		if len(result.Errors) == 0 {
			t.Error("expected parse errors for RENAME without TO or COLUMN, got none")
		}
	})
}
