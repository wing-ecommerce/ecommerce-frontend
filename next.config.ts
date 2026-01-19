import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["pagedone.io"], // allow this domain for next/image
  },
  reactStrictMode: true,
};

export default nextConfig;
