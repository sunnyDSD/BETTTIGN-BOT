import { Notification } from '../types/notifications';
import { subMinutes } from 'date-fns';

const now = new Date();

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'High Value Opportunity',
    message: 'Lakers vs Warriors - Potential 5.2% profit available',
    timestamp: subMinutes(now, 2),
    priority: 'high',
    category: 'opportunity',
    status: 'unread',
    metadata: {
      opportunityId: 1,
      bookmaker: 'DraftKings',
      odds: 2.10,
      profit: 5.2,
      timeRemaining: 45,
    },
  },
  {
    id: '2',
    title: 'Trade Alert',
    message: 'Chiefs vs Raiders arbitrage opportunity detected',
    timestamp: subMinutes(now, 15),
    priority: 'medium',
    category: 'trade',
    status: 'unread',
    metadata: {
      opportunityId: 2,
      bookmaker: 'BetMGM',
      odds: 1.85,
      profit: 3.5,
      timeRemaining: 120,
    },
  },
];