CREATE VIEW pending_payments AS
SELECT p.id AS payment_id, p.order_id, o.user_id, u.email,
p.amount, p.currency, p.status, p.gateway_reference, p.processed_at,
o.total_amount AS order_total,
ROW_NUMBER() OVER (PARTITION BY p.order_id ORDER BY p.processed_at DESC) AS attempt_num
FROM payments AS p
INNER JOIN orders AS o ON p.order_id = o.id
INNER JOIN users AS u ON o.user_id = u.id
WHERE p.status IN ('pending', 'authorized')
AND o.status != 'cancelled';
