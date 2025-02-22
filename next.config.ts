import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'w19mrb4744.ufs.sh',
        port: '',
      },
    ],
  },
};

export default nextConfig;
