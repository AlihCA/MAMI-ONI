import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  const categories = [
    {
      id: 'women',
      name: 'Women',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Trendy styles for every occasion',
      link: '/products/women'
    },
    {
      id: 'men',
      name: 'Men',
      image: 'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Sharp looks for the modern man',
      link: '/products/men'
    },
    {
      id: 'kids',
      name: 'Kids',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Playful and comfortable styles',
      link: '/products/kids'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Complete your perfect look',
      link: '/products/accessories'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections designed to match your unique style and lifestyle
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative overflow-hidden rounded-lg bg-gray-100 aspect-square hover:shadow-xl transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:transform group-hover:translate-y-[-4px] transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Link
            to="/products/plus-size"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 p-8 text-white hover:shadow-xl transition-all duration-300"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Plus Size Collection</h3>
              <p className="text-purple-100 mb-4">Beautiful styles in extended sizes</p>
              <span className="inline-flex items-center text-sm font-medium group-hover:underline">
                Shop Now →
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            to="/products?filter=eco"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-green-400 to-green-600 p-8 text-white hover:shadow-xl transition-all duration-300"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Eco-Friendly</h3>
              <p className="text-green-100 mb-4">Sustainable fashion for a better tomorrow</p>
              <span className="inline-flex items-center text-sm font-medium group-hover:underline">
                Explore →
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;