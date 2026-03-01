package main

import (
	"flag"
	"fmt"
	"io"
	"os"

	"github.com/rpf3/sqlfmt/internal/formatter"
)

func main() {
	os.Exit(run(os.Args[1:], os.Stdin, os.Stdout, os.Stderr))
}

// run is the testable entry point. It returns the process exit code.
func run(args []string, stdin io.Reader, stdout, stderr io.Writer) int {
	fs := flag.NewFlagSet("sqlfmt", flag.ContinueOnError)
	fs.SetOutput(stderr)
	check := fs.Bool("check", false, "exit non-zero if input is not formatted; write nothing")

	if err := fs.Parse(args); err != nil {
		if err == flag.ErrHelp {
			return 0
		}
		return 1
	}

	input, err := io.ReadAll(stdin)
	if err != nil {
		fmt.Fprintf(stderr, "sqlfmt: failed to read input: %v\n", err)
		return 1
	}

	output, err := formatter.Format(string(input))
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
