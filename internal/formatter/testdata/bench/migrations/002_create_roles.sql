CREATE TABLE roles (id INT NOT NULL, name VARCHAR(100) NOT NULL, description TEXT, is_system BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT pk_roles PRIMARY KEY (id), CONSTRAINT uq_roles_name UNIQUE (name));
CREATE TABLE user_roles (user_id INT NOT NULL, role_id INT NOT NULL, granted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT pk_user_roles PRIMARY KEY (user_id, role_id), CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users (id), CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles (id));
INSERT INTO roles (id, name, description, is_system) VALUES (1, 'admin', 'System administrator', TRUE);
INSERT INTO roles (id, name, description, is_system) VALUES (2, 'user', 'Standard user', TRUE);
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
