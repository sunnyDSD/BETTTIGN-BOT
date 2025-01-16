import { FilterOptions } from '../../types/betting';

interface FilterPanelProps {
  filters: FilterOptions;
  onUpdateFilters: (filters: Partial<FilterOptions>) => void;
}

export default function FilterPanel({ filters, onUpdateFilters }: FilterPanelProps) {
  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
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
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Sport
          </label>
          <select
            value={filters.sports}
            onChange={(e) => onUpdateFilters({ sports: [e.target.value] })}
            className="input"
          >
            <option value="all">All Sports</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="tennis">Tennis</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Bookmaker
          </label>
          <select
            value={filters.bookmakers}
            onChange={(e) => onUpdateFilters({ bookmakers: [e.target.value] })}
            className="input"
          >
            <option value="all">All Bookmakers</option>
            <option value="betfair">Betfair</option>
            <option value="pinnacle">Pinnacle</option>
            <option value="bet365">Bet365</option>
          </select>
        </div>
      </div>
    </div>
  );
}