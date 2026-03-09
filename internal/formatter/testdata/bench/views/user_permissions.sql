CREATE VIEW user_permissions AS
SELECT DISTINCT u.id AS user_id, u.email, p.name AS permission_name, p.resource, p.action
FROM users AS u
INNER JOIN user_roles AS ur ON u.id = ur.user_id
INNER JOIN roles AS r ON ur.role_id = r.id
INNER JOIN permissions AS p ON p.resource IS NOT NULL
WHERE u.is_active = TRUE AND r.is_system = FALSE;
