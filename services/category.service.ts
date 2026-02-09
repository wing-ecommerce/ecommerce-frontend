import { Category, ApiResponse } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Category fetch error:', response.status, errorText);
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
      
      const data: ApiResponse<Category[]> = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error in getAllCategories:', error);
      throw error;
    }
  },

  // Get category by ID
  async getCategoryById(id: string): Promise<Category> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch category: ${response.status}`);
      }
      
      const data: ApiResponse<Category> = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error in getCategoryById:', error);
      throw error;
    }
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const categories = await this.getAllCategories();
    return categories.find(c => c.slug === slug) || null;
  },
};