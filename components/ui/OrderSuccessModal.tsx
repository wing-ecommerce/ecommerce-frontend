import { CheckCircle, Package, Calendar, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  orderTotal: number;
  estimatedDelivery?: string;
  itemCount: number;
}

const OrderSuccessModal = ({
  isOpen,
  onClose,
  orderNumber,
  orderTotal,
  estimatedDelivery,
  itemCount,
}: OrderSuccessModalProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleViewOrders = () => {
    router.push('/account/orders');
    onClose();
  };

  const handleContinueShopping = () => {
    router.push('/products');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-scale-in">
        {/* Success Header - Compact */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Success Icon - Smaller */}
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center animate-bounce-in shadow-lg">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          {/* Success Message - Compact */}
          <h2 className="text-2xl font-bold text-white text-center mb-1">
            Order Placed!
          </h2>
          <p className="text-green-100 text-center text-sm">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Details - Compact */}
        <div className="p-6">
          {/* Order Number - Smaller */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-green-600 font-semibold mb-0.5 uppercase tracking-wide">
              Order Number
            </p>
            <p className="text-lg font-bold text-green-900">{orderNumber}</p>
          </div>

          {/* Order Info Grid - 2 Column */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Total Amount */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-500 font-medium">Total</p>
              </div>
              <p className="text-lg font-bold text-gray-900">${orderTotal.toFixed(2)}</p>
            </div>

            {/* Items Count */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-gray-500 font-medium">Items</p>
              </div>
              <p className="text-lg font-bold text-gray-900">{itemCount}</p>
            </div>
          </div>

          {/* Estimated Delivery - Compact */}
          {estimatedDelivery && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-purple-600" />
                <p className="text-xs text-gray-500 font-medium">Estimated Delivery</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(estimatedDelivery).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}

          {/* Action Buttons - Smaller */}
          <div className="space-y-2">
            <button
              onClick={handleViewOrders}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              View Order
            </button>
            <button
              onClick={handleContinueShopping}
              className="w-full py-3 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-lg transition-colors hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessModal;