'use client';

import { Plus, Minus, Trash2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/services/cart.service';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  onRemove: (cartItemId: number) => Promise<void>;
  isLoading?: boolean;
}

const CartItem = ({ item, onUpdateQuantity, onRemove, isLoading }: CartItemProps) => {
  const maxStock = item.availableStock;
  const isAtMaxStock = item.quantity >= maxStock;
  const isLowStock = maxStock <= 5 && maxStock > 0;

  const handleIncrease = () => {
    if (!isAtMaxStock && !isLoading) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1 && !isLoading) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    if (!isLoading) {
      onRemove(item.id);
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
      <Link href={`/products/${item.productSlug}`} className="flex-shrink-0">
        <img
          src={item.productImage}
          alt={item.productName}
          className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.productSlug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-green-600 transition truncate">
            {item.productName}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">Size: {item.sizeName}</p>
        <p className="text-green-600 font-bold mt-1">
          ${item.price.toFixed(2)}
        </p>

        {/* Stock Warning */}
        {isLowStock && (
          <div className="flex items-center gap-1 mt-2 text-orange-600 text-xs">
            <AlertCircle className="w-3 h-3" />
            <span>Only {maxStock} left in stock</span>
          </div>
        )}
        
        {/* At Max Stock Warning */}
        {isAtMaxStock && maxStock < 999 && (
          <div className="flex items-center gap-1 mt-2 text-red-600 text-xs">
            <AlertCircle className="w-3 h-3" />
            <span>Maximum stock reached ({maxStock})</span>
          </div>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrease}
            disabled={item.quantity <= 1 || isLoading}
            className={`p-1 border rounded transition ${
              item.quantity <= 1 || isLoading
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-gray-300 hover:bg-gray-100'
            }`}
            aria-label="Decrease quantity"
            title={item.quantity <= 1 ? 'Minimum quantity is 1' : 'Decrease quantity'}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-semibold">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            disabled={isAtMaxStock || isLoading}
            className={`p-1 border rounded transition ${
              isAtMaxStock || isLoading
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-gray-300 hover:bg-gray-100'
            }`}
            aria-label="Increase quantity"
            title={isAtMaxStock ? `Maximum stock available is ${maxStock}` : 'Increase quantity'}
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleRemove}
            disabled={isLoading}
            className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition disabled:opacity-50"
            aria-label="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;