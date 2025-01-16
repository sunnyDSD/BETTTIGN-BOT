import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import MetricsOverview from '../components/dashboard/MetricsOverview';
import RecentActivity from '../components/dashboard/RecentActivity';
import ProfitabilityChart from '../components/dashboard/charts/ProfitabilityChart';
import SportsPieChart from '../components/dashboard/charts/SportsPieChart';
import EVDistributionChart from '../components/dashboard/charts/EVDistributionChart';
import FilterPanel from '../components/dashboard/filters/FilterPanel';

export default function Home() {
  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // Implement filter logic
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader
        title="Dashboard"
        description="Your arbitrage betting control center"
      />
      
      <FilterPanel onFilterChange={handleFilterChange} />
      
      <div className="space-y-6">
        <MetricsOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfitabilityChart />
          <SportsPieChart />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EVDistributionChart />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}