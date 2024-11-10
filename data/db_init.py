# db_init.py

import sqlite3

def initialize_database():
    conn = sqlite3.connect('data/odds_history.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS arbitrage_opportunities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_name TEXT NOT NULL,
            platform_a TEXT NOT NULL,
            odds_a REAL NOT NULL,
            url_a TEXT,
            platform_b TEXT NOT NULL,
            odds_b REAL NOT NULL,
            url_b TEXT,
            suggested_stake_a REAL,
            suggested_stake_b REAL,
            arbitrage_value REAL,
            potential_profit REAL,
            commence_time TEXT,
            is_active INTEGER DEFAULT 1,
            trade_taken INTEGER DEFAULT 0,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ''')

    conn.commit()
    conn.close()
    print("Database initialized successfully.")

if __name__ == "__main__":
    initialize_database()
