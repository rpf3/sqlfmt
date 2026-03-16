package linter

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

// checkRule asserts that linting input produces exactly one warning for wantRule,
// or no warnings when wantRule is empty.
func checkRule(t *testing.T, input, wantRule string) {
	t.Helper()
	warnings, err := Lint(input, config.Default())
	if err != nil {
		t.Fatalf("Lint returned unexpected error: %v", err)
	}
	if wantRule == "" {
		if len(warnings) != 0 {
			t.Errorf("expected no warnings, got %d: %v", len(warnings), warnings)
		}
		return
	}
	if len(warnings) == 0 {
		t.Fatalf("expected warning with rule %q, got none", wantRule)
	}
	if warnings[0].Rule != wantRule {
		t.Errorf("warning rule = %q, want %q", warnings[0].Rule, wantRule)
	}
}

// checkRuleOff asserts that setting the named rule to "off" suppresses its warning.
func checkRuleOff(t *testing.T, input, rule string) {
	t.Helper()
	cfg := config.Default()
	cfg.LintRules = map[string]config.RuleSeverity{rule: config.RuleSeverityOff}
	warnings, err := Lint(input, cfg)
	if err != nil {
		t.Fatalf("Lint returned unexpected error: %v", err)
	}
	if len(warnings) != 0 {
		t.Errorf("expected no warnings with rule %q off, got %d: %v", rule, len(warnings), warnings)
	}
}

func TestLintOrderByDirection(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name:     "no direction warns",
			input:    `select id from orders as o order by created_at;`,
			wantRule: "order-by-direction",
		},
		{
			name:     "explicit asc is clean",
			input:    `select id from dbo.orders as o order by created_at asc;`,
			wantRule: "",
		},
		{
			name:     "explicit desc is clean",
			input:    `select id from dbo.orders as o order by created_at desc;`,
			wantRule: "",
		},
		{
			name:     "mixed: one unspecified warns",
			input:    `select id from orders as o order by customer_id asc, created_at;`,
			wantRule: "order-by-direction",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}

	t.Run("off suppresses warning", func(t *testing.T) {
		checkRuleOff(t, `select id from dbo.orders as o order by created_at;`, config.RuleOrderByDirection)
	})
}

func TestLintAliasWithoutAs(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name:     "bare FROM alias warns",
			input:    `select o.id from orders o;`,
			wantRule: "alias-without-as",
		},
		{
			name:     "AS FROM alias is clean",
			input:    `select o.id from dbo.orders as o;`,
			wantRule: "",
		},
		{
			name:     "no alias does not trigger alias-without-as",
			input:    `select id from dbo.orders as o;`,
			wantRule: "",
		},
		{
			name:     "bare JOIN alias warns",
			input:    `select o.id from orders as o join customers c on o.customer_id = c.id;`,
			wantRule: "alias-without-as",
		},
		{
			name:     "AS JOIN alias is clean",
			input:    `select o.id from dbo.orders as o join dbo.customers as c on o.customer_id = c.id;`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}

	t.Run("off suppresses warning", func(t *testing.T) {
		checkRuleOff(t, `select o.id from dbo.orders o;`, config.RuleAliasWithoutAs)
	})
}

func TestLintOffsetRows(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name:     "OFFSET without ROWS warns",
			input:    `select id from orders as o order by id asc offset 5 fetch next 10 rows only;`,
			wantRule: "offset-rows",
		},
		{
			name:     "OFFSET ROWS is clean",
			input:    `select id from dbo.orders as o order by id asc offset 5 rows fetch next 10 rows only;`,
			wantRule: "",
		},
		{
			name:     "no OFFSET is clean",
			input:    `select id from dbo.orders as o;`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}

	t.Run("off suppresses warning", func(t *testing.T) {
		checkRuleOff(t,
			`select id from dbo.orders as o order by id asc offset 5 fetch next 10 rows only;`,
			config.RuleOffsetRows)
	})
}

