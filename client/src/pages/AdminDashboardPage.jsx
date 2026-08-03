import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUtensils, 
  FaTags, 
  FaUsers, 
  FaShoppingCart, 
  FaStar, 
  FaChartLine, 
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { products } from '../data/products';
import { promotions } from '../data/promotions';
import { reviews } from '../data/reviews';

// Charger les produits depuis localStorage
const loadSavedProducts = () => {
  const saved = localStorage.getItem('adminProducts');
  if (saved) {
    const savedProducts = JSON.parse(saved);
    savedProducts.forEach(p => {
      if (!products.find(existing => existing.id === p.id)) {
        products.push(p);
      }
    });
  }
  return products;
};

// Charger au démarrage
loadSavedProducts();

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: ''
  });

  // Vérifier si admin est connecté
  const isAdmin = localStorage.getItem('adminAuth') === 'true';
  
  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Statistiques
  const stats = {
    totalOrders: 156,
    totalRevenue: 187500,
    totalProducts: products.length,
    totalCustomers: 234,
    todayOrders: 12,
    bestSeller: 'Pizza Blanche'
  };

  // Données des commandes récentes
  const recentOrders = [
    { id: 1001, customer: 'Ahmed K.', total: 2450, status: 'delivered', date: '2024-12-15' },
    { id: 1002, customer: 'Sofia M.', total: 1850, status: 'out_for_delivery', date: '2024-12-15' },
    { id: 1003, customer: 'Karim B.', total: 3200, status: 'preparing', date: '2024-12-15' },
    { id: 1004, customer: 'Leila R.', total: 950, status: 'received', date: '2024-12-14' },
    { id: 1005, customer: 'Youssef H.', total: 2750, status: 'delivered', date: '2024-12-14' },
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
      ready: 'Ready',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered'
    };
    return labels[status] || status;
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('❌ Please fill all required fields (Name, Price, Category)');
      return;
    }

    const product = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      basePrice: parseInt(newProduct.price),
      rating: 4.0,
      time: '15 min',
      image: newProduct.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
      ingredients: 'To be added',
      description: 'Delicious ' + newProduct.name,
      hasSize: false,
      sizeType: null
    };

    products.push(product);
    
    const savedProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    savedProducts.push(product);
    localStorage.setItem('adminProducts', JSON.stringify(savedProducts));
    
    alert(`✅ Product "${newProduct.name}" added successfully!`);
    setNewProduct({ name: '', price: '', category: '', image: '' });
    setShowAddForm(false);
    setEditingProduct(null);
    window.location.reload();
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.basePrice || product.price,
      category: product.category,
      image: product.image || ''
    });
    setShowAddForm(true);
    // Scroll vers le haut pour voir le formulaire
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('❌ Please fill all fields');
      return;
    }

    const index = products.findIndex(p => p.id === editingProduct.id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        name: newProduct.name,
        category: newProduct.category,
        basePrice: parseInt(newProduct.price),
        image: newProduct.image || products[index].image,
      };
      
      const savedProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
      const savedIndex = savedProducts.findIndex(p => p.id === editingProduct.id);
      if (savedIndex !== -1) {
        savedProducts[savedIndex] = products[index];
        localStorage.setItem('adminProducts', JSON.stringify(savedProducts));
      }
      
      alert(`✅ Product "${newProduct.name}" updated!`);
      setEditingProduct(null);
      setNewProduct({ name: '', price: '', category: '', image: '' });
      setShowAddForm(false);
      window.location.reload();
    }
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`🗑️ Delete ${name}?`)) {
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        
        const savedProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
        const newSaved = savedProducts.filter(p => p.id !== id);
        localStorage.setItem('adminProducts', JSON.stringify(newSaved));
        
        alert(`✅ ${name} deleted!`);
        window.location.reload();
      }
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <FaShoppingCart className="text-red-800" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Revenue</p>
                    <p className="text-3xl font-bold text-green-600">{stats.totalRevenue} DA</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaChartLine className="text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Products</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUtensils className="text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Customers</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalCustomers}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaUsers className="text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                <span className="text-sm text-gray-500">Today: {stats.todayOrders} orders</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-gray-600">Order ID</th>
                      <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                      <th className="text-left py-3 px-4 text-gray-600">Total</th>
                      <th className="text-left py-3 px-4 text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">#{order.id}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4 font-bold text-red-800">{order.total} DA</td>
                        <td className="py-3 px-4">
                          <span className={`${getStatusColor(order.status)} text-white text-xs px-3 py-1 rounded-full`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-500">{order.date}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">🏆 Best Selling Product</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.bestSeller}</p>
                </div>
                <div className="text-4xl">🍕</div>
              </div>
            </div>
          </>
        );

      case 'products':
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">📦 Products ({products.length})</h2>
              <button 
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  if (!showAddForm) {
                    setEditingProduct(null);
                    setNewProduct({ name: '', price: '', category: '', image: '' });
                  }
                }}
                className="bg-red-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-900 transition flex items-center gap-2"
              >
                <FaPlus /> {showAddForm ? 'Cancel' : 'Add Product'}
              </button>
            </div>

            {/* Add/Edit Product Form - EN HAUT (visible) */}
            {showAddForm && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border-2 border-blue-300">
                <h3 className="font-bold text-gray-700 mb-3 text-lg">
                  {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    placeholder="Product Name *" 
                    className="p-2 border rounded-lg focus:border-red-800 focus:outline-none"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                  <input 
                    placeholder="Price (DA) *" 
                    type="number"
                    className="p-2 border rounded-lg focus:border-red-800 focus:outline-none"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                  
                  <select 
                    className="p-2 border rounded-lg focus:border-red-800 focus:outline-none bg-white"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    <option value="">📂 Select Category *</option>
                    <option value="Pizza">🍕 Pizza</option>
                    <option value="Burger">🍔 Burger</option>
                    <option value="Tacos">🌮 Tacos</option>
                    <option value="Sandwich">🥪 Sandwich</option>
                    <option value="Pasta">🍝 Pasta</option>
                    <option value="Meals">🍗 Meals</option>
                    <option value="Salads">🥗 Salads</option>
                    <option value="Drinks">🥤 Drinks</option>
                    <option value="Desserts">🍰 Desserts</option>
                  </select>
                  
                  <input 
                    placeholder="Image URL (optional)" 
                    className="p-2 border rounded-lg focus:border-red-800 focus:outline-none"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  />
                </div>
                <div className="mt-3 flex gap-2">
                  <button 
                    onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                  >
                    {editingProduct ? '✅ Update Product' : '✅ Save Product'}
                  </button>
                  <button 
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingProduct(null);
                      setNewProduct({ name: '', price: '', category: '', image: '' });
                    }}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
                {editingProduct && (
                  <p className="text-sm text-blue-600 mt-2">✏️ Editing: {editingProduct.name}</p>
                )}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600">Image</th>
                    <th className="text-left py-3 px-4 text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 text-gray-600">Category</th>
                    <th className="text-left py-3 px-4 text-gray-600">Price</th>
                    <th className="text-left py-3 px-4 text-gray-600">Rating</th>
                    <th className="text-left py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';
                          }}
                        />
                      </td>
                      <td className="py-3 px-4 font-medium">{product.name}</td>
                      <td className="py-3 px-4 text-gray-600">{product.category}</td>
                      <td className="py-3 px-4 font-bold text-red-800">{product.basePrice || product.price} DA</td>
                      <td className="py-3 px-4 text-yellow-500">⭐ {product.rating}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button 
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleEditProduct(product)}
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📋 All Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-gray-600">Total</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">#{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4 font-bold text-red-800">{order.total} DA</td>
                      <td className="py-3 px-4">
                        <span className={`${getStatusColor(order.status)} text-white text-xs px-3 py-1 rounded-full`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{order.date}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">👥 Customers</h2>
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">👥</div>
              <p className="text-lg">Customer management coming soon</p>
              <p className="text-sm">Total customers: {stats.totalCustomers}</p>
            </div>
          </div>
        );

      case 'promotions':
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">🎁 Promotions ({promotions.length})</h2>
              <button className="bg-red-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-900 transition flex items-center gap-2">
                <FaPlus /> Add Promotion
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promotions.map(promo => (
                <div key={promo.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{promo.image}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{promo.title}</h3>
                      <p className="text-sm text-gray-600">{promo.description}</p>
                      <p className="text-sm text-red-600 font-bold mt-1">{promo.discount}</p>
                      <p className="text-xs text-gray-400">Code: {promo.code}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2 justify-end">
                    <button className="text-blue-600 hover:text-blue-800 text-sm"><FaEdit /></button>
                    <button className="text-red-600 hover:text-red-800 text-sm"><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">⭐ Reviews ({reviews.length})</h2>
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{review.avatar}</div>
                    <div>
                      <p className="font-bold text-gray-800">{review.user}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < review.rating ? '⭐' : '☆'}</span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">Product ID: {review.productId}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <p>Coming soon...</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg overflow-y-auto">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-red-800">👑 Admin</h1>
          <p className="text-sm text-gray-500">Dashboard</p>
        </div>
        
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'dashboard' ? 'bg-red-800 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaChartLine /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'orders' ? 'bg-red-800 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaShoppingCart /> Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'products' ? 'bg-red-800 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaUtensils /> Products
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'customers' ? 'bg-red-800 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaUsers /> Customers
          </button>
          <button
            onClick={() => setActiveTab('promotions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'promotions' ? 'bg-red-800 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaTags /> Promotions
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'reviews' ? 'bg-red-800 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaStar /> Reviews
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === 'dashboard' && '📊 Dashboard'}
            {activeTab === 'orders' && '📋 Orders'}
            {activeTab === 'products' && '📦 Products'}
            {activeTab === 'customers' && '👥 Customers'}
            {activeTab === 'promotions' && '🎁 Promotions'}
            {activeTab === 'reviews' && '⭐ Reviews'}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Welcome back, Admin</span>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
