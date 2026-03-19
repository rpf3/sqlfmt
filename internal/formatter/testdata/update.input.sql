UPDATE orders SET status='active';
UPDATE   orders  SET  status='shipped',updated_at=now()  WHERE id=42;
UPDATE o SET o.status='shipped' FROM orders AS o WHERE o.id=42;
UPDATE o SET o.status='shipped' FROM orders AS o INNER JOIN customers AS c ON o.customer_id=c.id WHERE c.name='test';
UPDATE o SET o.status='x',o.note='test' FROM orders AS o WHERE o.id=1 AND o.active=1;
UPDATE o SET o.status='shipped' FROM orders AS o INNER JOIN customers AS c ON o.customer_id=c.id AND o.region=c.region WHERE c.name='test';

UPDATE orders SET status='active' OPTION (MAXDOP 1);
