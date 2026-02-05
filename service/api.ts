const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requireAuth = true, ...fetchOptions } = options;

  // Create headers object
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add custom headers if provided
  if (fetchOptions.headers) {
    const customHeaders = fetchOptions.headers as Record<string, string>;
    Object.assign(headers, customHeaders);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    credentials: 'include', // CRITICAL: Send HTTP-only cookies (access_token, refresh_token)
  });

  // Handle errors
  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      message: 'Request failed' 
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Helper functions for common HTTP methods
 */
export const api = {
  /**
   * GET request - cookies sent automatically
   */
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  /**
   * POST request - cookies sent automatically
   */
  post: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  /**
   * PUT request - cookies sent automatically
   */
  put: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  /**
   * PATCH request - cookies sent automatically
   */
  patch: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  /**
   * DELETE request - cookies sent automatically
   */
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};
export default api;