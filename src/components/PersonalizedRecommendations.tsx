import React from 'react';
import { User, Sparkles, TrendingUp } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const PersonalizedRecommendations = () => {
  const justForYou = products.slice(0, 4);
  const recentlyViewed = products.slice(4, 8);
  const trending = products.filter(p => p.rating >= 4.5).slice(0, 4);

  const RecommendationSection = ({ 
    title, 
    subtitle, 
    icon: Icon, 
    products: sectionProducts, 
    bgColor 
  }: {
    title: string;
    subtitle: string;
    icon: any;
    products: any[];
    bgColor: string;
  }) => (
    <div className={`${bgColor} rounded-lg p-6`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-white rounded-full p-2">
          <Icon size={20} className="text-gray-800" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-white/80 text-sm">{subtitle}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sectionProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Picked Just for You
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered recommendations based on your preferences and browsing history
          </p>
        </div>

        {/* Recommendation Sections */}
        <div className="space-y-12">
          <RecommendationSection
            title="Just for You"
            subtitle="Personalized picks based on your style"
            icon={User}
            products={justForYou}
            bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
          />

          <RecommendationSection
            title="Recently Viewed"
            subtitle="Items you've been checking out"
            icon={Sparkles}
            products={recentlyViewed}
            bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
          />

          <RecommendationSection
            title="Trending Now"
            subtitle="What everyone is loving right now"
            icon={TrendingUp}
            products={trending}
            bgColor="bg-gradient-to-r from-green-500 to-green-600"
          />
        </div>

        {/* Style Quiz CTA */}
        <div className="mt-16 bg-gray-900 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Get Even Better Recommendations
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Take our quick style quiz to help us understand your preferences better and get more personalized product suggestions.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Take Style Quiz
          </button>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedRecommendations;