/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ── Long cache TTL: images are served from Next.js cache for 1 year
    // This is what eliminates the 257ms "Waiting for server response" on repeat visits.
    // Default is only 60s — which is why every reload hits the server again.
    minimumCacheTTL: 31536000, // 1 year in seconds

    // ── Only generate the sizes your slider actually uses.
    // Fewer entries = faster srcset resolution.
    deviceSizes: [640, 1080, 1920],
    imageSizes:  [],

    // ── WebP + AVIF: AVIF is ~50% smaller than JPEG at same quality.
    // Next.js will auto-convert your .jpeg/.jpg files to AVIF for modern browsers.
    formats: ['image/avif', 'image/webp'],

    // ── Increase quality slightly — 80 gives better visual with AVIF compression
    // (AVIF at 80 is visually similar to JPEG at 95 but much smaller file size)
    // Note: override per-image with quality prop on <Image>
  },

  // ── HTTP cache headers for /images/* static files ─────────────────
  // This tells browsers AND CDNs to cache images aggressively.
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            // public: CDN-cacheable
            // max-age=31536000: browser caches for 1 year
            // immutable: browser won't revalidate even on reload
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