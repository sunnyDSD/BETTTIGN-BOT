import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { fetchRecentActivity } from '../../services/api';

interface BetEvent {
  id: number;
  timestamp: Date;
  sport: string;
  league: string;
  stake: number;
  odds: number;
  status: 'Won' | 'Lost' | 'Pending';
  profitLoss: number;
  ev: number;
}

export default function RecentActivity() {
  const [recentBets, setRecentBets] = useState<BetEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecentActivity() {
      try {
        const recentActivity = await fetchRecentActivity();
        setRecentBets(recentActivity);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    loadRecentActivity();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {recentBets.map((bet) => (
          <div
            key={bet.id}
            className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`
                p-2 rounded-full
                ${bet.status === 'Won' ? 'bg-green-500/10' : 
                  bet.status === 'Lost' ? 'bg-red-500/10' : 
                  'bg-blue-500/10'}
              `}>
                {bet.status === 'Won' ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : bet.status === 'Lost' ? (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                )}
              </div>
              
              <div>
                <p className="font-medium">{bet.sport} - {bet.league}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(bet.timestamp), 'MMM d, HH:mm')}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className={`font-semibold ${
                bet.status === 'Won' ? 'text-green-500' : 
                bet.status === 'Lost' ? 'text-red-500' : 
                'text-blue-500'
              }`}>
                {bet.status === 'Won' ? '+' : bet.status === 'Lost' ? '-' : ''}
                ${Math.abs(bet.profitLoss)}
              </p>
              <p className="text-sm text-muted-foreground">
                EV: {bet.ev > 0 ? '+' : ''}{bet.ev}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}