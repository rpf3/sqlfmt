CREATE TABLE permissions (
id INT NOT NULL,
name VARCHAR(100) NOT NULL,
resource VARCHAR(100) NOT NULL,
action VARCHAR(50) NOT NULL,
description TEXT,
CONSTRAINT pk_permissions PRIMARY KEY (id),
CONSTRAINT uq_permissions_name UNIQUE (name),
CONSTRAINT uq_permissions_resource_action UNIQUE (resource, action)
);
