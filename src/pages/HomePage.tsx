import React from 'react';
import Hero from '../components/Hero';
import FlashDeals from '../components/FlashDeals';
import CategoryGrid from '../components/CategoryGrid';
import NewArrivals from '../components/NewArrivals';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import Newsletter from '../components/Newsletter';
import CustomerTestimonials from '../components/CustomerTestimonials';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FlashDeals />
      <CategoryGrid />
      <NewArrivals />
      <PersonalizedRecommendations />
      <CustomerTestimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;