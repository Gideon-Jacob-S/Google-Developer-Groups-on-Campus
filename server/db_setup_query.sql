-- SQLite
CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  college_id TEXT NOT NULL,
  user_type TEXT NOT NULL DEFAULT 'USER'
);
