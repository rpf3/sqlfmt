CREATE VIEW inventory_status AS
SELECT p.id AS product_id, p.sku, p.name, w.code AS warehouse_code,
i.quantity_on_hand, i.quantity_reserved,
i.quantity_on_hand - i.quantity_reserved AS available_qty,
i.reorder_point,
CASE WHEN i.quantity_on_hand - i.quantity_reserved <= i.reorder_point THEN 'low' ELSE 'ok' END AS stock_status,
RANK() OVER (PARTITION BY w.id ORDER BY i.quantity_on_hand ASC) AS low_stock_rank
FROM inventory AS i
INNER JOIN products AS p ON i.product_id = p.id
INNER JOIN warehouses AS w ON i.warehouse_id = w.id
WHERE p.is_active = TRUE AND w.is_active = TRUE;
