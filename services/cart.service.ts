import { api } from './api';

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productSlug: string;
  productImage: string;
  sizeId: number;
  sizeName: string;
  quantity: number;
  price: number;
  total: number;
  availableStock: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalItems: number;
  uniqueItems: number;
  subtotal: number;
  tax: number;
  total: number;
}

export interface AddToCartRequest {
  productId: number;
  productSizeId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const cartService = {
  // Get cart
  async getCart(): Promise<Cart> {
    const response = await api.get<ApiResponse<Cart>>('/cart');
    return response.data;
  },

  // Add to cart
  async addToCart(request: AddToCartRequest): Promise<Cart> {
    const response = await api.post<ApiResponse<Cart>>('/cart', request);
    return response.data;
  },

  // Update cart item
  async updateCartItem(cartItemId: number, request: UpdateCartItemRequest): Promise<Cart> {
    const response = await api.put<ApiResponse<Cart>>(`/cart/items/${cartItemId}`, request);
    return response.data;
  },

  // Remove cart item
  async removeCartItem(cartItemId: number): Promise<Cart> {
    const response = await api.delete<ApiResponse<Cart>>(`/cart/items/${cartItemId}`);
    return response.data;
  },

  // Clear cart
  async clearCart(): Promise<void> {
    await api.delete('/cart');
  },
};