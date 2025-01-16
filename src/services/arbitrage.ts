import { BetOpportunity } from '../types/betting';

const API_BASE_URL = '/api';

export async function fetchArbitrageOpportunities(): Promise<BetOpportunity[]> {
  const response = await fetch(`${API_BASE_URL}/opportunities`);
  if (!response.ok) {
    throw new Error('Failed to fetch opportunities');
  }
  
  const data = await response.json();
  return data.map((opp: any) => ({
    id: opp.id,
    event: opp.event_name,
    bookmaker1: opp.platform_a,
    bookmaker2: opp.platform_b,
    odds1: opp.odds_a,
    odds2: opp.odds_b,
    profit: opp.potential_profit,
    ev: opp.arbitrage_value,
    timestamp: opp.timestamp,
    sport: 'football', // You might want to add this to your backend
    links: {
      bookmaker1: opp.url_a,
      bookmaker2: opp.url_b,
    },
  }));
}

export async function executeTrade(opportunityId: number) {
  const response = await fetch(`${API_BASE_URL}/execute-trade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ opportunityId }),
  });

  if (!response.ok) {
    throw new Error('Failed to execute trade');
  }

  return response.json();
}