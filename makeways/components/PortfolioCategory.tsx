'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/*
  Font family roles:
    'EurostileExt'  — hero title
    'EurostileCnd'  — back button, tag bar, badge labels
    'Eurostile'     — card titles, meta, caption text

  NO @import Google Fonts — fonts declared once in globals.css.
  NO font-weight: 900 — 700 = bold.
  Color token: #f47c20 (unified).

  PAGE TYPES:
    'static'  — images only. Multi-image carousel in lightbox.
    'video'   — videos only. Inline player if src, external link if videoUrl.
    'mixed'   — images + videos together. Videos get distinct card treatment.
*/

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PortfolioItem {
  id: number;
  title: string;
  /**
   * For image items: single path or array of paths (multi-image carousel).
   * Leave empty for video-only items.
   */
  images?: string | string[];
  cover?: string;    // explicit thumbnail; falls back to first image or video poster
  isVideo?: boolean;   // mark this item as a video
  src?: string;    // video file path → inline playback in lightbox
  videoUrl?: string;    // YouTube / Vimeo / any URL → opens in new tab
}

export type PageType = 'static' | 'video' | 'mixed';

interface Props {
  title: string;
  subtitle: string;
  accent: string;
  items: PortfolioItem[];
  type?: PageType; // default: 'static'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toArray = (images?: string | string[]): string[] => {
  if (!images) return [];
  return Array.isArray(images) ? images : [images];
};

