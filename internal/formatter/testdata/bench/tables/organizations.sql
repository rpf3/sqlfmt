CREATE TABLE organizations (
id INT NOT NULL,
name VARCHAR(255) NOT NULL,
slug VARCHAR(100) NOT NULL,
owner_id INT NOT NULL,
plan VARCHAR(50) NOT NULL DEFAULT 'free',
seats_allowed INT NOT NULL DEFAULT 5,
is_active BOOLEAN NOT NULL DEFAULT TRUE,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT pk_organizations PRIMARY KEY (id),
CONSTRAINT uq_organizations_slug UNIQUE (slug),
CONSTRAINT fk_organizations_owner FOREIGN KEY (owner_id) REFERENCES users (id),
CONSTRAINT chk_organizations_plan CHECK (plan IN ('free','starter','pro','enterprise'))
);
