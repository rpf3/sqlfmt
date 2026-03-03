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

	// Recurse into subqueries.
	if s.From.Subquery != nil {
		l.checkSelectStmt(s.From.Subquery)
	}
	if s.WhereSubq != nil {
		l.checkSelectStmt(s.WhereSubq)
	}
}
