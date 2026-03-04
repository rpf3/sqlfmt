CREATE VIEW recent_order_totals AS
WITH ranked AS (
    SELECT customer_id, total, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC) AS rn
    FROM orders
)
SELECT customer_id, total
FROM ranked
WHERE rn = 1;

CREATE VIEW multi_cte_view AS
WITH a AS (SELECT id FROM t1), b AS (SELECT id FROM t2)
SELECT a.id FROM a INNER JOIN b ON a.id = b.id;
