import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      backendAccessToken?: string;
      role?: string;
      userId?: number;
      username?: string;
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
    } & DefaultSession["user"];
    error?: string;
  }

  interface User {
    backendAccessToken?: string;
    backendAccessTokenExpires?: number;
    role?: string;
    userId?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendAccessToken?: string;
    backendAccessTokenExpires?: number;
    role?: string;
    userId?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    error?: string;
  }
}