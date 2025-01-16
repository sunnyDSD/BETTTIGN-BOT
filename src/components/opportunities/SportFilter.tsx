import { useSettingsStore } from '../../lib/store';
import { regions } from '../../config/regions';

interface Sport {
  id: string;
  name: string;
}

export default function SportFilter() {
  const { settings, updateSettings } = useSettingsStore();
  const currentRegion = regions.find((r) => r.id === settings.region);

  if (!currentRegion) return null;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        Sports
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {currentRegion.sports.map((sport: Sport) => (
          <div
            key={sport.id}
            className="flex items-center p-2 rounded-md bg-background/50 hover:bg-background transition-colors"
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
              className="mr-2 h-4 w-4 rounded border-primary text-primary focus:ring-primary"
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
  );
}