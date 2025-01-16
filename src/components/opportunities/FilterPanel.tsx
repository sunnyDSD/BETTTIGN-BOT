import React from 'react';
import { Filter } from 'lucide-react';
import RegionFilter from './RegionFilter';
import BookmakerFilter from './BookmakerFilter';
import SportFilter from './SportFilter';
import { FilterOptions } from '../../types/betting';

interface FilterPanelProps {
  filters: FilterOptions;
  onUpdateFilters: (filters: Partial<FilterOptions>) => void;
}

export default function FilterPanel({ filters, onUpdateFilters }: FilterPanelProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="bg-card rounded-lg border border-border mb-6">
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="btn btn-secondary btn-sm"
        >
          {expanded ? 'Collapse' : 'Expand'} Filters
        </button>
      </div>

      {expanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <RegionFilter />
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Minimum EV %
                </label>
                <input
                  type="number"
                  value={filters.minEv}
                  onChange={(e) => onUpdateFilters({ minEv: Number(e.target.value) })}
                  className="input"
                  step="0.1"
                />
              </div>
            </div>
            <BookmakerFilter />
          </div>
          <SportFilter />
        </div>
      )}
    </div>
  );
}