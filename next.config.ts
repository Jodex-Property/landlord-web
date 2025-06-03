import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
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
