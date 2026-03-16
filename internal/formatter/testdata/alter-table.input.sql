ALTER TABLE ingredients ADD COLUMN notes TEXT NULL;
ALTER TABLE ingredients DROP COLUMN notes;
ALTER TABLE recipes ADD CONSTRAINT uq_recipes_name_description UNIQUE(name,description);
ALTER TABLE recipes DROP CONSTRAINT uq_recipes_name_description;
