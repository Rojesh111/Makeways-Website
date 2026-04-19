'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Audio Items ──────────────────────────────────────────────────────────────

interface JingleItem {
  id: number;
  title: string;
  client: string;
  src: string;
}

const jingles: JingleItem[] = [
  { id: 1,  title: 'Big Mart Teej Offer Jingle',   client: 'Big Mart',            src: '/jingle/BIG MART TEEJ OFFER JINGLE.mp3' },
  { id: 2,  title: 'CG Net Jingle',                client: 'CG Net',              src: '/jingle/CG Net Jingle.mp3' },
  { id: 3,  title: 'Gold Star Jingle',              client: 'Gold Star',           src: '/jingle/GOLD STAR JINGLE.mp3' },
  { id: 4,  title: 'Hulas Scheme Folk Jingle',      client: 'Hulas',               src: '/jingle/HULAS SCHEME FOLK JINGLE .mp3' },
  { id: 5,  title: 'Hero Xoom',                     client: 'Hero MotoCorp',       src: '/jingle/Hero XOOM.mp3' },
  { id: 6,  title: 'Hulas Glav',                    client: 'Hulas',               src: '/jingle/Hulas Glav.mp3' },
  { id: 7,  title: 'Naya Nepal ko Naya Hero',       client: 'Hero MotoCorp Nepal', src: '/jingle/Naya Nepal ko Naya Hero  Hero MotoCorp Nepal.mp3' },
  { id: 8,  title: 'Suzuki Espresso Jingle',        client: 'Suzuki',              src: '/jingle/SUZUKI ESPRESSO JINGLE.mp3' },
  { id: 9,  title: 'Suzuki Parvotsav Jingle',       client: 'Suzuki',              src: '/jingle/Suzuki Parvotsav Jingle.mp3' },
  { id: 10, title: 'Yamaha Saluto Jingle',           client: 'Yamaha',              src: '/jingle/YAMAHA SALUTO JINGLE.mp3' },
  { id: 11, title: 'Yamaha Nari Diwas Jingle',       client: 'Yamaha',              src: '/jingle/Yamaha Nari Diwas Jingle.mp3' },
  { id: 12, title: 'Padelux Jingle',                 client: 'Padelux',             src: '/jingle/padelux jingle.mp3' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function generateBars(seed: string, count: number): number[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    hash = ((hash << 5) - hash + i * 7 + 13) | 0;
    const val = ((hash & 0x7fffffff) % 70) + 30;
    bars.push(val);
  }
  return bars;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const IconChevL = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconPlay = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const IconPause = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <rect x="5" y="3" width="5" height="18" rx="1" />
    <rect x="14" y="3" width="5" height="18" rx="1" />
  </svg>
);

const IconMusic = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

// ─── Audio Card ───────────────────────────────────────────────────────────────

function AudioCard({
  item,
  isPlaying,
  onPlay,
  onPause,
  index,
}: {
  item: JingleItem;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  index: number;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const bars = useRef(generateBars(item.title, 48)).current;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
      setLoaded(true);
    }
  };

  const handleEnded = () => {
    onPause();
    setCurrentTime(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`jcard${isPlaying ? ' jcard--active' : ''}`}>
      <audio
        ref={audioRef}
        src={item.src}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Track number */}
      <div className="jcard__num">{String(index + 1).padStart(2, '0')}</div>

      {/* Play / Pause */}
      <button
        className="jcard__play"
        onClick={isPlaying ? onPause : onPlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <IconPause /> : <IconPlay />}
      </button>

      {/* Info */}
      <div className="jcard__info">
        <h3 className="jcard__title">{item.title}</h3>
        <p className="jcard__client">{item.client}</p>
      </div>

      {/* Waveform / progress */}
      <div className="jcard__wave" ref={progressRef} onClick={handleProgressClick}>
        {bars.map((h, i) => {
          const barPos = (i / bars.length) * 100;
          const active = barPos <= progress;
          return (
            <div
              key={i}
              className={`jcard__bar${active ? ' jcard__bar--on' : ''}`}
              style={{ height: `${h}%` }}
            />
          );
        })}
      </div>

      {/* Time */}
      <div className="jcard__time">
        <span className="jcard__cur">{formatTime(currentTime)}</span>
        <span className="jcard__sep">/</span>
        <span className="jcard__dur">{loaded ? formatTime(duration) : '--:--'}</span>
      </div>

      <style jsx>{`
        .jcard {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 24px;
          background: #fff;
          border-bottom: 1px solid #eee;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .jcard::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: #f47c20;
          transform: scaleY(0);
          transition: transform 0.3s ease;
          transform-origin: top;
        }
        .jcard:hover {
          background: #fdf5ec;
        }
        .jcard--active::before {
          transform: scaleY(1);
        }
        .jcard--active {
          background: #fff7f0;
        }

        .jcard__num {
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #ccc;
          letter-spacing: 0.08em;
          min-width: 22px;
          text-align: center;
          flex-shrink: 0;
        }
        .jcard--active .jcard__num {
          color: #f47c20;
        }

        .jcard__play {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(244, 124, 32, 0.1);
          border: 1.5px solid rgba(244, 124, 32, 0.3);
          color: #f47c20;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.25s ease;
          padding-left: 2px;
        }
        .jcard__play:hover {
          background: #f47c20;
          color: #fff;
          border-color: #f47c20;
          transform: scale(1.08);
        }
        .jcard--active .jcard__play {
          background: #f47c20;
          color: #fff;
          border-color: #f47c20;
          padding-left: 0;
        }

        .jcard__info {
          flex: 0 0 200px;
          min-width: 0;
        }
        .jcard__title {
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #111;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin: 0 0 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .jcard__client {
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 0;
        }
        .jcard--active .jcard__client {
          color: #e08430;
        }

        /* Waveform */
        .jcard__wave {
          flex: 1;
          height: 40px;
          display: flex;
          align-items: flex-end;
          gap: 2px;
          cursor: pointer;
          padding: 0 4px;
        }
        .jcard__bar {
          flex: 1;
          background: #e8e8e8;
          border-radius: 1px;
          transition: background 0.15s ease;
          min-width: 2px;
        }
        .jcard__bar--on {
          background: #f47c20;
        }

        .jcard__time {
          display: flex;
          align-items: center;
          gap: 3px;
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          flex-shrink: 0;
          min-width: 80px;
          justify-content: flex-end;
        }
        .jcard__cur {
          color: ${isPlaying ? '#f47c20' : '#999'};
        }
        .jcard__sep {
          color: #ddd;
        }
        .jcard__dur {
          color: #bbb;
        }

        @media (max-width: 768px) {
          .jcard {
            flex-wrap: wrap;
            gap: 10px;
            padding: 14px 16px;
          }
          .jcard__num { display: none; }
          .jcard__info {
            flex: 1 1 auto;
            min-width: 120px;
          }
          .jcard__wave {
            flex-basis: 100%;
            order: 5;
            height: 32px;
          }
          .jcard__time { min-width: 60px; }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function JinglePage() {
  const router = useRouter();
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <>
      <Header />

      <main className="page">
        {/* Hero */}
        <section className="hero">
          <div className="hero__in">
            <button onClick={() => router.back()} className="hero__back">
              <IconChevL size={14} />
              PORTFOLIO
            </button>
            <h1 className="hero__title">JINGLE</h1>
            <p className="hero__sub">Audio & Jingle Production</p>
          </div>
        </section>

        {/* Track list */}
        <div className="tracks-wrap">
          <div className="tracks-header">
            <div className="tracks-header__icon"><IconMusic /></div>
            <div>
              <h2 className="tracks-header__title">OUR JINGLES</h2>
              <p className="tracks-header__count">{jingles.length} TRACKS</p>
            </div>
          </div>

          <div className="tracks-list">
            {jingles.map((jingle, idx) => (
              <AudioCard
                key={jingle.id}
                item={jingle}
                index={idx}
                isPlaying={playingId === jingle.id}
                onPlay={() => setPlayingId(jingle.id)}
                onPause={() => setPlayingId(null)}
              />
            ))}
          </div>
        </div>
      </main>

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

        .tracks-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }

        .tracks-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .tracks-header__icon {
          width: 44px; height: 44px;
          background: rgba(244, 124, 32, 0.1);
          border: 1px solid rgba(244, 124, 32, 0.25);
          display: flex; align-items: center; justify-content: center;
          color: #f47c20;
          flex-shrink: 0;
        }
        .tracks-header__title {
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #111;
          letter-spacing: 0.1em;
          margin: 0 0 2px;
        }
        .tracks-header__count {
          font-family: 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #bbb;
          letter-spacing: 0.2em;
          margin: 0;
        }

        .tracks-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid #eee;
        }

        @media (max-width: 900px) {
          .hero { padding: 36px 24px 40px; }
          .tracks-wrap { padding: 32px 16px 80px; }
        }
        @media (max-width: 540px) {
          .page { padding-top: 80px; }
          .hero__title { font-size: clamp(40px, 14vw, 72px); }
        }
      `}</style>
    </>
  );
}