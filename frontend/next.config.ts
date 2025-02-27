/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: { resolve: { fallback: { canvas: boolean } } }) => {
    config.resolve.fallback = { canvas: false };
    return config;
  },
};

module.exports = nextConfig;
