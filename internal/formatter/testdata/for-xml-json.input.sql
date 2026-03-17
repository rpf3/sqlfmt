-- FOR XML PATH with ROOT
SELECT order_id, status FROM dbo.orders AS o FOR XML PATH('order'), ROOT('orders');

-- FOR XML AUTO with ELEMENTS
SELECT order_id, status FROM dbo.orders AS o FOR XML AUTO, ELEMENTS;

-- FOR XML RAW with ROOT and ELEMENTS XSINIL
SELECT order_id, status FROM dbo.orders AS o FOR XML RAW('row'), ROOT('data'), ELEMENTS XSINIL;

-- FOR JSON PATH with ROOT
SELECT order_id, status FROM dbo.orders AS o FOR JSON PATH, ROOT('orders');

-- FOR JSON AUTO (no options)
SELECT order_id, status FROM dbo.orders AS o FOR JSON AUTO;

-- FOR XML after ORDER BY
SELECT order_id, status FROM dbo.orders AS o ORDER BY order_id ASC FOR XML PATH('order');
