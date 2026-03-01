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

// Config holds all formatting options for sqlfmt.
type Config struct {
	KeywordCase KeywordCase `yaml:"keyword_case"`
	IndentStyle IndentStyle `yaml:"indent_style"`
	IndentWidth int         `yaml:"indent_width"`
	CommaStyle  CommaStyle  `yaml:"comma_style"`
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
	return nil
}
