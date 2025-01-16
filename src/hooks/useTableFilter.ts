import { useState, useMemo } from 'react';
import { FilterOptions, BetOpportunity } from '../types/betting';

const defaultFilters: FilterOptions = {
  minEv: 0,
  sports: ['all'],
  bookmakers: ['all'],
  search: '',
  region: 'all',
  minOdds: 0,
  maxOdds: 100,
  sortBy: 'event',
  sortOrder: 'asc',
};

export function useTableFilter(data: BetOpportunity[]) {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (item.ev < filters.minEv) return false;
      if (filters.sports[0] !== 'all' && !filters.sports.includes(item.sport)) return false;
      if (
        filters.bookmakers[0] !== 'all' &&
        !filters.bookmakers.includes(item.bookmaker1) &&
        !filters.bookmakers.includes(item.bookmaker2)
      )
        return false;
      return true;
    });
  }, [data, filters]);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return { filteredData, filters, updateFilters };
}