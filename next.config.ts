import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pagedone.io",
        port: "",
        pathname: "/**", // allow all paths from this domain
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
