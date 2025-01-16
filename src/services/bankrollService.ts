export const updateBankroll = async (amount: number) => {
    const response = await fetch('/api/update_bankroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update bankroll');
    }
  
    return response.json();
  };