alter procedure dbo.usp_ProcessOrders
(
	@order_id int
,	@status varchar(20) = 'pending'
)
as begin
	update
		orders
	set
		status = @status
	where
		order_id = @order_id;
end;

alter procedure dbo.usp_ArchiveOldOrders
as begin
	delete from
		dbo.orders
	where
		status = 'cancelled'
		and created_at < '2020-01-01';
end;

alter function dbo.fn_get_total
(
	@order_id int
)
returns decimal(10, 2)
as begin
	return (select sum(amount) from order_lines where order_id = @order_id);
end;

alter view active_orders as
select
	o.id
,	o.customer_id
,	o.total
from
	orders as o
where
	o.status = 'active';
