import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCircle } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { useNavigate } from 'react-router-dom';

export default function NotificationCenter() {
  const { notifications, markAllAsRead, dismissNotification } = useNotifications();
  const navigate = useNavigate();
  const activeNotifications = notifications.filter(n => n.status !== 'dismissed');

  const handleOpportunityClick = (opportunityId: number) => {
    navigate('/opportunities');
    dismissNotification(opportunityId.toString());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed right-4 top-16 w-96 bg-background/80 backdrop-blur-lg border border-border rounded-lg shadow-lg overflow-hidden z-50"
      style={{ maxHeight: 'calc(100vh - 5rem)' }}
    >
      <div className="sticky top-0 p-4 border-b border-border bg-background/90 backdrop-blur-lg z-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <button
          onClick={markAllAsRead}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <CheckCircle className="h-4 w-4" />
          Mark all read
        </button>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
        <AnimatePresence>
          {activeNotifications.length > 0 ? (
            activeNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`
                  relative p-4 border-b border-border last:border-0 cursor-pointer
                  hover:bg-muted/50 transition-colors
                  ${notification.status === 'unread' ? 'bg-primary/5' : ''}
                `}
                onClick={() => notification.metadata?.opportunityId && 
                  handleOpportunityClick(notification.metadata.opportunityId)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    {notification.metadata?.profit && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                          +{notification.metadata.profit}% Profit
                        </span>
                        {notification.metadata.timeRemaining && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {notification.metadata.timeRemaining}m remaining
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissNotification(notification.id);
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No new notifications
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}