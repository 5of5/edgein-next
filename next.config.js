/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  ...withImages(),
};
module.exports = nextConfig;
