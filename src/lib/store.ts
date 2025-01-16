import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Settings {
  // Account Settings
  initialBankroll: number;
  currency: string;
  timezone: string;
  language: string;
  timeFormat: '12h' | '24h';
  theme: 'light' | 'dark' | 'system';

  // Betting Parameters
  minProfitMargin: number;
  maxStakePerBet: number;
  minOdds: number;
  maxOdds: number;
  stakeMethod: 'fixed' | 'kelly' | 'percentage';

  // Risk Management
  dailyLossLimit: number;
  dailyProfitTarget: number;
  maxActiveBets: number;
  stopLossTrigger: number;

  // Region and API Settings
  region: string;
  enabledBookmakers: string[];
  enabledSports: string[];
  apiKeys: Record<string, string>;

  // Notification Settings
  notifications: boolean;
}

interface BankrollState {
  currentBankroll: number;
  allocatedFunds: number;
  totalProfit: number;
  updateBankroll: (amount: number) => void;
  updateAllocatedFunds: (amount: number) => void;
  updateTotalProfit: (amount: number) => void;
}

interface SettingsStore {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  toggleTheme: () => void;
}

const defaultSettings: Settings = {
  // Account Settings
  initialBankroll: 1000,
  currency: 'USD',
  timezone: 'UTC',
  language: 'en',
  timeFormat: '24h',
  theme: 'dark',

  // Betting Parameters
  minProfitMargin: 2,
  maxStakePerBet: 10,
  minOdds: 1.5,
  maxOdds: 3.0,
  stakeMethod: 'fixed',

  // Risk Management
  dailyLossLimit: 10,
  dailyProfitTarget: 20,
  maxActiveBets: 5,
  stopLossTrigger: 20,

  // Region and API Settings
  region: 'us',
  enabledBookmakers: [],
  enabledSports: [],
  apiKeys: {},

  // Notification Settings
  notifications: true,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      toggleTheme: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            theme: state.settings.theme === 'dark' ? 'light' : 'dark',
          },
        })),
    }),
    {
      name: 'arbitrage-settings',
    }
  )
);

export const useBankrollStore = create<BankrollState>((set) => ({
  currentBankroll: useSettingsStore.getState().settings.initialBankroll,
  allocatedFunds: 0,
  totalProfit: 0,
  updateBankroll: (amount: number) => set({ currentBankroll: amount }),
  updateAllocatedFunds: (amount: number) => set({ allocatedFunds: amount }),
  updateTotalProfit: (amount: number) => set({ totalProfit: amount }),
}));

// Subscribe to settings changes to update bankroll
useSettingsStore.subscribe((state, prevState) => {
  if (state.settings.initialBankroll !== prevState.settings.initialBankroll) {
    useBankrollStore.getState().updateBankroll(state.settings.initialBankroll);
  }
});