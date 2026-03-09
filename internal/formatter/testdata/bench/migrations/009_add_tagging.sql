CREATE TABLE tags (id INT NOT NULL, name VARCHAR(100) NOT NULL, slug VARCHAR(100) NOT NULL, color VARCHAR(7), CONSTRAINT pk_tags PRIMARY KEY (id), CONSTRAINT uq_tags_slug UNIQUE (slug));
CREATE TABLE taggings (id INT NOT NULL, tag_id INT NOT NULL, taggable_type VARCHAR(100) NOT NULL, taggable_id INT NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT pk_taggings PRIMARY KEY (id), CONSTRAINT fk_taggings_tag FOREIGN KEY (tag_id) REFERENCES tags (id), CONSTRAINT uq_taggings UNIQUE (tag_id, taggable_type, taggable_id));
INSERT INTO tags (id, name, slug, color) VALUES (1, 'Featured', 'featured', '#FF5733');
INSERT INTO tags (id, name, slug, color) VALUES (2, 'Sale', 'sale', '#33FF57');
INSERT INTO tags (id, name, slug, color) VALUES (3, 'New Arrival', 'new-arrival', '#3357FF');
CREATE INDEX idx_taggings_tag ON taggings (tag_id ASC);
CREATE INDEX idx_taggings_target ON taggings (taggable_type ASC, taggable_id ASC);
