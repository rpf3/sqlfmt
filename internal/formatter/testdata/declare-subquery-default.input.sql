DECLARE @max_id INT = (SELECT MAX(id) FROM dbo.orders);
DECLARE @count INT = (SELECT COUNT(*) FROM dbo.active_users WHERE is_active = 1);
DECLARE @name VARCHAR(100) = (SELECT TOP 1 name FROM dbo.config WHERE key = 'app_name');
DECLARE @x INT = 0;
DECLARE @y INT;
