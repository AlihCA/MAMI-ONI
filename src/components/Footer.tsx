import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Sustainability', href: '/sustainability' }
      ]
    },
    {
      title: 'Help',
      links: [
        { name: 'Customer Service', href: '/help' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns & Exchanges', href: '/returns' },
        { name: 'FAQ', href: '/faq' }
      ]
    },
    {
      title: 'Shop',
      links: [
        { name: 'Women', href: '/products/women' },
        { name: 'Men', href: '/products/men' },
        { name: 'Kids', href: '/products/kids' },
        { name: 'Accessories', href: '/products/accessories' },
        { name: 'Sale', href: '/products?filter=sale' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Accessibility', href: '/accessibility' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold">MAMI ONI</h2>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Your ultimate destination for trendy, high-quality fashion. We believe style should be accessible to everyone.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail size={16} />
                <span>support@MAMI.ONI</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} />
                <span>1-800-MAMI-ONI</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} />
                <span>123 Fashion Ave, Style City, SC 12345</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h4 className="font-semibold mb-3">We Accept</h4>
              <div className="flex space-x-4">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
                  <div
                    key={method}
                    className="bg-white text-gray-900 px-3 py-1 rounded text-xs font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-3 text-center md:text-right">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} MAMI.ONI. All rights reserved.</p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;