'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { cartService, Cart, CartItem } from '@/services/cart.service';

interface CartContextType {
  cart: Cart | null;
  cartItems: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  isSignInModalOpen: boolean;
  isLoading: boolean;
  maxCartItems: number;
  maxUniqueItems: number;
  addToCart: (productId: number, productSizeId: number, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openSignInModal: () => void;
  closeSignInModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Configuration
const MAX_CART_ITEMS = 50;
const MAX_UNIQUE_ITEMS = 20;

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      loadCart();
    } else if (!isAuthenticated && !authLoading) {
      setCart(null);
    }
  }, [isAuthenticated, authLoading]);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (error: any) {
      console.error('Error loading cart:', error);
      // Don't show alert for cart loading errors
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: number, productSizeId: number, quantity: number = 1) => {
    if (!isAuthenticated) {
      openSignInModal();
      return;
    }

    try {
      setIsLoading(true);
      const updatedCart = await cartService.addToCart({
        productId,
        productSizeId,
        quantity,
      });
      setCart(updatedCart);
      setIsCartOpen(true); // Open cart sidebar after adding
    } catch (error: any) {
      // Extract user-friendly error message
      const errorMessage = extractErrorMessage(error);
      alert(errorMessage);
      
      // Reload cart to sync with backend state
      await loadCart();
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);
      const updatedCart = await cartService.removeCartItem(cartItemId);
      setCart(updatedCart);
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      alert(errorMessage);
      await loadCart();
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (!isAuthenticated) return;
    if (quantity < 1) return; // Minimum 1

    try {
      setIsLoading(true);
      const updatedCart = await cartService.updateCartItem(cartItemId, { quantity });
      setCart(updatedCart);
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      alert(errorMessage);
      
      // Reload cart to get correct state
      await loadCart();
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);
      await cartService.clearCart();
      setCart(null);
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCart = async () => {
    if (isAuthenticated) {
      await loadCart();
    }
  };

  // Extract user-friendly error message from API error
  const extractErrorMessage = (error: any): string => {
    // Check if it's an API error response
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    // Check if error message contains our backend messages
    if (error.message) {
      // Remove "An unexpected error occurred: " prefix if present
      const message = error.message.replace('An unexpected error occurred: ', '');
      return message;
    }
    
    // Fallback
    return 'An error occurred. Please try again.';
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);
  
  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);

  const cartItems = cart?.items || [];
  const cartCount = cart?.totalItems || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        cartCount,
        isCartOpen,
        isSignInModalOpen,
        isLoading,
        maxCartItems: MAX_CART_ITEMS,
        maxUniqueItems: MAX_UNIQUE_ITEMS,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
        openCart,
        closeCart,
        toggleCart,
        openSignInModal,
        closeSignInModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}