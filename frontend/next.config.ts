import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["yt3.googleusercontent.com", "yt3.ggpht.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      use: "file-loader",
    });
    return config;
  },
};

export default nextConfig;
