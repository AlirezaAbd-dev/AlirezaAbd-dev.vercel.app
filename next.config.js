/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   experimental: {
      serverActions: true,
   },
   images: {
      remotePatterns: [{ hostname: 'localhost', port: process.env.PORT }],
   },
};

module.exports = nextConfig;
