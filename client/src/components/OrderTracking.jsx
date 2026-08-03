import React from 'react';
import { FaCheck, FaClock, FaMotorcycle, FaHome, FaPhone } from 'react-icons/fa';

const OrderTracking = ({ order }) => {
  const statuses = [
    { key: 'received', label: 'Received', icon: '📥' },
    { key: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
    { key: 'ready', label: 'Ready', icon: '✅' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: '🛵' },
    { key: 'delivered', label: 'Delivered', icon: '🏠' }
  ];

  const currentIndex = statuses.findIndex(s => s.key === order.status);

  const getStatusColor = (key) => {
    const index = statuses.findIndex(s => s.key === key);
    if (index <= currentIndex) return 'bg-green-500';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📦 Order Tracking</h2>
      
      {/* Order Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Order #{order.id}</p>
            <p className="font-bold text-lg">{order.items.length} items</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-bold text-red-800 text-xl">{order.total} DA</p>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-sm text-gray-500">Estimated: {order.estimatedTime}</p>
          <p className="text-sm text-gray-500">📅 {new Date(order.createdAt).toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Status Steps */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-1 bg-gray-200"></div>
        {statuses.map((status, index) => (
          <div key={status.key} className="flex items-center gap-4 mb-6 relative">
            <div className={`z-10 w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(status.key)} text-white`}>
              {status.icon}
            </div>
            <div className="flex-1">
              <p className={`font-medium ${index <= currentIndex ? 'text-gray-800' : 'text-gray-400'}`}>
                {status.label}
              </p>
              {index === currentIndex && (
                <p className="text-sm text-green-600">✅ Current status</p>
              )}
            </div>
            {index <= currentIndex && (
              <FaCheck className="text-green-500" />
            )}
          </div>
        ))}
      </div>

      {/* Driver Info */}
      {order.driver && order.status !== 'delivered' && (
        <div className="bg-red-50 rounded-lg p-4 mt-4 border border-red-200">
          <div className="flex items-center gap-3">
            <FaMotorcycle className="text-red-600 text-2xl" />
            <div>
              <p className="font-bold text-gray-800">{order.driver}</p>
              <p className="text-sm text-gray-600">Your driver is on the way!</p>
            </div>
            <button className="ml-auto bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition flex items-center gap-2">
              <FaPhone size={12} /> Call
            </button>
          </div>
          {order.driverLocation && (
            <p className="text-sm text-gray-500 mt-2">📍 {order.driverLocation}</p>
          )}
        </div>
      )}

      {/* Delivery Address */}
      {order.customer && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">📍 {order.customer.address}</p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
