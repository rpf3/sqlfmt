package linter

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

func TestLintInsertColumnList(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name:     "insert without column list warns",
			input:    `insert into orders values (1, 'pending');`,
			wantRule: config.RuleInsertColumnList,
		},
		{
			name:     "insert with column list is clean",
			input:    `insert into orders (id, status) values (1, 'pending');`,
			wantRule: "",
		},
		{
			name:     "insert select without column list warns",
			input:    `insert into orders select id, status from staging;`,
			wantRule: config.RuleInsertColumnList,
		},
		{
			name:     "insert select with column list is clean",
			input:    `insert into orders (id, status) select id, status from staging;`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}
	t.Run("rule off suppresses warning", func(t *testing.T) {
		checkRuleOff(t, `insert into orders values (1, 'pending');`, config.RuleInsertColumnList)
	})
}

func TestLintDeleteWithoutWhere(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name:     "delete without where warns",
			input:    `delete from orders;`,
			wantRule: config.RuleDeleteWithoutWhere,
		},
		{
			name:     "delete with where is clean",
			input:    `delete from orders where id = 1;`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}
	t.Run("rule off suppresses warning", func(t *testing.T) {
		checkRuleOff(t, `delete from orders;`, config.RuleDeleteWithoutWhere)
	})
}
