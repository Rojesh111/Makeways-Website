'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const CARD_W = 180;
const CARD_GAP = 16;

const clients = [
  { id: 1,  name: 'Yamaha',     category: 'Automotive',  logo: '/images/yamaha.jpg'  },
  { id: 2,  name: 'Skoda',      category: 'Automotive',  logo: '/images/skoda.jpg'   },
  { id: 3,  name: 'JCB',        category: 'Industrial',  logo: '/images/jcb.jpg'     },
  { id: 4,  name: 'Czech Rep.', category: 'Government',  logo: '/images/czech.jpg'   },
  { id: 5,  name: 'Epson',      category: 'Technology',  logo: '/images/epson.jpg'   },
  { id: 6,  name: 'Acer',       category: 'Technology',  logo: '/images/acer.jpg'    },
  { id: 7,  name: 'FHI 360',    category: 'Non-Profit',  logo: '/images/fhi360.jpg'  },
  { id: 8,  name: 'Toshiba',    category: 'Technology',  logo: '/images/toshiba.jpg' },
  { id: 9,  name: 'BMW',        category: 'Automotive',  logo: '/images/bmw.jpg'     },
  { id: 10, name: 'Client 10',  category: 'Industry',    logo: '/images/client10.jpg'},
  { id: 11, name: 'Client 11',  category: 'Industry',    logo: '/images/client11.jpg'},
  { id: 12, name: 'Client 12',  category: 'Industry',    logo: '/images/client12.jpg'},
];

const row1Base = clients.slice(0, 6);
const row2Base = clients.slice(6);

// Triple so the seamless loop works — animation shifts by exactly 1 base set
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
        <div className="scanline" />
        <span className="corner corner--tl" />
        <span className="corner corner--br" />

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
                style={{ objectFit: 'contain', padding: '20px' }}
                onError={() => setErrored(true)}
              />
            </div>
          )}
        </div>

        <div className="reveal">
          <span className="reveal-cat">{client.category}</span>
          <span className="reveal-name">{client.name}</span>
          <span className="reveal-line" />
        </div>
      </div>

      <style jsx>{`
        .card {
          flex: 0 0 ${CARD_W}px;
          height: 120px;
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          transition: background .3s, border-color .3s, transform .3s, box-shadow .3s;
        }
        .card--hovered {
          background: rgba(249,115,22,0.07);
          border-color: rgba(249,115,22,0.55);
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 20px 50px rgba(249,115,22,0.22), 0 0 0 1px rgba(249,115,22,0.35);
          z-index: 20;
        }
        .scanline {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.13) 50%, transparent 100%);
          transform: translateY(-100%);
          pointer-events: none;
          z-index: 1;
          transition: transform 0s;
        }
        .card--hovered .scanline {
          transform: translateY(100%);
          transition: transform .55s ease;
        }
        .corner {
          position: absolute;
          width: 12px; height: 12px;
          border-style: solid;
          border-color: transparent;
          transition: border-color .3s, width .3s, height .3s;
          z-index: 2;
        }
        .card--hovered .corner { border-color: #f97316; width: 16px; height: 16px; }
        .corner--tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
        .corner--br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }
        .logo-area {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity .3s, transform .3s;
          z-index: 2;
        }
        .card--hovered .logo-area { opacity: 0.2; transform: scale(0.88); }
        .img-wrap { position: relative; width: 100%; height: 100%; }
        .fallback { font-size: 12px; color: #555; text-transform: uppercase; letter-spacing: 0.1em; }
        .reveal {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          transform: translateY(100%);
          transition: transform .32s cubic-bezier(0.22,1,0.36,1);
          z-index: 3;
        }
        .card--hovered .reveal { transform: translateY(0); }
        .reveal-cat {
          font-size: 9px;
          letter-spacing: 0.22em;
          color: #f97316;
          text-transform: uppercase;
          font-weight: 600;
        }
        .reveal-name {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .reveal-line {
          width: 30px; height: 2px;
          background: #f97316;
          margin-top: 4px;
          border-radius: 1px;
        }
      `}</style>
    </>
  );
}

