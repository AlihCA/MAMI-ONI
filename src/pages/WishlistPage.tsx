import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const moveToCart = (product: any) => {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        size: product.sizes[0],
        color: product.colors[0],
      },
    });
    wishlistDispatch({ type: 'REMOVE_ITEM', payload: product.id });
  };

  const removeFromWishlist = (productId: string) => {
    wishlistDispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const clearWishlist = () => {
    wishlistDispatch({ type: 'CLEAR_WISHLIST' });
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Heart className="mx-auto h-24 w-24 text-gray-400 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8">
            Save items you love to your wishlist. Review them anytime and easily move them to your bag.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {wishlistState.itemCount} item{wishlistState.itemCount !== 1 ? 's' : ''} saved
            </p>
          </div>
          
          {wishlistState.items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-800 font-medium mt-4 sm:mt-0"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistState.items.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              
              {/* Overlay Actions */}
              <div className="absolute top-4 right-4 space-y-2">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="p-2 bg-white text-red-500 rounded-full shadow-md hover:bg-red-50 transition-colors"
                  title="Remove from wishlist"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => moveToCart(product)}
                  className="w-full bg-black text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={16} />
                  <span>Move to Cart</span>
                </button>
                
                <Link
                  to={`/product/${product.id}`}
                  className="block w-full text-center bg-gray-100 text-gray-900 py-2 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <p className="text-gray-600 mb-8">Based on items in your wishlist</p>
          
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              <span>Browse More Products</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;