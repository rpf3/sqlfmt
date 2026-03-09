CREATE TABLE accounts (
id INT NOT NULL,
user_id INT NOT NULL,
account_type VARCHAR(50) NOT NULL,
balance DECIMAL(18,2) NOT NULL DEFAULT 0.00,
currency VARCHAR(3) NOT NULL DEFAULT 'USD',
is_locked BOOLEAN NOT NULL DEFAULT FALSE,
opened_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
closed_at TIMESTAMP,
CONSTRAINT pk_accounts PRIMARY KEY (id),
CONSTRAINT fk_accounts_user FOREIGN KEY (user_id) REFERENCES users (id),
CONSTRAINT chk_accounts_balance CHECK (balance >= 0),
CONSTRAINT chk_accounts_type CHECK (account_type IN ('checking','savings','credit'))
);
