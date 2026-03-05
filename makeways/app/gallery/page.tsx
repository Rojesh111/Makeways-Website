'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/*
  Font family roles — matches system-wide convention:
    'EurostileExt'  — GALLERY display title
    'EurostileCnd'  — eyebrow label, countbar tag, lightbox cat badge,
                      cell hover meta, lightbox placeholder label
    'Eurostile'     — hero subtitle, lightbox title/year, cell hover title

  NO @import Google Fonts — fonts declared once in globals.css.
  NO 'Barlow' anywhere — removed entirely.
  NO font-weight: 900 — 700 = bold, 400 = regular.
  Color token: #FF8C00 (was #FF8C00 — unified across all components).
*/

interface GalleryItem {
  id       : number;
  title    : string;
  category : string;
  year     : string;
  isVideo? : boolean;
  src?     : string;
}

const galleryItems: GalleryItem[] = [
  { id: 1,  title: 'Brand Film',          category: 'TVC',     year: '2024', isVideo: true,  src: '/Videos/suzuki.mp4#t=1' },
  { id: 2,  title: 'Gold Award Win',       category: 'AWARDS',  year: '2023',                 src: '/images/awards/awards1.jpg' },
  { id: 3,  title: 'Campaign Visual',      category: 'PRINT',   year: '2024',                 src: '/images/portfolio/eventss/Picture10.jpg' },
  { id: 4,  title: 'Social Campaign',      category: 'DIGITAL', year: '2024', isVideo: true,  src: '/Videos/yamaha.mp4#t=1' },
  { id: 5,  title: 'Brand Activation',     category: 'EVENT',   year: '2023',                 src: '/images/portfolio/eventss/Picture4.png' },
  { id: 6,  title: 'Product TVC',          category: 'TVC',     year: '2024', isVideo: true,  src: '/Videos/padelux.mp4#t=1' },
  { id: 7,  title: 'OOH Billboard',        category: 'PRINT',   year: '2023',                 src: '/images/portfolio/eventss/Picture5.jpg' },
  { id: 8,  title: 'Influencer Series',    category: 'DIGITAL', year: '2024', isVideo: true,  src: '/Videos/neta.mp4#t=1' },
  { id: 9,  title: 'Live Event Coverage',  category: 'EVENT',   year: '2023',                 src: '/images/portfolio/eventss/Picture7.jpg' },
  { id: 10, title: 'Best Agency Nepal',    category: 'AWARDS',  year: '2022',                 src: '/images/portfolio/eventss/Picture9.jpg' },
  { id: 11, title: 'Jingle Campaign',      category: 'TVC',     year: '2023', isVideo: true,  src: '/Videos/hulas.mp4#t=1' },
  { id: 12, title: 'Magazine Spread',      category: 'PRINT',   year: '2024',                 src: '/images/portfolio/eventss/Picture3.jpg' },
  { id: 13, title: 'Motion Graphics',      category: 'DIGITAL', year: '2024', isVideo: true,  src: '/Videos/nbank.mp4#t=1' },
  { id: 14, title: 'Product Launch',       category: 'EVENT',   year: '2023',                 src: '/images/portfolio/eventss/Picture12.jpg' },
  { id: 15, title: 'Creative Excellence',  category: 'AWARDS',  year: '2023',                 src: '/images/portfolio/eventss/Picture13.jpg' },
  { id: 16, title: 'Festive Campaign',     category: 'TVC',     year: '2023', isVideo: true,  src: '/Videos/super.mp4#t=1' },
  { id: 17, title: 'Newspaper Campaign',   category: 'PRINT',   year: '2024',                 src: '/images/portfolio/eventss/Picture14.png' },
  { id: 18, title: 'Viral Social Post',    category: 'DIGITAL', year: '2024', isVideo: true,  src: '/Videos/hulas2.mp4#t=1' },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  item, onClose, onPrev, onNext,
}: {
  item: GalleryItem; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  return (
    <div className="lb-backdrop" onClick={onClose}>
      <div className="lb" onClick={e => e.stopPropagation()}>

        <button className="lb__close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <button className="lb__arrow lb__arrow--prev" onClick={e => { e.stopPropagation(); onPrev(); }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="lb__media">
          {item.src ? (
            item.isVideo ? (
              <video
                src={item.src}
                controls
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
              />
            ) : (
              <img
                src={item.src}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#f0f0f0' }}
              />
            )
          ) : (
            <div className="lb__ph">
              {item.isVideo ? (
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              ) : (
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              )}
              <span>{item.isVideo ? 'VIDEO PLACEHOLDER' : 'IMAGE PLACEHOLDER'}</span>
            </div>
          )}
        </div>

        <button className="lb__arrow lb__arrow--next" onClick={e => { e.stopPropagation(); onNext(); }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <div className="lb__caption">
          <span className="lb__cat">{item.category}</span>
          <h3 className="lb__title">{item.title}</h3>
          <span className="lb__year">{item.year}</span>
        </div>
      </div>

      <style jsx>{`
        .lb-backdrop {
          position  : fixed; inset: 0;
          background: rgba(0,0,0,0.92);
          z-index   : 2000;
          display   : flex; align-items: center; justify-content: center;
          padding   : 20px;
          animation : lbfade .2s ease;
        }
        @keyframes lbfade { from{opacity:0} to{opacity:1} }

        .lb {
          position  : relative;
          width: 100%; max-width: 860px;
          background: #fff;
          display   : flex; flex-direction: column;
          animation : lbpop .22s ease;
          max-height: 92vh;
        }
        @keyframes lbpop { from{transform:scale(.96);opacity:0} to{transform:scale(1);opacity:1} }

        .lb__close {
          position  : absolute; top: 16px; right: 16px;
          background: rgba(0,0,0,0.6); border: none;
          color: #fff; width: 36px; height: 36px;
          display   : flex; align-items: center; justify-content: center;
          cursor    : pointer; z-index: 10; transition: background .2s;
        }
        .lb__close:hover { background: #FF8C00; }

        .lb__arrow {
          position  : absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.5); border: none;
          color: #fff; width: 44px; height: 44px;
          display   : flex; align-items: center; justify-content: center;
          cursor    : pointer; z-index: 10; transition: background .2s;
        }
        .lb__arrow:hover  { background: #FF8C00; }
        .lb__arrow--prev  { left: 16px; }
        .lb__arrow--next  { right: 16px; }

        .lb__media {
          width        : 100%;
          aspect-ratio : 16/9;
          background   : #f0f0f0;
          display      : flex; align-items: center; justify-content: center;
        }

        /* EurostileCnd Bold — placeholder label */
        .lb__ph {
          display     : flex; flex-direction: column;
          align-items : center; gap: 14px;
          color       : #bbb;
          font-family : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size   : 9px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
        }

        .lb__caption {
          padding    : 18px 24px;
          display    : flex; align-items: center; gap: 16px;
          border-top : 3px solid #FF8C00;
          background : #fff;
        }

        /* EurostileCnd Bold — category badge */
        .lb__cat {
          font-family   : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : 9px; font-weight: 700;
          letter-spacing: 0.12em;
          color         : #fff; background: #f47c20;
          padding       : 4px 10px;
          text-transform: uppercase; flex-shrink: 0;
          white-space   : nowrap;
        }

        /* Eurostile Bold — lightbox title */
        .lb__title {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : 14px; font-weight: 700; color: #111;
          text-transform: uppercase; letter-spacing: 0.04em;
          flex          : 1; margin: 0;
        }

        /* Eurostile Regular — lightbox year */
        .lb__year {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : 10px; font-weight: 400;
          color         : #999; letter-spacing: 0.06em;
          flex-shrink   : 0;
        }

        @media (max-width: 600px) {
          .lb__arrow   { width: 36px; height: 36px; }
          .lb__caption { padding: 14px 16px; gap: 10px; }
          .lb__title   { font-size: 12px; }
        }
      `}</style>
    </div>
  );
}

// ─── Grid Cell ────────────────────────────────────────────────────────────────
function GridCell({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="cell"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="cell__bg">
        {item.src ? (
          item.isVideo ? (
            <video src={item.src} muted playsInline className="cell__media" />
          ) : (
            <img src={item.src} alt={item.title} className="cell__media" />
          )
        ) : item.isVideo ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        )}
      </div>

      {item.isVideo && (
        <div className="cell__video-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" stroke="none">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
      )}

      <div className={`cell__ov${hov ? ' cell__ov--on' : ''}`}>
        <span className="cell__ov-title">{item.title}</span>
        <span className="cell__ov-meta">{item.category} · {item.year}</span>
      </div>

      <style jsx>{`
        .cell {
          position     : relative;
          aspect-ratio : 1/1;
          background   : #f5f5f5;
          cursor       : pointer;
          overflow     : hidden;
        }

        .cell__bg {
          width      : 100%; height: 100%;
          display    : flex; align-items: center; justify-content: center;
          background : #f0f0f0;
          transition : background .2s;
        }
        .cell:hover .cell__bg { background: #e8e8e8; }

        .cell__media {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        .cell__video-badge {
          position  : absolute; top: 10px; right: 10px;
          background: rgba(0,0,0,0.55);
          width     : 28px; height: 28px;
          display   : flex; align-items: center; justify-content: center;
        }

        .cell__ov {
          position   : absolute; inset: 0;
          background : rgba(0,0,0,0.72);
          display    : flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap        : 6px; padding: 16px;
          opacity    : 0; transition: opacity .22s ease;
        }
        .cell__ov--on { opacity: 1; }

        /* Eurostile Bold — hover title */
        .cell__ov-title {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : 12px; font-weight: 700;
          color         : #fff; text-transform: uppercase;
          letter-spacing: 0.04em; text-align: center;
          line-height   : 1.3;
        }

        /* EurostileCnd Bold — hover meta (category · year) */
        .cell__ov-meta {
          font-family   : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : 9px; font-weight: 700;
          color         : #FF8C00; text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space   : nowrap;
        }
      `}</style>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openItem  = (index: number) => setActiveIndex(index);
  const closeItem = () => setActiveIndex(null);
  const prevItem  = () => setActiveIndex(i => (i === null || i === 0 ? galleryItems.length - 1 : i - 1));
  const nextItem  = () => setActiveIndex(i => (i === null ? 0 : (i + 1) % galleryItems.length));

  return (
    <>
      <Header />

      <main className="page">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero__in">

            {/* EurostileCnd Bold — eyebrow overline */}
            <p className="hero__eyebrow">MAKEWAYS PVT. LTD.</p>

            {/* EurostileExt Bold — GALLERY display title
                Matches FOUNDER / SAYS / PORTFOLIO / CAREER treatment ── */}
            <h1 className="hero__title">GALLERY</h1>

            {/* Eurostile Regular — subtitle body text */}
            <p className="hero__sub">
              A collection of our campaigns, events, awards and behind-the-scenes moments.
            </p>
          </div>
        </section>

        {/* ── COUNT BAR ── */}
        <div className="countbar">
          <div className="countbar__inner">
            {/* EurostileCnd Bold — label tag */}
            <span className="countbar__tag">IMAGES &amp; VIDEOS</span>
          </div>
        </div>

        {/* ── GRID ── */}
        <div className="grid">
          {galleryItems.map((item, index) => (
            <GridCell key={item.id} item={item} onClick={() => openItem(index)} />
          ))}
        </div>

      </main>

      {activeIndex !== null && (
        <Lightbox
          item={galleryItems[activeIndex]}
          onClose={closeItem}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}

      <Footer />

      {/* NO @import — fonts declared once in globals.css. No Barlow. */}
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background  : #fff;
          color       : #111;
          font-family : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
        }
      `}</style>

      <style jsx>{`

        .page {
          padding-top : 106px;
          background  : #fff;
          min-height  : 100vh;
        }

        /* ── HERO ── */
        .hero    { background: #fff; }
        .hero__in {
          max-width : 935px; margin: 0 auto;
          padding   : 48px 20px 40px;
        }

        /* EurostileCnd Bold — eyebrow */
        .hero__eyebrow {
          font-family   : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : 10px; font-weight: 700;
          letter-spacing: 0.25em;
          color         : #FF8C00; text-transform: uppercase;
          margin-bottom : 12px;
          white-space   : nowrap;
        }

        /* EurostileExt Bold — GALLERY display title */
        .hero__title {
          font-family    : 'EurostileExt', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : clamp(44px, 7vw, 80px);
          letter-spacing : 0.06em;
          line-height    : 0.95;
          text-transform : uppercase;
          color          : #FF8C00;
          margin-bottom  : 20px;
        }

        /* Eurostile Regular — subtitle */
        .hero__sub {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : 14px; font-weight: 400;
          color         : #777; line-height: 1.7;
          max-width     : 480px; letter-spacing: 0.01em;
        }

        /* ── COUNT BAR ── */
        .countbar {
          background    : #fff;
          border-bottom : 1px solid #eee;
          padding       : 18px 20px;
        }
        .countbar__inner {
          max-width : 935px; margin: 0 auto;
        }

        /* EurostileCnd Bold — count tag */
        .countbar__tag {
          font-family   : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : 13px; font-weight: 700;
          letter-spacing: 0.12em;
          color         : #111; text-transform: uppercase;
          white-space   : nowrap;
        }

        /* ── GRID ── */
        .grid {
          max-width             : 935px; margin: 0 auto;
          display               : grid;
          grid-template-columns : repeat(3, 1fr);
          gap                   : 3px;
          padding-bottom        : 60px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .hero__in { padding: 36px 16px 28px; }
          .page     { padding-top: 80px; }
        }
        @media (max-width: 480px) {
          .grid { gap: 2px; }
        }
      `}</style>
    </>
  );
}