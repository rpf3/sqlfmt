-- print a string literal
PRINT 'Hello, world!';

-- print a variable
PRINT @message;

-- print an expression (concatenation with CAST)
PRINT 'Row count: ' + CAST(@count AS VARCHAR(10));

-- print a system variable
PRINT @@VERSION;
