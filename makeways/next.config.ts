/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ── Long cache TTL: images are served from Next.js cache for 1 year
    minimumCacheTTL: 31536000,

    // ── Only generate the sizes your slider actually uses
    deviceSizes: [640, 1080, 1920],
    imageSizes:  [],

    // ── WebP + AVIF
    formats: ['image/avif', 'image/webp'],

    // ── FIX: declare every quality value used across the app.
    // Next.js requires explicit allowlist — using quality={80} on <Image>
    // without declaring it here throws the "not configured in qualities" warning.
    qualities: [75, 80],
  },

  // ── HTTP cache headers ─────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;