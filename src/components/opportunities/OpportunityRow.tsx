import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { BetOpportunity } from '../../types/betting';
import TradeExecutionModal from '../modals/TradeExecutionModal';

interface OpportunityRowProps {
  opportunity: BetOpportunity;
  onExecute: () => void;
}

export default function OpportunityRow({ opportunity, onExecute }: OpportunityRowProps) {
  const [showExecutionModal, setShowExecutionModal] = useState(false);

  const getEVColor = (ev: number) => {
    if (ev >= 5) return 'text-green-500';
    if (ev >= 3) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  return (
    <>
      <tr className="border-b border-border hover:bg-muted/50 transition-colors">
        <td className="px-4 py-4">
          <div className="font-medium">{opportunity.event}</div>
          <div className="text-sm text-muted-foreground">{opportunity.sport}</div>
        </td>
        <td className="px-4 py-4">
          <div className="flex flex-col gap-1">
            <a
              href={opportunity.links.bookmaker1}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary"
            >
              {opportunity.bookmaker1}
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={opportunity.links.bookmaker2}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary"
            >
              {opportunity.bookmaker2}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </td>
        <td className="px-4 py-4">
          <div className="flex flex-col gap-1">
            <span>{opportunity.odds1.toFixed(2)}</span>
            <span>{opportunity.odds2.toFixed(2)}</span>
          </div>
        </td>
        <td className="px-4 py-4">
          <span className={`font-medium ${getEVColor(opportunity.ev)}`}>
            {opportunity.ev.toFixed(1)}%
          </span>
        </td>
        <td className="px-4 py-4">
          <span className="text-green-500 font-medium">
            {opportunity.profit.toFixed(1)}%
          </span>
        </td>
        <td className="px-4 py-4">
          <div className="text-sm text-muted-foreground">
            {new Date(opportunity.timestamp).toLocaleTimeString()}
          </div>
        </td>
        <td className="px-4 py-4 text-right">
          <button
            onClick={() => setShowExecutionModal(true)}
            className="btn btn-primary btn-sm"
          >
            Execute
          </button>
        </td>
      </tr>
      {showExecutionModal && (
        <TradeExecutionModal
          opportunity={opportunity}
          isOpen={showExecutionModal}
          onClose={() => setShowExecutionModal(false)}
          onConfirm={() => {
            onExecute();
            setShowExecutionModal(false);
          }}
        />
      )}
    </>
  );
}