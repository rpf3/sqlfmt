CREATE VIEW customer_orders AS
WITH order_totals AS (
SELECT order_id, SUM(quantity) AS total_items, SUM(line_total) AS items_total
FROM order_items GROUP BY order_id
)
SELECT u.id AS user_id, u.email, u.first_name, u.last_name,
COUNT(o.id) AS order_count,
SUM(o.total_amount) AS lifetime_value,
MIN(o.placed_at) AS first_order_at,
MAX(o.placed_at) AS last_order_at,
AVG(o.total_amount) AS avg_order_value,
DENSE_RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS value_rank
FROM users AS u
INNER JOIN orders AS o ON u.id = o.user_id
INNER JOIN order_totals AS ot ON o.id = ot.order_id
WHERE o.status != 'cancelled' AND u.is_active = TRUE
GROUP BY u.id, u.email, u.first_name, u.last_name
HAVING COUNT(o.id) >= 1;
