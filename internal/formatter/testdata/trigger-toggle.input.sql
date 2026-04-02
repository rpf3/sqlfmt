DISABLE TRIGGER dbo.trg_orders_audit ON dbo.orders;
ENABLE TRIGGER dbo.trg_orders_audit ON dbo.orders;
DISABLE TRIGGER ALL ON dbo.orders;
ENABLE TRIGGER ALL ON dbo.orders;
DISABLE TRIGGER dbo.trg_ddl_log ON DATABASE;
ENABLE TRIGGER ALL ON DATABASE;
