"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { orderService, Order } from '@/services/order.service';
import Image from "next/image";
import { Package, Calendar, DollarSign, MapPin, Loader2, AlertCircle } from 'lucide-react';

export default function MyOrders() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // Fetch orders
  const fetchOrders = async (page: number = 0) => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await orderService.getMyOrders(page, 10);
      setOrders(response.content);
      setCurrentPage(response.pageNumber);
      setTotalPages(response.totalPages);
      setTotalOrders(response.totalElements);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders(0);
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  // Handle cancel order
  const handleCancelOrder = async (orderId: number) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
      await orderService.cancelOrder(orderId);
      alert('Order cancelled successfully');
      fetchOrders(currentPage); // Refresh current page
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'PROCESSING':
        return 'bg-purple-100 text-purple-800';
      case 'SHIPPED':
        return 'bg-indigo-100 text-indigo-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <section className="bg-white">
        <div className="w-full mx-auto">
          <div className="main-data p-8 sm:p-14 bg-gray-50 rounded-3xl">
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-green-600" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <section className="bg-white">
        <div className="w-full mx-auto">
          <div className="main-data p-8 sm:p-14 bg-gray-50 rounded-3xl">
            <div className="flex flex-col items-center justify-center py-20">
              <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Please log in to view your orders
              </h3>
              <p className="text-gray-600">
                You need to be logged in to access your order history
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-white">
        <div className="w-full mx-auto">
          <div className="main-data p-8 sm:p-14 bg-gray-50 rounded-3xl">
            <div className="flex flex-col items-center justify-center py-20">
              <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Error Loading Orders
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => fetchOrders(currentPage)}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (orders.length === 0) {
    return (
      <section className="bg-white">
        <div className="w-full mx-auto">
          <div className="main-data p-8 sm:p-14 bg-gray-50 rounded-3xl">
            <h2 className="text-center font-manrope font-semibold text-4xl text-black mb-16">
              Order History
            </h2>
            <div className="flex flex-col items-center justify-center py-20">
              <Package className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders. Start shopping!
              </p>
              <a
                href="/products"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="w-full mx-auto">
        <div className="main-data p-8 sm:p-14 bg-gray-50 rounded-3xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-manrope font-semibold text-4xl text-black">
              Order History
            </h2>
            <p className="text-gray-600">
              {totalOrders} {totalOrders === 1 ? 'order' : 'orders'} total
            </p>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-green-300 transition-all"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order Number</p>
                      <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order Date</p>
                      <p className="font-medium text-gray-900">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total</p>
                      <p className="font-bold text-green-600 text-lg">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 items-center pb-4 border-b border-gray-100 last:border-0"
                      >
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover border border-gray-200"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-gray-600">Size: {item.sizeName}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${item.total.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: Delivery Info */}
                      <div>
                        {order.estimatedDelivery && (
                          <div className="flex items-start gap-2 text-sm">
                            <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Estimated Delivery</p>
                              <p className="font-medium text-gray-900">
                                {formatDate(order.estimatedDelivery)}
                              </p>
                            </div>
                          </div>
                        )}
                        {order.deliveredAt && (
                          <div className="flex items-start gap-2 text-sm mt-3">
                            <Package className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Delivered On</p>
                              <p className="font-medium text-gray-900">
                                {formatDate(order.deliveredAt)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right: Price Summary */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-medium">${order.shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span className="font-medium">${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200">
                          <span className="font-semibold text-gray-900">Total</span>
                          <span className="font-bold text-green-600">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {order.status === 'PENDING' && (
                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="px-6 py-2 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => fetchOrders(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={() => fetchOrders(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}