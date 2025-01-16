import { AlertCircle } from 'lucide-react';
import { BetOpportunity, FilterOptions } from '../../types/betting';
import OpportunityRow from './OpportunityRow';

interface OpportunitiesTableProps {
  opportunities: BetOpportunity[];
  isLoading: boolean;
  error: Error | null;
  filters: FilterOptions;
  onExecuteTrade: (opportunityId: number) => void;
}

export default function OpportunitiesTable({
  opportunities,
  isLoading,
  error,
  filters,
  onExecuteTrade,
}: OpportunitiesTableProps) {
  const filteredOpportunities = opportunities
    .filter(opp => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!opp.event.toLowerCase().includes(searchLower)) return false;
      }
      if (filters.sports.length && !filters.sports.includes(opp.sport)) return false;
      if (filters.bookmakers.length && 
          !filters.bookmakers.includes(opp.bookmaker1) && 
          !filters.bookmakers.includes(opp.bookmaker2)) return false;
      if (opp.odds1 < filters.minOdds || opp.odds1 > filters.maxOdds) return false;
      if (opp.odds2 < filters.minOdds || opp.odds2 > filters.maxOdds) return false;
      if (opp.ev < filters.minEv) return false;
      return true;
    })
    .sort((a, b) => {
      const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
      return ((a[filters.sortBy] as number) - (b[filters.sortBy] as number)) * multiplier;
    });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
        <p className="text-red-500">Failed to load opportunities</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Event</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Bookmakers</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Odds</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">EV%</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Profit%</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOpportunities.map(opportunity => (
              <OpportunityRow
                key={opportunity.id}
                opportunity={opportunity}
                onExecute={() => onExecuteTrade(opportunity.id)}
              />
            ))}
            {filteredOpportunities.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  No opportunities found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}