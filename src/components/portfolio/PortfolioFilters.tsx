import { Filter } from 'lucide-react';
import { FilterOptions } from '../../types/portfolio';

interface PortfolioFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function PortfolioFilters({ filters, onFilterChange }: PortfolioFiltersProps) {
  return (
    <div className="bg-card rounded-lg border p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <input
            type="date"
            className="input w-full dark:bg-background"
            value={filters.dateRange[0].toISOString().split('T')[0]}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                dateRange: [new Date(e.target.value), filters.dateRange[1]],
              })
            }
          />
          <input
            type="date"
            className="input w-full mt-2 dark:bg-background"
            value={filters.dateRange[1].toISOString().split('T')[0]}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                dateRange: [filters.dateRange[0], new Date(e.target.value)],
              })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Profit Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="input w-full dark:bg-background"
              placeholder="Min"
              value={filters.minProfit}
              onChange={(e) =>
                onFilterChange({ ...filters, minProfit: Number(e.target.value) })
              }
            />
            <span>-</span>
            <input
              type="number"
              className="input w-full dark:bg-background"
              placeholder="Max"
              value={filters.maxProfit}
              onChange={(e) =>
                onFilterChange({ ...filters, maxProfit: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <div className="flex flex-wrap gap-2">
            {['pending', 'won', 'lost'].map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status as any)}
                  onChange={(e) => {
                    const newStatus = e.target.checked
                      ? [...filters.status, status]
                      : filters.status.filter((s) => s !== status);
                    onFilterChange({ ...filters, status: newStatus as any[] });
                  }}
                  className="rounded border-primary text-primary focus:ring-primary dark:border-primary dark:bg-background"
                />
                <span className="capitalize">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}