import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus, Share2 } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlistState.items.some(item => item.id === product.id);
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const productImages = [
    product.image,
    product.image, // In a real app, you'd have multiple images
    product.image,
    product.image
  ];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        size: selectedSize,
        color: selectedColor,
      },
    });

    // Add multiple quantities if more than 1
    for (let i = 1; i < quantity; i++) {
      cartDispatch({
        type: 'ADD_ITEM',
        payload: {
          product,
          size: selectedSize,
          color: selectedColor,
        },
      });
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_ITEM', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      comment: "I'm blown away by the quality and style! The fabric feels premium and the fit is perfect. Definitely worth every penny.",
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      name: 'Alex K.',
      rating: 4,
      comment: 'Good quality overall. The color is exactly as shown in the pictures. Fast shipping too!',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 3,
      name: 'Samantha D.',
      rating: 5,
      comment: 'Love this! The material is so comfortable and the design is trendy. Got many compliments wearing it.',
      date: '2024-01-05',
      verified: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-gray-900">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating}/5</span>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-black">₱{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      -{discountPercentage}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <hr />

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Select Colors</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor === color ? 'border-black' : 'border-gray-300'
                    } ${
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
                  />
                ))}
              </div>
              {selectedColor && (
                <p className="text-sm text-gray-600 mt-2">Selected: {selectedColor}</p>
              )}
            </div>

            <hr />

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Choose Size</h3>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border border-gray-300 rounded-md text-center font-medium ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-sm text-gray-600 mt-2">Selected: {selectedSize}</p>
              )}
            </div>

            <hr />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 border border-gray-300 rounded-md hover:bg-gray-50 ${
                    isInWishlist ? 'text-red-500' : 'text-gray-600'
                  }`}
                >
                  <Heart size={20} className={isInWishlist ? 'fill-current' : ''} />
                </button>
              </div>

              <button className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="text-green-600" size={24} />
                <div>
                  <p className="font-medium text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="text-blue-600" size={24} />
                <div>
                  <p className="font-medium text-sm">30-Day Returns</p>
                  <p className="text-xs text-gray-600">Easy returns policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="text-purple-600" size={24} />
                <div>
                  <p className="font-medium text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-600">SSL encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <button className="text-blue-600 hover:underline">Write a Review</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{review.name}</span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;