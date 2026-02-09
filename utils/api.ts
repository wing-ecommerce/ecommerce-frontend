export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    products: '/products',
    categories: '/categories',
    auth: '/auth',
    orders: '/orders',
    cart: '/cart',
  },
};

// Helper to build full endpoint URL
export const getEndpointUrl = (path: string) => `${API_BASE_URL}${path}`;

// Helper function for API calls
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}