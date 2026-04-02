CREATE TRIGGER dbo.trg_orders_audit
ON dbo.orders
AFTER INSERT, UPDATE
AS
BEGIN
    INSERT INTO dbo.audit_log (table_name, action, changed_at)
    VALUES ('orders', 'INSERT/UPDATE', GETDATE());
END;

CREATE TRIGGER dbo.trg_vw_orders
ON dbo.vw_orders
INSTEAD OF INSERT
AS
BEGIN
    INSERT INTO dbo.orders SELECT * FROM inserted;
END;

CREATE TRIGGER dbo.trg_simple ON dbo.t FOR DELETE AS
BEGIN
    DELETE FROM dbo.log WHERE id IN (SELECT id FROM deleted);
END;

ALTER TRIGGER dbo.trg_orders_audit
ON dbo.orders
AFTER INSERT
AS
BEGIN
    PRINT 'updated';
END;

DROP TRIGGER dbo.trg_orders_audit;
DROP TRIGGER IF EXISTS dbo.trg_old;
