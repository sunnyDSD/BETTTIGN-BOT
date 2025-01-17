from datetime import datetime
from backend.db_connection import connect_db
from flask import Flask, jsonify

app = Flask(__name__)

async def get_all_active_arbitrage_opportunities():
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            SELECT id, event_name, platform_a, odds_a, url_a, platform_b, odds_b, url_b,
                   stake_a, stake_b, arbitrage_value, potential_profit, commence_time,
                   timestamp, trade_taken
            FROM arbitrage_opportunities
            WHERE is_active = 1 AND trade_taken = 0
        ''')
        opportunities = await cursor.fetchall()
        await cursor.close()
        await conn.close()
        return opportunities
    except Exception as e:
        print(f"Exception in get_all_active_arbitrage_opportunities: {e}")
        return []

async def insert_bet(event_name, platform_a, odds_a, platform_b, odds_b, stake_a, stake_b, potential_profit, commence_time):
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            INSERT INTO bets (event_name, platform_a, odds_a, platform_b, odds_b, stake_a, stake_b, potential_profit, commence_time, status, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
        ''', (event_name, platform_a, odds_a, platform_b, odds_b, stake_a, stake_b, potential_profit, commence_time, datetime.utcnow()))
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
            UPDATE bets
            SET status = ?
            WHERE id = ?
        ''', (status, bet_id))
        await conn.commit()
        await cursor.close()
        await conn.close()
    except Exception as e:
        print(f"Exception in update_bet_status: {e}")

async def update_trade_taken(opp_id, taken_value):
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            UPDATE arbitrage_opportunities
            SET trade_taken = ?
            WHERE id = ?
        ''', (taken_value, opp_id))
        await conn.commit()
        await cursor.close()
        await conn.close()
    except Exception as e:
        print(f"Exception in update_trade_taken: {e}")

async def update_user_email(email):
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        # Assuming only one user setting row
        await cursor.execute('DELETE FROM user_settings')
        await cursor.execute('INSERT INTO user_settings (email) VALUES (?)', (email,))
        await conn.commit()
        await cursor.close()
        await conn.close()
    except Exception as e:
        print(f"Exception in update_user_email: {e}")

async def get_user_email():
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('SELECT email FROM user_settings LIMIT 1')
        row = await cursor.fetchone()
        await cursor.close()
        await conn.close()
        return row[0] if row else None
    except Exception as e:
        print(f"Exception in get_user_email: {e}")
        return None

async def get_active_bets():
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            SELECT id, event_name, platform_a, odds_a, platform_b, odds_b, stake_a, stake_b, potential_profit, commence_time
            FROM bets
            WHERE status = 'pending'
        ''')
        bets = await cursor.fetchall()
        await cursor.close()
        await conn.close()
        bets_list = [
            {
                'id': bet[0],
                'event_name': bet[1],
                'platform_a': bet[2],
                'odds_a': bet[3],
                'platform_b': bet[4],
                'odds_b': bet[5],
                'stake_a': bet[6],
                'stake_b': bet[7],
                'potential_profit': bet[8],
                'commence_time': bet[9],
            }
            for bet in bets
        ]
        return bets_list
    except Exception as e:
        print(f"Exception in get_active_bets: {e}")
        return []

async def get_historical_odds(opp_id):
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            SELECT timestamp, odds_a, odds_b
            FROM historical_odds
            WHERE opportunity_id = ?
            ORDER BY timestamp ASC
        ''', (opp_id,))
        rows = await cursor.fetchall()
        await cursor.close()
        await conn.close()
        historical_odds = [
            {'timestamp': row[0], 'odds_a': row[1], 'odds_b': row[2]}
            for row in rows
        ]
        return historical_odds
    except Exception as e:
        print(f"Exception in get_historical_odds: {e}")
        return []
    
async def get_profit_data():
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            SELECT date, profit
            FROM profit_history
            ORDER BY date ASC
        ''')
        rows = await cursor.fetchall()
        await cursor.close()
        await conn.close()
        profit_data = [
            {'date': row[0], 'profit': row[1]}
            for row in rows
        ]
        return profit_data
    except Exception as e:
        print(f"Exception in get_profit_data: {e}")
        return []
    
async def get_ev_distribution():
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            SELECT range, wins, losses
            FROM ev_distribution
            ORDER BY range ASC
        ''')
        rows = await cursor.fetchall()
        await cursor.close()
        await conn.close()
        ev_distribution = [
            {'range': row[0], 'wins': row[1], 'losses': row[2]}
            for row in rows
        ]
        return ev_distribution
    except Exception as e:
        print(f"Exception in get_ev_distribution: {e}")
        return []

@app.route('/api/profitability_data', methods=['GET'])
async def api_get_profitability_data():
    profitability_data = await get_profit_data()
    return jsonify(profitability_data)

