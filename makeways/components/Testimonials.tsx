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
  const [phase, setPhase]     = useState<Phase>('idle');
  const timerRef              = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    timerRef.current = setInterval(goNext, 6000);
    return () => clearInterval(timerRef.current);
  }, [goNext]);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  const t      = TESTIMONIALS[current];
  const isExit = phase === 'exit';

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
      tabIndex={-1}
    >

      {/* ═══════════════════ DESKTOP / TABLET ═══════════════════ */}
      <div className="testi__shell">

        {/* ─── LEFT PANEL ─── */}
        <div className="testi__left">

          {/* Name + Role */}
          <div className="testi__meta" style={fadeUp('0s')}>
            {/* H4/Name — clamp(15px, 1.55vw, 20px), fw 700, ls 2.4px */}
            {/* Industry standard: H4 Card Label = 20–24px. Here used as  */}
            {/* a compact name-plate so clamped 15–20px fits the layout.   */}
            <h3 className="testi__name">{t.name}</h3>

            {/* Role sub-label — clamp(9px, 0.65vw, 11px), fw 700, ls 3.5px */}
            {/* Industry standard: Small / captions / labels = 12–14px.      */}
            {/* Clamped tighter here to sit below the large "SAYS" display.  */}
            <p className="testi__role">{t.role}</p>
          </div>

          {/* SAYS — decorative display element, never animates */}
          <div className="testi__says-block" aria-hidden="true">
            <span className="testi__says">SAYS</span>
            <span className="testi__about">ABOUT MAKEWAYS</span>
          </div>

          {/* Quote — Regular body: clamp(15px, 1.2vw, 18px), lh 1.75 */}
          {/* Industry standard: Regular body = 15–17px, lh 1.6–1.7    */}
          {/* Was: clamp(12px, 1vw, 14.5px) — too small for body copy   */}
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

          <button
            className="testi__arrow testi__arrow--prev"
            onClick={goPrev}
            aria-label="Previous testimonial (← key)"
            tabIndex={-1}
          >
            <ChevronLeft />
          </button>

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

        /* ══ FONT FACES ══ */
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileExt-Normal Regular.ttf') format('truetype');
          font-weight : 400;
          font-style  : normal;
          font-display: swap;
        }
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileBold.ttf') format('truetype');
          font-weight : 700;
          font-style  : normal;
          font-display: swap;
        }
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileTBold.ttf') format('truetype');
          font-weight : 800;
          font-style  : normal;
          font-display: swap;
        }
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileExt-Bold Regular.ttf') format('truetype');
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
          --orange  : #F5A623;
          --bg      : #C8C8C8;
          --dark    : #2A2A2A;
          --grey    : #5A5A5A;
          --subgrey : #707070;
          --divider : rgba(0,0,0,0.13);
          --h       : clamp(360px, 46vw, 560px);

          background : var(--bg);
          width      : 100%;
          overflow   : hidden;
          outline    : none;
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
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
          padding        : 0 clamp(24px, 2.8vw, 44px) 0 clamp(36px, 6vw, 96px);
          gap            : 0;
          position       : relative;
          z-index        : 2;
        }

        .testi__left::after {
          content   : '';
          position  : absolute;
          right     : 0;
          top       : 10%;
          height    : 80%;
          width     : 1px;
          background: var(--divider);
        }

        .testi__meta {
          display       : flex;
          flex-direction: column;
          gap           : 4px;
          margin-bottom : 2px;
        }

        /* ── Name — clamp(15px, 1.55vw, 20px), fw 700, ls 2.4px ─────────── */
        /* Was: clamp(13px, 1.55vw, 21px) — min was too small at 13px         */
        /* H4-range label in a compact sidebar context: 15–20px is right      */
        .testi__name {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(15px, 1.55vw, 20px);
          font-weight   : 700;
          color         : var(--grey);
          letter-spacing: 2.4px;
          text-transform: uppercase;
          line-height   : 1;
          margin        : 0;
        }

        /* ── Role sub-label — clamp(9px, 0.65vw, 11px), fw 700, ls 3.5px ── */
        /* Was: clamp(7px, 0.65vw, 9.5px) — 7px minimum is illegibly small   */
        /* Small / caption tier: min bumped to 9px for legibility             */
        .testi__role {
          font-family   : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(9px, 0.65vw, 11px);
          font-weight   : 700;
          color         : var(--subgrey);
          letter-spacing: 3.5px;
          text-transform: uppercase;
          margin        : 0;
          line-height   : 1;
        }

        /* ══ SAYS BLOCK — decorative display, static & frozen ══ */
        /* Industry standard: H1 / Display = 48–72px. Here used as             */
        /* a giant decorative word-mark at clamp(82px, 13vw, 172px) — fine     */
        /* since it is NOT body copy but a graphic element.                     */
        .testi__says-block {
          display       : flex;
          flex-direction: column;
          line-height   : 1;
          margin-top    : -2px;
        }

        .testi__says {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(82px, 13vw, 172px);
          font-weight   : 900;
          color         : var(--orange);
          letter-spacing: -4px;
          line-height   : 0.80;
          text-transform: uppercase;
          display       : block;
          margin-left   : -3px;
          /* Frozen — absolutely no animation on the display word-mark */
          transform     : none !important;
          opacity       : 1   !important;
          transition    : none !important;
          animation     : none !important;
        }

        /* "ABOUT MAKEWAYS" tag under SAYS — Small label: 8–10px */
        /* Industry standard: Small / captions = 12–14px.         */
        /* This sits beneath a 172px display word, so 8–10px      */
        /* is intentionally micro-sized for graphic contrast.      */
        .testi__about {
          font-family   : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(8px, 0.55vw, 10px);
          font-weight   : 700;
          color         : #8C8C8C;
          letter-spacing: 5.5px;
          text-transform: uppercase;
          display       : block;
          margin-top    : 11px;
          padding-left  : 3px;
          /* Frozen */
          transform     : none !important;
          opacity       : 1   !important;
          transition    : none !important;
        }

        /* ── Quote — Regular body: clamp(15px, 1.2vw, 18px), lh 1.75 ───── */
        /* WAS: clamp(12px, 1vw, 14.5px) — below 15px minimum for body copy  */
        /* Industry standard: Regular body = 15–17px, lh 1.6–1.7             */
        .testi__quote {
          font-family  : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size    : clamp(15px, 1.2vw, 18px);
          font-weight  : 400;
          color        : #2C2C2C;
          line-height  : 1.75;
          letter-spacing: 0.2px;
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

        .dot--on { background: var(--dark); transform: scale(1.45); }
        .testi__dot:hover:not(.dot--on) { background: #666; }
        .testi__dot:focus-visible { outline: 2px solid var(--orange); outline-offset: 3px; }

        /* ══ RIGHT PANEL ══ */
        .testi__right {
          position   : relative;
          width      : clamp(240px, 37%, 490px);
          flex-shrink: 0;
          overflow   : hidden;
        }

        .testi__imgpanel { position: absolute; inset: 0; z-index: 1; }

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

        .testi__arrow svg { width: 14px; height: 14px; flex-shrink: 0; }
        .testi__arrow:hover  { background: #D98A10; }
        .testi__arrow:active { opacity: 0.72; }
        .testi__arrow:focus-visible { outline: 2px solid var(--dark); outline-offset: 2px; }

        .testi__arrow--next {
          right       : 0;
          clip-path   : polygon(0 0, 100% 50%, 0 100%);
          padding-left: 10px;
        }

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
          .testi__quote { font-size: clamp(14px, 1.5vw, 17px); }
        }

        /* ══ MOBILE ≤ 700px ══ */
        @media (max-width: 700px) {
          .testi__shell { flex-direction: column; height: auto; }
          .testi__right {
            width: 100%; height: 56vw;
            min-height: 210px; max-height: 320px; order: 1;
          }
          .testi__img { object-position: center 12%; }
          .testi__arrow--prev { visibility: visible; opacity: 1; pointer-events: auto; display: flex; }
          .testi__left { order: 2; padding: 28px 24px 12px; }
          .testi__left::after { display: none; }
          .testi__dots { display: none; }
          .testi__mobile-dots { display: flex; }

          .testi__says { font-size: clamp(64px, 22vw, 106px); }
          /* Mobile name — clamp(14px, 4.5vw, 20px) */
          .testi__name { font-size: clamp(14px, 4.5vw, 20px); }
          /* Mobile quote — Regular body: 15px min on mobile */
          .testi__quote { font-size: 15px; line-height: 1.7; margin-bottom: 0; }
          .testi__about { margin-top: 8px; }
        }

        /* ══ SMALL PHONE ≤ 420px ══ */
        @media (max-width: 420px) {
          .testi__right { height: 62vw; }
          .testi__left  { padding: 22px 18px 10px; }
          .testi__arrow { width: 38px; height: 38px; }
          .testi__says  { font-size: clamp(50px, 25vw, 80px); }
          .testi__name  { font-size: clamp(13px, 5.2vw, 17px); }
          .testi__quote { font-size: 14px; line-height: 1.7; }
          .testi__role  { font-size: clamp(9px, 2.8vw, 11px); }
        }
      `}</style>
    </section>
  );
}

/* ── Inline SVG helpers ── */
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