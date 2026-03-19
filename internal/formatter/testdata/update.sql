update
	orders
set
	status = 'active';

update
	orders
set
	status = 'shipped'
,	updated_at = now()
where
	id = 42;

update
	o
set
	o.status = 'shipped'
from
	orders as o
where
	o.id = 42;

update
	o
set
	o.status = 'shipped'
from
	orders as o
inner join
	customers as c
		on o.customer_id = c.id
where
	c.name = 'test';

update
	o
set
	o.status = 'x'
,	o.note = 'test'
from
	orders as o
where
	o.id = 1
	and o.active = 1;

update
	o
set
	o.status = 'shipped'
from
	orders as o
inner join
	customers as c
		on o.customer_id = c.id
		and o.region = c.region
where
	c.name = 'test';

update
	orders
set
	status = 'active'
option
	(maxdop 1);
