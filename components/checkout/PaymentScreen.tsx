import { ArrowLeft, CreditCard } from 'lucide-react';

interface PaymentScreenProps {
  amount: number;
  onBack: () => void;
}

const PaymentScreen = ({ amount, onBack }: PaymentScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Checkout</span>
        </button>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Complete Payment</h1>
            </div>
            <p className="text-green-100 text-sm">Scan QR code with your banking app</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* QR Code */}
            <div className="flex justify-center mb-8">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                <svg
                  width="220"
                  height="220"
                  viewBox="0 0 220 220"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="220" height="220" fill="white" />
                  <g transform="translate(10, 10)">
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
                <p className="text-center text-xs text-red-500 font-medium mt-3">
                  Demo KHQR Code
                </p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Amount to Pay</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${amount.toFixed(2)}
                  </span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Merchant</span>
                  <span className="font-medium text-gray-900">TeeSpace Store</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium text-gray-900">KHQR</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                Payment Instructions
              </h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>Open your mobile banking app</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Select "Scan QR" or "KHQR Payment"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>Scan the QR code displayed above</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>Confirm payment amount and complete transaction</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;