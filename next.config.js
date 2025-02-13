/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    swcMinifyDebugOptions: {
      compress: false,
      mangle: false
    }
  },
  output: 'export',
  images: { unoptimized: true }
};

module.exports = nextConfig;