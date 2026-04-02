create sequence dbo.order_seq
	as int
	start with 1
	increment by 1
	minvalue 1
	no maxvalue
	no cycle
	cache 10;

create sequence counter;

create sequence dbo.invoice_num
	as bigint
	start with 1000
	increment by 1
	no minvalue
	no maxvalue
	no cycle
	no cache;