/** Extract YouTube video ID from watch or short URL */
const getYouTubeId = (url: string): string | null => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconChevL = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevR = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconPlay = ({ size = 32, color = '#fff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const IconExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const IconMulti = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
    <rect x="2" y="7" width="10" height="10" rx="1.5" />
    <rect x="7" y="2" width="15" height="15" rx="1.5" opacity=".7" />
  </svg>
);
const IconImgPh = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);
const IconVideoPh = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const IconYouTube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
  </svg>
);

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  item, onClose, onPrev, onNext,
}: {
  item: PortfolioItem; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const imgs = toArray(item.images);
  const isVid = !!item.isVideo;
  const hasInline = isVid && !!item.src;
  const hasExternal = isVid && !!item.videoUrl && !item.src;
  const multi = !isVid && imgs.length > 1;

  // YouTube detection
  const ytId = item.videoUrl ? getYouTubeId(item.videoUrl) : null;
  const isYouTube = hasExternal && !!ytId;

  const [slide, setSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const prevSlide = useCallback(() => setSlide(s => (s === 0 ? imgs.length - 1 : s - 1)), [imgs.length]);
  const nextSlide = useCallback(() => setSlide(s => (s + 1) % imgs.length), [imgs.length]);

  useEffect(() => { setSlide(0); }, [item.id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') multi ? prevSlide() : onPrev();
      if (e.key === 'ArrowRight') multi ? nextSlide() : onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext, prevSlide, nextSlide, multi]);

  // ── Fullscreen → open YouTube ──────────────────────────────────────────────
  // When the YouTube iframe player triggers the browser fullscreen API,
  // we intercept it: open the video on YouTube in a new tab and exit fullscreen.
  useEffect(() => {
    if (!isYouTube || !item.videoUrl) return;

    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        // Something just went fullscreen — hand off to YouTube
        window.open(item.videoUrl, '_blank', 'noopener,noreferrer');
        document.exitFullscreen().catch(() => { });
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    // webkit prefix for Safari
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isYouTube, item.videoUrl]);

  const currentSrc = imgs[slide];

  return (
    <div className="lb-bg" onClick={onClose}>
      <div className="lb" onClick={e => e.stopPropagation()}>

        <button className="lb__close" onClick={onClose}><IconClose /></button>

        <button className="lb__proj-arrow lb__proj-arrow--l"
          onClick={e => { e.stopPropagation(); onPrev(); }} title="Previous project">
          <IconChevL />
        </button>

        {/* ── Media ── */}
        <div className={`lb__media${isVid ? ' lb__media--video' : ''}`}>

          {/* Inline video (local file) */}
          {hasInline && (
            <video
              ref={videoRef}
              key={item.src}
              src={item.src}
              poster={item.cover}
              controls autoPlay playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
            />
          )}

          {/* ── YouTube embed ── */}
          {isYouTube && (
            <div className="lb__yt-wrap">
              <iframe
                key={item.id}
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&fs=1&color=white`}
                title={item.title}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="lb__yt-iframe"
              />
              {/* "Open on YouTube" shortcut in caption area — handled below */}
            </div>
          )}

          {/* Non-YouTube external video — cover + watch button */}
          {hasExternal && !isYouTube && (
            <div className="lb__ext">
              {item.cover ? (
                <div className="lb__ext-cover">
                  <Image src={item.cover} alt={item.title} fill style={{ objectFit: 'cover' }} />
                  <div className="lb__ext-dim" />
                </div>
              ) : (
                <div className="lb__ext-cover lb__ext-cover--empty" />
              )}
              <div className="lb__ext-body">
                <div className="lb__ext-play"><IconPlay size={40} /></div>
                <p className="lb__ext-hint">Opens in a new tab</p>
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lb__ext-btn"
                  onClick={e => e.stopPropagation()}
                >
                  <IconExternalLink />
                  Watch Video
                </a>
              </div>
            </div>
          )}

          {/* Video placeholder */}
          {isVid && !hasInline && !hasExternal && (
            <div className="lb__ph"><IconVideoPh /><span>VIDEO PLACEHOLDER</span></div>
          )}

          {/* Image(s) */}
          {!isVid && (
            <>
              {currentSrc ? (
                <div className="lb__img-wrap">
                  <Image
                    src={currentSrc}
                    alt={`${item.title} — ${slide + 1}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 900px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
              ) : (
                <div className="lb__ph"><IconImgPh /><span>IMAGE PLACEHOLDER</span></div>
              )}
              {multi && (
                <>
                  <button className="lb__slide-arrow lb__slide-arrow--l"
                    onClick={e => { e.stopPropagation(); prevSlide(); }}>
                    <IconChevL />
                  </button>
                  <button className="lb__slide-arrow lb__slide-arrow--r"
                    onClick={e => { e.stopPropagation(); nextSlide(); }}>
                    <IconChevR />
                  </button>
                </>
              )}
            </>
          )}
        </div>

        <button className="lb__proj-arrow lb__proj-arrow--r"
          onClick={e => { e.stopPropagation(); onNext(); }} title="Next project">
          <IconChevR />
        </button>

        {/* Caption */}
        <div className="lb__caption">
          <div className="lb__caption-left">
            <h3 className="lb__title">{item.title}</h3>
          </div>
          {multi && (
            <div className="lb__dots">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  className={`lb__dot${i === slide ? ' lb__dot--active' : ''}`}
                  onClick={e => { e.stopPropagation(); setSlide(i); }}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
          {multi && <span className="lb__counter">{slide + 1} / {imgs.length}</span>}

          {/* YouTube — open on YouTube button in caption */}
          {isYouTube && (
            <a
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lb__yt-btn"
              onClick={e => e.stopPropagation()}
              title="Open on YouTube"
            >
              <IconYouTube />
              YouTube
            </a>
          )}

          {/* Only show VIDEO badge for non-YouTube videos; YouTube button is sufficient */}
          {isVid && !isYouTube && <span className="lb__badge">VIDEO</span>}
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
          position: absolute; top: 10px; right: 10px;
          background: rgba(0,0,0,0.6); border: none;
          color: #fff; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 20; transition: background .2s;
        }
        .lb__close:hover { background: #f47c20; }

        .lb__proj-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.08); border: none;
          color: #fff; width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; transition: background .2s;
        }
        .lb__proj-arrow:hover { background: rgba(244,124,32,0.7); }
        .lb__proj-arrow--l { left: -48px; }
        .lb__proj-arrow--r { right: -48px; }

        /* Square for images, 16:9 for video */
        .lb__media {
          width: 100%; aspect-ratio: 1/1;
          background: #000; position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .lb__media--video { aspect-ratio: 16/9; }

        .lb__img-wrap { position: absolute; inset: 0; }

        /* ── YouTube embed ── */
        .lb__yt-wrap {
          position: absolute; inset: 0;
        }
        .lb__yt-iframe {
          width: 100%; height: 100%;
          border: none; display: block;
          background: #000;
        }

        .lb__slide-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.45); border: none;
          color: #fff; width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 5; transition: background .2s;
        }
        .lb__slide-arrow:hover { background: rgba(244,124,32,0.85); }
        .lb__slide-arrow--l { left: 10px; }
        .lb__slide-arrow--r { right: 10px; }

        /* External video panel (non-YouTube) */
        .lb__ext {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .lb__ext-cover { position: absolute; inset: 0; }
        .lb__ext-cover--empty { background: #1a1a1a; }
        .lb__ext-dim  { position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
        .lb__ext-body {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .lb__ext-play {
          width: 72px; height: 72px;
          background: rgba(244,124,32,0.9);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          padding-left: 4px;
        }
        .lb__ext-hint {
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
          color: rgba(255,255,255,0.5); text-transform: uppercase;
        }
        .lb__ext-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #f47c20; color: #fff; border: none;
          padding: 10px 22px; cursor: pointer; text-decoration: none;
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; transition: background .2s;
        }
        .lb__ext-btn:hover { background: #d96a10; }

        .lb__ph {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          color: #555;
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
        }

        /* Caption bar */
        .lb__caption {
          padding: 12px 16px;
          border-top: 3px solid #f47c20;
          background: #fff;
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
          flex-wrap: wrap;
        }
        .lb__caption-left { flex: 1; min-width: 0; }
        .lb__title {
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 14px; font-weight: 700; color: #111;
          text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 3px 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .lb__meta {
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 10px; color: #999; letter-spacing: 0.08em;
          text-transform: uppercase; margin: 0;
        }
        .lb__dots { display: flex; align-items: center; gap: 5px; }
        .lb__dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #ddd; border: none; padding: 0; cursor: pointer;
          transition: background .2s, transform .2s;
        }
        .lb__dot--active { background: #f47c20; transform: scale(1.3); }
        .lb__counter {
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
          color: #aaa; text-transform: uppercase; white-space: nowrap;
        }

        /* YouTube button in caption */
        .lb__yt-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: #ff0000; color: #fff; text-decoration: none;
          padding: 6px 14px; flex-shrink: 0;
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; transition: background .2s;
        }
        .lb__yt-btn:hover { background: #cc0000; }

        .lb__badge {
          background: #f47c20; color: #fff;
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.15em;
          padding: 4px 10px; flex-shrink: 0; text-transform: uppercase;
        }

        @media (max-width: 960px) {
          .lb__proj-arrow--l { left: -6px; }
          .lb__proj-arrow--r { right: -6px; }
        }
        @media (max-width: 600px) {
          .lb__proj-arrow { display: none; }
        }
      `}</style>
    </div>
  );
}

// ─── Grid Card ────────────────────────────────────────────────────────────────

function Card({ item, onClick }: { item: PortfolioItem; onClick: () => void }) {
  const [hov, setHov] = useState(false);

  const imgs = toArray(item.images);
  const isVid = !!item.isVideo;
  const multi = !isVid && imgs.length > 1;
  const cover = item.cover || (isVid ? '' : imgs[0] || '');

  return (
    <div
      className={`card${isVid ? ' card--video' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="card__media">

        {cover ? (
          <div className="card__img-wrap">
            <Image
              src={cover}
              alt={item.title}
              fill
              sizes="(max-width: 540px) 33vw, (max-width: 900px) 33vw, 360px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div className="card__ph">
            {isVid ? <IconVideoPh /> : <IconImgPh />}
          </div>
        )}

        {/* Video: persistent tint + play button — always visible */}
        {isVid && (
          <div className="card__vid-layer">
            <div className="card__vid-play">
              <IconPlay size={18} />
            </div>
          </div>
        )}

        {/* Multi-image badge top-right (like Instagram) */}
        {multi && (
          <div className="card__multi-badge"><IconMulti /></div>
        )}

        {/* Hover overlay */}
        <div className="card__overlay" style={{ opacity: hov ? 1 : 0 }}>
          <div className="card__overlay-inner">
            <span className="card__label">{item.title}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card { cursor: pointer; position: relative; overflow: hidden; }

        .card__media {
          width: 100%; aspect-ratio: 1/1;
          background: #f0f0f0;
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .card__img-wrap { position: absolute; inset: 0; }
        .card__ph { display: flex; align-items: center; justify-content: center; }

        /* Video tint — always slightly on, so play icon is always readable */
        .card__vid-layer {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
          z-index: 2; transition: background .22s ease;
        }
        .card--video:hover .card__vid-layer { background: rgba(0,0,0,0.48); }

        .card__vid-play {
          width: 40px; height: 40px;
          background: #f47c20;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          padding-left: 3px;
          transition: transform .2s ease, background .2s ease;
        }
        .card--video:hover .card__vid-play { transform: scale(1.12); }

        /* Multi badge */
        .card__multi-badge {
          position: absolute; top: 8px; right: 8px;
          z-index: 3; opacity: 0.9;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.5));
        }

        /* Hover overlay */
        .card__overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.52);
          display: flex; align-items: center; justify-content: center;
          transition: opacity .22s ease; z-index: 4;
        }
        .card--video .card__overlay { z-index: 5; }

        .card__overlay-inner {
          display: flex; flex-direction: column; align-items: center; gap: 5px;
          padding: 0 10px; text-align: center;
        }
        .card__label {
          color: #fff;
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;
        }
        .card__meta-ov {
          color: rgba(255,255,255,0.6);
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PortfolioCategory({
  title, subtitle, accent, items, type = 'static',
}: Props) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const prevItem = () => setActiveIndex(i => (i === null || i === 0 ? items.length - 1 : i - 1));
  const nextItem = () => setActiveIndex(i => (i === null ? 0 : (i + 1) % items.length));

  return (
    <>
      <Header />

      <main className="page">
        <section className="hero" style={{ '--accent': accent } as React.CSSProperties}>
          <div className="hero__in">
            <button onClick={() => router.push('/#portfolio')} className="hero__back">
              <IconChevL size={14} />
              PORTFOLIO
            </button>
            <h1 className="hero__title">{title}</h1>
            <p className="hero__sub">{subtitle}</p>
          </div>
        </section>

        <div className="grid-wrap">
          <div className="tag-bar">
            <span className="tag-bar__label">{subtitle.toUpperCase()}</span>
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
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #fff; color: #111;
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
        }
      `}</style>

      <style jsx>{`
        .page { padding-top: 106px; min-height: 100vh; background: #fff; }

        .hero    { background: #f47c20; padding: 48px 40px 52px; }
        .hero__in { max-width: 1100px; margin: 0 auto; }

        .hero__back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.7); text-transform: uppercase;
          margin-bottom: 20px; transition: color .2s;
          background: none; border: none; padding: 0; cursor: pointer;
        }
        .hero__back:hover { color: #fff; }

        .hero__title {
          font-family: 'EurostileExt', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight: 700; font-size: clamp(52px, 10vw, 120px);
          color: #fff; text-transform: uppercase;
          line-height: 0.9; letter-spacing: 0.06em; margin-bottom: 16px;
        }
        .hero__sub {
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 12px; font-weight: 700;
          color: rgba(255,255,255,0.75);
          text-transform: uppercase; letter-spacing: 0.2em;
        }

        .grid-wrap { max-width: 1100px; margin: 0 auto; padding: 0 24px 80px; }

        .tag-bar {
          padding: 16px 0; border-bottom: 1px solid #eee; margin-bottom: 4px;
        }
        .tag-bar__label {
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
          color: #bbb; text-transform: uppercase;
        }

        /* Instagram tight 3-col square grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        @media (max-width: 900px) {
          .hero { padding: 36px 24px 40px; }
          .grid-wrap { padding: 0 0 80px; }
          .tag-bar { padding: 16px 16px; }
        }
        @media (max-width: 540px) {
          .grid { gap: 1px; }
          .page { padding-top: 80px; }
          .hero__title { font-size: clamp(40px, 14vw, 72px); }
        }
      `}</style>
    </>
  );
}