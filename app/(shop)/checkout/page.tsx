'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/contexts/CartContext';
import api from '@/services/api';

// Components
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import AddressSelector from '@/components/checkout/AddressSelector';
import OrderSummary from '@/components/checkout/OrderSummary';
import CashPaymentScreen from '@/components/checkout/CashPaymentScreen';
import LoadingState from '@/components/checkout/LoadingState';
import AddAddressModal from '@/components/checkout/AddAddressModal';

interface Address {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { cart, cartItems, isLoading: cartLoading, clearCart } = useCart();
  
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  // Fetch addresses
  const fetchAddresses = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoadingAddresses(true);
      const response = await api.get<{ data: Address[] }>('/addresses');
      setAddresses(response.data);
      
      // Auto-select default address
      const defaultAddr = response.data.find(addr => addr.isDefault);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
      } else if (response.data.length > 0) {
        setSelectedAddress(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [isAuthenticated]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && cartItems.length === 0 && !showPayment) {
      router.push('/products');
    }
  }, [cartItems, cartLoading, showPayment, router]);

  // Calculate totals
  const subtotal = cart?.subtotal || 0;
  const shipping = 10.00;
  const tax = cart?.tax || 0;
  const total = cart?.total ? cart.total + shipping : 0;

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }
    
    setShowPayment(true);
  };

  // Handle confirm order (Cash on Delivery)
  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    try {
      setIsPlacingOrder(true);

      // Create order object
      const orderData = {
        addressId: selectedAddress.id,
        paymentMethod: 'CASH_ON_DELIVERY',
        items: cartItems.map(item => ({
          productId: item.productId,
          productSizeId: item.sizeId,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total,
      };

      console.log('Placing order:', orderData);

      // TODO: Uncomment when backend order API is ready
      // const response = await api.post('/orders', orderData);
      // console.log('Order placed:', response);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Clear cart after successful order
      await clearCart();

      // Show success message
      alert('Order placed successfully! You will receive a confirmation email shortly.');

      // Redirect to orders page
      router.push('/account/orders');

    } catch (error: any) {
      console.error('Error placing order:', error);
      alert(`Failed to place order: ${error.message || 'Please try again'}`);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Handle address added
  const handleAddressAdded = () => {
    // Refresh addresses list
    fetchAddresses();
  };

  // Loading state
  if (authLoading || cartLoading || isLoadingAddresses) {
    return <LoadingState />;
  }

  // Payment/Confirmation screen
  if (showPayment && selectedAddress) {
    return (
      <CashPaymentScreen
        amount={total}
        address={selectedAddress}
        itemCount={cart?.totalItems || 0}
        onBack={() => setShowPayment(false)}
        onConfirmOrder={handleConfirmOrder}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Progress */}
      <CheckoutHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Review your order and complete purchase</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Address Selection */}
          <div className="lg:col-span-2 space-y-6">
            <AddressSelector
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelectAddress={setSelectedAddress}
              onAddNewClick={() => setShowAddAddressModal(true)}
            />
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              totalItems={cart?.totalItems || 0}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              onCheckout={handleProceedToPayment}
              disabled={!selectedAddress || cartItems.length === 0}
            />
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <AddAddressModal
        isOpen={showAddAddressModal}
        onClose={() => setShowAddAddressModal(false)}
        onAddressAdded={handleAddressAdded}
        userEmail={user?.email || undefined}
        userName={user?.name || undefined}
      />
    </div>
  );
};

export default CheckoutPage;