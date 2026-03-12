SELECT region, territory, SUM(sales) AS total FROM sales_data AS s GROUP BY ROLLUP(region, territory);
SELECT region, SUM(sales) AS total FROM sales_data AS s GROUP BY CUBE(region);
SELECT region, SUM(sales) AS total FROM sales_data AS s GROUP BY GROUPING SETS((region, territory), (region), ());
SELECT SUM(sales) AS total FROM sales_data AS s GROUP BY ();
SELECT region, territory, SUM(sales) AS total FROM sales_data AS s GROUP BY region, ROLLUP(territory);
SELECT region, SUM(sales) AS total FROM sales_data AS s GROUP BY ROLLUP(region), CUBE(territory);
