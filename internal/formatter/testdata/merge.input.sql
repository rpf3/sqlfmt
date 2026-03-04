-- Case 1: simple WHEN MATCHED UPDATE + WHEN NOT MATCHED INSERT
MERGE into orders AS t USING staging AS s ON t.id = s.id WHEN MATCHED THEN UPDATE SET t.status = s.status WHEN NOT MATCHED THEN INSERT (id, status) VALUES (s.id, s.status);

-- Case 2: AND conditions, multiple SET assignments, WHEN NOT MATCHED BY SOURCE DELETE
MERGE INTO orders AS t USING staging AS s ON t.id=s.id WHEN MATCHED AND t.status!=s.status THEN UPDATE SET t.status=s.status,t.updated_at=getdate() WHEN NOT MATCHED THEN INSERT (id,status) VALUES (s.id,s.status) WHEN NOT MATCHED BY SOURCE THEN DELETE;

-- Case 3: WHEN MATCHED DELETE with bare implicit aliases (no AS)
MERGE INTO orders t USING staging s ON t.id = s.id WHEN MATCHED AND t.expired = 1 THEN DELETE WHEN NOT MATCHED THEN INSERT (id, status) VALUES (s.id, s.status);

-- Case 4: subquery USING source
MERGE INTO orders AS t USING (SELECT id, status FROM staging WHERE active = 1) AS s ON t.id = s.id WHEN MATCHED THEN UPDATE SET t.status = s.status WHEN NOT MATCHED THEN INSERT (id, status) VALUES (s.id, s.status);
