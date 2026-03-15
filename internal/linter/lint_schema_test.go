package linter

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

func TestLintMissingSchemaName(t *testing.T) {
	rule := config.RuleMissingSchemaName

	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		// SELECT FROM
		{
			name:     "unqualified SELECT FROM warns",
			input:    `select o.id from orders as o;`,
			wantRule: rule,
		},
		{
			name:     "schema-qualified SELECT FROM is clean",
			input:    `select o.id from dbo.orders as o;`,
			wantRule: "",
		},
		// JOIN
		{
			name:     "unqualified JOIN warns",
			input:    `select o.id from dbo.orders as o inner join customers as c on c.id = o.customer_id;`,
			wantRule: rule,
		},
		{
			name:     "schema-qualified JOIN is clean",
			input:    `select o.id from dbo.orders as o inner join dbo.customers as c on c.id = o.customer_id;`,
			wantRule: "",
		},
		// INSERT
		{
			name:     "unqualified INSERT warns",
			input:    `insert into orders (id) values (1);`,
			wantRule: rule,
		},
		{
			name:     "schema-qualified INSERT is clean",
			input:    `insert into dbo.orders (id) values (1);`,
			wantRule: "",
		},
		// DELETE
		{
			name:     "unqualified DELETE warns",
			input:    `delete from orders where id = 1;`,
			wantRule: rule,
		},
		{
			name:     "schema-qualified DELETE is clean",
			input:    `delete from dbo.orders where id = 1;`,
			wantRule: "",
		},
		// UPDATE (ANSI) — include WHERE to avoid update-without-where firing first
		{
			name:     "unqualified ANSI UPDATE warns",
			input:    `update orders set status = 'x' where id = 1;`,
			wantRule: rule,
		},
		{
			name:     "schema-qualified ANSI UPDATE is clean",
			input:    `update dbo.orders set status = 'x' where id = 1;`,
			wantRule: "",
		},
		// UPDATE (SQL Server FROM style)
		{
			name:     "unqualified SQL Server UPDATE FROM warns",
			input:    `update o set o.status = 'x' from orders as o where o.id = 1;`,
			wantRule: rule,
		},
		{
			name:     "schema-qualified SQL Server UPDATE FROM is clean",
			input:    `update o set o.status = 'x' from dbo.orders as o where o.id = 1;`,
			wantRule: "",
		},
		// MERGE
		{
			name:     "unqualified MERGE INTO warns",
			input:    `merge into orders as o using dbo.source as s on o.id = s.id when matched then delete;`,
			wantRule: rule,
		},
		{
			name:     "unqualified MERGE USING warns",
			input:    `merge into dbo.orders as o using source as s on o.id = s.id when matched then delete;`,
			wantRule: rule,
		},
		{
			name:     "schema-qualified MERGE is clean",
			input:    `merge into dbo.orders as o using dbo.source as s on o.id = s.id when matched then delete;`,
			wantRule: "",
		},
		// CREATE INDEX
		{
			name:     "unqualified CREATE INDEX ON warns",
			input:    `create index idx_status on orders (status asc);`,
			wantRule: rule,
		},
		{
			name:     "schema-qualified CREATE INDEX ON is clean",
			input:    `create index idx_status on dbo.orders (status asc);`,
			wantRule: "",
		},
		// Temp tables are exempt
		{
			name:     "local temp table in FROM is clean",
			input:    `select id from #temp as t;`,
			wantRule: "",
		},
		{
			name:     "global temp table in FROM is clean",
			input:    `select id from ##global as t;`,
			wantRule: "",
		},
		// FK REFERENCES
		{
			name:     "unqualified FK REFERENCES warns",
			input:    `create table dbo.orders (customer_id int not null, constraint fk_customer foreign key (customer_id) references customers (id));`,
			wantRule: rule,
		},
		{
			name:     "schema-qualified FK REFERENCES is clean",
			input:    `create table dbo.orders (customer_id int not null, constraint fk_customer foreign key (customer_id) references dbo.customers (id));`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}

	t.Run("off suppresses warning", func(t *testing.T) {
		checkRuleOff(t, `select o.id from orders as o;`, rule)
	})
}

func TestLintNoCascadeFk(t *testing.T) {
	rule := config.RuleNoCascadeFk

	tests := []struct {
		name     string
		input    string
		wantRule string
	}{
		{
			name:     "table-level FK with ON DELETE CASCADE warns",
			input:    `create table orders (customer_id int not null, constraint fk_orders_customer foreign key (customer_id) references customers (id) on delete cascade);`,
			wantRule: rule,
		},
		{
			name:     "table-level FK with ON UPDATE CASCADE warns",
			input:    `create table orders (customer_id int not null, constraint fk_orders_customer foreign key (customer_id) references customers (id) on update cascade);`,
			wantRule: rule,
		},
		{
			name:     "inline REFERENCES with ON DELETE CASCADE warns",
			input:    `create table orders (customer_id int not null references customers (id) on delete cascade);`,
			wantRule: rule,
		},
		{
			name:     "inline REFERENCES with ON DELETE SET NULL is clean",
			input:    `create table dbo.orders (customer_id int not null references dbo.customers (id) on delete set null);`,
			wantRule: "",
		},
		{
			name:     "table-level FK with ON DELETE NO ACTION is clean",
			input:    `create table dbo.orders (customer_id int not null, constraint fk_orders_customer foreign key (customer_id) references dbo.customers (id) on delete no action);`,
			wantRule: "",
		},
		{
			name:     "FK with no action specified is clean",
			input:    `create table dbo.orders (customer_id int not null references dbo.customers (id));`,
			wantRule: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			checkRule(t, tt.input, tt.wantRule)
		})
	}
}
