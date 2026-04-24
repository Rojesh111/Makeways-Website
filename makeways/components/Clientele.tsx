'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const CARD_W   = 180;
const CARD_GAP = 16;

const clients = [
  { id: 1,  name: 'Goldstar',          logo: '/images/Clientele/Goldstar.png' },
  { id: 2,  name: 'CG',             logo: '/images/Clientele/CG.png' },
  { id: 3,  name: 'BMW',             logo: '/images/Clientele/BMW.png' },
  { id: 4,  name: 'Hero',           logo: '/images/Clientele/Hero.png' },
  { id: 5,  name: 'nbank',            logo: '/images/Clientele/nbank.png' },
  { id: 6,  name: 'Nabil Bank', logo: '/images/Clientele/Nabil_Bank.png' },
  { id: 7,  name: 'British Embassy',         logo: '/images/Clientele/British_Embassy.png' },
  { id: 8,  name: 'Yeti Airlines',           logo: '/images/Clientele/Yeti_Airlines.png' },
  { id: 9, name: 'LG',              logo: '/images/Clientele/LG.png' },
  { id: 10, name: 'Yamaha',      logo: '/images/Clientele/Yamaha.png' },
  { id: 11, name: 'Hulas Steel',     logo: '/images/Clientele/Hulas_Steel.png' },
  { id: 12, name: 'Czech', logo: '/images/Clientele/czech.jpeg' },
  { id: 13, name: 'CGNET',           logo: '/images/Clientele/CG_net.png' },
  { id: 14, name: 'Epson',        logo: '/images/Clientele/Epson.png' },
  { id: 15, name: 'Toshiba',        logo: '/images/Clientele/Toshiba.png' },
  { id: 16, name: 'Forthing',            logo: '/images/Clientele/Forthing.png' },
  { id: 17, name: 'JCB',              logo: '/images/Clientele/JCB.png' },
  { id: 18, name: 'Neta',            logo: '/images/Clientele/Neta.png' },
  { id: 19, name: 'Padelux',         logo: '/images/Clientele/Padelux.png' },
  { id: 20, name: 'Skoda',   logo: '/images/Clientele/Skoda.png' },
  { id: 21, name: 'Nepal Care',      logo: '/images/Clientele/CNepal.png' },
  { id: 22, name: 'Save the Children',      logo: '/images/Clientele/Save_the_Children.png' },
];

const row1Base = clients.slice(0, 6);
const row2Base = clients.slice(6);
const row1 = [...row1Base, ...row1Base, ...row1Base];
const row2 = [...row2Base, ...row2Base, ...row2Base];

