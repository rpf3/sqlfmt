create table ingredients
(
	id integer not null
,	name varchar(255) default 'unnamed' not null

,	constraint pk_ingredients
		primary key (id)
,	constraint uq_ingredients_name
		unique (name)
);

create table recipes
(
	id integer not null
,	name varchar(255) default 'untitled' not null
,	description varchar(1000) default null null

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
