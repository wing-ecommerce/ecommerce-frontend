// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  
  pages: {
    signIn: "/",
    error: "/",
  },
  
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          console.log("Sending OAuth data to backend...");
          
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // CRITICAL: Backend will set HTTP-only cookies
              body: JSON.stringify({
                provider: "google",
                token: account.id_token,
                email: user.email,
                firstName: user.name?.split(" ")[0] || "",
                lastName: user.name?.split(" ").slice(1).join(" ") || "",
                profileImageUrl: user.image || "",
                providerId: account.providerAccountId,
              }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            console.error("Backend OAuth login failed:", error);
            return false;
          }

          const data = await response.json();
          console.log("Backend OAuth login successful");
          
          if (data.success && data.data.user) {
        
            user.role = data.data.user.role;
            user.userId = data.data.user.id;
            user.username = data.data.user.username;
          }

          return true;
        } catch (error) {
          console.error("OAuth login error:", error);
          return false;
        }
      }
      
      return true;
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.userId = user.userId;
        token.username = user.username;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        
        session.user.role = token.role as string;
        session.user.userId = token.userId as number;
        session.user.username = token.username as string;
      }
      
      return session;
    },
  },
  
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };