package main

import (
	"flag"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/formatter"
	"github.com/rpf3/sqlfmt/internal/linter"
)

func main() {
	os.Exit(run(os.Args[1:], os.Stderr))
}

// processFile lints and formats a single SQL file in place.
// In --check mode it reports whether the file is unformatted without writing.
// Returns non-zero on any problem.
func processFile(path string, cfg config.Config, check, wae bool, stderr io.Writer) int {
	input, err := os.ReadFile(path)
	if err != nil {
		fmt.Fprintf(stderr, "sqlfmt: %s: %v\n", path, err)
		return 1
	}

	warnings, err := linter.Lint(string(input), cfg)
	if err != nil {
		fmt.Fprintf(stderr, "sqlfmt: %s: %v\n", path, err)
		return 1
	}
	hasLintError := false
	for _, w := range warnings {
		fmt.Fprintf(stderr, "sqlfmt: %s: lint [%s]: %s\n", path, w.Rule, w.Message)
		if w.Severity == config.RuleSeverityError || wae {
			hasLintError = true
		}
	}
	if hasLintError {
		return 1
	}

	output, err := formatter.Format(string(input), cfg)
	if err != nil {
		fmt.Fprintf(stderr, "sqlfmt: %s: %v\n", path, err)
		return 1
	}

	if check {
		if string(input) != output {
			fmt.Fprintf(stderr, "sqlfmt: %s: not formatted\n", path)
			return 1
		}
		return 0
	}

	if err := os.WriteFile(path, []byte(output), 0o644); err != nil {
		fmt.Fprintf(stderr, "sqlfmt: %s: %v\n", path, err)
		return 1
	}
	return 0
}

// defaultConfig is written by "sqlfmt init" to .sqlfmt.yml.
const defaultConfig = `# sqlfmt configuration — https://github.com/rpf3/sqlfmt

# keyword_case: how SQL keywords are rendered. Options: lower, upper
keyword_case: lower

# indent_style: indentation character. Options: tab, spaces
indent_style: tab

# indent_width: number of spaces when indent_style is "spaces"
indent_width: 2

# comma_style: comma placement. Options: leading, trailing
comma_style: leading

# warnings_as_errors: treat all lint warnings as errors (equivalent to --warnings-as-errors flag)
warnings_as_errors: false
`

// runInit writes a default .sqlfmt.yml to dir. Returns a process exit code.
func runInit(dir string, stderr io.Writer) int {
	path := filepath.Join(dir, ".sqlfmt.yml")
	f, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o644)
	if err != nil {
		if os.IsExist(err) {
			fmt.Fprintf(stderr, "sqlfmt: .sqlfmt.yml already exists; delete it first if you want to regenerate it\n")
			return 1
		}
		fmt.Fprintf(stderr, "sqlfmt: could not create .sqlfmt.yml: %v\n", err)
		return 1
	}
	defer f.Close()
	if _, err := fmt.Fprint(f, defaultConfig); err != nil {
		fmt.Fprintf(stderr, "sqlfmt: could not write .sqlfmt.yml: %v\n", err)
		return 1
	}
	return 0
}

// run is the testable entry point. It returns the process exit code.
func run(args []string, stderr io.Writer) int {
	if len(args) > 0 && args[0] == "init" {
		cwd, err := os.Getwd()
		if err != nil {
			fmt.Fprintf(stderr, "sqlfmt: could not determine working directory: %v\n", err)
			return 1
		}
		return runInit(cwd, stderr)
	}

	fset := flag.NewFlagSet("sqlfmt", flag.ContinueOnError)
	fset.SetOutput(stderr)
	check := fset.Bool("check", false, "exit non-zero if any file is not formatted; write nothing")
	warningsAsErrors := fset.Bool("warnings-as-errors", false, "exit non-zero if any lint warnings are emitted")

	if err := fset.Parse(args); err != nil {
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

	wae := cfg.WarningsAsErrors || *warningsAsErrors

	exitCode := 0
	for _, path := range fset.Args() {
		if code := processFile(path, cfg, *check, wae, stderr); code != 0 {
			exitCode = code
		}
	}
	return exitCode
}
