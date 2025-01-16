import { useEffect, useState } from 'react';
import MetricsCard from './MetricsCard';
import { fetchMetricsData } from '../../services/api';

export default function MetricsOverview() {
  const [metrics, setMetrics] = useState<{ title: string; [key: string]: any }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadMetricsData() {
      try {
        const metricsData = await fetchMetricsData();
        setMetrics(metricsData);
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

    loadMetricsData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <MetricsCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}