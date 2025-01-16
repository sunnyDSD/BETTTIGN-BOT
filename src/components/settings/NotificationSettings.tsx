import { useSettingsStore } from '../../lib/store';
import { Bell, Volume2, Clock } from 'lucide-react';

export default function NotificationSettings() {
  const { settings, updateSettings } = useSettingsStore();

  const notificationTypes = [
    { id: 'opportunities', label: 'New Opportunities' },
    { id: 'trades', label: 'Trade Executions' },
    { id: 'alerts', label: 'Price Alerts' },
    { id: 'system', label: 'System Updates' },
  ];

  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Notification Preferences</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Notification Types</h3>
          {notificationTypes.map(({ id, label }) => (
            <label key={id} className="flex items-center justify-between">
              <span className="text-sm">{label}</span>
              <div className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications}
                  onChange={() => updateSettings({ notifications: !settings.notifications })}
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </label>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Sound Settings</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Notification Sound</span>
            </div>
            <select className="input w-40">
              <option value="default">Default</option>
              <option value="subtle">Subtle</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Timing</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Update Frequency</span>
            </div>
            <select className="input w-40">
              <option value="realtime">Real-time</option>
              <option value="5min">Every 5 minutes</option>
              <option value="15min">Every 15 minutes</option>
              <option value="30min">Every 30 minutes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}