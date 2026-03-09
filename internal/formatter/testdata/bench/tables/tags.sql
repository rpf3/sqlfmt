CREATE TABLE tags (
id INT NOT NULL,
name VARCHAR(100) NOT NULL,
slug VARCHAR(100) NOT NULL,
color VARCHAR(7),
description TEXT,
CONSTRAINT pk_tags PRIMARY KEY (id),
CONSTRAINT uq_tags_slug UNIQUE (slug)
);
