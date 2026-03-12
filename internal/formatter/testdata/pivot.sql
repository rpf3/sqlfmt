select
	*
from
	sales_data
pivot
(
	sum(amount)
	for quarter
	in
	(
		[Q1]
	,	[Q2]
	,	[Q3]
	,	[Q4]
	)
) as pvt;

select
	*
from
	quarterly_sales
unpivot
(
	amount
	for quarter
	in
	(
		q1
	,	q2
	,	q3
	,	q4
	)
) as unpvt;

select
	pvt.customer_id
,	pvt.[Q1]
,	pvt.[Q2]
from
	sales_data
pivot
(
	sum(amount)
	for quarter
	in
	(
		[Q1]
	,	[Q2]
	)
) as pvt
inner join
	customers as c
		on c.id = pvt.customer_id;
