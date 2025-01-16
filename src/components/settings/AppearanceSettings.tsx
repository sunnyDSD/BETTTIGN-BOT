import { useSettingsStore } from '../../lib/store';
import { Moon, Sun, Monitor } from 'lucide-react';

export default function AppearanceSettings() {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Sun className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Appearance</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-4">Theme</h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => updateSettings({ theme: 'light' })}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                settings.theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <Sun className="h-6 w-6" />
              <span className="text-sm">Light</span>
            </button>

            <button
              onClick={() => updateSettings({ theme: 'dark' })}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                settings.theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <Moon className="h-6 w-6" />
              <span className="text-sm">Dark</span>
            </button>

            <button
              onClick={() => updateSettings({ theme: 'system' })}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                settings.theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <Monitor className="h-6 w-6" />
              <span className="text-sm">System</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}