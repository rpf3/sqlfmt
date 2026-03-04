package linter

import (
	"fmt"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/parser"
)

func (l *linter) checkInsertStmt(s *parser.InsertStmt) {
	if len(s.Columns) == 0 {
		l.warn(config.RuleInsertColumnList,
			fmt.Sprintf("INSERT into table %q has no explicit column list", s.Table))
	}
}

func (l *linter) checkUpdateStmt(s *parser.UpdateStmt) {
	if s.Where == "" {
		l.warn(config.RuleUpdateWithoutWhere,
			fmt.Sprintf("UPDATE on table %q has no WHERE clause", s.Target))
	}
}

func (l *linter) checkDeleteStmt(s *parser.DeleteStmt) {
	// #34 alias-without-as
	if s.Alias != "" && !s.AliasExplicit {
		l.warn(config.RuleAliasWithoutAs,
			fmt.Sprintf("table %q has a bare alias %q; use AS", s.Table, s.Alias))
	}
	if s.Where == "" {
		l.warn(config.RuleDeleteWithoutWhere,
			fmt.Sprintf("DELETE on table %q has no WHERE clause", s.Table))
	}
}
