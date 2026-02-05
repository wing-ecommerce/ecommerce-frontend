// app/layout.tsx
"use client";

import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AuthProvider from "@/components/providers/AuthProvider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch: wait until client-side mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide Navbar/Footer on auth pages only (admin is separate app now)
  const hideLayout = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body>
        {/* Wrap entire app with AuthProvider for NextAuth session */}
        <AuthProvider>
          {/* Show Navbar/Footer only after mounted to prevent hydration issues */}
          {!hideLayout && mounted && <Navbar />}
          
          {/* Main content always renders */}
          <main className="min-h-screen">{children}</main>
          
          {!hideLayout && mounted && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}