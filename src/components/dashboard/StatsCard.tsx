import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export type { StatsCardProps };

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  return (
    <div className={`bg-${color}-100 p-4 rounded-lg`}>
      <div className="flex items-center">
        <Icon className={`text-${color}-500 h-6 w-6`} />
        <h3 className="ml-2 text-lg font-semibold">{title}</h3>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value}</p>
        <p className={`text-${color}-500`}>{change}</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStatsData() {
      try {
        const response = await fetch('/api/sports_data');
        const statsData = await response.json();
        setStats(statsData);
      } catch (err) {
        setError('Failed to load stats data');
      } finally {
        setLoading(false);
      }
    }

    loadStatsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}