import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const createOrder = (cartItems, total, deliveryMethod, formData) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: total,
      deliveryMethod: deliveryMethod,
      customer: formData,
      status: 'received',
      createdAt: new Date().toISOString(),
      estimatedTime: '30-45 min',
      driver: null,
      driverLocation: null
    };
    setOrders(prev => [...prev, newOrder]);
    setCurrentOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: status } : order
      )
    );
    setCurrentOrder(prev => prev && prev.id === orderId ? { ...prev, status: status } : prev);
  };

  const assignDriver = (orderId, driverName) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, driver: driverName } : order
      )
    );
    setCurrentOrder(prev => prev && prev.id === orderId ? { ...prev, driver: driverName } : prev);
  };

  const updateDriverLocation = (orderId, location) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, driverLocation: location } : order
      )
    );
    setCurrentOrder(prev => prev && prev.id === orderId ? { ...prev, driverLocation: location } : prev);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      currentOrder,
      createOrder,
      updateOrderStatus,
      assignDriver,
      updateDriverLocation
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};
