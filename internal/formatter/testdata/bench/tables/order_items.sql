CREATE TABLE order_items (
id INT NOT NULL,
order_id INT NOT NULL,
product_id INT NOT NULL,
variant_id INT,
quantity INT NOT NULL,
unit_price DECIMAL(12,2) NOT NULL,
discount_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
line_total DECIMAL(12,2) NOT NULL,
CONSTRAINT pk_order_items PRIMARY KEY (id),
CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders (id),
CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products (id),
CONSTRAINT fk_order_items_variant FOREIGN KEY (variant_id) REFERENCES product_variants (id),
CONSTRAINT chk_order_items_qty CHECK (quantity > 0),
CONSTRAINT chk_order_items_price CHECK (unit_price >= 0)
);
