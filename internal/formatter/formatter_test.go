package formatter

import (
	"os"
	"testing"
)

// TestFormatGolden reads the golden file from testdata/baking/schema.sql and
// verifies that Format produces output identical to the golden file.
func TestFormatGolden(t *testing.T) {
	golden, err := os.ReadFile("testdata/baking/schema.sql")
	if err != nil {
		t.Fatalf("could not read golden file: %v", err)
	}
	want := string(golden)

	// Use a messily formatted but semantically identical input.
	input := `create table ingredients(id integer NOT NULL,name VARCHAR(255) DEFAULT 'unnamed' not null,PRIMARY KEY(id));
create table recipes(id integer NOT NULL,name VARCHAR( 255 ) DEFAULT 'untitled' NOT NULL,description VARCHAR(1000) DEFAULT NULL NULL,PRIMARY KEY( id ));`

	got, err := Format(input)
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if got != want {
		t.Errorf("Format() output does not match golden file.\ngot:\n%s\nwant:\n%s", got, want)
	}
}

// TestFormatIdempotent verifies that formatting the golden file produces the
// same output again (Format(Format(x)) == Format(x)).
func TestFormatIdempotent(t *testing.T) {
	golden, err := os.ReadFile("testdata/baking/schema.sql")
	if err != nil {
		t.Fatalf("could not read golden file: %v", err)
	}
	input := string(golden)

	first, err := Format(input)
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
}

// TestFormatParseError verifies that invalid SQL returns a non-nil error.
func TestFormatParseError(t *testing.T) {
	_, err := Format("this is not valid sql")
	if err == nil {
		t.Error("Format() expected error for invalid SQL, got nil")
	}
}
