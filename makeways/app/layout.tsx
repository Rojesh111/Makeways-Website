import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title       : 'MAKEWAYS — Nepal\'s Most Awarded Advertising Agency',
  description : 'Makeways Pvt. Ltd. is an independent, full-service advertising agency based in Kathmandu, Nepal. Cutting-edge marcom solutions since 2013.',
  keywords    : 'advertising agency, nepal, kathmandu, marketing, brand strategy, digital marketing, makeways',
  authors     : [{ name: 'Makeways Pvt. Ltd.' }],
  openGraph: {
    title       : 'MAKEWAYS — Nepal\'s Most Awarded Advertising Agency',
    description : 'Cutting-edge marcom solutions through a wide range of professional services.',
    type        : 'website',
    locale      : 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          Eurostile is loaded via @font-face in globals.css.
          All font files live at: /public/fonts/FONTS/*.ttf

          Font weight mapping (set in globals.css @font-face):
            400 normal   → EurostileExt-Normal Regular.ttf
            400 oblique  → EurostileExtObl-Normal Regular.ttf
            700 normal   → EurostileBold.ttf
            700 oblique  → EurostileExtObl-Bold Regular.ttf
            800 normal   → EurostileTBold.ttf
            900 normal   → EurostileExtended.ttf

          Condensed variant (family: EurostileCnd):
            700 normal   → EurostileCnd-Bold Regular.ttf

          Extended variant (family: EurostileExt):
            700 normal   → EurostileExt-Bold Regular.ttf

          All fonts use font-display: swap for optimal LCP.
        */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}