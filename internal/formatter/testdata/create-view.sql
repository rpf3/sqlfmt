create view active_orders as
select
	o.id
,	o.customer_id
,	o.total
from
	orders as o
where
	o.status = 'active';

create view order_summary as
select
	o.id
,	c.name as customer_name
,	o.total
from
	orders as o
inner join
	customers as c
		on o.customer_id = c.id
order by
	o.created_at desc;
