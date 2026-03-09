CREATE TABLE product_attributes (
id INT NOT NULL,
product_id INT NOT NULL,
attribute_name VARCHAR(100) NOT NULL,
attribute_value TEXT NOT NULL,
CONSTRAINT pk_product_attributes PRIMARY KEY (id),
CONSTRAINT fk_product_attributes_product FOREIGN KEY (product_id) REFERENCES products (id),
CONSTRAINT uq_product_attributes UNIQUE (product_id, attribute_name)
);
