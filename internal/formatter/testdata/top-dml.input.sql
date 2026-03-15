UPDATE TOP (1000) orders SET status = 'archived' WHERE created_at < '2020-01-01';

UPDATE TOP(500) dbo.orders SET status='archived';

DELETE TOP (500) FROM orders WHERE status = 'cancelled';

DELETE TOP(100) FROM dbo.orders;
