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
import { fetchProfitData } from '../../services/api';


export default function ProfitChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadProfitData() {
      try {
        const profitData = await fetchProfitData();
        setData(profitData);
      } catch (err) {
        console.error('Failed to fetch profit data:', err);
      }
    }

    loadProfitData();
  }, []);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
          />
          <YAxis />
          <Tooltip
            formatter={(value: string | number | (string | number)[]) => {
              if (Array.isArray(value)) {
                value = value[0];
              }
              return [`$${Number(value).toFixed(2)}`, 'Profit'];
            }}
            labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}