'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  {
    id     : 1,
    title  : 'Neta',
    images : [
      '/images/portfolio/static/neta.jpg',
      '/images/portfolio/static/neta1.jpg',
      '/images/portfolio/static/neta2.jpg',
      '/images/portfolio/static/neta3.jpg',
      '/images/portfolio/static/neta4.jpg',
      '/images/portfolio/static/neta5.jpg',
    ],
  },
  {
    id     : 2,
    title  : 'Gold Star',
    images : [
      '/images/portfolio/static/goldstar.jpg',
      '/images/portfolio/static/goldstar1.jpg',
      '/images/portfolio/static/Goldstar Shoes (1).jpg',
      '/images/portfolio/static/Goldstar Shoes Series.jpg',
      '/images/portfolio/static/Goldstar Shoes Series (1).jpg',
      '/images/portfolio/static/Goldstar Shoes Series (2).jpg',
    ],
  },
  {
    id     : 3,
    title  : 'Acer Iconia',
    images : [
      '/images/portfolio/static/acer.jpg',
      '/images/portfolio/static/Acer Iconia.jpg',
      '/images/portfolio/static/Acer Iconia (1).jpg',
    ],
  },
  {
    id     : 4,
    title  : 'Arna Beer',
    images : '/images/portfolio/static/ARNA Beer.jpg',
  },
  {
    id     : 5,
    title  : 'Bip App',
    images : [
      '/images/portfolio/static/Bip App.jpg',
    ],
  },
  {
    id     : 6,
    title  : 'CG Net',
    images : [
      '/images/portfolio/static/CG Net.jpg',
      '/images/portfolio/static/CG Net (1).jpg',
      '/images/portfolio/static/CG Net (2).jpg',
    ],
  },
  {
    id     : 7,
    title  : 'Fiat Nepal',
    images : [
      '/images/portfolio/static/fiat.png',
      '/images/portfolio/static/fiat1.jpg',
    ],
  },
  {
    id     : 8,
    title  : 'Hero',
    images : [
      '/images/portfolio/static/hero.png',
      '/images/portfolio/static/hero1.png',
    ],
  },
  {
    id     : 9,
    title  : 'Himalayan Reserve',
    images : [
      '/images/portfolio/static/Himalayan Reserve.jpg',
    ],
  },
  {
    id     : 10,
    title  : 'KIA Motors',
    images : [
      '/images/portfolio/static/KIA Motors.jpg',
      '/images/portfolio/static/KIA Motors (1).jpg',
      '/images/portfolio/static/KIA Sportage.jpg',
    ],
  },
  {
    id     : 11,
    title  : 'Komatsu',
    images : [
      '/images/portfolio/static/KOMATSU.jpg',
    ],
  },
  {
    id     : 12,
    title  : 'Monalisa',
    images : [
      '/images/portfolio/static/Monalisa.jpg',
    ],
  },
    {
    id     : 13,
    title  : 'NBank',
    images : [
      '/images/portfolio/static/nbank.jpg',
      '/images/portfolio/static/nbank (1).jpg',
      '/images/portfolio/static/nbank (2).jpg',
      '/images/portfolio/static/nBank- Influencer Campaign - I am nGen.jpg',
      '/images/portfolio/static/nBank- Influencer Campaign - I am nGen (1).jpg',
      '/images/portfolio/static/nBank- Influencer Campaign - I am nGen (3).jpg',
      '/images/portfolio/static/nBank- Influencer Campaign - I am nGen (4).jpg',
    ],
  },
  {
    id     : 14,
    title  : 'Padelux',
    images : [
      '/images/portfolio/static/padelux.jpg',
      '/images/portfolio/static/padelux1.jpg',
      '/images/portfolio/static/PADelux Sanitary Pad.jpg',
    ],
  },
  {
    id     : 15,
    title  : 'SKODA',
    images : [
      '/images/portfolio/static/SKODA.jpg',
      '/images/portfolio/static/SKODA (1).jpg',
    ],
  },
  {
    id     : 16,
    title  : 'Suzuki',
    images : [
      '/images/portfolio/static/Suzuki.jpg',
    ],
  },
    {
    id     : 17,
    title  : 'Yamaha',
    images : [
      '/images/portfolio/static/yamaha.jpg',
      '/images/portfolio/static/Yamaha Nepal.webp',
      '/images/portfolio/static/Yamaha Nepal (1).webp',
      '/images/portfolio/static/Yamaha Nepal (2).webp',
      '/images/portfolio/static/Yamaha Nepal (3).webp',
      '/images/portfolio/static/Yamaha Nepal (4).webp',
      '/images/portfolio/static/Yamaha Nepal- 2013.webp',
      '/images/portfolio/static/Yamaha Nepal - 2013.webp',
      '/images/portfolio/static/Yamaha Nepal - 2013 (1).webp',
      '/images/portfolio/static/Yamaha Miss Nepal.webp',
      '/images/portfolio/static/Yamaha - Miss Nepal.webp',
      '/images/portfolio/static/Yamaha - Miss Nepal (1).webp',
      '/images/portfolio/static/Yamaha - Miss Nepal Series.webp',
      '/images/portfolio/static/Yamaha - Miss Nepal Series (1).webp',
      '/images/portfolio/static/Yamaha - Miss Nepal Series (2).webp',
      '/images/portfolio/static/Yamaha Ray ZR.webp',

    ],
  },
];

export default function StaticPage() {
  return (
    <PortfolioCategory
      title    = "STATIC"
      subtitle = "Print & Digital"
      accent   = "#f47c20"
      items    = {items}
    />
  );
}