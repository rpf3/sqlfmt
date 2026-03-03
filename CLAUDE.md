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

Before every commit, run the full check suite:
```sh
task fmt && task test && task vet && task lint
```

## Git workflow

- Prefer rebase + fast-forward; always open a PR, never merge locally
- One issue per commit maximum — a large feature may span multiple commits, but a single commit must not touch more than one issue
- No parenthetical scopes in conventional commit types (`feat:` not `feat(pkg):`)
- Reference issues with `Closes #N` after a blank line in the commit body
- Commit message bodies should explain interesting technical decisions — why a particular approach was chosen, what alternatives were considered, or any non-obvious constraints that shaped the implementation
- Always end PR bodies with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`

## Go style

- Use intermediate variables before `return` — avoid inline struct literals for complex returns
- Build structs incrementally (`col.PrimaryKey = true`) rather than populating all fields in a struct literal
