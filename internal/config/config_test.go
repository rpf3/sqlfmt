package config_test

import (
	"os"
	"path/filepath"
	"reflect"
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

func TestDefault(t *testing.T) {
	cfg := config.Default()
	if cfg.KeywordCase != config.KeywordLower {
		t.Errorf("KeywordCase: got %q, want %q", cfg.KeywordCase, config.KeywordLower)
	}
	if cfg.IndentStyle != config.IndentTab {
		t.Errorf("IndentStyle: got %q, want %q", cfg.IndentStyle, config.IndentTab)
	}
	if cfg.IndentWidth != 4 {
		t.Errorf("IndentWidth: got %d, want 4", cfg.IndentWidth)
	}
	if cfg.CommaStyle != config.CommaLeading {
		t.Errorf("CommaStyle: got %q, want %q", cfg.CommaStyle, config.CommaLeading)
	}
}

func TestLoadFullFile(t *testing.T) {
	content := `
keyword_case: upper
indent_style: spaces
indent_width: 2
comma_style: trailing
`
	path := writeTemp(t, content)
	cfg, err := config.Load(path)
	if err != nil {
		t.Fatalf("Load() unexpected error: %v", err)
	}
	if cfg.KeywordCase != config.KeywordUpper {
		t.Errorf("KeywordCase: got %q, want %q", cfg.KeywordCase, config.KeywordUpper)
	}
	if cfg.IndentStyle != config.IndentSpaces {
		t.Errorf("IndentStyle: got %q, want %q", cfg.IndentStyle, config.IndentSpaces)
	}
	if cfg.IndentWidth != 2 {
		t.Errorf("IndentWidth: got %d, want 2", cfg.IndentWidth)
	}
	if cfg.CommaStyle != config.CommaTrailing {
		t.Errorf("CommaStyle: got %q, want %q", cfg.CommaStyle, config.CommaTrailing)
	}
}

func TestLoadPartialFile(t *testing.T) {
	// Only override keyword_case; other fields should keep defaults.
	content := "keyword_case: upper\n"
	path := writeTemp(t, content)
	cfg, err := config.Load(path)
	if err != nil {
		t.Fatalf("Load() unexpected error: %v", err)
	}
	if cfg.KeywordCase != config.KeywordUpper {
		t.Errorf("KeywordCase: got %q, want %q", cfg.KeywordCase, config.KeywordUpper)
	}
	// defaults preserved
	if cfg.IndentStyle != config.IndentTab {
		t.Errorf("IndentStyle: got %q, want %q (default)", cfg.IndentStyle, config.IndentTab)
	}
	if cfg.IndentWidth != 4 {
		t.Errorf("IndentWidth: got %d, want 4 (default)", cfg.IndentWidth)
	}
	if cfg.CommaStyle != config.CommaLeading {
		t.Errorf("CommaStyle: got %q, want %q (default)", cfg.CommaStyle, config.CommaLeading)
	}
}

func TestLoadInvalidKeywordCase(t *testing.T) {
	path := writeTemp(t, "keyword_case: mixed\n")
	_, err := config.Load(path)
	if err == nil {
		t.Fatal("Load() expected error for invalid keyword_case, got nil")
	}
}

func TestLoadInvalidIndentStyle(t *testing.T) {
	path := writeTemp(t, "indent_style: emoji\n")
	_, err := config.Load(path)
	if err == nil {
		t.Fatal("Load() expected error for invalid indent_style, got nil")
	}
}

func TestLoadInvalidIndentWidth(t *testing.T) {
	path := writeTemp(t, "indent_width: 0\n")
	_, err := config.Load(path)
	if err == nil {
		t.Fatal("Load() expected error for indent_width 0, got nil")
	}
}

func TestLoadInvalidCommaStyle(t *testing.T) {
	path := writeTemp(t, "comma_style: middle\n")
	_, err := config.Load(path)
	if err == nil {
		t.Fatal("Load() expected error for invalid comma_style, got nil")
	}
}

func TestFindAndLoadFindsFile(t *testing.T) {
	// Build: root/sub/grandchild — place .sqlfmt.yml in root, start from grandchild.
	root := t.TempDir()
	sub := filepath.Join(root, "sub")
	grandchild := filepath.Join(sub, "grandchild")
	for _, d := range []string{sub, grandchild} {
		if err := os.MkdirAll(d, 0o755); err != nil {
			t.Fatalf("MkdirAll: %v", err)
		}
	}
	cfgPath := filepath.Join(root, ".sqlfmt.yml")
	if err := os.WriteFile(cfgPath, []byte("keyword_case: upper\n"), 0o644); err != nil {
		t.Fatalf("WriteFile: %v", err)
	}

	cfg, err := config.FindAndLoad(grandchild)
	if err != nil {
		t.Fatalf("FindAndLoad() unexpected error: %v", err)
	}
	if cfg.KeywordCase != config.KeywordUpper {
		t.Errorf("KeywordCase: got %q, want %q", cfg.KeywordCase, config.KeywordUpper)
	}
}

func TestFindAndLoadReturnsDefaultWhenAbsent(t *testing.T) {
	dir := t.TempDir()
	cfg, err := config.FindAndLoad(dir)
	if err != nil {
		t.Fatalf("FindAndLoad() unexpected error: %v", err)
	}
	want := config.Default()
	if !reflect.DeepEqual(cfg, want) {
		t.Errorf("FindAndLoad() got %+v, want default %+v", cfg, want)
	}
}

func TestLoadLintRulesValid(t *testing.T) {
	content := `
keyword_case: lower
lint:
  inline-primary-key: error
  unnamed-primary-key: off
`
	path := writeTemp(t, content)
	cfg, err := config.Load(path)
	if err != nil {
		t.Fatalf("Load() unexpected error: %v", err)
	}
	if cfg.LintRules[config.RuleInlinePrimaryKey] != config.RuleSeverityError {
		t.Errorf("inline-primary-key: got %q, want %q", cfg.LintRules[config.RuleInlinePrimaryKey], config.RuleSeverityError)
	}
	if cfg.LintRules[config.RuleUnnamedPrimaryKey] != config.RuleSeverityOff {
		t.Errorf("unnamed-primary-key: got %q, want %q", cfg.LintRules[config.RuleUnnamedPrimaryKey], config.RuleSeverityOff)
	}
}

func TestLoadLintRulesNoSection(t *testing.T) {
	path := writeTemp(t, "keyword_case: lower\n")
	cfg, err := config.Load(path)
	if err != nil {
		t.Fatalf("Load() unexpected error: %v", err)
	}
	if cfg.LintRules != nil {
		t.Errorf("LintRules: got %v, want nil", cfg.LintRules)
	}
}

func TestLoadLintRulesUnknownRule(t *testing.T) {
	path := writeTemp(t, "lint:\n  no-such-rule: warn\n")
	_, err := config.Load(path)
	if err == nil {
		t.Fatal("Load() expected error for unknown lint rule, got nil")
	}
}

func TestLoadLintRulesInvalidSeverity(t *testing.T) {
	path := writeTemp(t, "lint:\n  inline-primary-key: loud\n")
	_, err := config.Load(path)
	if err == nil {
		t.Fatal("Load() expected error for invalid severity, got nil")
	}
}

// writeTemp writes content to a temporary file and returns its path.
func writeTemp(t *testing.T, content string) string {
	t.Helper()
	f, err := os.CreateTemp(t.TempDir(), "sqlfmt-*.yml")
	if err != nil {
		t.Fatalf("CreateTemp: %v", err)
	}
	if _, err := f.WriteString(content); err != nil {
		t.Fatalf("WriteString: %v", err)
	}
	if err := f.Close(); err != nil {
		t.Fatalf("Close: %v", err)
	}
	return f.Name()
}
