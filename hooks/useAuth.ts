import { useSession } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    role: session?.user?.role,
    userId: session?.user?.userId,
    username: session?.user?.username,
    
    // Status flags
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    isAdmin: session?.user?.role === 'ADMIN',
    isModerator: session?.user?.role === 'MODERATOR' || session?.user?.role === 'ADMIN',
  };
}