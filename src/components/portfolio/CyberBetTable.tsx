import React from 'react';
import { motion } from 'framer-motion';
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

interface CyberBetTableProps {
  bets: Bet[];
  title: string;
}

export default function CyberBetTable({ bets, title }: CyberBetTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cyber-card p-6 mb-8"
    >
      <h2 className="text-xl font-bold text-[var(--neon-primary)] mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--neon-primary)] border-opacity-30">
              <th className="px-6 py-3 text-left text-sm font-medium text-[var(--neon-secondary)]">Event</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-[var(--neon-secondary)]">Invested</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-[var(--neon-secondary)]">Return</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-[var(--neon-secondary)]">Profit %</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-[var(--neon-secondary)]">Status</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet) => (
              <motion.tr
                key={bet.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="border-b border-[var(--neon-primary)] border-opacity-10 hover:bg-[var(--neon-primary)] hover:bg-opacity-5"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm">{bet.event}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">${bet.invested}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  ${bet.expectedReturn || bet.invested * (1 + bet.profit / 100)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm ${bet.profit >= 0 ? 'text-[var(--neon-primary)]' : 'text-[var(--neon-secondary)]'}`}>
                    {bet.profit >= 0 ? '+' : ''}{bet.profit}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {bet.timeLeft ? (
                    <span className="text-[var(--neon-primary)]">{bet.timeLeft} left</span>
                  ) : (
                    <span className="text-[var(--neon-secondary)]">{bet.date}</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}