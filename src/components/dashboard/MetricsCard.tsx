import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: string;
}
import { fetchMetricsData } from '../../services/api';

interface Metric {
  title: string;
  value: number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, change, trend, icon: Icon, color }) => {
  return (
    <div className={`metrics-card ${color}`}>
      <div className="icon">
        <Icon />
      </div>
      <div className="details">
        <h3>{title}</h3>
        <p>{value}</p>
        <p>{change}</p>
        <p>{trend}</p>
      </div>
    </div>
  );
};

export { MetricsCard };

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <MetricsCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          trend={metric.trend}
          icon={metric.icon}
          color={metric.color}
        />
      ))}
    </div>
  );
}