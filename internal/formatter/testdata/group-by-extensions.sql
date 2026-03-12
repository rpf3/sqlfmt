select
	region
,	territory
,	sum(sales) as total
from
	sales_data as s
group by rollup
	(region, territory);

select
	region
,	sum(sales) as total
from
	sales_data as s
group by cube
	(region);

select
	region
,	sum(sales) as total
from
	sales_data as s
group by grouping sets
	((region, territory), (region), ());

select
	sum(sales) as total
from
	sales_data as s
group by
	();

select
	region
,	territory
,	sum(sales) as total
from
	sales_data as s
group by
	region
,	rollup(territory);

select
	region
,	sum(sales) as total
from
	sales_data as s
group by
	rollup(region)
,	cube(territory);
