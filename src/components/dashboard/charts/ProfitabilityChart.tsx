import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { fetchProfitabilityData } from '../../../services/api';

interface ProfitabilityData {
  date: string;
  value: number;
}

export default function ProfitabilityChart() {
  const [data, setData] = useState<ProfitabilityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  useEffect(() => {
    async function loadProfitabilityData() {
      try {
        const profitabilityData = await fetchProfitabilityData();
        setData(profitabilityData);
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

    loadProfitabilityData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4">Profitability Chart</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), 
                timeRange === 'daily' ? 'MMM d' : 
                timeRange === 'weekly' ? 'MMM d' : 
                'MMM yyyy'
              )}
            />
            <YAxis />
            <Tooltip
              formatter={(value: string | number | (string | number)[]) => {
                if (typeof value === 'number') {
                  return [`$${value.toFixed(2)}`, 'Bankroll'];
                }
                return value;
              }}
              labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}