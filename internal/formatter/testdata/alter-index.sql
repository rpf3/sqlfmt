alter index ix_orders_customer
	on dbo.orders rebuild;

alter index all
	on dbo.orders rebuild;

alter index ix_orders_customer
	on dbo.orders reorganize;

alter index ix_orders_customer
	on dbo.orders disable;

alter index all
	on dbo.orders disable;

alter index ix_orders_customer
	on dbo.orders rebuild
	with (online = on, fillfactor = 80);

alter index ix_orders_customer
	on dbo.orders rebuild;
