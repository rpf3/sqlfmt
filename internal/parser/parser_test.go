package parser

import "testing"

// ─── helpers ─────────────────────────────────────────────────────────────────

func parseSelect(t *testing.T, sql string) *SelectStmt {
	t.Helper()
	result := Parse(sql)
	if len(result.Errors) > 0 {
		t.Fatalf("unexpected parse errors: %v", result.Errors)
	}
	if len(result.Statements) != 1 {
		t.Fatalf("expected 1 statement, got %d", len(result.Statements))
	}
	stmt, ok := result.Statements[0].(*SelectStmt)
	if !ok {
		t.Fatalf("expected *SelectStmt, got %T", result.Statements[0])
	}
	return stmt
}

// ─── core SELECT tests ────────────────────────────────────────────────────────

func TestParseSelectStar(t *testing.T) {
	stmt := parseSelect(t, "select * from orders;")

	if stmt.Distinct {
		t.Error("Distinct: got true, want false")
	}
	if len(stmt.Columns) != 1 {
		t.Fatalf("Columns: got %d, want 1", len(stmt.Columns))
	}
	if stmt.Columns[0].Expr != "*" {
		t.Errorf("Columns[0].Expr: got %q, want %q", stmt.Columns[0].Expr, "*")
	}
	if stmt.Columns[0].Alias != "" {
		t.Errorf("Columns[0].Alias: got %q, want empty", stmt.Columns[0].Alias)
	}
	if stmt.From.Name != "orders" {
		t.Errorf("From.Name: got %q, want %q", stmt.From.Name, "orders")
	}
	if stmt.From.Alias != "" {
		t.Errorf("From.Alias: got %q, want empty", stmt.From.Alias)
	}
}

func TestParseSelectColumns(t *testing.T) {
	stmt := parseSelect(t,
		"select t.id, t.name as customer_name, t.created_at from orders as t where t.status = 'active';",
	)

	if len(stmt.Columns) != 3 {
		t.Fatalf("Columns: got %d, want 3", len(stmt.Columns))
	}
	if stmt.Columns[0].Expr != "t.id" {
		t.Errorf("Columns[0].Expr: got %q, want %q", stmt.Columns[0].Expr, "t.id")
	}
	if stmt.Columns[1].Expr != "t.name" || stmt.Columns[1].Alias != "customer_name" {
		t.Errorf("Columns[1]: got {Expr:%q Alias:%q}", stmt.Columns[1].Expr, stmt.Columns[1].Alias)
	}
	if stmt.Columns[2].Expr != "t.created_at" {
		t.Errorf("Columns[2].Expr: got %q, want %q", stmt.Columns[2].Expr, "t.created_at")
	}
	if stmt.From.Name != "orders" || stmt.From.Alias != "t" {
		t.Errorf("From: got {Name:%q Alias:%q}", stmt.From.Name, stmt.From.Alias)
	}
	if stmt.Where != "t.status = 'active'" {
		t.Errorf("Where: got %q, want %q", stmt.Where, "t.status = 'active'")
	}
}

func TestParseSelectDistinct(t *testing.T) {
	stmt := parseSelect(t, "select distinct t.customer_id, t.status from orders as t;")

	if !stmt.Distinct {
		t.Error("Distinct: got false, want true")
	}
	if len(stmt.Columns) != 2 {
		t.Fatalf("Columns: got %d, want 2", len(stmt.Columns))
	}
}

func TestParseSelectGroupByHaving(t *testing.T) {
	stmt := parseSelect(t,
		"select t.status, count(*) as order_count, sum(t.total_amount) as total "+
			"from orders as t group by t.status having count(*) > 10;",
	)

	if stmt.Columns[1].Expr != "count(*)" || stmt.Columns[1].Alias != "order_count" {
		t.Errorf("Columns[1]: got {Expr:%q Alias:%q}", stmt.Columns[1].Expr, stmt.Columns[1].Alias)
	}
	if stmt.Columns[2].Expr != "sum(t.total_amount)" {
		t.Errorf("Columns[2].Expr: got %q, want %q", stmt.Columns[2].Expr, "sum(t.total_amount)")
	}
	if len(stmt.GroupBy) != 1 || stmt.GroupBy[0] != "t.status" {
		t.Errorf("GroupBy: got %v", stmt.GroupBy)
	}
	if stmt.Having != "count(*) > 10" {
		t.Errorf("Having: got %q, want %q", stmt.Having, "count(*) > 10")
	}
}

func TestParseSelectOrderBy(t *testing.T) {
	stmt := parseSelect(t,
		"select t.id, t.created_at from orders as t order by t.created_at desc, t.id asc;",
	)

	if len(stmt.OrderBy) != 2 {
		t.Fatalf("OrderBy: got %d items, want 2", len(stmt.OrderBy))
	}
	if stmt.OrderBy[0].Expr != "t.created_at" || stmt.OrderBy[0].Direction != DirectionDesc {
		t.Errorf("OrderBy[0]: got {Expr:%q Dir:%v}", stmt.OrderBy[0].Expr, stmt.OrderBy[0].Direction)
	}
	if stmt.OrderBy[1].Expr != "t.id" || stmt.OrderBy[1].Direction != DirectionAsc {
		t.Errorf("OrderBy[1]: got {Expr:%q Dir:%v}", stmt.OrderBy[1].Expr, stmt.OrderBy[1].Direction)
	}
}

