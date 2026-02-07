import { getSession, signOut } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requireAuth = true, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Attach access token
  if (requireAuth) {
    const session = await getSession();
    if (session?.user?.backendAccessToken) {
      headers.Authorization = `Bearer ${session.user.backendAccessToken}`;
    }
  }

  const makeRequest = () =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      credentials: "include",
    });

  let response = await makeRequest();

  // Access token expired → try refresh
  if (response.status === 401 || response.status === 403) {
    const refreshResponse = await fetch(
      `${API_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    // Refresh token invalid → logout
    if (!refreshResponse.ok) {
      await signOut({ redirect: true, callbackUrl: "/" });
      throw new Error("Session expired");
    }

    const refreshData = await refreshResponse.json();
    const newAccessToken = refreshData.data.access_token;

    // Retry original request with new token
    headers.Authorization = `Bearer ${newAccessToken}`;
    response = await makeRequest();
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Request failed");
  }

  return response.json();
}

// Helper methods
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};

export default api;