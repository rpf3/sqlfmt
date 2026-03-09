CREATE TABLE orders (
id INT NOT NULL,
user_id INT NOT NULL,
status VARCHAR(50) NOT NULL DEFAULT 'pending',
subtotal DECIMAL(12,2) NOT NULL DEFAULT 0.00,
tax_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
shipping_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
total_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
shipping_address_id INT,
placed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
fulfilled_at TIMESTAMP,
cancelled_at TIMESTAMP,
notes TEXT,
CONSTRAINT pk_orders PRIMARY KEY (id),
CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users (id),
CONSTRAINT fk_orders_address FOREIGN KEY (shipping_address_id) REFERENCES shipping_addresses (id),
CONSTRAINT chk_orders_status CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled'))
);
