def find_arbitrage_opportunities(normalized_data):
    opportunities = []
    for event in normalized_data:
        # Ensure sport field is included in the opportunity
        sport = event.get('sport')
        if not sport:
            continue

        # Example logic to find arbitrage opportunities
        for platform_a, odds_a in event['odds'].items():
            for platform_b, odds_b in event['odds'].items():
                if platform_a != platform_b and odds_a > 0 and odds_b > 0:
                    stake_a = 100 / odds_a
                    stake_b = 100 / odds_b
                    potential_profit = (stake_a + stake_b) - 100
                    if potential_profit > 0:
                        opportunities.append({
                            'event_name': event['event_name'],
                            'team': event['team'],
                            'platform_a': platform_a,
                            'odds_a': odds_a,
                            'platform_b': platform_b,
                            'odds_b': odds_b,
                            'stake_a': stake_a,
                            'stake_b': stake_b,
                            'potential_profit': potential_profit,
                            'commence_time': event.get('commence_time'),
                            'sport': sport,  # Ensure sport field is included
                        })
    return opportunities