/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === 'true';
const basePath = isStaticExport ? (process.env.NEXT_PUBLIC_BASE_PATH || '/Swayamurja-Production') : '';

const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  ...(isStaticExport
    ? {
        output: 'export',
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swayamurja.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  ...(!isStaticExport
    ? {
        async headers() {
          const isProd = process.env.NODE_ENV === 'production';
          const csp = [
            "default-src 'self'",
            isProd
              ? "script-src 'self' 'unsafe-inline'"
              : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "img-src 'self' data: blob: https://images.unsplash.com https://swayamurja.com",
            "media-src 'self' blob:",
            "connect-src 'self'",
            "frame-ancestors 'self'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join('; ');

          return [
            {
              source: '/(.*)',
              headers: [
                { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
                { key: 'Content-Security-Policy', value: csp },
              ],
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
