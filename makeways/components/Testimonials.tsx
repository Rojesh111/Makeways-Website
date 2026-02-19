'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string; // path e.g. '/images/testimonials/nirvana.png'
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'NIRVANA CHAUDHARY',
    role: 'MD - CHAUDHARY GROUP',
    quote: 'At MAKEWAYS, we take our work too seriously without taking ourselves seriously.',
    image: '/images/n.jpeg', // ← replace with actual path
  },
  {
    id: 2,
    name: 'Shrinkhala Khatiwada',
    role: 'MISS NEPAL WORLD 2018',
    quote: 'MAKEWAYS has consistently delivered exceptional results that exceed our expectations.',
    image: '/images/s.jpeg', 
  },
  {
    id: 3,
    name: 'ANIL KUMAR',
    role: 'MD - ANIL GROUP',
    quote: 'MAKEWAYS has been instrumental in helping us achieve our marketing goals.',
    image: '/images/anil.jpg',
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback((index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
      setAnimating(false);
    }, 320);
  }, [animating, current]);

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <>
      <section className="testi">
        <div className="testi__inner">

          {/* ── LEFT CONTENT ──────────────────────────────────────────── */}
          <div className="testi__left">

            {/* Name + role — animates out/in */}
            <div className={`testi__meta ${visible ? 'testi__meta--in' : 'testi__meta--out'}`}>
              <h3 className="testi__name">{t.name}</h3>
              <p className="testi__role">{t.role}</p>
            </div>

            {/* SAYS — FIXED, never moves */}
            <div className="testi__says-wrap">
              <span className="testi__says">SAYS</span>
              <span className="testi__about">ABOUT MAKEWAYS</span>
            </div>

            {/* Quote — animates out/in */}
            <p className={`testi__quote ${visible ? 'testi__quote--in' : 'testi__quote--out'}`}>
              {t.quote}
            </p>

            {/* Dot navigation */}
            <div className="testi__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testi__dot ${i === current ? 'testi__dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT IMAGE ───────────────────────────────────────────── */}
          <div className="testi__right">
            <div className={`testi__img-wrap ${visible ? 'testi__img-wrap--in' : 'testi__img-wrap--out'}`}>
              <img
                src={t.image}
                alt={t.name}
                className="testi__img"
                onError={e => {
                  // Show placeholder silhouette if image missing
                  (e.target as HTMLImageElement).style.opacity = '0.15';
                }}
              />
            </div>

            {/* Orange play arrow — fixed on right edge */}
            <button className="testi__play" onClick={next} aria-label="Next testimonial">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" stroke="none">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </button>
          </div>

        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&display=swap');

        /* ── SECTION ────────────────────────────────────────────────────── */
        .testi {
          background: #c8c8c8;
          width: 100%;
          overflow: hidden;
          font-family: 'Eurostile', 'Barlow', -apple-system, sans-serif;
        }

        .testi__inner {
          display: flex;
          align-items: stretch;
          min-height: 420px;
          max-width: 100%;
          position: relative;
        }

        /* ── LEFT ───────────────────────────────────────────────────────── */
        .testi__left {
          flex: 1;
          padding: 48px 40px 40px 60px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 0;
          position: relative;
          z-index: 2;
        }

        /* Name */
        .testi__meta {
          margin-bottom: 8px;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .testi__meta--in  { opacity: 1; transform: translateY(0); }
        .testi__meta--out { opacity: 0; transform: translateY(-8px); }

        .testi__name {
          font-family: 'Eurostile', 'Barlow', sans-serif;
          font-size: clamp(18px, 2.6vw, 30px);
          font-weight: 700;
          color: #6b6b6b;
          letter-spacing: 1px;
          text-transform: uppercase;
          line-height: 1.1;
          margin: 0;
        }

        .testi__role {
          font-family: 'Eurostile', 'Barlow', sans-serif;
          font-size: clamp(9px, 1.1vw, 13px);
          font-weight: 700;
          color: #5a5a5a;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 4px 0 0 0;
        }

        /* SAYS block — never animates */
        .testi__says-wrap {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
          line-height: 1;
        }

        .testi__says {
          font-family: 'Eurostile', 'Barlow', sans-serif;
          font-size: clamp(72px, 12vw, 140px);
          font-weight: 900;
          color: #F5A623;
          letter-spacing: -2px;
          line-height: 0.88;
          text-transform: uppercase;
          display: block;
        }

        .testi__about {
          font-family: 'Eurostile', 'Barlow', sans-serif;
          font-size: clamp(8px, 1vw, 11px);
          font-weight: 700;
          color: #7a7a7a;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top: 6px;
          padding-left: 4px;
          display: block;
        }

        /* Quote */
        .testi__quote {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(13px, 1.5vw, 18px);
          color: #3a3a3a;
          line-height: 1.55;
          max-width: 520px;
          margin: 0 0 28px 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          transition-delay: 0.05s;
        }
        .testi__quote--in  { opacity: 1; transform: translateY(0); }
        .testi__quote--out { opacity: 0; transform: translateY(8px); }

        /* Dots */
        .testi__dots {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: auto;
        }

        .testi__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #8a8a8a;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s, transform 0.2s;
        }

        .testi__dot--active {
          background: #2a2a2a;
          transform: scale(1.2);
        }

        .testi__dot:hover:not(.testi__dot--active) {
          background: #555;
        }

        /* ── RIGHT ──────────────────────────────────────────────────────── */
        .testi__right {
          position: relative;
          width: clamp(260px, 38%, 480px);
          flex-shrink: 0;
          display: flex;
          align-items: flex-end;
          overflow: visible;
        }

        .testi__img-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          transition: opacity 0.3s ease;
        }
        .testi__img-wrap--in  { opacity: 1; }
        .testi__img-wrap--out { opacity: 0; }

        .testi__img {
          width: 100%;
          max-height: 420px;
          object-fit: contain;
          object-position: bottom center;
          display: block;
          filter: grayscale(100%);
        }

        /* Orange play arrow on right edge */
        .testi__play {
          position: absolute;
          right: -24px;
          top: 50%;
          transform: translateY(-50%);
          background: #F5A623;
          border: none;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          clip-path: polygon(0 0, 100% 50%, 0 100%);
          padding-left: 6px;
          transition: background 0.2s;
        }
        .testi__play:hover { background: #e07b00; }

        /* ── MOBILE ─────────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          .testi__inner {
            flex-direction: column;
            min-height: unset;
          }

          .testi__left {
            padding: 36px 24px 24px 24px;
            order: 2;
          }

          .testi__right {
            width: 100%;
            order: 1;
            height: 280px;
            justify-content: center;
          }

          .testi__img {
            max-height: 280px;
            width: auto;
            max-width: 60%;
            margin: 0 auto;
          }

          .testi__play {
            right: 0;
            top: 50%;
          }

          .testi__says {
            font-size: clamp(56px, 18vw, 90px);
          }

          .testi__name {
            font-size: clamp(16px, 4vw, 24px);
          }
        }

        @media (max-width: 480px) {
          .testi__left {
            padding: 28px 20px 28px 20px;
          }

          .testi__right {
            height: 220px;
          }

          .testi__img {
            max-height: 220px;
            max-width: 70%;
          }

          .testi__play {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </>
  );
}