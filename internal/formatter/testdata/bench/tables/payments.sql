CREATE TABLE payments (
id INT NOT NULL,
order_id INT NOT NULL,
method_id INT NOT NULL,
amount DECIMAL(12,2) NOT NULL,
currency VARCHAR(3) NOT NULL DEFAULT 'USD',
status VARCHAR(50) NOT NULL DEFAULT 'pending',
gateway_reference VARCHAR(255),
processed_at TIMESTAMP,
failed_at TIMESTAMP,
failure_reason TEXT,
CONSTRAINT pk_payments PRIMARY KEY (id),
CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders (id),
CONSTRAINT fk_payments_method FOREIGN KEY (method_id) REFERENCES payment_methods (id),
CONSTRAINT chk_payments_amount CHECK (amount > 0),
CONSTRAINT chk_payments_status CHECK (status IN ('pending','authorized','captured','refunded','failed'))
);
