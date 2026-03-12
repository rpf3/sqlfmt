SELECT * FROM sales_data PIVOT (SUM(amount) FOR quarter IN ([Q1],[Q2],[Q3],[Q4])) AS pvt;
SELECT * FROM quarterly_sales UNPIVOT (amount FOR quarter IN (q1, q2, q3, q4)) AS unpvt;
SELECT pvt.customer_id, pvt.[Q1], pvt.[Q2] FROM sales_data PIVOT (SUM(amount) FOR quarter IN ([Q1],[Q2])) AS pvt INNER JOIN customers AS c ON c.id = pvt.customer_id;
