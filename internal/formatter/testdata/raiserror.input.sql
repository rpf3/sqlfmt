-- basic RAISERROR with string literal
RAISERROR('Something went wrong',16,1);

-- RAISERROR with variable message
RAISERROR(@msg,16,1);

-- RAISERROR with message ID (integer)
RAISERROR(50001,16,1);

-- RAISERROR with WITH NOWAIT
RAISERROR('Processing...',10,1) WITH NOWAIT;

-- RAISERROR with WITH LOG
RAISERROR('Critical error',16,1) WITH LOG;

-- RAISERROR with multiple WITH options
RAISERROR('Critical error',16,1) WITH SETERROR,LOG;

-- RAISERROR in a CATCH block (should NOT trigger catch-without-throw)
BEGIN TRY INSERT INTO dbo.orders (customer_id) VALUES (42); END TRY BEGIN CATCH ROLLBACK TRANSACTION; RAISERROR('Insert failed',16,1); END CATCH;
