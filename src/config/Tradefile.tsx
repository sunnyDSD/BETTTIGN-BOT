import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface TradeStats {
  totalTrades: number;
  winRate: number;
  averageProfit: number;
  profitToday: number;
  lastUpdate: Date;
}

export default function TradeStats() {
  const [stats, setStats] = useState<TradeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTradeStats() {
      try {
        const response = await fetch('/api/trade_stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError('Failed to load trade statistics');
      } finally {
        setLoading(false);
      }
    }

    fetchTradeStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!stats) {
    return <div>No data available</div>;
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Trading Performance</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Trades</p>
          <p className="text-2xl font-bold">{stats.totalTrades}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Win Rate</p>
          <p className="text-2xl font-bold text-green-500">{stats.winRate}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Avg. Profit/Trade</p>
          <p className="text-2xl font-bold">{stats.averageProfit}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Profit Today</p>
          <p className="text-2xl font-bold">{stats.profitToday}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Last Update</p>
          <p className="text-2xl font-bold">{format(new Date(stats.lastUpdate), 'PPpp')}</p>
        </div>
      </div>
    </div>
  );
}