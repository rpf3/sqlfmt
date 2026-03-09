CREATE TABLE products (
id INT NOT NULL,
sku VARCHAR(100) NOT NULL,
name VARCHAR(255) NOT NULL,
description TEXT,
category_id INT NOT NULL,
base_price DECIMAL(12,2) NOT NULL,
is_active BOOLEAN NOT NULL DEFAULT TRUE,
weight_kg DECIMAL(8,3),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT pk_products PRIMARY KEY (id),
CONSTRAINT uq_products_sku UNIQUE (sku),
CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id),
CONSTRAINT chk_products_price CHECK (base_price >= 0)
);
