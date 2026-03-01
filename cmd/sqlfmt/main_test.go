package main

import (
	"bytes"
	"strings"
	"testing"
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
