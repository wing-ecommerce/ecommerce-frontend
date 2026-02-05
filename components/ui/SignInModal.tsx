"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SignInModal({ isOpen, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });

      if (result?.error) {
        setError("Failed to sign in. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Header */}
        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-8 text-white">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-white/20 transition"
          >
            <X size={18} />
          </button>

          <h2 className="text-2xl font-bold">Welcome to TeeSpace</h2>
          <p className="mt-1 text-sm text-white/90">
            Sign in to continue shopping
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-8">
          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="text-center text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Google Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 transition disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                Signing in…
              </>
            ) : (
              <>
                <Image
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Continue with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">Secure login</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500 leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="/terms" className="font-medium text-green-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="font-medium text-green-600 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}