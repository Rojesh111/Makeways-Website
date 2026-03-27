'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/*
  Font family roles:
    'EurostileExt'  — hero title 
    'EurostileCnd'  — back button, count bar tags, badge labels
    'Eurostile'     — card titles, meta, caption text, placeholders

  NO @import Google Fonts — fonts declared once in globals.css.
  NO font-weight: 900 — 700 = bold.
  Color token: #f47c20 (unified).
*/

interface PortfolioItem {
  id     : number;
  title  : string;
  client : string;
  year   : string;
  isVideo?: boolean;
  src?   : string;
  cover? : string;
}

interface Props {
  title    : string;
  subtitle : string;
  accent   : string;
  items    : PortfolioItem[];
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  item, onClose, onPrev, onNext,
}: {
  item: PortfolioItem; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

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
              <video
                key={item.src}
                src={item.src}
                poster={item.cover}
                controls autoPlay muted playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
              />
            ) : (
              <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            )
          ) : (
            <div className="lb__ph">
              {item.isVideo ? (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
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
          {item.isVideo && <span className="lb__badge">VIDEO</span>}
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
          background: #111;
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
        .lb__close:hover { background: #f47c20; }

        .lb__arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.55); border: none;
          color: #fff; width: 42px; height: 42px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; transition: background .2s;
        }
        .lb__arrow:hover { background: #f47c20; }
        .lb__arrow--l { left: 12px; }
        .lb__arrow--r { right: 12px; }

        .lb__media {
          width: 100%; aspect-ratio: 16/9;
          background: #000;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }

        /* EurostileCnd — small placeholder label */
        .lb__ph {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          color: #555;
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
        }

        .lb__caption {
          padding: 14px 20px;
          border-top: 3px solid #f47c20;
          background: #fff;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }

        /* Eurostile Bold — lightbox title */
        .lb__title {
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 15px; font-weight: 700; color: #111;
          text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 4px 0;
        }

        /* Eurostile Regular — lightbox meta */
        .lb__meta {
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 10px; color: #999; letter-spacing: 0.08em;
          text-transform: uppercase; margin: 0;
        }

        /* EurostileCnd Bold — VIDEO badge */
        .lb__badge {
          background  : #f47c20;
          color       : #fff;
          font-family : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size   : 9px; font-weight: 700; letter-spacing: 0.15em;
          padding     : 4px 10px; flex-shrink: 0;
          text-transform: uppercase;
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
            <video
              src={item.src}
              poster={item.cover}
              muted playsInline preload="metadata"
              className="card__img"
            />
          ) : (
            <img src={item.src} alt={item.title} className="card__img" />
          )
        ) : item.cover ? (
          <img src={item.cover} alt={item.title} className="card__img" />
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
          {/* EurostileCnd — View hover label */}
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
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .card__img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .card__ph  { display: flex; align-items: center; justify-content: center; color: #ddd; }

        .card__play-badge {
          position: absolute; bottom: 8px; right: 8px;
          background: #f47c20;
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; z-index: 2;
        }

        .card__overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          transition: opacity .2s ease; z-index: 1;
        }

        /* EurostileCnd Bold — card hover label */
        .card__label {
          color       : #fff;
          font-family : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size   : 11px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
        }

        .card__content {
          padding    : 12px 0;
          border-top : 2px solid #f47c20;
          background : #fff;
        }

        /* Eurostile Bold — card title */
        .card__title {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size      : 13px; font-weight: 700; color: #111;
          text-transform : uppercase; letter-spacing: 0.04em;
          margin: 0 0 2px 0; padding: 0 14px;
        }

        /* Eurostile Regular — card meta */
        .card__meta {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size      : 10px; font-weight: 400; color: #999;
          letter-spacing : 0.06em; text-transform: uppercase;
          margin: 0; padding: 0 14px;
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

        {/* ── HERO ── */}
        <section className="hero" style={{ '--accent': accent } as React.CSSProperties}>
          <div className="hero__in">

            {/* EurostileCnd Bold — back button label */}
            <button onClick={() => router.back()} className="hero__back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              PORTFOLIO
            </button>

            {/* EurostileExt Bold — category display title */}
            <h1 className="hero__title">{title}</h1>

            {/* EurostileCnd Bold — subtitle overline */}
            <p className="hero__sub">{subtitle}</p>
          </div>
        </section>

        {/* ── GRID ── */}
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

      {/* NO @import — fonts declared once in globals.css */}
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
          min-height  : 100vh;
          background  : #fff;
        }

        /* ── Hero — orange band ── */
        .hero    { background: #f47c20; padding: 48px 40px 52px; }
        .hero__in { max-width: 1100px; margin: 0 auto; }

        /* EurostileCnd Bold — back button */
        .hero__back {
          display        : inline-flex;
          align-items    : center;
          gap            : 6px;
          font-family    : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size      : 10px;
          font-weight    : 700;
          letter-spacing : 0.2em;
          color          : rgba(255,255,255,0.7);
          text-transform : uppercase;
          margin-bottom  : 20px;
          transition     : color .2s;
          background     : none;
          border         : none;
          padding        : 0;
          cursor         : pointer;
          white-space    : nowrap;
        }
        .hero__back:hover { color: #fff; }

        /* EurostileExt Bold — category hero title
           Matches FOUNDER / SAYS / PORTFOLIO display title treatment ── */
        .hero__title {
          font-family    : 'EurostileExt', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : clamp(52px, 10vw, 120px);
          color          : #fff;
          text-transform : uppercase;
          line-height    : 0.9;
          letter-spacing : 0.06em;
          margin-bottom  : 16px;
        }

        /* EurostileCnd Bold — subtitle overline */
        .hero__sub {
          font-family    : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size      : 12px;
          font-weight    : 700;
          color          : rgba(255,255,255,0.75);
          text-transform : uppercase;
          letter-spacing : 0.2em;
          white-space    : nowrap;
        }

        /* ── Grid area ── */
        .grid-wrap {
          max-width : 1100px;
          margin    : 0 auto;
          padding   : 0 24px 80px;
        }

        .count-bar {
          display       : flex;
          align-items   : center;
          gap           : 16px;
          padding       : 20px 0;
          border-bottom : 1px solid #eee;
          margin-bottom : 28px;
        }

        /* Eurostile Bold — project count */
        .count-num {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size      : 14px;
          font-weight    : 700;
          letter-spacing : 0.08em;
          color          : #111;
        }

        .count-div { width: 1px; height: 16px; background: #ddd; }

        /* EurostileCnd Bold — tag label */
        .count-tag {
          font-family    : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size      : 11px;
          font-weight    : 700;
          letter-spacing : 0.12em;
          color          : #bbb;
          text-transform : uppercase;
        }

        .grid {
          display               : grid;
          grid-template-columns : repeat(3, 1fr);
          gap                   : 20px;
        }

        @media (max-width: 900px) {
          .grid  { grid-template-columns: repeat(2, 1fr); }
          .hero  { padding: 36px 24px 40px; }
        }
        @media (max-width: 540px) {
          .grid        { grid-template-columns: 1fr; }
          .page        { padding-top: 80px; }
          .hero__title { font-size: clamp(40px, 14vw, 72px); }
        }
      `}</style>
    </>
  );
}