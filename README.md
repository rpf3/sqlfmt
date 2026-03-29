# sqlfmt

A formatter for **T-SQL** (Transact-SQL), the SQL dialect used by Microsoft SQL Server and Azure SQL Database.

> **T-SQL only.** sqlfmt targets the T-SQL dialect specifically. Standard SQL or dialect-specific syntax from other databases (PostgreSQL, MySQL, SQLite, etc.) is out of scope and not supported.

## What it does

sqlfmt reads T-SQL source files and rewrites them in a consistent canonical style:

- Keywords normalised to lowercase (or uppercase — configurable)
- Consistent indentation (tabs or spaces — configurable)
- Consistent comma placement (leading or trailing — configurable)
- Language-defined names (`varchar`, `@@rowcount`, built-in functions) normalised to lowercase
- User-defined names (tables, columns, aliases, variables) preserved verbatim

## Installation

**One-line installer** (Linux and macOS):

```sh
curl -fsSL https://raw.githubusercontent.com/rpf3/sqlfmt/main/install.sh | sh
```

Installs the latest release to `~/.local/bin/sqlfmt`. Override the destination with `INSTALL_DIR`:

```sh
curl -fsSL https://raw.githubusercontent.com/rpf3/sqlfmt/main/install.sh | INSTALL_DIR=/usr/local/bin sh
```

Pin a specific version with `SQLFMT_VERSION`:

```sh
curl -fsSL https://raw.githubusercontent.com/rpf3/sqlfmt/main/install.sh | SQLFMT_VERSION=v1.0.0 sh
```

**Go install:**

```sh
go install github.com/rpf3/sqlfmt/cmd/sqlfmt@latest
```

**Manual download:**

Download a pre-built binary for your platform from the [releases page](https://github.com/rpf3/sqlfmt/releases).

## Usage

```sh
# Format all .sql files in the current directory (in place)
sqlfmt

# Format a specific file
sqlfmt path/to/file.sql

# Check without modifying (exits non-zero if any file would change)
sqlfmt --check

# Recurse into subdirectories
sqlfmt --recursive
```

## Configuration

Place a `.sqlfmt.yml` file in your project root:

```yaml
keyword_case: lower      # lower | upper (default: lower)
indent_style: tab        # tab | space (default: tab)
indent_width: 4          # used when indent_style is space (default: 4)
comma_style: leading     # leading | trailing (default: leading)
lint_rules:
  - missing-schema-name
  - inline-primary-key
  - no-cascade-fk
```

## Supported Syntax

sqlfmt supports the following T-SQL statement types:

**DML:** `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `MERGE`, `TRUNCATE`

**DDL:** `CREATE`/`ALTER`/`DROP` TABLE, VIEW, INDEX, PROCEDURE, FUNCTION, TYPE, SCHEMA

**Procedural:** `DECLARE`, `SET`, `IF`/`ELSE`, `WHILE`, `BEGIN`/`END`, `TRY`/`CATCH`, `THROW`, `PRINT`, `EXEC`, transaction control

**CTEs:** `WITH` (including recursive), `WITH` in DML statements

**Clauses:** `TOP`, `OUTPUT`, `PIVOT`/`UNPIVOT`, `APPLY`, window functions, `GROUP BY` extensions (`ROLLUP`, `CUBE`, `GROUPING SETS`)

## Development

### Nix dev shell

sqlfmt ships a `flake.nix` that provides a reproducible development environment with all required tools pinned to exact versions via `flake.lock`. This means every contributor and CI job uses the same toolchain without manual installation.

**What this gives you:** all tools needed to build, test, lint, and format the project, pinned to the versions declared in `flake.nix`.

**Install Nix** (Linux or macOS):

```sh
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
```

This uses the [Determinate Systems installer](https://github.com/DeterminateSystems/nix-installer), which enables flake support by default.

**Enter the dev shell:**

```sh
nix develop
```

From inside the shell, all project tasks are available:

```sh
task test    # run tests
task fmt     # format Go source
task vet     # static analysis
task lint    # run golangci-lint
task build   # build ./bin/sqlfmt
```

**Without entering an interactive shell** (useful for scripts or CI):

```sh
nix develop --command task test
```

**Updating the toolchain:** run `nix flake update` to pull the latest nixpkgs and commit the updated `flake.lock`.
