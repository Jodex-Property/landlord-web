import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    domains: ['jodex-s3.s3.eu-north-1.amazonaws.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname),
      "@components": path.resolve(__dirname, "components"),
      "@components-custom": path.resolve(__dirname, "components-custom"),
    };
    return config;
  },
};

export default nextConfig;
