package linter

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

// checkRuleEnabled asserts that linting input with the named rule explicitly
// enabled produces exactly one warning for that rule. Used for opt-in rules
// that are off by default.
func checkRuleEnabled(t *testing.T, input, rule string) {
	t.Helper()
	cfg := config.Default()
	cfg.LintRules = map[string]config.RuleSeverity{rule: config.RuleSeverityWarn}
	warnings, err := Lint(input, cfg)
	if err != nil {
		t.Fatalf("Lint returned unexpected error: %v", err)
	}
	if len(warnings) == 0 {
		t.Fatalf("expected warning with rule %q, got none", rule)
	}
	if warnings[0].Rule != rule {
		t.Errorf("warning rule = %q, want %q", warnings[0].Rule, rule)
	}
}

// checkRuleEnabledClean asserts that linting input with the named rule
// explicitly enabled produces no warnings.
func checkRuleEnabledClean(t *testing.T, input, rule string) {
	t.Helper()
	cfg := config.Default()
	cfg.LintRules = map[string]config.RuleSeverity{rule: config.RuleSeverityWarn}
	warnings, err := Lint(input, cfg)
	if err != nil {
		t.Fatalf("Lint returned unexpected error: %v", err)
	}
	for _, w := range warnings {
		if w.Rule == rule {
			t.Errorf("expected no %q warning, got: %s", rule, w.Message)
		}
	}
}

func TestLintNoVarcharMax(t *testing.T) {
	const rule = config.RuleNoVarcharMax

	t.Run("off by default", func(t *testing.T) {
		checkRule(t, `create table dbo.t (body nvarchar(max) not null);`, "")
	})

	t.Run("VARCHAR(MAX) column warns", func(t *testing.T) {
		checkRuleEnabled(t, `create table dbo.t (body varchar(max) not null);`, rule)
	})

	t.Run("NVARCHAR(MAX) column warns", func(t *testing.T) {
		checkRuleEnabled(t, `create table dbo.t (body nvarchar(max) not null);`, rule)
	})

	t.Run("bounded column is clean", func(t *testing.T) {
		checkRuleEnabledClean(t, `create table dbo.t (name nvarchar(200) not null);`, rule)
	})

	t.Run("DECLARE with NVARCHAR(MAX) warns", func(t *testing.T) {
		checkRuleEnabled(t, `declare @body nvarchar(max);`, rule)
	})

	t.Run("DECLARE with bounded type is clean", func(t *testing.T) {
		checkRuleEnabledClean(t, `declare @name nvarchar(100);`, rule)
	})

	t.Run("proc param with NVARCHAR(MAX) warns", func(t *testing.T) {
		checkRuleEnabled(t,
			`create procedure dbo.p @body nvarchar(max) as begin select 1; end;`,
			rule)
	})

	t.Run("proc param with bounded type is clean", func(t *testing.T) {
		checkRuleEnabledClean(t,
			`create procedure dbo.p @name nvarchar(200) as begin select 1; end;`,
			rule)
	})
}

func TestLintNoNolockHint(t *testing.T) {
	const rule = config.RuleNoNolockHint

	t.Run("off by default", func(t *testing.T) {
		// Rule must not fire without explicit opt-in.
		checkRule(t, `select id from dbo.orders as o with (nolock);`, "")
	})

	t.Run("FROM with NOLOCK warns", func(t *testing.T) {
		checkRuleEnabled(t, `select id from dbo.orders as o with (nolock);`, rule)
	})

	t.Run("FROM with READUNCOMMITTED warns", func(t *testing.T) {
		checkRuleEnabled(t, `select id from dbo.orders as o with (readuncommitted);`, rule)
	})

	t.Run("JOIN with NOLOCK warns", func(t *testing.T) {
		checkRuleEnabled(t,
			`select o.id from dbo.orders as o inner join dbo.customers as c with (nolock) on c.id = o.customer_id;`,
			rule)
	})

	t.Run("uppercase NOLOCK warns", func(t *testing.T) {
		checkRuleEnabled(t, `select id from dbo.orders as o WITH (NOLOCK);`, rule)
	})

	t.Run("other hints are clean", func(t *testing.T) {
		checkRuleEnabledClean(t, `select id from dbo.orders as o with (rowlock, updlock);`, rule)
	})

	t.Run("no hints is clean", func(t *testing.T) {
		checkRuleEnabledClean(t, `select id from dbo.orders as o;`, rule)
	})

	t.Run("rule can be turned off", func(t *testing.T) {
		cfg := config.Default()
		cfg.LintRules = map[string]config.RuleSeverity{rule: config.RuleSeverityOff}
		warnings, err := Lint(`select id from dbo.orders as o with (nolock);`, cfg)
		if err != nil {
			t.Fatalf("Lint error: %v", err)
		}
		for _, w := range warnings {
			if w.Rule == rule {
				t.Errorf("expected rule off, got warning: %s", w.Message)
			}
		}
	})
}
