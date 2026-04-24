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
    title: 'Provisa- TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=S-pZkcSjwZs',
    cover: ytThumb('S-pZkcSjwZs'),
  },
  {
    id: 2,
    title: "NBank Nepal's first NeoBank- TVC",
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=WSdtEuZ9QsE',
    cover: ytThumb('WSdtEuZ9QsE'),
  },
  {
    id: 3,
    title: 'Hulas Steel Premium AL-ZN Colored Sheet- TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=KaOppBbAPwc',
    cover: ytThumb('KaOppBbAPwc'),
  },
  {
    id: 4,
    title: 'Padelux Health and Hygiene-TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=e8tvp4WzUiw',
    cover: ytThumb('e8tvp4WzUiw'),
  },
  {
    id: 5,
    title: 'Neta V The Pure EV- TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=49f6uU2f9Ks',
    cover: ytThumb('49f6uU2f9Ks'),
  },
  {
    id: 6,
    title: 'Neta V Family- TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=iG89uAMD7ck',
    cover: ytThumb('iG89uAMD7ck'),
  },
  {
    id: 7,
    title: 'Neta V The Pure EV- TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=yRl7OqoG3XI',
    cover: ytThumb('yRl7OqoG3XI'),
  },
  {
    id: 8,
    title: 'Hulas Aluminium- TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=tk494RWI6SU',
    cover: ytThumb('tk494RWI6SU'),
  },
  {
    id: 9,
    title: 'Neta U Timeline- TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=lo3OkfLcinU',
    cover: ytThumb('lo3OkfLcinU'),
  },
  {
    id: 10,
    title: 'Nabil Bank 40 years of Excellence- TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=Zq5HwyVFsl0',
    cover: ytThumb('Zq5HwyVFsl0'),
  },
  {
    id: 11,
    title: 'AION Y- TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=0xJotZ-abPg',
    cover: ytThumb('0xJotZ-abPg'),
  },
  {
    id: 12,
    title: 'Neta V The Pure EV- TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=oB1O0lOHpaI',
    cover: ytThumb('oB1O0lOHpaI'),
  },
  {
    id: 13,
    title: 'Suzuki Spresso-TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=q5KYvPgPk6U',
    cover: ytThumb('q5KYvPgPk6U'),
  },
  {
    id: 14,
    title: 'Yamaha Design To Win-TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=X9ODmfPV8G4',
    cover: ytThumb('X9ODmfPV8G4'),
  },
  {
    id: 15,
    title: 'Nepal Super League-TVC',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=b6OR_L1tSr8',
    cover: ytThumb('b6OR_L1tSr8'),
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