create index if not exists ix_recipe_ingredients_ingredient
	on recipe_ingredients (ingredient_id);

create unique index uix_recipes_name
	on recipes (name desc);

create clustered index ix_orders_created
	on dbo.orders (created_at asc);

create nonclustered index ix_orders_status
	on dbo.orders (status asc);

create index ix_orders_covering
	on dbo.orders (customer_id)
	include (status, total_amount);

create index ix_orders_active
	on dbo.orders (customer_id)
	where status = 'active';

create index ix_orders_rebuild
	on dbo.orders (customer_id)
	with (fillfactor = 80, online = on);

create unique nonclustered index ix_full
	on dbo.orders (customer_id asc, created_at desc)
	include (status, total_amount)
	where status != 'cancelled'
	with (fillfactor = 90, online = on, maxdop = 4);
