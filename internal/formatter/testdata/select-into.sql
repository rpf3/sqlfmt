select
	order_id
,	customer_id
,	total
into
	archive.dbo.orders_2023
from
	dbo.orders as o
where
	o.created_at < '2024-01-01';

select
	order_id
,	status
into
	#active_orders
from
	dbo.orders as o
where
	o.status = 'active';

select
	id
,	name
into
	##staging
from
	dbo.customers as c;

select
	1 as val
into
	#single;
