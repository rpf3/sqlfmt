CREATE TABLE product_variants (
id INT NOT NULL,
product_id INT NOT NULL,
name VARCHAR(100) NOT NULL,
sku_suffix VARCHAR(50) NOT NULL,
price_delta DECIMAL(12,2) NOT NULL DEFAULT 0.00,
is_active BOOLEAN NOT NULL DEFAULT TRUE,
CONSTRAINT pk_product_variants PRIMARY KEY (id),
CONSTRAINT fk_product_variants_product FOREIGN KEY (product_id) REFERENCES products (id),
CONSTRAINT uq_product_variants_sku UNIQUE (product_id, sku_suffix)
);
