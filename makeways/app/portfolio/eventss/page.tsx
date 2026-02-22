'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  { id: 1,  title: 'NSL 2023 Opening Ceremony',  client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture2.png' },
  { id: 2,  title: 'NSL 2023 Live Performance',   client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture3.jpg' },
  { id: 3,  title: 'Lalitpur City Champions',     client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture4.png' },
  { id: 4,  title: 'NSL Cheerleaders',            client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture5.jpg' },
  { id: 5,  title: 'NSL 2023 Closing Ceremony',   client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture6.jpg' },
  { id: 6,  title: 'NSL Event Highlight',         client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture7.jpg' },
  { id: 7,  title: 'NSL Fan Engagement',          client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture9.jpg' },
  { id: 8,  title: 'NSL Stadium Crowd',           client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture10.jpg' },
  { id: 9,  title: 'NSL Award Night',             client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture11.png' },
  { id: 10, title: 'NSL Trophy Presentation',     client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture12.jpg' },
  { id: 11, title: 'NSL Victory Celebration',     client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture13.jpg' },
  { id: 12, title: 'NSL Grand Finale',            client: 'Nepal Super League', year: '2023', isVideo: false, src: '/images/portfolio/eventss/Picture14.png' },
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