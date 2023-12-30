/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // ignoreDuringBuilds: true,
  },
  env: {
    MONGODB_URI: "mongodb+srv://williamjosephhorn:6TcYIe5j7KBcltJn@cluster0.kiyzjms.mongodb.net/"
  }
}

module.exports = nextConfig
