import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { FaCheck, FaExclamation, FaInfo, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const Notification = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <FaCheck className="text-green-600" />;
      case 'error': return <FaTimes className="text-red-600" />;
      case 'warning': return <FaExclamationTriangle className="text-yellow-600" />;
      default: return <FaInfo className="text-blue-600" />;
    }
  };

  const getBgColor = (type) => {
    switch(type) {
      case 'success': return 'bg-green-100 border-green-400';
      case 'error': return 'bg-red-100 border-red-400';
      case 'warning': return 'bg-yellow-100 border-yellow-400';
      default: return 'bg-blue-100 border-blue-400';
    }
  };

  const getTextColor = (type) => {
    switch(type) {
      case 'success': return 'text-green-800';
      case 'error': return 'text-red-800';
      case 'warning': return 'text-yellow-800';
      default: return 'text-blue-800';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[9999] space-y-3 max-w-md w-full">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`${getBgColor(notification.type)} border-l-4 p-4 rounded-lg shadow-lg flex items-start gap-3 transition-all duration-300`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1">
            <p className={`${getTextColor(notification.type)} text-sm font-medium`}>
              {notification.message}
            </p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
