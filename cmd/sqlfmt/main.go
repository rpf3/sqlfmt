package main

import (
	"fmt"
	"io"
	"os"

	"github.com/rpf3/sqlfmt/internal/formatter"
)

func main() {
	input, err := io.ReadAll(os.Stdin)
	if err != nil {
		fmt.Fprintf(os.Stderr, "sqlfmt: failed to read input: %v\n", err)
		os.Exit(1)
	}

	output, err := formatter.Format(string(input))
	if err != nil {
		fmt.Fprintf(os.Stderr, "sqlfmt: %v\n", err)
		os.Exit(1)
	}

	fmt.Print(output)
}
