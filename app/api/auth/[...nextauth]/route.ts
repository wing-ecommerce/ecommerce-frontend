import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  callbacks: {
    // Google sign-in → Backend login
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(`${BACKEND_URL}/auth/oauth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              provider: "google",
              providerId: account.providerAccountId,
              email: user.email,
              firstName: user.name?.split(" ")[0] || "",
              lastName: user.name?.split(" ").slice(1).join(" ") || "",
              profileImageUrl: user.image,
              token: account.id_token,
            }),
          });

          if (!response.ok) {
            return false;
          }

          const data = await response.json();

          // Store backend info temporarily on user
          (user as any).backendAccessToken = data.data.access_token;
          (user as any).role = data.data.user.role;
          (user as any).userId = data.data.user.id;
          (user as any).username = data.data.user.username;
          (user as any).firstName = data.data.user.firstName;
          (user as any).lastName = data.data.user.lastName;
          (user as any).phoneNumber = data.data.user.phoneNumber;

          return true;
        } catch (error) {
          return false;
        }
      }

      return true;
    },

    // JWT callback - initial login only
    async jwt({ token, user, account }) {
      if (account && user) {
        token.backendAccessToken = (user as any).backendAccessToken;
        token.role = (user as any).role;
        token.userId = (user as any).userId;
        token.username = (user as any).username;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        token.phoneNumber = (user as any).phoneNumber;
      }

      return token;
    },

    // Session callback
    async session({ session, token }) {
      session.user = {
        ...session.user,
        backendAccessToken: token.backendAccessToken as string,
        role: token.role as string,
        userId: token.userId as number,
        username: token.username as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        phoneNumber: token.phoneNumber as string,
      };

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };