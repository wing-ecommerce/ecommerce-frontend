"use client";

import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    userId: session?.user?.userId,
    username: session?.user?.username,
    role: session?.user?.role,
    backendToken: session?.user?.backendAccessToken,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    hasBackendToken: !!session?.user?.backendAccessToken,
  };
}