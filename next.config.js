/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // ignoreDuringBuilds: true,
  },
  env: {
    WILLSVAR: "some uri or something"
  }
}

module.exports = nextConfig
