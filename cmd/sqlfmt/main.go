package main

import (
	"flag"
	"fmt"
	"io"
	"os"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/formatter"
	"github.com/rpf3/sqlfmt/internal/linter"
)

func main() {
	os.Exit(run(os.Args[1:], os.Stdin, os.Stdout, os.Stderr))
}

// run is the testable entry point. It returns the process exit code.
func run(args []string, stdin io.Reader, stdout, stderr io.Writer) int {
	fs := flag.NewFlagSet("sqlfmt", flag.ContinueOnError)
	fs.SetOutput(stderr)
	check := fs.Bool("check", false, "exit non-zero if input is not formatted; write nothing")
	warningsAsErrors := fs.Bool("warnings-as-errors", false, "exit non-zero if any lint warnings are emitted")

	if err := fs.Parse(args); err != nil {
		if err == flag.ErrHelp {
			return 0
		}
		return 1
	}

	cwd, err := os.Getwd()
	if err != nil {
		fmt.Fprintf(stderr, "sqlfmt: could not determine working directory: %v\n", err)
		return 1
	}
	cfg, err := config.FindAndLoad(cwd)
	if err != nil {
		fmt.Fprintf(stderr, "sqlfmt: config error: %v\n", err)
		return 1
	}

	input, err := io.ReadAll(stdin)
	if err != nil {
		fmt.Fprintf(stderr, "sqlfmt: failed to read input: %v\n", err)
		return 1
	}

	warnings, err := linter.Lint(string(input), cfg)
	if err != nil {
		fmt.Fprintf(stderr, "sqlfmt: %v\n", err)
		return 1
	}
	wae := cfg.WarningsAsErrors || *warningsAsErrors
	hasLintError := false
	for _, w := range warnings {
		fmt.Fprintf(stderr, "sqlfmt: lint [%s]: %s\n", w.Rule, w.Message)
		if w.Severity == config.RuleSeverityError || wae {
			hasLintError = true
		}
	}
	if hasLintError {
		return 1
	}

	output, err := formatter.Format(string(input), cfg)
	if err != nil {
		fmt.Fprintf(stderr, "sqlfmt: %v\n", err)
		return 1
	}

	if *check {
		if string(input) != output {
			fmt.Fprintln(stderr, "sqlfmt: input is not formatted")
			return 1
		}
		return 0
	}

	fmt.Fprint(stdout, output)
	return 0
}
