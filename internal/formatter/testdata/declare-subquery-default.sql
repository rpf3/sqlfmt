declare @max_id int =
(
	select
		max(id)
	from
		dbo.orders
);

declare @count int =
(
	select
		count(*)
	from
		dbo.active_users
	where
		is_active = 1
);

declare @name varchar(100) =
(
	select top (1)
		name
	from
		dbo.config
	where
		key = 'app_name'
);

declare @x int = 0;

declare @y int;