async def get_sports_data():
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            SELECT sport, profit
            FROM sports_profit
            ORDER BY sport ASC
        ''')
        rows = await cursor.fetchall()
        await cursor.close()
        await conn.close()
        sports_data = [
            {'name': row[0], 'value': row[1]}
            for row in rows
        ]
        return sports_data
    except Exception as e:
        print(f"Exception in get_sports_data: {e}")
        return []
    
async def get_metrics_data():
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            SELECT title, value, change, trend, icon, color
            FROM metrics
            ORDER BY title ASC
        ''')
        rows = await cursor.fetchall()
        await cursor.close()
        await conn.close()
        metrics_data = [
            {
                'title': row[0],
                'value': row[1],
                'change': row[2],
                'trend': row[3],
                'icon': row[4],
                'color': row[5]
            }
            for row in rows
        ]
        return metrics_data
    except Exception as e:
        print(f"Exception in get_metrics_data: {e}")
        return []
    
async def get_recent_activity():
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            SELECT id, timestamp, sport, league, stake, odds, status, profit_loss, ev
            FROM recent_activity
            ORDER BY timestamp DESC
            LIMIT 10
        ''')
        rows = await cursor.fetchall()
        await cursor.close()
        await conn.close()
        recent_activity = [
            {
                'id': row[0],
                'timestamp': row[1],
                'sport': row[2],
                'league': row[3],
                'stake': row[4],
                'odds': row[5],
                'status': row[6],
                'profitLoss': row[7],
                'ev': row[8]
            }
            for row in rows
        ]
        return recent_activity
    except Exception as e:
        print(f"Exception in get_recent_activity: {e}")
        return []
    
async def insert_arbitrage_opportunity(event_name, platform_a, odds_a, url_a, platform_b, odds_b, url_b, stake_a, stake_b, arbitrage_value, potential_profit, commence_time, sport):
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            INSERT INTO arbitrage_opportunities (event_name, platform_a, odds_a, url_a, platform_b, odds_b, url_b, stake_a, stake_b, arbitrage_value, potential_profit, commence_time, sport, is_active, trade_taken, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0, ?)
        ''', (event_name, platform_a, odds_a, url_a, platform_b, odds_b, url_b, stake_a, stake_b, arbitrage_value, potential_profit, commence_time, sport, datetime.utcnow()))
        await conn.commit()
        await cursor.close()
        await conn.close()
    except Exception as e:
        print(f"Exception in insert_arbitrage_opportunity: {e}")

from datetime import datetime, timedelta

async def get_notifications():
    # Mock data for notifications
    now = datetime.utcnow()
    notifications = [
        {
            'id': '1',
            'title': 'High Value Opportunity',
            'message': 'Lakers vs Warriors - Potential 5.2% profit available',
            'timestamp': (now - timedelta(minutes=2)).isoformat(),
            'priority': 'high',
            'category': 'opportunity',
            'status': 'unread',
            'metadata': {
                'opportunityId': 1,
                'bookmaker': 'DraftKings',
                'odds': 2.10,
                'profit': 5.2,
                'timeRemaining': 45,
            },
        },
        {
            'id': '2',
            'title': 'Trade Alert',
            'message': 'Chiefs vs Raiders arbitrage opportunity detected',
            'timestamp': (now - timedelta(minutes=15)).isoformat(),
            'priority': 'medium',
            'category': 'trade',
            'status': 'unread',
            'metadata': {
                'opportunityId': 2,
                'bookmaker': 'BetMGM',
                'odds': 1.95,
                'profit': 3.8,
                'timeRemaining': 30,
            },
        },
    ]
    return notifications

async def get_trade_stats():
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            SELECT trade_id, profit, timestamp
            FROM trade_stats
        ''')
        trade_stats = await cursor.fetchall()
        await cursor.close()
        await conn.close()
        return trade_stats
    except Exception as e:
        print(f"Exception in get_trade_stats: {e}")
        return []

async def insert_arbitrage_opportunity(opportunity):
    try:
        conn = await connect_db()
        cursor = await conn.cursor()
        await cursor.execute('''
            INSERT INTO arbitrage_opportunities (event_name, team, platform_a, odds_a, url_a, platform_b, odds_b, url_b, stake_a, stake_b, arbitrage_value, potential_profit, commence_time, sport, is_active, trade_taken, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0, ?)
        ''', (
            opportunity['event_name'],
            opportunity['team'],
            opportunity['platform_a'],
            opportunity['odds_a'],
            opportunity['url_a'],
            opportunity['platform_b'],
            opportunity['odds_b'],
            opportunity['url_b'],
            opportunity['stake_a'],
            opportunity['stake_b'],
            opportunity['arbitrage_value'],
            opportunity['potential_profit'],
            opportunity['commence_time'],
            opportunity['sport'],  # Ensure sport field is included
            datetime.utcnow()
        ))
        await conn.commit()
        await cursor.close()
        await conn.close()
    except Exception as e:
        print(f"Exception in insert_arbitrage_opportunity: {e}")