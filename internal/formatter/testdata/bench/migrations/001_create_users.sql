CREATE TABLE users (id INT NOT NULL, email VARCHAR(255) NOT NULL, username VARCHAR(100) NOT NULL, password_hash TEXT NOT NULL, is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT pk_users PRIMARY KEY (id), CONSTRAINT uq_users_email UNIQUE (email));
CREATE INDEX idx_users_email ON users (email ASC);
CREATE INDEX idx_users_created_at ON users (created_at DESC);
INSERT INTO users (id, email, username, password_hash, is_active) VALUES (1, 'admin@example.com', 'admin', 'placeholder_hash', TRUE);
