select
	order_id
,	status
from
	dbo.orders as o
for xml
	path('order'), root('orders');

select
	order_id
,	status
from
	dbo.orders as o
for xml
	auto, elements;

select
	order_id
,	status
from
	dbo.orders as o
for xml
	raw('row'), root('data'), elements xsinil;

select
	order_id
,	status
from
	dbo.orders as o
for json
	path, root('orders');

select
	order_id
,	status
from
	dbo.orders as o
for json
	auto;

select
	order_id
,	status
from
	dbo.orders as o
order by
	order_id asc
for xml
	path('order');
