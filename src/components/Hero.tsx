import React from 'react';
import { Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Decorative Stars */}
            <div className="absolute top-20 left-10 hidden lg:block">
              <Star className="w-6 h-6 text-black fill-black" />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
                FIND CLOTHES
                <br />
                THAT MATCHES
                <br />
                YOUR STYLE
              </h1>
              
              <p className="text-gray-600 text-lg max-w-lg">
                Browse through our diverse range of meticulously crafted garments, designed
                to bring out your individuality and cater to your sense of style.
              </p>
              
              <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors transform hover:scale-105 duration-200">
                Shop Now
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
            
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-black">2,000+</div>
                <div className="text-gray-600 text-sm">High-Quality Products</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-black">30,000+</div>
                <div className="text-gray-600 text-sm">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            {/* Decorative Stars */}
            <div className="absolute top-10 right-10 hidden lg:block">
              <Star className="w-8 h-8 text-black fill-black" />
            </div>
            <div className="absolute bottom-20 right-20 hidden lg:block">
              <Star className="w-4 h-4 text-black fill-black" />
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Fashion models showcasing stylish clothing"
                className="w-full h-[500px] lg:h-[600px] object-cover rounded-lg shadow-2xl"
              />
              
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Logos Section */}
      <div className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
        </div>
      </div>
    </section>
  );
};

export default Hero;