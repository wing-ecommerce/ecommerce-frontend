"use client";

import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";
import CartItem from "./CartItem";
import { useCart } from "@/contexts/CartContext";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cart, cartItems, updateQuantity, removeFromCart, isLoading } =
    useCart();

  const subtotal = cart?.subtotal || 0;
  const tax = cart?.tax || 0;
  const total = cart?.total || 0;

  return (
    <>
      {/* Backdrop */}
{isOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-50"
    onClick={onClose}
  />
)}

{/* Sidebar */}
<div
  className={`fixed top-0 right-0 h-full w-full md:w-2/5 lg:w-1/3 bg-white shadow-2xl z-60 transform transition-transform duration-300 ease-in-out ${
    isOpen ? 'translate-x-0' : 'translate-x-full'
  }`}

      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <h2 className="text-2xl font-bold text-green-600">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute top-20 left-0 right-0 bg-green-500 h-1">
              <div className="h-full bg-green-600 animate-pulse"></div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
                <p className="text-gray-400 text-sm mb-6">
                  Add some products to get started
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full py-3 text-center font-semibold bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-md"
              >
                Checkout
              </Link>

              <button
                onClick={onClose}
                className="block w-full mt-3 py-2 text-center text-gray-600 hover:text-gray-800 transition"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
