# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`sqlfmt` is a SQL formatter written in Go, currently in early development on the `mvp` branch.

## Commands

Once `go.mod` exists, standard Go commands apply:

```sh
go build ./...          # Build all packages
go test ./...           # Run all tests
go test ./pkg/foo/...   # Run tests in a specific package
go test -run TestName   # Run a single test by name
go vet ./...            # Static analysis
```

For linting, this project will likely use `golangci-lint`:
```sh
golangci-lint run       # Run linter (install: https://golangci-lint.run)
```
