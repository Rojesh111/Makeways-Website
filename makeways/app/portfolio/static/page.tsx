'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  {
    id     : 1,
    title  : 'Digital Ad Campaign',
    client : 'Neta',
    year   : '2024',
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
    title  : 'Digital Ad Campaign',
    client : 'Gold Star',
    year   : '2024',
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
    title  : 'Acer Laptop Launch Campaign',
    client : 'Acer Iconia',
    year   : '2024',
    images : [
      '/images/portfolio/static/acer.jpg',
      '/images/portfolio/static/Acer Iconia.jpg',
      '/images/portfolio/static/Acer Iconia (1).jpg',
    ],
  },
  {
    id     : 4,
    title  : 'Digital Campaign',
    client : 'Arna Beer',
    year   : '2023',
    images : '/images/portfolio/static/ARNA Beer.jpg',
  },
  {
    id     : 5,
    title  : 'Digital Campaign',
    client : 'Bip App',
    year   : '2024',
    images : [
      '/images/portfolio/static/Bip App.jpg',
    ],
  },
  {
    id     : 6,
    title  : 'Digital Campaign',
    client : 'CG Net',
    year   : '2023',
    images : [
      '/images/portfolio/static/CG Net.jpg',
      '/images/portfolio/static/CG Net (1).jpg',
      '/images/portfolio/static/CG Net (2).jpg',
    ],
  },
  {
    id     : 7,
    title  : 'Digital Campaign',
    client : 'Fiat Nepal',
    year   : '2023',
    images : [
      '/images/portfolio/static/fiat.png',
      '/images/portfolio/static/fiat1.jpg',
    ],
  },
  {
    id     : 8,
    title  : 'Digital Campaign',
    client : 'Hero',
    year   : '2023',
    images : [
      '/images/portfolio/static/hero.png',
      '/images/portfolio/static/hero1.png',
    ],
  },
  {
    id     : 9,
    title  : 'Digital Campaign',
    client : 'Himalayan Reserve',
    year   : '2023',
    images : [
      '/images/portfolio/static/Himalayan Reserve.jpg',
    ],
  },
  {
    id     : 10,
    title  : 'Digital Campaign',
    client : 'KIA Motors',
    year   : '2023',
    images : [
      '/images/portfolio/static/KIA Motors.jpg',
      '/images/portfolio/static/KIA Motors (1).jpg',
      '/images/portfolio/static/KIA Sportage.jpg',
    ],
  },
  {
    id     : 11,
    title  : 'Digital Campaign',
    client : 'Komatsu',
    year   : '2023',
    images : [
      '/images/portfolio/static/KOMATSU.jpg',
    ],
  },
  {
    id     : 12,
    title  : 'Digital Campaign',
    client : 'Monalisa',
    year   : '2023',
    images : [
      '/images/portfolio/static/Monalisa.jpg',
    ],
  },
    {
    id     : 13,
    title  : 'Digital Campaign',
    client : 'NBank',
    year   : '2023',
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
    title  : 'Digital Campaign',
    client : 'Padelux',
    year   : '2023',
    images : [
      '/images/portfolio/static/padelux.jpg',
      '/images/portfolio/static/padelux1.jpg',
      '/images/portfolio/static/PADelux Sanitary Pad.jpg',
    ],
  },
  {
    id     : 15,
    title  : 'Digital Campaign',
    client : 'SKODA',
    year   : '2023',
    images : [
      '/images/portfolio/static/SKODA.jpg',
      '/images/portfolio/static/SKODA (1).jpg',
    ],
  },
  {
    id     : 16,
    title  : 'Digital Campaign',
    client : 'Suzuki',
    year   : '2023',
    images : [
      '/images/portfolio/static/Suzuki.jpg',
    ],
  },
    {
    id     : 17,
    title  : 'Digital Campaign',
    client : 'Yamaha',
    year   : '2023',
    images : [
      '/images/portfolio/static/yamaha.jpg',
      '/images/portfolio/static/Yamaha Nepal.jpg',
      '/images/portfolio/static/Yamaha Nepal (1).jpg',
      '/images/portfolio/static/Yamaha Nepal (2).jpg',
      '/images/portfolio/static/Yamaha Nepal (3).jpg',
      '/images/portfolio/static/Yamaha Nepal (4).jpg',
      '/images/portfolio/static/Yamaha Nepal- 2013.jpg',
      '/images/portfolio/static/Yamaha Nepal - 2013.jpg',
      '/images/portfolio/static/Yamaha Nepal - 2013 (1).jpg',
      '/images/portfolio/static/Yamaha Miss Nepal.jpg',
      '/images/portfolio/static/Yamaha - Miss Nepal.jpg',
      '/images/portfolio/static/Yamaha - Miss Nepal (1).jpg',
      '/images/portfolio/static/Yamaha - Miss Nepal Series.jpg',
      '/images/portfolio/static/Yamaha - Miss Nepal Series (1).jpg',
      '/images/portfolio/static/Yamaha - Miss Nepal Series (2).jpg',
      '/images/portfolio/static/Yamaha Ray ZR.jpg',

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