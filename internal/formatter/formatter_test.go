package formatter

import (
	"os"
	"path/filepath"
	"testing"
)

// goldenCases maps each golden file to a messily formatted but semantically
// identical input. Add a new entry here whenever a new testdata/*.sql file is
// created.
var goldenCases = []struct {
	name   string
	golden string
	input  string
}{
	{
		name:   "create table",
		golden: "testdata/create-table.sql",
		input: `create table ingredients(id integer NOT NULL,name VARCHAR(255) DEFAULT 'unnamed' not null,CONSTRAINT pk_ingredients PRIMARY KEY(id),CONSTRAINT uq_ingredients_name UNIQUE(name));
create table recipes(id integer NOT NULL,name VARCHAR( 255 ) DEFAULT 'untitled' NOT NULL,description VARCHAR(1000) DEFAULT NULL NULL,CONSTRAINT pk_recipes PRIMARY KEY( id ));
create table recipe_ingredients(recipe_id integer NOT NULL,ingredient_id integer NOT NULL,quantity NUMERIC(10,2) NOT NULL,CONSTRAINT pk_recipe_ingredients PRIMARY KEY(recipe_id,ingredient_id),CONSTRAINT fk_recipe_ingredients_recipe FOREIGN KEY(recipe_id) REFERENCES recipes(id),CONSTRAINT fk_recipe_ingredients_ingredient FOREIGN KEY(ingredient_id) REFERENCES ingredients(id),CONSTRAINT chk_recipe_ingredients_quantity CHECK(quantity>0));`,
	},
	{
		name:   "create index",
		golden: "testdata/create-index.sql",
		input: `CREATE INDEX IF NOT EXISTS ix_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);
CREATE UNIQUE INDEX uix_recipes_name ON recipes(name DESC);`,
	},
	{
		name:   "alter table",
		golden: "testdata/alter-table.sql",
		input: `ALTER TABLE ingredients ADD COLUMN notes TEXT NULL;
ALTER TABLE ingredients DROP COLUMN notes;
ALTER TABLE recipes ADD CONSTRAINT uq_recipes_name_description UNIQUE(name,description);
ALTER TABLE recipes DROP CONSTRAINT uq_recipes_name_description;
ALTER TABLE ingredients RENAME TO ingredient;
ALTER TABLE recipe_ingredients RENAME COLUMN quantity TO amount;`,
	},
}

// TestFormatGolden verifies that Format produces output identical to each
// golden file when given a messily formatted but semantically identical input.
func TestFormatGolden(t *testing.T) {
	for _, tc := range goldenCases {
		t.Run(tc.name, func(t *testing.T) {
			golden, err := os.ReadFile(tc.golden)
			if err != nil {
				t.Fatalf("could not read golden file: %v", err)
			}
			got, err := Format(tc.input)
			if err != nil {
				t.Fatalf("Format() unexpected error: %v", err)
			}
			if got != string(golden) {
				t.Errorf("Format() output does not match golden file.\ngot:\n%s\nwant:\n%s", got, string(golden))
			}
		})
	}
}

// TestFormatIdempotent verifies that formatting any golden file produces the
// same output again (Format(Format(x)) == Format(x)). It picks up all
// testdata/*.sql files automatically, so new golden files are covered without
// any changes to this test.
func TestFormatIdempotent(t *testing.T) {
	files, err := filepath.Glob("testdata/*.sql")
	if err != nil {
		t.Fatalf("could not glob testdata: %v", err)
	}
	if len(files) == 0 {
		t.Fatal("no golden files found in testdata/")
	}
	for _, path := range files {
		t.Run(filepath.Base(path), func(t *testing.T) {
			golden, err := os.ReadFile(path)
			if err != nil {
				t.Fatalf("could not read %s: %v", path, err)
			}
			first, err := Format(string(golden))
			if err != nil {
				t.Fatalf("Format() first pass unexpected error: %v", err)
			}
			second, err := Format(first)
			if err != nil {
				t.Fatalf("Format() second pass unexpected error: %v", err)
			}
			if first != second {
				t.Errorf("Format is not idempotent.\nfirst:\n%s\nsecond:\n%s", first, second)
			}
		})
	}
}

// TestFormatParseError verifies that invalid SQL returns a non-nil error.
func TestFormatParseError(t *testing.T) {
	_, err := Format("this is not valid sql")
	if err == nil {
		t.Error("Format() expected error for invalid SQL, got nil")
	}
}
