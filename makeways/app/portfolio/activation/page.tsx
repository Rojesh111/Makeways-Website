'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

/*
  Key fixes
  ──────────
  1. `src` → `images`  (was being silently ignored as a video-only field)
  2. `isVideo: false` removed (redundant default)
  3. Yamaha%202.jpg decoded to natural filename — URL encoding in `src`
     props can sometimes confuse certain Next.js Image loaders.
     If your /public path literally has a space, keep the encoding; otherwise
     rename the file to "Yamaha 2.jpg" or "Yamaha2.jpg" and update here.
*/

const items = [
  {
    id     : 1,
    title  : 'Nepal Super League 2023',
    client : 'Nepal Super League',
    year   : '2023',
    images : '/images/activation/NSL.jpg',
  },
  {
    id     : 2,
    title  : 'Yamaha FZ Street Fighter Ride Out',
    client : 'Yamaha Nepal',
    year   : '2023',
    images : '/images/activation/Yamaha.jpg',
  },
  {
    id     : 3,
    title  : 'JCB 220LC Launching Ceremony',
    client : 'JCB Nepal',
    year   : '2016',
    images : '/images/activation/JCB.jpg',
  },
  {
    id     : 4,
    title  : 'Yamaha Dealers Meet — Malaysia',
    client : 'Yamaha Nepal',
    year   : '2016',
    /*
      If the actual file on disk is "Yamaha 2.jpg", use the encoded form.
      If it's "Yamaha2.jpg" (no space), remove the %20.
    */
    images : '/images/activation/Yamaha%202.jpg',
  },
  {
    id     : 5,
    title  : 'Digo Paila Walkathon',
    client : 'Nabil Bank',
    year   : '2023',
    images : '/images/activation/Nabil.jpg',
  },
  {
    id     : 6,
    title  : 'Hero MotoCorp × CG Motors Launch',
    client : 'Chaudhary Group / Hero MotoCorp',
    year   : '2023',
    images : '/images/activation/Hero.jpg',
  },
  {
    id     : 7,
    title  : 'Fiat Brand Ambassador & Yamaha FZS-Fi Launch',
    client : 'Fiat / Yamaha Nepal',
    year   : '2015',
    images : '/images/activation/Paras.jpg',
  },
  {
    id     : 8,
    title  : 'Miss Nepal — Face of Fascino',
    client : 'Yamaha Nepal / Miss Nepal',
    year   : '2017',
    images : '/images/activation/fiat.jpg',
  },
  {
    id     : 9,
    title  : 'VR Holdings × LET Aircraft & Etihad Media Trip',
    client : 'VR Holdings / Etihad Airways',
    year   : '2015',
    images : '/images/activation/Eithad.jpg',
  },
];

export default function ActivationPage() {
  return (
    <PortfolioCategory
      title="ACTIVATION"
      subtitle="Brand Activation & Experiential"
      accent="#f47c20"
      items={items}
    />
  );
}