import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { products, getPriceWithSize, getAvailableSizes } from '../data/products';
import { getReviewsByProductId } from '../data/reviews';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FaStar, FaHeart, FaClock, FaShoppingCart, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated, user } = useAuth();
  const { success, error } = useNotification();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  // Trouver le produit
  const product = products.find(p => p.id === parseInt(id));
  
  // Obtenir les avis du produit
  const productReviews = product ? getReviewsByProductId(product.id) : [];

  // Initialiser la taille sélectionnée
  React.useEffect(() => {
    if (product && product.hasSize) {
      const sizes = getAvailableSizes(product);
      if (sizes.length > 0) {
        setSelectedSize(sizes[0].id);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-600">❌ Product not found</h2>
            <a href="/menu" className="inline-block mt-6 bg-red-800 text-white px-8 py-3 rounded-full hover:bg-red-900 transition">
              Back to Menu
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  // Calculer le prix selon la taille
  const currentPrice = product.hasSize && selectedSize
    ? getPriceWithSize(product, selectedSize)
    : product.basePrice;

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      error('🔐 Please login first to add items to cart!');
      navigate('/login');
      return;
    }
    
    let productToAdd = { ...product };
    if (product.hasSize && selectedSize) {
      productToAdd.price = currentPrice;
      productToAdd.size = selectedSize;
      productToAdd.name = `${product.name} (${selectedSize})`;
    } else {
      productToAdd.price = product.basePrice;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    success(`✅ ${quantity}x ${productToAdd.name} added to cart!`);
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated()) {
      error('🔐 Please login first to add favorites!');
      navigate('/login');
      return;
    }
    toggleFavorite(product);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'} size={16} />
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-red-800 transition mb-6"
        >
          <FaArrowLeft /> Back to Menu
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image - Corrigée avec <img> */}
          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl flex items-center justify-center h-96 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{product.name}</h1>
              <button 
                onClick={handleToggleFavorite}
                className="transition"
              >
                <FaHeart 
                  className={isFavorite(product.id) ? 'text-red-600 fill-current' : 'text-gray-400'} 
                  size={30}
                />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'} size={20} />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
              {productReviews.length > 0 && (
                <span className="text-sm text-gray-400 ml-2">• {productReviews.length} reviews</span>
              )}
            </div>

            {/* Price */}
            <div className="mt-4">
              <span className="text-3xl font-bold text-red-800">{currentPrice} DA</span>
            </div>

            {/* Size Selector */}
            {product.hasSize && (
              <div className="mt-4">
                <h3 className="font-bold text-gray-700 mb-2">Size</h3>
                <div className="flex gap-2">
                  {getAvailableSizes(product).map(size => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`px-4 py-2 rounded-full transition ${
                        selectedSize === size.id
                          ? 'bg-red-800 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mt-6">
              <h3 className="font-bold text-gray-700">Description</h3>
              <p className="text-gray-600 mt-1">{product.description}</p>
            </div>

            {/* Ingredients */}
            <div className="mt-4">
              <h3 className="font-bold text-gray-700">Ingredients</h3>
              <p className="text-gray-600 mt-1">🧂 {product.ingredients}</p>
            </div>

            {/* Time */}
            <div className="mt-4 flex items-center text-gray-600">
              <FaClock className="mr-2" />
              <span>Preparation time: {product.time}</span>
            </div>

            {/* Category */}
            <div className="mt-2">
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center transition"
                >
                  <FaMinus />
                </button>
                <span className="font-bold text-xl w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center transition"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="mt-6 w-full bg-red-800 text-white py-4 rounded-full font-bold text-lg hover:bg-red-900 transition flex items-center justify-center gap-2"
            >
              <FaShoppingCart /> Add {quantity}x to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t pt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">⭐ Customer Reviews</h2>
          
          {productReviews.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No reviews yet. Be the first to review this dish!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {productReviews.map(review => (
                <div key={review.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{review.avatar}</div>
                    <div>
                      <p className="font-bold text-gray-800">{review.user}</p>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
