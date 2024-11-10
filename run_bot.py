# run_bot.py

from apscheduler.schedulers.blocking import BlockingScheduler
from backend.odds_fetcher import fetch_odds_from_api, normalize_odds
from backend.arbitrage_calculator import find_arbitrage_opportunities
from backend.db_manager import insert_arbitrage_opportunity
from backend.data_manager import delete_expired_opportunities, delete_invalid_opportunities, delete_old_opportunities

def main():
    odds_data = fetch_odds_from_api()
    if odds_data:
        normalized_data = normalize_odds(odds_data)
        opportunities = find_arbitrage_opportunities(normalized_data)
        for opp in opportunities:
            print(f"Arbitrage Opportunity Found: {opp['event_name']} - {opp['team']}")
            print(f"Platforms: {opp['platform_a']} (Odds: {opp['odds_a']}) vs {opp['platform_b']} (Odds: {opp['odds_b']})")
            print(f"Stakes: {opp['stake_a']:.2f} on {opp['platform_a']}, {opp['stake_b']:.2f} on {opp['platform_b']}")
            print(f"Potential Profit: ${opp['potential_profit']:.2f}\n")

            # Insert into the database
            if opp['commence_time'] is not None:
                insert_arbitrage_opportunity(
                    event_name=opp['event_name'],
                    platform_a=opp['platform_a'],
                    odds_a=opp['odds_a'],
                    url_a=opp['url_a'],
                    platform_b=opp['platform_b'],
                    odds_b=opp['odds_b'],
                    url_b=opp['url_b'],
                    suggested_stake_a=opp['stake_a'],
                    suggested_stake_b=opp['stake_b'],
                    arbitrage_value=(1 / opp['odds_a']) + (1 / opp['odds_b']),
                    potential_profit=opp['potential_profit'],
                    commence_time=opp['commence_time']
                )
            else:
                print(f"Warning: Commence time is missing for event {opp['event_name']}. Skipping insertion.")
    else:
        print("No odds data available.")

if __name__ == "__main__":
    scheduler = BlockingScheduler()
    scheduler.add_job(main, 'interval', minutes=5)
    scheduler.add_job(delete_expired_opportunities, 'interval', minutes=1)
    scheduler.add_job(delete_invalid_opportunities, 'interval', minutes=5)
    scheduler.add_job(delete_old_opportunities, 'interval', minutes=5)
    print("Starting scheduler...")
    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass
