-- TVF in FROM with single argument
SELECT t.order_id, t.total FROM dbo.fn_get_orders(@customer_id) AS t;

-- TVF in FROM with multiple arguments
SELECT dr.start_date, dr.end_date FROM dbo.fn_date_range(@start, @end) AS dr;

-- TVF with no arguments (explicit empty parens)
SELECT s.value FROM STRING_SPLIT(@csv, ',') AS s;

-- TVF in FROM with schema-qualified name and no alias
SELECT * FROM dbo.fn_active_customers() AS ac WHERE ac.region = 'US';

-- TVF in regular INNER JOIN
SELECT o.order_id, s.label FROM dbo.orders AS o INNER JOIN dbo.fn_status_labels() AS s ON o.status_code = s.code;

-- Multiple TVFs: one in FROM, one in JOIN
SELECT a.id, b.name FROM dbo.fn_accounts(@date) AS a INNER JOIN dbo.fn_names(@date) AS b ON a.id = b.id;
