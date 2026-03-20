CREATE INDEX IF NOT EXISTS ix_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);
CREATE UNIQUE INDEX uix_recipes_name ON recipes(name DESC);

-- CLUSTERED / NONCLUSTERED
CREATE CLUSTERED INDEX ix_orders_created ON dbo.orders(created_at ASC);
CREATE NONCLUSTERED INDEX ix_orders_status ON dbo.orders(status ASC);

-- covering index with INCLUDE
CREATE INDEX ix_orders_covering ON dbo.orders(customer_id) INCLUDE (status, total_amount);

-- filtered index with WHERE
CREATE INDEX ix_orders_active ON dbo.orders(customer_id) WHERE status = 'active';

-- WITH options
CREATE INDEX ix_orders_rebuild ON dbo.orders(customer_id) WITH (FILLFACTOR = 80, ONLINE = ON);

-- all together: clustered, unique, include, where, with
CREATE UNIQUE NONCLUSTERED INDEX ix_full ON dbo.orders(customer_id ASC, created_at DESC) INCLUDE (status, total_amount) WHERE status != 'cancelled' WITH (FILLFACTOR = 90, ONLINE = ON, MAXDOP = 4);

-- multi-condition WHERE
CREATE INDEX ix_orders_active ON dbo.orders(customer_id ASC, created_at DESC) WHERE status = 'active' AND total_amount > 100 AND region = 'us';
