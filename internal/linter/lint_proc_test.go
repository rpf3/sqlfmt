package linter

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

func TestLintEmptyCatch(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name: "empty catch warns",
			input: `begin try
	insert into orders (customer_id) values (42);
end try
begin catch
end catch;`,
			wantRule: config.RuleEmptyCatch,
		},
		{
			name: "catch with throw is clean",
			input: `begin try
	insert into orders (customer_id) values (42);
end try
begin catch
	rollback transaction;
	throw;
end catch;`,
			wantRule: "",
		},
		{
			name: "catch with statements but no throw is clean for empty-catch",
			input: `begin try
	insert into orders (customer_id) values (42);
end try
begin catch
	rollback transaction;
end catch;`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}
}
