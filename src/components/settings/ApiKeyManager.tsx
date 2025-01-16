import { useState } from 'react';
import { Key, Check, X } from 'lucide-react';
import { useSettingsStore } from '../../lib/store';

export default function ApiKeyManager() {
  const { settings, updateSettings } = useSettingsStore();
  const [apiKey, setApiKey] = useState('');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleSaveKey = async () => {
    if (!apiKey.trim()) return;

    setTestStatus('testing');
    try {
      // Test the API key
      const response = await fetch(
        `https://api.the-odds-api.com/v4/sports?apiKey=${apiKey}`
      );

      if (response.ok) {
        updateSettings({
          apiKeys: {
            ...settings.apiKeys,
            'the-odds-api': apiKey,
          },
        });
        setTestStatus('success');
        setApiKey('');
      } else {
        setTestStatus('error');
      }
    } catch (error) {
      setTestStatus('error');
    }
  };

  const handleRemoveKey = (provider: string) => {
    const newApiKeys = { ...settings.apiKeys };
    delete newApiKeys[provider];
    updateSettings({ apiKeys: newApiKeys });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Key className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">API Connections</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            The Odds API Key
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key"
              className="input flex-1"
            />
            <button
              onClick={handleSaveKey}
              disabled={testStatus === 'testing' || !apiKey.trim()}
              className="btn btn-primary whitespace-nowrap"
            >
              {testStatus === 'testing' ? 'Testing...' : 'Save Key'}
            </button>
          </div>
          {testStatus === 'error' && (
            <p className="mt-1 text-sm text-red-500">
              Invalid API key. Please check and try again.
            </p>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Connected APIs</h3>
          {Object.entries(settings.apiKeys).map(([provider]) => (
            <div
              key={provider}
              className="flex items-center justify-between p-3 bg-background rounded-md"
            >
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  {provider === 'the-odds-api' ? 'The Odds API' : provider}
                </span>
              </div>
              <button
                onClick={() => handleRemoveKey(provider)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {Object.keys(settings.apiKeys).length === 0 && (
            <p className="text-sm text-muted-foreground">
              No API keys configured yet.
            </p>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Need an API key?{' '}
            <a
              href="https://the-odds-api.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Sign up for The Odds API
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}