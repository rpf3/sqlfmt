package main

import (
	"bytes"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

// formatted is a minimal already-formatted SQL statement used as golden input.
const formatted = "create table t\n(\n\tid integer not null\n);\n"

// messy is the same statement in a form that needs formatting.
const messy = "CREATE TABLE t(id INTEGER NOT NULL);"

func TestRunFormat(t *testing.T) {
	var stdout, stderr bytes.Buffer
	code := run(nil, strings.NewReader(messy), &stdout, &stderr)
	if code != 0 {
		t.Fatalf("expected exit 0, got %d; stderr: %s", code, stderr.String())
	}
	if stdout.String() != formatted {
		t.Errorf("stdout:\ngot:  %q\nwant: %q", stdout.String(), formatted)
	}
	if stderr.String() != "" {
		t.Errorf("expected no stderr, got %q", stderr.String())
	}
}

func TestRunCheckPasses(t *testing.T) {
	var stdout, stderr bytes.Buffer
	code := run([]string{"--check"}, strings.NewReader(formatted), &stdout, &stderr)
	if code != 0 {
		t.Fatalf("expected exit 0 for already-formatted input, got %d; stderr: %s", code, stderr.String())
	}
	if stdout.String() != "" {
		t.Errorf("expected no stdout in --check mode, got %q", stdout.String())
	}
}

func TestRunCheckFails(t *testing.T) {
	var stdout, stderr bytes.Buffer
	code := run([]string{"--check"}, strings.NewReader(messy), &stdout, &stderr)
	if code == 0 {
		t.Fatal("expected non-zero exit for unformatted input")
	}
	if !strings.Contains(stderr.String(), "not formatted") {
		t.Errorf("expected 'not formatted' in stderr, got %q", stderr.String())
	}
	if stdout.String() != "" {
		t.Errorf("expected no stdout in --check mode, got %q", stdout.String())
	}
}

func TestRunInit(t *testing.T) {
	dir := t.TempDir()
	var stderr bytes.Buffer
	code := runInit(dir, &stderr)
	if code != 0 {
		t.Fatalf("expected exit 0, got %d; stderr: %s", code, stderr.String())
	}
	if stderr.String() != "" {
		t.Errorf("expected no stderr, got %q", stderr.String())
	}
	path := filepath.Join(dir, ".sqlfmt.yml")
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("could not read written config: %v", err)
	}
	for _, want := range []string{"keyword_case", "indent_style", "indent_width", "comma_style", "warnings_as_errors"} {
		if !strings.Contains(string(data), want) {
			t.Errorf("written config missing %q", want)
		}
	}
	cfg, err := config.Load(path)
	if err != nil {
		t.Fatalf("config.Load failed on written file: %v", err)
	}
	def := config.Default()
	if cfg.KeywordCase != def.KeywordCase {
		t.Errorf("keyword_case = %q, want %q", cfg.KeywordCase, def.KeywordCase)
	}
	if cfg.IndentStyle != def.IndentStyle {
		t.Errorf("indent_style = %q, want %q", cfg.IndentStyle, def.IndentStyle)
	}
	if cfg.IndentWidth != def.IndentWidth {
		t.Errorf("indent_width = %d, want %d", cfg.IndentWidth, def.IndentWidth)
	}
	if cfg.CommaStyle != def.CommaStyle {
		t.Errorf("comma_style = %q, want %q", cfg.CommaStyle, def.CommaStyle)
	}
}

func TestRunInitAlreadyExists(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, ".sqlfmt.yml")
	if err := os.WriteFile(path, []byte("keyword_case: upper\n"), 0o644); err != nil {
		t.Fatal(err)
	}
	var stderr bytes.Buffer
	code := runInit(dir, &stderr)
	if code == 0 {
		t.Fatal("expected non-zero exit when file already exists")
	}
	if !strings.Contains(stderr.String(), "already exists") {
		t.Errorf("expected 'already exists' in stderr, got %q", stderr.String())
	}
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(data), "upper") {
		t.Error("original file was clobbered")
	}
}

func TestRunParseError(t *testing.T) {
	var stdout, stderr bytes.Buffer
	code := run(nil, strings.NewReader("this is not valid sql"), &stdout, &stderr)
	if code == 0 {
		t.Fatal("expected non-zero exit for invalid SQL")
	}
	if stderr.String() == "" {
		t.Error("expected error message on stderr")
	}
	if stdout.String() != "" {
		t.Errorf("expected no stdout on parse error, got %q", stdout.String())
	}
}
