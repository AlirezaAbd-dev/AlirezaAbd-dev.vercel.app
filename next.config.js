/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://storage.c2.liara.space/**')],
  },
};

module.exports = nextConfig;
