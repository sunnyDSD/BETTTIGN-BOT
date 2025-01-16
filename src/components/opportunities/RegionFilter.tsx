import { useSettingsStore } from '../../lib/store';
import { regions } from '../../config/regions';

export default function RegionFilter() {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        Region
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
  );
}