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
    role: 'MD - CHAUDHARY GROUP',
    quote:
      'Our association with Makeways goes beyond a typical client - agency relationship. Their strategic thinking and creativity make them one of the finest agencies in Nepal and my first choice.',
    image: '/images/testimonial/NIRVANACHAUDHARY.png',
  },
  {
    id: 2,
    name: 'HIMANSHU GOLCHA',
    role: 'EXECUTIVE DIRECTOR - HULAS STEEL',
    quote:
      'Our experience working with Makeways has been extremely rewarding. What I appreciate about Makeways is their ability to combine creativity with results-driven campaigns.',
    image: '/images/testimonial/HIMANSHUGOLCHA.png',
  },
  {
    id: 3,
    name: 'MALVIKA SUBBA',
    role: 'MISS NEPAL / MEDIA PERSON',
    quote:
      'Working with Makeways has been a smooth and collaborative experience. They are attentive to detail, responsive to feedback, and committed to delivering top-notch event solutions.',
    image: '/images/testimonial/MalvikaSubba.png',
  },
  {
    id: 4,
    name: 'BHUSAN DAHAL',
    role: 'MEDIA LEADER',
    quote:
      'What I admire about Makeways is their storytelling approach. Their campaigns are not just visually appealing but also culturally relevant and emotionally engaging.',
    image: '/images/testimonial/BHUSANDAHAL.png',
  },
  {
    id: 5,
    name: 'SUDIP THAPA',
    role: 'PRESIDENT - ADVERTISING ASSOCIATION OF NEPAL',
    quote:
      'Over the years, I have observed many campaigns from Makeways that have contributed positively to Nepal\'s advertising standards. Their work is thoughtful, well-executed, and impactful.',
    image: '/images/testimonial/SUDIPTHAPA.png',
  },
  {
    id: 6,
    name: 'IRAJ SHRESTHA',
    role: 'SALES & MARKETING HEAD - GOLDSTAR SHOES',
    quote:
      'Makeways stands out because they approach branding with clarity and purpose. Their ideas are not only creative but also aligned with long-term brand positioning.',
    image: '/images/testimonial/IRAJSHRESTHA.png',
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
        setTimeout(() => setPhase('idle'), 500);
      }, 380);
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
    if (current === TESTIMONIALS.length - 1) return; // stop at last slide
    timerRef.current = setInterval(goNext, 6000);
    return () => clearInterval(timerRef.current);
  }, [goNext, current]);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  const t      = TESTIMONIALS[current];
  const isExit = phase === 'exit';

  /* Animated elements slide up on enter, slide down on exit */
  const fadeUp = (delay = '0s') => ({
    opacity   : isExit ? 0 : 1,
    transform : isExit ? 'translateY(14px)' : 'translateY(0px)',
    transition: isExit
      ? 'opacity 0.30s ease, transform 0.30s ease'
      : `opacity 0.42s ease ${delay}, transform 0.42s ease ${delay}`,
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

          {/* Name + Role — ANIMATED */}
          <div className="testi__meta" style={fadeUp('0s')}>
            <h3 className="testi__name">{t.name}</h3>
            <p  className="testi__role">{t.role}</p>
          </div>

          {/* ══ SAYS BLOCK — 100% FROZEN, NEVER ANIMATES ══ */}
          <div className="testi__says-block" aria-hidden="true">
            <span className="testi__says">SAYS</span>
            <span className="testi__about">ABOUT MAKEWAYS</span>
          </div>

          {/* Quote — ANIMATED with slight delay after name */}
          <p className="testi__quote" style={fadeUp('0.08s')}>
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

        {/* ─── RIGHT PANEL — photo ANIMATED ─── */}
        <div className="testi__right">

          {/* ── PREV BUTTON — visible from slide 2 onwards ── */}
          <button
            className="testi__arrow testi__arrow--prev"
            onClick={goPrev}
            aria-label="Previous testimonial (← key)"
            tabIndex={-1}
            style={{
              visibility    : current === 0 ? 'hidden' : 'visible',
              opacity       : current === 0 ? 0 : 1,
              pointerEvents : current === 0 ? 'none' : 'auto',
              transition    : 'opacity 0.30s ease',
            }}
          >
            <span className="arrow__ring">
              <span className="arrow__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </span>
            </span>
            <span className="arrow__tail arrow__tail--left" />
          </button>

          <div
            className="testi__imgpanel"
            role="img"
            aria-label={t.name}
            style={{
              opacity   : isExit ? 0 : 1,
              transform : isExit ? 'scale(1.045)' : 'scale(1)',
              transition: isExit
                ? 'opacity 0.32s ease, transform 0.32s ease'
                : 'opacity 0.50s ease 0.06s, transform 0.50s ease 0.06s',
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

          {/* ── NEXT BUTTON — hidden on last slide ── */}
          <button
            className="testi__arrow testi__arrow--next"
            onClick={goNext}
            aria-label="Next testimonial (→ key)"
            style={{
              visibility    : current === TESTIMONIALS.length - 1 ? 'hidden' : 'visible',
              opacity       : current === TESTIMONIALS.length - 1 ? 0 : 1,
              pointerEvents : current === TESTIMONIALS.length - 1 ? 'none' : 'auto',
              transition    : 'opacity 0.30s ease',
            }}
          >
            <span className="arrow__tail arrow__tail--right" />
            <span className="arrow__ring">
              <span className="arrow__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </span>
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

        /* ══ DESIGN TOKENS ══ */
        .testi {
          --orange  : #F5A623;
          --bg      : #C8C8C8;
          --dark    : #2A2A2A;
          --grey    : #3A3A3A;
          --subgrey : #555555;
          --divider : rgba(0,0,0,0.10);
          --h       : clamp(380px, 48vw, 580px);

          background : var(--bg);
          width      : 100%;
          overflow   : hidden;
          outline    : none;
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
        }

        /* ══ SHELL — left ~45%, right ~55% ══ */
        .testi__shell {
          display    : flex;
          align-items: stretch;
          height     : var(--h);
          width      : 100%;
        }

        /* ══ LEFT PANEL ══ */
        .testi__left {
          flex           : 0 0 45%;
          min-width      : 0;
          display        : flex;
          flex-direction : column;
          justify-content: center;
          padding        : 0 clamp(20px, 2.4vw, 40px) 0 clamp(32px, 5.5vw, 88px);
          gap            : 0;
          position       : relative;
          z-index        : 2;
        }

        /* Subtle vertical divider */
        .testi__left::after {
          content   : '';
          position  : absolute;
          right     : 0;
          top       : 8%;
          height    : 84%;
          width     : 1px;
          background: var(--divider);
        }

        /* ── Name + Role wrapper — animated together ── */
        .testi__meta {
          display       : flex;
          flex-direction: column;
          gap           : 5px;
          margin-bottom : 0;
        }

        /* Name: LARGE + ORANGE — matching PDF */
        .testi__name {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(18px, 2.2vw, 30px);
          font-weight   : 800;
          color         : var(--orange);
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height   : 1;
          margin        : 0;
        }

        /* Role: small, dark, condensed caps */
        .testi__role {
          font-family   : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(8px, 0.72vw, 11.5px);
          font-weight   : 700;
          color         : var(--grey);
          letter-spacing: 3.8px;
          text-transform: uppercase;
          margin        : 0;
          line-height   : 1.2;
        }

        /* ══════════════════════════════════════════
           SAYS BLOCK — COMPLETELY STATIC, FROZEN
           No animation. No transition. Ever.
        ══════════════════════════════════════════ */
        .testi__says-block {
          display       : flex;
          flex-direction: column;
          line-height   : 1;
          margin-top    : -4px;
          isolation     : isolate;
        }

        .testi__says {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(90px, 14.5vw, 190px);
          font-weight   : 900;
          color         : var(--orange);
          letter-spacing: -6px;
          line-height   : 0.78;
          text-transform: uppercase;
          display       : block;
          margin-left   : -4px;
          transform     : none !important;
          opacity       : 1   !important;
          transition    : none !important;
          animation     : none !important;
          will-change   : auto;
        }

        /* "ABOUT MAKEWAYS" — small tracking label, frozen */
        .testi__about {
          font-family   : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(7px, 0.55vw, 9.5px);
          font-weight   : 700;
          color         : #3A3A3A;
          letter-spacing: 6px;
          text-transform: uppercase;
          display       : block;
          margin-top    : 14px;
          padding-left  : 3px;
          transform     : none !important;
          opacity       : 1   !important;
          transition    : none !important;
          animation     : none !important;
        }

        /* ── Quote — matches PDF body style ── */
        .testi__quote {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(13px, 1.05vw, 16px);
          font-weight   : 400;
          color         : #2C2C2C;
          line-height   : 1.80;
          letter-spacing: 0.15px;
          max-width     : 420px;
          margin-top    : 20px;
          margin-bottom : 28px;
          padding       : 0;
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

        /* ══ RIGHT PANEL — wider, full-bleed photo ══ */
        .testi__right {
          position   : relative;
          flex       : 0 0 55%;
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
        }

        /* ══════════════════════════════════════════════
           ARROW BUTTONS — redesigned cute pill style
        ══════════════════════════════════════════════ */
        .testi__arrow {
          position       : absolute;
          top            : 50%;
          transform      : translateY(-50%);
          display        : flex;
          align-items    : center;
          background     : none;
          border         : none;
          cursor         : pointer;
          z-index        : 20;
          padding        : 0;
          gap            : 0;
        }
        .testi__arrow:focus-visible { outline: 2px solid var(--orange); outline-offset: 4px; border-radius: 999px; }

        /* The circular ring badge */
        .arrow__ring {
          position       : relative;
          width          : 52px;
          height         : 52px;
          border-radius  : 50%;
          background     : var(--orange);
          display        : flex;
          align-items    : center;
          justify-content: center;
          box-shadow     : 0 4px 18px rgba(245,166,35,0.45), 0 1px 4px rgba(0,0,0,0.18);
          transition     : transform 0.22s cubic-bezier(.34,1.56,.64,1),
                           box-shadow 0.22s ease,
                           background 0.18s ease;
          flex-shrink    : 0;
          z-index        : 2;
        }

        .testi__arrow:hover .arrow__ring {
          transform : scale(1.12);
          background: #e8950f;
          box-shadow: 0 6px 28px rgba(245,166,35,0.60), 0 2px 6px rgba(0,0,0,0.20);
        }
        .testi__arrow:active .arrow__ring {
          transform : scale(0.94);
          box-shadow: 0 2px 10px rgba(245,166,35,0.35);
        }

        /* Inner icon */
        .arrow__icon {
          display        : flex;
          align-items    : center;
          justify-content: center;
          color          : #fff;
          line-height    : 0;
        }
        .arrow__icon svg {
          width : 18px;
          height: 18px;
        }

        /* The decorative horizontal tail line */
        .arrow__tail {
          display   : block;
          height    : 2px;
          width     : 28px;
          background: linear-gradient(to right, rgba(245,166,35,0.7), rgba(245,166,35,0));
          flex-shrink: 0;
          transition: width 0.22s ease, opacity 0.22s ease;
        }
        .arrow__tail--left {
          background: linear-gradient(to left, rgba(245,166,35,0.7), rgba(245,166,35,0));
        }
        .testi__arrow:hover .arrow__tail { width: 38px; opacity: 1; }

        /* NEXT — positioned on the right edge */
        .testi__arrow--next {
          right      : 0;
          flex-direction: row-reverse;
          padding-right: 0;
        }

        /* PREV — positioned on the left edge */
        .testi__arrow--prev {
          left          : 0;
          flex-direction: row;
        }

        /* ══ TABLET ≤ 960px ══ */
        @media (max-width: 960px) {
          .testi__left  { padding: 0 18px 0 5vw; flex: 0 0 48%; }
          .testi__right { flex: 0 0 52%; }
          .testi__says  { font-size: clamp(80px, 15vw, 140px); }
          .testi__name  { font-size: clamp(16px, 2.4vw, 26px); }
          .testi__quote { font-size: clamp(12px, 1.3vw, 15px); }
        }

        /* ══ MOBILE ≤ 700px ══ */
        @media (max-width: 700px) {
          .testi__shell { flex-direction: column; height: auto; }
          .testi__right {
            flex: none; width: 100%; height: 60vw;
            min-height: 220px; max-height: 340px; order: 1;
          }
          .testi__left {
            flex: none; width: 100%; order: 2;
            padding: 28px 24px 14px;
          }
          .testi__img { object-position: center 10%; }
          .testi__left::after { display: none; }
          .testi__dots        { display: none; }
          .testi__mobile-dots { display: flex; }

          .testi__says  { font-size: clamp(68px, 23vw, 110px); }
          .testi__name  { font-size: clamp(16px, 5vw, 22px); }
          .testi__quote { font-size: 15px; line-height: 1.75; margin-bottom: 0; }
          .testi__about { margin-top: 10px; }

          /* Slightly smaller arrows on mobile */
          .arrow__ring  { width: 44px; height: 44px; }
          .arrow__tail  { width: 18px; }
          .testi__arrow:hover .arrow__tail { width: 24px; }
        }

        /* ══ SMALL PHONE ≤ 420px ══ */
        @media (max-width: 420px) {
          .testi__right { height: 64vw; }
          .testi__left  { padding: 22px 18px 10px; }
          .testi__says  { font-size: clamp(52px, 26vw, 84px); }
          .testi__name  { font-size: clamp(14px, 5.5vw, 18px); }
          .testi__quote { font-size: 14px; line-height: 1.7; }
          .testi__role  { font-size: clamp(8px, 2.8vw, 11px); }

          .arrow__ring  { width: 38px; height: 38px; }
          .arrow__icon svg { width: 15px; height: 15px; }
          .arrow__tail  { width: 12px; }
        }
      `}</style>
    </section>
  );
}