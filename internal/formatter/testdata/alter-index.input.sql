ALTER INDEX ix_orders_customer ON dbo.orders REBUILD;
ALTER INDEX ALL ON dbo.orders REBUILD;
ALTER INDEX ix_orders_customer ON dbo.orders REORGANIZE;
ALTER INDEX ix_orders_customer ON dbo.orders DISABLE;
ALTER INDEX ALL ON dbo.orders DISABLE;
ALTER INDEX ix_orders_customer ON dbo.orders REBUILD WITH (ONLINE = ON, FILLFACTOR = 80);
alter index ix_orders_customer on dbo.orders rebuild
