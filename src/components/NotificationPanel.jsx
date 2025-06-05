import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Bell, CheckCircle, DollarSign, Lock, FileText, TrendingUp, Clock, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Notification Modal Component using Portal
const NotificationModal = ({ notification, isOpen, onClose }) => {
  // Important: We still need the notification object even when closing
  if (!notification) return null;
  
  const { type, title, content, date, time } = notification;
  
  // Get notification type icon for the modal
  const { icon, bgColor } = getNotificationTypeIcon(type);
  
  // Use createPortal to render the modal directly to document.body
  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black backdrop-blur-sm bg-opacity-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              y: 10,
              transition: { 
                duration: 0.25,
                ease: "easeInOut"
              }
            }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300
            }}
            className="bg-white rounded-2xl max-w-md w-[calc(100%-32px)] mx-auto z-10 shadow-2xl overflow-hidden relative"
          >
            {/* Header */}
            <div className={`${bgColor} px-6 py-4 flex justify-between items-center`}>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  {icon}
                </div>
                <h3 className="text-white font-medium text-lg">{title}</h3>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-white/80 hover:text-white focus:outline-none"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {content}
                </p>
              </div>
              
              {/* Footer with date and time */}
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm text-gray-500">{date}</span>
                <span className="text-sm text-gray-500">{time}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body // This renders the modal directly to the body element
  );
};

// Function to get notification type icon - moved outside component for reuse
const getNotificationTypeIcon = (type) => {
  switch (type) {
    case 'approval':
      return { 
        icon: <CheckCircle size={16} className="text-white" />,
        bgColor: 'bg-green-500'
      };
    case 'transaction':
      return { 
        icon: <DollarSign size={16} className="text-white" />,
        bgColor: 'bg-blue-500'
      };
    case 'security':
      return { 
        icon: <Lock size={16} className="text-white" />,
        bgColor: 'bg-red-500'
      };
    case 'update':
      return { 
        icon: <FileText size={16} className="text-white" />,
        bgColor: 'bg-indigo-500'
      };
    case 'promotion':
      return { 
        icon: <TrendingUp size={16} className="text-white" />,
        bgColor: 'bg-purple-500'
      };
    case 'reminder':
      return { 
        icon: <Clock size={16} className="text-white" />,
        bgColor: 'bg-amber-500'
      };
    default:
      return { 
        icon: <Bell size={16} className="text-white" />,
        bgColor: 'bg-slate-500'
      };
  }
};

const NotificationPanel = ({ 
  notifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  truncateText 
}) => {
  // State for modal
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Count unread notifications
  const unreadNotificationsCount = notifications.filter(notification => !notification.isRead).length;
  
  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups, notification) => {
    if (!groups[notification.date]) {
      groups[notification.date] = [];
    }
    groups[notification.date].push(notification);
    return groups;
  }, {});

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark as read
    markNotificationAsRead(notification.id);
    
    // Open modal with notification details
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  // Close modal with smooth exit animation
  const closeModal = () => {
    // Just close the modal state - the animation will handle the smooth transition
    setIsModalOpen(false);
    // We don't clear the selectedNotification immediately to allow animation to complete
  };

  return (
    <>
      <div className="p-4">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 text-white relative shadow-md">
          <Bell className="absolute top-4 right-4 text-white/70" size={20} />
          <p className="text-sm text-white/90">
            {unreadNotificationsCount > 0 
              ? `Bạn có ${unreadNotificationsCount} thông báo chưa đọc`
              : 'Bạn đã đọc tất cả thông báo'}
          </p>
          <div className="text-xs text-white/70">
            {unreadNotificationsCount > 0 && (
              <button 
                onClick={markAllNotificationsAsRead}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors text-white text-xs mt-2"
              >
                Đánh dấu tất cả đã đọc
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-4">        
        {/* List of notifications grouped by date */}
        {Object.keys(groupedNotifications).map(date => (
          <div key={date} className="mb-5">
            <div className="flex items-center mb-2">
              <div className="flex-grow h-px bg-slate-200"></div>
              <span className="px-2 text-xs font-medium text-slate-500">{date}</span>
              <div className="flex-grow h-px bg-slate-200"></div>
            </div>
            
            {groupedNotifications[date].map(notification => (
              <motion.div 
                key={notification.id} 
                className={`mb-3 ${notification.isRead ? 'bg-slate-50 border border-gray' : 'bg-indigo-50'} p-4 rounded-xl hover:bg-slate-100 transition-colors relative cursor-pointer`}
                onClick={() => handleNotificationClick(notification)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-start">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationTypeIcon(notification.type).bgColor}`}>
                    {getNotificationTypeIcon(notification.type).icon}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm text-slate-800">{truncateText(notification.title, 40)}</p>
                      <span className="text-xs text-slate-400 ml-2 whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{truncateText(notification.content, 100)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
        
        {/* If there are no notifications */}
        {Object.keys(groupedNotifications).length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Bell size={28} className="text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm">Không có thông báo nào</p>
          </div>
        )}
      </div>

      {/* Notification Detail Modal - Will be rendered via Portal */}
      <NotificationModal 
        notification={selectedNotification}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default NotificationPanel;