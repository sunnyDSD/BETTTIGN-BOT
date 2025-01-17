from datetime import datetime, timezone, timedelta
from backend.odds_fetcher import fetch_odds_from_api
from backend.db_connection import connect_db

async def get_current_odds_for_event(event_name):
    odds_data = await fetch_odds_from_api()
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

async def delete_expired_opportunities():
    conn = await connect_db()
    cursor = await conn.cursor()

    # Get current time in UTC
    current_time = datetime.now(timezone.utc)

    # Select opportunities that have commenced
    await cursor.execute('''
        SELECT id, commence_time FROM arbitrage_opportunities WHERE is_active = 1
    ''')
    rows = await cursor.fetchall()

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
        await cursor.execute(f'''
            UPDATE arbitrage_opportunities SET is_active = 0 WHERE id IN ({','.join('?' for _ in expired_ids)})
        ''', expired_ids)
        print(f"Marked {len(expired_ids)} expired opportunities as inactive.")
    else:
        print("No expired opportunities to mark as inactive.")

    await conn.commit()
    await conn.close()

async def delete_invalid_opportunities():
    conn = await connect_db()
    cursor = await conn.cursor()

    # Get all active opportunities
    await cursor.execute('''
        SELECT id, event_name, platform_a, odds_a, platform_b, odds_b FROM arbitrage_opportunities WHERE is_active = 1
    ''')
    opportunities = await cursor.fetchall()

    invalid_ids = []
    for opp in opportunities:
        opp_id, event_name, platform_a, odds_a, platform_b, odds_b = opp

        # Fetch current odds for the event
        current_odds = await get_current_odds_for_event(event_name)
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
        await cursor.execute(f'''
            UPDATE arbitrage_opportunities SET is_active = 0 WHERE id IN ({','.join('?' for _ in invalid_ids)})
        ''', invalid_ids)
        print(f"Marked {len(invalid_ids)} invalid opportunities as inactive.")
    else:
        print("No invalid opportunities due to odds changes.")

    await conn.commit()
    await conn.close()

async def delete_old_opportunities():
    conn = await connect_db()
    cursor = await conn.cursor()

    # Set time threshold (e.g., 1 day ago)
    time_threshold = datetime.now(timezone.utc) - timedelta(days=1)

    # Delete opportunities older than threshold
    await cursor.execute('''
        DELETE FROM arbitrage_opportunities
        WHERE datetime(timestamp) <= datetime(?)
    ''', (time_threshold.isoformat(),))

    affected_rows = cursor.rowcount
    print(f"Deleted {affected_rows} old opportunities.")

    await conn.commit()
    await conn.close()

    async def insert_bet(event_name, platform, odds, stake, potential_profit, status, user_id):
        try:
            conn = await connect_db()
            cursor = await conn.cursor()
            await cursor.execute('''
                INSERT INTO bets (event_name, platform, odds, stake, potential_profit, status, user_id, timestamp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (event_name, platform, odds, stake, potential_profit, status, user_id, datetime.utcnow()))
            await conn.commit()
            await cursor.close()
            await conn.close()
        except Exception as e:
            print(f"Exception in insert_bet: {e}")

async def update_bet_status(bet_id, status):
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            UPDATE bets SET status = ? WHERE id = ?
        ''', (status, bet_id))
        await conn.commit()
        await cursor.close()
        await conn.close()
    except Exception as e:
        print(f"Exception in update_bet_status: {e}")

async def update_trade_taken(trade_id, trade_taken):
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            UPDATE arbitrage_opportunities SET trade_taken = ? WHERE id = ?
        ''', (trade_taken, trade_id))
        await conn.commit()
        await cursor.close()
        await conn.close()
    except Exception as e:
        print(f"Exception in update_trade_taken: {e}")