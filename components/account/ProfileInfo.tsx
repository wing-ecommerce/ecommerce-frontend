"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/services/api";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImageUrl?: string;
  updatedAt?: string;
}

export default function ProfileInfo() {
  const { user, userId, isAuthenticated, isLoading, backendToken, hasBackendToken } = useAuth();
  
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profileImageUrl: "",
    updatedAt: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      // Don't fetch if no backend token
      if (!hasBackendToken) {
        setError("Authentication token missing. Please log out and log in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Use /users/me endpoint to get current user
        const response = await api.get<{ data: UserProfile; message: string }>("/users/me");
        const data = response.data;
        
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || user?.email || "",
          phoneNumber: data.phoneNumber || "",
          profileImageUrl: data.profileImageUrl || user?.image || "",
          updatedAt: data.updatedAt || "",
        });
      } catch (err: any) {
        setError("Failed to load profile data. " + err.message);
        
        // Fallback to session data if available
        if (user?.email) {
          setProfile(prev => ({
            ...prev,
            email: user.email || "",
            profileImageUrl: user.image || "",
          }));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, hasBackendToken, user]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    if (!hasBackendToken) {
      alert("Authentication token missing. Please log out and log in again.");
      return;
    }

    // Validation
    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      alert("First name and last name are required");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Use PUT /users/{id} endpoint
      const response = await api.put<{ data: UserProfile; message: string }>(
        `/users/${userId}`,
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
          phoneNumber: profile.phoneNumber,
        }
      );

      // Update local state with response
      setProfile({
        ...profile,
        firstName: response.data.firstName || profile.firstName,
        lastName: response.data.lastName || profile.lastName,
        phoneNumber: response.data.phoneNumber || profile.phoneNumber,
        updatedAt: response.data.updatedAt || new Date().toISOString(),
      });

      alert("Profile updated successfully!");
    } catch (err: any) {
      setError("Failed to update profile: " + err.message);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "Never";
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      return "Invalid date";
    }
  };

  // Loading state
  if (isLoading || loading) {
    return (
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8">
        <div className="text-center text-gray-500">
          Please log in to view your profile
        </div>
      </div>
    );
  }

  const fullName = `${profile.firstName} ${profile.lastName}`.trim() || user?.name || "User";

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
          {!hasBackendToken && (
            <div className="mt-2">
              <button
                onClick={() => window.location.href = '/api/auth/signout'}
                className="text-sm underline"
              >
                Click here to log out and try again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src={
              profile.profileImageUrl ||
              user?.image ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`
            }
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold">{fullName}</h2>
            <p className="text-gray-500 text-sm">{profile.email}</p>
          </div>
        </div>

        <button
          onClick={handleUpdateProfile}
          disabled={saving}
          className="px-5 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            disabled
            value={profile.email}
            className="w-full px-4 py-3 rounded-lg border bg-gray-100 text-gray-500 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            placeholder="+855 xxx xxx xxx"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Last Updated */}
      {profile.updatedAt && (
        <div className="mt-6 pt-6">
          <p className="text-sm text-gray-500 text-center">
            Last updated: {formatDate(profile.updatedAt)}
          </p>
        </div>
      )}
    </div>
  );
}