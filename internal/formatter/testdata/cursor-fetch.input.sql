FETCH NEXT FROM vend_cursor;
FETCH PRIOR FROM vend_cursor;
FETCH FIRST FROM vend_cursor;
FETCH LAST FROM vend_cursor;
FETCH ABSOLUTE 5 FROM vend_cursor;
FETCH RELATIVE 2 FROM vend_cursor;
FETCH FROM vend_cursor;
FETCH NEXT FROM vend_cursor INTO @vendor_id, @vendor_name;
FETCH NEXT FROM vend_cursor INTO @a, @b, @c;
