'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'NIRVANA CHAUDHARY',
    role: 'MD – CHAUDHARY GROUP',
    quote:
      'At MAKEWAYS, we take our work too seriously without taking ourselves seriously.',
    image: '/images/n.jpeg',
  },
  {
    id: 2,
    name: 'SHRINKHALA KHATIWADA',
    role: 'MISS NEPAL WORLD 2018',
    quote:
      'MAKEWAYS has consistently delivered exceptional results that exceed our expectations.',
    image: '/images/s.jpeg',
  },
  {
    id: 3,
    name: 'ANIL KUMAR',
    role: 'MD – ANIL GROUP',
    quote:
      'MAKEWAYS has been instrumental in helping us achieve our marketing goals.',
    image: '/images/anil.jpg',
  },
];

type Phase = 'idle' | 'exit' | 'enter';

export default function Testimonials() {
  const [current, setCurrent] = useState<number>(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const startTransition = useCallback(
    (next: number) => {
      if (phase !== 'idle' || next === current) return;
      clearInterval(timerRef.current);
      setPhase('exit');
      setTimeout(() => {
        setCurrent(next);
        setPhase('enter');
        setTimeout(() => setPhase('idle'), 450);
      }, 350);
    },
    [phase, current]
  );

  const goNext = useCallback(
    () => startTransition((current + 1) % TESTIMONIALS.length),
    [current, startTransition]
  );

  const goPrev = useCallback(
    () => startTransition((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    [current, startTransition]
  );

  /* ── keyboard navigation ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  /* ── auto-advance ── */
  useEffect(() => {
    timerRef.current = setInterval(goNext, 6000);
    return () => clearInterval(timerRef.current);
  }, [goNext]);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  const t          = TESTIMONIALS[current];
  const isExit     = phase === 'exit';
  const isEnter    = phase === 'enter';

  /* shared animation styles */
  const fadeUp = (delay = '0s') => ({
    opacity   : isExit ? 0 : 1,
    transform : isExit ? 'translateY(10px)' : 'translateY(0px)',
    transition: isExit
      ? 'opacity 0.28s ease, transform 0.28s ease'
      : `opacity 0.38s ease ${delay}, transform 0.38s ease ${delay}`,
  });

  return (
    <section
      className="testi"
      aria-label="Client Testimonials"
      /* make section focusable so keyboard hint is meaningful */
      tabIndex={-1}
    >

      {/* ═══════════════════ DESKTOP / TABLET ═══════════════════ */}
      <div className="testi__shell">

        {/* ─── LEFT PANEL ─── */}
        <div className="testi__left">

          {/* Name + Role */}
          <div className="testi__meta" style={fadeUp('0s')}>
            <h3 className="testi__name">{t.name}</h3>
            <p  className="testi__role">{t.role}</p>
          </div>

          {/* SAYS — absolutely static, never animates */}
          <div className="testi__says-block" aria-hidden="true">
            <span className="testi__says">SAYS</span>
            <span className="testi__about">ABOUT MAKEWAYS</span>
          </div>

          {/* Quote */}
          <p className="testi__quote" style={fadeUp('0.07s')}>
            {t.quote}
          </p>

          {/* Desktop dots */}
          <nav className="testi__dots" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === current ? 'true' : 'false'}
                className={`testi__dot${i === current ? ' dot--on' : ''}`}
                onClick={() => startTransition(i)}
              />
            ))}
          </nav>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div className="testi__right">

          {/* Prev arrow — mobile only, rendered via CSS */}
          <button
            className="testi__arrow testi__arrow--prev"
            onClick={goPrev}
            aria-label="Previous testimonial (← key)"
            tabIndex={-1}
          >
            <ChevronLeft />
          </button>

          {/* Photo */}
          <div
            className="testi__imgpanel"
            role="img"
            aria-label={t.name}
            style={{
              opacity   : isExit ? 0 : 1,
              transform : isExit ? 'scale(1.04)' : 'scale(1)',
              transition: isExit
                ? 'opacity 0.30s ease, transform 0.30s ease'
                : 'opacity 0.45s ease 0.04s, transform 0.45s ease 0.04s',
            }}
          >
            <img
              key={t.id}
              src={t.image}
              alt={t.name}
              className="testi__img"
              onError={handleImgError}
            />
          </div>

          {/* Next arrow */}
          <button
            className="testi__arrow testi__arrow--next"
            onClick={goNext}
            aria-label="Next testimonial (→ key)"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* ─── Mobile dots ─── */}
      <nav className="testi__mobile-dots" aria-label="Testimonial navigation">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`testi__dot${i === current ? ' dot--on' : ''}`}
            onClick={() => startTransition(i)}
          />
        ))}
      </nav>

      <style jsx>{`

        /* ══ FONT FACES — mirror these in globals.css if preferred ══ */
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileBold.ttf') format('truetype');
          font-weight : 700;
          font-style  : normal;
          font-display: swap;
        }
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileBold 2.ttf') format('truetype');
          font-weight : 800;
          font-style  : normal;
          font-display: swap;
        }
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileExtended.ttf') format('truetype');
          font-weight : 900;
          font-style  : normal;
          font-display: swap;
        }
        @font-face {
          font-family : 'EurostileCnd';
          src         : url('/fonts/FONTS/EurostileCnd-Bold Regular.ttf') format('truetype');
          font-weight : 700;
          font-style  : normal;
          font-display: swap;
        }

        /* ══ TOKENS ══ */
        .testi {
          --orange   : #F5A623;
          --bg       : #C8C8C8;
          --dark     : #2A2A2A;
          --grey     : #5A5A5A;
          --subgrey  : #707070;
          --divider  : rgba(0,0,0,0.13);
          --h        : clamp(360px, 46vw, 560px);

          background : var(--bg);
          width      : 100%;
          overflow   : hidden;
          outline    : none; /* suppress focus ring on section */
          font-family: 'Eurostile', 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif;
        }

        /* ══ SHELL ══ */
        .testi__shell {
          display    : flex;
          align-items: stretch;
          height     : var(--h);
          width      : 100%;
        }

        /* ══ LEFT ══ */
        .testi__left {
          flex           : 1 1 0;
          min-width      : 0;
          display        : flex;
          flex-direction : column;
          justify-content: center;

          /* tight, intentional padding — left breathes more than right */
          padding        : 0 clamp(24px, 2.8vw, 44px) 0 clamp(36px, 6vw, 96px);
          gap            : 0;
          position       : relative;
          z-index        : 2;
        }

        /* hairline divider */
        .testi__left::after {
          content   : '';
          position  : absolute;
          right     : 0;
          top       : 10%;
          height    : 80%;
          width     : 1px;
          background: var(--divider);
        }

        /* ── Name ── */
        .testi__meta {
          display       : flex;
          flex-direction: column;
          gap           : 4px;
          margin-bottom : 2px;
        }

        .testi__name {
          font-family   : 'Eurostile', 'Barlow Condensed', Arial, sans-serif;
          font-size     : clamp(13px, 1.55vw, 21px);
          font-weight   : 700;
          color         : var(--grey);
          letter-spacing: 2.4px;
          text-transform: uppercase;
          line-height   : 1;
          margin        : 0;
        }

        .testi__role {
          font-family   : 'EurostileCnd', 'Eurostile', 'Barlow Condensed', Arial, sans-serif;
          font-size     : clamp(7px, 0.65vw, 9.5px);
          font-weight   : 700;
          color         : var(--subgrey);
          letter-spacing: 3.5px;
          text-transform: uppercase;
          margin        : 0;
          line-height   : 1;
        }

        /* ══ SAYS BLOCK — STATIC ══ */
        .testi__says-block {
          display        : flex;
          flex-direction : column;
          line-height    : 1;
          /* zero gap — SAYS hugs role label optically */
          margin-top     : -2px;
        }

        .testi__says {
          font-family   : 'Eurostile', 'Barlow Condensed', Arial, sans-serif;
          font-size     : clamp(82px, 13vw, 172px);
          font-weight   : 900;
          color         : var(--orange);
          letter-spacing: -4px;
          line-height   : 0.80;
          text-transform: uppercase;
          display       : block;
          /* optical left-flush */
          margin-left   : -3px;

          /* frozen — absolutely no animation */
          transform     : none !important;
          opacity       : 1   !important;
          transition    : none !important;
          animation     : none !important;
        }

        .testi__about {
          font-family   : 'EurostileCnd', 'Eurostile', 'Barlow Condensed', Arial, sans-serif;
          font-size     : clamp(6px, 0.55vw, 8px);
          font-weight   : 700;
          color         : #8C8C8C;
          letter-spacing: 5.5px;
          text-transform: uppercase;
          display       : block;
          margin-top    : 11px;
          padding-left  : 3px;

          /* frozen */
          transform     : none !important;
          opacity       : 1   !important;
          transition    : none !important;
        }

        /* ── Quote ── */
        .testi__quote {
          font-family  : 'Barlow', Georgia, serif;
          font-size    : clamp(12px, 1vw, 14.5px);
          font-weight  : 400;
          color        : #2C2C2C;
          line-height  : 1.8;
          max-width    : 440px;
          margin-top   : 18px;
          margin-bottom: 26px;
          padding      : 0;
        }

        /* ══ DOTS ══ */
        .testi__dots {
          display    : flex;
          align-items: center;
          gap        : 10px;
        }

        .testi__mobile-dots {
          display        : none;
          justify-content: center;
          align-items    : center;
          gap            : 10px;
          padding        : 18px 0 24px;
        }

        .testi__dot {
          width        : 8px;
          height       : 8px;
          border-radius: 50%;
          border       : none;
          background   : #A8A8A8;
          cursor       : pointer;
          padding      : 0;
          transition   : background 0.22s, transform 0.22s;
        }

        .dot--on {
          background: var(--dark);
          transform : scale(1.45);
        }

        .testi__dot:hover:not(.dot--on) {
          background: #666;
        }

        .testi__dot:focus-visible {
          outline       : 2px solid var(--orange);
          outline-offset: 3px;
        }

        /* ══ RIGHT PANEL ══ */
        .testi__right {
          position   : relative;
          width      : clamp(240px, 37%, 490px);
          flex-shrink: 0;
          overflow   : hidden;
        }

        .testi__imgpanel {
          position: absolute;
          inset   : 0;
          z-index : 1;
        }

        .testi__img {
          width          : 100%;
          height         : 100%;
          object-fit     : cover;
          object-position: center top;
          display        : block;
          filter         : grayscale(100%) contrast(1.06) brightness(0.93);
        }

        /* ══ ARROWS ══ */
        .testi__arrow {
          position       : absolute;
          top            : 50%;
          transform      : translateY(-50%);
          width          : 44px;
          height         : 44px;
          background     : var(--orange);
          border         : none;
          cursor         : pointer;
          display        : flex;
          align-items    : center;
          justify-content: center;
          z-index        : 20;
          transition     : background 0.18s, opacity 0.18s;
        }

        .testi__arrow svg {
          width : 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .testi__arrow:hover  { background: #D98A10; }
        .testi__arrow:active { opacity: 0.72; }

        .testi__arrow:focus-visible {
          outline       : 2px solid var(--dark);
          outline-offset: 2px;
        }

        /* Next — right edge triangle clip */
        .testi__arrow--next {
          right       : 0;
          clip-path   : polygon(0 0, 100% 50%, 0 100%);
          padding-left: 10px;
        }

        /* Prev — completely hidden on desktop (visibility + pointer-events) */
        .testi__arrow--prev {
          left          : 0;
          clip-path     : polygon(100% 0, 0 50%, 100% 100%);
          padding-right : 10px;
          visibility    : hidden;
          pointer-events: none;
          opacity       : 0;
        }

        /* ══ TABLET ≤ 960px ══ */
        @media (max-width: 960px) {
          .testi__left { padding: 0 20px 0 5vw; }
          .testi__says { font-size: clamp(72px, 14vw, 130px); }
        }

        /* ══ MOBILE ≤ 700px ══ */
        @media (max-width: 700px) {
          .testi__shell {
            flex-direction: column;
            height        : auto;
          }

          .testi__right {
            width     : 100%;
            height    : 56vw;
            min-height: 210px;
            max-height: 320px;
            order     : 1;
          }

          .testi__img           { object-position: center 12%; }
          .testi__arrow--prev   { visibility: visible; opacity: 1; pointer-events: auto; display: flex; }

          .testi__left {
            order  : 2;
            padding: 28px 24px 12px;
          }

          .testi__left::after   { display: none; }
          .testi__dots          { display: none; }
          .testi__mobile-dots   { display: flex; }

          .testi__says          { font-size: clamp(64px, 22vw, 106px); }
          .testi__name          { font-size: clamp(13px, 4.5vw, 20px); }
          .testi__quote         { font-size: 13.5px; margin-bottom: 0; }
          .testi__about         { margin-top: 8px; }
        }

        /* ══ SMALL PHONE ≤ 420px ══ */
        @media (max-width: 420px) {
          .testi__right { height: 62vw; }
          .testi__left  { padding: 22px 18px 10px; }
          .testi__arrow { width: 38px; height: 38px; }
          .testi__says  { font-size: clamp(50px, 25vw, 80px); }
          .testi__name  { font-size: clamp(11px, 5.2vw, 17px); }
          .testi__quote { font-size: 13px; line-height: 1.7; }
        }
      `}</style>
    </section>
  );
}

/* ── Inline SVG helpers — no extra dependency ── */
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff"
      strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff"
      strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}