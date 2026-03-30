truncate table orders;

truncate table customers;

truncate table dbo.orders
	with (partitions (1, 2, 5 to 10));

truncate table dbo.orders
	with (partitions (3));
