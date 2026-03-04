CREATE TABLE #staging (id INT NOT NULL, name VARCHAR(50) NOT NULL);

INSERT INTO #staging (id, name) SELECT id, name FROM source;

SELECT s.id, l.value FROM #staging AS s INNER JOIN ##shared_lookup AS l ON s.id = l.id;

DROP TABLE #staging;
