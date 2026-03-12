SELECT e.name, d.name FROM employees AS e NATURAL JOIN departments AS d;
SELECT e.name, d.name FROM employees AS e NATURAL LEFT JOIN departments AS d;
SELECT e.name, d.name FROM employees AS e NATURAL RIGHT JOIN departments AS d;
SELECT e.name, d.name FROM employees AS e NATURAL LEFT OUTER JOIN departments AS d;
