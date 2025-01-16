import React, { useState } from 'react';
import { useArbitrageOpportunities, useExecuteTrade } from '../hooks/useArbitrageData';
import PageHeader from '../components/ui/PageHeader';
import OpportunitiesTable from '../components/opportunities/OpportunitiesTable';
import OpportunitiesFilter from '../components/opportunities/OpportunitiesFilter';
import { FilterOptions } from '../types/betting';
import { regions } from '../config/regions';

export default function Opportunities() {
  const { data: opportunities, isLoading, error } = useArbitrageOpportunities();
  const executeTrade = useExecuteTrade();
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    sports: [],
    bookmakers: [],
    region: 'us',
    minOdds: 1.0,
    maxOdds: 10.0,
    minEv: 0,
    sortBy: 'ev',
    sortOrder: 'desc',
  });

  const handleExecuteTrade = async (opportunityId: number) => {
    try {
      await executeTrade.mutateAsync(opportunityId);
    } catch (error) {
      console.error('Failed to execute trade:', error);
    }
  };

  const currentRegion = regions.find(r => r.id === filters.region);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader 
        title="Opportunities"
        description={`${opportunities?.length || 0} available arbitrage opportunities`}
      />
      
      <OpportunitiesFilter
        filters={filters}
        onFilterChange={setFilters}
        regions={regions}
        currentRegion={currentRegion}
      />

      <div className="mt-6">
        <OpportunitiesTable
          opportunities={opportunities || []}
          isLoading={isLoading}
          error={error}
          filters={filters}
          onExecuteTrade={handleExecuteTrade}
        />
      </div>
    </div>
  );
}