merge into orders as t
using staging as s
on
(
	t.id = s.id
)
when matched then update set
	t.status = s.status
when not matched then insert
(
	id
,	status
)
values
(
	s.id
,	s.status
);

merge into orders as t
using staging as s
on
(
	t.id = s.id
)
when matched and
(
	t.status != s.status
)
then update set
	t.status = s.status
,	t.updated_at = getdate()
when not matched then insert
(
	id
,	status
)
values
(
	s.id
,	s.status
)
when not matched by source then delete;

merge into orders as t
using staging as s
on
(
	t.id = s.id
)
when matched and
(
	t.expired = 1
)
then delete
when not matched then insert
(
	id
,	status
)
values
(
	s.id
,	s.status
);

merge into orders as t using
(
	select
		id
	,	status
	from
		staging
	where
		active = 1
) as s
on
(
	t.id = s.id
)
when matched then update set
	t.status = s.status
when not matched then insert
(
	id
,	status
)
values
(
	s.id
,	s.status
);
