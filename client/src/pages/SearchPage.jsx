import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FaSearch, FaStar, FaClock, FaShoppingCart } from 'react-icons/fa';
import { products } from '../data/products';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [ingredient, setIngredient] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Get all unique ingredients
  const allIngredients = [];
  products.forEach(p => {
    const ingredients = p.ingredients.split(', ');
    ingredients.forEach(i => {
      if (!allIngredients.includes(i)) {
        allIngredients.push(i);
      }
    });
  });

  // Filter products
  const filteredProducts = products.filter(product => {
    // Filter by name
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Filter by category
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }

    // Filter by price
    const price = product.basePrice || product.price;
    if (price < priceRange.min || price > priceRange.max) {
      return false;
    }

    // Filter by ingredient
    if (ingredient && !product.ingredients.toLowerCase().includes(ingredient.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          🔍 Advanced Search
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Find your perfect dish by name, category, price, or ingredients
        </p>

        {/* Search Bar */}
        <div className="mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:border-red-800 focus:outline-none text-lg"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-800 font-medium"
            >
              {showFilters ? 'Hide Filters ▲' : 'Show Filters ▼'}
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-6 bg-gray-50 rounded-xl p-6 border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📂 Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  💰 Price Range (DA)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                    className="w-1/2 p-2 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 2000 })}
                    className="w-1/2 p-2 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Ingredient Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🧂 Ingredient
                </label>
                <input
                  type="text"
                  placeholder="e.g., chicken, cheese..."
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                />
              </div>

              {/* Reset Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setPriceRange({ min: 0, max: 2000 });
                    setIngredient('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition"
                >
                  🔄 Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-6">
          <p className="text-gray-600">
            Found <span className="font-bold text-red-800">{filteredProducts.length}</span> results
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredProducts.map(product => (
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
                      {product.name}
                    </h3>
                  </a>
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
                  <span className="text-xl font-bold text-red-800">
                    {product.basePrice || product.price} DA
                  </span>
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-600">No results found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
