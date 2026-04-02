'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  { id: 1, title: 'Nepal Super League 2023',                         client: 'Nepal Super League',              year: '2023', isVideo: false, src: '/images/activation/NSL.jpg' },
  { id: 2, title: 'Yamaha FZ Street Fighter Ride Out',               client: 'Yamaha Nepal',                    year: '2023', isVideo: false, src: '/images/activation/Yamaha.jpg' },
  { id: 3, title: 'JCB 220LC Launching Ceremony',                    client: 'JCB Nepal',                       year: '2016', isVideo: false, src: '/images/activation/JCB.jpg' },
  { id: 4, title: 'Yamaha Dealers Meet — Malaysia',                  client: 'Yamaha Nepal',                    year: '2016', isVideo: false, src: '/images/activation/Yamaha%202.jpg' },
  { id: 5, title: 'Digo Paila Walkathon',                            client: 'Nabil Bank',                      year: '2023', isVideo: false, src: '/images/activation/Nabil.jpg' },
  { id: 6, title: 'Hero MotoCorp × CG Motors Launch',               client: 'Chaudhary Group / Hero MotoCorp', year: '2023', isVideo: false, src: '/images/activation/Hero.jpg' },
  { id: 7, title: 'Fiat Brand Ambassador & Yamaha FZS-Fi Launch',    client: 'Fiat / Yamaha Nepal',             year: '2015', isVideo: false, src: '/images/activation/Paras.jpg' },
  { id: 8, title: 'Miss Nepal — Face of Fascino',                    client: 'Yamaha Nepal / Miss Nepal',       year: '2017', isVideo: false, src: '/images/activation/fiat.jpg' },
  { id: 9, title: 'VR Holdings × LET Aircraft & Etihad Media Trip',  client: 'VR Holdings / Etihad Airways',   year: '2015', isVideo: false, src: '/images/activation/Eithad.jpg' },
];

export default function ActivationPage() {
  return (
    <PortfolioCategory
      title="ACTIVATION"
      subtitle="Brand Activation & Experiential"
      accent="#FF8C00"
      items={items}
    />
  );
}