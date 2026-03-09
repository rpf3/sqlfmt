CREATE TABLE warehouses (
id INT NOT NULL,
name VARCHAR(100) NOT NULL,
code VARCHAR(10) NOT NULL,
address_line1 VARCHAR(255) NOT NULL,
address_line2 VARCHAR(255),
city VARCHAR(100) NOT NULL,
state VARCHAR(50),
postal_code VARCHAR(20),
country_code VARCHAR(2) NOT NULL DEFAULT 'US',
is_active BOOLEAN NOT NULL DEFAULT TRUE,
CONSTRAINT pk_warehouses PRIMARY KEY (id),
CONSTRAINT uq_warehouses_code UNIQUE (code)
);
