CREATE INDEX idx_sessions_user_id ON sessions (user_id ASC, expires_at DESC);
CREATE INDEX idx_sessions_expires_at ON sessions (expires_at ASC);
CREATE UNIQUE INDEX uix_sessions_token ON sessions (token ASC);
CREATE INDEX idx_sessions_last_seen ON sessions (last_seen_at DESC);
