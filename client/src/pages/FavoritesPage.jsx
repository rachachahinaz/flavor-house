import React from 'react';
import Layout from '../components/Layout';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FaHeart, FaStar, FaClock, FaShoppingCart } from 'react-icons/fa';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { success, error } = useNotification();

  // Vérifier si l'utilisateur est connecté
  if (!isAuthenticated()) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="text-3xl font-bold text-gray-600">Login Required</h2>
            <p className="text-gray-400 mt-2">Please login to view your favorites</p>
            <a href="/login" className="inline-block mt-6 bg-red-800 text-white px-8 py-3 rounded-full hover:bg-red-900 transition">
              Login Now
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    success(`✅ ${product.name} added to cart!`);
  };

  if (favorites.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-3xl font-bold text-gray-600">No favorites yet</h2>
            <p className="text-gray-400 mt-2">Start adding your favorite dishes!</p>
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
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Your Favorites ❤️</h1>
          <p className="text-gray-500 mt-2">{favorites.length} items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden group">
              {/* Image - CORRIGÉE */}
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop';
                  }}
                />
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                  <FaHeart className="text-red-600 fill-current" size={20} />
                </div>
                
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'} size={14} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                </div>
                
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <FaClock className="mr-1" size={12} />
                  {product.time}
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <span className="text-xl font-bold text-red-800">{product.basePrice || product.price} DA</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-red-800 text-white px-4 py-2 rounded-full text-sm hover:bg-red-900 transition flex items-center gap-1"
                  >
                    <FaShoppingCart size={12} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FavoritesPage;
