delete
	o
from
	orders as o
where
	o.status = 'cancelled'
and	o.created_at < '2024-01-01';

delete
	s
from
	sessions as s;

delete from
	archive
where
	created_at < '2020-01-01';

delete from staging;
