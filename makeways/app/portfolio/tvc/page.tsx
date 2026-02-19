'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  // ── HOW TO ADD ITEMS ────────────────────────────────────────────────────────
  // 1. Place files in /public/portfolio/tvc/
  // 2. For images: src: '/portfolio/tvc/your-image.jpg'
  // 3. For videos: src: '/portfolio/tvc/your-video.mp4', isVideo: true
  // ────────────────────────────────────────────────────────────────────────────
  { id: 1,  title: 'Brand Campaign',      client: 'CLIENT NAME', year: '2024', isVideo: true,  src: '' },
  { id: 2,  title: 'Corporate TVC',       client: 'CLIENT NAME', year: '2024', isVideo: true,  src: '' },
  { id: 3,  title: 'Product Launch',      client: 'CLIENT NAME', year: '2023', isVideo: true,  src: '' },
  { id: 4,  title: 'Festive Campaign',    client: 'CLIENT NAME', year: '2023', isVideo: true,  src: '' },
  { id: 5,  title: 'Brand Film',          client: 'CLIENT NAME', year: '2024', isVideo: true,  src: '' },
  { id: 6,  title: 'TV Advertisement',    client: 'CLIENT NAME', year: '2022', isVideo: true,  src: '' },
];

export default function TVCPage() {
  return (
    <PortfolioCategory
      title="TVC"
      subtitle="Television Commercials"
      accent="#FF8C00"
      items={items}
    />
  );
}