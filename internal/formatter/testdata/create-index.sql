create index if not exists ix_recipe_ingredients_ingredient
	on recipe_ingredients (ingredient_id);

create unique index uix_recipes_name
	on recipes (name desc);
