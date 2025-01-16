import { useState, useMemo, useEffect } from 'react';
import { SortField, BetOpportunity } from '../types/betting';

interface SortConfig {
  field: SortField;
  direction: 'asc' | 'desc';
}

export function useTableSort() {
  const [data, setData] = useState<BetOpportunity[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'event', direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/opportunities');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      if (a[sortConfig.field] < b[sortConfig.field]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.field] > b[sortConfig.field]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  const requestSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  return { sortedData, sortConfig, requestSort };
}