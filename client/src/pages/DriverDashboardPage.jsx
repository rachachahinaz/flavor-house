import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMotorcycle, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaCheck, 
  FaClock, 
  FaUser, 
  FaSignOutAlt,
  FaTruck
} from 'react-icons/fa';

const DriverDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assigned');

  // Vérifier si driver est connecté
  const isDriver = localStorage.getItem('driverAuth') === 'true';
  const driverName = localStorage.getItem('driverName') || 'Driver';
  
  if (!isDriver) {
    navigate('/driver/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('driverAuth');
    localStorage.removeItem('driverName');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Assigned orders (mock data)
  const assignedOrders = [
    { 
      id: 1001, 
      customer: 'Ahmed K.', 
      phone: '0555 123 456',
      address: '123 Rue Didouche Mourad, Algiers',
      items: ['Pizza Blanche x2', 'Coca Cola x1'],
      total: 2450,
      status: 'ready',
      time: '15 min ago'
    },
    { 
      id: 1002, 
      customer: 'Sofia M.', 
      phone: '0555 789 012',
      address: '45 Rue des Fusillés, Algiers',
      items: ['Cheeseburger x3', 'Fanta x2'],
      total: 1850,
      status: 'preparing',
      time: '5 min ago'
    }
  ];

  // In progress orders
  const inProgressOrders = [
    {
      id: 1003,
      customer: 'Karim B.',
      phone: '0555 345 678',
      address: '78 Rue de la Liberté, Algiers',
      items: ['Mixed Grill x1', 'Sprite x1'],
      total: 3200,
      status: 'out_for_delivery',
      time: '30 min ago',
      driverLocation: 'Near customer'
    }
  ];

  // Delivered orders (past)
  const deliveredOrders = [
    {
      id: 1004,
      customer: 'Leila R.',
      phone: '0555 901 234',
      address: '12 Rue de l\'Indépendance, Algiers',
      total: 950,
      status: 'delivered',
      time: '1 hour ago'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      received: 'bg-blue-500',
      preparing: 'bg-yellow-500',
      ready: 'bg-purple-500',
      out_for_delivery: 'bg-orange-500',
      delivered: 'bg-green-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusLabel = (status) => {
    const labels = {
      received: 'Received',
      preparing: 'Preparing',
      ready: 'Ready to Pick',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered ✓'
    };
    return labels[status] || status;
  };

  const handleCallCustomer = (phone) => {
    alert(`📞 Calling ${phone}...`);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    alert(`✅ Order #${orderId} status updated to: ${getStatusLabel(newStatus)}`);
  };

  // Fonction pour afficher le contenu selon l'onglet
  const renderOrders = (orders, type) => {
    if (orders.length === 0) {
      return (
        <div className="text-center py-12 text-gray-400">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-lg">No {type} orders</p>
        </div>
      );
    }

    return orders.map(order => (
      <div key={order.id} className="bg-white rounded-xl shadow-md p-6 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg">Order #{order.id}</span>
              <span className={`${getStatusColor(order.status)} text-white text-xs px-3 py-1 rounded-full`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            <p className="text-gray-500 text-sm">{order.time}</p>
          </div>
          <span className="text-xl font-bold text-red-800">{order.total} DA</span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FaUser className="text-gray-400" />
              <span className="font-medium">{order.customer}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <FaMapMarkerAlt className="text-gray-400" />
              <span className="text-sm text-gray-600">{order.address}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <FaPhone className="text-gray-400" />
              <span className="text-sm text-gray-600">{order.phone}</span>
            </div>
            {order.driverLocation && (
              <div className="flex items-center gap-2 mt-1">
                <FaMotorcycle className="text-orange-600" />
                <span className="text-sm text-green-600">{order.driverLocation}</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600">Items:</p>
            {order.items && order.items.map((item, i) => (
              <p key={i} className="text-sm">• {item}</p>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-3 flex-wrap">
          <button 
            onClick={() => handleCallCustomer(order.phone)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm transition flex items-center gap-2"
          >
            <FaPhone size={12} /> Call Customer
          </button>
          {order.status === 'ready' && (
            <button 
              onClick={() => handleUpdateStatus(order.id, 'out_for_delivery')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition flex items-center gap-2"
            >
              <FaTruck size={12} /> Start Delivery
            </button>
          )}
          {order.status === 'out_for_delivery' && (
            <button 
              onClick={() => handleUpdateStatus(order.id, 'delivered')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm transition flex items-center gap-2"
            >
              <FaCheck size={12} /> Mark as Delivered
            </button>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <FaMotorcycle className="text-red-800 text-3xl" />
            <div>
              <h1 className="text-xl font-bold text-red-800">Driver</h1>
              <p className="text-sm text-gray-500">{driverName}</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('assigned')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'assigned' ? 'bg-red-800 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaTruck /> Assigned Orders
          </button>
          <button
            onClick={() => setActiveTab('inprogress')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'inprogress' ? 'bg-red-800 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaClock /> In Progress
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'delivered' ? 'bg-red-800 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaCheck /> Delivered
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-red-100 text-red-600 mt-4"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === 'assigned' && '📦 Assigned Orders'}
            {activeTab === 'inprogress' && '🔄 In Progress'}
            {activeTab === 'delivered' && '✅ Delivered'}
          </h1>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow">
            <FaMotorcycle className="text-red-600" />
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-gray-500 text-sm">Assigned</p>
            <p className="text-2xl font-bold text-gray-800">{assignedOrders.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-gray-500 text-sm">In Progress</p>
            <p className="text-2xl font-bold text-orange-600">{inProgressOrders.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-gray-500 text-sm">Delivered Today</p>
            <p className="text-2xl font-bold text-green-600">{deliveredOrders.length}</p>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'assigned' && renderOrders(assignedOrders, 'assigned')}
        {activeTab === 'inprogress' && renderOrders(inProgressOrders, 'in progress')}
        {activeTab === 'delivered' && renderOrders(deliveredOrders, 'delivered')}
      </div>
    </div>
  );
};

// ⚠️ IMPORTANT: Cette ligne doit être là!
export default DriverDashboardPage;
