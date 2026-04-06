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
- **Surface blockers — never bundle or silently skip them** — when an unexpected bug, version incompatibility, or related improvement is discovered mid-implementation, always surface it to the user before acting. Then apply the rule for its type:
  - **Bug:** fix it inline as a separate `fix:` commit on the same branch; always include a regression test. Only file a GitHub issue if the fix cannot be done inline right now.
  - **Non-bug blocker** (major tooling or dependency version upgrade, ecosystem-level change such as a nixpkgs channel switch, refactor, or new feature): stop and ask how to proceed — file a GitHub issue, block the current work, or defer. Never implement inline without asking first.

### Sub-issues for layered features

Use GitHub sub-issues (numbered `#N.1`, `#N.2`, …) when a feature spans three or more layers that can each be merged independently and reviewed in under 10 minutes.

**Threshold — when to use sub-issues:**

| Scenario | Use sub-issues? |
|---|---|
| Bug fix or config change (< 50 lines) | No — single issue + commit |
| Feature touching 2 tightly coupled layers | No — keep together |
| Feature touching 3+ independent layers | Yes |
| Feature requiring a DB migration | Yes — migration is always sub-issue #1 |
| Feature with an accompanying lint rule | Yes — lint rule is always its own sub-issue |

**sqlfmt layer split** (when sub-issues are warranted):

| Sub-issue | Scope | Notes |
|---|---|---|
| `#N.1` | AST node + parser + dispatcher | Formatter dispatcher may stub-emit raw until #N.2 lands |
| `#N.2` | Formatter + golden tests | The repo is green after #N.1 because the stub keeps builds passing |
| `#N.3` | Companion lint rule | Always its own sub-issue — lint rules are independently useful |

**Before writing any code — create the sub-issues on GitHub:**

Once the plan is confirmed, create each sub-issue (`#N.1`, `#N.2`, …) as a real GitHub issue so
that commit references (`Closes #N.M`) resolve correctly and reviewers can navigate the work.
Each sub-issue body should state its scope, list the files it will touch, and reference the parent
issue. Use the CLI (no `gh issue create --parent` flag exists yet):

```sh
# 1. Create each sub-issue
gh issue create --label "<milestone>" --title "feat: ..." --body "..."

# 2. Link to parent (requires node IDs — GitHub has no native CLI flag for this)
PARENT=$(gh api /repos/OWNER/REPO/issues/N --jq '.node_id')
CHILD=$(gh api /repos/OWNER/REPO/issues/M --jq '.node_id')
gh api graphql -f query='
  mutation($p: ID!, $c: ID!) {
    addSubIssue(input: {issueId: $p, subIssueId: $c}) {
      issue { number }
      subIssue { number }
    }
  }
' -f p="$PARENT" -f c="$CHILD"
```

**Branch and commit structure:**

One branch per parent feature; each commit closes one sub-issue and references it as `Closes #N.M`.

```
feat/42-user-invitations
  commit 1 — feat: add InvitationsRepository       (Closes #42.1)
  commit 2 — feat: add POST /invitations endpoint  (Closes #42.2)
  commit 3 — feat: add InviteUserForm component    (Closes #42.3)
```

The PR description must list every sub-issue closed: `Closes #42, #42.1, #42.2, #42.3`.

## Commit messages

**Subject line format:**

```
type: short imperative description
```

- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `ci`, `chore`
- No parenthetical scopes — `feat:` not `feat(pkg):`
- Keep under 72 characters; use the imperative mood ("add", "fix", "remove" — not "added")
- Avoid `@` in subject lines — GitHub renders `@word` in release notes as a user mention; describe SQL variables in prose instead (e.g. "assignment SELECT" rather than "SET @var = expr")

**Body — the "why" section:**

Every non-trivial commit should have a body that explains:

- The *motivation* — what problem does this solve, or what behaviour changes and why?
- Any non-obvious technical decisions and why that approach was chosen over alternatives
- Constraints that shaped the implementation
- If an obvious or suggested approach was *rejected*, say so and explain why

Don't just restate what the diff shows — assume the reader can read code.

**Issue reference** (after a blank line at the end of the body):

```
Closes #N
```

## Pull request standards

