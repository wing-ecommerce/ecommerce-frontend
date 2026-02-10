export interface ProductSize {
  id: number;
  size: string;
  stock: number;
  priceOverride?: number;
  sku?: string;
  effectivePrice: number; // Either priceOverride or product price
}

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
  stock: number; // Total stock across all sizes
  sizes: ProductSize[]; // Changed from string[] to ProductSize[]
  categoryId: string;
  categoryName: string;
  inStock?: boolean; // Computed from total stock
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