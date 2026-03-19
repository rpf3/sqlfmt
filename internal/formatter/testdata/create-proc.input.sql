-- simple procedure with no parameters
CREATE PROCEDURE dbo.usp_ArchiveOldOrders AS BEGIN DELETE FROM dbo.orders WHERE status = 'cancelled' AND created_at < '2020-01-01'; END;

-- procedure with input parameters
CREATE PROCEDURE dbo.usp_GetOrdersByCustomer @customer_id INT, @status NVARCHAR(20) = 'active' AS BEGIN SELECT o.id, o.amount, o.status FROM dbo.orders AS o WHERE o.customer_id = @customer_id AND o.status = @status; END;

-- procedure with output parameter
CREATE PROCEDURE dbo.usp_GetOrderCount @customer_id INT, @order_count INT OUTPUT AS BEGIN SELECT @order_count = COUNT(*) FROM dbo.orders WHERE customer_id = @customer_id; END;

-- procedure using PROC alias with multiple body statements
CREATE PROC dbo.usp_ProcessOrder @order_id INT AS BEGIN UPDATE dbo.orders SET status = 'processing' WHERE id = @order_id; INSERT INTO dbo.order_log (order_id, event) VALUES (@order_id, 'processing_started'); END;

-- WITH single option
CREATE PROCEDURE dbo.usp_DoWork WITH RECOMPILE AS BEGIN SELECT 1; END;

-- WITH multiple options
CREATE PROCEDURE dbo.usp_SecureWork @id INT WITH RECOMPILE, EXECUTE AS OWNER AS BEGIN SELECT @id; END;

-- WITH ENCRYPTION
CREATE PROCEDURE dbo.usp_Hidden WITH ENCRYPTION AS BEGIN SELECT 1; END;

-- WITH EXECUTE AS user name (string literal)
CREATE PROCEDURE dbo.usp_AsUser WITH EXECUTE AS 'dbo' AS BEGIN SELECT 1; END;
