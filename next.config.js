/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["page.tsx", "page.ts"],
  images: {
    domains: ["cover.openbd.jp"],
  },
};
module.exports = nextConfig;
