'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const CARD_W   = 180;
const CARD_GAP = 16;

const clients = [
  { id: 1, name: 'Yamaha', logo: '/Clientele/yamaha.png' },
  { id: 2, name: 'JCB', logo: '/Clientele/JCB.jpg' },
  { id: 4, name: 'BMW', logo: '/Clientele/BMW.png' },
  { id: 5, name: 'Epson', logo: '/Clientele/epson.jpg' },
  { id: 6, name: 'Acer', logo: '/Clientele/acer.png' },
  { id: 7, name: 'Save the Children', logo: '/Clientele/save the children.png' },
  { id: 8, name: 'Toshiba', logo: '/Clientele/toshiba.png' },
  { id: 9, name: 'Skoda', logo: '/Clientele/skoda.png' },
  { id: 10, name: 'CG', logo: '/Clientele/cg.png' },
  { id: 11, name: 'Nabil Bank', logo: '/Clientele/Nabil.png' },
  { id: 12, name: 'Hulas Steel', logo: '/Clientele/Hulassteel.png' },
  { id: 13, name: 'British Embassy', logo: '/Clientele/British_Embassy.png' },
  { id: 14, name: 'CGNET', logo: '/Clientele/CGNET.png' },
  { id: 15, name: 'Forthing', logo: '/Clientele/Forthing.png' },
  { id: 16, name: 'Goldstar', logo: '/Clientele/Goldstar.png' },
  { id: 17, name: 'Hero', logo: '/Clientele/Hero.png' },
  { id: 18, name: 'LG', logo: '/Clientele/LG.png' },
  { id: 19, name: 'Neta', logo: '/Clientele/Neta.png' },
  { id: 20, name: 'Padelux', logo: '/Clientele/Padelux.png' },
  { id: 21, name: 'Yeti Airlines', logo: '/Clientele/Yeti_Airlines.png' },
  { id: 22, name: 'Czech', logo: '/Clientele/czech.png' },
  { id: 23, name: 'Nepal Care', logo: '/Clientele/nepalcare.png' },
];

const row1Base = clients.slice(0, 6);
const row2Base = clients.slice(6);
const row1 = [...row1Base, ...row1Base, ...row1Base];
const row2 = [...row2Base, ...row2Base, ...row2Base];

