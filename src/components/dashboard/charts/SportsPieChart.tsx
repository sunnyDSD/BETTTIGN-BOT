import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { fetchSportsData } from '../../../services/api';

interface SportData {
  name: string;
  value: number;
  color: string;
}

export default function SportsPieChart() {
  const [data, setData] = useState<SportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSportsData() {
      try {
        const sportsData = await fetchSportsData();
        const coloredData = sportsData.map((sport: any, index: number) => ({
          ...sport,
          color: getColor(index),
        }));
        setData(coloredData);
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

    loadSportsData();
  }, []);

  const getColor = (index: number) => {
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EC4899', '#6B7280'];
    return colors[index % colors.length];
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4">Profit by Sport</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}