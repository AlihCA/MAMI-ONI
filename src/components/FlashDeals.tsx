import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const FlashDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashDealProducts = products.filter(p => p.originalPrice).slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              ⚡ Flash Deals
            </h2>
            <p className="text-gray-600 max-w-md">
              Limited time offers on selected items. Don't miss out on these amazing deals!
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center space-x-4 bg-white rounded-lg p-4 shadow-md">
            <Clock className="text-red-500" size={24} />
            <div className="flex space-x-2">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-black text-white rounded-lg px-3 py-2 min-w-[60px]">
                    <span className="text-xl font-bold">{value.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 capitalize">{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {flashDealProducts.map((product) => (
            <ProductCard key={product.id} product={product} showQuickView={true} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/products?filter=sale"
            className="inline-flex items-center space-x-2 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            <span>View All Deals</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;