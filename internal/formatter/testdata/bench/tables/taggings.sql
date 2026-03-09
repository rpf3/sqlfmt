CREATE TABLE taggings (
id INT NOT NULL,
tag_id INT NOT NULL,
taggable_type VARCHAR(100) NOT NULL,
taggable_id INT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT pk_taggings PRIMARY KEY (id),
CONSTRAINT fk_taggings_tag FOREIGN KEY (tag_id) REFERENCES tags (id),
CONSTRAINT uq_taggings UNIQUE (tag_id, taggable_type, taggable_id)
);
