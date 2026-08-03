import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import OrderTracking from '../components/OrderTracking';

const HomePage = () => {
  const { currentOrder } = useOrder();
  const [showTracking, setShowTracking] = useState(false);

  const handleOrderNow = () => {
    if (currentOrder) {
      setShowTracking(!showTracking);
    } else {
      window.location.href = '/menu';
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-wider">
            FLAVOR HOUSE
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mt-2 font-light tracking-[0.3em]">
            RESTAURANT
          </p>
          <p className="text-lg md:text-xl text-white/80 mt-6 max-w-2xl mx-auto">
            Delicious Moments for Every Taste — Experience culinary excellence 
            crafted with passion and flair.
          </p>
          
          <div className="mt-10 space-x-4">
            {/* Order Now Button - Changé */}
            <button
              onClick={handleOrderNow}
              className="bg-red-700 hover:bg-red-800 text-white px-10 py-4 rounded-full text-lg font-semibold transition shadow-lg"
            >
              {currentOrder ? '📦 Track Order' : 'Order Now →'}
            </button>
            
            <a href="/menu">
              <button className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 rounded-full text-lg font-semibold transition">
                Explore Menu
              </button>
            </a>
          </div>

          {/* Order Tracking */}
          {showTracking && currentOrder && (
            <div className="mt-10">
              <OrderTracking order={currentOrder} />
              <button 
                onClick={() => setShowTracking(false)}
                className="mt-4 text-white underline hover:text-red-300"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