func TestParseSelectOffsetFetch(t *testing.T) {
	stmt := parseSelect(t,
		"select t.id, t.name from products as t order by t.name asc offset 40 rows fetch next 20 rows only;",
	)

	if len(stmt.OrderBy) != 1 || stmt.OrderBy[0].Expr != "t.name" || stmt.OrderBy[0].Direction != DirectionAsc {
		t.Errorf("OrderBy: got %v", stmt.OrderBy)
	}
	if stmt.Offset != "40" {
		t.Errorf("Offset: got %q, want %q", stmt.Offset, "40")
	}
	if stmt.Fetch != "20" {
		t.Errorf("Fetch: got %q, want %q", stmt.Fetch, "20")
	}
}

func TestParseSelectLimit(t *testing.T) {
	stmt := parseSelect(t, "select * from orders limit 10;")

	if stmt.Limit != "10" {
		t.Errorf("Limit: got %q, want %q", stmt.Limit, "10")
	}
	if stmt.Fetch != "" {
		t.Errorf("Fetch: got %q, want empty", stmt.Fetch)
	}
}

func TestParseSelectWindowFunction(t *testing.T) {
	stmt := parseSelect(t,
		"select t.id, row_number() over (partition by t.customer_id order by t.created_at desc) as rn from orders as t;",
	)

	if len(stmt.Columns) != 2 {
		t.Fatalf("Columns: got %d, want 2", len(stmt.Columns))
	}
	want := "row_number() over (partition by t.customer_id order by t.created_at desc)"
	if stmt.Columns[1].Expr != want {
		t.Errorf("Columns[1].Expr:\ngot  %q\nwant %q", stmt.Columns[1].Expr, want)
	}
	if stmt.Columns[1].Alias != "rn" {
		t.Errorf("Columns[1].Alias: got %q, want %q", stmt.Columns[1].Alias, "rn")
	}
}

func TestParseSelectBareAlias(t *testing.T) {
	stmt := parseSelect(t, "select * from orders t;")

	if stmt.From.Alias != "t" {
		t.Errorf("From.Alias (bare): got %q, want %q", stmt.From.Alias, "t")
	}
}

func TestParseSelectMultipleStatements(t *testing.T) {
	result := Parse("select * from a; select * from b;")
	if len(result.Errors) > 0 {
		t.Fatalf("unexpected errors: %v", result.Errors)
	}
	if len(result.Statements) != 2 {
		t.Fatalf("expected 2 statements, got %d", len(result.Statements))
	}
	stmt1 := result.Statements[0].(*SelectStmt)
	stmt2 := result.Statements[1].(*SelectStmt)
	if stmt1.From.Name != "a" {
		t.Errorf("stmt1 From.Name: got %q, want %q", stmt1.From.Name, "a")
	}
	if stmt2.From.Name != "b" {
		t.Errorf("stmt2 From.Name: got %q, want %q", stmt2.From.Name, "b")
	}
}

func TestParseSelectMixedWithCreateTable(t *testing.T) {
	sql := "create table t (id integer not null); select * from t;"
	result := Parse(sql)
	if len(result.Errors) > 0 {
		t.Fatalf("unexpected errors: %v", result.Errors)
	}
	if len(result.Statements) != 2 {
		t.Fatalf("expected 2 statements, got %d", len(result.Statements))
	}
	if _, ok := result.Statements[0].(*CreateTableStmt); !ok {
		t.Errorf("stmt[0]: expected *CreateTableStmt, got %T", result.Statements[0])
	}
	if _, ok := result.Statements[1].(*SelectStmt); !ok {
		t.Errorf("stmt[1]: expected *SelectStmt, got %T", result.Statements[1])
	}
}

func TestParseSelectSubqueryInWhereRaw(t *testing.T) {
	// Subqueries are captured as raw strings until #42 adds structured parsing.
	stmt := parseSelect(t,
		"select t.id, t.name from customers as t where t.id in (select o.customer_id from orders as o where o.status = 'active');",
	)

	want := "t.id in (select o.customer_id from orders as o where o.status = 'active')"
	if stmt.Where != want {
		t.Errorf("Where:\ngot  %q\nwant %q", stmt.Where, want)
	}
}

func TestParseSelectExistsInWhereRaw(t *testing.T) {
	stmt := parseSelect(t,
		"select t.id from customers as t where exists (select 1 from orders as o where o.customer_id = t.id);",
	)

	want := "exists (select 1 from orders as o where o.customer_id = t.id)"
	if stmt.Where != want {
		t.Errorf("Where:\ngot  %q\nwant %q", stmt.Where, want)
	}
}

func TestParseSelectGroupByMultiple(t *testing.T) {
	stmt := parseSelect(t,
		"select c.id, c.name, sum(o.total_amount) as lifetime_value from customers as c group by c.id, c.name;",
	)

	if len(stmt.GroupBy) != 2 {
		t.Fatalf("GroupBy: got %d items, want 2", len(stmt.GroupBy))
	}
	if stmt.GroupBy[0] != "c.id" {
		t.Errorf("GroupBy[0]: got %q, want %q", stmt.GroupBy[0], "c.id")
	}
	if stmt.GroupBy[1] != "c.name" {
		t.Errorf("GroupBy[1]: got %q, want %q", stmt.GroupBy[1], "c.name")
	}
}
