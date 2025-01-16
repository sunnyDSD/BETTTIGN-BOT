export interface Bet {
  id: number;
  timestamp: string;
  settlementTime?: string;
  event: string;
  sport: string;
  league: string;
  bookmaker1: string;
  bookmaker2: string;
  stake: number;
  currency: string;
  odds1: number;
  odds2: number;
  status: 'pending' | 'won' | 'lost';
  profitLoss: number;
  arbitragePercentage: number;
}

export interface PerformanceMetrics {
  totalBankroll: number;
  roi: number;
  winRate: number;
  averageStake: number;
  profitableBookmakers: Array<{
    bookmaker: string;
    profit: number;
    totalBets: number;
  }>;
  riskExposure: number;
  kellyCriterion: number;
}

export interface FilterOptions {
  dateRange: [Date, Date];
  sports: string[];
  bookmakers: string[];
  status: ('pending' | 'won' | 'lost')[];
  minProfit: number;
  maxProfit: number;
}