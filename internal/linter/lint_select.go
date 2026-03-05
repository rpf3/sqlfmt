package linter

import (
	"fmt"
	"strings"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

func (l *linter) checkSelectStmt(s *parser.SelectStmt) {
	// Recurse into CTEs first so warnings appear in source order.
	for _, cte := range s.CTEs {
		l.checkSelectStmt(cte.Select)
	}

	// #12 select-star
	for _, col := range s.Columns {
		if col.Expr == "*" {
			l.warn(config.RuleSelectStar,
				"SELECT * retrieves all columns; list the columns explicitly")
			break
		}
	}

	// #31 order-by-direction
	for _, item := range s.OrderBy {
		if item.Direction == parser.DirectionNone {
			l.warn(config.RuleOrderByDirection,
				fmt.Sprintf("order by %q has no explicit direction; specify ASC or DESC", item.Expr))
		}
	}

	// #34 alias-without-as (FROM source)
	if s.From.Alias != "" && !s.From.AliasExplicit {
		name := s.From.Name
		if name == "" {
			name = "(subquery)"
		}
		l.warn(config.RuleAliasWithoutAs,
			fmt.Sprintf("table %q has a bare alias %q; use AS", name, s.From.Alias))
	}

	// #34 alias-without-as (JOINs)
	for _, jc := range s.Joins {
		if jc.Alias != "" && !jc.AliasExplicit {
			l.warn(config.RuleAliasWithoutAs,
				fmt.Sprintf("joined table %q has a bare alias %q; use AS", jc.Name, jc.Alias))
		}
	}

	// #13 unaliased-table (FROM source)
	if s.From.Name != "" && s.From.Alias == "" {
		l.warn(config.RuleUnaliasedTable,
			fmt.Sprintf("table %q has no alias; give it one with AS", s.From.Name))
	}

	// #13 unaliased-table (JOINs)
	for _, jc := range s.Joins {
		if jc.Alias == "" {
			l.warn(config.RuleUnaliasedTable,
				fmt.Sprintf("joined table %q has no alias; give it one with AS", jc.Name))
		}
	}

	// #35 no-limit
	if s.Limit != "" {
		l.warn(config.RuleNoLimit,
			"LIMIT is non-ANSI; use FETCH NEXT n ROWS ONLY instead")
	}

	// #36 offset-rows
	if s.Offset != "" && !s.OffsetHasRows {
		l.warn(config.RuleOffsetRows,
			fmt.Sprintf("OFFSET %s should be followed by ROWS; write OFFSET %s ROWS", s.Offset, s.Offset))
	}

	// #37 exists-select-one
	if s.WhereSubq != nil && strings.TrimSpace(s.WherePred) == "exists" {
		cols := s.WhereSubq.Columns
		if len(cols) != 1 || strings.TrimSpace(cols[0].Expr) != "1" {
			l.warn(config.RuleExistsSelectOne,
				"EXISTS subquery should use SELECT 1 rather than selecting columns")
		}
	}

	// Recurse into subqueries.
	if s.From.Subquery != nil {
		l.checkSelectStmt(s.From.Subquery)
	}
	if s.WhereSubq != nil {
		l.checkSelectStmt(s.WhereSubq)
	}
}
