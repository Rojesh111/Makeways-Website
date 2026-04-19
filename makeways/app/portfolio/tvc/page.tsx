'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

// ── Helper: YouTube max-res thumbnail from video ID ──────────────────────────
const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

const items = [
  // ── VIDEOS FROM youtube.com/@makewaysadvertising ───────────────────────────
  // Each item uses videoUrl (opens YouTube in new tab) + cover (YouTube thumbnail)
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Suzuki Advertisement',
    client: 'Suzuki',
    year: '2024',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=q5KYvPgPk6U',
    cover: ytThumb('q5KYvPgPk6U'),
  },
  {
    id: 2,
    title: 'Yamaha Advertisement',
    client: 'Yamaha',
    year: '2024',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=X9ODmfPV8G4',
    cover: ytThumb('X9ODmfPV8G4'),
  },
  {
    id: 3,
    title: 'NSL Advertisement',
    client: 'NSL',
    year: '2024',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=b6OR_L1tSr8',
    cover: ytThumb('b6OR_L1tSr8'),
  },
  {
    id: 4,
    title: 'Padelux Advertisement',
    client: 'Padelux',
    year: '2024',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=e8tvp4WzUiw',
    cover: ytThumb('e8tvp4WzUiw'),
  },
  {
    id: 5,
    title: 'Neta Advertisement',
    client: 'Neta',
    year: '2024',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=49f6uU2f9Ks',
    cover: ytThumb('49f6uU2f9Ks'),
  },
  {
    id: 6,
    title: 'Neta Advertisement',
    client: 'Neta',
    year: '2024',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=yRl7OqoG3XI',
    cover: ytThumb('yRl7OqoG3XI'),
  },
  {
    id: 7,
    title: 'NBank Advertisement',
    client: 'NBank',
    year: '2024',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=WSdtEuZ9QsE',
    cover: ytThumb('WSdtEuZ9QsE'),
  },
  {
    id: 8,
    title: 'Hulas Steel Advertisement',
    client: 'Hulas Steel',
    year: '2024',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=KaOppBbAPwc',
    cover: ytThumb('KaOppBbAPwc'),
  },
  {
    id: 9,
    title: 'Hulas Steel Advertisement',
    client: 'Hulas Steel',
    year: '2024',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=tk494RWI6SU',
    cover: ytThumb('tk494RWI6SU'),
  },
];

export default function TVCPage() {
  return (
    <PortfolioCategory
      title="TVC"
      subtitle="Television Commercials"
      accent="#FF8C00"
      items={items}
    />
  );
}