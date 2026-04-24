'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  {
    id     : 1,
    title  : 'Neta',
    images : [
      '/images/portfolio/static/neta.webp',
      '/images/portfolio/static/neta1.webp',
      '/images/portfolio/static/neta2.webp',
      '/images/portfolio/static/neta3.webp',
      '/images/portfolio/static/neta4.webp',
      '/images/portfolio/static/neta5.webp',
    ],
  },
  {
    id     : 2,
    title  : 'Gold Star',
    images : [
      '/images/portfolio/static/goldstar.webp',
      '/images/portfolio/static/goldstar1.webp',
      '/images/portfolio/static/Goldstar Shoes.webp',
      '/images/portfolio/static/Goldstar Shoes Series.webp',
      '/images/portfolio/static/Goldstar Shoes Series (2).webp',
    ],
  },
  {
    id     : 3,
    title  : 'NBank',
    images : [
      '/images/portfolio/static/nBank.webp',
      '/images/portfolio/static/nBank (1).webp',
      '/images/portfolio/static/nBank (2).webp',
      '/images/portfolio/static/nBank- Influencer Campaign - I am nGen.webp',
      '/images/portfolio/static/nBank- Influencer Campaign - I am nGen (1).webp',
      '/images/portfolio/static/nBank- Influencer Campaign - I am nGen (3).webp',
      '/images/portfolio/static/nBank- Influencer Campaign - I am nGen (4).webp',
    ],
  },
  {
    id     : 4,
    title  : 'Padelux',
    images : [
      '/images/portfolio/static/padelux.webp',
      '/images/portfolio/static/padelux1. webp',
      '/images/portfolio/static/PADelux Sanitary Pad.webp',
    ],
  },
  {
    id     : 5,
    title  : 'Hero',
    images : [
      '/images/portfolio/static/hero.webp',
      '/images/portfolio/static/hero1.webp',
    ],
  },
  {
    id     : 6,
    title  : 'Yamaha',
    images : [
      '/images/portfolio/static/yamaha.webp',
      '/images/portfolio/static/Yamaha Nepal.webp',
      '/images/portfolio/static/Yamaha Nepal (1).webp',
      '/images/portfolio/static/Yamaha Nepal (2).webp',
      '/images/portfolio/static/Yamaha Fascino.webp',
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
  {
    id     : 7,
    title  : 'Suzuki',
    images : [
      '/images/portfolio/static/Suzuki.webp',
    ],
  },
  {
    id     : 8,
    title  : 'CG Net',
    images : [
      '/images/portfolio/static/CG NET.webp',
      '/images/portfolio/static/CG NET (2).webp',
    ],
  },
  {
    id     : 9,
    title  : 'Acer Iconia',
    images : [
      '/images/portfolio/static/acer.webp',
      '/images/portfolio/static/Acer Iconia.webp',
      '/images/portfolio/static/Acer Iconia (1).webp',
    ],
  },
  {
    id     : 10,
    title  : 'Arna Beer',
    images : '/images/portfolio/static/ARNA Beer.webp',
  },
  {
    id     : 11,
    title  : 'Bip App',
    images : [
      '/images/portfolio/static/Bip App.webp',
    ],
  },
  {
    id     : 12,
    title  : 'Fiat Nepal',
    images : [
      '/images/portfolio/static/fiat.webp',
      '/images/portfolio/static/fiat1.webp',
    ],
  },

  {
    id     : 13,
    title  : 'Himalayan Reserve',
    images : [
      '/images/portfolio/static/himalayan reserve.webp',
    ],
  },
  {
    id     : 14,
    title  : 'KIA Motors',
    images : [
      '/images/portfolio/static/KIA Motors.webp',
      '/images/portfolio/static/KIA Motors (1).webp',
      '/images/portfolio/static/KIA Sportage.webp',
    ],
  },
  {
    id     : 15,
    title  : 'Komatsu',
    images : [
      '/images/portfolio/static/KOMATSU.webp',
    ],
  },
  {
    id     : 16,
    title  : 'Monalisa',
    images : [
      '/images/portfolio/static/Monalisa.webp',
    ],
  },
  {
    id     : 17,
    title  : 'SKODA',
    images : [
      '/images/portfolio/static/SKODA.webp',
      '/images/portfolio/static/SKODA (1).webp',
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