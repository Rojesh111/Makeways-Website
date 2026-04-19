/** @type {import('next').NextConfig} */
const nextConfig = {

  /* ════════════════════════════════════════════════════════════════
     IMAGE OPTIMISATION
     Goal: crisp, fast images at every viewport — marketing quality.
  ════════════════════════════════════════════════════════════════ */
  images: {

    // ── Quality allowlist ──────────────────────────────────────────
    // 80  → hero thumbnails, gallery grid (fast + sharp)
    // 85  → portfolio feature images (extra crispness)
    // 90  → logo / brand marks (lossless-looking)
    qualities: [80, 85, 90],

    // ── Breakpoints ───────────────────────────────────────────────
    // Matches real device widths: mobile → tablet → FHD → 4K
    // Fewer sizes = fewer cached variants = faster cold cache
    deviceSizes: [480, 768, 1080, 1440, 1920, 2560],

    // imageSizes: used for non-full-width images (portfolio cards etc.)
    imageSizes: [64, 256, 512],

    // ── Modern formats ────────────────────────────────────────────
    // AVIF: ~50% smaller than WebP — Chrome/Firefox/Safari 16+
    // WebP: universal fallback
    formats: ['image/avif', 'image/webp'],

    // ── Cache TTL ─────────────────────────────────────────────────
    // 1 year — images are content-hashed so stale cache is never an issue
    minimumCacheTTL: 31_536_000,

    // ── Remote patterns ───────────────────────────────────────────
    // Allow YouTube thumbnail domains for portfolio video covers
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
    ],

    // ── Disable blur placeholder on large hero images ──────────────
    // (you control loading UX via HeroSlider shimmer animation)
    dangerouslyAllowSVG: true,          // allow SVG logo if needed
    contentDispositionType: 'inline',   // serve inline, not as download
  },


  /* ════════════════════════════════════════════════════════════════
     HTTP HEADERS
     Aggressive caching for static assets + security baseline.
  ════════════════════════════════════════════════════════════════ */
  async headers() {
    return [
      /* ── Images ─────────────────────────────────────────────── */
      {
        source : '/images/:path*',
        headers: [
          {
            key  : 'Cache-Control',
            // immutable: browser never re-validates (content-hashed filenames)
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      /* ── Videos ──────────────────────────────────────────────── */
      {
        source : '/Videos/:path*',
        headers: [
          {
            key  : 'Cache-Control',
            // stale-while-revalidate: serve cached video instantly,
            // revalidate in background — best for large mp4 files
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
          {
            // Required for <video> byte-range requests (seeking / buffering)
            key  : 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },

      /* ── Fonts ───────────────────────────────────────────────── */
      {
        source : '/fonts/FONTS/:path*',
        headers: [
          {
            key  : 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      /* ── Security baseline (all routes) ─────────────────────── */
      {
        source : '/:path*',
        headers: [
          { key: 'X-Content-Type-Options',  value: 'nosniff'          },
          { key: 'X-Frame-Options',          value: 'SAMEORIGIN'       },
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
          // Preconnect hint — speeds up any external requests (analytics, etc.)
          { key: 'X-DNS-Prefetch-Control',  value: 'on'               },
        ],
      },
    ];
  },


  /* ════════════════════════════════════════════════════════════════
     COMPILER / BUNDLER
     Squeeze every millisecond out of build + runtime.
  ════════════════════════════════════════════════════════════════ */

  // Remove console.* in production builds (cleaner, tiny perf gain)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // Compress responses with gzip (true by default, make it explicit)
  compress: true,

  // Strict mode catches subtle React bugs during development
  reactStrictMode: true,

  // Output standalone bundle — faster cold starts on Node/Docker hosts
  // output: 'standalone',   // ← uncomment if deploying to Docker / VPS

  /* ════════════════════════════════════════════════════════════════
     EXPERIMENTAL — safe, production-ready flags
  ════════════════════════════════════════════════════════════════ */
  experimental: {
    // Optimise CSS delivery — inlines critical CSS, defers the rest
    optimizeCss: true,

    // Scroll position is restored when navigating back (UX win for gallery)
    scrollRestoration: true,
  },
};

module.exports = nextConfig;