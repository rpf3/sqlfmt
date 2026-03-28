-- simple exec, no arguments
EXEC dbo.usp_ArchiveOldOrders;

-- EXECUTE alias
EXECUTE dbo.usp_ArchiveOldOrders;

-- positional arguments
EXEC dbo.usp_GetOrdersByCustomer 42, 'active';

-- named arguments
EXEC dbo.usp_GetOrdersByCustomer @customer_id = 42, @status = 'active';

-- single named argument (stays on one line)
EXEC dbo.usp_ProcessOrder @order_id = 99;

-- capture return value
EXEC @rc = dbo.usp_ProcessOrder @order_id = 99;

-- dynamic SQL
EXEC (@sql);

-- sp_executesql with multiple arguments
EXEC sp_executesql @sql, N'@id INT', @id = 42;

-- EXECUTE AS security context
EXECUTE AS USER = 'dbo';
EXECUTE AS LOGIN = 'sa';
EXECUTE AS CALLER;
EXEC AS SELF;

-- REVERT
REVERT;

-- single OUTPUT arg (stays on one line)
EXEC dbo.usp_GetValue @result OUTPUT;

-- named OUTPUT arg (stays on one line)
EXEC dbo.usp_GetValue @result = @result OUTPUT;

-- multiple args, some with OUTPUT
EXEC dbo.usp_GetCustomer @customer_id = 42, @name = @name OUTPUT, @email = @email OUTPUT;
