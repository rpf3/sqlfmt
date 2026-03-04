create table #staging
(
	id int not null
,	name varchar(50) not null
);

insert into #staging
(
	id
,	name
)
select
	id
,	name
from
	source;

select
	s.id
,	l.value
from
	#staging as s
inner join
	##shared_lookup as l
		on s.id = l.id;

drop table #staging;
