package linter

import (
	"fmt"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

func (l *linter) checkSelectStmt(s *parser.SelectStmt) {
	// Recurse into CTEs first so warnings appear in source order.
	for _, cte := range s.CTEs {
		l.checkSelectStmt(cte.Select)
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

	// #35 no-limit
	if s.Limit != "" {
		l.warn(config.RuleNoLimit,
			"LIMIT is non-ANSI; use FETCH NEXT n ROWS ONLY instead")
	}

	// Recurse into subqueries.
	if s.From.Subquery != nil {
		l.checkSelectStmt(s.From.Subquery)
	}
	if s.WhereSubq != nil {
		l.checkSelectStmt(s.WhereSubq)
	}
}