- PR title: short (under 70 characters), imperative, matches the scope of the branch
- PR description must enumerate *every* issue closed by any commit in the PR — list them explicitly (e.g. `Closes #N, #M`) even if already referenced in individual commit bodies
- Summary section: 2–4 bullet points on what changed and why
- Test plan section: what to verify, including edge cases
- Always end PR bodies with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`

## Code generation style

**Scope discipline:**

- Only make changes directly requested or clearly necessary — no scope creep
- Don't add features, refactoring, or "improvements" beyond what was asked
- Don't add docstrings, comments, or type annotations to code you didn't change
- Don't add error handling or validation for scenarios that can't happen in practice — trust internal code and framework guarantees; only validate at system boundaries (user input, external APIs)

**Simplicity over abstraction:**

- Don't create helpers or abstractions for one-off operations
- Don't design for hypothetical future requirements — the right complexity is the minimum needed now; three similar lines is better than a premature abstraction
- Don't use feature flags or backwards-compatibility shims when you can simply change the code
- Don't leave `// removed` comments, unused `_var` renames, or re-exports for deleted code — if something is removed, remove it completely

## Go style

### Variables and types

- Use intermediate variables before `return` — avoid complex inline expressions in return statements or function call arguments
- Build structs incrementally (`col.PrimaryKey = true`) rather than populating all fields in a struct literal when initialization is non-trivial or conditional
- Always name fields in struct literals — never use positional initialization; `Config{4, lower}` compiles but breaks silently when fields are reordered
- Use `var` to declare a zero-initialized slice or map before a loop; use `:=` for initialized values from function calls
- Prefer `x == ""` and `x == nil` over `len(x) == 0` — the intent is clearer (`gocritic` `emptyStringTest` enforces this)

### Functions and methods

- Receiver names: short (1–2 letters), consistent across all methods on a type, never `self` or `this` — sqlfmt uses `l` (lexer, linter), `p` (parser), `f` (formatter)
- All methods on a type must use the same receiver kind (all pointer or all value) — mixing them causes subtle bugs when the type is stored in an interface
- Return concrete types from constructors; return an interface only when genuinely returning one of multiple distinct implementations
- Type definitions must appear before their methods in the file (`gocritic` `typeDefFirst` enforces this)

### Switch statements

- Prefer `switch x { ... }` over `if x == A { } else if x == B { }` when branching on the same variable — applies to token types, enum values, and keyword comparisons
- Use `switch { case condition: ... }` (the switchless switch) for multi-condition branches with three or more cases on different variables
- When switching on a local enum type (`Direction`, `Nullability`, `GroupByModifier`, `RefAction`, etc.), list every variant explicitly — even no-op sentinel cases (`case DirectionNone: // no keyword`) — this documents intent and ensures the compiler catches future enum additions (`exhaustive` in golangci.yml enforces this)
- When a `switch` is nested inside a `for` loop and a `case` must exit the loop, use a labeled break (`break loop`) — a plain `break` exits the switch, not the for loop, and the compiler does not warn

### Error handling

- Error strings must be lowercase and must not end with `.` or `!` — they appear mid-sentence when wrapped (e.g. `fmt.Errorf("parse %s: %w", path, err)`)
- Use `%w` (not `%v`) when wrapping an existing error in `fmt.Errorf` — `%w` preserves the chain for `errors.Is` / `errors.As`; use `%v` only when intentionally hiding the original error type
- Never both log and return an error — handle it once at the right layer

### Documentation

- Every exported identifier (type, function, method, const, var) must have a godoc comment that begins with the name of the thing being documented: `// Format formats SQL input according to cfg.`
- Every package must have a `// Package foo ...` doc comment before the `package` declaration — explain design intent and any non-obvious invariants, not just the package name
- Doc comments are full sentences: capitalize the first word and end with a period (`godot` in golangci.yml enforces this on declaration comments)
- Only add inline comments where the logic is not self-evident from the code
- When adding a `string` field to an AST struct that stores a pre-rendered SQL fragment, the comment must state *why* it is raw — either "stored verbatim because the formatter emits it unchanged" (deliberate simplification) or "stored verbatim because [X] is not yet in scope" (intentional debt) — see `ExecStmt.Args` as the canonical example

### Tests

- Use table-driven tests: a `[]struct{ name, input, want string }` slice iterated with `t.Run(tt.name, ...)` — the standard pattern for functions with many input/output combinations
- Every test helper that calls `t.Fatal` or `t.Error` must call `t.Helper()` first — otherwise failure line numbers point to the helper, not the test case
- Use `package foo_test` for test files that exercise the public API; use `package foo` only when testing unexported internals

### String building

- Use `strings.Builder` in any loop or hot-path that constructs a string — not `+` concatenation or `fmt.Sprintf`
- `+` concatenation is fine for small, non-looped expressions (e.g. `f.kw("not") + " " + f.kw("null")`)
