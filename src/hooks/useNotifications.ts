import { create } from 'zustand';
import { Notification, NotificationCategory, NotificationStatus } from '../types/notifications';

interface NotificationStore {
  notifications: Notification[];
  settings: {
    enabled: boolean;
    sound: boolean;
    categories: {
      [K in NotificationCategory]: boolean;
    };
    thresholds: {
      minProfit: number;
      oddsChange: number;
      expirationWarning: number;
    };
  };
  addNotification: (notification: Omit<Notification, 'id' | 'status'>) => void;
  markAsRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  updateSettings: (settings: Partial<NotificationStore['settings']>) => void;
}

export const useNotifications = create<NotificationStore>((set) => ({
  notifications: [],
  settings: {
    enabled: true,
    sound: true,
    categories: {
      opportunity: true,
      trade: true,
      system: true,
    },
    thresholds: {
      minProfit: 3,
      oddsChange: 5,
      expirationWarning: 15,
    },
  },
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          status: 'unread' as NotificationStatus,
        },
        ...state.notifications,
      ].slice(0, 50), // Keep last 50 notifications
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, status: 'read' } : n
      ),
    })),
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, status: 'dismissed' } : n
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, status: 'read' })),
    })),
  clearAll: () => set({ notifications: [] }),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));