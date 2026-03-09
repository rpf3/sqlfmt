CREATE TABLE api_keys (
id INT NOT NULL,
user_id INT NOT NULL,
name VARCHAR(100) NOT NULL,
key_hash VARCHAR(255) NOT NULL,
key_prefix VARCHAR(10) NOT NULL,
scopes TEXT,
last_used_at TIMESTAMP,
expires_at TIMESTAMP,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
CONSTRAINT pk_api_keys PRIMARY KEY (id),
CONSTRAINT uq_api_keys_hash UNIQUE (key_hash),
CONSTRAINT fk_api_keys_user FOREIGN KEY (user_id) REFERENCES users (id)
);
