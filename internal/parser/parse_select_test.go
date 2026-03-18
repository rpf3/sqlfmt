package parser

import "testing"

// --- helpers -----------------------------------------------------------------

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

func parseWith(t *testing.T, sql string) *SelectStmt {
	t.Helper()
	return parseSelect(t, sql) // WITH statements also produce a *SelectStmt
}

// --- core SELECT tests --------------------------------------------------------

func TestParseSelectStar(t *testing.T) {
	stmt := parseSelect(t, "select * from orders;")

	if stmt.Distinct {
		t.Error("Distinct: got true, want false")
	}
	if len(stmt.Columns) != 1 {
		t.Fatalf("Columns: got %d, want 1", len(stmt.Columns))
	}
	if Render(stmt.Columns[0].Value) != "*" {
		t.Errorf("Columns[0].Value: got %q, want %q", Render(stmt.Columns[0].Value), "*")
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
	if Render(stmt.Columns[0].Value) != "t.id" {
		t.Errorf("Columns[0].Value: got %q, want %q", Render(stmt.Columns[0].Value), "t.id")
	}
	if Render(stmt.Columns[1].Value) != "t.name" || stmt.Columns[1].Alias != "customer_name" {
		t.Errorf("Columns[1]: got {Value:%q Alias:%q}", Render(stmt.Columns[1].Value), stmt.Columns[1].Alias)
	}
	if Render(stmt.Columns[2].Value) != "t.created_at" {
		t.Errorf("Columns[2].Value: got %q, want %q", Render(stmt.Columns[2].Value), "t.created_at")
	}
	if stmt.From.Name != "orders" || stmt.From.Alias != "t" {
		t.Errorf("From: got {Name:%q Alias:%q}", stmt.From.Name, stmt.From.Alias)
	}
	if Render(stmt.Where) != "t.status = 'active'" {
		t.Errorf("Where: got %q, want %q", Render(stmt.Where), "t.status = 'active'")
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

	if Render(stmt.Columns[1].Value) != "count(*)" || stmt.Columns[1].Alias != "order_count" {
		t.Errorf("Columns[1]: got {Value:%q Alias:%q}", Render(stmt.Columns[1].Value), stmt.Columns[1].Alias)
	}
	if Render(stmt.Columns[2].Value) != "sum(t.total_amount)" {
		t.Errorf("Columns[2].Value: got %q, want %q", Render(stmt.Columns[2].Value), "sum(t.total_amount)")
	}
	if len(stmt.GroupBy) != 1 || Render(stmt.GroupBy[0].Expr) != "t.status" {
		t.Errorf("GroupBy: got %v", stmt.GroupBy)
	}
	if Render(stmt.Having) != "count(*) > 10" {
		t.Errorf("Having: got %q, want %q", Render(stmt.Having), "count(*) > 10")
	}
}

func TestParseSelectOrderBy(t *testing.T) {
	stmt := parseSelect(t,
		"select t.id, t.created_at from orders as t order by t.created_at desc, t.id asc;",
	)

	if len(stmt.OrderBy) != 2 {
		t.Fatalf("OrderBy: got %d items, want 2", len(stmt.OrderBy))
	}
	if Render(stmt.OrderBy[0].Value) != "t.created_at" || stmt.OrderBy[0].Direction != DirectionDesc {
		t.Errorf("OrderBy[0]: got {Value:%q Dir:%v}", Render(stmt.OrderBy[0].Value), stmt.OrderBy[0].Direction)
	}
	if Render(stmt.OrderBy[1].Value) != "t.id" || stmt.OrderBy[1].Direction != DirectionAsc {
		t.Errorf("OrderBy[1]: got {Value:%q Dir:%v}", Render(stmt.OrderBy[1].Value), stmt.OrderBy[1].Direction)
	}
}

func TestParseSelectOffsetFetch(t *testing.T) {
	stmt := parseSelect(t,
		"select t.id, t.name from products as t order by t.name asc offset 40 rows fetch next 20 rows only;",
	)

	if len(stmt.OrderBy) != 1 || Render(stmt.OrderBy[0].Value) != "t.name" || stmt.OrderBy[0].Direction != DirectionAsc {
		t.Errorf("OrderBy: got %v", stmt.OrderBy)
	}
	if stmt.Offset != "40" {
		t.Errorf("Offset: got %q, want %q", stmt.Offset, "40")
	}
	if stmt.Fetch != "20" {
		t.Errorf("Fetch: got %q, want %q", stmt.Fetch, "20")
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
	if Render(stmt.Columns[1].Value) != want {
		t.Errorf("Columns[1].Value:\ngot  %q\nwant %q", Render(stmt.Columns[1].Value), want)
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

func TestParseSelectWhereInSubquery(t *testing.T) {
	stmt := parseSelect(t,
		"select t.id, t.name from customers as t where t.id in (select o.customer_id from orders as o where o.status = 'active');",
	)

	if stmt.Where != nil {
		t.Errorf("Where: got %q, want nil", Render(stmt.Where))
	}
	if stmt.WherePred != "t.id in" {
		t.Errorf("WherePred: got %q, want %q", stmt.WherePred, "t.id in")
	}
	if stmt.WhereSubq == nil {
		t.Fatal("WhereSubq: got nil, want non-nil")
	}
	if len(stmt.WhereSubq.Columns) != 1 || Render(stmt.WhereSubq.Columns[0].Value) != "o.customer_id" {
		t.Errorf("WhereSubq.Columns[0].Value: got %v", stmt.WhereSubq.Columns)
	}
	if stmt.WhereSubq.From.Name != "orders" || stmt.WhereSubq.From.Alias != "o" {
		t.Errorf("WhereSubq.From: got {Name:%q Alias:%q}", stmt.WhereSubq.From.Name, stmt.WhereSubq.From.Alias)
	}
	if Render(stmt.WhereSubq.Where) != "o.status = 'active'" {
		t.Errorf("WhereSubq.Where: got %q, want %q", Render(stmt.WhereSubq.Where), "o.status = 'active'")
	}
}

func TestParseSelectWhereExistsSubquery(t *testing.T) {
	stmt := parseSelect(t,
		"select t.id from customers as t where exists (select 1 from orders as o where o.customer_id = t.id);",
	)

	if stmt.Where != nil {
		t.Errorf("Where: got %q, want nil", Render(stmt.Where))
	}
	if stmt.WherePred != "exists" {
		t.Errorf("WherePred: got %q, want %q", stmt.WherePred, "exists")
	}
	if stmt.WhereSubq == nil {
		t.Fatal("WhereSubq: got nil, want non-nil")
	}
	if len(stmt.WhereSubq.Columns) != 1 || Render(stmt.WhereSubq.Columns[0].Value) != "1" {
		t.Errorf("WhereSubq.Columns[0].Value: got %v", stmt.WhereSubq.Columns)
	}
	if stmt.WhereSubq.From.Name != "orders" || stmt.WhereSubq.From.Alias != "o" {
		t.Errorf("WhereSubq.From: got {Name:%q Alias:%q}", stmt.WhereSubq.From.Name, stmt.WhereSubq.From.Alias)
	}
	if Render(stmt.WhereSubq.Where) != "o.customer_id = t.id" {
		t.Errorf("WhereSubq.Where: got %q, want %q", Render(stmt.WhereSubq.Where), "o.customer_id = t.id")
	}
}

func TestParseSelectFromSubquery(t *testing.T) {
	stmt := parseSelect(t,
		"select s.status, s.order_count from (select t.status, count(*) as order_count from orders as t group by t.status) as s where s.order_count > 5;",
	)

	if stmt.From.Name != "" {
		t.Errorf("From.Name: got %q, want empty", stmt.From.Name)
	}
	if stmt.From.Alias != "s" {
		t.Errorf("From.Alias: got %q, want %q", stmt.From.Alias, "s")
	}
	subq := stmt.From.Subquery
	if subq == nil {
		t.Fatal("From.Subquery: got nil, want non-nil")
	}
	if len(subq.Columns) != 2 {
		t.Fatalf("Subquery.Columns: got %d, want 2", len(subq.Columns))
	}
	if Render(subq.Columns[0].Value) != "t.status" {
		t.Errorf("Subquery.Columns[0].Value: got %q, want %q", Render(subq.Columns[0].Value), "t.status")
	}
	if Render(subq.Columns[1].Value) != "count(*)" || subq.Columns[1].Alias != "order_count" {
		t.Errorf("Subquery.Columns[1]: got {Value:%q Alias:%q}", Render(subq.Columns[1].Value), subq.Columns[1].Alias)
	}
	if subq.From.Name != "orders" || subq.From.Alias != "t" {
		t.Errorf("Subquery.From: got {Name:%q Alias:%q}", subq.From.Name, subq.From.Alias)
	}
	if len(subq.GroupBy) != 1 || Render(subq.GroupBy[0].Expr) != "t.status" {
		t.Errorf("Subquery.GroupBy: got %v", subq.GroupBy)
	}
	if Render(stmt.Where) != "s.order_count > 5" {
		t.Errorf("Where: got %q, want %q", Render(stmt.Where), "s.order_count > 5")
	}
}

func TestParseSelectGroupByMultiple(t *testing.T) {
	stmt := parseSelect(t,
		"select c.id, c.name, sum(o.total_amount) as lifetime_value from customers as c group by c.id, c.name;",
	)

	if len(stmt.GroupBy) != 2 {
		t.Fatalf("GroupBy: got %d items, want 2", len(stmt.GroupBy))
	}
	if Render(stmt.GroupBy[0].Expr) != "c.id" {
		t.Errorf("GroupBy[0]: got %q, want %q", Render(stmt.GroupBy[0].Expr), "c.id")
	}
	if Render(stmt.GroupBy[1].Expr) != "c.name" {
		t.Errorf("GroupBy[1]: got %q, want %q", Render(stmt.GroupBy[1].Expr), "c.name")
	}
}

// --- JOIN tests ---------------------------------------------------------------

func TestParseSelectInnerJoin(t *testing.T) {
	stmt := parseSelect(t,
		"select o.id, c.name from orders as o inner join customers as c on c.id = o.customer_id where o.status = 'active';",
	)

	if len(stmt.Joins) != 1 {
		t.Fatalf("Joins: got %d, want 1", len(stmt.Joins))
	}
	jc := stmt.Joins[0]
	if jc.Type != JoinInner {
		t.Errorf("Type: got %v, want JoinInner", jc.Type)
	}
	if jc.Name != "customers" {
		t.Errorf("Name: got %q, want %q", jc.Name, "customers")
	}
	if jc.Alias != "c" {
		t.Errorf("Alias: got %q, want %q", jc.Alias, "c")
	}
	if Render(jc.On) != "c.id = o.customer_id" {
		t.Errorf("On: got %q, want %q", Render(jc.On), "c.id = o.customer_id")
	}
	if Render(stmt.Where) != "o.status = 'active'" {
		t.Errorf("Where: got %q", Render(stmt.Where))
	}
}

func TestParseSelectBareJoin(t *testing.T) {
	// bare JOIN (without INNER) should be treated as INNER JOIN
	stmt := parseSelect(t,
		"select * from orders as o join customers as c on c.id = o.customer_id;",
	)

	if len(stmt.Joins) != 1 || stmt.Joins[0].Type != JoinInner {
		t.Fatalf("expected 1 JoinInner, got %v", stmt.Joins)
	}
}

func TestParseSelectLeftJoin(t *testing.T) {
	stmt := parseSelect(t,
		"select c.id, c.name, o.total_amount from customers as c left join orders as o on o.customer_id = c.id;",
	)

	if len(stmt.Joins) != 1 {
		t.Fatalf("Joins: got %d, want 1", len(stmt.Joins))
	}
	if stmt.Joins[0].Type != JoinLeft {
		t.Errorf("Type: got %v, want JoinLeft", stmt.Joins[0].Type)
	}
	if Render(stmt.Joins[0].On) != "o.customer_id = c.id" {
		t.Errorf("On: got %q", Render(stmt.Joins[0].On))
	}
}

func TestParseSelectRightJoin(t *testing.T) {
	stmt := parseSelect(t,
		"select o.id, c.name from orders as o right join customers as c on c.id = o.customer_id;",
	)

	if len(stmt.Joins) != 1 || stmt.Joins[0].Type != JoinRight {
		t.Errorf("expected JoinRight, got %v", stmt.Joins)
	}
}

func TestParseSelectFullOuterJoin(t *testing.T) {
	stmt := parseSelect(t,
		"select o.id, c.name from orders as o full outer join customers as c on c.id = o.customer_id;",
	)

	if len(stmt.Joins) != 1 || stmt.Joins[0].Type != JoinFullOuter {
		t.Errorf("expected JoinFullOuter, got %v", stmt.Joins)
	}
}

func TestParseSelectCrossJoin(t *testing.T) {
	stmt := parseSelect(t,
		"select s.name as size, c.name as colour from sizes as s cross join colours as c;",
	)

	if len(stmt.Joins) != 1 {
		t.Fatalf("Joins: got %d, want 1", len(stmt.Joins))
	}
	jc := stmt.Joins[0]
	if jc.Type != JoinCross {
		t.Errorf("Type: got %v, want JoinCross", jc.Type)
	}
	if jc.On != nil {
		t.Errorf("On: expected nil, got %q", Render(jc.On))
	}
}

func TestParseSelectMultipleJoins(t *testing.T) {
	sql := `select o.id, c.name, p.name from orders as o
		inner join customers as c on c.id = o.customer_id
		inner join order_items as oi on oi.order_id = o.id
		inner join products as p on p.id = oi.product_id;`
	stmt := parseSelect(t, sql)

	if len(stmt.Joins) != 3 {
		t.Fatalf("Joins: got %d, want 3", len(stmt.Joins))
	}
	names := []string{"customers", "order_items", "products"}
	for i, want := range names {
		if stmt.Joins[i].Name != want {
			t.Errorf("Joins[%d].Name: got %q, want %q", i, stmt.Joins[i].Name, want)
		}
	}
}

// --- CTE tests ----------------------------------------------------------------

func TestParseCTESingle(t *testing.T) {
	sql := "with active_orders as (select t.id, t.customer_id, t.total_amount from orders as t where t.status = 'active') select c.name, sum(o.total_amount) as lifetime_value from active_orders as o inner join customers as c on c.id = o.customer_id group by c.name order by lifetime_value desc;"
	stmt := parseWith(t, sql)

	if len(stmt.CTEs) != 1 {
		t.Fatalf("CTEs: got %d, want 1", len(stmt.CTEs))
	}
	cte := stmt.CTEs[0]
	if cte.Name != "active_orders" {
		t.Errorf("CTEs[0].Name: got %q, want %q", cte.Name, "active_orders")
	}
	if cte.Select == nil {
		t.Fatal("CTEs[0].Select: got nil, want non-nil")
	}
	if len(cte.Select.Columns) != 3 {
		t.Fatalf("CTEs[0].Columns: got %d, want 3", len(cte.Select.Columns))
	}
	if Render(cte.Select.Where) != "t.status = 'active'" {
		t.Errorf("CTEs[0].Where: got %q, want %q", Render(cte.Select.Where), "t.status = 'active'")
	}
	// main SELECT
	if len(stmt.Columns) != 2 {
		t.Fatalf("main Columns: got %d, want 2", len(stmt.Columns))
	}
	if stmt.From.Name != "active_orders" || stmt.From.Alias != "o" {
		t.Errorf("main From: got {Name:%q Alias:%q}", stmt.From.Name, stmt.From.Alias)
	}
	if len(stmt.Joins) != 1 || stmt.Joins[0].Name != "customers" {
		t.Errorf("main Joins: got %v", stmt.Joins)
	}
	if len(stmt.GroupBy) != 1 || Render(stmt.GroupBy[0].Expr) != "c.name" {
		t.Errorf("main GroupBy: got %v", stmt.GroupBy)
	}
	if len(stmt.OrderBy) != 1 || Render(stmt.OrderBy[0].Value) != "lifetime_value" || stmt.OrderBy[0].Direction != DirectionDesc {
		t.Errorf("main OrderBy: got %v", stmt.OrderBy)
	}
}

func TestParseCTEMultiple(t *testing.T) {
	sql := "with active_orders as (select t.id, t.customer_id from orders as t where t.status = 'active'), order_totals as (select t.customer_id, count(*) as order_count from active_orders as t group by t.customer_id) select c.name, ot.order_count from order_totals as ot inner join customers as c on c.id = ot.customer_id;"
	stmt := parseWith(t, sql)

	if len(stmt.CTEs) != 2 {
		t.Fatalf("CTEs: got %d, want 2", len(stmt.CTEs))
	}
	if stmt.CTEs[0].Name != "active_orders" {
		t.Errorf("CTEs[0].Name: got %q, want %q", stmt.CTEs[0].Name, "active_orders")
	}
	if stmt.CTEs[1].Name != "order_totals" {
		t.Errorf("CTEs[1].Name: got %q, want %q", stmt.CTEs[1].Name, "order_totals")
	}
	if stmt.CTEs[1].Select == nil {
		t.Fatal("CTEs[1].Select: got nil, want non-nil")
	}
	if len(stmt.CTEs[1].Select.GroupBy) != 1 || Render(stmt.CTEs[1].Select.GroupBy[0].Expr) != "t.customer_id" {
		t.Errorf("CTEs[1].GroupBy: got %v", stmt.CTEs[1].Select.GroupBy)
	}
	// main SELECT
	if stmt.From.Name != "order_totals" {
		t.Errorf("main From.Name: got %q, want %q", stmt.From.Name, "order_totals")
	}
}
