CREATE INDEX IF NOT EXISTS ix_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);
CREATE UNIQUE INDEX uix_recipes_name ON recipes(name DESC);
