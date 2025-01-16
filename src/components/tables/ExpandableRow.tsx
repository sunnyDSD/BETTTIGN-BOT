import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BetOpportunity } from '../../types/betting';
import OddsChart from '../charts/OddsChart';

interface ExpandableRowProps {
  opportunity: BetOpportunity;
}

export default function ExpandableRow({ opportunity }: ExpandableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <tr>
      <td colSpan={6}>
        <div className="px-4 py-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {isExpanded ? 'Hide' : 'Show'} Details
          </button>
          
          {isExpanded && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Odds Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Implied Probability:</span>{' '}
                      {((1 / opportunity.odds1) * 100).toFixed(2)}% vs{' '}
                      {((1 / opportunity.odds2) * 100).toFixed(2)}%
                    </p>
                    <p>
                      <span className="text-muted-foreground">Kelly Criterion Stake:</span>{' '}
                      {((opportunity.ev / 100) * 0.5).toFixed(2)}% of bankroll
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Market Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Liquidity Score:</span>{' '}
                      High
                    </p>
                    <p>
                      <span className="text-muted-foreground">Market Movement:</span>{' '}
                      Stable
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="h-48">
                <OddsChart opportunity={opportunity} />
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}