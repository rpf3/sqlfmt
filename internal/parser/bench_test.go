package parser_test

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/parser"
)

const benchSelectSQL = `
SELECT u.id, u.email, u.first_name, u.last_name, o.id AS order_id, o.total_amount
FROM users AS u
INNER JOIN orders AS o ON u.id = o.user_id
LEFT JOIN order_items AS oi ON o.id = oi.order_id
WHERE u.is_active = TRUE AND o.status = 'confirmed' AND o.placed_at >= '2024-01-01'
GROUP BY u.id, u.email, u.first_name, u.last_name, o.id, o.total_amount
HAVING COUNT(oi.id) > 0
ORDER BY o.placed_at DESC;`

const benchCreateTableSQL = `
CREATE TABLE orders (
    id INT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    subtotal DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    placed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fulfilled_at TIMESTAMP,
    CONSTRAINT pk_orders PRIMARY KEY (id),
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT chk_orders_status CHECK (status IN ('pending','confirmed','shipped','cancelled'))
);`

const benchInsertSQL = `
INSERT INTO order_items (order_id, product_id, quantity, unit_price, line_total)
VALUES
    (1, 10, 2, 29.99, 59.98),
    (1, 23, 1, 149.00, 149.00),
    (1, 7, 3, 9.99, 29.97),
    (2, 15, 1, 499.00, 499.00),
    (2, 31, 4, 4.99, 19.96);`

const benchMergeSQL = `
MERGE INTO inventory AS tgt
USING (
    SELECT product_id, warehouse_id, SUM(quantity) AS qty
    FROM shipment_items
    GROUP BY product_id, warehouse_id
) AS src ON tgt.product_id = src.product_id AND tgt.warehouse_id = src.warehouse_id
WHEN MATCHED AND tgt.quantity_on_hand + src.qty > 0 THEN
    UPDATE SET quantity_on_hand = tgt.quantity_on_hand + src.qty
WHEN NOT MATCHED THEN
    INSERT (product_id, warehouse_id, quantity_on_hand)
    VALUES (src.product_id, src.warehouse_id, src.qty);`

// BenchmarkParse measures parser throughput across statement types.
func BenchmarkParse(b *testing.B) {
	cases := []struct {
		name string
		sql  string
	}{
		{"select", benchSelectSQL},
		{"create_table", benchCreateTableSQL},
		{"insert", benchInsertSQL},
		{"merge", benchMergeSQL},
	}
	for _, tc := range cases {
		b.Run(tc.name, func(b *testing.B) {
			for b.Loop() {
				_ = parser.Parse(tc.sql)
			}
		})
	}
}
