/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.priceedwards.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
