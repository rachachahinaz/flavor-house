import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FaTrash, FaPlus, FaMinus, FaTruck, FaStore, FaCreditCard } from 'react-icons/fa';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getTotal, getItemCount, clearCart } = useCart();
  const { createOrder, assignDriver, updateOrderStatus, updateDriverLocation } = useOrder();
  const { isAuthenticated } = useAuth();
  const { success, error, info } = useNotification();
  
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [orderStep, setOrderStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    location: ''
  });

  // Vérifier si l'utilisateur est connecté
  if (!isAuthenticated()) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="text-3xl font-bold text-gray-600">Login Required</h2>
            <p className="text-gray-400 mt-2">Please login to view your cart</p>
            <a href="/login" className="inline-block mt-6 bg-red-800 text-white px-8 py-3 rounded-full hover:bg-red-900 transition">
              Login Now
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  const subtotal = getTotal();
  const deliveryFee = deliveryMethod === 'delivery' ? 200 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (deliveryMethod === 'delivery') {
      if (!formData.name || !formData.phone || !formData.address) {
        error('❌ Please fill all delivery details');
        return;
      }
    }
    
    const newOrder = createOrder(cartItems, total, deliveryMethod, formData);
    success('✅ Order placed successfully! You can track it on the home page!');
    
    setTimeout(() => {
      const drivers = ['Ahmed 🛵', 'Karim 🛵', 'Said 🛵', 'Youssef 🛵'];
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
      assignDriver(newOrder.id, randomDriver);
      info(`🛵 Driver ${randomDriver} assigned to your order!`);
      
      setTimeout(() => {
        updateDriverLocation(newOrder.id, 'Near your location 📍');
      }, 2000);
    }, 3000);
    
    setTimeout(() => {
      updateOrderStatus(newOrder.id, 'preparing');
      info('👨‍🍳 Your order is being prepared!');
    }, 5000);
    setTimeout(() => {
      updateOrderStatus(newOrder.id, 'ready');
      info('✅ Your order is ready!');
    }, 10000);
    setTimeout(() => {
      updateOrderStatus(newOrder.id, 'out_for_delivery');
      info('🛵 Your order is out for delivery!');
    }, 15000);
    
    setOrderStep(2);
    
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handlePayOnline = () => {
    if (cartItems.length === 0) {
      error('❌ Your cart is empty!');
      return;
    }
    navigate('/payment');
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-600">🛒 Your cart is empty</h2>
            <p className="text-gray-400 mt-2">Add some delicious food!</p>
            <a href="/menu" className="inline-block mt-6 bg-red-800 text-white px-8 py-3 rounded-full hover:bg-red-900 transition">
              Browse Menu
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">Your Cart 🛒</h1>
        <p className="text-center text-gray-500 mt-2">{getItemCount()} items</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-0">
                  {/* Image - CORRIGÉE */}
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';
                      }}
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-red-800 font-bold">{item.price} DA</p>
                    {item.size && (
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                    )}
                  </div>
                  
                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center transition"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="font-bold w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center transition"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="font-bold text-gray-800 min-w-[80px] text-right">
                    {item.price * item.quantity} DA
                  </div>
                  
                  {/* Remove */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{subtotal} DA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">{deliveryFee} DA</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-red-800">{total} DA</span>
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Delivery Method</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition ${
                      deliveryMethod === 'delivery' 
                        ? 'border-red-800 bg-red-50' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <FaTruck className={deliveryMethod === 'delivery' ? 'text-red-800' : 'text-gray-400'} />
                    <span className="font-medium">Delivery</span>
                    <span className="text-sm text-gray-500 ml-auto">+200 DA</span>
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition ${
                      deliveryMethod === 'pickup' 
                        ? 'border-red-800 bg-red-50' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <FaStore className={deliveryMethod === 'pickup' ? 'text-red-800' : 'text-gray-400'} />
                    <span className="font-medium">Pickup</span>
                    <span className="text-sm text-gray-500 ml-auto">Free</span>
                  </button>
                </div>
              </div>

              {/* Delivery Form */}
              {deliveryMethod === 'delivery' && (
                <div className="mt-4 space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Delivery Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location (Google Maps link)"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                  />
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full mt-3 bg-red-800 text-white py-3 rounded-full font-bold hover:bg-red-900 transition"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handlePayOnline}
                className="w-full mt-3 bg-green-600 text-white py-3 rounded-full font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <FaCreditCard /> Pay Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

