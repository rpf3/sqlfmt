package lexer_test

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

const simplSQL = `SELECT id, name FROM users WHERE id = 1;`

const mediumSQL = `
SELECT u.id, u.email, u.first_name, u.last_name, r.name AS role_name
FROM users AS u
INNER JOIN user_roles AS ur ON u.id = ur.user_id
INNER JOIN roles AS r ON ur.role_id = r.id
WHERE u.is_active = TRUE AND r.is_system = FALSE
ORDER BY u.created_at DESC;`

const complexSQL = `
WITH monthly AS (
    SELECT DATE_TRUNC('month', placed_at) AS month, user_id, SUM(total_amount) AS spend
    FROM orders
    WHERE status != 'cancelled' AND placed_at >= '2024-01-01'
    GROUP BY DATE_TRUNC('month', placed_at), user_id
),
ranked AS (
    SELECT month, user_id, spend,
           ROW_NUMBER() OVER (PARTITION BY month ORDER BY spend DESC) AS rnk
    FROM monthly
)
SELECT r.month, r.user_id, u.email, r.spend
FROM ranked AS r
INNER JOIN users AS u ON r.user_id = u.id
WHERE r.rnk <= 10 AND u.is_active = TRUE
ORDER BY r.month DESC, r.spend DESC;`

// BenchmarkTokenize measures lexer throughput across three complexity tiers.
func BenchmarkTokenize(b *testing.B) {
	cases := []struct {
		name string
		sql  string
	}{
		{"simple", simplSQL},
		{"medium", mediumSQL},
		{"complex", complexSQL},
	}
	for _, tc := range cases {
		b.Run(tc.name, func(b *testing.B) {
			for b.Loop() {
				_, _ = lexer.Tokenize(tc.sql)
			}
		})
	}
}
