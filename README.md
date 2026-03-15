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

## Supported syntax

sqlfmt supports the following T-SQL statement types:

**DML:** `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `MERGE`, `TRUNCATE`
**DDL:** `CREATE`/`ALTER`/`DROP` TABLE, VIEW, INDEX, PROCEDURE, FUNCTION, TYPE, SCHEMA
**Procedural:** `DECLARE`, `SET`, `IF`/`ELSE`, `WHILE`, `BEGIN`/`END`, `TRY`/`CATCH`, `THROW`, `PRINT`, `EXEC`, transaction control
**CTEs:** `WITH` (including recursive), `WITH` in DML statements
**Clauses:** `TOP`, `OUTPUT`, `PIVOT`/`UNPIVOT`, `APPLY`, window functions, `GROUP BY` extensions (`ROLLUP`, `CUBE`, `GROUPING SETS`)

## Installation

```sh
go install github.com/rpf3/sqlfmt/cmd/sqlfmt@latest
```
