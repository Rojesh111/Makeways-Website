'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  {
    id: 1,
    title: 'Nepal Super League 2023',
    client: 'Nepal Super League',
    year: '2023',
    images: '/images/activation/NSL.jpg',
  },
  {
    id: 2,
    title: 'Yamaha FZ Street Fighter Ride Out',
    client: 'Yamaha Nepal',
    year: '2023',
    images: '/images/activation/Yamaha.jpg',
  },

  {
    id: 4,
    title: 'Yamaha Dealers Meet — Malaysia',
    client: 'Yamaha Nepal',
    year: '2016',
    /*
      If the actual file on disk is "Yamaha 2.jpg", use the encoded form.
      If it's "Yamaha2.jpg" (no space), remove the %20.
    */
    images: '/images/activation/Yamaha%202.jpg',
  },

  {
    id: 9,
    title: 'VR Holdings × LET Aircraft & Etihad Media Trip',
    client: 'VR Holdings / Etihad Airways',
    year: '2015',
    images: '/images/activation/Eithad.jpg',
  },
  {
    id: 8,
    title: 'Miss Nepal — Face of Fascino',
    client: 'Yamaha Nepal / Miss Nepal',
    year: '2017',
    images: '/images/activation/fiat.jpg',
  },

  {
    id: 7,
    title: 'Fiat Brand Ambassador & Yamaha FZS-Fi Launch',
    client: 'Fiat / Yamaha Nepal',
    year: '2015',
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