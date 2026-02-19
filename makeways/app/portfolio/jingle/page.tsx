'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  { id: 1,  title: 'Brand Jingle',          client: 'CLIENT NAME', year: '2024', isVideo: false, src: '' },
  { id: 2,  title: 'Radio Commercial',      client: 'CLIENT NAME', year: '2024', isVideo: false, src: '' },
  { id: 3,  title: 'Campaign Theme Song',   client: 'CLIENT NAME', year: '2023', isVideo: false, src: '' },
  { id: 4,  title: 'Audio Branding',        client: 'CLIENT NAME', year: '2023', isVideo: false, src: '' },
  { id: 5,  title: 'TV Jingle',             client: 'CLIENT NAME', year: '2024', isVideo: false, src: '' },
  { id: 6,  title: 'Festival Jingle',       client: 'CLIENT NAME', year: '2022', isVideo: false, src: '' },
];

export default function JinglePage() {
  return (
    <PortfolioCategory
      title="JINGLE"
      subtitle="Audio & Jingle Production"
      accent="#FF8C00"
      items={items}
    />
  );
}