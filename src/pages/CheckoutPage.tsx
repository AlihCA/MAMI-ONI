import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { state } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    saveInfo: false,
    marketing: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, name: 'Information', icon: '📧' },
    { id: 2, name: 'Shipping', icon: '📦' },
    { id: 3, name: 'Payment', icon: '💳' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    }

    if (step === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    }

    if (step === 3) {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      if (!formData.nameOnCard) newErrors.nameOnCard = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Process order
      alert('Order placed successfully!');
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No items to checkout</h1>
          <Link to="/products" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    currentStep >= step.id
                      ? 'bg-black border-black text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {currentStep > step.id ? <Check size={20} /> : <span>{step.icon}</span>}
                </div>
                <span
                  className={`ml-2 font-medium ${
                    currentStep >= step.id ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
                              errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
                              errors.lastName ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="marketing"
                            checked={formData.marketing}
                            onChange={handleInputChange}
                            className="text-black focus:ring-black"
                          />
                          <span className="text-sm text-gray-700">
                            Email me with news and offers
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
                              errors.city ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <select
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
                              errors.state ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select State</option>
                            <option value="MA">Manila</option>
                            <option value="NY">MAMI ONI</option>
                            <option value="TX">AA DADI</option>
                            <option value="FL">DADi ROB</option>
                            {/* Add more states */}
                          </select>
                          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
                              errors.zipCode ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                          >
                            <option value="United States">United States</option>
                            <option value="Canada">Philippines</option>
                            <option value="United Kingdom">Thailand</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Options */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <input type="radio" name="shipping" value="standard" defaultChecked className="text-black focus:ring-black" />
                          <div>
                            <div className="font-medium">Standard Shipping</div>
                            <div className="text-sm text-gray-600">5-7 business days</div>
                          </div>
                        </div>
                        <span className="font-semibold text-green-600">FREE</span>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <input type="radio" name="shipping" value="express" className="text-black focus:ring-black" />
                          <div>
                            <div className="font-medium">Express Shipping</div>
                            <div className="text-sm text-gray-600">2-3 business days</div>
                          </div>
                        </div>
                        <span className="font-semibold">₱47</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 1234 1234 1234"
                          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
                              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="nameOnCard"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
                            errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.nameOnCard && <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>}
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="saveInfo"
                            checked={formData.saveInfo}
                            onChange={handleInputChange}
                            className="text-black focus:ring-black"
                          />
                          <span className="text-sm text-gray-700">
                            Save payment information for future purchases
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Alternative Payment Methods */}
                  <div>
                    <div className="text-center text-gray-500 text-sm mb-4">Or pay with</div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        <span>🍎</span>
                        <span>Apple Pay</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        <span>📱</span>
                        <span>Google Pay</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Complete Order
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex space-x-3">
                  <div className="relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                    <p className="text-xs text-gray-600">{item.size} • {item.color}</p>
                    <p className="font-semibold text-sm">₱{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t pt-4">
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

            {/* Security Features */}
            <div className="mt-6 pt-6 border-t space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield size={16} className="text-green-600" />
                <span>Secure SSL encrypted payment</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck size={16} className="text-blue-600" />
                <span>Free shipping on orders over $50</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CreditCard size={16} className="text-purple-600" />
                <span>Multiple payment options accepted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;