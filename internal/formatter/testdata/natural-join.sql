select
	e.name
,	d.name
from
	employees as e
natural join
	departments as d;

select
	e.name
,	d.name
from
	employees as e
natural left join
	departments as d;

select
	e.name
,	d.name
from
	employees as e
natural right join
	departments as d;

select
	e.name
,	d.name
from
	employees as e
natural left join
	departments as d;
