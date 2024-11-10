# backend/data_manager.py

import sqlite3
from datetime import datetime, timezone, timedelta
from backend.odds_fetcher import fetch_odds_from_api
from backend.db_manager import connect_db

def delete_expired_opportunities():
    conn = connect_db()
    cursor = conn.cursor()

    # Get current time in UTC
    current_time = datetime.now(timezone.utc)

    # Select opportunities that have commenced
    cursor.execute('''
        SELECT id, commence_time FROM arbitrage_opportunities WHERE is_active = 1
    ''')
    rows = cursor.fetchall()

    expired_ids = []
    for row in rows:
        opp_id = row[0]
        commence_time_str = row[1]

        if commence_time_str:
            try:
                commence_time = datetime.fromisoformat(commence_time_str.replace('Z', '+00:00'))
                if commence_time <= current_time:
                    expired_ids.append(opp_id)
            except ValueError as e:
                print(f"Error parsing commence_time for opportunity ID {opp_id}: {e}")
                expired_ids.append(opp_id)
        else:
            print(f"Commence time is None for opportunity ID {opp_id}. Marking as expired.")
            expired_ids.append(opp_id)

    # Mark expired opportunities as inactive
    if expired_ids:
        cursor.execute(f'''
            UPDATE arbitrage_opportunities SET is_active = 0 WHERE id IN ({','.join('?' for _ in expired_ids)})
        ''', expired_ids)
        print(f"Marked {len(expired_ids)} expired opportunities as inactive.")
    else:
        print("No expired opportunities to mark as inactive.")

    conn.commit()
    conn.close()

def delete_invalid_opportunities():
    conn = connect_db()
    cursor = conn.cursor()

    # Get all active opportunities
    cursor.execute('''
        SELECT id, event_name, platform_a, odds_a, platform_b, odds_b FROM arbitrage_opportunities WHERE is_active = 1
    ''')
    opportunities = cursor.fetchall()

    invalid_ids = []
    for opp in opportunities:
        opp_id, event_name, platform_a, odds_a, platform_b, odds_b = opp

        # Fetch current odds for the event
        current_odds = get_current_odds_for_event(event_name)
        if not current_odds:
            continue  # Event might have ended or no longer available

        # Get the latest odds for the platforms
        new_odds_a = current_odds.get(platform_a)
        new_odds_b = current_odds.get(platform_b)

        if not new_odds_a or not new_odds_b:
            # One of the platforms no longer offers odds for this event
            invalid_ids.append(opp_id)
            continue

        # Recalculate arbitrage value
        arbitrage_value = (1 / new_odds_a) + (1 / new_odds_b)
        if arbitrage_value >= 1:
            # No longer an arbitrage opportunity
            invalid_ids.append(opp_id)

    # Mark invalid opportunities as inactive
    if invalid_ids:
        cursor.execute(f'''
            UPDATE arbitrage_opportunities SET is_active = 0 WHERE id IN ({','.join('?' for _ in invalid_ids)})
        ''', invalid_ids)
        print(f"Marked {len(invalid_ids)} invalid opportunities as inactive.")
    else:
        print("No invalid opportunities due to odds changes.")

    conn.commit()
    conn.close()

def delete_old_opportunities():
    conn = connect_db()
    cursor = conn.cursor()

    # Set time threshold (e.g., 5 minutes ago)
    time_threshold = datetime.now(timezone.utc) - timedelta(minutes=5)

    # Mark opportunities older than threshold as inactive
    cursor.execute('''
        UPDATE arbitrage_opportunities
        SET is_active = 0
        WHERE is_active = 1 AND datetime(timestamp) <= datetime(?)
    ''', (time_threshold.isoformat(),))

    affected_rows = cursor.rowcount
    print(f"Marked {affected_rows} old opportunities as inactive.")

    conn.commit()
    conn.close()

def get_current_odds_for_event(event_name):
    odds_data = fetch_odds_from_api()
    if not odds_data:
        return None

    for event in odds_data:
        current_event_name = f"{event['home_team']} vs. {event['away_team']}"
        if current_event_name == event_name:
            odds = {}
            for bookmaker in event['bookmakers']:
                platform = bookmaker['title']
                for market in bookmaker['markets']:
                    if market['key'] == 'h2h':
                        for outcome in market['outcomes']:
                            odds[platform] = float(outcome['price'])
            return odds
    return None

def delete_opportunities_with_null_commence_time():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute('''
        DELETE FROM arbitrage_opportunities WHERE commence_time IS NULL
    ''')
    deleted_count = cursor.rowcount
    print(f"Deleted {deleted_count} opportunities with NULL commence_time.")

    conn.commit()
    conn.close()
