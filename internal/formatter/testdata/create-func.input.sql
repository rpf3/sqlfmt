-- scalar function
CREATE FUNCTION dbo.fn_GetAge(@birthdate DATE) RETURNS INT AS BEGIN RETURN DATEDIFF(YEAR, @birthdate, GETDATE()); END;

-- scalar function with multiple params
CREATE FUNCTION dbo.fn_FormatName(@first NVARCHAR(50), @last NVARCHAR(50)) RETURNS NVARCHAR(101) AS BEGIN RETURN @first + ' ' + @last; END;

-- inline table-valued function
CREATE FUNCTION dbo.fn_GetOrdersByCustomer(@customer_id INT) RETURNS TABLE AS RETURN (SELECT o.id, o.amount, o.status FROM dbo.orders AS o WHERE o.customer_id = @customer_id);

-- multi-statement table-valued function
CREATE FUNCTION dbo.fn_GetOrderSummary(@customer_id INT) RETURNS @result TABLE (order_id INT NOT NULL, total DECIMAL(10, 2) NOT NULL) AS BEGIN INSERT INTO @result SELECT id, amount FROM dbo.orders WHERE customer_id = @customer_id; RETURN; END;
