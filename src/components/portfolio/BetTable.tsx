import React from 'react';
import { format } from 'date-fns';

interface Bet {
  id: number;
  event: string;
  invested: number;
  expectedReturn: number;
  profit: number;
  status: string;
  timeLeft?: string;
  date?: string;
}

interface BetTableProps {
  bets: Bet[];
  title: string;
}

export default function BetTable({ bets, title }: BetTableProps) {
  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Event</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Invested</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Return</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Profit %</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bets.map((bet) => (
              <tr
                key={bet.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm">{bet.event}</td>
                <td className="px-6 py-4 text-sm">${bet.invested}</td>
                <td className="px-6 py-4 text-sm">
                  ${bet.expectedReturn || bet.invested * (1 + bet.profit / 100)}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${bet.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {bet.profit >= 0 ? '+' : ''}{bet.profit}%
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {bet.timeLeft ? (
                    <span className="text-primary">{bet.timeLeft} left</span>
                  ) : (
                    <span className="text-muted-foreground">{bet.date}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}