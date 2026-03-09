CREATE INDEX idx_users_email ON users (email ASC);
CREATE INDEX idx_users_created_at ON users (created_at DESC);
CREATE INDEX idx_users_is_active ON users (is_active ASC, created_at DESC);
CREATE UNIQUE INDEX uix_users_username ON users (username ASC);
