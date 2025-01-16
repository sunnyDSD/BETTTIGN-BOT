import React from 'react';
import { useSettingsStore } from '../../lib/store';
import { regions } from '../../config/regions';

export default function BookmakerFilter() {
  const { settings, updateSettings } = useSettingsStore();
  const currentRegion = regions.find((r) => r.id === settings.region);

  if (!currentRegion) return null;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        Bookmakers
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {currentRegion.bookmakers.map((bookmaker) => (
          <div
            key={bookmaker.id}
            className="flex items-center p-2 rounded-md bg-background/50 hover:bg-background transition-colors"
          >
            <input
              type="checkbox"
              id={`bookmaker-${bookmaker.id}`}
              checked={settings.enabledBookmakers.includes(bookmaker.id)}
              onChange={(e) => {
                const enabled = e.target.checked;
                updateSettings({
                  enabledBookmakers: enabled
                    ? [...settings.enabledBookmakers, bookmaker.id]
                    : settings.enabledBookmakers.filter(
                        (id) => id !== bookmaker.id
                      ),
                });
              }}
              className="mr-2 h-4 w-4 rounded border-primary text-primary focus:ring-primary"
            />
            <label
              htmlFor={`bookmaker-${bookmaker.id}`}
              className="text-sm cursor-pointer"
            >
              {bookmaker.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}