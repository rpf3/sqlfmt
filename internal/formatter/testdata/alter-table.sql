alter table ingredients
	add column notes text null;

alter table ingredients
	drop column notes;

alter table recipes
	add constraint uq_recipes_name_description
		unique (name, description);

alter table recipes
	drop constraint uq_recipes_name_description;

alter table dbo.orders
	alter column status nvarchar(50) not null;

alter table dbo.orders
	alter column amount decimal(18, 2) null;

alter table dbo.orders
	alter column code nvarchar(max) not null;
