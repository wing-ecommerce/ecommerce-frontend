import api from './api';

export interface OrderItem {
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
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  addressId: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  items: OrderItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  notes?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const orderService = {
  // Get user's orders with pagination
  async getMyOrders(page: number = 0, size: number = 10): Promise<PageResponse<Order>> {
    const response = await api.get<ApiResponse<PageResponse<Order>>>(
      `/orders/my-orders?page=${page}&size=${size}`
    );
    return response.data;
  },

  // Get order by ID
  async getOrderById(orderId: number): Promise<Order> {
    const response = await api.get<ApiResponse<Order>>(`/orders/${orderId}`);
    return response.data;
  },

  // Get order by order number
  async getOrderByNumber(orderNumber: string): Promise<Order> {
    const response = await api.get<ApiResponse<Order>>(`/orders/number/${orderNumber}`);
    return response.data;
  },

  // Cancel order
  async cancelOrder(orderId: number): Promise<Order> {
    const response = await api.post<ApiResponse<Order>>(`/orders/${orderId}/cancel`);
    return response.data;
  },
};