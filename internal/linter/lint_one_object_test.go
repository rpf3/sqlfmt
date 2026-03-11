package linter

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

func lintOneObject(t *testing.T, input string) []Warning {
	t.Helper()
	cfg := config.Default()
	// Suppress other rules so only one-object-per-file is relevant.
	cfg.LintRules = map[string]config.RuleSeverity{
		config.RuleMissingSchemaName:        config.RuleSeverityOff,
		config.RuleUnaliasedTable:           config.RuleSeverityOff,
		config.RuleMissingTrailingSemicolon: config.RuleSeverityOff,
		config.RuleIndexDirection:           config.RuleSeverityOff,
	}
	warnings, err := Lint(input, cfg)
	if err != nil {
		t.Fatalf("Lint returned unexpected error: %v", err)
	}
	return warnings
}

func hasRule(warnings []Warning, rule string) bool {
	for _, w := range warnings {
		if w.Rule == rule {
			return true
		}
	}
	return false
}

func TestLintOneObjectPerFile(t *testing.T) {
	rule := config.RuleOneObjectPerFile

	t.Run("single CREATE TABLE is clean", func(t *testing.T) {
		warnings := lintOneObject(t, `create table orders (id int not null);`)
		if hasRule(warnings, rule) {
			t.Errorf("expected no %q warning, got %v", rule, warnings)
		}
	})

	t.Run("CREATE TABLE plus its own indexes is clean", func(t *testing.T) {
		warnings := lintOneObject(t,
			`create table orders (id int not null);
			 create index ix_orders_status on orders (status asc);`)
		if hasRule(warnings, rule) {
			t.Errorf("expected no %q warning, got %v", rule, warnings)
		}
	})

	t.Run("two different CREATE TABLEs warn", func(t *testing.T) {
		warnings := lintOneObject(t,
			`create table orders (id int not null);
			 create table customers (id int not null);`)
		if !hasRule(warnings, rule) {
			t.Errorf("expected %q warning, got none", rule)
		}
	})

	t.Run("CREATE TABLE plus CREATE VIEW warn", func(t *testing.T) {
		warnings := lintOneObject(t,
			`create table orders (id int not null);
			 create view order_summary as select id from orders as o;`)
		if !hasRule(warnings, rule) {
			t.Errorf("expected %q warning, got none", rule)
		}
	})

	t.Run("CREATE INDEX on different table warns", func(t *testing.T) {
		warnings := lintOneObject(t,
			`create table orders (id int not null);
			 create index ix_customers_name on customers (name asc);`)
		if !hasRule(warnings, rule) {
			t.Errorf("expected %q warning, got none", rule)
		}
	})

	t.Run("empty file is clean", func(t *testing.T) {
		warnings := lintOneObject(t, ``)
		if hasRule(warnings, rule) {
			t.Errorf("expected no %q warning for empty input, got %v", rule, warnings)
		}
	})

	t.Run("rule off suppresses warning", func(t *testing.T) {
		cfg := config.Default()
		cfg.LintRules = map[string]config.RuleSeverity{
			rule:                                config.RuleSeverityOff,
			config.RuleMissingSchemaName:        config.RuleSeverityOff,
			config.RuleMissingTrailingSemicolon: config.RuleSeverityOff,
		}
		warnings, err := Lint(
			`create table orders (id int not null);
			 create table customers (id int not null);`,
			cfg)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if hasRule(warnings, rule) {
			t.Errorf("expected rule suppressed, got %v", warnings)
		}
	})
}
