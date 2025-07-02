import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  ChevronDown,
  Globe,
} from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import NotificationIcon from "./NotificationIcon";

import { isClerkConfigured } from "../lib/clerk";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const navigate = useNavigate();

  const categories = {
    Women: ["Dresses", "Tops", "Bottoms", "Shoes", "Accessories"],
    Men: ["Shirts", "Pants", "Shoes", "Accessories", "Suits"],
    Kids: ["Girls", "Boys", "Baby", "Shoes", "Accessories"],
    "Plus Size": ["Dresses", "Tops", "Bottoms", "Activewear"],
    Accessories: ["Bags", "Jewelry", "Watches", "Sunglasses"],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-black text-white text-center py-2 px-4 text-sm">
        
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-black">
                {import.meta.env.VITE_APP_NAME || "MAMI.ONI"}
              </h1>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              <div
                className="relative"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <button className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                  Shop <ChevronDown size={16} className="ml-1" />
                </button>

                {showCategories && (
                  <div className="absolute top-full left-0 mt-1 w-96 bg-white border border-gray-200 rounded-lg shadow-lg p-6 grid grid-cols-2 gap-6">
                    {Object.entries(categories).map(
                      ([category, subcategories]) => (
                        <div key={category}>
                          <Link
                            to={`/products/${category
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="font-semibold text-gray-900 hover:text-black block mb-2"
                          >
                            {category}
                          </Link>
                          <ul className="space-y-1">
                            {subcategories.map((sub) => (
                              <li key={sub}>
                                <Link
                                  to={`/products/${category
                                    .toLowerCase()
                                    .replace(" ", "-")}/${sub.toLowerCase()}`}
                                  className="text-sm text-gray-600 hover:text-gray-900 block"
                                >
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              <Link
                to="/products?filter=sale"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                On Sale
              </Link>
              <Link
                to="/products?filter=new"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                to="/products?filter=brands"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Top Selling
              </Link>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all"
                />
              </form>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Country/Language Selector */}
              <button className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <Globe size={18} />
                <span className="text-sm">EN</span>
              </button>

              {/* Search Icon - Mobile */}
              <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Heart size={20} />
                {wishlistState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {wishlistState.itemCount}
                  </span>
                )}
              </Link>
    

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart size={20} />
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartState.itemCount}
                  </span>
                )}
              </Link>

              {/* Notif */}
           
              <NotificationIcon />
        
        
              {/* User Account - Clerk Integration */}
              {isClerkConfigured() ? (
                <div className="flex items-center space-x-2">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <User size={20} />
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                        },
                      }}
                    />
                  </SignedIn>
                </div>
              ) : (
                <Link
                  to="/account"
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <User size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Object.keys(categories).map((category) => (
                <Link
                  key={category}
                  to={`/products/${category.toLowerCase().replace(" ", "-")}`}
                  className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
              <Link
                to="/products?filter=sale"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                On Sale
              </Link>
              <Link
                to="/products?filter=new"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                New Arrivals
              </Link>

              {/* Mobile Search */}
              <div className="px-3 py-2">
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
