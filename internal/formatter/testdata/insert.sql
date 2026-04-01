insert into orders
values
(
	1
,	42
,	99.99
);

insert into orders
(
	id
,	customer_id
,	total
)
values
(
	1
,	42
,	99.99
);

insert into orders
(
	id
,	customer_id
,	total
)
values
(
	1
,	42
,	99.99
),
(
	2
,	43
,	149.99
);

insert into order_archive
select
	id
,	customer_id
from
	orders;

insert into order_archive
select
	id
,	customer_id
from
	orders
where
	created_at < '2024-01-01';

insert into orders
(
	id
,	customer_id
)
values
(
	1
,	42
)
option
	(recompile);

insert into order_archive
select
	id
,	customer_id
from
	orders
option
	(hash join);

insert into settings default values;

insert into audit_log default values;
