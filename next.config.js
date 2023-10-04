/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   experimental: {
      serverActions: true,
   },
   images: { remotePatterns: [{ hostname: 'localhost', port: '3000' }] },
};

module.exports = nextConfig;
