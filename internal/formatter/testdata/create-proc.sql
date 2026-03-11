create procedure dbo.usp_ArchiveOldOrders
as begin
	delete from
		dbo.orders
	where
		status = 'cancelled'
		and created_at < '2020-01-01';
end;

create procedure dbo.usp_GetOrdersByCustomer
(
	@customer_id int
,	@status nvarchar(20) = 'active'
)
as begin
	select
		o.id
	,	o.amount
	,	o.status
	from
		dbo.orders as o
	where
		o.customer_id = @customer_id
		and o.status = @status;
end;

create procedure dbo.usp_GetOrderCount
(
	@customer_id int
,	@order_count int output
)
as begin
	select
		@order_count = count(*)
	from
		dbo.orders
	where
		customer_id = @customer_id;
end;

create procedure dbo.usp_ProcessOrder
(
	@order_id int
)
as begin
	update
		dbo.orders
	set
		status = 'processing'
	where
		id = @order_id;

	insert into dbo.order_log
	(
		order_id
	,	event
	)
	values
	(
		@order_id
	,	'processing_started'
	);
end;
