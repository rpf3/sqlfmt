-- SELECT INTO permanent table
SELECT order_id, customer_id, total INTO archive.dbo.orders_2023 FROM dbo.orders AS o WHERE o.created_at < '2024-01-01';

-- SELECT INTO local temp table
SELECT order_id, status INTO #active_orders FROM dbo.orders AS o WHERE o.status = 'active';

-- SELECT INTO global temp table
SELECT id, name INTO ##staging FROM dbo.customers AS c;

-- SELECT INTO with no FROM (constant row)
SELECT 1 AS val INTO #single;
