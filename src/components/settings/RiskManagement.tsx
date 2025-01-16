import { useSettingsStore } from '../../lib/store';
import { Shield, AlertOctagon } from 'lucide-react';

export default function RiskManagement() {
  const { settings, updateSettings } = useSettingsStore();

  const handleEmergencyStop = () => {
    if (window.confirm('Are you sure you want to cancel all pending bets?')) {
      // Implement emergency stop logic
      console.log('Emergency stop triggered');
    }
  };

  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Risk Management</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Daily Loss Limit (% of bankroll)
          </label>
          <input
            type="number"
            min="5"
            max="20"
            value={settings.dailyLossLimit}
            onChange={(e) => updateSettings({ dailyLossLimit: Number(e.target.value) })}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Daily Profit Target (% of bankroll)
          </label>
          <input
            type="number"
            min="5"
            max="50"
            value={settings.dailyProfitTarget}
            onChange={(e) => updateSettings({ dailyProfitTarget: Number(e.target.value) })}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Maximum Active Bets
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={settings.maxActiveBets}
            onChange={(e) => updateSettings({ maxActiveBets: Number(e.target.value) })}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Stop-Loss Trigger (% of bankroll)
          </label>
          <input
            type="number"
            min="10"
            max="50"
            value={settings.stopLossTrigger}
            onChange={(e) => updateSettings({ stopLossTrigger: Number(e.target.value) })}
            className="input"
          />
        </div>

        <div>
          <button
            onClick={handleEmergencyStop}
            className="w-full btn bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
          >
            <AlertOctagon className="h-4 w-4" />
            Emergency Stop
          </button>
        </div>
      </div>
    </div>
  );
}