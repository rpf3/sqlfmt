SELECT TOP(10) t.id, t.name FROM orders AS t ORDER BY t.created_at DESC;
SELECT TOP(25) PERCENT WITH TIES t.id, t.total FROM orders AS t ORDER BY t.total_amount DESC;
SELECT DISTINCT TOP(5) t.id FROM orders AS t ORDER BY t.created_at DESC;
SELECT TOP 100 t.id, t.name FROM orders AS t;
