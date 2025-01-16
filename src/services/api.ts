const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

// Fetch opportunities from the backend
export async function fetchOpportunities() {
  const response = await fetch(`${API_BASE_URL}/opportunities`);
  if (!response.ok) {
    throw new Error('Failed to fetch opportunities');
  }
  return response.json();
}

// Execute trade through the backend
export async function executeTrade(opportunityId: number) {
  const response = await fetch(`${API_BASE_URL}/take_trade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ opp_id: opportunityId }),
  });
  if (!response.ok) {
    throw new Error('Failed to execute trade');
  }
  return response.json();
}

// Update user email
export async function updateUserEmail(email: string) {
  const response = await fetch(`${API_BASE_URL}/update_email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error('Failed to update email');
  }
  return response.json();
}

// Fetch active bets
export async function fetchActiveBets() {
  const response = await fetch(`${API_BASE_URL}/active_bets`);
  if (!response.ok) {
    throw new Error('Failed to fetch active bets');
  }
  return response.json();
}

// Fetch historical odds data from the backend
export async function fetchHistoricalOdds(opportunityId: number) {
  const response = await fetch(`${API_BASE_URL}/historical_odds/${opportunityId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch historical odds');
  }
  return response.json();
}

// Fetch profit data from the backend
export async function fetchProfitData() {
  const response = await fetch(`${API_BASE_URL}/profit_data`);
  if (!response.ok) {
    throw new Error('Failed to fetch profit data');
  }
  return response.json();
}

// Fetch EV distribution data from the backend
export async function fetchEVDistributionData() {
  const response = await fetch(`${API_BASE_URL}/ev_distribution`);
  if (!response.ok) {
    throw new Error('Failed to fetch EV distribution data');
  }
  return response.json();
}

// Fetch profitability data from the backend
export async function fetchProfitabilityData() {
  const response = await fetch(`${API_BASE_URL}/profitability_data`);
  if (!response.ok) {
    throw new Error('Failed to fetch profitability data');
  }
  return response.json();
}

// Fetch sports data from the backend
export async function fetchSportsData() {
  const response = await fetch(`${API_BASE_URL}/sports_data`);
  if (!response.ok) {
    throw new Error('Failed to fetch sports data');
  }
  return response.json();
}

// Fetch metrics data from the backend
export async function fetchMetricsData() {
  const response = await fetch(`${API_BASE_URL}/metrics_data`);
  if (!response.ok) {
    throw new Error('Failed to fetch metrics data');
  }
  return response.json();
}

// Fetch recent activity data from the backend
export async function fetchRecentActivity() {
  const response = await fetch(`${API_BASE_URL}/recent_activity`);
  if (!response.ok) {
    throw new Error('Failed to fetch recent activity');
  }
  return response.json();
}