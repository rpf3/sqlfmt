WITH ranked AS (SELECT order_id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn FROM orders AS o)
INSERT INTO archive (order_id) SELECT order_id FROM ranked AS r WHERE r.rn > 1000;

WITH latest AS (SELECT customer_id, MAX(order_date) AS last_order FROM orders AS o GROUP BY customer_id)
UPDATE c SET c.last_order_date = latest.last_order FROM customers AS c INNER JOIN latest ON c.customer_id = latest.customer_id;

WITH old_orders AS (SELECT order_id FROM orders AS o WHERE o.created_at < '2020-01-01')
DELETE FROM orders WHERE order_id IN (SELECT order_id FROM old_orders);

WITH a AS (SELECT id FROM t1 AS t), b AS (SELECT id FROM t2 AS t)
INSERT INTO result (id) SELECT id FROM a UNION ALL SELECT id FROM b;
