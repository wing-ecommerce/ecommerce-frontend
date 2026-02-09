export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image?: string;
  additionalPhotos?: string[];
  description?: string;
  stock: number;
  sizes?: string[];
  categoryId: string;
  categoryName: string;
  inStock?: boolean; // Computed from stock
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}