CREATE INDEX idx_audit_logs_table ON audit_logs (table_name ASC, record_id ASC, changed_at DESC);
CREATE INDEX idx_audit_logs_user ON audit_logs (changed_by ASC, changed_at DESC);
CREATE INDEX idx_audit_logs_operation ON audit_logs (operation ASC, changed_at DESC);
CREATE INDEX idx_audit_logs_changed_at ON audit_logs (changed_at DESC);
