'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  { id: 1,  title: 'Product Launch Event',   client: 'CLIENT NAME', year: '2024', isVideo: false, src: '' },
  { id: 2,  title: 'Brand Activation',       client: 'CLIENT NAME', year: '2024', isVideo: true,  src: '' },
  { id: 3,  title: 'Corporate Gala',         client: 'CLIENT NAME', year: '2023', isVideo: false, src: '' },
  { id: 4,  title: 'Festival Activation',    client: 'CLIENT NAME', year: '2023', isVideo: false, src: '' },
  { id: 5,  title: 'Live Event Coverage',    client: 'CLIENT NAME', year: '2024', isVideo: true,  src: '' },
  { id: 6,  title: 'Exhibition Stand',       client: 'CLIENT NAME', year: '2022', isVideo: false, src: '' },
];

export default function EventPage() {
  return (
    <PortfolioCategory
      title="EVENT"
      subtitle="Events & Activations"
      accent="#FF8C00"
      items={items}
    />
  );
}