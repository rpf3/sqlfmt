CREATE VIEW revenue_by_month AS
WITH monthly_payments AS (
SELECT DATE_TRUNC('month', processed_at) AS month, SUM(amount) AS revenue, COUNT(*) AS payment_count
FROM payments WHERE status = 'captured' GROUP BY DATE_TRUNC('month', processed_at)
)
SELECT mp.month, mp.revenue, mp.payment_count,
SUM(mp.revenue) OVER (ORDER BY mp.month ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_revenue,
mp.revenue - LAG(mp.revenue) OVER (ORDER BY mp.month ASC) AS revenue_delta
FROM monthly_payments AS mp
ORDER BY mp.month DESC;
