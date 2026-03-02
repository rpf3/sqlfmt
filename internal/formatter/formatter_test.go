package formatter

import (
	"flag"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

var update = flag.Bool("update", false, "update golden files")

// TestFormatGolden verifies that Format produces output identical to each
// golden file when given the corresponding messily formatted input file.
// Pairs are discovered automatically: testdata/<name>.input.sql is the input,
// testdata/<name>.sql is the expected output.
//
// Run with -update to regenerate golden files instead of failing:
//
//	go test ./internal/formatter/... -update
func TestFormatGolden(t *testing.T) {
	inputs, err := filepath.Glob("testdata/*.input.sql")
	if err != nil {
		t.Fatalf("could not glob testdata: %v", err)
	}
	if len(inputs) == 0 {
		t.Fatal("no input files found in testdata/")
	}
	for _, inputPath := range inputs {
		stem := strings.TrimSuffix(filepath.Base(inputPath), ".input.sql")
		goldenPath := filepath.Join("testdata", stem+".sql")
		t.Run(stem, func(t *testing.T) {
			input, err := os.ReadFile(inputPath)
			if err != nil {
				t.Fatalf("could not read input file: %v", err)
			}
			got, err := Format(string(input), config.Default())
			if err != nil {
				t.Fatalf("Format() unexpected error: %v", err)
			}
			if *update {
				if err := os.WriteFile(goldenPath, []byte(got), 0o644); err != nil {
					t.Fatalf("could not update golden file: %v", err)
				}
				return
			}
			golden, err := os.ReadFile(goldenPath)
			if err != nil {
				t.Fatalf("could not read golden file: %v", err)
			}
			if got != string(golden) {
				t.Errorf("Format() output does not match golden file.\ngot:\n%s\nwant:\n%s", got, string(golden))
			}
		})
	}
}

// TestFormatIdempotent verifies that formatting any golden file produces the
// same output again (Format(Format(x)) == Format(x)). It picks up all
// testdata/*.sql files automatically, so new golden files are covered without
// any changes to this test. Input files (*.input.sql) are excluded — they are
// not canonical SQL and idempotency is only meaningful on golden output.
func TestFormatIdempotent(t *testing.T) {
	files, err := filepath.Glob("testdata/*.sql")
	if err != nil {
		t.Fatalf("could not glob testdata: %v", err)
	}
	if len(files) == 0 {
		t.Fatal("no golden files found in testdata/")
	}
	for _, path := range files {
		if strings.HasSuffix(path, ".input.sql") {
			continue
		}
		t.Run(filepath.Base(path), func(t *testing.T) {
			golden, err := os.ReadFile(path)
			if err != nil {
				t.Fatalf("could not read %s: %v", path, err)
			}
			first, err := Format(string(golden), config.Default())
			if err != nil {
				t.Fatalf("Format() first pass unexpected error: %v", err)
			}
			second, err := Format(first, config.Default())
			if err != nil {
				t.Fatalf("Format() second pass unexpected error: %v", err)
			}
			if first != second {
				t.Errorf("Format is not idempotent.\nfirst:\n%s\nsecond:\n%s", first, second)
			}
		})
	}
}

// TestFormatNamedDefaultConstraint verifies that a named DEFAULT constraint
// round-trips through the formatter correctly.
func TestFormatNamedDefaultConstraint(t *testing.T) {
	input := `create table t (
		id integer not null,
		name varchar(255) constraint df_t_name default 'unknown' not null
	);`
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if !strings.Contains(got, "constraint df_t_name default") {
		t.Errorf("expected 'constraint df_t_name default' in output:\n%s", got)
	}
	// Idempotency
	got2, err := Format(got, config.Default())
	if err != nil {
		t.Fatalf("Format() second pass unexpected error: %v", err)
	}
	if got != got2 {
		t.Errorf("Format is not idempotent.\nfirst:\n%s\nsecond:\n%s", got, got2)
	}
}

// TestFormatParseError verifies that invalid SQL returns a non-nil error.
func TestFormatParseError(t *testing.T) {
	_, err := Format("this is not valid sql", config.Default())
	if err == nil {
		t.Error("Format() expected error for invalid SQL, got nil")
	}
}

// TestFormatKeywordCase verifies that keyword_case: upper uppercases all keywords.
func TestFormatKeywordCase(t *testing.T) {
	input := "create table t (id integer not null);"

	t.Run("lower", func(t *testing.T) {
		cfg := config.Default()
		cfg.KeywordCase = config.KeywordLower
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		if strings.Contains(got, "CREATE") || strings.Contains(got, "TABLE") || strings.Contains(got, "INTEGER") {
			t.Errorf("lower mode contains uppercase keywords:\n%s", got)
		}
		if !strings.Contains(got, "create table") {
			t.Errorf("lower mode missing 'create table':\n%s", got)
		}
		if !strings.Contains(got, "not null") {
			t.Errorf("lower mode missing 'not null':\n%s", got)
		}
	})

	t.Run("upper", func(t *testing.T) {
		cfg := config.Default()
		cfg.KeywordCase = config.KeywordUpper
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		if !strings.Contains(got, "CREATE TABLE") {
			t.Errorf("upper mode missing 'CREATE TABLE':\n%s", got)
		}
		if !strings.Contains(got, "NOT NULL") {
			t.Errorf("upper mode missing 'NOT NULL':\n%s", got)
		}
		if !strings.Contains(got, "INTEGER") {
			t.Errorf("upper mode missing 'INTEGER':\n%s", got)
		}
	})
}

// TestFormatIndentStyle verifies tab vs spaces indentation.
func TestFormatIndentStyle(t *testing.T) {
	input := "create table t (id integer not null, name varchar(50) not null);"

	t.Run("tab", func(t *testing.T) {
		cfg := config.Default()
		cfg.IndentStyle = config.IndentTab
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		if !strings.Contains(got, "\t") {
			t.Errorf("tab mode: no tab character found:\n%s", got)
		}
	})

	t.Run("spaces4", func(t *testing.T) {
		cfg := config.Default()
		cfg.IndentStyle = config.IndentSpaces
		cfg.IndentWidth = 4
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		if strings.Contains(got, "\t") {
			t.Errorf("spaces4 mode: tab character found:\n%s", got)
		}
		if !strings.Contains(got, "    ") {
			t.Errorf("spaces4 mode: no 4-space indent found:\n%s", got)
		}
	})

	t.Run("spaces2", func(t *testing.T) {
		cfg := config.Default()
		cfg.IndentStyle = config.IndentSpaces
		cfg.IndentWidth = 2
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		if strings.Contains(got, "\t") {
			t.Errorf("spaces2 mode: tab character found:\n%s", got)
		}
		// lines should be indented with exactly 2 spaces
		lines := strings.Split(got, "\n")
		found := false
		for _, line := range lines {
			if strings.HasPrefix(line, "  ") && !strings.HasPrefix(line, "   ") {
				found = true
				break
			}
		}
		if !found {
			t.Errorf("spaces2 mode: no 2-space-only indent found:\n%s", got)
		}
	})
}

// TestFormatCommaStyle verifies leading vs trailing comma placement.
func TestFormatCommaStyle(t *testing.T) {
	t.Run("single_col_leading", func(t *testing.T) {
		input := "create table t (id integer not null);"
		cfg := config.Default()
		cfg.CommaStyle = config.CommaLeading
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		// single column: no comma at all
		if strings.Contains(got, ",") {
			t.Errorf("single-col leading: unexpected comma:\n%s", got)
		}
	})

	t.Run("single_col_trailing", func(t *testing.T) {
		input := "create table t (id integer not null);"
		cfg := config.Default()
		cfg.CommaStyle = config.CommaTrailing
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		// single column: no comma at all
		if strings.Contains(got, ",") {
			t.Errorf("single-col trailing: unexpected comma:\n%s", got)
		}
	})

	t.Run("multi_col_leading", func(t *testing.T) {
		input := "create table t (id integer not null, name varchar(50) not null);"
		cfg := config.Default()
		cfg.CommaStyle = config.CommaLeading
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		lines := strings.Split(strings.TrimRight(got, "\n"), "\n")
		// line with 'name' should start with ",\t"
		var nameLine string
		for _, l := range lines {
			if strings.Contains(l, "name") {
				nameLine = l
				break
			}
		}
		if !strings.HasPrefix(nameLine, ",\t") && !strings.HasPrefix(nameLine, ", ") {
			t.Errorf("multi-col leading: name line should start with comma+indent:\n%q", nameLine)
		}
	})

	t.Run("multi_col_trailing", func(t *testing.T) {
		input := "create table t (id integer not null, name varchar(50) not null);"
		cfg := config.Default()
		cfg.CommaStyle = config.CommaTrailing
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		lines := strings.Split(strings.TrimRight(got, "\n"), "\n")
		// 'id' line should end with ","
		var idLine string
		for _, l := range lines {
			if strings.HasPrefix(strings.TrimSpace(l), "id ") {
				idLine = l
				break
			}
		}
		if !strings.HasSuffix(idLine, ",") {
			t.Errorf("multi-col trailing: id line should end with comma:\n%q", idLine)
		}
		// 'name' line should NOT end with ","
		var nameLine string
		for _, l := range lines {
			if strings.HasPrefix(strings.TrimSpace(l), "name ") {
				nameLine = l
				break
			}
		}
		if strings.HasSuffix(nameLine, ",") {
			t.Errorf("multi-col trailing: name (last) line should not end with comma:\n%q", nameLine)
		}
	})

	t.Run("cols_and_constraints_trailing", func(t *testing.T) {
		input := `create table t (
			id integer not null,
			name varchar(50) not null,
			constraint pk_t primary key (id),
			constraint uq_t_name unique (name)
		);`
		cfg := config.Default()
		cfg.CommaStyle = config.CommaTrailing
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		lines := strings.Split(strings.TrimRight(got, "\n"), "\n")
		// The pk_t body ("primary key (id)") is not the last item, so it ends with ","
		var pkBodyLine string
		for _, l := range lines {
			if strings.Contains(l, "primary key") {
				pkBodyLine = l
				break
			}
		}
		if !strings.HasSuffix(pkBodyLine, ",") {
			t.Errorf("trailing: pk body line should end with comma:\n%q", pkBodyLine)
		}
		// The uq_t_name body ("unique (name)") is the last item — no comma.
		var uqBodyLine string
		for _, l := range lines {
			if strings.Contains(l, "unique") {
				uqBodyLine = l
			}
		}
		if strings.HasSuffix(uqBodyLine, ",") {
			t.Errorf("trailing: last constraint body should not end with comma:\n%q", uqBodyLine)
		}
	})
}

// ─── SELECT formatting tests ──────────────────────────────────────────────────

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

// TestFormatSelectJoinUsing verifies USING clause is double-indented.
func TestFormatSelectJoinUsing(t *testing.T) {
	input := "select o.id, c.name from orders as o inner join customers as c using (customer_id);"
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if !strings.Contains(got, "\n\t\tusing (customer_id);") {
		t.Errorf("missing double-indented USING line in:\n%s", got)
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
		"select o.id, c.name from orders as o inner join customers as c using (customer_id);",
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
