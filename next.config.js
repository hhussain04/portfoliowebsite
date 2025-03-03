/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    swcMinifyDebugOptions: {
      compress: false,
      mangle: false
    }
  },
  output: 'next export',
  images: { unoptimized: true },
  cache: false, // Add this line temporarily
};

module.exports = nextConfig;