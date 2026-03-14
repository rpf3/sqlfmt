-- standalone TRY/CATCH with COMMIT/ROLLBACK and bare THROW re-raise
BEGIN TRY INSERT INTO orders (customer_id) VALUES (42); COMMIT TRANSACTION; END TRY BEGIN CATCH ROLLBACK TRANSACTION; THROW; END CATCH;

-- THROW with arguments
THROW 50001, 'Order not found', 1;

-- bare THROW re-raise (standalone)
THROW;

-- TRY/CATCH inside a procedure body
CREATE PROCEDURE dbo.usp_SafeInsert @customer_id INT AS BEGIN BEGIN TRY INSERT INTO orders (customer_id) VALUES (@customer_id); END TRY BEGIN CATCH ROLLBACK TRANSACTION; THROW; END CATCH; END;
