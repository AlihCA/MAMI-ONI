import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{state.itemCount} item{state.itemCount !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Size: <span className="font-medium">{item.size}</span> • 
                          Color: <span className="font-medium">{item.color}</span>
                        </p>
                        <p className="text-2xl font-bold text-black mt-2">
                          ₱{item.product.price}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 rounded-l-md"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-md"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ₱{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-between items-center pt-4">
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={20} />
                <span>Continue Shopping</span>
              </Link>
              
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₱{state.total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₱{(state.total * 0.08).toFixed(2)}</span>
              </div>
              
              <hr />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₱{(state.total * 1.08).toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6">
              <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter code"
                  className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:border-black"
                />
                <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="w-full bg-black text-white text-center py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors mt-6 block"
            >
              Proceed to Checkout
            </Link>

            {/* Security Badges */}
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span>🔒 Secure Checkout</span>
                <span>📦 Free Shipping</span>
                <span>↩️ Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;