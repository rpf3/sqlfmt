CREATE TABLE categories (id INT NOT NULL, parent_id INT, name VARCHAR(100) NOT NULL, slug VARCHAR(100) NOT NULL, is_active BOOLEAN NOT NULL DEFAULT TRUE, CONSTRAINT pk_categories PRIMARY KEY (id), CONSTRAINT uq_categories_slug UNIQUE (slug));
CREATE TABLE products (id INT NOT NULL, sku VARCHAR(100) NOT NULL, name VARCHAR(255) NOT NULL, category_id INT NOT NULL, base_price DECIMAL(12,2) NOT NULL, is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT pk_products PRIMARY KEY (id), CONSTRAINT uq_products_sku UNIQUE (sku), CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id));
INSERT INTO categories (id, name, slug) VALUES (1, 'Electronics', 'electronics');
INSERT INTO categories (id, name, slug) VALUES (2, 'Clothing', 'clothing');
CREATE INDEX idx_products_category ON products (category_id ASC, is_active ASC);
