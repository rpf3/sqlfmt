select
	e.id
,	e.name
,	t.val
from
	employees as e
cross apply
	dbo.GetValues(e.id) as t;

select
	e.id
,	e.name
,	t.val
from
	employees as e
outer apply
	dbo.GetValues(e.id) as t;

select
	e.id
,	latest.val
from
	employees as e
outer apply
	(
		select top (1)
			val
		from
			activity
		where
			activity.emp_id = e.id
		order by
			ts desc
	) as latest;

select
	d.id
,	e.name
from
	departments as d
inner join
	employees as e
		on e.dept_id = d.id
cross apply
	dbo.GetValues(e.id) as t;
