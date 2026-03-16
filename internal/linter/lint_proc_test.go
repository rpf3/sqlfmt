package linter

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

// ── Control flow body recursion ───────────────────────────────────────────────

func TestLintControlFlowRecursion(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name: "update-without-where inside IF then branch",
			input: `if @run = 1 begin
	update dbo.orders set status = 'active';
end;`,
			wantRule: config.RuleUpdateWithoutWhere,
		},
		{
			name: "update-without-where inside IF else branch",
			input: `if @run = 1 begin
	update dbo.orders set status = 'active' where id = 1;
end else begin
	update dbo.orders set status = 'inactive';
end;`,
			wantRule: config.RuleUpdateWithoutWhere,
		},
		{
			name: "delete-without-where inside WHILE body",
			input: `while @i < 10 begin
	delete from dbo.logs;
	set @i = @i + 1;
end;`,
			wantRule: config.RuleDeleteWithoutWhere,
		},
		{
			name: "select-star inside TRY body",
			input: `begin try
	select * from dbo.orders as o;
end try
begin catch
	throw;
end catch;`,
			wantRule: config.RuleSelectStar,
		},
		{
			name: "update-without-where inside CATCH body",
			input: `begin try
	select id from dbo.orders as o;
end try
begin catch
	update dbo.errors set handled = 1;
	throw;
end catch;`,
			wantRule: config.RuleUpdateWithoutWhere,
		},
		{
			name: "clean statements inside IF are not flagged",
			input: `if @run = 1 begin
	update dbo.orders set status = 'active' where id = @id;
end;`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}
}

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
	insert into dbo.orders (customer_id) values (42);
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
	insert into dbo.orders (customer_id) values (42);
end try
begin catch
	rollback transaction;
end catch;`,
			wantRule: config.RuleCatchWithoutThrow,
		},
		{
			name: "catch with direct throw is clean",
			input: `begin try
	insert into dbo.orders (customer_id) values (42);
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
	insert into dbo.orders (customer_id) values (42);
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
	insert into dbo.orders (customer_id) values (42);
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

func TestLintExecNamedParams(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name:     "positional args warn",
			input:    `exec dbo.usp_GetOrders 42, 'active';`,
			wantRule: config.RuleExecNamedParams,
		},
		{
			name:     "named params are clean",
			input:    `exec dbo.usp_GetOrders @customer_id = 42, @status = 'active';`,
			wantRule: "",
		},
		{
			name:     "single positional arg is exempt",
			input:    `exec dbo.usp_ProcessOrder 99;`,
			wantRule: "",
		},
		{
			name:     "single named arg is clean",
			input:    `exec dbo.usp_ProcessOrder @order_id = 99;`,
			wantRule: "",
		},
		{
			name:     "no args is clean",
			input:    `exec dbo.usp_ArchiveOldOrders;`,
			wantRule: "",
		},
		{
			name:     "dynamic sql is exempt",
			input:    `exec (@sql);`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}
}
