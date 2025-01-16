import { useSettingsStore } from '../../lib/store';
import { Sliders } from 'lucide-react';

export default function BettingParameters() {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Sliders className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Betting Parameters</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Minimum Profit Margin (%)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            step="0.1"
            value={settings.minProfitMargin}
            onChange={(e) => updateSettings({ minProfitMargin: Number(e.target.value) })}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Maximum Stake Per Bet (% of bankroll)
          </label>
          <input
            type="number"
            min="5"
            max="25"
            value={settings.maxStakePerBet}
            onChange={(e) => updateSettings({ maxStakePerBet: Number(e.target.value) })}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Odds Range</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                min="1.1"
                max="2"
                step="0.05"
                value={settings.minOdds}
                onChange={(e) => updateSettings({ minOdds: Number(e.target.value) })}
                className="input"
                placeholder="Min Odds"
              />
            </div>
            <div>
              <input
                type="number"
                min="2"
                max="10"
                step="0.05"
                value={settings.maxOdds}
                onChange={(e) => updateSettings({ maxOdds: Number(e.target.value) })}
                className="input"
                placeholder="Max Odds"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Stake Calculation Method</label>
          <select
            value={settings.stakeMethod}
            onChange={(e) => updateSettings({ stakeMethod: e.target.value as 'fixed' | 'kelly' | 'percentage' })}
            className="input"
          >
            <option value="fixed">Fixed Stake</option>
            <option value="kelly">Kelly Criterion</option>
            <option value="percentage">Percentage of Bankroll</option>
          </select>
        </div>
      </div>
    </div>
  );
}