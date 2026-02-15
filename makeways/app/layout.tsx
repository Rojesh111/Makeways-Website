import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MAKEWAYS - Creative Marketing Agency',
  description: 'At MAKEWAYS, we take our work too seriously without taking ourselves seriously',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}