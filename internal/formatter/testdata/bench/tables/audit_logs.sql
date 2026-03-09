CREATE TABLE audit_logs (
id INT NOT NULL,
table_name VARCHAR(100) NOT NULL,
record_id INT NOT NULL,
operation VARCHAR(10) NOT NULL,
old_values TEXT,
new_values TEXT,
changed_by INT,
changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT pk_audit_logs PRIMARY KEY (id),
CONSTRAINT fk_audit_logs_user FOREIGN KEY (changed_by) REFERENCES users (id),
CONSTRAINT chk_audit_logs_operation CHECK (operation IN ('INSERT','UPDATE','DELETE'))
);
