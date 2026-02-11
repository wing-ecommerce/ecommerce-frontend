import { ArrowLeft, Banknote, CheckCircle, MapPin, Phone, Mail, Package, Loader2 } from 'lucide-react';

interface Address {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

interface CashPaymentScreenProps {
  amount: number;
  address: Address;
  itemCount: number;
  onBack: () => void;
  onConfirmOrder: () => void;
  isLoading?: boolean;
}

const CashPaymentScreen = ({ 
  amount, 
  address, 
  itemCount,
  onBack, 
  onConfirmOrder,
  isLoading = false
}: CashPaymentScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Checkout</span>
        </button>

        {/* Confirmation Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Banknote className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Cash on Delivery</h1>
            </div>
            <p className="text-green-100 text-sm">Review your order details and confirm</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Order Summary */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">${amount.toFixed(2)}</span>
                </div>
                <div className="h-px bg-green-200"></div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items</span>
                  <span className="font-medium text-gray-900">{itemCount} items</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium text-gray-900 flex items-center gap-1">
                    <Banknote className="w-4 h-4" />
                    Cash on Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-gray-900">{address.fullName}</p>
                <p className="text-gray-600">{address.address}</p>
                <p className="text-gray-600">{address.city}, Cambodia</p>
                <div className="flex items-center gap-4 pt-2">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {address.phone}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <Mail className="w-4 h-4" />
                    {address.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                Important Information
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Please prepare exact amount of <strong>${amount.toFixed(2)}</strong> in cash</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Payment will be collected upon delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>You can inspect the items before making payment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Delivery typically takes 2-3 business days</span>
                </li>
              </ul>
            </div>

            {/* Confirm Button */}
            <button
              onClick={onConfirmOrder}
              disabled={isLoading}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Order...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Confirm Order
                </>
              )}
            </button>

            {/* Terms */}
            <p className="text-center text-xs text-gray-500 mt-4">
              By confirming, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashPaymentScreen;