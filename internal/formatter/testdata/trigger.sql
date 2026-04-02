create trigger dbo.trg_orders_audit
on dbo.orders
after insert, update
as begin
	insert into dbo.audit_log
	(
		table_name
	,	action
	,	changed_at
	)
	values
	(
		'orders'
	,	'INSERT/UPDATE'
	,	getdate()
	);
end;

create trigger dbo.trg_vw_orders
on dbo.vw_orders
instead of insert
as begin
	insert into dbo.orders
	select
		*
	from
		inserted;
end;

create trigger dbo.trg_simple
on dbo.t
after delete
as begin
	delete from
		dbo.log
	where
		id in (select id from deleted);
end;

alter trigger dbo.trg_orders_audit
on dbo.orders
after insert
as begin
	print 'updated';
end;

drop trigger dbo.trg_orders_audit;

drop trigger if exists dbo.trg_old;
