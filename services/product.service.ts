import { Product, ApiResponse, PaginatedResponse } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const productService = {
  // Get all products (unpaginated)
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      
      const data: ApiResponse<Product[]> = await response.json();
      return data.data.map(product => ({
        ...product,
        inStock: product.stock > 0
      }));
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      throw error;
    }
  },

  // Get paginated products
  async getProducts(page: number = 0, size: number = 10): Promise<PaginatedResponse<Product>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?page=${page}&size=${size}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      
      const data: ApiResponse<PaginatedResponse<Product>> = await response.json();
      return {
        ...data.data,
        content: data.data.content.map(product => ({
          ...product,
          inStock: product.stock > 0
        }))
      };
    } catch (error) {
      console.error('Error in getProducts:', error);
      throw error;
    }
  },

  // Get product by ID
  async getProductById(id: number): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }
      
      const data: ApiResponse<Product> = await response.json();
      return {
        ...data.data
      };
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw error;
    }
  },

  // Get product by slug (requires fetching all and filtering)
  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.getAllProducts();
    return products.find(p => p.slug === slug) || null;
  },

  // Get products by category (paginated)
  async getProductsByCategory(categoryId: string, page: number = 0, size: number = 10): Promise<PaginatedResponse<Product>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/category/${categoryId}?page=${page}&size=${size}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products by category: ${response.status}`);
      }
      
      const data: ApiResponse<PaginatedResponse<Product>> = await response.json();
      return {
        ...data.data,
        content: data.data.content.map(product => ({
          ...product,
          inStock: product.stock > 0
        }))
      };
    } catch (error) {
      console.error('Error in getProductsByCategory:', error);
      throw error;
    }
  },

  // Get all products by category (unpaginated)
  async getAllProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/category/${categoryId}/all`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products by category: ${response.status}`);
      }
      
      const data: ApiResponse<Product[]> = await response.json();
      return data.data.map(product => ({
        ...product,
        inStock: product.stock > 0
      }));
    } catch (error) {
      console.error('Error in getAllProductsByCategory:', error);
      throw error;
    }
  },
};