'use client';

import { useState } from 'react';
import { ShoppingCart, MapPin, Phone, ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";
// Mock KHQR Payment Component
const MockKHQRPayment = ({ amount }: { amount: number }) => {
  const khqrPayload = `
    000201
    010212
    29370016merchant@bank
    52040000
    5303840
    540${amount}
    5802KH
    5911Liikaa Store
    6009Phnom Penh
    6304FFFF
  `;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="220" height="220" fill="white" />
        <g transform="translate(10, 10)">
          {/* Simple QR-like pattern for demo */}
          {Array.from({ length: 20 }).map((_, i) =>
            Array.from({ length: 20 }).map((_, j) => (
              <rect
                key={`${i}-${j}`}
                x={i * 10}
                y={j * 10}
                width="10"
                height="10"
                fill={Math.random() > 0.5 ? 'black' : 'white'}
              />
            ))
          )}
        </g>
      </svg>

      <p className="text-sm text-red-500 font-medium text-center">
        Demo KHQR (Mock Payment)
      </p>
    </div>
  );
};

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    // Contact Information
    phone: '',
    
    // Shipping Address
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Cambodia',
  });

  const [showPayment, setShowPayment] = useState(false);

  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 79.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10.00;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayNow = () => {
    console.log('Proceeding to payment:', formData);
    setShowPayment(true);
  };
const router = useRouter();
  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setShowPayment(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Checkout</span>
          </button>

          {/* Payment Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent mb-2">
                Complete Your Payment
              </h1>
              <p className="text-gray-600">Scan the QR code with your banking app</p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-8">
              <MockKHQRPayment amount={total} />
            </div>

            {/* Payment Details */}
            <div className="bg-gradient-to-r from-purple-50 to-green-50 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Amount to Pay:</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Merchant:</span>
                  <span className="font-semibold">Liikaa Store</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Location:</span>
                  <span className="font-semibold">Phnom Penh, Cambodia</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Payment Instructions:</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Open your mobile banking app</li>
                <li>Select "Scan QR" or "KHQR Payment"</li>
                <li>Scan the QR code above</li>
                <li>Confirm the payment amount</li>
                <li>Complete the transaction</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
     <button
            onClick={() => router.push("/products")}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Products</span>
          </button>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Forms */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    placeholder="+855 12 345 678"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Shipping Address</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                        placeholder="Sok"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                        placeholder="Dara"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                      placeholder="Street 123, Sangkat BKK1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                        placeholder="Phnom Penh"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Khan/Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                        placeholder="Chamkarmon"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                        placeholder="12000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button - Mobile */}
              <button
                onClick={handlePayNow}
                className="lg:hidden w-full py-4 bg-gradient-to-r from-purple-500 to-green-500 text-white font-bold text-lg rounded-full hover:from-purple-600 hover:to-green-600 transition-all shadow-lg"
              >
                Pay Now - ${total.toFixed(2)}
              </button>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                      <p className="text-green-600 font-bold text-sm mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button - Desktop */}
              <button
                onClick={handlePayNow}
                className="hidden lg:block w-full py-4 bg-gradient-to-r from-purple-500 to-green-500 text-white font-bold text-lg rounded-full hover:from-purple-600 hover:to-green-600 transition-all shadow-lg mt-6"
              >
                Pay Now
              </button>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Secure payment via KHQR
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;