// ─── Marquee Row ──────────────────────────────────────────────────────────────
// ROOT CAUSE: styled-jsx scopes @keyframes by appending a hash to the name,
// so `animation: marquee-left` never finds its own keyframe — the animation
// simply does nothing. Fix: inject keyframes with a plain <style> tag via
// dangerouslySetInnerHTML (bypasses styled-jsx scoping), then apply via
// inline style on the track element.

function MarqueeRow({
  items,
  baseCount,
  direction = 'left',
  duration = 30,
  uid,
}: {
  items: typeof clients;
  baseCount: number;
  direction?: 'left' | 'right';
  duration?: number;
  uid: string;
}) {
  const [paused, setPaused] = useState(false);

  // How far to shift = exactly one full copy of the original set
  const shiftPx = baseCount * (CARD_W + CARD_GAP);
  const animName = `marquee-${uid}`;

  const keyframes =
    direction === 'left'
      ? `@keyframes ${animName} { from { transform: translateX(0); } to { transform: translateX(-${shiftPx}px); } }`
      : `@keyframes ${animName} { from { transform: translateX(-${shiftPx}px); } to { transform: translateX(0); } }`;

  return (
    <div
      className="outer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Injected outside styled-jsx so the keyframe name is NOT hashed */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <div
        className="track"
        style={{
          animationName: animName,
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {items.map((client, i) => (
          <LogoCard key={`${client.id}-${i}`} client={client} />
        ))}
      </div>

      <style jsx>{`
        .outer {
          overflow: hidden;
          width: 100%;
        }
        .track {
          display: flex;
          gap: ${CARD_GAP}px;
          width: max-content;
          will-change: transform;
        }
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
      const step = Math.ceil(target / 40);
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
      <span className="lbl">{label}</span>
      <style jsx>{`
        .counter { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .num { font-size: 42px; font-weight: 900; color: #f97316; letter-spacing: -0.02em; line-height: 1; }
        .lbl { font-size: 10px; letter-spacing: 0.2em; color: #555; text-transform: uppercase; }
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
        <div className="bg-glow" />

        <div className="inner">
          <div className="header-row">
            <div className="title-block">
              <span className="eyebrow">
                <span className="eyebrow-line" />
                Trusted Partners
              </span>
              <h2 className="title">
                Brands That<br />
                <em>Trust Us</em>
              </h2>
            </div>

            <div className="stats-row">
              <Counter target={12} label="Global Clients" />
              <div className="divider" />
              <Counter target={8}  label="Industries" />
              <div className="divider" />
              <Counter target={15} label="Years Active" />
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
          position: relative;
          background: #0d0d0d;
          padding: 90px 0 80px;
          overflow: hidden;
          font-family: 'Eurostile', 'Franklin Gothic Medium', 'Trebuchet MS', sans-serif;
        }
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .bg-glow {
          position: absolute;
          top: -120px; left: -120px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 2;
        }
        .header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 32px;
        }
        .title-block { display: flex; flex-direction: column; gap: 12px; }
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          letter-spacing: 0.28em;
          color: #f97316;
          text-transform: uppercase;
          font-weight: 600;
        }
        .eyebrow-line {
          display: inline-block;
          width: 32px; height: 2px;
          background: #f97316;
          border-radius: 1px;
        }
        .title {
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin: 0;
        }
        .title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(249,115,22,0.7);
        }
        .stats-row {
          display: flex;
          align-items: center;
          gap: 32px;
          padding-bottom: 8px;
        }
        .divider { width: 1px; height: 40px; background: rgba(255,255,255,0.1); }
        .tagline {
          font-size: 12px;
          color: #444;
          letter-spacing: 0.06em;
          margin: 0 0 44px;
          text-transform: uppercase;
        }
        .tagline span { color: #f97316; font-weight: 600; }
        .marquee-section { position: relative; z-index: 2; }
        .rows { display: flex; flex-direction: column; gap: 14px; }
        .fade-left,
        .fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 3;
          pointer-events: none;
        }
        .fade-left  { left: 0;  background: linear-gradient(to right, #0d0d0d, transparent); }
        .fade-right { right: 0; background: linear-gradient(to left,  #0d0d0d, transparent); }
        @media (max-width: 700px) {
          .inner { padding: 0 20px; }
          .header-row { flex-direction: column; align-items: flex-start; }
          .stats-row { gap: 20px; }
        }
      `}</style>
    </>
  );
}