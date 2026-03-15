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
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}
}

func TestLintCatchWithoutThrow(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name: "catch without throw warns",
			input: `begin try
	insert into orders (customer_id) values (42);
end try
begin catch
	rollback transaction;
end catch;`,
			wantRule: config.RuleCatchWithoutThrow,
		},
		{
			name: "catch with direct throw is clean",
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
			name: "throw inside if branch satisfies rule",
			input: `begin try
	insert into orders (customer_id) values (42);
end try
begin catch
	if @@trancount > 0 begin
		rollback transaction;
		throw;
	end;
end catch;`,
			wantRule: "",
		},
		{
			name: "empty catch fires empty-catch not catch-without-throw",
			input: `begin try
	insert into orders (customer_id) values (42);
end try
begin catch
end catch;`,
			wantRule: config.RuleEmptyCatch,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}
}
