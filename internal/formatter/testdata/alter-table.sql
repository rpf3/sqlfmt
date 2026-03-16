alter table ingredients
	add column notes text null;

alter table ingredients
	drop column notes;

alter table recipes
	add constraint uq_recipes_name_description
		unique (name, description);

alter table recipes
	drop constraint uq_recipes_name_description;
