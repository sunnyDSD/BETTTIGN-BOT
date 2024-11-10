# backend/arbitrage_detector.py

def calculate_arbitrage(event_name, platform_a, odds_a, platform_b, odds_b):
    arbitrage_value = (1 / odds_a) + (1 / odds_b)
    if arbitrage_value < 1:
        total_stake = 100  # Example total stake; can be customized
        stake_a = (total_stake * (1 / odds_a)) / arbitrage_value
        stake_b = (total_stake * (1 / odds_b)) / arbitrage_value
        potential_profit = (total_stake / arbitrage_value) - total_stake
        return stake_a, stake_b, potential_profit
    else:
        return None
