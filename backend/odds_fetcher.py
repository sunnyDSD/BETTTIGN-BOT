import aiohttp
import asyncio

async def fetch_odds_from_api():
    api_key = 'b91811d111db58e7c950648b222b2e65'  # Replace with your actual API key
    url = 'https://api.the-odds-api.com/v4/sports/upcoming/odds'  # Ensure this is the correct API endpoint
    params = {
        'apiKey': api_key,
        'regions': 'us',
        'markets': 'h2h',
        'oddsFormat': 'decimal'
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                if response.status == 200:
                    odds_data = await response.json()
                    print(f"Fetched {len(odds_data)} events from API.")
                    return odds_data
                else:
                    error_text = await response.text()
                    print(f"Failed to fetch odds: {response.status}, {error_text}")
                    return None
    except Exception as e:
        print(f"Exception in fetch_odds_from_api: {e}")
        return None

def normalize_odds(odds_data):
    normalized_data = []
    for event in odds_data:
        home_team = event.get('home_team')
        away_team = event.get('away_team')
        if not home_team or not away_team:
            # If we don't have a home_team or away_team, skip this event
            continue

        event_name = f"{home_team} vs. {away_team}"
        event_id = event.get('id')
        commence_time = event.get('commence_time')  # ISO 8601 format
        sport = event.get('sport')  # Ensure sport field is included

        # Iterate over each bookmaker
        for bookmaker in event.get('bookmakers', []):
            platform = bookmaker.get('title')
            bookmaker_key = bookmaker.get('key')
            # Iterate over each market
            for market in bookmaker.get('markets', []):
                if market.get('key') == 'h2h':
                    outcomes = market.get('outcomes', [])
                    for outcome in outcomes:
                        team_name = outcome.get('name')
                        price = outcome.get('price')
                        if team_name and price:
                            url = outcome.get('url')
                            if not url:
                                url = construct_bet_url(platform, event_id, bookmaker_key, team_name)
                            normalized_data.append({
                                'event_name': event_name,
                                'event_id': event_id,
                                'commence_time': commence_time,
                                'platform': platform,
                                'team': team_name,
                                'odds': float(price),
                                'url': url,
                                'sport': sport
                            })

    print(f"Normalized odds data: {len(normalized_data)} entries.")  # Debugging statement
    return normalized_data

def construct_bet_url(platform, event_id, bookmaker_key, team_name):
    platform = (platform or '').lower()
    if platform == 'draftkings':
        return f"https://sportsbook.draftkings.com/event/{event_id}"
    elif platform == 'bet365':
        return f"https://www.bet365.com/#/AC/B1/C{event_id}/D{team_name}"
    elif platform == 'bovada':
        return f"https://www.bovada.lv/events/{event_id}/{team_name}"
    elif platform == 'betonlineag':
        return f"https://www.betonline.ag/sportsbook/{event_id}"
    elif platform == 'betmgm':
        return f"https://sports.betmgm.com/en/sports/{event_id}"
    elif platform == 'betrivers':
        return f"https://betrivers.com/{event_id}"
    elif platform == 'betus':
        return f"https://www.betus.com.pa/sportsbook/{event_id}"
    elif platform == 'williamhill_us':
        return f"https://www.williamhill.com/us/{event_id}"
    elif platform == 'fanduel':
        return f"https://sportsbook.fanduel.com/sports/{event_id}"
    elif platform == 'lowvig':
        return f"https://www.lowvig.ag/sportsbook/{event_id}"
    elif platform == 'mybookieag':
        return f"https://www.mybookie.ag/sportsbook/{event_id}"
    elif platform == 'ballybet':
        return f"https://www.ballybet.com/{event_id}"
    elif platform == 'betanysports':
        return f"https://www.betanysports.eu/{event_id}"
    elif platform == 'betparx':
        return f"https://www.betparx.com/{event_id}"
    elif platform == 'espnbet':
        return f"https://www.espnbet.com/{event_id}"
    elif platform == 'fliff':
        return f"https://www.fliff.com/{event_id}"
    elif platform == 'hardrockbet':
        return f"https://www.hardrockbet.com/{event_id}"
    elif platform == 'windcreek':
        return f"https://www.windcreek.com/{event_id}"
    elif platform == 'prizepicks':
        return f"https://www.prizepicks.com/{event_id}"
    elif platform == 'underdog':
        return f"https://www.underdogfantasy.com/{event_id}"
    else:
        return 'URL not available'