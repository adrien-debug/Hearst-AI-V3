/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Désactivé temporairement pour debug
  // Next.js 14+ doesn't need experimental.appDir anymore
  // experimental: {
  //   appDir: true,
  // },
  
  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  },
}

module.exports = nextConfig

