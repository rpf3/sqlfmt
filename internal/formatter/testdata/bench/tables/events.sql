CREATE TABLE events (
id INT NOT NULL,
event_type VARCHAR(100) NOT NULL,
actor_id INT,
target_type VARCHAR(100),
target_id INT,
payload TEXT,
ip_address VARCHAR(45),
user_agent TEXT,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT pk_events PRIMARY KEY (id),
CONSTRAINT fk_events_actor FOREIGN KEY (actor_id) REFERENCES users (id)
);
