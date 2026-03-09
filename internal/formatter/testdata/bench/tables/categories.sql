CREATE TABLE categories (
id INT NOT NULL,
parent_id INT,
name VARCHAR(100) NOT NULL,
slug VARCHAR(100) NOT NULL,
description TEXT,
display_order INT NOT NULL DEFAULT 0,
is_active BOOLEAN NOT NULL DEFAULT TRUE,
CONSTRAINT pk_categories PRIMARY KEY (id),
CONSTRAINT uq_categories_slug UNIQUE (slug),
CONSTRAINT fk_categories_parent FOREIGN KEY (parent_id) REFERENCES categories (id)
);
