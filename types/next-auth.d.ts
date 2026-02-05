import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      userId?: number;
      username?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    userId?: number;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    userId?: number;
    username?: string;
  }
}