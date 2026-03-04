create view recent_order_totals as
with ranked as
(
	select
		customer_id
	,	total
	,	ROW_NUMBER() over (partition by customer_id order by created_at desc) as rn
	from
		orders
)
select
	customer_id
,	total
from
	ranked
where
	rn = 1;

create view multi_cte_view as
with a as
(
	select
		id
	from
		t1
)
, b as
(
	select
		id
	from
		t2
)
select
	a.id
from
	a
inner join
	b
		on a.id = b.id;
