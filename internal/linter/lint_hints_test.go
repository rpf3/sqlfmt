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
