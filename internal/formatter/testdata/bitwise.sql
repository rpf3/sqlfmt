select
	t.permissions & 4 as has_flag
from
	dbo.users as t
where
	t.permissions & 4 <> 0;

select
	t.flags | 128 as new_flags
,	~t.flags as inv_flags
from
	dbo.items as t;

select
	t.a ^ t.b as xor_result
from
	dbo.t as t;

select
	t.id
from
	dbo.t as t
where
	(t.flags & 4) = 4
	and (t.flags | 2) <> 0;
