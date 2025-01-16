import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { motion } from 'framer-motion';

export default function NotificationBell() {
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter((n) => n.status === 'unread').length;

  return (
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <button 
        className="p-2 rounded-full hover:bg-muted/50 transition-all duration-300 group"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <Bell className="h-5 w-5 group-hover:text-primary transition-colors" />
        {unreadCount > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </button>
    </motion.div>
  );
}