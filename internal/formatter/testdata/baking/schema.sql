create table ingredients
(
	id integer not null
,	name varchar(255) default 'unnamed' not null
,	constraint pk_ingredients primary key (id)
);

create table recipes
(
	id integer not null
,	name varchar(255) default 'untitled' not null
,	description varchar(1000) default null null
,	constraint pk_recipes primary key (id)
);
