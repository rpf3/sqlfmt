package linter

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

// lintSpacesRule lints input with all other noisy rules suppressed and asserts
// the presence (wantRule non-empty) or absence (wantRule empty) of a warning
// with the given rule name.
func lintSpacesRule(t *testing.T, input, wantRule string) {
	t.Helper()
	cfg := config.Default()
	cfg.LintRules = map[string]config.RuleSeverity{
		config.RuleMissingSchemaName:        config.RuleSeverityOff,
		config.RuleUnaliasedTable:           config.RuleSeverityOff,
		config.RuleUpdateWithoutWhere:       config.RuleSeverityOff,
		config.RuleDeleteWithoutWhere:       config.RuleSeverityOff,
		config.RuleInsertColumnList:         config.RuleSeverityOff,
		config.RuleMissingTrailingSemicolon: config.RuleSeverityOff,
		config.RuleInlinePrimaryKey:         config.RuleSeverityOff,
		config.RuleUnnamedDefault:           config.RuleSeverityOff,
		config.RuleUnnamedPrimaryKey:        config.RuleSeverityOff,
		config.RuleIndexDirection:           config.RuleSeverityOff,
	}
	warnings, err := Lint(input, cfg)
	if err != nil {
		t.Fatalf("Lint returned unexpected error: %v", err)
	}
	if wantRule == "" {
		if len(warnings) != 0 {
			t.Errorf("expected no warnings, got %d: %v", len(warnings), warnings)
		}
		return
	}
	for _, w := range warnings {
		if w.Rule == wantRule {
			return
		}
	}
	t.Errorf("expected warning with rule %q, got %v", wantRule, warnings)
}

func TestLintIdentifierWithSpaces(t *testing.T) {
	rule := config.RuleIdentifierWithSpaces

	t.Run("bare table name is clean", func(t *testing.T) {
		lintSpacesRule(t, `create table orders (id int not null);`, "")
	})

	t.Run("bracket-quoted table name with spaces warns", func(t *testing.T) {
		lintSpacesRule(t, `create table [My Orders] (id int not null);`, rule)
	})

	t.Run("double-quoted table name with spaces warns", func(t *testing.T) {
		lintSpacesRule(t, `create table "My Orders" (id int not null);`, rule)
	})

	t.Run("bracket-quoted table name without spaces is clean", func(t *testing.T) {
		lintSpacesRule(t, `create table [orders] (id int not null);`, "")
	})

	t.Run("column name with spaces warns", func(t *testing.T) {
		lintSpacesRule(t, `create table orders ([first name] varchar(50) not null);`, rule)
	})

	t.Run("column name without spaces is clean", func(t *testing.T) {
		lintSpacesRule(t, `create table orders (first_name varchar(50) not null);`, "")
	})

	t.Run("constraint name with spaces warns", func(t *testing.T) {
		lintSpacesRule(t,
			`create table orders (id int not null, constraint [pk orders] primary key (id));`,
			rule)
	})

	t.Run("constraint name without spaces is clean", func(t *testing.T) {
		lintSpacesRule(t,
			`create table orders (id int not null, constraint pk_orders primary key (id));`,
			"")
	})

	t.Run("index name with spaces warns", func(t *testing.T) {
		lintSpacesRule(t, `create index [ix orders status] on orders (status asc);`, rule)
	})

	t.Run("index name without spaces is clean", func(t *testing.T) {
		lintSpacesRule(t, `create index ix_orders_status on orders (status asc);`, "")
	})

	t.Run("view name with spaces warns", func(t *testing.T) {
		lintSpacesRule(t, `create view [Order Summary] as select id from dbo.orders as o;`, rule)
	})

	t.Run("view name without spaces is clean", func(t *testing.T) {
		lintSpacesRule(t, `create view order_summary as select id from dbo.orders as o;`, "")
	})

	t.Run("rule off suppresses warning", func(t *testing.T) {
		cfg := config.Default()
		cfg.LintRules = map[string]config.RuleSeverity{
			config.RuleMissingSchemaName:        config.RuleSeverityOff,
			config.RuleUnaliasedTable:           config.RuleSeverityOff,
			config.RuleMissingTrailingSemicolon: config.RuleSeverityOff,
			config.RuleInlinePrimaryKey:         config.RuleSeverityOff,
			config.RuleIdentifierWithSpaces:     config.RuleSeverityOff,
		}
		warnings, err := Lint(`create table [My Orders] (id int not null);`, cfg)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		for _, w := range warnings {
			if w.Rule == rule {
				t.Errorf("expected rule to be suppressed, got warning: %v", w)
			}
		}
	})

	t.Run("off by default", func(t *testing.T) {
		// Default config has no explicit identifier-with-spaces setting — it defaults
		// to warn (non-off), so bracket-quoted names with spaces should fire.
		// This test verifies the rule fires with the default config.
		warnings, err := Lint(`create table [My Orders] (id int not null);`, config.Default())
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		found := false
		for _, w := range warnings {
			if w.Rule == rule {
				found = true
				break
			}
		}
		if !found {
			t.Errorf("expected %q warning with default config for [My Orders], got: %v", rule, warnings)
		}
	})
}
