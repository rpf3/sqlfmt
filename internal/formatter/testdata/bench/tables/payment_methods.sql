CREATE TABLE payment_methods (
id INT NOT NULL,
user_id INT NOT NULL,
method_type VARCHAR(50) NOT NULL,
provider VARCHAR(100) NOT NULL,
token VARCHAR(500) NOT NULL,
last_four VARCHAR(4),
expiry_month INT,
expiry_year INT,
is_default BOOLEAN NOT NULL DEFAULT FALSE,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT pk_payment_methods PRIMARY KEY (id),
CONSTRAINT fk_payment_methods_user FOREIGN KEY (user_id) REFERENCES users (id),
CONSTRAINT chk_payment_methods_type CHECK (method_type IN ('card','bank','wallet'))
);
