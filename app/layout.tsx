// app/layout.tsx
"use client";

import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AuthProvider from "@/components/providers/AuthProvider";
import { CartProvider } from "@/contexts/CartContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch: wait until client-side mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide Navbar/Footer on auth pages and checkout page
  const hideLayout = pathname.startsWith("/auth") || pathname.startsWith("/checkout");

  return (
    <html lang="en">
      <body>
        {/* Wrap entire app with AuthProvider for NextAuth session */}
        <AuthProvider>
          {/* Wrap with CartProvider for cart state management */}
          <CartProvider>
            {/* Show Navbar/Footer only after mounted to prevent hydration issues */}
            {!hideLayout && mounted && <Navbar />}
            
            {/* Main content always renders */}
            <main className="min-h-screen">{children}</main>
            
            {!hideLayout && mounted && <Footer />}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}