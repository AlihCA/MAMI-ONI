import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const NewArrivals = () => {
  const newProducts = products.slice(0, 8);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              New Arrivals
            </h2>
            <p className="text-gray-600 max-w-md">
              Discover the latest trends and styles that just landed in our store
            </p>
          </div>
          
          <Link
            to="/products?filter=new"
            className="inline-flex items-center space-x-2 text-black font-medium hover:underline mt-4 md:mt-0"
          >
            <span>View All</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} showQuickView={true} />
          ))}
        </div>

        {/* Seasonal Collections */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Seasonal Collections
            </h3>
            <p className="text-gray-600">
              Curated collections for every season and occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/products?collection=summer"
              className="group text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                <span className="text-2xl">☀️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Summer Vibes</h4>
              <p className="text-sm text-gray-600">Light, breezy styles for warm days</p>
            </Link>

            <Link
              to="/products?collection=formal"
              className="group text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">👔</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Office Ready</h4>
              <p className="text-sm text-gray-600">Professional looks for work</p>
            </Link>

            <Link
              to="/products?collection=casual"
              className="group text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">👕</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Weekend Casual</h4>
              <p className="text-sm text-gray-600">Comfortable everyday essentials</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;