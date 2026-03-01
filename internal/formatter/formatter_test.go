package formatter

import (
	"flag"
	"os"
	"path/filepath"
	"strings"
	"testing"
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
			got, err := Format(string(input))
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
			first, err := Format(string(golden))
			if err != nil {
				t.Fatalf("Format() first pass unexpected error: %v", err)
			}
			second, err := Format(first)
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
	_, err := Format("this is not valid sql")
	if err == nil {
		t.Error("Format() expected error for invalid SQL, got nil")
	}
}
