export type NotificationPriority = 'low' | 'medium' | 'high';
export type NotificationCategory = 'opportunity' | 'trade' | 'system';
export type NotificationStatus = 'unread' | 'read' | 'dismissed';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  priority: NotificationPriority;
  category: NotificationCategory;
  status: NotificationStatus;
  metadata?: {
    opportunityId?: number;
    bookmaker?: string;
    odds?: number;
    profit?: number;
    timeRemaining?: number;
  };
}