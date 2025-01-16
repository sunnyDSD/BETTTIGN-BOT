import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface CyberStatsProps {
  totalProfit: number;
  winRate: number;
  activePositions: number;
}

export default function CyberStats({ totalProfit, winRate, activePositions }: CyberStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        className="hex-stat"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-[var(--neon-primary)] mb-2">
          {totalProfit >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
        </div>
        <div className="text-2xl font-bold glitch-text">
          {totalProfit >= 0 ? '+' : '-'}${Math.abs(totalProfit).toFixed(2)}
        </div>
        <div className="text-sm text-[var(--neon-primary)]">Total Profit</div>
      </motion.div>

      <motion.div
        className="hex-stat"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="text-[var(--neon-secondary)] mb-2">
          <Activity size={24} />
        </div>
        <div className="text-2xl font-bold glitch-text">{winRate}%</div>
        <div className="text-sm text-[var(--neon-secondary)]">Win Rate</div>
      </motion.div>

      <motion.div
        className="hex-stat"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-[var(--neon-primary)] mb-2">
          <TrendingUp size={24} />
        </div>
        <div className="text-2xl font-bold glitch-text">{activePositions}</div>
        <div className="text-sm text-[var(--neon-primary)]">Active Positions</div>
      </motion.div>
    </div>
  );
}