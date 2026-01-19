"use client";
import React, { useState } from "react";
import ProfileInfo from "../../components/profile/ProfileInfo";
import OrderHistory from "../../components/profile/OrderHistory";
import AddressBook from "../../components/profile/AddressBook";

const page = () => {
  const [active, setActive] = useState("personal");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-12 gap-8">
        {/* Account Menu (left) */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white border rounded-xl p-4 space-y-2">
            <MenuItem
              label="Personal Info"
              active={active === "personal"}
              onClick={() => setActive("personal")}
            />

            <MenuItem
              label="My Orders"
              active={active === "orders"}
              onClick={() => setActive("orders")}
            />

            <MenuItem
              label="Address Book"
              active={active === "address"}
              onClick={() => setActive("address")}
            />
          </div>
        </div>

        {/* Content Area (right) */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-white border rounded-xl p-6">
            {active === "personal" && <PersonalInfo />}
            {active === "orders" && <MyOrders />}
            {active === "address" && <AddressBookSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Menu Item ---------------- */
const MenuItem = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition
      ${
        active
          ? "bg-gradient-to-r from-purple-500 to-green-500 text-white"
          : "hover:bg-gray-100"
      }
    `}
  >
    {label}
  </button>
);

/* ---------------- Sections ---------------- */
const PersonalInfo = () => {
  return <ProfileInfo />;
};

const MyOrders = () => {
  return <OrderHistory />;
};

const AddressBookSection = () => {
  return <AddressBook />;
};

export default page;
