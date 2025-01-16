import { useSettingsStore } from '../../lib/store';
import { User, DollarSign } from 'lucide-react';

export default function AccountSettings() {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Account Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Initial Bankroll</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="number"
              min="100"
              value={settings.initialBankroll}
              onChange={(e) => updateSettings({ initialBankroll: Number(e.target.value) })}
              className="input pl-9"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Base Currency</label>
          <select
            value={settings.currency}
            onChange={(e) => updateSettings({ currency: e.target.value })}
            className="input"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Time Zone</label>
          <select
            value={settings.timezone}
            onChange={(e) => updateSettings({ timezone: e.target.value })}
            className="input"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <select
            value={settings.language}
            onChange={(e) => updateSettings({ language: e.target.value })}
            className="input"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Time Format</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="12h"
                checked={settings.timeFormat === '12h'}
                onChange={(e) => updateSettings({ timeFormat: e.target.value as '12h' | '24h' })}
                className="rounded-full border-primary text-primary focus:ring-primary"
              />
              <span>12-hour</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="24h"
                checked={settings.timeFormat === '24h'}
                onChange={(e) => updateSettings({ timeFormat: e.target.value as '12h' | '24h' })}
                className="rounded-full border-primary text-primary focus:ring-primary"
              />
              <span>24-hour</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}