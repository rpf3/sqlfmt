create type dbo.SSN
	from varchar(11) not null;

create type dbo.OrderStatus
	from nvarchar(20);

create type dbo.Notes
	from nvarchar(500) null;

create type dbo.OrderList as table
(
	order_id int not null
,	order_date date not null
,	amount decimal(10, 2) not null
);

create type dbo.EmployeeList as table
(
	employee_id int not null
,	name nvarchar(100) not null

,	constraint pk_employee_list
		primary key (employee_id)
);

create type dbo.ProductList as table
(
	product_id int not null
,	status nvarchar(20) not null
		constraint df_status default 'active'
);
