import React from 'react';
import { format } from 'date-fns';
import { X, AlertTriangle, TrendingUp, Bell } from 'lucide-react';
import { Notification } from '../../types/notifications';
import { useNotifications } from '../../hooks/useNotifications';

const categoryIcons = {
  opportunity: TrendingUp,
  trade: AlertTriangle,
  system: Bell,
};

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const { dismissNotification } = useNotifications();
  const Icon = categoryIcons[notification.category];

  return (
    <div className={`
      p-4 border-b border-border last:border-0
      ${notification.status === 'unread' ? 'bg-muted/50' : ''}
      ${notification.priority === 'high' ? 'animate-pulse' : ''}
    `}>
      <div className="flex items-start gap-3">
        <div className={`
          p-2 rounded-full
          ${notification.priority === 'high' ? 'bg-red-500/10' : 
            notification.priority === 'medium' ? 'bg-yellow-500/10' : 
            'bg-blue-500/10'}
        `}>
          <Icon className={`
            h-4 w-4
            ${notification.priority === 'high' ? 'text-red-500' : 
              notification.priority === 'medium' ? 'text-yellow-500' : 
              'text-blue-500'}
          `} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium">{notification.title}</h4>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">
            {notification.message}
          </p>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground">
              {format(notification.timestamp, 'HH:mm')}
            </span>
            {notification.metadata?.timeRemaining && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {notification.metadata.timeRemaining}m remaining
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}