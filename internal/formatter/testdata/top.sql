select top (10)
	t.id
,	t.name
from
	orders as t
order by
	t.created_at desc;

select top (25) percent with ties
	t.id
,	t.total
from
	orders as t
order by
	t.total_amount desc;

select distinct top (5)
	t.id
from
	orders as t
order by
	t.created_at desc;

select top (100)
	t.id
,	t.name
from
	orders as t;
