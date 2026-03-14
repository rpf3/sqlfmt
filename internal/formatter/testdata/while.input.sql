-- WHILE with explicit BEGIN END
WHILE @i < 10 BEGIN SET @i = @i + 1; END;

-- single-statement WHILE normalised to BEGIN END
WHILE @i < 10 SET @i = @i + 1;

-- WHILE with BREAK (RawStmt fallback) and nested IF
WHILE 1 = 1 BEGIN SET @i = @i + 1; IF @i > 10 BREAK; END;
