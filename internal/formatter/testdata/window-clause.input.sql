SELECT SalesOrderID, ProductID, SUM(OrderQty) OVER win AS total, AVG(OrderQty) OVER win AS avg_qty FROM Sales.SalesOrderDetail WHERE SalesOrderID IN (43659, 43664) WINDOW win AS (PARTITION BY SalesOrderID) ORDER BY SalesOrderID;
SELECT id, val, SUM(val) OVER w1 AS running, AVG(val) OVER w2 AS rolling FROM metrics WINDOW w1 AS (PARTITION BY id ORDER BY ts), w2 AS (ORDER BY ts) ORDER BY id, ts;
