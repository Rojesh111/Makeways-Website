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
          Only files that EXIST in /public/fonts/FONTS/ are listed.

          PRELOAD ORDER (most critical first):

          1. EurostileExt-Bold_Regular.ttf
             Covers Eurostile 700 — all H2, H3, bold labels, pull quotes.

          2. EurostileCnd-Bold_Regular.ttf
             All H4 overlines, role labels, card labels, service names.

          3. EurostileExt-Normal_Regular.ttf
             All body copy, lead text, quote paragraphs, bio text.

          4. EurostileTBold.ttf
             Heavy display weight 800/900 — hero titles, portfolio, "SAYS".
        */}
        <link
          rel="preload"
          href="/fonts/FONTS/EurostileExt-Bold_Regular.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FONTS/EurostileCnd-Bold_Regular.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FONTS/EurostileExt-Normal_Regular.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FONTS/EurostileTBold.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />

        {/* ── Favicon ── */}
        <link rel="icon"             href="/favicon.ico"          sizes="any" />
        <link rel="icon"             href="/favicon.svg"          type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}