declare vend_cursor cursor
for
select
	vendor_id
,	name
from
	purchasing.vendor
where
	preferred_vendor_status = 1
order by
	vendor_id;

declare vend_cursor insensitive cursor
for
select
	vendor_id
from
	purchasing.vendor;

declare vend_cursor cursor
	scroll
for
select
	vendor_id
from
	purchasing.vendor;

declare vend_cursor insensitive cursor
	scroll
for
select
	vendor_id
from
	purchasing.vendor;

declare vend_cursor cursor
	local
for
select
	vendor_id
from
	purchasing.vendor;

declare vend_cursor cursor
	global
	forward_only
for
select
	vendor_id
from
	purchasing.vendor;

declare vend_cursor cursor
	scroll
	static
	read_only
for
select
	vendor_id
from
	purchasing.vendor;

declare vend_cursor cursor
	keyset
	scroll_locks
for
select
	vendor_id
from
	purchasing.vendor;

declare vend_cursor cursor
	dynamic
	optimistic
	type_warning
for
select
	vendor_id
from
	purchasing.vendor;

declare vend_cursor cursor
	local
	scroll
	fast_forward
	read_only
	type_warning
for
select
	vendor_id
from
	purchasing.vendor;

declare vend_cursor cursor
for
select
	vendor_id
from
	purchasing.vendor
for update;

declare vend_cursor cursor
for
select
	vendor_id
,	name
from
	purchasing.vendor
for update
of
	vendor_id
,	name;
