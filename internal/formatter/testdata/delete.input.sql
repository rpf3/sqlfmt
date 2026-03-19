DELETE o FROM orders AS o WHERE o.status = 'cancelled' AND o.created_at < '2024-01-01';
DELETE s FROM sessions AS s;
DELETE FROM archive WHERE created_at < '2020-01-01';
DELETE FROM staging;

DELETE FROM orders WHERE status = 'cancelled' OPTION (RECOMPILE);
