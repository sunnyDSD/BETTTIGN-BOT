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
import { BetOpportunity } from '../../types/betting';
import { fetchHistoricalOdds } from '../../services/api';

interface OddsChartProps {
  opportunity: BetOpportunity;
}

export default function OddsChart({ opportunity }: OddsChartProps) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadHistoricalOdds() {
      try {
        const historicalData = await fetchHistoricalOdds(opportunity.id);
        setData(historicalData.map((entry: any) => ({
          time: new Date(entry.timestamp).toLocaleTimeString(),
          odds1: entry.odds_a,
          odds2: entry.odds_b,
        })));
      } catch (err) {
        console.error('Failed to fetch historical odds:', err);
      }
    }

    loadHistoricalOdds();
  }, [opportunity.id]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={['dataMin', 'dataMax']} />
        <Tooltip />
        <Line type="monotone" dataKey="odds1" stroke="#8884d8" />
        <Line type="monotone" dataKey="odds2" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}