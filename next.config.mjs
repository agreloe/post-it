/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
    images: {
        domains: ['avatars.githubusercontent.com']
    }
};

export default nextConfig;
