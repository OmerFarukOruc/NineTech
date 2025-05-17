
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // Add other image hostnames if you use them for OG images, e.g.
      // {
      //   protocol: 'https',
      //   hostname: 'your-og-image-provider.com',
      // },
    ],
  },
};

export default nextConfig;
