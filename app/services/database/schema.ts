export const CURRENT_VERSION = 2;

export const CREATE_TABLES_SQL = `
  CREATE TABLE IF NOT EXISTS bets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    number1 TEXT NOT NULL,
    amount1 TEXT,
    amount2 TEXT,
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
  );
`;

export const DROP_TABLES_SQL = `
  DROP TABLE IF EXISTS bets;
`;