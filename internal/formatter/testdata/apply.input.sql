SELECT e.id, e.name, t.val FROM employees AS e CROSS APPLY dbo.GetValues(e.id) AS t;
SELECT e.id, e.name, t.val FROM employees AS e OUTER APPLY dbo.GetValues(e.id) AS t;
SELECT e.id, latest.val FROM employees AS e OUTER APPLY (SELECT TOP(1) val FROM activity WHERE activity.emp_id = e.id ORDER BY ts DESC) AS latest;
SELECT d.id, e.name FROM departments AS d INNER JOIN employees AS e ON e.dept_id = d.id CROSS APPLY dbo.GetValues(e.id) AS t;
