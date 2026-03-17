package formatter

import (
	"strings"
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

// TestFormatSelectStar verifies the minimal SELECT * FROM table form.
func TestFormatSelectStar(t *testing.T) {
	got, err := Format("select * from orders;", config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	want := "select\n\t*\nfrom\n\torders;\n"
	if got != want {
		t.Errorf("Format() mismatch:\ngot:\n%s\nwant:\n%s", got, want)
	}
}

// TestFormatSelectColumns verifies column list with aliases and a WHERE clause.
func TestFormatSelectColumns(t *testing.T) {
	input := "SELECT t.id, t.name AS customer_name, t.created_at FROM orders AS t WHERE t.status = 'active';"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	lines := strings.Split(strings.TrimRight(got, "\n"), "\n")
	// first line: select
	if lines[0] != "select" {
		t.Errorf("line[0]: got %q, want %q", lines[0], "select")
	}
	// second line: first column (no leading comma)
	if lines[1] != "\tt.id" {
		t.Errorf("line[1]: got %q, want %q", lines[1], "\tt.id")
	}
	// third line: second column with leading comma and alias
	if lines[2] != ",\tt.name as customer_name" {
		t.Errorf("line[2]: got %q, want %q", lines[2], ",\tt.name as customer_name")
	}
	// from clause
	if !strings.Contains(got, "\nfrom\n\torders as t\n") {
		t.Errorf("missing canonical FROM line in:\n%s", got)
	}
	// where clause
	if !strings.Contains(got, "\nwhere\n\tt.status = 'active'") {
		t.Errorf("missing canonical WHERE line in:\n%s", got)
	}
}

// TestFormatSelectDistinct verifies DISTINCT is emitted on the select line.
func TestFormatSelectDistinct(t *testing.T) {
	got, err := Format("select distinct t.customer_id, t.status from orders as t;", config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if !strings.HasPrefix(got, "select distinct\n") {
		t.Errorf("expected 'select distinct' as first line, got:\n%s", got)
	}
}

// TestFormatSelectGroupByHaving verifies GROUP BY and HAVING formatting.
func TestFormatSelectGroupByHaving(t *testing.T) {
	input := "select t.status, count(*) as order_count from orders as t group by t.status having count(*) > 10;"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if !strings.Contains(got, "\ngroup by\n\tt.status\n") {
		t.Errorf("missing canonical GROUP BY in:\n%s", got)
	}
	if !strings.Contains(got, "\nhaving\n\tcount(*) > 10") {
		t.Errorf("missing canonical HAVING in:\n%s", got)
	}
}

// TestFormatSelectOrderBy verifies ORDER BY with explicit directions.
func TestFormatSelectOrderBy(t *testing.T) {
	input := "select t.id from orders as t order by t.created_at desc, t.id asc;"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if !strings.Contains(got, "\norder by\n\tt.created_at desc\n,\tt.id asc;") {
		t.Errorf("missing canonical ORDER BY in:\n%s", got)
	}
}

// TestFormatSelectOffsetFetch verifies OFFSET and FETCH NEXT formatting.
func TestFormatSelectOffsetFetch(t *testing.T) {
	input := "select t.id from products as t order by t.name asc offset 40 rows fetch next 20 rows only;"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if !strings.Contains(got, "\noffset\n\t40 rows\n") {
		t.Errorf("missing canonical OFFSET in:\n%s", got)
	}
	if !strings.Contains(got, "\nfetch next\n\t20 rows only;") {
		t.Errorf("missing canonical FETCH NEXT in:\n%s", got)
	}
}

// TestFormatSelectIdempotent verifies that formatting a SELECT twice is stable.
func TestFormatSelectIdempotent(t *testing.T) {
	inputs := []string{
		"select * from orders;",
		"select t.id, t.name as n from orders as t where t.status = 'active';",
		"select distinct t.x from t;",
		"select t.a, count(*) as n from t group by t.a having count(*) > 1 order by t.a desc;",
		"select t.id from t order by t.name asc offset 10 rows fetch next 5 rows only;",
	}
	for _, input := range inputs {
		t.Run(input, func(t *testing.T) {
			first, err := Format(input, config.Default())
			if err != nil {
				t.Fatalf("first pass error: %v", err)
			}
			second, err := Format(first, config.Default())
			if err != nil {
				t.Fatalf("second pass error: %v", err)
			}
			if first != second {
				t.Errorf("not idempotent:\nfirst:\n%s\nsecond:\n%s", first, second)
			}
		})
	}
}

// TestFormatSelectUpperKeywords verifies keyword case upper applies to SELECT clauses.
func TestFormatSelectUpperKeywords(t *testing.T) {
	cfg := config.Default()
	cfg.KeywordCase = config.KeywordUpper
	got, err := Format("select t.id, t.name as n from orders as t where t.id > 0 order by t.id desc;", cfg)
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	for _, kw := range []string{"SELECT", "FROM", "WHERE", "ORDER BY", "AS", "DESC"} {
		if !strings.Contains(got, kw) {
			t.Errorf("upper mode missing %q in:\n%s", kw, got)
		}
	}
}

// TestFormatSelectTrailingComma verifies trailing-comma style in SELECT list.
func TestFormatSelectTrailingComma(t *testing.T) {
	cfg := config.Default()
	cfg.CommaStyle = config.CommaTrailing
	got, err := Format("select t.id, t.name from orders as t;", cfg)
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	lines := strings.Split(strings.TrimRight(got, "\n"), "\n")
	var idLine, nameLine string
	for _, l := range lines {
		if strings.Contains(l, "\tt.id") {
			idLine = l
		}
		if strings.Contains(l, "\tt.name") {
			nameLine = l
		}
	}
	if !strings.HasSuffix(idLine, ",") {
		t.Errorf("trailing: id line should end with comma: %q", idLine)
	}
	if strings.HasSuffix(nameLine, ",") {
		t.Errorf("trailing: last column should not end with comma: %q", nameLine)
	}
}

// ─── JOIN formatting tests ────────────────────────────────────────────────────

// TestFormatSelectInnerJoin verifies the three-line JOIN block style.
func TestFormatSelectInnerJoin(t *testing.T) {
	input := "select o.id, c.name from orders as o inner join customers as c on c.id = o.customer_id where o.status = 'active';"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	// join keyword on its own line
	if !strings.Contains(got, "\ninner join\n") {
		t.Errorf("missing 'inner join' line in:\n%s", got)
	}
	// table indented one tab
	if !strings.Contains(got, "\n\tcustomers as c\n") {
		t.Errorf("missing indented table line in:\n%s", got)
	}
	// on condition double-indented
	if !strings.Contains(got, "\n\t\ton c.id = o.customer_id\n") {
		t.Errorf("missing double-indented ON line in:\n%s", got)
	}
}

// TestFormatSelectBareJoinNormalisedToInner verifies bare JOIN → "inner join".
func TestFormatSelectBareJoinNormalisedToInner(t *testing.T) {
	got, err := Format("select * from a join b on b.id = a.bid;", config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if !strings.Contains(got, "\ninner join\n") {
		t.Errorf("bare JOIN should normalise to 'inner join' in:\n%s", got)
	}
}

// TestFormatSelectFullOuterJoin verifies the full outer join keyword phrase.
func TestFormatSelectFullOuterJoin(t *testing.T) {
	input := "select o.id, c.name from orders as o full outer join customers as c on c.id = o.customer_id;"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if !strings.Contains(got, "\nfull outer join\n") {
		t.Errorf("missing 'full outer join' line in:\n%s", got)
	}
}

// TestFormatSelectCrossJoin verifies CROSS JOIN has no ON or USING line.
func TestFormatSelectCrossJoin(t *testing.T) {
	input := "select s.name, c.name from sizes as s cross join colours as c;"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if !strings.Contains(got, "\ncross join\n") {
		t.Errorf("missing 'cross join' line in:\n%s", got)
	}
	if strings.Contains(got, "\t\ton ") || strings.Contains(got, "\t\tusing") {
		t.Errorf("CROSS JOIN should have no ON/USING line in:\n%s", got)
	}
}

// TestFormatSelectMultipleJoins verifies consecutive JOIN blocks are all emitted.
func TestFormatSelectMultipleJoins(t *testing.T) {
	input := "select o.id from orders as o inner join customers as c on c.id = o.customer_id inner join products as p on p.id = o.product_id;"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if strings.Count(got, "inner join") != 2 {
		t.Errorf("expected 2 'inner join' occurrences in:\n%s", got)
	}
}

// TestFormatSelectJoinIdempotent verifies formatting a JOIN query twice is stable.
func TestFormatSelectJoinIdempotent(t *testing.T) {
	inputs := []string{
		"select o.id, c.name from orders as o inner join customers as c on c.id = o.customer_id;",
		"select s.name, c.name from sizes as s cross join colours as c;",
		"select o.id from orders as o left join items as i on i.order_id = o.id right join vendors as v on v.id = i.vendor_id;",
	}
	for _, input := range inputs {
		t.Run(input, func(t *testing.T) {
			first, err := Format(input, config.Default())
			if err != nil {
				t.Fatalf("first pass error: %v", err)
			}
			second, err := Format(first, config.Default())
			if err != nil {
				t.Fatalf("second pass error: %v", err)
			}
			if first != second {
				t.Errorf("not idempotent:\nfirst:\n%s\nsecond:\n%s", first, second)
			}
		})
	}
}

// ─── subquery tests ───────────────────────────────────────────────────────────

func TestFormatSelectFromSubquery(t *testing.T) {
	input := "select s.status, s.order_count from (select t.status, count(*) as order_count from orders as t group by t.status) as s where s.order_count > 5;"
	want := "select\n\ts.status\n,\ts.order_count\nfrom\n\t(\n\t\tselect\n\t\t\tt.status\n\t\t,\tcount(*) as order_count\n\t\tfrom\n\t\t\torders as t\n\t\tgroup by\n\t\t\tt.status\n\t) as s\nwhere\n\ts.order_count > 5;\n"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if got != want {
		t.Errorf("got:\n%s\nwant:\n%s", got, want)
	}
}

func TestFormatSelectWhereInSubquery(t *testing.T) {
	input := "select t.id, t.name from customers as t where t.id in (select o.customer_id from orders as o where o.status = 'active');"
	want := "select\n\tt.id\n,\tt.name\nfrom\n\tcustomers as t\nwhere\n\tt.id in\n\t(\n\t\tselect\n\t\t\to.customer_id\n\t\tfrom\n\t\t\torders as o\n\t\twhere\n\t\t\to.status = 'active'\n\t);\n"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if got != want {
		t.Errorf("got:\n%s\nwant:\n%s", got, want)
	}
}

func TestFormatSelectWhereExistsSubquery(t *testing.T) {
	input := "select t.id, t.name from customers as t where exists (select 1 from orders as o where o.customer_id = t.id);"
	want := "select\n\tt.id\n,\tt.name\nfrom\n\tcustomers as t\nwhere\n\texists\n\t(\n\t\tselect\n\t\t\t1\n\t\tfrom\n\t\t\torders as o\n\t\twhere\n\t\t\to.customer_id = t.id\n\t);\n"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if got != want {
		t.Errorf("got:\n%s\nwant:\n%s", got, want)
	}
}

// ─── CTE tests ────────────────────────────────────────────────────────────────

func TestFormatCTESingle(t *testing.T) {
	input := "with active_orders as (select t.id, t.customer_id, t.total_amount from orders as t where t.status = 'active') select c.name, sum(o.total_amount) as lifetime_value from active_orders as o inner join customers as c on c.id = o.customer_id group by c.name order by lifetime_value desc;"
	want := "with active_orders as\n(\n\tselect\n\t\tt.id\n\t,\tt.customer_id\n\t,\tt.total_amount\n\tfrom\n\t\torders as t\n\twhere\n\t\tt.status = 'active'\n)\nselect\n\tc.name\n,\tsum(o.total_amount) as lifetime_value\nfrom\n\tactive_orders as o\ninner join\n\tcustomers as c\n\t\ton c.id = o.customer_id\ngroup by\n\tc.name\norder by\n\tlifetime_value desc;\n"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if got != want {
		t.Errorf("got:\n%s\nwant:\n%s", got, want)
	}
}

func TestFormatCTEMultiple(t *testing.T) {
	input := "with active_orders as (select t.id, t.customer_id from orders as t where t.status = 'active'), order_totals as (select t.customer_id, count(*) as order_count from active_orders as t group by t.customer_id) select c.name, ot.order_count from order_totals as ot inner join customers as c on c.id = ot.customer_id;"
	want := "with active_orders as\n(\n\tselect\n\t\tt.id\n\t,\tt.customer_id\n\tfrom\n\t\torders as t\n\twhere\n\t\tt.status = 'active'\n)\n, order_totals as\n(\n\tselect\n\t\tt.customer_id\n\t,\tcount(*) as order_count\n\tfrom\n\t\tactive_orders as t\n\tgroup by\n\t\tt.customer_id\n)\nselect\n\tc.name\n,\tot.order_count\nfrom\n\torder_totals as ot\ninner join\n\tcustomers as c\n\t\ton c.id = ot.customer_id;\n"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if got != want {
		t.Errorf("got:\n%s\nwant:\n%s", got, want)
	}
}

func TestFormatCTEIdempotent(t *testing.T) {
	inputs := []string{
		"with active_orders as (select t.id, t.customer_id, t.total_amount from orders as t where t.status = 'active') select c.name, sum(o.total_amount) as lifetime_value from active_orders as o inner join customers as c on c.id = o.customer_id group by c.name order by lifetime_value desc;",
		"with active_orders as (select t.id, t.customer_id from orders as t where t.status = 'active'), order_totals as (select t.customer_id, count(*) as order_count from active_orders as t group by t.customer_id) select c.name, ot.order_count from order_totals as ot inner join customers as c on c.id = ot.customer_id;",
	}
	for _, input := range inputs {
		t.Run(input[:40], func(t *testing.T) {
			first, err := Format(input, config.Default())
			if err != nil {
				t.Fatalf("first pass error: %v", err)
			}
			second, err := Format(first, config.Default())
			if err != nil {
				t.Fatalf("second pass error: %v", err)
			}
			if first != second {
				t.Errorf("not idempotent:\nfirst:\n%s\nsecond:\n%s", first, second)
			}
		})
	}
}

func TestFormatSelectSubqueryIdempotent(t *testing.T) {
	inputs := []string{
		"select s.status, s.order_count from (select t.status, count(*) as order_count from orders as t group by t.status) as s where s.order_count > 5;",
		"select t.id, t.name from customers as t where t.id in (select o.customer_id from orders as o where o.status = 'active');",
		"select t.id from customers as t where exists (select 1 from orders as o where o.customer_id = t.id);",
	}
	for _, input := range inputs {
		t.Run(input[:40], func(t *testing.T) {
			first, err := Format(input, config.Default())
			if err != nil {
				t.Fatalf("first pass error: %v", err)
			}
			second, err := Format(first, config.Default())
			if err != nil {
				t.Fatalf("second pass error: %v", err)
			}
			if first != second {
				t.Errorf("not idempotent:\nfirst:\n%s\nsecond:\n%s", first, second)
			}
		})
	}
}

// ─── window function tests ────────────────────────────────────────────────────

// TestFormatSelectWindowFunction verifies window functions with PARTITION BY
// and ORDER BY format as a single normalised expression on one column line.
func TestFormatSelectWindowFunction(t *testing.T) {
	input := "select t.id, t.customer_id, t.total_amount, row_number() OVER (PARTITION BY t.customer_id ORDER BY t.created_at DESC) as rn from orders as t;"
	want := "select\n\tt.id\n,\tt.customer_id\n,\tt.total_amount\n,\trow_number() over (partition by t.customer_id order by t.created_at desc) as rn\nfrom\n\torders as t;\n"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if got != want {
		t.Errorf("got:\n%s\nwant:\n%s", got, want)
	}
}

// TestFormatSelectWindowFunctionNoPartition verifies a window function that
// omits PARTITION BY (ORDER BY only) also formats correctly.
func TestFormatSelectWindowFunctionNoPartition(t *testing.T) {
	input := "select t.id, t.total_amount, rank() OVER (ORDER BY t.total_amount DESC) as amount_rank from orders as t;"
	want := "select\n\tt.id\n,\tt.total_amount\n,\trank() over (order by t.total_amount desc) as amount_rank\nfrom\n\torders as t;\n"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if got != want {
		t.Errorf("got:\n%s\nwant:\n%s", got, want)
	}
}

// TestFormatSelectKitchenSink verifies a query exercising DISTINCT, aggregate
// functions, window functions, JOIN, WHERE with comparison operators, GROUP BY,
// HAVING, ORDER BY, and FETCH NEXT all format correctly together.
func TestFormatSelectKitchenSink(t *testing.T) {
	input := "select distinct c.id, c.name as customer_name, sum(o.total_amount) as lifetime_value, count(o.id) as order_count, row_number() over (order by sum(o.total_amount) desc) as value_rank from customers as c inner join orders as o on o.customer_id = c.id where c.created_at >= '2024-01-01' group by c.id, c.name having sum(o.total_amount) > 1000 order by lifetime_value desc fetch next 100 rows only;"
	want := "select distinct\n\tc.id\n,\tc.name as customer_name\n,\tsum(o.total_amount) as lifetime_value\n,\tcount(o.id) as order_count\n,\trow_number() over (order by sum(o.total_amount) desc) as value_rank\nfrom\n\tcustomers as c\ninner join\n\torders as o\n\t\ton o.customer_id = c.id\nwhere\n\tc.created_at >= '2024-01-01'\ngroup by\n\tc.id\n,\tc.name\nhaving\n\tsum(o.total_amount) > 1000\norder by\n\tlifetime_value desc\nfetch next\n\t100 rows only;\n"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if got != want {
		t.Errorf("got:\n%s\nwant:\n%s", got, want)
	}
}

func TestFormatSelectWindowFunctionIdempotent(t *testing.T) {
	inputs := []string{
		"select t.id, t.customer_id, t.total_amount, row_number() OVER (PARTITION BY t.customer_id ORDER BY t.created_at DESC) as rn from orders as t;",
		"select t.id, t.total_amount, rank() OVER (ORDER BY t.total_amount DESC) as amount_rank from orders as t;",
		"select distinct c.id, c.name as customer_name, sum(o.total_amount) as lifetime_value, count(o.id) as order_count, row_number() over (order by sum(o.total_amount) desc) as value_rank from customers as c inner join orders as o on o.customer_id = c.id where c.created_at >= '2024-01-01' group by c.id, c.name having sum(o.total_amount) > 1000 order by lifetime_value desc fetch next 100 rows only;",
	}
	for _, input := range inputs {
		t.Run(input[:40], func(t *testing.T) {
			first, err := Format(input, config.Default())
			if err != nil {
				t.Fatalf("first pass error: %v", err)
			}
			second, err := Format(first, config.Default())
			if err != nil {
				t.Fatalf("second pass error: %v", err)
			}
			if first != second {
				t.Errorf("not idempotent:\nfirst:\n%s\nsecond:\n%s", first, second)
			}
		})
	}
}

// TestFormatSelectJSONFunctions verifies that SQL Server 2016+ JSON functions
// are lowercased and have no space before their opening parenthesis.
func TestFormatSelectJSONFunctions(t *testing.T) {
	cases := []struct {
		name  string
		input string
		want  string
	}{
		{
			name:  "JSON_VALUE in SELECT list",
			input: "SELECT JSON_VALUE(doc, '$.name') AS name FROM t;",
			want:  "select\n\tjson_value(doc, '$.name') as name\nfrom\n\tt;\n",
		},
		{
			name:  "JSON_QUERY in SELECT list",
			input: "SELECT JSON_QUERY(doc, '$.address') AS addr FROM t;",
			want:  "select\n\tjson_query(doc, '$.address') as addr\nfrom\n\tt;\n",
		},
		{
			name:  "JSON_MODIFY in SELECT list",
			input: "SELECT JSON_MODIFY(doc, '$.name', 'new') AS updated FROM t;",
			want:  "select\n\tjson_modify(doc, '$.name', 'new') as updated\nfrom\n\tt;\n",
		},
		{
			name:  "ISJSON in WHERE clause",
			input: "SELECT id FROM t WHERE ISJSON(doc) = 1;",
			want:  "select\n\tid\nfrom\n\tt\nwhere\n\tisjson(doc) = 1;\n",
		},
		{
			name:  "JSON_PATH_EXISTS in WHERE clause",
			input: "SELECT id FROM t WHERE JSON_PATH_EXISTS(doc, '$.name') = 1;",
			want:  "select\n\tid\nfrom\n\tt\nwhere\n\tjson_path_exists(doc, '$.name') = 1;\n",
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got, err := Format(tc.input, config.Default())
			if err != nil {
				t.Fatalf("Format() error: %v", err)
			}
			if got != tc.want {
				t.Errorf("Format() mismatch:\ngot:\n%s\nwant:\n%s", got, tc.want)
			}
		})
	}
}

// TestFormatSelectIIF verifies that IIF is lowercased and has no space before
// its opening parenthesis. IIF tokenises as Ident (not a Keyword), so the
// Ident → LParen branch in needsSelectSpace already suppresses the space
// without any special-case code — this test locks in that behavior.
func TestFormatSelectIIF(t *testing.T) {
	cases := []struct {
		name  string
		input string
		want  string
	}{
		{
			name:  "IIF in SELECT list",
			input: "SELECT IIF(a > 1, 'yes', 'no') AS result FROM t;",
			want:  "select\n\tiif(a > 1, 'yes', 'no') as result\nfrom\n\tt;\n",
		},
		{
			name:  "IIF in WHERE clause",
			input: "SELECT id FROM t WHERE IIF(status = 1, 1, 0) = 1;",
			want:  "select\n\tid\nfrom\n\tt\nwhere\n\tiif(status = 1, 1, 0) = 1;\n",
		},
		{
			name:  "nested IIF",
			input: "SELECT IIF(a > 0, IIF(b > 0, 'both', 'a only'), 'neither') AS label FROM t;",
			want:  "select\n\tiif(a > 0, iif(b > 0, 'both', 'a only'), 'neither') as label\nfrom\n\tt;\n",
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got, err := Format(tc.input, config.Default())
			if err != nil {
				t.Fatalf("Format() error: %v", err)
			}
			if got != tc.want {
				t.Errorf("Format() mismatch:\ngot:\n%s\nwant:\n%s", got, tc.want)
			}
		})
	}
}

// TestFormatSelectBetween verifies that BETWEEN x AND y is treated as a single
// predicate term and not split by the AND-chain formatter.
func TestFormatSelectBetween(t *testing.T) {
	cases := []struct {
		name  string
		input string
		want  string
	}{
		{
			name:  "simple BETWEEN",
			input: "SELECT id FROM orders WHERE price BETWEEN 10 AND 100;",
			want:  "select\n\tid\nfrom\n\torders\nwhere\n\tprice between 10 and 100;\n",
		},
		{
			name:  "BETWEEN with second AND-term",
			input: "SELECT id FROM orders WHERE price BETWEEN 10 AND 100 AND status = 'active';",
			want:  "select\n\tid\nfrom\n\torders\nwhere\n\tprice between 10 and 100\n\tand status = 'active';\n",
		},
		{
			name:  "NOT BETWEEN",
			input: "SELECT id FROM orders WHERE price NOT BETWEEN 10 AND 100;",
			want:  "select\n\tid\nfrom\n\torders\nwhere\n\tprice not between 10 and 100;\n",
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got, err := Format(tc.input, config.Default())
			if err != nil {
				t.Fatalf("Format() error: %v", err)
			}
			if got != tc.want {
				t.Errorf("Format() mismatch:\ngot:\n%s\nwant:\n%s", got, tc.want)
			}
		})
	}
}

// TestFormatSelectCaseAnd verifies that AND inside a CASE WHEN condition is
// not split as a top-level AND-chain separator.
func TestFormatSelectCaseAnd(t *testing.T) {
	cases := []struct {
		name  string
		input string
		want  string
	}{
		{
			name:  "AND inside CASE WHEN",
			input: "SELECT id FROM orders WHERE CASE WHEN a = 1 AND b = 2 THEN 1 ELSE 0 END = 1;",
			want:  "select\n\tid\nfrom\n\torders\nwhere\n\tcase when a = 1 and b = 2 then 1 else 0 end = 1;\n",
		},
		{
			name:  "CASE AND followed by real AND-chain",
			input: "SELECT id FROM orders WHERE CASE WHEN a = 1 AND b = 2 THEN 1 ELSE 0 END = 1 AND status = 'active';",
			want:  "select\n\tid\nfrom\n\torders\nwhere\n\tcase when a = 1 and b = 2 then 1 else 0 end = 1\n\tand status = 'active';\n",
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got, err := Format(tc.input, config.Default())
			if err != nil {
				t.Fatalf("Format() error: %v", err)
			}
			if got != tc.want {
				t.Errorf("Format() mismatch:\ngot:\n%s\nwant:\n%s", got, tc.want)
			}
		})
	}
}
