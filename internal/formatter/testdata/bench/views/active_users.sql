CREATE VIEW active_users AS
WITH recent_sessions AS (
SELECT user_id, MAX(last_seen_at) AS last_seen FROM sessions WHERE is_revoked = FALSE GROUP BY user_id
)
SELECT u.id, u.email, u.username, u.first_name, u.last_name, rs.last_seen,
ROW_NUMBER() OVER (ORDER BY rs.last_seen DESC) AS activity_rank
FROM users AS u
INNER JOIN recent_sessions AS rs ON u.id = rs.user_id
WHERE u.is_active = TRUE AND rs.last_seen >= CURRENT_TIMESTAMP - INTERVAL '30 days';
