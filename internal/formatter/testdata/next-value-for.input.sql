CREATE TABLE dbo.orders (id INT CONSTRAINT df_orders_id DEFAULT NEXT VALUE FOR dbo.order_seq NOT NULL, name NVARCHAR(100) NOT NULL);
CREATE TABLE dbo.order_items (order_id INT NOT NULL CONSTRAINT df_item_id DEFAULT NEXT VALUE FOR dbo.item_seq);
SELECT NEXT VALUE FOR dbo.order_seq AS next_id FROM dbo.orders AS o;
INSERT INTO dbo.orders (id, name) VALUES (NEXT VALUE FOR dbo.order_seq, 'test');
UPDATE dbo.orders SET id = NEXT VALUE FOR dbo.order_seq WHERE name = 'test';
