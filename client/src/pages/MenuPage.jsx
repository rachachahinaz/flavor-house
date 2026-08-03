import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import { FaStar, FaHeart, FaClock, FaShoppingCart } from 'react-icons/fa';
import { categories, products, getPriceWithSize, getAvailableSizes } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const MenuPage = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState({});
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { success, error } = useNotification();
  const isRTL = i18n.language === 'ar';

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    if (!isAuthenticated()) {
      error(t('notifications.loginRequired'));
      window.location.href = '/login';
      return;
    }
    
    let productToAdd = { ...product };
    if (product.hasSize) {
      const sizeId = selectedSize[product.id] || getAvailableSizes(product)[0]?.id;
      productToAdd.price = getPriceWithSize(product, sizeId);
      productToAdd.size = sizeId;
      productToAdd.name = `${product.name} (${sizeId})`;
    } else {
      productToAdd.price = product.basePrice;
    }
    
    addToCart(productToAdd);
    success(`✅ ${productToAdd.name} ${t('notifications.addedToCart')}`);
  };

  const handleToggleFavorite = (product) => {
    if (!isAuthenticated()) {
      error(t('notifications.loginRequiredFav'));
      window.location.href = '/login';
      return;
    }
    toggleFavorite(product);
  };

  const getCategoryLabel = (cat) => {
    if (cat === 'All') return t('menu.all');
    const key = cat.toLowerCase();
    return t(`menu.categories.${key}`, cat);
  };

  // Product name translations
  const getProductName = (product) => {
    return t(`products.${product.name}`, product.name);
  };

  return (
    <Layout>
      <div className={`bg-gradient-to-r from-red-800 to-red-900 py-16 px-4 text-center ${isRTL ? 'rtl' : ''}`}>
        <h1 className="text-4xl md:text-5xl font-bold text-white">{t('menu.title')}</h1>
        <p className="text-white/80 mt-2">{t('menu.subtitle')}</p>
      </div>

      <div className={`max-w-6xl mx-auto px-4 py-8 ${isRTL ? 'rtl' : ''}`}>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-red-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredProducts.map(product => {
            const currentSizeId = selectedSize[product.id] || getAvailableSizes(product)[0]?.id;
            const currentPrice = product.hasSize 
              ? getPriceWithSize(product, currentSizeId)
              : product.basePrice;

            return (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden group">
                <a href={`/product/${product.id}`}>
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                </a>
                
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <a href={`/product/${product.id}`} className="block flex-1">
                      <h3 className="font-bold text-lg text-gray-800 hover:text-red-800 transition">
                        {getProductName(product)}
                      </h3>
                    </a>
                    <button 
                      onClick={() => handleToggleFavorite(product)}
                      className="transition ml-2"
                    >
                      <FaHeart 
                        className={isFavorite(product.id) ? 'text-red-600 fill-current' : 'text-gray-400'} 
                        size={20}
                      />
                    </button>
                  </div>
                  
                  {product.hasSize && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {getAvailableSizes(product).map(size => (
                        <button
                          key={size.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSize(prev => ({ ...prev, [product.id]: size.id }));
                          }}
                          className={`text-xs px-2 py-0.5 rounded-full transition ${
                            (selectedSize[product.id] || getAvailableSizes(product)[0]?.id) === size.id
                              ? 'bg-red-800 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'} size={14} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{t(`products.${product.name}_desc`, product.description)}</p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">🧂 {product.ingredients}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <FaClock className="mr-1" size={12} />
                    {product.time}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <span className="text-xl font-bold text-red-800">{currentPrice} {t('common.currency')}</span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-red-800 text-white px-4 py-2 rounded-full text-sm hover:bg-red-900 transition flex items-center gap-1"
                    >
                      <FaShoppingCart size={12} /> {t('menu.add')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default MenuPage;
