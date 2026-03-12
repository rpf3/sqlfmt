select
	SalesOrderID
,	ProductID
,	sum(OrderQty) over win as total
,	avg(OrderQty) over win as avg_qty
from
	Sales.SalesOrderDetail
where
	SalesOrderID in
	(
		43659
	,	43664
	)
window win as
(
	partition by SalesOrderID
)
order by
	SalesOrderID;

select
	id
,	val
,	sum(val) over w1 as running
,	avg(val) over w2 as rolling
from
	metrics
window w1 as
(
	partition by id order by ts
),
w2 as
(
	order by ts
)
order by
	id
,	ts;
