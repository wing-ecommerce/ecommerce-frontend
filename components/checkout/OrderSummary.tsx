import { ShoppingCart, Banknote } from 'lucide-react';
import { CartItem } from '@/services/cart.service';

interface OrderSummaryProps {
  cartItems: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onCheckout: () => void;
  disabled?: boolean;
}

const OrderSummary = ({
  cartItems,
  totalItems,
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
  disabled = false,
}: OrderSummaryProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-24">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
            <p className="text-sm text-gray-500">{totalItems} items</p>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-6 py-4 max-h-80 overflow-y-auto">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">
                  {item.productName}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Size: {item.sizeName}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="px-6 py-4 border-t border-gray-200 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="px-6 pb-6">
        <button
          onClick={onCheckout}
          disabled={disabled}
          className="w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
        >
          <Banknote className="w-5 h-5" />
          Place Order (Cash on Delivery)
        </button>
        <p className="text-center text-xs text-gray-500 mt-3">
           Pay with cash when you receive your order
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;