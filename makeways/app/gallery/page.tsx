'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  year: string;
  isVideo?: boolean;
  // ── ADD YOUR FILE PATHS HERE ──────────────────────────────────────────────
  // Images: src: '/gallery/your-image.jpg'   (put files in /public/gallery/)
  // Videos: src: '/gallery/your-video.mp4'   (also set isVideo: true)
  src?: string;
}

const galleryItems: GalleryItem[] = [
  // ── HOW TO ADD MEDIA ─────────────────────────────────────────────────────
  // 1. Place your files inside the /public/gallery/ folder of your project
  // 2. Fill in the src field: src: '/gallery/filename.jpg' or '.mp4'
  // 3. For videos set isVideo: true so the play icon shows
  // ─────────────────────────────────────────────────────────────────────────
  { id: 1,  title: 'Brand Film',          category: 'TVC',     year: '2024', isVideo: true,  src: '' },
  { id: 2,  title: 'Gold Award Win',       category: 'AWARDS',  year: '2023',                 src: '' },
  { id: 3,  title: 'Campaign Visual',      category: 'PRINT',   year: '2024',                 src: '' },
  { id: 4,  title: 'Social Campaign',      category: 'DIGITAL', year: '2024', isVideo: true,  src: '' },
  { id: 5,  title: 'Brand Activation',     category: 'EVENT',   year: '2023',                 src: '' },
  { id: 6,  title: 'Product TVC',          category: 'TVC',     year: '2024', isVideo: true,  src: '' },
  { id: 7,  title: 'OOH Billboard',        category: 'PRINT',   year: '2023',                 src: '' },
  { id: 8,  title: 'Influencer Series',    category: 'DIGITAL', year: '2024', isVideo: true,  src: '' },
  { id: 9,  title: 'Live Event Coverage',  category: 'EVENT',   year: '2023',                 src: '' },
  { id: 10, title: 'Best Agency Nepal',    category: 'AWARDS',  year: '2022',                 src: '' },
  { id: 11, title: 'Jingle Campaign',      category: 'TVC',     year: '2023', isVideo: true,  src: '' },
  { id: 12, title: 'Magazine Spread',      category: 'PRINT',   year: '2024',                 src: '' },
  { id: 13, title: 'Motion Graphics',      category: 'DIGITAL', year: '2024', isVideo: true,  src: '' },
  { id: 14, title: 'Product Launch',       category: 'EVENT',   year: '2023',                 src: '' },
  { id: 15, title: 'Creative Excellence',  category: 'AWARDS',  year: '2023',                 src: '' },
  { id: 16, title: 'Festive Campaign',     category: 'TVC',     year: '2023', isVideo: true,  src: '' },
  { id: 17, title: 'Newspaper Campaign',   category: 'PRINT',   year: '2024',                 src: '' },
  { id: 18, title: 'Viral Social Post',    category: 'DIGITAL', year: '2024', isVideo: true,  src: '' },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="lb-backdrop" onClick={onClose}>
      <div className="lb" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="lb__close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Prev */}
        <button className="lb__arrow lb__arrow--prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Media area */}
        <div className="lb__media">
          {item.src ? (
            item.isVideo ? (
              <video
                src={item.src}
                controls
                className="lb__video"
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
              />
            ) : (
              <img
                src={item.src}
                alt={item.title}
                className="lb__real-img"
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

        {/* Next */}
        <button className="lb__arrow lb__arrow--next" onClick={(e) => { e.stopPropagation(); onNext(); }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        {/* Caption bar */}
        <div className="lb__caption">
          <span className="lb__cat">{item.category}</span>
          <h3 className="lb__title">{item.title}</h3>
          <span className="lb__year">{item.year}</span>
        </div>
      </div>

      <style jsx>{`
        .lb-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 2000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: lbfade .2s ease;
        }
        @keyframes lbfade { from{opacity:0} to{opacity:1} }

        .lb {
          position: relative;
          width: 100%; max-width: 860px;
          background: #fff;
          display: flex; flex-direction: column;
          animation: lbpop .22s ease;
          max-height: 92vh;
        }
        @keyframes lbpop { from{transform:scale(.96);opacity:0} to{transform:scale(1);opacity:1} }

        .lb__close {
          position: absolute; top: 16px; right: 16px;
          background: rgba(0,0,0,0.6); border: none;
          color: #fff; width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10;
          transition: background .2s;
        }
        .lb__close:hover { background: #F5A623; }

        .lb__arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.5); border: none;
          color: #fff; width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10;
          transition: background .2s;
        }
        .lb__arrow:hover { background: #F5A623; }
        .lb__arrow--prev { left: 16px; }
        .lb__arrow--next { right: 16px; }

        .lb__media {
          width: 100%;
          aspect-ratio: 16/9;
          background: #f0f0f0;
          display: flex; align-items: center; justify-content: center;
        }

        .lb__ph {
          display: flex; flex-direction: column; align-items: center; gap: 14px;
          color: #bbb;
          font-family: 'Eurostile', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
        }

        .lb__caption {
          padding: 18px 24px;
          display: flex; align-items: center; gap: 16px;
          border-top: 3px solid #F5A623;
          background: #fff;
        }

        .lb__cat {
          font-family: 'Eurostile', sans-serif;
          font-size: 8.5px; font-weight: 700; letter-spacing: 2px;
          color: #fff; background: #F5A623;
          padding: 4px 10px; text-transform: uppercase; flex-shrink: 0;
        }

        .lb__title {
          font-family: 'Eurostile', sans-serif;
          font-size: 14px; font-weight: 700; color: #111;
          text-transform: uppercase; letter-spacing: 0.5px; flex: 1;
        }

        .lb__year {
          font-family: 'Eurostile', sans-serif;
          font-size: 10px; color: #999; letter-spacing: 1px; flex-shrink: 0;
        }

        @media (max-width: 600px) {
          .lb__arrow { width: 36px; height: 36px; }
          .lb__caption { padding: 14px 16px; gap: 10px; }
          .lb__title { font-size: 12px; }
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
      {/* Placeholder */}
      {/* Media — real or placeholder */}
      <div className="cell__bg">
        {item.src ? (
          item.isVideo ? (
            <video
              src={item.src}
              muted
              playsInline
              className="cell__media"
            />
          ) : (
            <img
              src={item.src}
              alt={item.title}
              className="cell__media"
            />
          )
        ) : (
          item.isVideo ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          )
        )}
      </div>

      {/* Video badge */}
      {item.isVideo && (
        <div className="cell__video-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" stroke="none">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
      )}

      {/* Hover overlay */}
      <div className={`cell__ov ${hov ? 'cell__ov--on' : ''}`}>
        <span className="cell__ov-label">{item.title}</span>
        <span className="cell__ov-cat">{item.category} · {item.year}</span>
      </div>

      <style jsx>{`
        .cell {
          position: relative;
          aspect-ratio: 1/1;
          background: #f5f5f5;
          cursor: pointer;
          overflow: hidden;
        }

        .cell__bg {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: #f0f0f0;
          transition: background .2s;
        }
        .cell:hover .cell__bg { background: #e8e8e8; }

        .cell__video-badge {
          position: absolute; top: 10px; right: 10px;
          background: rgba(0,0,0,0.55);
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
        }

        .cell__ov {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.72);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 6px; padding: 16px;
          opacity: 0; transition: opacity .22s ease;
        }
        .cell__ov--on { opacity: 1; }

        .cell__ov-label {
          font-family: 'Eurostile', sans-serif;
          font-size: 12px; font-weight: 700;
          color: #fff; text-transform: uppercase;
          letter-spacing: 0.5px; text-align: center;
          line-height: 1.3;
        }

        .cell__ov-cat {
          font-family: 'Eurostile', sans-serif;
          font-size: 8.5px; font-weight: 700;
          color: #F5A623; text-transform: uppercase;
          letter-spacing: 2px;
        }

        .cell__media {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
      `}</style>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openItem = (index: number) => setActiveIndex(index);
  const closeItem = () => setActiveIndex(null);
  const prevItem = () => setActiveIndex(i => (i === null || i === 0 ? galleryItems.length - 1 : i - 1));
  const nextItem = () => setActiveIndex(i => (i === null ? 0 : (i + 1) % galleryItems.length));

  return (
    <>
      <Header />

      <main className="page">

        {/* ── PAGE TITLE ────────────────────────────────────────────────── */}
        <section className="hero">
          <div className="hero__in">
            <p className="hero__eyebrow">MAKEWAYS PVT. LTD.</p>
            <h1 className="hero__title">
              <span className="hero__title--black">GAL</span><span className="hero__title--orange">LERY</span>
            </h1>
            <p className="hero__sub">
              A collection of our campaigns, events, awards and behind-the-scenes moments.
            </p>
          </div>
        </section>

        {/* ── COUNT BAR ─────────────────────────────────────────────────── */}
        <div className="countbar">
          <div className="countbar__in">
            <span className="countbar__num">{galleryItems.length} POSTS</span>
            <div className="countbar__divider" />
            <span className="countbar__tag">PHOTOS &amp; VIDEOS</span>
          </div>
        </div>

        {/* ── INSTAGRAM-STYLE GRID ──────────────────────────────────────── */}
        <div className="grid">
          {galleryItems.map((item, index) => (
            <GridCell key={item.id} item={item} onClick={() => openItem(index)} />
          ))}
        </div>
      </main>

      {/* Lightbox */}
      {activeIndex !== null && (
        <Lightbox
          item={galleryItems[activeIndex]}
          onClose={closeItem}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}

      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; color: #111; font-family: 'Eurostile','Barlow',-apple-system,sans-serif; }
      `}</style>

      <style jsx>{`
        /* PAGE */
        .page {
          padding-top: 106px;
          background: #fff;
          min-height: 100vh;
        }

        /* ── HERO ─────────────────────────────────────────────────────── */
        .hero {
          background: #fff;
        }
        .hero__in {
          max-width: 935px; margin: 0 auto;
          padding: 48px 20px 40px;
        }
        .hero__eyebrow {
          font-family: 'Eurostile', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 4px;
          color: #F5A623; text-transform: uppercase; margin-bottom: 12px;
        }
        .hero__title {
          font-family: 'Eurostile', 'Barlow', sans-serif;
          font-size: clamp(44px, 7vw, 80px);
          font-weight: 900; letter-spacing: -1px; line-height: 0.95;
          text-transform: uppercase; margin-bottom: 20px;
        }
        .hero__title--black  { color: #111; }
        .hero__title--orange { color: #F5A623; }
        .hero__sub {
          font-family: 'Barlow', sans-serif;
          font-size: 14px; color: #777; line-height: 1.6; max-width: 480px;
        }

        /* ── COUNT BAR ────────────────────────────────────────────────── */
        .countbar { background: #fff; border-bottom: 1px solid #eee; }
        .countbar__in {
          max-width: 935px; margin: 0 auto;
          padding: 18px 20px;
          display: flex; align-items: center; gap: 20px;
        }
        .countbar__num {
          font-family: 'Eurostile', sans-serif;
          font-size: 16px; font-weight: 700; letter-spacing: 2px; color: #111;
        }
        .countbar__divider {
          width: 1px; height: 18px; background: #ddd;
        }
        .countbar__tag {
          font-family: 'Eurostile', sans-serif;
          font-size: 14px; font-weight: 700; letter-spacing: 2px; color: #aaa;
        }

        /* ── GRID ─────────────────────────────────────────────────────── */
        .grid {
          max-width: 935px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3px;
          padding-bottom: 60px;
        }

        /* ── RESPONSIVE ───────────────────────────────────────────────── */
        @media (max-width: 768px) {
          .hero__in { padding: 36px 16px 28px; }
          .page { padding-top: 80px; }
        }
        @media (max-width: 480px) {
          .grid { gap: 2px; }
          .hlrow__in { gap: 16px; }
        }
      `}</style>
    </>
  );
}