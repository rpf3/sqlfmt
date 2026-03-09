CREATE TABLE inventory (
id INT NOT NULL,
product_id INT NOT NULL,
warehouse_id INT NOT NULL,
quantity_on_hand INT NOT NULL DEFAULT 0,
quantity_reserved INT NOT NULL DEFAULT 0,
reorder_point INT NOT NULL DEFAULT 10,
reorder_quantity INT NOT NULL DEFAULT 100,
last_counted_at TIMESTAMP,
CONSTRAINT pk_inventory PRIMARY KEY (id),
CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES products (id),
CONSTRAINT fk_inventory_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouses (id),
CONSTRAINT uq_inventory UNIQUE (product_id, warehouse_id),
CONSTRAINT chk_inventory_qty CHECK (quantity_on_hand >= 0 AND quantity_reserved >= 0)
);
