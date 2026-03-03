package formatter

import (
	"strings"
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

// TestFormatNamedDefaultConstraint verifies that a named DEFAULT constraint
// round-trips through the formatter correctly.
func TestFormatNamedDefaultConstraint(t *testing.T) {
	input := `create table t (
		id integer not null,
		name varchar(255) constraint df_t_name default 'unknown' not null
	);`
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() unexpected error: %v", err)
	}
	if !strings.Contains(got, "constraint df_t_name default") {
		t.Errorf("expected 'constraint df_t_name default' in output:\n%s", got)
	}
	// Idempotency
	got2, err := Format(got, config.Default())
	if err != nil {
		t.Fatalf("Format() second pass unexpected error: %v", err)
	}
	if got != got2 {
		t.Errorf("Format is not idempotent.\nfirst:\n%s\nsecond:\n%s", got, got2)
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

// TestFormatCommaStyle verifies leading vs trailing comma placement.
func TestFormatCommaStyle(t *testing.T) {
	t.Run("single_col_leading", func(t *testing.T) {
		input := "create table t (id integer not null);"
		cfg := config.Default()
		cfg.CommaStyle = config.CommaLeading
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		// single column: no comma at all
		if strings.Contains(got, ",") {
			t.Errorf("single-col leading: unexpected comma:\n%s", got)
		}
	})

	t.Run("single_col_trailing", func(t *testing.T) {
		input := "create table t (id integer not null);"
		cfg := config.Default()
		cfg.CommaStyle = config.CommaTrailing
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		// single column: no comma at all
		if strings.Contains(got, ",") {
			t.Errorf("single-col trailing: unexpected comma:\n%s", got)
		}
	})

	t.Run("multi_col_leading", func(t *testing.T) {
		input := "create table t (id integer not null, name varchar(50) not null);"
		cfg := config.Default()
		cfg.CommaStyle = config.CommaLeading
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		lines := strings.Split(strings.TrimRight(got, "\n"), "\n")
		// line with 'name' should start with ",\t"
		var nameLine string
		for _, l := range lines {
			if strings.Contains(l, "name") {
				nameLine = l
				break
			}
		}
		if !strings.HasPrefix(nameLine, ",\t") && !strings.HasPrefix(nameLine, ", ") {
			t.Errorf("multi-col leading: name line should start with comma+indent:\n%q", nameLine)
		}
	})

	t.Run("multi_col_trailing", func(t *testing.T) {
		input := "create table t (id integer not null, name varchar(50) not null);"
		cfg := config.Default()
		cfg.CommaStyle = config.CommaTrailing
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		lines := strings.Split(strings.TrimRight(got, "\n"), "\n")
		// 'id' line should end with ","
		var idLine string
		for _, l := range lines {
			if strings.HasPrefix(strings.TrimSpace(l), "id ") {
				idLine = l
				break
			}
		}
		if !strings.HasSuffix(idLine, ",") {
			t.Errorf("multi-col trailing: id line should end with comma:\n%q", idLine)
		}
		// 'name' line should NOT end with ","
		var nameLine string
		for _, l := range lines {
			if strings.HasPrefix(strings.TrimSpace(l), "name ") {
				nameLine = l
				break
			}
		}
		if strings.HasSuffix(nameLine, ",") {
			t.Errorf("multi-col trailing: name (last) line should not end with comma:\n%q", nameLine)
		}
	})

	t.Run("cols_and_constraints_trailing", func(t *testing.T) {
		input := `create table t (
			id integer not null,
			name varchar(50) not null,
			constraint pk_t primary key (id),
			constraint uq_t_name unique (name)
		);`
		cfg := config.Default()
		cfg.CommaStyle = config.CommaTrailing
		got, err := Format(input, cfg)
		if err != nil {
			t.Fatalf("Format() unexpected error: %v", err)
		}
		lines := strings.Split(strings.TrimRight(got, "\n"), "\n")
		// The pk_t body ("primary key (id)") is not the last item, so it ends with ","
		var pkBodyLine string
		for _, l := range lines {
			if strings.Contains(l, "primary key") {
				pkBodyLine = l
				break
			}
		}
		if !strings.HasSuffix(pkBodyLine, ",") {
			t.Errorf("trailing: pk body line should end with comma:\n%q", pkBodyLine)
		}
		// The uq_t_name body ("unique (name)") is the last item — no comma.
		var uqBodyLine string
		for _, l := range lines {
			if strings.Contains(l, "unique") {
				uqBodyLine = l
			}
		}
		if strings.HasSuffix(uqBodyLine, ",") {
			t.Errorf("trailing: last constraint body should not end with comma:\n%q", uqBodyLine)
		}
	})
}
