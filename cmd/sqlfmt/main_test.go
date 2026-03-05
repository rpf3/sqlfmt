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

// writeTempSQL writes content to a temp file named test.sql and returns its path.
func writeTempSQL(t *testing.T, content string) string {
	t.Helper()
	dir := t.TempDir()
	path := filepath.Join(dir, "test.sql")
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatal(err)
	}
	return path
}

func TestRunFormat(t *testing.T) {
	path := writeTempSQL(t, messy)
	var stderr bytes.Buffer
	code := run([]string{path}, &stderr)
	if code != 0 {
		t.Fatalf("expected exit 0, got %d; stderr: %s", code, stderr.String())
	}
	if stderr.String() != "" {
		t.Errorf("expected no stderr, got %q", stderr.String())
	}
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	if string(data) != formatted {
		t.Errorf("file content:\ngot:  %q\nwant: %q", string(data), formatted)
	}
}

func TestRunCheckPasses(t *testing.T) {
	path := writeTempSQL(t, formatted)
	var stderr bytes.Buffer
	code := run([]string{"--check", path}, &stderr)
	if code != 0 {
		t.Fatalf("expected exit 0 for already-formatted file, got %d; stderr: %s", code, stderr.String())
	}
}

func TestRunCheckFails(t *testing.T) {
	path := writeTempSQL(t, messy)
	var stderr bytes.Buffer
	code := run([]string{"--check", path}, &stderr)
	if code == 0 {
		t.Fatal("expected non-zero exit for unformatted file")
	}
	if !strings.Contains(stderr.String(), "not formatted") {
		t.Errorf("expected 'not formatted' in stderr, got %q", stderr.String())
	}
}

func TestRunMultipleFiles(t *testing.T) {
	path1 := writeTempSQL(t, messy)
	path2 := writeTempSQL(t, messy)
	var stderr bytes.Buffer
	code := run([]string{path1, path2}, &stderr)
	if code != 0 {
		t.Fatalf("expected exit 0, got %d; stderr: %s", code, stderr.String())
	}
	for _, path := range []string{path1, path2} {
		data, err := os.ReadFile(path)
		if err != nil {
			t.Fatal(err)
		}
		if string(data) != formatted {
			t.Errorf("%s: got %q, want %q", path, string(data), formatted)
		}
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

func TestRunDirectory(t *testing.T) {
	dir := t.TempDir()
	path1 := filepath.Join(dir, "a.sql")
	path2 := filepath.Join(dir, "b.sql")
	for _, p := range []string{path1, path2} {
		if err := os.WriteFile(p, []byte(messy), 0o644); err != nil {
			t.Fatal(err)
		}
	}
	var stderr bytes.Buffer
	code := run([]string{dir}, &stderr)
	if code != 0 {
		t.Fatalf("expected exit 0, got %d; stderr: %s", code, stderr.String())
	}
	for _, p := range []string{path1, path2} {
		data, err := os.ReadFile(p)
		if err != nil {
			t.Fatal(err)
		}
		if string(data) != formatted {
			t.Errorf("%s: got %q, want %q", p, string(data), formatted)
		}
	}
}

func TestRunDirectoryIgnoresNonSQL(t *testing.T) {
	dir := t.TempDir()
	sqlPath := filepath.Join(dir, "a.sql")
	txtPath := filepath.Join(dir, "notes.txt")
	if err := os.WriteFile(sqlPath, []byte(messy), 0o644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(txtPath, []byte("not sql"), 0o644); err != nil {
		t.Fatal(err)
	}
	var stderr bytes.Buffer
	code := run([]string{dir}, &stderr)
	if code != 0 {
		t.Fatalf("expected exit 0, got %d; stderr: %s", code, stderr.String())
	}
	// .txt file must be untouched
	data, _ := os.ReadFile(txtPath)
	if string(data) != "not sql" {
		t.Errorf("non-SQL file was modified")
	}
}

func TestRunDirectoryEmpty(t *testing.T) {
	dir := t.TempDir()
	var stderr bytes.Buffer
	code := run([]string{dir}, &stderr)
	if code != 0 {
		t.Fatalf("expected exit 0 for directory with no SQL files, got %d", code)
	}
}

func TestRunDirectoryCheckFails(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "a.sql"), []byte(messy), 0o644); err != nil {
		t.Fatal(err)
	}
	var stderr bytes.Buffer
	code := run([]string{"--check", dir}, &stderr)
	if code == 0 {
		t.Fatal("expected non-zero exit for unformatted file in directory")
	}
	if !strings.Contains(stderr.String(), "not formatted") {
		t.Errorf("expected 'not formatted' in stderr, got %q", stderr.String())
	}
}

func TestRunParseError(t *testing.T) {
	path := writeTempSQL(t, "this is not valid sql")
	var stderr bytes.Buffer
	code := run([]string{path}, &stderr)
	if code == 0 {
		t.Fatal("expected non-zero exit for invalid SQL")
	}
	if stderr.String() == "" {
		t.Error("expected error message on stderr")
	}
}
