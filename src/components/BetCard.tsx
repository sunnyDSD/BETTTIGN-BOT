import { ArrowRight, ExternalLink } from 'lucide-react';

interface BetCardProps {
  bookmaker1: string;
  bookmaker2: string;
  odds1: number;
  odds2: number;
  profit: number;
  event: string;
  timestamp: string;
  ev: number;
  links: {
    bookmaker1: string;
    bookmaker2: string;
  };
}

export default function BetCard({
  bookmaker1,
  bookmaker2,
  odds1,
  odds2,
  profit,
  event,
  timestamp,
  ev,
  links,
}: BetCardProps) {
  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{event}</h3>
        <span className="text-sm text-muted-foreground">{timestamp}</span>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <div className="flex items-center gap-2">
            <p className="font-medium">{bookmaker1}</p>
            <a 
              href={links.bookmaker1}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="text-xl font-bold text-primary mt-1">{odds1.toFixed(2)}</p>
        </div>
        
        <ArrowRight className="text-muted-foreground" />
        
        <div className="text-center">
          <div className="flex items-center gap-2">
            <p className="font-medium">{bookmaker2}</p>
            <a 
              href={links.bookmaker2}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="text-xl font-bold text-primary mt-1">{odds2.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-sm text-muted-foreground">Profit Potential</span>
          <p className="text-lg font-bold text-green-500">
            {profit.toFixed(2)}%
          </p>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Expected Value</span>
          <p className="text-lg font-bold text-primary">
            {ev.toFixed(1)}%
          </p>
        </div>
      </div>

      <button className="btn btn-primary w-full">
        Execute Trade
      </button>
    </div>
  );
}