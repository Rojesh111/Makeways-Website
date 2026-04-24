'use client';

import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  isVideo?: boolean;
  src?: string;
  ytId?: string; // YouTube video ID for video items
}

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
const ytEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Gold Award Win', category: 'AWARDS', src: '/images/awards/award2.webp' },
  { id: 2, title: 'Product TVC', category: 'TVC', isVideo: true, ytId: 'e8tvp4WzUiw' },
  { id: 3, title: 'AAN SAMMAN', category: 'AWARDS', src: '/images/awards/Awards 1.webp' },
  { id: 4, title: 'Viral Social Post', category: 'DIGITAL', isVideo: true, ytId: 'KaOppBbAPwc' },
  { id: 5, title: 'Influencer Series', category: 'DIGITAL', isVideo: true, ytId: '49f6uU2f9Ks' },
  { id: 6, title: 'Creative Excellence', category: 'AWARDS', src: '/images/awards/Awards 8.webp' },
  { id: 7, title: 'Motion Graphics', category: 'DIGITAL', isVideo: true, ytId: 'WSdtEuZ9QsE' },
  { id: 8, title: 'Campaign Visual', category: 'PRINT', src: '/images/portfolio/static/goldstar.webp' },
  { id: 9, title: 'Social Campaign', category: 'DIGITAL', isVideo: true, ytId: 'X9ODmfPV8G4' },
  { id: 10, title: 'Brand Activation', category: 'EVENT', src: '/images/portfolio/static/padelux.webp' },
  { id: 11, title: 'Brand Film', category: 'TVC', isVideo: true, ytId: 'q5KYvPgPk6U' },
  { id: 12, title: 'OOH Billboard', category: 'PRINT', src: '/images/portfolio/static/yamaha.webp' },
  { id: 13, title: 'Live Event Coverage', category: 'EVENT', src: '/images/activation/JCB.webp' },
  { id: 14, title: 'Jingle Campaign', category: 'TVC', src: '/images/activation/Yamaha.webp' },
  { id: 15, title: 'Product Launch', category: 'EVENT', src: '/images/portfolio/static/himalayan reserve.webp' },
  { id: 16, title: 'Festive Campaign', category: 'TVC', isVideo: true, ytId: 'b6OR_L1tSr8' },
  { id: 17, title: 'Newspaper Campaign', category: 'PRINT', src: '/images/portfolio/static/fiat1.webp' },
];

