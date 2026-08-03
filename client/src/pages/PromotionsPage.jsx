import React from 'react';
import Layout from '../components/Layout';
import { promotions } from '../data/promotions';
import { FaTag, FaCalendar, FaCopy } from 'react-icons/fa';

const PromotionsPage = () => {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`✅ Promo code "${code}" copied!`);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-red-800 to-red-900 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">🎁 Promotions</h1>
        <p className="text-white/80 mt-2">Special offers just for you!</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map(promo => (
            <div key={promo.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden">
              <div className="bg-gradient-to-r from-red-100 to-orange-100 p-8 text-center">
                <div className="text-6xl">{promo.image}</div>
                <div className="mt-2">
                  <span className="bg-red-800 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {promo.discount}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{promo.title}</h3>
                <p className="text-gray-600 mt-2">{promo.description}</p>
                
                {/* Promo Code */}
                <div className="mt-4 flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                  <FaTag className="text-red-600" />
                  <code className="font-mono font-bold text-red-800 flex-1">{promo.code}</code>
                  <button 
                    onClick={() => copyCode(promo.code)}
                    className="bg-red-800 text-white px-3 py-1 rounded text-sm hover:bg-red-900 transition flex items-center gap-1"
                  >
                    <FaCopy size={12} /> Copy
                  </button>
                </div>
                
                {/* Products */}
                {promo.products.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Valid for:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {promo.products.map(p => (
                        <span key={p} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                  <FaCalendar /> Valid until: {promo.validUntil}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PromotionsPage;