func TestLintExistsSelectOne(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name:     "EXISTS with column selection warns",
			input:    `select id from orders as o where exists (select id from customers as c where c.id = o.customer_id);`,
			wantRule: "exists-select-one",
		},
		{
			name:     "EXISTS SELECT 1 is clean",
			input:    `select id from dbo.orders as o where exists (select 1 from dbo.customers as c where c.id = o.customer_id);`,
			wantRule: "",
		},
		{
			name:     "IN subquery is not checked",
			input:    `select id from dbo.orders as o where o.customer_id in (select id from dbo.customers as c);`,
			wantRule: "",
		},
		{
			name:     "no subquery is clean",
			input:    `select id from dbo.orders as o where o.status = 'active';`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}

	t.Run("off suppresses warning", func(t *testing.T) {
		checkRuleOff(t,
			`select id from dbo.orders as o where exists (select id from dbo.customers as c where c.id = o.customer_id);`,
			config.RuleExistsSelectOne)
	})
}

func TestLintUnaliasedTable(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name:     "FROM table with no alias warns",
			input:    `select id from orders;`,
			wantRule: config.RuleUnaliasedTable,
		},
		{
			name:     "FROM table with alias is clean",
			input:    `select o.id from dbo.orders as o;`,
			wantRule: "",
		},
		{
			name:     "JOIN table with no alias warns",
			input:    `select o.id from orders as o join customers on o.customer_id = customers.id;`,
			wantRule: config.RuleUnaliasedTable,
		},
		{
			name:     "JOIN table with alias is clean",
			input:    `select o.id from dbo.orders as o join dbo.customers as c on o.customer_id = c.id;`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}

	t.Run("rule off suppresses warning", func(t *testing.T) {
		checkRuleOff(t, `select id from dbo.orders;`, config.RuleUnaliasedTable)
	})
}

func TestLintWindowOrderDirection(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name:     "no direction warns",
			input:    `select row_number() over (order by created_at) as rn from events as e;`,
			wantRule: config.RuleWindowOrderDirection,
		},
		{
			name:     "explicit desc is clean",
			input:    `select row_number() over (order by created_at desc) as rn from dbo.events as e;`,
			wantRule: "",
		},
		{
			name:     "explicit asc is clean",
			input:    `select rank() over (order by score asc) as rnk from dbo.events as e;`,
			wantRule: "",
		},
		{
			name:     "partition by with no order direction warns",
			input:    `select sum(amount) over (partition by customer_id order by created_at) as running_total from orders as o;`,
			wantRule: config.RuleWindowOrderDirection,
		},
		{
			name:     "partition by with explicit direction is clean",
			input:    `select sum(amount) over (partition by customer_id order by created_at asc) as running_total from dbo.orders as o;`,
			wantRule: "",
		},
		{
			name:     "window function with no over clause is clean",
			input:    `select count(*) from dbo.orders as o;`,
			wantRule: "",
		},
		{
			name:     "plain select with no window function is clean",
			input:    `select id from dbo.orders as o order by created_at asc;`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}

	t.Run("off suppresses warning", func(t *testing.T) {
		checkRuleOff(t,
			`select row_number() over (order by created_at) as rn from dbo.events as e;`,
			config.RuleWindowOrderDirection)
	})
}

func TestLintSelectStar(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name:     "select star warns",
			input:    `select * from orders as o;`,
			wantRule: config.RuleSelectStar,
		},
		{
			name:     "explicit column list is clean",
			input:    `select id, status from dbo.orders as o;`,
			wantRule: "",
		},
		{
			name:     "count star is clean",
			input:    `select count(*) from dbo.orders as o;`,
			wantRule: "",
		},
		{
			name:     "select star in subquery warns",
			input:    `select id from (select * from orders as o) as sq;`,
			wantRule: config.RuleSelectStar,
		},
		{
			name:     "select star in cte warns",
			input:    `with o as (select * from orders as ord) select id from o;`,
			wantRule: config.RuleSelectStar,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}
	t.Run("rule off suppresses warning", func(t *testing.T) {
		checkRuleOff(t, `select * from dbo.orders as o;`, config.RuleSelectStar)
	})
}
