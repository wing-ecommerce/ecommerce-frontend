"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/services/api";
import { MapPin, Plus, Trash2, Check } from "lucide-react";

interface Address {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AddressResponse {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AddressBook() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [savingId, setSavingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    isDefault: false,
  });

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<{
        data: AddressResponse[];
        message: string;
      }>("/addresses");

      const fetchedAddresses = response.data.map((addr) => ({
        id: addr.id,
        fullName: addr.fullName,
        email: addr.email,
        phone: addr.phone,
        address: addr.address,
        city: addr.city,
        isDefault: addr.isDefault,
        createdAt: addr.createdAt,
        updatedAt: addr.updatedAt,
      }));

      setAddresses(fetchedAddresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setForm({
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      isDefault: addresses.length === 0, // First address is default
    });
  };

  const handleEdit = (address: Address) => {
    setEditingId(address.id || null);
    setIsAdding(false);
    setForm({
      fullName: address.fullName,
      email: address.email,
      phone: address.phone,
      address: address.address,
      city: address.city,
      isDefault: address.isDefault,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      isDefault: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!form.fullName || !form.email || !form.phone || !form.address || !form.city) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setSavingId(editingId || -1);

      if (editingId) {
        // Update existing address
        const response = await api.put<{
          data: AddressResponse;
          message: string;
        }>(`/addresses/${editingId}`, form);

        //  If this address was set as default, update all other addresses
        if (form.isDefault) {
          setAddresses(addresses.map(addr =>
            addr.id === editingId
              ? { ...form, id: editingId, updatedAt: response.data.updatedAt }
              : { ...addr, isDefault: false } //  Set all others to non-default
          ));
        } else {
          setAddresses(addresses.map(addr =>
            addr.id === editingId
              ? { ...form, id: editingId, updatedAt: response.data.updatedAt }
              : addr
          ));
        }
        alert("Address updated successfully!");
      } else {
        // Create new address
        const response = await api.post<{
          data: AddressResponse;
          message: string;
        }>("/addresses", form);

        // ⭐ If new address is default, set all existing to non-default
        if (form.isDefault) {
          setAddresses([
            ...addresses.map(addr => ({ ...addr, isDefault: false })), // Set all existing to non-default
            {
              ...form,
              id: response.data.id,
              createdAt: response.data.createdAt,
              updatedAt: response.data.updatedAt,
            }
          ]);
        } else {
          setAddresses([...addresses, {
            ...form,
            id: response.data.id,
            createdAt: response.data.createdAt,
            updatedAt: response.data.updatedAt,
          }]);
        }
        alert("Address added successfully!");
      }

      handleCancel();
    } catch (error: any) {
      console.error("Error saving address:", error);
      alert(`Failed to save address: ${error.message}`);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      setSavingId(id);
      await api.delete(`/addresses/${id}`);
      setAddresses(addresses.filter(addr => addr.id !== id));
      alert("Address deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting address:", error);
      alert(`Failed to delete address: ${error.message}`);
    } finally {
      setSavingId(null);
    }
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to manage your addresses</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Existing Addresses */}
      {addresses.map((address) => (
        <div
          key={address.id}
          className={`bg-white border-2 rounded-xl p-6 transition-all ${
            address.isDefault ? "border-green-500" : "border-gray-200"
          }`}
        >
          {editingId === address.id ? (
            // Edit Form
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+855 xxx xxx xxx"
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    City/Province <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select city/province</option>
                    <option value="Phnom Penh">Phnom Penh</option>
                    <option value="Siem Reap">Siem Reap</option>
                    <option value="Battambang">Battambang</option>
                    <option value="Sihanoukville">Sihanoukville</option>
                    <option value="Kampong Cham">Kampong Cham</option>
                    <option value="Kandal">Kandal</option>
                    <option value="Prey Veng">Prey Veng</option>
                    <option value="Takeo">Takeo</option>
                    <option value="Kampot">Kampot</option>
                    <option value="Banteay Meanchey">Banteay Meanchey</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    placeholder="Street, house number, building"
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={form.isDefault}
                      onChange={handleChange}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium">
                      Set as default address
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  disabled={savingId === editingId}
                  className="px-5 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
                >
                  {savingId === editingId ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2 rounded-full border hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // Display Mode
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{address.fullName}</h3>
                    {address.isDefault && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mt-1">
                        <Check className="w-3 h-3" />
                        Default Address
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => address.id && handleDelete(address.id)}
                    disabled={savingId === address.id}
                    className="text-red-600 hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>{address.address}</p>
                <p>{address.city}, Cambodia</p>
                <p>Phone: {address.phone}</p>
                <p>Email: {address.email}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add New Address Form */}
      {isAdding && (
        <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+855 xxx xxx xxx"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  City/Province <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select city/province</option>
                  <option value="Phnom Penh">Phnom Penh</option>
                  <option value="Siem Reap">Siem Reap</option>
                  <option value="Battambang">Battambang</option>
                  <option value="Sihanoukville">Sihanoukville</option>
                  <option value="Kampong Cham">Kampong Cham</option>
                  <option value="Kandal">Kandal</option>
                  <option value="Prey Veng">Prey Veng</option>
                  <option value="Takeo">Takeo</option>
                  <option value="Kampot">Kampot</option>
                  <option value="Banteay Meanchey">Banteay Meanchey</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="Street, house number, building"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={form.isDefault}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium">
                    Set as default address
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={savingId === -1}
                className="px-5 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
              >
                {savingId === -1 ? "Saving..." : "Add Address"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2 rounded-full border hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add New Address Button */}
      {!isAdding && !editingId && (
        <button
          type="button"
          onClick={handleAddNew}
          className="w-full py-4 rounded-full border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition flex items-center justify-center gap-2 text-gray-600 hover:text-purple-600 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Address
        </button>
      )}

      {/* Empty State */}
      {addresses.length === 0 && !isAdding && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No addresses saved yet</p>
          <button
            onClick={handleAddNew}
            className="px-6 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
          >
            Add Your First Address
          </button>
        </div>
      )}
    </div>
  );
}