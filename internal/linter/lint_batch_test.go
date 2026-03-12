package linter

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

func lintBatch(t *testing.T, input string) []Warning {
	t.Helper()
	cfg := config.Default()
	// Suppress other rules so only must-be-only-statement-in-batch is relevant.
	cfg.LintRules = map[string]config.RuleSeverity{
		config.RuleMissingSchemaName:        config.RuleSeverityOff,
		config.RuleUnaliasedTable:           config.RuleSeverityOff,
		config.RuleMissingTrailingSemicolon: config.RuleSeverityOff,
		config.RuleOneObjectPerFile:         config.RuleSeverityOff,
		config.RuleMissingBeginEnd:          config.RuleSeverityOff,
	}
	warnings, err := Lint(input, cfg)
	if err != nil {
		t.Fatalf("Lint returned unexpected error: %v", err)
	}
	return warnings
}

func TestLintMustBeOnlyStatement(t *testing.T) {
	rule := config.RuleMustBeOnlyStatement

	t.Run("single CREATE VIEW is clean", func(t *testing.T) {
		warnings := lintBatch(t, `create view v as select id from orders as o;`)
		if hasRule(warnings, rule) {
			t.Errorf("expected no %q warning, got %v", rule, warnings)
		}
	})

	t.Run("single CREATE PROCEDURE is clean", func(t *testing.T) {
		warnings := lintBatch(t, `create procedure dbo.up_foo as begin select 1; end;`)
		if hasRule(warnings, rule) {
			t.Errorf("expected no %q warning, got %v", rule, warnings)
		}
	})

	t.Run("single CREATE FUNCTION is clean", func(t *testing.T) {
		warnings := lintBatch(t, `create function dbo.fn_foo() returns int as begin return 1; end;`)
		if hasRule(warnings, rule) {
			t.Errorf("expected no %q warning, got %v", rule, warnings)
		}
	})

	t.Run("CREATE VIEW plus SELECT warns", func(t *testing.T) {
		warnings := lintBatch(t,
			`create view order_summary as select id from orders as o;
			 select id from orders as o;`)
		if !hasRule(warnings, rule) {
			t.Errorf("expected %q warning, got none", rule)
		}
	})

	t.Run("CREATE PROCEDURE plus SELECT warns", func(t *testing.T) {
		warnings := lintBatch(t,
			`create procedure dbo.up_foo as begin select id from orders as o; end;
			 select id from orders as o;`)
		if !hasRule(warnings, rule) {
			t.Errorf("expected %q warning, got none", rule)
		}
	})

	t.Run("CREATE FUNCTION plus SELECT warns", func(t *testing.T) {
		warnings := lintBatch(t,
			`create function dbo.fn_foo() returns int as begin return 1; end;
			 select id from orders as o;`)
		if !hasRule(warnings, rule) {
			t.Errorf("expected %q warning, got none", rule)
		}
	})

	t.Run("CREATE TYPE AS TABLE plus SELECT warns", func(t *testing.T) {
		warnings := lintBatch(t,
			`create type dbo.OrderIds as table (id int not null);
			 select id from orders as o;`)
		if !hasRule(warnings, rule) {
			t.Errorf("expected %q warning, got none", rule)
		}
	})

	t.Run("CREATE TYPE AS ENUM is exempt", func(t *testing.T) {
		warnings := lintBatch(t,
			`create type status_t from varchar(20);
			 select id from orders as o;`)
		if hasRule(warnings, rule) {
			t.Errorf("expected no %q warning for non-table type, got %v", rule, warnings)
		}
	})

	t.Run("two SELECT statements is clean", func(t *testing.T) {
		warnings := lintBatch(t,
			`select id from orders as o;
			 select id from customers as c;`)
		if hasRule(warnings, rule) {
			t.Errorf("expected no %q warning for plain SELECTs, got %v", rule, warnings)
		}
	})

	t.Run("rule off suppresses warning", func(t *testing.T) {
		cfg := config.Default()
		cfg.LintRules = map[string]config.RuleSeverity{
			rule:                                config.RuleSeverityOff,
			config.RuleMissingSchemaName:        config.RuleSeverityOff,
			config.RuleUnaliasedTable:           config.RuleSeverityOff,
			config.RuleMissingTrailingSemicolon: config.RuleSeverityOff,
			config.RuleOneObjectPerFile:         config.RuleSeverityOff,
			config.RuleMissingBeginEnd:          config.RuleSeverityOff,
		}
		warnings, err := Lint(
			`create view order_summary as select id from orders as o;
			 select id from orders as o;`,
			cfg)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if hasRule(warnings, rule) {
			t.Errorf("expected rule suppressed, got %v", warnings)
		}
	})
}
