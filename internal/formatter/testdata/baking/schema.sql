create table ingredients
(
	id integer primary key
,	name text not null
);

create table recipes
(
	id integer not null
,	name text not null
,	description text null
);
