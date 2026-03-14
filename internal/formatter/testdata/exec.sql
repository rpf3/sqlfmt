exec dbo.usp_ArchiveOldOrders;

exec dbo.usp_ArchiveOldOrders;

exec dbo.usp_GetOrdersByCustomer
	42
,	'active';

exec dbo.usp_GetOrdersByCustomer
	@customer_id = 42
,	@status = 'active';

exec dbo.usp_ProcessOrder @order_id = 99;

exec @rc = dbo.usp_ProcessOrder @order_id = 99;

exec (@sql);

exec sp_executesql
	@sql
,	N'@id INT'
,	@id = 42;
