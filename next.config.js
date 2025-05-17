
// @ts-check

/** @type {import('next').NextConfig} */

// Determine CSP script sources based on environment
const cspDevelopmentScriptSources = process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : "";

// Construct the Content-Security-Policy string
// Allowing 'unsafe-inline' for styles as Tailwind CSS might use them.
// Allowing 'unsafe-eval' for scripts in development for HMR.
const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${cspDevelopmentScriptSources};
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://placehold.co data:;
  font-src 'self';
  object-src 'none';
  frame-ancestors 'none';
`.replace(/\s{2,}/g, ' ').trim(); // Remove extra whitespace and trim

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY', // Though frame-ancestors in CSP is preferred, this adds an extra layer.
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin', // Can be 'same-origin-allow-popups' if needed
  }
];

const nextConfig = {
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
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
