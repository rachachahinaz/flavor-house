import React, { createContext, useState, useContext } from 'react';
import { FaCheck, FaExclamation, FaInfo, FaTimes } from 'react-icons/fa';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Ajouter une notification
  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const newNotification = {
      id,
      message,
      type,
      duration,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [...prev, newNotification]);

    // Auto-supprimer après la durée
    setTimeout(() => {
      removeNotification(id);
    }, duration);

    return id;
  };

  // Supprimer une notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Supprimer toutes les notifications
  const clearAll = () => {
    setNotifications([]);
  };

  // Types de notifications
  const success = (message, duration) => addNotification(message, 'success', duration);
  const error = (message, duration) => addNotification(message, 'error', duration);
  const info = (message, duration) => addNotification(message, 'info', duration);
  const warning = (message, duration) => addNotification(message, 'warning', duration);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll,
      success,
      error,
      info,
      warning
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
