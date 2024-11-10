# backend/notification_manager.py

def send_email_notification(opportunity):
    subject = f"Arbitrage Opportunity: {opportunity['event_name']}"
    message = f"""
    Arbitrage Opportunity Found: {opportunity['event_name']} - {opportunity['team']}
    Platforms: {opportunity['platform_a']} (Odds: {opportunity['odds_a']}) vs {opportunity['platform_b']} (Odds: {opportunity['odds_b']})
    Stakes: ${opportunity['stake_a']:.2f} on {opportunity['platform_a']}, ${opportunity['stake_b']:.2f} on {opportunity['platform_b']}
    Potential Profit: ${opportunity['potential_profit']:.2f}
    
    Place your bets here:
    - {opportunity['platform_a']}: {opportunity['url_a']}
    - {opportunity['platform_b']}: {opportunity['url_b']}
    """
    # Send the email as before
