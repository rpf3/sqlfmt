INSERT INTO orders VALUES (1, 42, 99.99);

INSERT INTO orders (id, customer_id, total) VALUES (1,   42,  99.99);

INSERT INTO orders (id,customer_id,total) VALUES (1,42,99.99),(2,43,149.99);

INSERT INTO order_archive SELECT id, customer_id FROM orders;

INSERT INTO order_archive SELECT id, customer_id FROM orders WHERE created_at < '2024-01-01';
