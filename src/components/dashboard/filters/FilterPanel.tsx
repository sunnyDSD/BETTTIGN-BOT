import React, { useState } from 'react';
import { Filter } from 'lucide-react';

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState({
    sport: '',
    dateRange: 'today',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Filters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Sports</label>
          <select
            name="sport"
            value={filters.sport}
            onChange={handleFilterChange}
            className="w-full input"
          >
            <option value="">All Sports</option>
            <option value="basketball">Basketball</option>
            <option value="football">Football</option>
            <option value="baseball">Baseball</option>
            <option value="hockey">Hockey</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date Range</label>
          <select
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
            className="w-full input"
          >
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </div>
    </div>
  );
}