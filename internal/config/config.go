package config

import (
	"fmt"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

// KeywordCase controls whether SQL keywords are uppercased or lowercased.
type KeywordCase string

const (
	KeywordLower KeywordCase = "lower"
	KeywordUpper KeywordCase = "upper"
)

// IndentStyle controls whether indentation uses tabs or spaces.
type IndentStyle string

const (
	IndentTab    IndentStyle = "tab"
	IndentSpaces IndentStyle = "spaces"
)

// CommaStyle controls whether commas are placed before or after each item.
type CommaStyle string

const (
	CommaLeading  CommaStyle = "leading"
	CommaTrailing CommaStyle = "trailing"
)

// RuleSeverity controls how a lint rule is reported.
type RuleSeverity string

const (
	RuleSeverityOff   RuleSeverity = "off"
	RuleSeverityWarn  RuleSeverity = "warn"
	RuleSeverityError RuleSeverity = "error"
)

// Lint rule name constants — used in .sqlfmt.yml and referenced by the linter.
const (
	RuleInlinePrimaryKey         = "inline-primary-key"
	RuleUnnamedPrimaryKey        = "unnamed-primary-key"
	RuleUnnamedDefault           = "unnamed-default"
	RuleIndexDirection           = "index-direction"
	RuleOrderByDirection         = "order-by-direction"
	RuleAliasWithoutAs           = "alias-without-as"
	RuleNoLimit                  = "no-limit"
	RuleOffsetRows               = "offset-rows"
	RuleExistsSelectOne          = "exists-select-one"
	RuleDeleteWithoutWhere       = "delete-without-where"
	RuleInsertColumnList         = "insert-column-list"
	RuleUpdateWithoutWhere       = "update-without-where"
	RuleSelectStar               = "select-star"
	RuleMissingTrailingSemicolon = "missing-trailing-semicolon"
	RuleUnaliasedTable           = "unaliased-table"
)

// knownRules is the set of valid lint rule names for config validation.
var knownRules = map[string]bool{
	RuleInlinePrimaryKey:         true,
	RuleUnnamedPrimaryKey:        true,
	RuleUnnamedDefault:           true,
	RuleIndexDirection:           true,
	RuleOrderByDirection:         true,
	RuleAliasWithoutAs:           true,
	RuleNoLimit:                  true,
	RuleOffsetRows:               true,
	RuleExistsSelectOne:          true,
	RuleDeleteWithoutWhere:       true,
	RuleInsertColumnList:         true,
	RuleUpdateWithoutWhere:       true,
	RuleSelectStar:               true,
	RuleMissingTrailingSemicolon: true,
	RuleUnaliasedTable:           true,
}

// Config holds all formatting and linting options for sqlfmt.
type Config struct {
	KeywordCase      KeywordCase             `yaml:"keyword_case"`
	IndentStyle      IndentStyle             `yaml:"indent_style"`
	IndentWidth      int                     `yaml:"indent_width"`
	CommaStyle       CommaStyle              `yaml:"comma_style"`
	WarningsAsErrors bool                    `yaml:"warnings_as_errors"`
	LintRules        map[string]RuleSeverity `yaml:"lint"`
}

// Default returns a Config with the canonical default values.
func Default() Config {
	return Config{
		KeywordCase: KeywordLower,
		IndentStyle: IndentTab,
		IndentWidth: 4,
		CommaStyle:  CommaLeading,
	}
}

// Load reads a YAML config file at path and returns the resulting Config.
// Fields omitted from the file keep their Default() values.
func Load(path string) (Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return Config{}, fmt.Errorf("config: read %s: %w", path, err)
	}
	cfg := Default()
	if err := yaml.Unmarshal(data, &cfg); err != nil {
		return Config{}, fmt.Errorf("config: parse %s: %w", path, err)
	}
	if err := validate(cfg); err != nil {
		return Config{}, fmt.Errorf("config: %s: %w", path, err)
	}
	return cfg, nil
}

// FindAndLoad searches for a .sqlfmt.yml file starting at startDir and
// walking up toward the filesystem root. If no file is found, it returns
// Default() with a nil error.
func FindAndLoad(startDir string) (Config, error) {
	const filename = ".sqlfmt.yml"
	dir := startDir
	for {
		candidate := filepath.Join(dir, filename)
		if _, err := os.Stat(candidate); err == nil {
			return Load(candidate)
		}
		parent := filepath.Dir(dir)
		if parent == dir {
			// reached filesystem root without finding the file
			break
		}
		dir = parent
	}
	return Default(), nil
}

func validate(cfg Config) error {
	switch cfg.KeywordCase {
	case KeywordLower, KeywordUpper:
	default:
		return fmt.Errorf("invalid keyword_case %q: must be \"lower\" or \"upper\"", cfg.KeywordCase)
	}
	switch cfg.IndentStyle {
	case IndentTab, IndentSpaces:
	default:
		return fmt.Errorf("invalid indent_style %q: must be \"tab\" or \"spaces\"", cfg.IndentStyle)
	}
	if cfg.IndentWidth < 1 {
		return fmt.Errorf("invalid indent_width %d: must be >= 1", cfg.IndentWidth)
	}
	switch cfg.CommaStyle {
	case CommaLeading, CommaTrailing:
	default:
		return fmt.Errorf("invalid comma_style %q: must be \"leading\" or \"trailing\"", cfg.CommaStyle)
	}
	for rule, sev := range cfg.LintRules {
		if !knownRules[rule] {
			return fmt.Errorf("invalid lint rule %q: unknown rule name", rule)
		}
		if sev != RuleSeverityOff && sev != RuleSeverityWarn && sev != RuleSeverityError {
			return fmt.Errorf("invalid severity %q for lint rule %q: must be \"off\", \"warn\", or \"error\"", sev, rule)
		}
	}
	return nil
}
