CREATE TABLE order_status_history (
id INT NOT NULL,
order_id INT NOT NULL,
old_status VARCHAR(50),
new_status VARCHAR(50) NOT NULL,
changed_by INT,
changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
reason TEXT,
CONSTRAINT pk_order_status_history PRIMARY KEY (id),
CONSTRAINT fk_osh_order FOREIGN KEY (order_id) REFERENCES orders (id),
CONSTRAINT fk_osh_user FOREIGN KEY (changed_by) REFERENCES users (id)
);
