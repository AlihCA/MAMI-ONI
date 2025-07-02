import React, { useState } from 'react';
import { Mail, Gift, Truck, Shield, HeadphonesIcon } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: 'Exclusive Offers',
      description: 'Get access to member-only deals and early sales'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50 worldwide'
    },
    {
      icon: Shield,
      title: 'Easy Returns',
      description: '30-day hassle-free return policy'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer service support'
    }
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Signup */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for the latest trends, exclusive offers, and style inspiration delivered to your inbox.
          </p>

          <div className="max-w-md mx-auto">
            {isSubscribed ? (
              <div className="bg-green-500 text-white py-3 px-6 rounded-full font-medium">
                ✓ Successfully subscribed! Check your email.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-l-full focus:outline-none focus:border-white transition-colors text-white placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-black px-8 py-3 rounded-r-full font-medium hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          <p className="text-gray-400 text-sm mt-4">
            Join 100,000+ fashion lovers who never miss a beat
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-700 transition-colors">
                <benefit.icon size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Special Offer */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            🎉 New Subscriber Special
          </h3>
          <p className="text-lg mb-6">
            Get 20% off your first order when you subscribe to our newsletter
          </p>
          <div className="inline-flex items-center space-x-4 bg-white bg-opacity-20 rounded-full py-2 px-6">
            <span className="font-mono text-xl font-bold">WELCOME20</span>
            <button className="text-sm hover:underline">Copy Code</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;