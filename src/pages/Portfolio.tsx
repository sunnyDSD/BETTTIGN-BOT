import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PerformanceMetrics from '../components/portfolio/PerformanceMetrics';
import PortfolioFilters from '../components/portfolio/PortfolioFilters';
import BetTable from '../components/portfolio/BetTable';
import { FilterOptions, PerformanceMetrics as Metrics } from '../types/portfolio';
import { exportToCSV } from '../utils/csv';

export default function Portfolio() {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
    sports: [],
    bookmakers: [],
    status: ['pending', 'won', 'lost'],
    minProfit: 0,
    maxProfit: Infinity,
  });

  // Mock data - replace with real data from your backend
  const metrics: Metrics = {
    totalBankroll: 25000,
    roi: 12.5,
    winRate: 68.5,
    averageStake: 1000,
    profitableBookmakers: [
      { bookmaker: 'Betfair', profit: 2500, totalBets: 45 },
      { bookmaker: 'Pinnacle', profit: 1800, totalBets: 32 },
    ],
    riskExposure: 15.2,
    kellyCriterion: 8.4,
  };

  const activeBets = [
    {
      id: 1,
      event: 'Manchester United vs Arsenal',
      invested: 1000,
      expectedReturn: 1038,
      profit: 3.8,
      status: 'In Progress',
      timeLeft: '1h 30m',
    },
    {
      id: 2,
      event: 'Lakers vs Warriors',
      invested: 1500,
      expectedReturn: 1543.50,
      profit: 2.9,
      status: 'In Progress',
      timeLeft: '45m',
    },
  ];

  const completedBets = [
    {
      id: 3,
      event: 'PSG vs Real Madrid',
      invested: 2000,
      expectedReturn: 2084,
      profit: 4.2,
      status: 'Completed',
      date: '2024-03-14',
    },
    {
      id: 4,
      event: 'Nadal vs Federer',
      invested: 1200,
      expectedReturn: 1238.40,
      profit: 3.2,
      status: 'Completed',
      date: '2024-03-13',
    },
  ];

  const handleExport = () => {
    const exportData = [...activeBets, ...completedBets].map((bet) => ({
      id: bet.id,
      timestamp: new Date().toISOString(),
      event: bet.event,
      sport: 'Various',
      league: 'Various',
      bookmaker1: 'Various',
      bookmaker2: 'Various',
      stake: bet.invested,
      currency: 'USD',
      odds1: 0,
      odds2: 0,
      status: bet.status === 'In Progress' ? 'pending' : 'completed',
      profitLoss: bet.profit,
      arbitragePercentage: bet.profit,
    }));

    exportToCSV(exportData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="relative">
            <h1 className="text-3xl font-bold">Portfolio</h1>
            <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
          </div>
          <p className="mt-4 text-muted-foreground">
            Track your active and completed bets
          </p>
        </div>

        <button
          onClick={handleExport}
          className="btn btn-primary flex items-center gap-2"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <PerformanceMetrics metrics={metrics} />
      <PortfolioFilters filters={filters} onFilterChange={setFilters} />

      <div className="space-y-8">
        <BetTable title="Active Bets" bets={activeBets} />
        <BetTable title="Completed Bets" bets={completedBets} />
      </div>
    </div>
  );
}