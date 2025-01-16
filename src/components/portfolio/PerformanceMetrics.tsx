import React from 'react';
import { TrendingUp, Percent, DollarSign, Award } from 'lucide-react';
import { PerformanceMetrics as Metrics } from '../../types/portfolio';

interface PerformanceMetricsProps {
  metrics: Metrics;
}

export default function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Bankroll</p>
            <p className="text-2xl font-bold mt-1">
              ${metrics.totalBankroll.toFixed(2)}
            </p>
          </div>
          <div className="p-3 rounded-full bg-primary/10">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            ROI: {metrics.roi.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Win Rate</p>
            <p className="text-2xl font-bold mt-1">
              {metrics.winRate.toFixed(2)}%
            </p>
          </div>
          <div className="p-3 rounded-full bg-primary/10">
            <Percent className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            Avg Stake: ${metrics.averageStake.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Best Bookmaker</p>
            <p className="text-2xl font-bold mt-1">
              {metrics.profitableBookmakers[0]?.bookmaker || 'N/A'}
            </p>
          </div>
          <div className="p-3 rounded-full bg-primary/10">
            <Award className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            Profit: ${metrics.profitableBookmakers[0]?.profit.toFixed(2) || '0.00'}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Kelly Criterion</p>
            <p className="text-2xl font-bold mt-1">
              {metrics.kellyCriterion.toFixed(2)}%
            </p>
          </div>
          <div className="p-3 rounded-full bg-primary/10">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            Risk Exposure: {metrics.riskExposure.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}