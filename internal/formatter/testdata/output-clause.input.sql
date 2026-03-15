INSERT INTO orders (customer_id, status) OUTPUT inserted.order_id, inserted.customer_id VALUES (42, 'pending');

INSERT INTO orders (customer_id, status) OUTPUT inserted.order_id INTO @new_ids (order_id) VALUES (42, 'pending');

UPDATE orders SET status = 'shipped' OUTPUT deleted.status AS old_status, inserted.status AS new_status WHERE order_id = 42;

DELETE FROM orders OUTPUT deleted.order_id, deleted.status WHERE order_id = 42;

MERGE INTO orders AS tgt USING staging AS src ON tgt.order_id = src.order_id WHEN MATCHED THEN UPDATE SET tgt.status = src.status WHEN NOT MATCHED THEN INSERT (order_id, status) VALUES (src.order_id, src.status) OUTPUT $action, inserted.order_id;
