create table dbo.orders
(
	id int not null
		constraint df_orders_id default next value for dbo.order_seq
,	name nvarchar(100) not null
);

create table dbo.order_items
(
	order_id int not null
		constraint df_item_id default next value for dbo.item_seq
);

select
	next value for dbo.order_seq as next_id
from
	dbo.orders as o;

insert into dbo.orders
(
	id
,	name
)
values
(
	next value for dbo.order_seq
,	'test'
);

update
	dbo.orders
set
	id = next value for dbo.order_seq
where
	name = 'test';
