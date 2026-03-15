with ranked as
(
	select
		order_id
	,	row_number() over (order by created_at) as rn
	from
		orders as o
)
insert into archive
(
	order_id
)
select
	order_id
from
	ranked as r
where
	r.rn > 1000;

with latest as
(
	select
		customer_id
	,	max(order_date) as last_order
	from
		orders as o
	group by
		customer_id
)
update
	c
set
	c.last_order_date = latest.last_order
from
	customers as c
inner join
	latest
		on c.customer_id = latest.customer_id;

with old_orders as
(
	select
		order_id
	from
		orders as o
	where
		o.created_at < '2020-01-01'
)
delete from
	orders
where
	order_id in (select order_id from old_orders);

with a as
(
	select
		id
	from
		t1 as t
)
, b as
(
	select
		id
	from
		t2 as t
)
insert into result
(
	id
)
select
	id
from
	a
union all
select
	id
from
	b;
