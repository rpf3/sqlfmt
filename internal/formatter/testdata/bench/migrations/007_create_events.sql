CREATE TABLE events (id INT NOT NULL, event_type VARCHAR(100) NOT NULL, actor_id INT, target_type VARCHAR(100), target_id INT, payload TEXT, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT pk_events PRIMARY KEY (id), CONSTRAINT fk_events_actor FOREIGN KEY (actor_id) REFERENCES users (id));
CREATE TABLE audit_logs (id INT NOT NULL, table_name VARCHAR(100) NOT NULL, record_id INT NOT NULL, operation VARCHAR(10) NOT NULL, old_values TEXT, new_values TEXT, changed_by INT, changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT pk_audit_logs PRIMARY KEY (id), CONSTRAINT fk_audit_logs_user FOREIGN KEY (changed_by) REFERENCES users (id));
CREATE INDEX idx_events_type_date ON events (event_type ASC, created_at DESC);
CREATE INDEX idx_events_actor ON events (actor_id ASC, created_at DESC);
CREATE INDEX idx_audit_table_record ON audit_logs (table_name ASC, record_id ASC, changed_at DESC);
