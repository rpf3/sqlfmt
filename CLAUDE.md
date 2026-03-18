# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`sqlfmt` is a SQL formatter written in Go. Module: `github.com/rpf3/sqlfmt`, Go 1.24.

## Commands

```sh
go build ./...                      # Build all packages
go test ./...                       # Run all tests
go test ./internal/parser/...       # Run tests in a specific package
go test -run TestName               # Run a single test by name
go vet ./...                        # Static analysis
golangci-lint run                   # Lint (install: https://golangci-lint.run)
```

Before every commit, run the full check suite:
```sh
task fmt && task test && task vet && task lint
```

## Git workflow

- **Always create a branch before starting any work** — never commit feature or fix work directly to `main`. Name branches `feat/issue-N-short-desc` or `refactor/issue-N-short-desc` etc.
- Prefer rebase + fast-forward; always open a PR, never merge locally
- One issue per commit maximum — a large feature may span multiple commits, but a single commit must not touch more than one issue. When a shared file (e.g. `config.go`) needs changes for multiple issues, add only the changes for the current issue to that file before committing; add the next issue's changes in the next commit.
- **Work on one issue at a time** — fully implement, test, and commit one issue before starting the next. Never implement multiple issues in parallel even when they touch the same files; doing so requires backing out changes to split commits, which is error-prone and wastes effort
- **Commit incidental fixes and tangential work separately** — when a bug or related improvement is discovered while implementing a feature, do not bundle it into the feature commit. Finish and commit the feature first (or stash it), then make the fix or tangential change as its own commit with its own message. This keeps each commit's scope honest and makes history easier to bisect
- No parenthetical scopes in conventional commit types (`feat:` not `feat(pkg):`)
- Reference issues with `Closes #N` after a blank line in the commit body
- Commit message bodies should explain interesting technical decisions — why a particular approach was chosen, what alternatives were considered, or any non-obvious constraints that shaped the implementation
- PR descriptions must enumerate every issue closed by any commit in the PR — list them explicitly in the summary (e.g. `Closes #N, #M`) even if they are already referenced in individual commit bodies
- Always end PR bodies with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`

## Go style

- Use intermediate variables before `return` — avoid inline struct literals for complex returns
- Build structs incrementally (`col.PrimaryKey = true`) rather than populating all fields in a struct literal
- Error strings must be lowercase and must not end with `.` or `!` — they are often wrapped and appear mid-sentence in longer messages (e.g. `fmt.Errorf("parse %s: %w", path, err)`)
- Use `%w` (not `%v`) when wrapping an existing error in `fmt.Errorf` — `%w` preserves the error chain for `errors.Is` / `errors.As`; use `%v` only when intentionally discarding the original error type
- Every exported identifier (type, function, method, const, var) must have a godoc comment that begins with the name of the thing being documented (e.g. `// Format formats SQL input according to cfg.`)
- Every package must have a `// Package foo ...` doc comment before the `package` declaration — explain the design intent and any non-obvious invariants, not just the package name
