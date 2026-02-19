'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  { id: 1,  title: 'Magazine Spread',      client: 'CLIENT NAME', year: '2024', isVideo: false, src: '' },
  { id: 2,  title: 'OOH Billboard',        client: 'CLIENT NAME', year: '2024', isVideo: false, src: '' },
  { id: 3,  title: 'Newspaper Campaign',   client: 'CLIENT NAME', year: '2023', isVideo: false, src: '' },
  { id: 4,  title: 'Brochure Design',      client: 'CLIENT NAME', year: '2023', isVideo: false, src: '' },
  { id: 5,  title: 'Poster Series',        client: 'CLIENT NAME', year: '2024', isVideo: false, src: '' },
  { id: 6,  title: 'Brand Identity',       client: 'CLIENT NAME', year: '2022', isVideo: false, src: '' },
];

export default function PrintPage() {
  return (
    <PortfolioCategory
      title="PRINT"
      subtitle="Print & Outdoor"
      accent="#FF8C00"
      items={items}
    />
  );
}