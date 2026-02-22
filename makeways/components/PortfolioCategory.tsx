'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  year: string;
  isVideo?: boolean;
  src?: string;
}

interface Props {
  title: string;
  subtitle: string;
  accent: string;
  items: PortfolioItem[];
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: PortfolioItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="lb-bg" onClick={onClose}>
      <div className="lb" onClick={e => e.stopPropagation()}>

        <button className="lb__close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <button className="lb__arrow lb__arrow--l" onClick={e => { e.stopPropagation(); onPrev(); }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="lb__media">
          {item.src ? (
            item.isVideo ? (
              <video src={item.src} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            )
          ) : (
            <div className="lb__ph">
              {item.isVideo ? (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              )}
              <span>{item.isVideo ? 'VIDEO PLACEHOLDER' : 'IMAGE PLACEHOLDER'}</span>
            </div>
          )}
        </div>

        <button className="lb__arrow lb__arrow--r" onClick={e => { e.stopPropagation(); onNext(); }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <div className="lb__caption">
          <div className="lb__caption-left">
            <h3 className="lb__title">{item.title}</h3>
            <p className="lb__meta">{item.client} · {item.year}</p>
          </div>
          {item.isVideo && (
            <span className="lb__badge">VIDEO</span>
          )}
        </div>
      </div>

      <style jsx>{`
        .lb-bg {
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
          width: 100%; max-width: 900px;
          background: #fff;
          display: flex; flex-direction: column;
          animation: lbpop .22s ease;
          max-height: 92vh;
        }
        @keyframes lbpop { from{transform:scale(.95);opacity:0} to{transform:scale(1);opacity:1} }

        .lb__close {
          position: absolute; top: 12px; right: 12px;
          background: rgba(0,0,0,0.55); border: none;
          color: #fff; width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; transition: background .2s;
        }
        .lb__close:hover { background: #FF8C00; }

        .lb__arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.45); border: none;
          color: #fff; width: 42px; height: 42px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; transition: background .2s;
        }
        .lb__arrow:hover { background: #FF8C00; }
        .lb__arrow--l { left: 12px; }
        .lb__arrow--r { right: 12px; }

        .lb__media {
          width: 100%; aspect-ratio: 16/9;
          background: #f0f0f0;
          display: flex; align-items: center; justify-content: center;
        }

        .lb__ph {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          color: #bbb;
          font-family: 'Eurostile', sans-serif;
          font-size: 8px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
        }

        .lb__caption {
          padding: 16px 22px;
          border-top: 3px solid #FF8C00;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }
        .lb__title {
          font-family: 'Eurostile', sans-serif;
          font-size: 15px; font-weight: 700; color: #111;
          text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;
        }
        .lb__meta {
          font-family: 'Eurostile', sans-serif;
          font-size: 10px; color: #999; letter-spacing: 1px;
          text-transform: uppercase; margin: 0;
        }
        .lb__badge {
          background: #FF8C00; color: #fff;
          font-family: 'Eurostile', sans-serif;
          font-size: 8px; font-weight: 700; letter-spacing: 2px;
          padding: 4px 10px; flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}

// ─── Grid Card ────────────────────────────────────────────────────────────────
function Card({ item, onClick }: { item: PortfolioItem; onClick: () => void }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="card"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="card__media">
        {item.src ? (
          item.isVideo ? (
            <video src={item.src} muted playsInline className="card__img" />
          ) : (
            <img src={item.src} alt={item.title} className="card__img" />
          )
        ) : (
          <div className="card__ph">
            {item.isVideo ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            )}
          </div>
        )}

        {item.isVideo && (
          <div className="card__play-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff" stroke="none">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        )}

        <div className="card__overlay" style={{ opacity: hov ? 1 : 0 }}>
          <span className="card__label">View</span>
        </div>
      </div>

      <div className="card__content">
        <h3 className="card__title">{item.title}</h3>
        <p className="card__meta">{item.client} · {item.year}</p>
      </div>

      <style jsx>{`
        .card {
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform .3s ease;
        }
        .card:hover { transform: translateY(-4px); }

        .card__media {
          width: 100%; aspect-ratio: 4/3;
          background: #f0f0f0;
          position: relative;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }

        .card__img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        .card__ph {
          display: flex; align-items: center; justify-content: center;
          color: #ddd;
        }

        .card__play-badge {
          position: absolute; bottom: 8px; right: 8px;
          background: #FF8C00; color: #fff;
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          z-index: 2;
        }

        .card__overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          transition: opacity .2s ease;
          z-index: 1;
        }

        .card__label {
          color: #fff;
          font-family: 'Eurostile', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .card__content {
          padding: 12px 0;
          border-top: 2px solid #FF8C00;
          background: #fff;
        }

        .card__title {
          font-family: 'Eurostile', sans-serif;
          font-size: 13px; font-weight: 700; color: #111;
          text-transform: uppercase; letter-spacing: 0.5px;
          margin: 0 0 2px 0; padding: 0 14px;
        }

        .card__meta {
          font-family: 'Eurostile', sans-serif;
          font-size: 9px; color: #999; letter-spacing: 0.8px;
          text-transform: uppercase; margin: 0; padding: 0 14px;
        }
      `}</style>
    </div>
  );
}

// ─── Main Category Page ───────────────────────────────────────────────────────
export default function PortfolioCategory({ title, subtitle, accent, items }: Props) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const prevItem = () => setActiveIndex(i => (i === null || i === 0 ? items.length - 1 : i - 1));
  const nextItem = () => setActiveIndex(i => (i === null ? 0 : (i + 1) % items.length));

  return (
    <>
      <Header />

      <main className="page">

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section className="hero" style={{ '--accent': accent } as React.CSSProperties}>
          <div className="hero__in">
            <button onClick={() => router.back()} className="hero__back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              PORTFOLIO
            </button>
            <h1 className="hero__title">{title}</h1>
            <p className="hero__sub">{subtitle}</p>
          </div>
        </section>

        {/* ── GRID ───────────────────────────────────────────────────────── */}
        <div className="grid-wrap">
          <div className="count-bar">
            <span className="count-num">{items.length} PROJECTS</span>
            <div className="count-div" />
            <span className="count-tag">{subtitle.toUpperCase()}</span>
          </div>

          <div className="grid">
            {items.map((item, idx) => (
              <Card key={item.id} item={item} onClick={() => setActiveIndex(idx)} />
            ))}
          </div>
        </div>

      </main>

      {activeIndex !== null && (
        <Lightbox
          item={items[activeIndex]}
          onClose={() => setActiveIndex(null)}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}

      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; color: #111; font-family: 'Eurostile','Barlow',-apple-system,sans-serif; }
      `}</style>

      <style jsx>{`
        .page {
          padding-top: 106px;
          min-height: 100vh;
          background: #fff;
        }

        /* HERO */
        .hero {
          background: #FF8C00;
          padding: 48px 40px 52px;
        }
        .hero__in {
          max-width: 1100px; margin: 0 auto;
        }

        /* BACK BUTTON */
        .hero__back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Eurostile', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 3px;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase; margin-bottom: 20px;
          transition: color .2s;
          background: none; border: none; padding: 0;
          cursor: pointer;
        }
        .hero__back:hover { color: #fff; }

        .hero__title {
          font-family: 'Eurostile', 'Barlow', sans-serif;
          font-size: clamp(52px, 10vw, 120px);
          font-weight: 900; color: #fff;
          text-transform: uppercase; line-height: 0.9;
          letter-spacing: -1px; margin-bottom: 16px;
        }
        .hero__sub {
          font-family: 'Eurostile', sans-serif;
          font-size: 12px; font-weight: 700;
          color: rgba(255,255,255,0.75);
          text-transform: uppercase; letter-spacing: 3px;
        }

        /* COUNT BAR */
        .grid-wrap {
          max-width: 1100px; margin: 0 auto;
          padding: 0 24px 80px;
        }
        .count-bar {
          display: flex; align-items: center; gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid #eee;
          margin-bottom: 28px;
        }
        .count-num {
          font-family: 'Eurostile', sans-serif;
          font-size: 15px; font-weight: 700; letter-spacing: 2px; color: #111;
        }
        .count-div { width: 1px; height: 16px; background: #ddd; }
        .count-tag {
          font-family: 'Eurostile', sans-serif;
          font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #bbb;
        }

        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 900px) {
          .grid { grid-template-columns: repeat(2, 1fr); }
          .hero { padding: 36px 24px 40px; }
        }
        @media (max-width: 540px) {
          .grid { grid-template-columns: 1fr; }
          .page { padding-top: 80px; }
          .hero__title { font-size: clamp(40px, 14vw, 72px); }
        }
      `}</style>
    </>
  );
}