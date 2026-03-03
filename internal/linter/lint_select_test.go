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
			input:    `select id from orders order by created_at;`,
			wantRule: "order-by-direction",
		},
		{
			name:     "explicit asc is clean",
			input:    `select id from orders order by created_at asc;`,
			wantRule: "",
		},
		{
			name:     "explicit desc is clean",
			input:    `select id from orders order by created_at desc;`,
			wantRule: "",
		},
		{
			name:     "mixed: one unspecified warns",
			input:    `select id from orders order by customer_id asc, created_at;`,
			wantRule: "order-by-direction",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}

	t.Run("off suppresses warning", func(t *testing.T) {
		checkRuleOff(t, `select id from orders order by created_at;`, config.RuleOrderByDirection)
	})
}
