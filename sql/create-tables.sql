DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  sur_name VARCHAR (255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL
);

DROP TABLE IF EXISTS schedules CASCADE;
CREATE TABLE IF NOT EXISTS schedules (
    schedule_id SERIAL PRIMARY KEY, 
    user_id INTEGER NOT NULL, 
    day INTEGER NOT NULL CHECK (day >= 1 AND day <= 7),
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);

-- worth researching data type of bcrypt hashes
-- research FOREIGN KEYS