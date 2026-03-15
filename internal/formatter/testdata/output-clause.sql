insert into orders
(
	customer_id
,	status
)
output
	inserted.order_id
,	inserted.customer_id
values
(
	42
,	'pending'
);

insert into orders
(
	customer_id
,	status
)
output
	inserted.order_id
into @new_ids
(
	order_id
)
values
(
	42
,	'pending'
);

update
	orders
set
	status = 'shipped'
output
	deleted.status as old_status
,	inserted.status as new_status
where
	order_id = 42;

delete from
	orders
output
	deleted.order_id
,	deleted.status
where
	order_id = 42;

merge into orders as tgt
using staging as src
on
(
	tgt.order_id = src.order_id
)
when matched then update set
	tgt.status = src.status
when not matched then insert
(
	order_id
,	status
)
values
(
	src.order_id
,	src.status
)
output
	$action
,	inserted.order_id;
