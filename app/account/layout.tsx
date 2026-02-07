// app/account/layout.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-12 gap-8">
        {/* Account Menu (left) */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white border border-gray-300 rounded-xl p-4 space-y-2">
            <MenuItem
              label="Personal Info"
              href="/account/profile"
            />

            <MenuItem
              label="My Orders"
              href="/account/orders"
            />

            <MenuItem
              label="Address Book"
              href="/account/address"
            />
          </div>
        </div>

        {/* Content Area (right) */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-white border border-gray-300 rounded-xl p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Menu Item ---------------- */
const MenuItem = ({
  label,
  href,
}: {
  label: string;
  href: string;
}) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`block w-full text-left px-4 py-3 rounded-full font-medium transition
        ${
          active
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "hover:bg-gray-100"
        }
      `}
    >
      {label}
    </Link>
  );
};