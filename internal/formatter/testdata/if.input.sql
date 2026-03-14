-- IF with single body statement
IF @count > 0 BEGIN UPDATE orders SET status = 'active'; END;

-- IF / ELSE
IF @count > 0 BEGIN SELECT @count; END ELSE BEGIN SELECT 0; END;

-- single-statement IF normalised to BEGIN END
IF @x > 0 SELECT 1;
