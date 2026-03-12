set nocount on;

set xact_abort on;

set rowcount 100;

set nocount off;

set transaction isolation level read committed;

set transaction isolation level repeatable read;

set transaction isolation level serializable;

set transaction isolation level read uncommitted;

set transaction isolation level snapshot;

set identity_insert dbo.Orders on;

set identity_insert Orders off;
