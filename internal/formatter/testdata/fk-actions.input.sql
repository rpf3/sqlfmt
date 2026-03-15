CREATE TABLE orders (
    customer_id INT NOT NULL REFERENCES customers (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    product_id INT REFERENCES products (id) ON DELETE SET NULL,
    category_id INT REFERENCES categories (id) ON DELETE SET DEFAULT ON UPDATE RESTRICT
);

CREATE TABLE order_lines (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT fk_order_lines_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT fk_order_lines_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE SET NULL ON UPDATE NO ACTION
);

CREATE TABLE simple (
    parent_id INT REFERENCES parents (id)
);
