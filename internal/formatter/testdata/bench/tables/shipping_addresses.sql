CREATE TABLE shipping_addresses (
id INT NOT NULL,
user_id INT NOT NULL,
label VARCHAR(100),
recipient_name VARCHAR(200) NOT NULL,
address_line1 VARCHAR(255) NOT NULL,
address_line2 VARCHAR(255),
city VARCHAR(100) NOT NULL,
state VARCHAR(50),
postal_code VARCHAR(20) NOT NULL,
country_code VARCHAR(2) NOT NULL DEFAULT 'US',
is_default BOOLEAN NOT NULL DEFAULT FALSE,
CONSTRAINT pk_shipping_addresses PRIMARY KEY (id),
CONSTRAINT fk_shipping_addresses_user FOREIGN KEY (user_id) REFERENCES users (id)
);
