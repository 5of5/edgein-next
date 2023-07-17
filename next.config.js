/** @type {import('next').NextConfig} */
const withImages = require('next-images');
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  ...withImages(),
};
module.exports = nextConfig;
