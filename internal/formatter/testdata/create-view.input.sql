CREATE VIEW active_orders AS SELECT o.id, o.customer_id, o.total FROM orders AS o WHERE o.status = 'active';

CREATE VIEW order_summary AS
SELECT o.id, c.name AS customer_name, o.total
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id
ORDER BY o.created_at DESC;
