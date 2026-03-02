package linter

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

func TestLint(t *testing.T) {
	cfg := config.Default()

	tests := []struct {
		name     string
		input    string
		wantRule string // empty means no warnings expected
	}{
		{
			name: "inline primary key warns",
			input: `create table orders (
				id integer primary key,
				total numeric(10,2) not null
			);`,
			wantRule: "inline-primary-key",
		},
		{
			name: "named table-level primary key is clean",
			input: `create table orders (
				id integer not null,
				total numeric(10,2) not null,
				constraint pk_orders primary key (id)
			);`,
			wantRule: "",
		},
		{
			name: "unnamed table-level primary key warns",
			input: `create table orders (
				id integer not null,
				primary key (id)
			);`,
			wantRule: "unnamed-primary-key",
		},
		{
			name: "no primary key at all is clean",
			input: `create table tags (
				name varchar(100) not null
			);`,
			wantRule: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			warnings, err := Lint(tt.input, cfg)
			if err != nil {
				t.Fatalf("Lint returned unexpected error: %v", err)
			}

			if tt.wantRule == "" {
				if len(warnings) != 0 {
					t.Errorf("expected no warnings, got %d: %v", len(warnings), warnings)
				}
				return
			}

			if len(warnings) != 1 {
				t.Fatalf("expected 1 warning, got %d: %v", len(warnings), warnings)
			}
			if warnings[0].Rule != tt.wantRule {
				t.Errorf("warning rule = %q, want %q", warnings[0].Rule, tt.wantRule)
			}
		})
	}
}

func TestLintParseError(t *testing.T) {
	_, err := Lint("not valid sql", config.Default())
	if err == nil {
		t.Error("expected error for invalid SQL, got nil")
	}
}

func TestLintSeverity(t *testing.T) {
	const inlineSQL = `create table orders (
		id integer primary key,
		total numeric(10,2) not null
	);`

	t.Run("default severity is warn", func(t *testing.T) {
		warnings, err := Lint(inlineSQL, config.Default())
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if len(warnings) != 1 {
			t.Fatalf("expected 1 warning, got %d", len(warnings))
		}
		if warnings[0].Severity != config.RuleSeverityWarn {
			t.Errorf("Severity = %q, want %q", warnings[0].Severity, config.RuleSeverityWarn)
		}
	})

	t.Run("off suppresses warning", func(t *testing.T) {
		cfg := config.Default()
		cfg.LintRules = map[string]config.RuleSeverity{
			config.RuleInlinePrimaryKey: config.RuleSeverityOff,
		}
		warnings, err := Lint(inlineSQL, cfg)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if len(warnings) != 0 {
			t.Errorf("expected no warnings with rule off, got %d: %v", len(warnings), warnings)
		}
	})

	t.Run("error severity is recorded", func(t *testing.T) {
		cfg := config.Default()
		cfg.LintRules = map[string]config.RuleSeverity{
			config.RuleInlinePrimaryKey: config.RuleSeverityError,
		}
		warnings, err := Lint(inlineSQL, cfg)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if len(warnings) != 1 {
			t.Fatalf("expected 1 warning, got %d", len(warnings))
		}
		if warnings[0].Severity != config.RuleSeverityError {
			t.Errorf("Severity = %q, want %q", warnings[0].Severity, config.RuleSeverityError)
		}
	})
}
