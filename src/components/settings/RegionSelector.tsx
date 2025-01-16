import { Globe } from 'lucide-react';
import { useSettingsStore } from '../../lib/store';
import { regions } from '../../config/regions';

export default function RegionSelector() {
  const { settings, updateSettings } = useSettingsStore();

  const currentRegion = regions.find((r) => r.id === settings.region);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Region Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Primary Region
          </label>
          <select
            value={settings.region}
            onChange={(e) => updateSettings({ region: e.target.value })}
            className="input w-full"
          >
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {currentRegion && (
          <>
            <div className="space-y-3">
              <label className="block text-sm font-medium">
                Available Bookmakers
              </label>
              <div className="grid grid-cols-2 gap-3">
                {currentRegion.bookmakers.map((bookmaker: { id: string; name: string }) => (
                  <div
                    key={bookmaker.id}
                    className="flex items-center p-3 rounded-md bg-background/50 hover:bg-background transition-colors"
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
                      className="mr-3 h-4 w-4 rounded border-primary text-primary focus:ring-primary"
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

            <div className="space-y-3">
              <label className="block text-sm font-medium">
                Available Sports
              </label>
              <div className="grid grid-cols-2 gap-3">
                {currentRegion.sports.map((sport: { id: string; name: string }) => (
                  <div
                    key={sport.id}
                    className="flex items-center p-3 rounded-md bg-background/50 hover:bg-background transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={`sport-${sport.id}`}
                      checked={settings.enabledSports.includes(sport.id)}
                      onChange={(e) => {
                        const enabled = e.target.checked;
                        updateSettings({
                          enabledSports: enabled
                            ? [...settings.enabledSports, sport.id]
                            : settings.enabledSports.filter(
                                (id) => id !== sport.id
                              ),
                        });
                      }}
                      className="mr-3 h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor={`sport-${sport.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {sport.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}