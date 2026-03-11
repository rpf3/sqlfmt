select
	id
,	name
from
	orders
where
	status = 'active'
union all
select
	id
,	name
from
	archived_orders
where
	status = 'active';

select
	t.customer_id
from
	orders as t
union
select
	t.customer_id
from
	archived_orders as t;

select
	t.customer_id
from
	orders as t
intersect
select
	t.customer_id
from
	preferred_customers as t;

select
	t.customer_id
from
	all_customers as t
except
select
	t.customer_id
from
	churned_customers as t;

select
	id
,	name
,	status
from
	orders
union all
select
	id
,	name
,	status
from
	archived_orders
union all
select
	id
,	name
,	status
from
	deleted_orders;

select
	id
,	name
from
	orders
where
	status = 'active'
union all
select
	id
,	name
from
	archived_orders
where
	status = 'active'
order by
	name asc;

select
	t.region
,	count(*) as order_count
from
	orders as t
group by
	t.region
having
	count(*) > 10
union all
select
	t.region
,	count(*) as order_count
from
	archived_orders as t
group by
	t.region
having
	count(*) > 10;

with combined as
(
	select
		id
	,	status
	from
		orders
	union all
	select
		id
	,	status
	from
		archived_orders
)
select
	c.id
,	c.status
from
	combined as c
where
	c.status = 'active';

with combined as
(
	select
		id
	,	name
	from
		orders
	union all
	select
		id
	,	name
	from
		archived_orders
)
select
	c.id
,	c.name
from
	combined as c
order by
	c.name asc;
