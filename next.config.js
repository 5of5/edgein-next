/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  ...withImages(),
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/sign-in',
        permanent: true,
      },
    ]
  },
};
module.exports = nextConfig;
