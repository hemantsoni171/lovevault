import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 disables ESLint in builds (Vercel)
  },
};

export default nextConfig;
