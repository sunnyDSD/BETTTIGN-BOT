import React, { useState } from 'react';
import { ArrowUpDown, ExternalLink, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { BetOpportunity, SortField } from '../../types/betting';
import { useTableSort } from '../../hooks/useTableSort';
import { useTableFilter } from '../../hooks/useTableFilter';
import ExpandableRow from './ExpandableRow';
import FilterPanel from './FilterPanel';

interface OpportunitiesTableProps {
  opportunities: BetOpportunity[];
  onExecuteTrade: (opportunity: BetOpportunity) => void;
}

export default function OpportunitiesTable({ opportunities, onExecuteTrade }: OpportunitiesTableProps) {
  const [showFilters, setShowFilters] = useState(false);
  const { sortedData, sortConfig, requestSort } = useTableSort(opportunities);
  const { filteredData, filters, updateFilters } = useTableFilter(sortedData);

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field === field) {
      return <ArrowUpDown className={`h-4 w-4 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />;
    }
    return <ArrowUpDown className="h-4 w-4 opacity-30" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Trading Opportunities</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-secondary flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {showFilters && (
        <FilterPanel filters={filters} onUpdateFilters={updateFilters} />
      )}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full data-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('event')} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  Event {getSortIcon('event')}
                </div>
              </th>
              <th onClick={() => requestSort('ev')} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  EV % {getSortIcon('ev')}
                </div>
              </th>
              <th onClick={() => requestSort('profit')} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  Profit % {getSortIcon('profit')}
                </div>
              </th>
              <th>Bookmakers</th>
              <th onClick={() => requestSort('timestamp')} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  Time {getSortIcon('timestamp')}
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((opportunity) => (
              <React.Fragment key={opportunity.id}>
                <tr className={opportunity.ev > 5 ? 'bg-primary/10' : ''}>
                  <td>{opportunity.event}</td>
                  <td className={`font-semibold ${opportunity.ev > 5 ? 'text-primary' : ''}`}>
                    {opportunity.ev.toFixed(2)}%
                  </td>
                  <td className="text-green-600 font-semibold">
                    {opportunity.profit.toFixed(2)}%
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <a
                        href={opportunity.links.bookmaker1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary"
                      >
                        {opportunity.bookmaker1}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <span>vs</span>
                      <a
                        href={opportunity.links.bookmaker2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary"
                      >
                        {opportunity.bookmaker2}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </td>
                  <td>{format(new Date(opportunity.timestamp), 'MMM d, HH:mm')}</td>
                  <td>
                    <button
                      onClick={() => onExecuteTrade(opportunity)}
                      className="btn btn-primary btn-sm"
                    >
                      Execute
                    </button>
                  </td>
                </tr>
                <ExpandableRow opportunity={opportunity} />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}