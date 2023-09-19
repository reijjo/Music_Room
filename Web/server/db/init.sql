SET timezone = 'Europe/Helsinki';

CREATE TABLE IF NOT EXISTS users (
	id SERIAL NOT NULL PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	passwd VARCHAR(255) NOT NULL,
	age VARCHAR(255) NOT NULL,
	gender VARCHAR(255) NOT NULL,
	verifycode VARCHAR(255) NOT NULL,
	user_status INTEGER DEFAULT 0 NOT NULL
);