disable trigger dbo.trg_orders_audit on dbo.orders;

enable trigger dbo.trg_orders_audit on dbo.orders;

disable trigger all on dbo.orders;

enable trigger all on dbo.orders;

disable trigger dbo.trg_ddl_log on database;

enable trigger all on database;
