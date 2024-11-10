# backend/odds_fetcher.py

import requests

def fetch_odds_from_api():
    api_key = 'YOUR_API_KEY'  # Replace with your actual API key
    url = 'https://api.the-odds-api.com/v4/sports/upcoming/odds'
    params = {
        'apiKey': api_key,
        'regions': 'us',
        'markets': 'h2h',
        'oddsFormat': 'decimal'
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        odds_data = response.json()
        return odds_data
    else:
        print(f"Failed to fetch odds: {response.status_code}")
        return None

def normalize_odds(odds_data):
    normalized_data = []
    for event in odds_data:
        event_name = f"{event['home_team']} vs. {event['away_team']}"
        event_id = event.get('id')
        commence_time = event.get('commence_time')  # ISO 8601 format
        for bookmaker in event['bookmakers']:
            platform = bookmaker['title']
            bookmaker_key = bookmaker.get('key')
            for market in bookmaker['markets']:
                if market['key'] == 'h2h':
                    outcomes = market['outcomes']
                    for outcome in outcomes:
                        team_name = outcome['name']
                        url = outcome.get('url')
                        if not url:
                            url = construct_bet_url(platform, event_id, bookmaker_key, team_name)
                        normalized_data.append({
                            'event_name': event_name,
                            'event_id': event_id,
                            'commence_time': commence_time,
                            'platform': platform,
                            'team': team_name,
                            'odds': float(outcome['price']),
                            'url': url
                        })
    return normalized_data

def construct_bet_url(platform, event_id, bookmaker_key, team_name):
    platform = platform.lower()
    if platform == 'draftkings':
        return f"https://sportsbook.draftkings.com/event/{event_id}"
    elif platform == 'bet365':
        return f"https://www.bet365.com/#/AC/B1/C{event_id}/D{team_name}"
    elif platform == 'bovada':
        return f"https://www.bovada.lv/events/{event_id}/{team_name}"
    else:
        return 'URL not available'
