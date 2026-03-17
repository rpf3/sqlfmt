select
	t.order_id
,	t.total
from
	dbo.fn_get_orders(@customer_id) as t;

select
	dr.start_date
,	dr.end_date
from
	dbo.fn_date_range(@start, @end) as dr;

select
	s.value
from
	STRING_SPLIT(@csv, ',') as s;

select
	*
from
	dbo.fn_active_customers() as ac
where
	ac.region = 'US';

select
	o.order_id
,	s.label
from
	dbo.orders as o
inner join
	dbo.fn_status_labels() as s
		on o.status_code = s.code;

select
	a.id
,	b.name
from
	dbo.fn_accounts(@date) as a
inner join
	dbo.fn_names(@date) as b
		on a.id = b.id;
