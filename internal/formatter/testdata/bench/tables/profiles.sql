CREATE TABLE profiles (
id INT NOT NULL,
user_id INT NOT NULL,
bio TEXT,
avatar_url VARCHAR(500),
website VARCHAR(500),
location VARCHAR(200),
birth_date DATE,
gender VARCHAR(20),
CONSTRAINT pk_profiles PRIMARY KEY (id),
CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES users (id),
CONSTRAINT uq_profiles_user UNIQUE (user_id)
);
