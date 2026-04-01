create table ingredients
(
	id integer not null
,	name varchar(255) not null
		constraint df_ingredients_name default 'unnamed'

,	constraint pk_ingredients
		primary key (id)
,	constraint uq_ingredients_name
		unique (name)
);

create table recipes
(
	id integer not null
,	name varchar(255) not null
		constraint df_recipes_name default 'untitled'
,	description varchar(1000) null
		constraint df_recipes_description default null

,	constraint pk_recipes
		primary key (id)
);

create table recipe_ingredients
(
	recipe_id integer not null
,	ingredient_id integer not null
,	quantity numeric(10, 2) not null

,	constraint pk_recipe_ingredients
		primary key (recipe_id, ingredient_id)
,	constraint fk_recipe_ingredients_recipe
		foreign key (recipe_id) references recipes (id)
,	constraint fk_recipe_ingredients_ingredient
		foreign key (ingredient_id) references ingredients (id)
,	constraint chk_recipe_ingredients_quantity
		check (quantity > 0)
);

create table documents
(
	id int not null
,	title nvarchar(255) not null
,	body nvarchar(max) null
,	content varbinary(max) null
,	summary varchar(max) null

,	constraint pk_documents
		primary key (id)
);

create table orders
(
	id int identity not null
,	code int identity(100, 10) not null

,	constraint pk_orders
		primary key (id)
);

create table order_lines
(
	id int not null
,	unit_price decimal(10, 2) not null
,	quantity int not null
,	total as unit_price * quantity
,	total_persisted as unit_price * quantity persisted
,	total_not_null as unit_price * quantity persisted not null

,	constraint pk_order_lines
		primary key (id)
);

create table users
(
	username nvarchar(50) collate SQL_Latin1_General_CP1_CI_AS not null
,	email varchar(100) collate Latin1_General_CI_AS null
);
