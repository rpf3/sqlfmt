update top (1000)
	orders
set
	status = 'archived'
where
	created_at < '2020-01-01';

update top (500)
	dbo.orders
set
	status = 'archived';

delete top (500) from
	orders
where
	status = 'cancelled';

delete top (100) from dbo.orders;
