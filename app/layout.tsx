// app/layout.tsx
"use client";

import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent flicker: wait until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const hideLayout =
    pathname.startsWith("/auth") || pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        {/* Show children immediately, but hide Navbar/Footer until mounted */}
        {!hideLayout && mounted && <Navbar />}
        <main className="min-h-screen">{children}</main>
        {!hideLayout && mounted && <Footer />}
      </body>
    </html>
  );
}
