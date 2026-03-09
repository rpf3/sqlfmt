CREATE VIEW order_summary AS
SELECT o.id AS order_id, o.user_id, u.email, o.status,
COUNT(oi.id) AS item_count,
SUM(oi.quantity) AS total_units,
o.subtotal, o.tax_amount, o.shipping_amount, o.total_amount,
o.placed_at, o.fulfilled_at,
ROW_NUMBER() OVER (PARTITION BY o.user_id ORDER BY o.placed_at DESC) AS user_order_rank
FROM orders AS o
INNER JOIN users AS u ON o.user_id = u.id
LEFT JOIN order_items AS oi ON o.id = oi.order_id
WHERE o.status != 'cancelled'
GROUP BY o.id, o.user_id, u.email, o.status, o.subtotal, o.tax_amount, o.shipping_amount, o.total_amount, o.placed_at, o.fulfilled_at;
