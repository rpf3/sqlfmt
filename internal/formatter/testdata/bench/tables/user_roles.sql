CREATE TABLE user_roles (
user_id INT NOT NULL,
role_id INT NOT NULL,
granted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
granted_by INT,
CONSTRAINT pk_user_roles PRIMARY KEY (user_id, role_id),
CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users (id),
CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles (id),
CONSTRAINT fk_user_roles_granter FOREIGN KEY (granted_by) REFERENCES users (id)
);
