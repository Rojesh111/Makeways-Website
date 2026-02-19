'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  { id: 1,  title: 'Social Media Campaign',  client: 'CLIENT NAME', year: '2024', isVideo: false, src: '' },
  { id: 2,  title: 'Influencer Series',       client: 'CLIENT NAME', year: '2024', isVideo: true,  src: '' },
  { id: 3,  title: 'Motion Graphics',         client: 'CLIENT NAME', year: '2024', isVideo: true,  src: '' },
  { id: 4,  title: 'Digital Campaign',        client: 'CLIENT NAME', year: '2023', isVideo: false, src: '' },
  { id: 5,  title: 'Viral Post Series',       client: 'CLIENT NAME', year: '2024', isVideo: false, src: '' },
  { id: 6,  title: 'App Launch Campaign',     client: 'CLIENT NAME', year: '2023', isVideo: true,  src: '' },
];

export default function DigitalPage() {
  return (
    <PortfolioCategory
      title="DIGITAL"
      subtitle="Digital Marketing"
      accent="#FF8C00"
      items={items}
    />
  );
}