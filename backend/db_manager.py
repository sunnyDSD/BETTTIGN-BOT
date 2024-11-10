# backend/db_manager.py

import sqlite3
from datetime import datetime

def connect_db():
    return sqlite3.connect('data/odds_history.db')

def insert_arbitrage_opportunity(event_name, platform_a, odds_a, url_a, platform_b, odds_b, url_b,
                                 suggested_stake_a, suggested_stake_b, arbitrage_value, potential_profit,
                                 commence_time, trade_taken=0):
    if commence_time is None:
        raise ValueError("Commence time cannot be None.")

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO arbitrage_opportunities (
            event_name, platform_a, odds_a, url_a, platform_b, odds_b, url_b,
            suggested_stake_a, suggested_stake_b, arbitrage_value, potential_profit,
            commence_time, is_active, trade_taken, timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
    ''', (event_name, platform_a, odds_a, url_a, platform_b, odds_b, url_b,
          suggested_stake_a, suggested_stake_b, arbitrage_value, potential_profit,
          commence_time, trade_taken, datetime.utcnow()))
    conn.commit()
    conn.close()

def get_all_active_arbitrage_opportunities():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT id, event_name, platform_a, odds_a, url_a, platform_b, odds_b, url_b,
               suggested_stake_a, suggested_stake_b, arbitrage_value, potential_profit,
               commence_time, timestamp, trade_taken
        FROM arbitrage_opportunities
        WHERE is_active = 1 AND trade_taken = 0
    ''')
    results = cursor.fetchall()
    conn.close()
    return results

def update_trade_taken(opp_id, trade_taken):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE arbitrage_opportunities
        SET trade_taken = ?
        WHERE id = ?
    ''', (trade_taken, opp_id))
    conn.commit()
    conn.close()
