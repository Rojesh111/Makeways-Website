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
    id: 3,
    title: 'JCB 220LC Launching Ceremony',
    images: '/images/activation/JCB.jpg',
  },

  {
    id: 5,
    title: 'Digo Paila Walkathon',
    images: '/images/activation/Nabil.jpg',
  },
  {
    id: 6,
    title: 'Hero MotoCorp × CG Motors Launch',
    images: '/images/activation/Hero.jpg',
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