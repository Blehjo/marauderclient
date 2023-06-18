/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    reactStrictMode: true,
    styledComponents: true
  }
}

module.exports = nextConfig;