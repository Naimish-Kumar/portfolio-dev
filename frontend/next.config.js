/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'acrocoder.com', 'dev.acrocoder.com', 'api.acrocoder.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.acrocoder.com/api',
  },
  output: 'export',
  trailingSlash: true,
};

module.exports = nextConfig;
