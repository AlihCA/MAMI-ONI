import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showQuickView = false }) => {
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const isInWishlist = wishlistState.items.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        size: product.sizes[0],
        color: product.colors[0],
      },
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_ITEM', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div 
        className="relative bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-2">
            {discountPercentage > 0 && (
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                -{discountPercentage}%
              </div>
            )}
            {product.category === 'new' && (
              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                NEW
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`absolute top-3 right-3 space-y-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full shadow-md transition-colors ${
                isInWishlist 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart size={16} className={isInWishlist ? 'fill-current' : ''} />
            </button>
            
            {showQuickView && (
              <button className="p-2 bg-white text-gray-600 hover:text-black rounded-full shadow-md transition-colors">
                <Eye size={16} />
              </button>
            )}
            
            <button
              onClick={handleAddToCart}
              className="p-2 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart size={16} />
            </button>
          </div>

          {/* Quick Actions on Hover */}
          {isHovered && (
            <div className="absolute bottom-3 left-3 right-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Quick Add
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating}/5 ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-black">
              ₱{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ₱{product.originalPrice}
              </span>
            )}
          </div>

          {/* Colors Preview */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Colors:</span>
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color) => (
                <div
                  key={color}
                  className={`w-4 h-4 rounded-full border border-gray-300 ${
                    color.toLowerCase() === 'black' ? 'bg-black' :
                    color.toLowerCase() === 'white' ? 'bg-white' :
                    color.toLowerCase() === 'navy' ? 'bg-blue-900' :
                    color.toLowerCase() === 'red' ? 'bg-red-500' :
                    color.toLowerCase() === 'blue' ? 'bg-blue-500' :
                    color.toLowerCase() === 'green' ? 'bg-green-500' :
                    color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? 'bg-gray-500' :
                    'bg-gray-300'
                  }`}
                  title={color}
                ></div>
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="text-sm text-green-600 font-medium">
            Free shipping
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;