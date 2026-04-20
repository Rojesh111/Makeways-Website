'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  {
    id: 1,
    title: 'Nepal Super League 2023',
    images: '/images/activation/NSL.jpg',
  },
  
  {
    id: 4,
    title: 'Yamaha Dealers Meet — Malaysia',
    images: '/images/activation/Yamaha%202.jpg',
  },

  {
    id: 9,
    title: 'VR Holdings × LET Aircraft & Etihad Media Trip',
    images: '/images/activation/Eithad.jpg',
  },
  

  {
    id: 7,
    title: 'Fiat Brand Ambassador & Yamaha FZS-Fi Launch',
    images: '/images/activation/Paras.jpg',
  },


];

export default function EventPage() {
  return (
    <PortfolioCategory
      title="EVENT"
      subtitle="Events"
      accent="#FF8C00"
      items={items}
    />
  );
}