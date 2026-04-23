import type { Metadata, Viewport } from 'next';
import './globals.css';

/* ============================================================
   METADATA
   ============================================================ */
export const metadata: Metadata = {
  title: {
    default  : "MAKEWAYS — Nepal's Most Awarded Advertising Agency",
    template : '%s | MAKEWAYS',
  },
  description :
    "Makeways Pvt. Ltd. is an independent, full-service advertising agency based in Kathmandu, Nepal. Cutting-edge marcom solutions since 2013.",
  keywords :
    'advertising agency, nepal, kathmandu, marketing, brand strategy, digital marketing, makeways',
  authors    : [{ name: 'Makeways Pvt. Ltd.' }],
  robots     : { index: true, follow: true },
  openGraph  : {
    title       : "MAKEWAYS — Nepal's Most Awarded Advertising Agency",
    description : 'Cutting-edge marcom solutions through a wide range of professional services.',
    type        : 'website',
    locale      : 'en_US',
    siteName    : 'MAKEWAYS',
  },
  twitter: {
    card        : 'summary_large_image',
    title       : "MAKEWAYS — Nepal's Most Awarded Advertising Agency",
    description : 'Cutting-edge marcom solutions through a wide range of professional services.',
  },
};

/* ============================================================
   VIEWPORT  (separate export required in Next.js 14+)
   ============================================================ */
export const viewport: Viewport = {
  width        : 'device-width',
  initialScale : 1,
  maximumScale : 5,
  themeColor   : '#f47c20',
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          ── CRITICAL FONT PRELOADS ─────────────────────────────────────
          Files must live in: /public/fonts/FONTS/

          Preload order — most render-blocking first:
          1. EurostileExt-Bold_Regular.ttf  → all H2/H3, card titles, bold labels
          2. EurostileCnd-Bold_Regular.ttf  → all H4–H6 overlines, role labels
          3. EurostileExt-Normal_Regular.ttf → all body copy, lead text, captions
          4. EurostileTBold.ttf              → hero H1, display weight 800/900
        */}
        <link
          rel="preload"
          href="/fonts/FONTS/EurostileExt-Bold_Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FONTS/EurostileCnd-Bold_Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FONTS/EurostileExt-Normal_Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FONTS/EurostileTBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* ── Favicons ── */}
        <link rel="icon"             href="/favicon.ico"          sizes="any" />
        <link rel="icon"             href="/favicon.svg"          type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>

      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}