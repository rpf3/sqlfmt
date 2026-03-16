select
	*
from
	orders;

select
	t.id
,	t.name
,	t.created_at
from
	orders as t
where
	t.status = 'active';

select
	t.id
,	t.name as customer_name
,	t.total_amount as amount
from
	orders as t;

select distinct
	t.customer_id
,	t.status
from
	orders as t;

select
	o.id
,	o.total_amount
,	c.name as customer_name
from
	orders as o
inner join
	customers as c
		on c.id = o.customer_id
where
	o.status = 'active';

select
	c.id
,	c.name
,	o.total_amount
from
	customers as c
left join
	orders as o
		on o.customer_id = c.id;

select
	o.id
,	c.name as customer_name
,	p.name as product_name
,	oi.quantity
from
	orders as o
inner join
	customers as c
		on c.id = o.customer_id
inner join
	order_items as oi
		on oi.order_id = o.id
inner join
	products as p
		on p.id = oi.product_id;

select
	o.id
,	o.total_amount
,	c.name
from
	orders as o
right join
	customers as c
		on c.id = o.customer_id;

select
	o.id
,	c.name
from
	orders as o
full outer join
	customers as c
		on c.id = o.customer_id;

select
	s.name as size
,	c.name as colour
from
	sizes as s
cross join
	colours as c;

select
	t.status
,	count(*) as order_count
,	sum(t.total_amount) as total
from
	orders as t
group by
	t.status
having
	count(*) > 10;

select
	t.id
,	t.created_at
,	t.total_amount
from
	orders as t
order by
	t.created_at desc
,	t.id asc;

select
	t.id
,	t.name
from
	products as t
order by
	t.name asc
offset
	40 rows
fetch next
	20 rows only;

select
	s.status
,	s.order_count
from
	(
		select
			t.status
		,	count(*) as order_count
		from
			orders as t
		group by
			t.status
	) as s
where
	s.order_count > 5;

select
	t.id
,	t.name
from
	customers as t
where
	t.id in
	(
		select
			o.customer_id
		from
			orders as o
		where
			o.status = 'active'
	);

select
	t.id
,	t.name
from
	customers as t
where
	exists
	(
		select
			1
		from
			orders as o
		where
			o.customer_id = t.id
	);

with active_orders as
(
	select
		t.id
	,	t.customer_id
	,	t.total_amount
	from
		orders as t
	where
		t.status = 'active'
)
select
	c.name
,	sum(o.total_amount) as lifetime_value
from
	active_orders as o
inner join
	customers as c
		on c.id = o.customer_id
group by
	c.name
order by
	lifetime_value desc;

with active_orders as
(
	select
		t.id
	,	t.customer_id
	from
		orders as t
	where
		t.status = 'active'
)
, order_totals as
(
	select
		t.customer_id
	,	count(*) as order_count
	from
		active_orders as t
	group by
		t.customer_id
)
select
	c.name
,	ot.order_count
from
	order_totals as ot
inner join
	customers as c
		on c.id = ot.customer_id;

select
	t.id
,	t.customer_id
,	t.total_amount
,	row_number() over (partition by t.customer_id order by t.created_at desc) as rn
from
	orders as t;

select
	t.id
,	t.total_amount
,	rank() over (order by t.total_amount desc) as amount_rank
from
	orders as t;

select distinct
	c.id
,	c.name as customer_name
,	sum(o.total_amount) as lifetime_value
,	count(o.id) as order_count
,	row_number() over (order by sum(o.total_amount) desc) as value_rank
from
	customers as c
inner join
	orders as o
		on o.customer_id = c.id
where
	c.created_at >= '2024-01-01'
group by
	c.id
,	c.name
having
	sum(o.total_amount) > 1000
order by
	lifetime_value desc
fetch next
	100 rows only;

select
	t.id
,	t.name
from
	orders as t
where
	t.status = 'active'
	and t.region = 'us'
	and t.amount > 100;

select
	t.status
,	count(*) as order_count
from
	orders as t
group by
	t.status
having
	count(*) > 10
	and sum(t.amount) > 1000;

select
	o.id
,	o.status
from
	orders as o
inner join
	customers as c
		on c.id = o.customer_id
		and c.active = 1
where
	o.status = 'active'
	and o.total_amount > 0;

select
	count(*) as total
,	sum(t.amount) as revenue
,	avg(t.amount) as avg_amount
from
	orders as t;

select
	t.id
,	t.status
from
	orders as t with (nolock);

select
	t.id
,	t.status
from
	orders as t with (nolock);

select
	o.id
,	c.name
from
	orders as o with (nolock)
inner join
	customers as c with (nolock)
		on c.id = o.customer_id;

select
	t.id
from
	orders as t with (rowlock, updlock);
