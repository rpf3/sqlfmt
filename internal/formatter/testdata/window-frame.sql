select
	id
,	val
,	sum(val) over (
		order by id rows between unbounded preceding and current row
	) as running
from
	metrics;

select
	id
,	val
,	avg(val) over (
		partition by category order by id rows between 2 preceding and current row
	) as moving_avg
from
	metrics;

select
	id
,	val
,	sum(val) over (
		partition by dept order by ts range between unbounded preceding and current row
	) as cumulative
from
	sales;

select
	id
,	val
,	sum(val) over (
		order by id rows unbounded preceding
	) as total
from
	metrics;

select
	id
,	val
,	avg(val) over (
		partition by dept rows between unbounded preceding and unbounded following
	) as dept_avg
from
	sales;
