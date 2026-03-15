ALTER PROCEDURE dbo.usp_ProcessOrders @order_id INT, @status VARCHAR(20) = 'pending' AS BEGIN UPDATE orders SET status = @status WHERE order_id = @order_id; END;

ALTER PROC dbo.usp_ArchiveOldOrders AS BEGIN DELETE FROM dbo.orders WHERE status = 'cancelled' AND created_at < '2020-01-01'; END;

ALTER FUNCTION dbo.fn_get_total(@order_id INT) RETURNS DECIMAL(10,2) AS BEGIN RETURN (SELECT SUM(amount) FROM order_lines WHERE order_id = @order_id); END;

ALTER VIEW active_orders AS SELECT o.id, o.customer_id, o.total FROM orders AS o WHERE o.status = 'active';
