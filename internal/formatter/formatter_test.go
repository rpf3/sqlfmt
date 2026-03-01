package formatter

import (
	"flag"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

var update = flag.Bool("update", false, "update golden files")

// TestFormatGolden verifies that Format produces output identical to each
// golden file when given the corresponding messily formatted input file.
// Pairs are discovered automatically: testdata/<name>.input.sql is the input,
// testdata/<name>.sql is the expected output.
//
// Run with -update to regenerate golden files instead of failing:
//
//	go test ./internal/formatter/... -update
func TestFormatGolden(t *testing.T) {
	inputs, err := filepath.Glob("testdata/*.input.sql")
	if err != nil {
		t.Fatalf("could not glob testdata: %v", err)
	}
	if len(inputs) == 0 {
		t.Fatal("no input files found in testdata/")
	}
	for _, inputPath := range inputs {
		stem := strings.TrimSuffix(filepath.Base(inputPath), ".input.sql")
		goldenPath := filepath.Join("testdata", stem+".sql")
		t.Run(stem, func(t *testing.T) {
			input, err := os.ReadFile(inputPath)
			if err != nil {
				t.Fatalf("could not read input file: %v", err)
			}
			got, err := Format(string(input), config.Default())
			if err != nil {
				t.Fatalf("Format() unexpected error: %v", err)
			}
			if *update {
				if err := os.WriteFile(goldenPath, []byte(got), 0o644); err != nil {
					t.Fatalf("could not update golden file: %v", err)
				}
				return
			}
			golden, err := os.ReadFile(goldenPath)
			if err != nil {
				t.Fatalf("could not read golden file: %v", err)
			}
			if got != string(golden) {
				t.Errorf("Format() output does not match golden file.\ngot:\n%s\nwant:\n%s", got, string(golden))
			}
		})
	}
}

// TestFormatIdempotent verifies that formatting any golden file produces the
// same output again (Format(Format(x)) == Format(x)). It picks up all
// testdata/*.sql files automatically, so new golden files are covered without
// any changes to this test. Input files (*.input.sql) are excluded — they are
// not canonical SQL and idempotency is only meaningful on golden output.
func TestFormatIdempotent(t *testing.T) {
	files, err := filepath.Glob("testdata/*.sql")
	if err != nil {
		t.Fatalf("could not glob testdata: %v", err)
	}
	if len(files) == 0 {
		t.Fatal("no golden files found in testdata/")
	}
	for _, path := range files {
		if strings.HasSuffix(path, ".input.sql") {
			continue
		}
		t.Run(filepath.Base(path), func(t *testing.T) {
			golden, err := os.ReadFile(path)
			if err != nil {
				t.Fatalf("could not read %s: %v", path, err)
			}
			first, err := Format(string(golden), config.Default())
			if err != nil {
				t.Fatalf("Format() first pass unexpected error: %v", err)
			}
			second, err := Format(first, config.Default())
			if err != nil {
				t.Fatalf("Format() second pass unexpected error: %v", err)
			}
			if first != second {
				t.Errorf("Format is not idempotent.\nfirst:\n%s\nsecond:\n%s", first, second)
			}
		})
	}
}

// TestFormatParseError verifies that invalid SQL returns a non-nil error.
func TestFormatParseError(t *testing.T) {
	_, err := Format("this is not valid sql", config.Default())
	if err == nil {
		t.Error("Format() expected error for invalid SQL, got nil")
	}
}

// TestFormatKeywordCase verifies that keyword_case: upper uppercases all keywords.
func TestFormatKeywordCase(t *testing.T) {
	input := "create table t (id integer not null);"

	t.Run("lower", func(t *testing.T) {
		cfg := config.Default()
		cfg.KeywordCase = config.KeywordLower
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		if strings.Contains(got, "CREATE") || strings.Contains(got, "TABLE") || strings.Contains(got, "INTEGER") {
			t.Errorf("lower mode contains uppercase keywords:\n%s", got)
		}
		if !strings.Contains(got, "create table") {
			t.Errorf("lower mode missing 'create table':\n%s", got)
		}
		if !strings.Contains(got, "not null") {
			t.Errorf("lower mode missing 'not null':\n%s", got)
		}
	})

	t.Run("upper", func(t *testing.T) {
		cfg := config.Default()
		cfg.KeywordCase = config.KeywordUpper
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		if !strings.Contains(got, "CREATE TABLE") {
			t.Errorf("upper mode missing 'CREATE TABLE':\n%s", got)
		}
		if !strings.Contains(got, "NOT NULL") {
			t.Errorf("upper mode missing 'NOT NULL':\n%s", got)
		}
		if !strings.Contains(got, "INTEGER") {
			t.Errorf("upper mode missing 'INTEGER':\n%s", got)
		}
	})
}

// TestFormatIndentStyle verifies tab vs spaces indentation.
func TestFormatIndentStyle(t *testing.T) {
	input := "create table t (id integer not null, name varchar(50) not null);"

	t.Run("tab", func(t *testing.T) {
		cfg := config.Default()
		cfg.IndentStyle = config.IndentTab
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		if !strings.Contains(got, "\t") {
			t.Errorf("tab mode: no tab character found:\n%s", got)
		}
	})

	t.Run("spaces4", func(t *testing.T) {
		cfg := config.Default()
		cfg.IndentStyle = config.IndentSpaces
		cfg.IndentWidth = 4
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		if strings.Contains(got, "\t") {
			t.Errorf("spaces4 mode: tab character found:\n%s", got)
		}
		if !strings.Contains(got, "    ") {
			t.Errorf("spaces4 mode: no 4-space indent found:\n%s", got)
		}
	})

	t.Run("spaces2", func(t *testing.T) {
		cfg := config.Default()
		cfg.IndentStyle = config.IndentSpaces
		cfg.IndentWidth = 2
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		if strings.Contains(got, "\t") {
			t.Errorf("spaces2 mode: tab character found:\n%s", got)
		}
		// lines should be indented with exactly 2 spaces
		lines := strings.Split(got, "\n")
		found := false
		for _, line := range lines {
			if strings.HasPrefix(line, "  ") && !strings.HasPrefix(line, "   ") {
				found = true
				break
			}
		}
		if !found {
			t.Errorf("spaces2 mode: no 2-space-only indent found:\n%s", got)
		}
	})
}
