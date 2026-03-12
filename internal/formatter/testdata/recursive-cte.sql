with recursive subordinates as
(
	select
		id
	,	manager_id
	,	name
	from
		employees
	where
		manager_id is null
	union all
	select
		e.id
	,	e.manager_id
	,	e.name
	from
		employees as e
	inner join
		subordinates as s
			on s.id = e.manager_id
)
select
	id
,	name
from
	subordinates;

with recursive ancestors as
(
	select
		id
	,	parent_id
	,	name
	from
		nodes
	where
		id = 1
	union all
	select
		n.id
	,	n.parent_id
	,	n.name
	from
		nodes as n
	inner join
		ancestors as a
			on a.id = n.parent_id
)
select
	id
,	name
from
	ancestors;
