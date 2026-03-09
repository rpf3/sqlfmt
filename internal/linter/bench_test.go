package linter_test

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/linter"
)

const benchDDLSQL = `
CREATE TABLE orders (
    id INT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    placed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_orders PRIMARY KEY (id),
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT chk_orders_status CHECK (status IN ('pending','confirmed','cancelled'))
);
CREATE INDEX idx_orders_user ON orders (user_id ASC);
CREATE INDEX idx_orders_status ON orders (status ASC, placed_at DESC);`

const benchSelectLintSQL = `
SELECT u.id AS user_id, u.email AS user_email,
       o.id AS order_id, o.total_amount,
       COUNT(oi.id) AS item_count
FROM users AS u
INNER JOIN orders AS o ON u.id = o.user_id
LEFT JOIN order_items AS oi ON o.id = oi.order_id
WHERE u.is_active = TRUE AND o.status != 'cancelled'
GROUP BY u.id, u.email, o.id, o.total_amount
HAVING COUNT(oi.id) > 0
ORDER BY o.total_amount DESC;`

const benchDMLLintSQL = `
INSERT INTO order_items (order_id, product_id, quantity, unit_price, line_total)
VALUES (1, 10, 2, 29.99, 59.98), (1, 23, 1, 149.00, 149.00);

MERGE INTO inventory AS tgt
USING (SELECT product_id, SUM(quantity) AS qty FROM shipment_items GROUP BY product_id) AS src
ON tgt.product_id = src.product_id
WHEN MATCHED AND tgt.quantity_on_hand >= 0 THEN
    UPDATE SET quantity_on_hand = tgt.quantity_on_hand + src.qty
WHEN NOT MATCHED THEN
    INSERT (product_id, warehouse_id, quantity_on_hand) VALUES (src.product_id, 1, src.qty);`

// BenchmarkLint measures linter throughput across rule categories.
func BenchmarkLint(b *testing.B) {
	cases := []struct {
		name string
		sql  string
	}{
		{"ddl", benchDDLSQL},
		{"select", benchSelectLintSQL},
		{"dml", benchDMLLintSQL},
	}
	cfg := config.Default()
	for _, tc := range cases {
		b.Run(tc.name, func(b *testing.B) {
			for b.Loop() {
				_, _ = linter.Lint(tc.sql, cfg)
			}
		})
	}
}
