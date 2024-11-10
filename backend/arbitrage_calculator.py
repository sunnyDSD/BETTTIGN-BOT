# backend/arbitrage_calculator.py

def find_arbitrage_opportunities(normalized_data):
    opportunities = []
    events = {}
    for data in normalized_data:
        key = (data['event_name'], data['team'])
        if key not in events:
            events[key] = []
        events[key].append(data)

    for key, odds_list in events.items():
        if len(odds_list) < 2:
            continue
        for i in range(len(odds_list)):
            for j in range(i + 1, len(odds_list)):
                odds_a = odds_list[i]['odds']
                odds_b = odds_list[j]['odds']
                arbitrage_value = (1 / odds_a) + (1 / odds_b)
                if arbitrage_value < 1:
                    total_stake = 100
                    stake_a = (total_stake * (1 / odds_a)) / arbitrage_value
                    stake_b = (total_stake * (1 / odds_b)) / arbitrage_value
                    potential_profit = (total_stake / arbitrage_value) - total_stake
                    opportunity = {
                        'event_name': key[0],
                        'team': key[1],
                        'platform_a': odds_list[i]['platform'],
                        'odds_a': odds_a,
                        'url_a': odds_list[i]['url'],
                        'platform_b': odds_list[j]['platform'],
                        'odds_b': odds_b,
                        'url_b': odds_list[j]['url'],
                        'stake_a': stake_a,
                        'stake_b': stake_b,
                        'potential_profit': potential_profit,
                        'commence_time': odds_list[i]['commence_time']
                    }
                    opportunities.append(opportunity)
    return opportunities