// ─── Logo Card ────────────────────────────────────────────────────────────────
function LogoCard({ client }: { client: typeof clients[0] }) {
  const [errored,  setErrored]  = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className={`card${hovered ? ' card--hovered' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="accent-bar" />
        <div className="logo-area">
          {errored ? (
            <span className="fallback">{client.name}</span>
          ) : (
            <div className="img-wrap">
              <Image
                src={client.logo}
                alt={client.name}
                fill
                sizes="180px"
                style={{ objectFit: 'contain', padding: '22px' }}
                onError={() => setErrored(true)}
              />
            </div>
          )}
        </div>
        <div className="info-panel">
          {/* Only brand name — no category label */}
          <span className="info-name">{client.name}</span>
        </div>
      </div>

      <style jsx>{`
        .card {
          flex         : 0 0 ${CARD_W}px;
          height       : 120px;
          position     : relative;
          background   : #ffffff;
          border       : 1px solid #e8e8e8;
          border-radius: 8px;
          overflow     : hidden;
          cursor       : pointer;
          transition   :
            border-color 0.25s ease,
            box-shadow   0.25s ease,
            transform    0.25s ease;
        }
        .card--hovered {
          border-color : #f47c20;
          box-shadow   :
            0 8px 28px rgba(244,124,32,0.14),
            0 2px 8px rgba(0,0,0,0.05);
          transform    : translateY(-4px);
        }
        .accent-bar {
          position   : absolute;
          bottom     : 0; left: 0;
          height     : 3px; width: 0%;
          background : #f47c20;
          transition : width 0.32s cubic-bezier(0.4,0,0.2,1);
          z-index    : 4;
        }
        .card--hovered .accent-bar { width: 100%; }

        .logo-area {
          position   : absolute;
          inset      : 0;
          display    : flex;
          align-items: center; justify-content: center;
          transition : transform 0.28s cubic-bezier(0.22,1,0.36,1);
          z-index    : 2;
        }
        .card--hovered .logo-area { transform: translateY(-9px); }

        .img-wrap { position: relative; width: 100%; height: 100%; }

        .fallback {
          font-family   : var(--font-primary);
          font-size     : 11px;
          font-weight   : 400;
          color         : #bbb;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .info-panel {
          position       : absolute;
          bottom         : 0; left: 0; right: 0;
          height         : 28px;
          background     : linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 55%, rgba(255,255,255,0) 100%);
          display        : flex;
          align-items    : center;
          justify-content: center;
          padding-bottom : 6px;
          transform      : translateY(100%);
          opacity        : 0;
          transition     :
            transform 0.28s cubic-bezier(0.22,1,0.36,1),
            opacity   0.2s ease;
          z-index        : 3;
        }
        .card--hovered .info-panel { transform: translateY(0); opacity: 1; }

        /* Eurostile Bold — client name */
        .info-name {
          font-family   : var(--font-primary);
          font-size     : 11px;
          font-weight   : 700;
          color         : #222222;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          line-height   : 1;
        }
      `}</style>
    </>
  );
}

// ─── Marquee Row ──────────────────────────────────────────────────────────────
function MarqueeRow({
  items, baseCount, direction = 'left', duration = 30, uid,
}: {
  items     : typeof clients;
  baseCount : number;
  direction?: 'left' | 'right';
  duration? : number;
  uid       : string;
}) {
  const [paused, setPaused] = useState(false);
  const shiftPx  = baseCount * (CARD_W + CARD_GAP);
  const animName = `marquee-${uid}`;
  const keyframes =
    direction === 'left'
      ? `@keyframes ${animName} { from{transform:translateX(0)} to{transform:translateX(-${shiftPx}px)} }`
      : `@keyframes ${animName} { from{transform:translateX(-${shiftPx}px)} to{transform:translateX(0)} }`;

  return (
    <div className="outer" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        className="track"
        style={{
          animationName           : animName,
          animationDuration       : `${duration}s`,
          animationTimingFunction : 'linear',
          animationIterationCount : 'infinite',
          animationPlayState      : paused ? 'paused' : 'running',
        }}
      >
        {items.map((client, i) => (
          <LogoCard key={`${client.id}-${i}`} client={client} />
        ))}
      </div>
      <style jsx>{`
        .outer { overflow: hidden; width: 100%; }
        .track { display: flex; gap: ${CARD_GAP}px; width: max-content; will-change: transform; }
      `}</style>
    </div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let cur  = 0;
      const step  = Math.ceil(target / 40);
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { setCount(target); clearInterval(timer); }
        else setCount(cur);
      }, 40);
      observer.disconnect();
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="counter" ref={ref}>
      <span className="num">{count}+</span>
      <span className="lbl">
        {label.split(' ').map((word, i) => (
          <span key={i} className="lbl-word">{word}</span>
        ))}
      </span>
      <style jsx>{`
        .counter {
          display       : flex;
          flex-direction: column;
          align-items   : center;
          gap           : 4px;
          width         : max-content;
        }
        .num {
          font-family    : var(--font-primary);
          font-size      : 38px;
          font-weight    : 700;
          color          : #f47c20;
          letter-spacing : -0.03em;
          line-height    : 1;
          display        : block;
          width          : max-content;
        }
        .lbl {
          font-family   : var(--font-condensed);
          font-size     : 9px;
          font-weight   : 700;
          color         : #aaa;
          text-transform: uppercase;
          white-space   : nowrap;
          display       : flex;
          flex-direction: row;
          align-items   : center;
          gap           : 4px;
          width         : max-content;
          letter-spacing: 0;
        }
        .lbl-word {
          letter-spacing: 0.13em;
          display       : inline-block;
        }
      `}</style>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Clientele() {
  return (
    <>
      <section className="section">
        <div className="bg-grid" />

        <div className="inner">
          <div className="header-row">

            <div className="title-block">
              <h2 className="title">The Clients</h2>
            </div>

            <div className="stats-row">
              <Counter target={25} label="Multi-National Brands" />
              <div className="divider" />
              <Counter target={20} label="Domestic Brands" />
              <div className="divider" />
              <Counter target={11} label="Industries" />
            </div>

          </div>
        </div>

        <div className="marquee-section">
          <div className="fade-left" />
          <div className="fade-right" />
          <div className="rows">
            <MarqueeRow items={row1} baseCount={row1Base.length} direction="left"  duration={30} uid="row1" />
            <MarqueeRow items={row2} baseCount={row2Base.length} direction="right" duration={25} uid="row2" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .section {
          position   : relative;
          background : #f9f9f9;
          padding    : 60px 0 80px;
          overflow   : hidden;
          font-family: var(--font-primary);
        }
        .bg-grid {
          position        : absolute;
          inset           : 0;
          background-image: radial-gradient(circle, #d4d4d4 1px, transparent 1px);
          background-size : 24px 24px;
          opacity         : 0.45;
          pointer-events  : none;
        }
        .inner {
          max-width : 1100px;
          margin    : 0 auto;
          padding   : 0 48px;
          position  : relative;
          z-index   : 2;
        }
        .header-row {
          display         : flex;
          align-items     : flex-end;
          justify-content : space-between;
          margin-bottom   : 48px;
          flex-wrap       : wrap;
          gap             : 32px;
        }
        .title-block { display: flex; flex-direction: column; gap: 10px; }
        .title {
          font-family    : var(--font-primary);
          font-size      : clamp(36px, 5vw, 58px);
          font-weight    : 700;
          color          : #9a9a9a;
          letter-spacing : 0.12em;
          line-height    : 1;
          margin         : 0;
          text-transform : uppercase;
        }
        .stats-row {
          display    : flex;
          align-items: flex-start;
          gap        : 36px;
          padding-bottom: 4px;
          flex-wrap  : nowrap;
          flex-shrink: 0;
        }
        .divider { width: 1px; height: 36px; background: #e0e0e0; align-self: center; }
        .marquee-section { position: relative; z-index: 2; }
        .rows { display: flex; flex-direction: column; gap: 14px; }
        .fade-left,
        .fade-right {
          position      : absolute;
          top: 0; bottom: 0;
          width         : 100px;
          z-index       : 3;
          pointer-events: none;
        }
        .fade-left  { left: 0;  background: linear-gradient(to right, #f9f9f9, transparent); }
        .fade-right { right: 0; background: linear-gradient(to left,  #f9f9f9, transparent); }
        @media (max-width: 700px) {
          .inner      { padding: 0 20px; }
          .header-row { flex-direction: column; align-items: flex-start; }
          .stats-row  { gap: 20px; }
        }
      `}</style>
    </>
  );
}