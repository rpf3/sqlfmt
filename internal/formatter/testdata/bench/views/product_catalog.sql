CREATE VIEW product_catalog AS
WITH category_tree AS (
SELECT id, name, parent_id, name AS path FROM categories WHERE parent_id IS NULL
)
SELECT p.id, p.sku, p.name AS product_name, c.name AS category_name,
p.base_price, p.is_active,
COUNT(pv.id) AS variant_count,
SUM(i.quantity_on_hand) AS total_inventory,
AVG(p.base_price) OVER (PARTITION BY p.category_id ORDER BY p.created_at DESC) AS category_avg_price
FROM products AS p
INNER JOIN categories AS c ON p.category_id = c.id
LEFT JOIN product_variants AS pv ON p.id = pv.product_id AND pv.is_active = TRUE
LEFT JOIN inventory AS i ON p.id = i.product_id
WHERE p.is_active = TRUE AND c.is_active = TRUE
GROUP BY p.id, p.sku, p.name, c.name, p.base_price, p.is_active, p.category_id, p.created_at
HAVING SUM(i.quantity_on_hand) > 0;
