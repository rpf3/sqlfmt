create table ingredients
(
	id integer primary key
,	name text default 'unnamed' not null
);

create table recipes
(
	id integer not null
,	name text default 'untitled' not null
,	description text default null null
);
