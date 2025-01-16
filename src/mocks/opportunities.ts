import { useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { mockNotifications } from '../mocks/notifications';

export function useNotificationData() {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Add mock notifications on component mount
    mockNotifications.forEach(notification => {
      addNotification({
        title: notification.title,
        message: notification.message,
        timestamp: notification.timestamp,
        priority: notification.priority,
        category: notification.category,
        metadata: notification.metadata,
      });
    });

    // Simulate new notifications every 30 seconds
    const interval = setInterval(() => {
      const randomProfit = (Math.random() * 5 + 2).toFixed(1);
      addNotification({
        title: 'New Betting Opportunity',
        message: `New arbitrage opportunity with ${randomProfit}% potential profit`,
        timestamp: new Date(),
        priority: Number(randomProfit) > 5 ? 'high' : 'medium',
        category: 'opportunity',
        metadata: {
          profit: Number(randomProfit),
          timeRemaining: Math.floor(Math.random() * 60) + 30,
        },
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [addNotification]);
}