// ─── Logo Card ────────────────────────────────────────────────────────────────
function LogoCard({ client }: { client: typeof clients[0] }) {
  const [errored, setErrored] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className={`card${hovered ? ' card--hovered' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top shine highlight */}
        <span className="glass-shine" />
        {/* Orange bottom accent bar */}
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
          <span className="info-name">{client.name}</span>
        </div>
      </div>

      <style jsx>{`
        .card {
          flex          : 0 0 ${CARD_W}px;
          height        : 120px;
          position      : relative;
          /* iPhone liquid glass — layered translucency */
          background    : transparent;
          border        : 1px solid rgba(255, 255, 255, 0.95);
          border-bottom : 1px solid rgba(160, 172, 200, 0.4);
          border-right  : 1px solid rgba(160, 172, 200, 0.4);
          border-radius : 18px;
          overflow      : hidden;
          cursor        : pointer;
          backdrop-filter        : blur(20px) saturate(1.8);
          -webkit-backdrop-filter: blur(20px) saturate(1.8);
          box-shadow    :
            0 4px 24px rgba(0, 0, 0, 0.08),
            0 1px 4px  rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 1),
            inset 0 -1px 0 rgba(180, 190, 220, 0.3);
          transition    :
            border-color  0.25s ease,
            box-shadow    0.25s ease,
            transform     0.25s ease,
            background    0.25s ease;
        }

        .card--hovered {
          background    : transparent;
          border-color  : rgba(244, 124, 32, 0.5);
          border-bottom-color: rgba(244, 124, 32, 0.3);
          border-right-color : rgba(244, 124, 32, 0.3);
          box-shadow    :
            0 8px 32px rgba(244, 124, 32, 0.16),
            0 2px 8px  rgba(244, 124, 32, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 1),
            inset 0 -1px 0 rgba(244, 124, 32, 0.15);
          transform     : translateY(-4px);
        }

        /* iPhone-style top specular shine — bright white streak */
        .glass-shine {
          position      : absolute;
          top: 0; left: 0; right: 0;
          height        : 50%;
          background    : linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.75) 0%,
            rgba(255, 255, 255, 0.25) 40%,
            rgba(255, 255, 255, 0)    100%
          );
          border-radius : 18px 18px 60% 60% / 18px 18px 40% 40%;
          pointer-events: none;
          z-index       : 1;
        }

        .accent-bar {
          position   : absolute;
          bottom     : 0; left: 0;
          height     : 3px; width: 0%;
          background : #f47c20;
          transition : width 0.32s cubic-bezier(0.4, 0, 0.2, 1);
          z-index    : 4;
        }
        .card--hovered .accent-bar { width: 100%; }

        .logo-area {
          position      : absolute;
          inset         : 0;
          display       : flex;
          align-items   : center;
          justify-content: center;
          transition    : transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
          z-index       : 2;
          background    : transparent;
        }
        .card--hovered .logo-area { transform: translateY(-9px); }

        .img-wrap { position: relative; width: 100%; height: 100%; }

        .fallback {
          font-family   : var(--font-primary);
          font-size     : 11px;
          font-weight   : 400;
          color         : rgba(0, 0, 0, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .info-panel {
          position        : absolute;
          bottom          : 0; left: 0; right: 0;
          height          : 28px;
          background      : linear-gradient(
            to top,
            rgba(255, 255, 255, 0.92) 0%,
            rgba(255, 255, 255, 0.6)  55%,
            rgba(255, 255, 255, 0)   100%
          );
          display         : flex;
          align-items     : center;
          justify-content : center;
          padding-bottom  : 6px;
          transform       : translateY(100%);
          opacity         : 0;
          transition      :
            transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
            opacity   0.2s ease;
          z-index         : 3;
        }
        .card--hovered .info-panel { transform: translateY(0); opacity: 1; }

        .info-name {
          font-family   : var(--font-primary);
          font-size     : 11px;
          font-weight   : 700;
          color         : #1a1a1a;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          line-height   : 1;
          text-shadow   : none;
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
    <div
      className="outer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        className="track"
        style={{
          animationName          : animName,
          animationDuration      : `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState     : paused ? 'paused' : 'running',
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
      let cur = 0;
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
          font-family   : var(--font-primary);
          font-size     : 38px;
          font-weight   : 700;
          color         : #f47c20;
          letter-spacing: -0.03em;
          line-height   : 1;
          display       : block;
          width         : max-content;
        }
        .lbl {
          font-family   : var(--font-condensed);
          font-size     : 9px;
          font-weight   : 700;
          color         : rgba(0, 0, 0, 0.45);
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

        {/* White background */}
        <div className="bg-gradient" />

        {/* Subtle dot grid overlay */}
        <div className="bg-grid" />

        {/* Decorative glow orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

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
        /* ── Section shell ── */
        .section {
          position   : relative;
          padding    : 60px 0 80px;
          overflow   : hidden;
          font-family: var(--font-primary);
        }

        /* White background */
        .bg-gradient {
          position  : absolute;
          inset     : 0;
          background: #ffffff;
          z-index   : 0;
        }

        /* Subtle dot grid */
        .bg-grid {
          position        : absolute;
          inset           : 0;
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
          background-size : 24px 24px;
          pointer-events  : none;
          z-index         : 1;
        }

        /* Soft ambient glow orbs */
        .orb {
          position     : absolute;
          border-radius: 50%;
          pointer-events: none;
          filter       : blur(80px);
          z-index      : 1;
        }
        .orb-1 {
          width     : 400px; height: 400px;
          top       : -100px; left: -80px;
          background: rgba(244, 124, 32, 0.07);
        }
        .orb-2 {
          width     : 350px; height: 350px;
          top       : 20%; right: -60px;
          background: rgba(80, 40, 160, 0.05);
        }
        .orb-3 {
          width     : 300px; height: 300px;
          bottom    : -60px; left: 40%;
          background: rgba(20, 120, 100, 0.05);
        }

        /* ── Inner layout ── */
        .inner {
          max-width : 1100px;
          margin    : 0 auto 0 65px;
          padding   : 0 48px;
          position  : relative;
          z-index   : 2;
        }
        .header-row {
          display        : flex;
          align-items    : flex-end;
          justify-content: flex-start;
          margin-bottom  : 48px;
          flex-wrap      : wrap;
          gap            : 80px;
        }
        .title-block { display: flex; flex-direction: column; gap: 10px; }
        .title {
          font-family   : var(--font-primary);
          font-size     : clamp(36px, 5vw, 58px);
          font-weight   : 700;
          color         : #9a9a9a;
          letter-spacing: 0.12em;
          line-height   : 1;
          margin        : 0;
          text-transform: uppercase;
        }
        .stats-row {
          display       : flex;
          align-items   : flex-start;
          gap           : 36px;
          padding-bottom: 4px;
          flex-wrap     : nowrap;
          flex-shrink   : 0;
        }
        .divider {
          width     : 1px;
          height    : 36px;
          background: rgba(0, 0, 0, 0.12);
          align-self: center;
        }

        /* ── Marquee ── */
        .marquee-section { position: relative; z-index: 2; }
        .rows { display: flex; flex-direction: column; gap: 14px; }

        /* Left/right fade — matches white background */
        .fade-left,
        .fade-right {
          position      : absolute;
          top: 0; bottom: 0;
          width         : 100px;
          z-index       : 3;
          pointer-events: none;
        }
        .fade-left  {
          left      : 0;
          background: linear-gradient(to right, #ffffff, transparent);
        }
        .fade-right {
          right     : 0;
          background: linear-gradient(to left, #ffffff, transparent);
        }

        /* ── Mobile ── */
        @media (max-width: 700px) {
          .section      { padding: 40px 0 60px; }
          .inner        { padding: 0 20px; }
          .header-row   { flex-direction: column; align-items: flex-start; }
          .stats-row    { gap: 20px; }
          .orb-1        { width: 250px; height: 250px; }
          .orb-2        { width: 200px; height: 200px; }
          .orb-3        { width: 180px; height: 180px; }
          .fade-left,
          .fade-right   { width: 40px; }
        }
      `}</style>
    </>
  );
}