function Lightbox({ item, onClose, onPrev, onNext }: {
  item: GalleryItem; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  return (
    <div className="lb-backdrop" onClick={onClose}>
      <div className="lb" onClick={e => e.stopPropagation()}>
        <button className="lb__close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <button className="lb__arrow lb__arrow--prev" onClick={e => { e.stopPropagation(); onPrev(); }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="lb__media">
          {/* ── YouTube embed ── */}
          {item.isVideo && item.ytId ? (
            <iframe
              src={ytEmbed(item.ytId)}
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              title={item.title}
            />
          ) : item.src ? (
            <Image src={item.src} alt={item.title} fill sizes="(max-width: 860px) 100vw, 860px" style={{ objectFit: 'contain' }} priority />
          ) : (
            <div className="lb__ph">
              {item.isVideo ? (
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              ) : (
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              )}
              <span>{item.isVideo ? 'VIDEO PLACEHOLDER' : 'IMAGE PLACEHOLDER'}</span>
            </div>
          )}
        </div>
        <button className="lb__arrow lb__arrow--next" onClick={e => { e.stopPropagation(); onNext(); }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <div className="lb__caption">
          <span className="lb__cat">{item.category}</span>
          <h3 className="lb__title">{item.title}</h3>
        </div>
      </div>
      <style jsx>{`
        .lb-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:2000;display:flex;align-items:center;justify-content:center;padding:20px;animation:lbfade .2s ease}
        @keyframes lbfade{from{opacity:0}to{opacity:1}}
        .lb{position:relative;width:100%;max-width:860px;background:#fff;display:flex;flex-direction:column;animation:lbpop .22s ease;max-height:92vh}
        @keyframes lbpop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
        .lb__close{position:absolute;top:16px;right:16px;background:rgba(0,0,0,0.6);border:none;color:#fff;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;transition:background .2s}
        .lb__close:hover{background:#FF8C00}
        .lb__arrow{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.5);border:none;color:#fff;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;transition:background .2s}
        .lb__arrow:hover{background:#FF8C00}
        .lb__arrow--prev{left:16px}
        .lb__arrow--next{right:16px}
        .lb__media{position:relative;width:100%;aspect-ratio:16/9;background:#000;overflow:hidden}
        .lb__ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:#bbb;font-family:var(--font-condensed);font-size:9px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase}
        .lb__caption{padding:18px 24px;display:flex;align-items:center;gap:16px;border-top:3px solid #FF8C00;background:#fff}
        .lb__cat{font-family:var(--font-condensed);font-size:9px;font-weight:700;letter-spacing:0.12em;color:#fff;background:#f47c20;padding:4px 10px;text-transform:uppercase;flex-shrink:0;white-space:nowrap}
        .lb__title{font-family:var(--font-primary);font-size:14px;font-weight:700;color:#111;text-transform:uppercase;letter-spacing:0.04em;flex:1;margin:0}
        @media(max-width:600px){.lb__arrow{width:36px;height:36px}.lb__caption{padding:14px 16px;gap:10px}.lb__title{font-size:12px}}
      `}</style>
    </div>
  );
}

function GridCell({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  const [hov, setHov] = useState(false);

  // Thumbnail source: YouTube thumb for video items, src for images, null for placeholders
  const thumbSrc = item.isVideo && item.ytId ? ytThumb(item.ytId) : item.src ?? null;

  return (
    <div className="cell" onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {thumbSrc ? (
        <Image
          src={thumbSrc}
          alt={item.title}
          fill
          sizes="(max-width: 480px) 50vw, (max-width: 935px) 33vw, 311px"
          style={{ objectFit: 'cover' }}
          loading={index < 6 ? 'eager' : 'lazy'}
        />
      ) : (
        <div className="cell__ph">
          {item.isVideo
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
          }
        </div>
      )}
      {item.isVideo && (
        <div className="cell__video-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="5 3 19 12 5 21 5 3" /></svg>
        </div>
      )}
      <div className={`cell__ov${hov ? ' cell__ov--on' : ''}`}>
        <span className="cell__ov-title">{item.title}</span>
        <span className="cell__ov-meta">{item.category}</span>
      </div>
      <style jsx>{`
        .cell{position:relative;aspect-ratio:1/1;background:#f5f5f5;cursor:pointer;overflow:hidden}
        .cell__ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#f0f0f0}
        .cell__video-badge{position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.55);width:28px;height:28px;display:flex;align-items:center;justify-content:center;z-index:1}
        .cell__ov{position:absolute;inset:0;background:rgba(0,0,0,0.72);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:16px;opacity:0;transition:opacity .22s ease;z-index:2}
        .cell__ov--on{opacity:1}
        .cell__ov-title{font-family:var(--font-primary);font-size:12px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.04em;text-align:center;line-height:1.3}
        .cell__ov-meta{font-family:var(--font-condensed);font-size:9px;font-weight:700;color:#FF8C00;text-transform:uppercase;letter-spacing:0.1em;white-space:nowrap}
      `}</style>
    </div>
  );
}

function GalleryInner() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const openItem = (index: number) => setActiveIndex(index);
  const closeItem = () => setActiveIndex(null);
  const prevItem = () => setActiveIndex(i => (i === null || i === 0 ? galleryItems.length - 1 : i - 1));
  const nextItem = () => setActiveIndex(i => (i === null ? 0 : (i + 1) % galleryItems.length));

  return (
    <>
      <Header />
      <main className="page">
        <section className="hero">
          <div className="hero__in">
            <p className="hero__eyebrow">MAKEWAYS PVT. LTD.</p>
            <h1 className="hero__title">GALLERY</h1>
            <p className="hero__sub">A collection of our campaigns, events, awards and behind-the-scenes moments.</p>
          </div>
        </section>
        <div className="countbar">
          <div className="countbar__inner">
            <span className="countbar__tag">IMAGES &amp; VIDEOS</span>
          </div>
        </div>
        <div className="grid">
          {galleryItems.map((item, index) => (
            <GridCell key={item.id} item={item} index={index} onClick={() => openItem(index)} />
          ))}
        </div>
      </main>
      {activeIndex !== null && (
        <Lightbox item={galleryItems[activeIndex]} onClose={closeItem} onPrev={prevItem} onNext={nextItem} />
      )}
      <Footer />
      <style jsx global>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#fff;color:#111;font-family:'Eurostile','Arial Narrow',Arial,sans-serif}
      `}</style>
      <style jsx>{`
        .page{padding-top:106px;background:#fff;min-height:100vh}
        .hero{background:#fff}
        .hero__in{max-width:935px;margin:0 auto;padding:48px 20px 40px}
        .hero__eyebrow{font-family:var(--font-condensed);font-size:10px;font-weight:700;letter-spacing:0.25em;color:#FF8C00;text-transform:uppercase;margin-bottom:12px;white-space:nowrap}
        .hero__title{font-family:var(--font-extended);font-weight:700;font-size:clamp(44px,7vw,80px);letter-spacing:0.06em;line-height:0.95;text-transform:uppercase;color:#FF8C00;margin-bottom:20px}
        .hero__sub{font-family:var(--font-primary);font-size:14px;font-weight:400;color:#777;line-height:1.7;max-width:480px;letter-spacing:0.01em}
        .countbar{background:#fff;border-bottom:1px solid #eee;padding:18px 20px}
        .countbar__inner{max-width:935px;margin:0 auto}
        .countbar__tag{font-family:var(--font-condensed);font-size:13px;font-weight:700;letter-spacing:0.12em;color:#111;text-transform:uppercase;white-space:nowrap}
        .grid{max-width:935px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:3px;padding-bottom:60px}
        @media(max-width:768px){.hero__in{padding:36px 16px 28px}.page{padding-top:80px}}
        @media(max-width:480px){.grid{gap:2px}}
      `}</style>
    </>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryInner />
    </Suspense>
  );
}