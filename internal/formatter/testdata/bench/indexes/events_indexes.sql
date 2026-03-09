CREATE INDEX idx_events_type ON events (event_type ASC, created_at DESC);
CREATE INDEX idx_events_actor ON events (actor_id ASC, created_at DESC);
CREATE INDEX idx_events_target ON events (target_type ASC, target_id ASC);
CREATE INDEX idx_events_created_at ON events (created_at DESC);
CREATE UNIQUE INDEX uix_events_id_type ON events (id ASC, event_type ASC);
