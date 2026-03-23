fetch next from vend_cursor;

fetch prior from vend_cursor;

fetch first from vend_cursor;

fetch last from vend_cursor;

fetch absolute 5 from vend_cursor;

fetch relative 2 from vend_cursor;

fetch next from vend_cursor;

fetch next from vend_cursor
into
	@vendor_id
,	@vendor_name;

fetch next from vend_cursor
into
	@a
,	@b
,	@c;
