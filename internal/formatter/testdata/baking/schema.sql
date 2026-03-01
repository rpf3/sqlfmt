create table ingredients
(
	id integer primary key
,	name varchar(255) default 'unnamed' not null
);

create table recipes
(
	id integer not null
,	name varchar(255) default 'untitled' not null
,	description varchar(1000) default null null
);
