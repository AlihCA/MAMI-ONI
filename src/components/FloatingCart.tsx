import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (state.itemCount === 0) return null;

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition-colors z-50 md:hidden"
      >
        <ShoppingCart size={24} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
          {state.itemCount}
        </span>
      </button>

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Cart Panel */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Shopping Cart ({state.itemCount})</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {state.items.map((item) => (
                <div key={item.id} className="flex space-x-3 bg-gray-50 rounded-lg p-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                    <p className="text-xs text-gray-600">
                      {item.size} • {item.color}
                    </p>
                    <p className="font-semibold text-sm">${item.product.price}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">${state.total.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-gray-100 text-center py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-black text-white text-center py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCart;