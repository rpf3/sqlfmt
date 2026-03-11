create function dbo.fn_GetAge
(
	@birthdate date
)
returns int
as begin
	return datediff(year, @birthdate, getdate());
end;

create function dbo.fn_FormatName
(
	@first nvarchar(50)
,	@last nvarchar(50)
)
returns nvarchar(101)
as begin
	return @first + ' ' + @last;
end;

create function dbo.fn_GetOrdersByCustomer
(
	@customer_id int
)
returns table
as return
(
	select
		o.id
	,	o.amount
	,	o.status
	from
		dbo.orders as o
	where
		o.customer_id = @customer_id
);

create function dbo.fn_GetOrderSummary
(
	@customer_id int
)
returns @result table
(
	order_id int not null
,	total decimal(10, 2) not null
)
as begin
	insert into @result
	select
		id
	,	amount
	from
		dbo.orders
	where
		customer_id = @customer_id;

	return;
end;
