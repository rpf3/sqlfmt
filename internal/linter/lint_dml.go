package linter

import (
	"fmt"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

func (l *linter) checkDeleteStmt(s *parser.DeleteStmt) {
	// #34 alias-without-as
	if s.Alias != "" && !s.AliasExplicit {
		l.warn(config.RuleAliasWithoutAs,
			fmt.Sprintf("table %q has a bare alias %q; use AS", s.Table, s.Alias))
	}
}
