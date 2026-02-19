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

export default function Testimonials() {
  const [current, setCurrent] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const navigate = useCallback(
    (next: number) => {
      if (animating || next === current) return;
      setAnimating(true);
      setVisible(false);
      clearInterval(timerRef.current);
      setTimeout(() => {
        setCurrent(next);
        setVisible(true);
        setAnimating(false);
      }, 380);
    },
    [animating, current]
  );

  const goNext = useCallback(
    () => navigate((current + 1) % TESTIMONIALS.length),
    [current, navigate]
  );

  const goPrev = useCallback(
    () => navigate((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    [current, navigate]
  );

  useEffect(() => {
    timerRef.current = setInterval(goNext, 6000);
    return () => clearInterval(timerRef.current);
  }, [goNext]);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const parent = e.currentTarget.parentElement;
    e.currentTarget.style.display = 'none';
    if (parent) parent.setAttribute('data-empty', 'true');
  };

  const t = TESTIMONIALS[current];

  return (
    <section className="testi" aria-label="Client Testimonials">

      {/* ════════════════ DESKTOP / TABLET ════════════════ */}
      <div className="testi__shell">

        {/* ─── LEFT PANEL ─── */}
        <div className="testi__left">

          {/* Name + Role — animates */}
          <div className={`testi__meta ${visible ? 'meta--in' : 'meta--out'}`}>
            <h3 className="testi__name">{t.name}</h3>
            <p  className="testi__role">{t.role}</p>
          </div>

          {/* SAYS — absolutely STATIC, zero animation */}
          <div className="testi__says-block" aria-hidden="true">
            <span className="testi__says">SAYS</span>
            <span className="testi__about">ABOUT MAKEWAYS</span>
          </div>

          {/* Quote — animates */}
          <p className={`testi__quote ${visible ? 'quote--in' : 'quote--out'}`}>
            {t.quote}
          </p>

          {/* Desktop dot navigation */}
          <nav className="testi__dots" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === current ? 'true' : 'false'}
                className={`testi__dot ${i === current ? 'dot--on' : ''}`}
                onClick={() => navigate(i)}
              />
            ))}
          </nav>
        </div>

        {/* ─── RIGHT PANEL — full bleed photo ─── */}
        <div className="testi__right">

          {/* Prev — mobile only */}
          <button
            className="testi__arrow testi__arrow--prev"
            onClick={goPrev}
            aria-label="Previous testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Photo — full-bleed cover */}
          <div
            className={`testi__imgpanel ${visible ? 'img--in' : 'img--out'}`}
            role="img"
            aria-label={t.name}
          >
            <img
              key={t.id}
              src={t.image}
              alt={t.name}
              className="testi__img"
              onError={handleImgError}
            />
          </div>

          {/* Next arrow — pokes out right edge */}
          <button
            className="testi__arrow testi__arrow--next"
            onClick={goNext}
            aria-label="Next testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile-only dots row */}
      <nav className="testi__mobile-dots" aria-label="Testimonial navigation">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`testi__dot ${i === current ? 'dot--on' : ''}`}
            onClick={() => navigate(i)}
          />
        ))}
      </nav>

      <style jsx>{`

        /* ══════════════════════════════════════════════
           EUROSTILE — Adobe Fonts / Typekit
           The font-family name 'eurostile' works if you have
           added the Typekit kit to your layout (see README).
           Barlow Condensed is the web fallback.
        ══════════════════════════════════════════════ */

        .testi {
          --orange : #F5A623;
          --bg     : #CACACA;
          --dark   : #2A2A2A;
          --grey   : #6B6B6B;
          --subgrey: #5C5C5C;

          /* Section height — aspect ratio locked */
          --section-h: clamp(400px, 50vw, 600px);

          background  : var(--bg);
          width       : 100%;
          overflow    : hidden;
          position    : relative;

          /*
            Eurostile from Adobe Fonts (Typekit).
            In your layout.tsx / _document.tsx add:
              <link rel="stylesheet" href="https://use.typekit.net/YOUR_KIT_ID.css" />
            Then this font-family stack picks it up automatically.
          */
          font-family : 'eurostile', 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif;
        }

        /* ── Shell ── */
        .testi__shell {
          display      : flex;
          align-items  : stretch;
          height       : var(--section-h);
          width        : 100%;
          position     : relative;
        }

        /* ════════════════════════════════════
           LEFT PANEL
        ════════════════════════════════════ */
        .testi__left {
          flex           : 1 1 0;
          min-width      : 0;
          display        : flex;
          flex-direction : column;
          justify-content: center;
          /* padding: top right bottom left — left padding is generous */
          padding        : 0 clamp(24px, 3vw, 52px) 0 clamp(36px, 6.5vw, 96px);
          position       : relative;
          z-index        : 2;
        }

        /* Hairline divider — left/right separator */
        .testi__left::after {
          content    : '';
          position   : absolute;
          right      : 0;
          top        : 10%;
          height     : 80%;
          width      : 1px;
          background : rgba(0, 0, 0, 0.13);
        }

        /* ── Name ── */
        .testi__name {
          font-family   : 'eurostile', 'Barlow Condensed', Arial, sans-serif;
          font-size     : clamp(15px, 1.85vw, 25px);
          font-weight   : 700;
          color         : var(--grey);
          letter-spacing: 1.8px;
          text-transform: uppercase;
          line-height   : 1.1;
          margin        : 0;
        }

        /* ── Role ── */
        .testi__role {
          font-family   : 'eurostile', 'Barlow Condensed', Arial, sans-serif;
          font-size     : clamp(8px, 0.78vw, 10.5px);
          font-weight   : 700;
          color         : var(--subgrey);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top    : 6px;
        }

        /* ── SAYS — never animates ── */
        .testi__says-block {
          display       : flex;
          flex-direction: column;
          margin-top    : 0px;
          line-height   : 1;
        }

        .testi__says {
          font-family   : 'eurostile', 'Barlow Condensed', Arial, sans-serif;
          font-size     : clamp(86px, 13.8vw, 176px);
          font-weight   : 900;
          color         : var(--orange);
          letter-spacing: -6px;
          line-height   : 0.80;
          text-transform: uppercase;
          display       : block;
          margin-left   : -6px; /* optical alignment to left edge */
        }

        .testi__about {
          font-family   : 'eurostile', 'Barlow Condensed', Arial, sans-serif;
          font-size     : clamp(7px, 0.65vw, 9px);
          font-weight   : 700;
          color         : #888;
          letter-spacing: 4.5px;
          text-transform: uppercase;
          margin-top    : 10px;
          padding-left  : 4px;
          display       : block;
        }

        /* ── Quote ── */
        .testi__quote {
          font-family: 'Barlow', 'Arial', sans-serif;
          font-size  : clamp(12.5px, 1.1vw, 15.5px);
          font-weight: 400;
          color      : #303030;
          line-height: 1.72;
          max-width  : 480px;
          margin-top : 18px;
          margin-bottom: 26px;
        }

        /* ── Desktop dots ── */
        .testi__dots {
          display    : flex;
          align-items: center;
          gap        : 9px;
        }

        /* ── Mobile dots ── */
        .testi__mobile-dots {
          display        : none;
          justify-content: center;
          align-items    : center;
          gap            : 9px;
          padding        : 16px 0 22px;
        }

        /* Shared dot style */
        .testi__dot {
          width        : 9px;
          height       : 9px;
          border-radius: 50%;
          border       : none;
          background   : #999;
          cursor       : pointer;
          padding      : 0;
          transition   : background 0.22s, transform 0.22s;
        }

        .dot--on {
          background: var(--dark);
          transform : scale(1.35);
        }

        .testi__dot:hover:not(.dot--on) { background: #555; }

        /* ════════════════════════════════════
           RIGHT PANEL — full bleed photo
        ════════════════════════════════════ */
        .testi__right {
          position   : relative;
          width      : clamp(280px, 40%, 520px);
          flex-shrink: 0;
          overflow   : hidden; /* clips image cleanly to panel */
        }

        /* ── Image panel — fills right panel 100% ── */
        .testi__imgpanel {
          position: absolute;
          inset   : 0; /* top:0 right:0 bottom:0 left:0 */
          z-index : 1;
        }

        .testi__img {
          width          : 100%;
          height         : 100%;
          object-fit     : cover;        /* fills panel completely — no gaps */
          object-position: center top;   /* keep face visible */
          display        : block;
          filter         : grayscale(100%) contrast(1.06) brightness(0.97);
        }

        /* ════════════════════════════════════
           ARROWS
        ════════════════════════════════════ */
        .testi__arrow {
          position       : absolute;
          top            : 50%;
          transform      : translateY(-50%);
          width          : 46px;
          height         : 46px;
          background     : var(--orange);
          border         : none;
          cursor         : pointer;
          display        : flex;
          align-items    : center;
          justify-content: center;
          z-index        : 20;
          transition     : background 0.18s, opacity 0.18s;
        }

        .testi__arrow:hover  { background: #D98A10; }
        .testi__arrow:active { opacity: 0.8; }

        /* Next — right edge, chevron pointing right */
        .testi__arrow--next {
          right      : 0;
          clip-path  : polygon(0 0, 100% 50%, 0 100%);
          padding-left: 10px;
        }

        /* Prev — hidden desktop, shown mobile */
        .testi__arrow--prev {
          left         : 0;
          clip-path    : polygon(100% 0, 0 50%, 100% 100%);
          padding-right: 10px;
          display      : none;
        }

        /* ════════════════════════════════════
           ANIMATION STATES
        ════════════════════════════════════ */
        .testi__meta {
          transition: opacity 0.34s ease, transform 0.34s ease;
        }
        .meta--in  { opacity: 1; transform: translateY(0px); }
        .meta--out { opacity: 0; transform: translateY(-10px); }

        .testi__quote {
          transition: opacity 0.34s ease 0.07s, transform 0.34s ease 0.07s;
        }
        .quote--in  { opacity: 1; transform: translateY(0px); }
        .quote--out { opacity: 0; transform: translateY(10px); }

        .testi__imgpanel {
          transition: opacity 0.34s ease;
        }
        .img--in  { opacity: 1; }
        .img--out { opacity: 0; }

        /* ════════════════════════════════════
           ACCESSIBILITY
        ════════════════════════════════════ */
        .testi__arrow:focus-visible,
        .testi__dot:focus-visible {
          outline       : 2px solid var(--orange);
          outline-offset: 3px;
        }

        /* ════════════════════════════════════
           TABLET  ≤ 960px
        ════════════════════════════════════ */
        @media (max-width: 960px) {
          .testi__left {
            padding: 0 20px 0 5vw;
          }
          .testi__says {
            font-size: clamp(76px, 15vw, 132px);
          }
        }

        /* ════════════════════════════════════
           MOBILE  ≤ 700px — stacked layout
        ════════════════════════════════════ */
        @media (max-width: 700px) {
          .testi__shell {
            flex-direction: column;
            height        : auto;
          }

          /* Photo on top */
          .testi__right {
            width     : 100%;
            height    : 55vw;
            min-height: 230px;
            max-height: 340px;
            order     : 1;
          }

          /* Center face for portrait crops */
          .testi__img { object-position: center 10%; }

          /* Show both nav arrows */
          .testi__arrow--prev { display: flex; }

          /* Text below */
          .testi__left {
            order     : 2;
            padding   : 28px 24px 10px 24px;
          }
          .testi__left::after { display: none; }

          /* Swap dots */
          .testi__dots        { display: none; }
          .testi__mobile-dots { display: flex; }

          .testi__says  { font-size: clamp(68px, 22vw, 106px); }
          .testi__name  { font-size: clamp(14px, 4.5vw, 22px); }
          .testi__quote { font-size: 14px; margin-bottom: 0; }
          .testi__about { margin-top: 6px; }
        }

        /* ════════════════════════════════════
           SMALL PHONE  ≤ 420px
        ════════════════════════════════════ */
        @media (max-width: 420px) {
          .testi__right  { height: 60vw; }
          .testi__left   { padding: 22px 18px 8px 18px; }
          .testi__arrow  { width: 38px; height: 38px; }
          .testi__says   { font-size: clamp(54px, 25vw, 84px); }
          .testi__name   { font-size: clamp(13px, 5vw, 19px); }
          .testi__quote  { font-size: 13px; }
        }
      `}</style>
    </section>
  );
}