export interface BetOpportunity {
  id: number;
  event: string;
  bookmaker1: string;
  bookmaker2: string;
  odds1: number;
  odds2: number;
  profit: number;
  ev: number;
  timestamp: string;
  sport: string;
  links: {
    bookmaker1: string;
    bookmaker2: string;
  };
  stakes: {
    stake1: number;
    stake2: number;
  };
  tradeTaken: boolean;
}

export interface FilterOptions {
  search: string;
  sports: string[];
  bookmakers: string[];
  region: string;
  minOdds: number;
  maxOdds: number;
  minEv: number;
  sortBy: SortField;
  sortOrder: 'asc' | 'desc';
}

export interface Bookmaker {
  id: string;
  name: string;
  regions: string[];
}

export interface League {
  id: string;
  name: string;
  region: string;
}

export interface Sport {
  id: string;
  name: string;
  regions: string[];
  leagues: League[];
}

export interface Region {
  id: string;
  name: string;
  code: string;
  bookmakers: Bookmaker[];
  sports: Sport[];
}

// Other existing interfaces and types I think i dont really know bruh
export interface Bet {
  bookmaker1: string;
  bookmaker2: string;
  odds1: number;
  odds2: number;
  profit: number;
  ev: number;
  timestamp: string;
  sport: string;
  links: {
    bookmaker1: string;
    bookmaker2: string;
  };
  stakes: {
    stake1: number;
    stake2: number;
  };
  tradeTaken: boolean;
}

export interface FilterOptions {
  search: string;
  sports: string[];
  bookmakers: string[];
  region: string;
  minOdds: number;
  maxOdds: number;
  minEv: number;
  sortBy: SortField;
  sortOrder: 'asc' | 'desc';
}

export type SortField = 'event' | 'ev' | 'profit' | 'timestamp';