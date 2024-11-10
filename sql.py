# db_schema_update.py

import sqlite3

def update_database_schema():
    db_path = 'data/odds_history.db'  # Adjust the path if necessary
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Check existing columns in 'arbitrage_opportunities' table
    cursor.execute("PRAGMA table_info(arbitrage_opportunities)")
    columns = [info[1] for info in cursor.fetchall()]

    # Add 'url_a' column if it doesn't exist
    if 'url_a' not in columns:
        cursor.execute('ALTER TABLE arbitrage_opportunities ADD COLUMN url_a TEXT;')
        print("Column 'url_a' added to 'arbitrage_opportunities' table.")
    else:
        print("Column 'url_a' already exists in 'arbitrage_opportunities' table.")

    # Add 'url_b' column if it doesn't exist
    if 'url_b' not in columns:
        cursor.execute('ALTER TABLE arbitrage_opportunities ADD COLUMN url_b TEXT;')
        print("Column 'url_b' added to 'arbitrage_opportunities' table.")
    else:
        print("Column 'url_b' already exists in 'arbitrage_opportunities' table.")

    # Add 'commence_time' column if it doesn't exist
    if 'commence_time' not in columns:
        cursor.execute('ALTER TABLE arbitrage_opportunities ADD COLUMN commence_time TEXT;')
        print("Column 'commence_time' added to 'arbitrage_opportunities' table.")
    else:
        print("Column 'commence_time' already exists in 'arbitrage_opportunities' table.")

    # Add 'is_active' column if it doesn't exist
    if 'is_active' not in columns:
        cursor.execute('ALTER TABLE arbitrage_opportunities ADD COLUMN is_active INTEGER DEFAULT 1;')
        print("Column 'is_active' added to 'arbitrage_opportunities' table.")
    else:
        print("Column 'is_active' already exists in 'arbitrage_opportunities' table.")

    # Add 'trade_taken' column if it doesn't exist
    if 'trade_taken' not in columns:
        cursor.execute('ALTER TABLE arbitrage_opportunities ADD COLUMN trade_taken INTEGER DEFAULT 0;')
        print("Column 'trade_taken' added to 'arbitrage_opportunities' table.")
    else:
        print("Column 'trade_taken' already exists in 'arbitrage_opportunities' table.")

    conn.commit()
    conn.close()
    print("Database schema updated successfully.")

if __name__ == "__main__":
    update_database_schema()
