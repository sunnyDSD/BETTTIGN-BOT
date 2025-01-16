import React from 'react';
import { Search } from 'lucide-react';
import { FilterOptions } from '../../types/betting';

interface Region {
  id: string;
  name: string;
  sports: { id: string; name: string }[];
  bookmakers: { id: string; name: string }[];
}

interface OpportunitiesFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  regions: Region[];
  currentRegion?: Region;
}

export default function OpportunitiesFilter({
  filters,
  onFilterChange,
  regions,
  currentRegion,
}: OpportunitiesFilterProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      region: e.target.value,
      sports: [],
      bookmakers: [],
    });
  };

  const handleSportToggle = (sportId: string) => {
    const sports = filters.sports.includes(sportId)
      ? filters.sports.filter(id => id !== sportId)
      : [...filters.sports, sportId];
    onFilterChange({ ...filters, sports });
  };

  const handleBookmakerToggle = (bookmakerId: string) => {
    const bookmakers = filters.bookmakers.includes(bookmakerId)
      ? filters.bookmakers.filter(id => id !== bookmakerId)
      : [...filters.bookmakers, bookmakerId];
    onFilterChange({ ...filters, bookmakers });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by team, league, or bet type..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full pl-10 input"
            />
          </div>
          <select
            value={filters.region}
            onChange={handleRegionChange}
            className="input w-48"
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentRegion && (
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Sports</h3>
            <div className="flex flex-wrap gap-2">
              {currentRegion.sports.map((sport: any) => (
                <button
                  key={sport.id}
                  onClick={() => handleSportToggle(sport.id)}
                  className={`
                    px-3 py-1.5 text-sm rounded-full transition-colors
                    ${filters.sports.includes(sport.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'}
                  `}
                >
                  {sport.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Bookmakers</h3>
            <div className="flex flex-wrap gap-2">
              {currentRegion.bookmakers.map((bookmaker: any) => (
                <button
                  key={bookmaker.id}
                  onClick={() => handleBookmakerToggle(bookmaker.id)}
                  className={`
                    px-3 py-1.5 text-sm rounded-full transition-colors
                    ${filters.bookmakers.includes(bookmaker.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'}
                  `}
                >
                  {bookmaker.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Odds Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1.0"
                  max={filters.maxOdds}
                  step="0.1"
                  value={filters.minOdds}
                  onChange={e => onFilterChange({ ...filters, minOdds: Number(e.target.value) })}
                  className="input w-24"
                />
                <span className="text-muted-foreground">to</span>
                <input
                  type="number"
                  min={filters.minOdds}
                  max="10.0"
                  step="0.1"
                  value={filters.maxOdds}
                  onChange={e => onFilterChange({ ...filters, maxOdds: Number(e.target.value) })}
                  className="input w-24"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Minimum EV%</h3>
              <input
                type="number"
                min="0"
                step="0.1"
                value={filters.minEv}
                onChange={e => onFilterChange({ ...filters, minEv: Number(e.target.value) })}
                className="input w-24"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}