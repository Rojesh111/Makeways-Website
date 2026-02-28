"use client";

import React, { useState } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
interface Testimonial {
  id   : number;
  name : string;
  role : string;
  quote: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id   : 1,
    name : 'NIRVANA CHAUDHARY',
    role : 'MD - CHAUDHARY GROUP',
    quote: 'Our association with Makeways goes beyond a typical client - agency relationship. Their strategic thinking and creativity make them one of the finest agencies in Nepal and my first choice.',  
    image: '/images/testimonial/NIRVANACHAUDHARY.png',
  },
  {
    id   : 2,
    name : 'HIMANSHU GOLCHA',
    role : 'EXECUTIVE DIRECTOR - HULAS STEEL',
    quote: 'Our experience working with Makeways has been extremely rewarding. What I appreciate about Makeways is their ability to combine creativity with results-driven campaigns.',
    image: '/images/testimonial/HIMANSHUGOLCHA.png',
  },
  {
    id   : 3,
    name : 'MALVIKA SUBBA',
    role : 'MISS NEPAL / MEDIA PERSON',
    quote: 'Working with Makeways has been a smooth and collaborative experience. They are attentive to detail, responsive to feedback, and committed to delivering top-notch event solutions.',
    image: '/images/testimonial/MalvikaSubba.png',
  },
  {
    id   : 4,
    name : 'BHUSAN DAHAL',
    role : 'MEDIA LEADER',
    quote: 'What I admire about Makeways is their storytelling approach. Their campaigns are not just visually appealing but also culturally relevant and emotionally engaging.',
    image: '/images/testimonial/BHUSANDAHAL.png',
  },
  {
    id   : 5,
    name : 'SUDIP THAPA',
    role : 'PRESIDENT - ADVERTISING ASSOCIATION OF NEPAL',
    quote: "Over the years, I have observed many campaigns from Makeways that have contributed positively to Nepal's advertising standards. Their work is thoughtful, well-executed, and impactful.",
    image: '/images/testimonial/SUDIPTHAPA.png',
  },
  {
    id   : 6,
    name : 'IRAJ SHRESTHA',
    role : 'SALES & MARKETING HEAD - GOLDSTAR SHOES',
    quote: 'Makeways stands out because they approach branding with clarity and purpose. Their ideas are not only creative but also aligned with long-term brand positioning.',
    image: '/images/testimonial/IRAJSHRESTHA.png',
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [fading,  setFading]  = useState(false);

  const goTo = (index: number) => {
    if (fading || index === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 280);
  };

  const prev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((current + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section className="tst-section">

      {/* ══════════════════ DESKTOP ══════════════════ */}
      <div className={`tst-desktop${fading ? " tst-fade-out" : ""}`}>

        {/* Left: text content */}
        <div className="tst-left">
          <h2 className="tst-name">{t.name}</h2>
          <p  className="tst-role">{t.role}</p>
          <div className="tst-says">SAYS</div>
          <div className="tst-about">ABOUT MAKEWAYS</div>

          <div className="tst-quote-block">
            <span className="tst-qq tst-qq--open">&#8220;</span>
            <p className="tst-quote-text">{t.quote}</p>
            <span className="tst-qq tst-qq--close">&#8221;</span>
          </div>
        </div>

        {/* Right: ALL images in DOM, only active is visible — no load delay */}
        <div className="tst-right">
          <div className="tst-img-stack">
            {TESTIMONIALS.map((item, i) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                className={`tst-img${i === current ? " tst-img--active" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button className="tst-arrow" onClick={prev} aria-label="Previous">&#8249;</button>
        <button className="tst-arrow" onClick={next} aria-label="Next">&#8250;</button>

        {/* Indicator dots */}
        <div className="tst-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`tst-dot${i === current ? " tst-dot--active" : ""}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════ MOBILE ══════════════════ */}
      <div className={`tst-mobile${fading ? " tst-fade-out" : ""}`}>
        <h2 className="tst-name">{t.name}</h2>
        <p  className="tst-role">{t.role}</p>
        <div className="tst-says">SAYS</div>
        <div className="tst-about">ABOUT MAKEWAYS</div>

        {/* Image with arrows on left/right sides */}
        <div className="tst-img-row">
          <button className="tst-arrow" onClick={prev} aria-label="Previous">&#8249;</button>
          <div className="tst-img-stack tst-img-stack--mobile">
            {TESTIMONIALS.map((item, i) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                className={`tst-img${i === current ? " tst-img--active" : ""}`}
              />
            ))}
          </div>
          <button className="tst-arrow" onClick={next} aria-label="Next">&#8250;</button>
        </div>

        <div className="tst-quote-block">
          <span className="tst-qq tst-qq--open">&#8220;</span>
          <p className="tst-quote-text">{t.quote}</p>
          <span className="tst-qq tst-qq--close">&#8221;</span>
        </div>

        <div className="tst-dots tst-dots--mobile">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`tst-dot${i === current ? " tst-dot--active" : ""}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════ ALL CSS ══════════════════ */}
      <style>{`

        /* Section wrapper */
        .tst-section {
          font-family: 'Eurostile', 'EurostileExt';
          background: #D4D4D0;
          width: 100%;
          overflow: hidden;
        }

        /* Fade-out applied to text wrapper only */
        .tst-fade-out {
          opacity: 0;
          pointer-events: none;
        }


        /* ─────────────────────────────
           DESKTOP LAYOUT
        ───────────────────────────── */

        .tst-desktop {
          display: none;                     /* hidden until ≥768px */
          position: relative;
          width: 100%;
          height: calc(100vh - 90px);        /* fills screen minus header */
          max-height: 820px;
          align-items: stretch;
          transition: opacity 0.28s ease;
        }

        /* Left column */
        .tst-left {
          flex: 0 0 52%;
          max-width: 53%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 40px 0px 10%;
          box-sizing: border-box;
        }

        /* Right column */
        .tst-right {
          flex: 0 0 48%;
          max-width: 48%;
          position: relative;
          overflow: hidden;
        }

        /* Person name */
        .tst-name {
          color: #F7941D;
          font-size: clamp(26px, 2.6vw, 50px);
          font-weight: 800;
          margin: 0;
          letter-spacing: 0.05em;
          line-height: 1.1;
          text-transform: uppercase;
        }

        /* Person role / title */
        .tst-role {
          color: #2b2b2b;
          font-size: clamp(15px, 1.5vw, 22px);
          font-weight: 1000;
          margin: 6px 0 0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Giant SAYS */
        .tst-says {
          color: #F7941D;
          font-size: clamp(100px, 50vw, 300px);
          font-weight: 500;
          line-height: 0.82;
          margin: 8px 0 0 -4px;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        /* ABOUT MAKEWAYS sub-heading */
        .tst-about {
          color: #1e1e1e;
          font-size: clamp(15px, 1.5vw, 22px);
          font-weight: 1000;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 10px;
        }

        /* Quote block */
        .tst-quote-block {
          margin-top: 26px;
          position: relative;
        }

        /* Decorative quotation marks */
        .tst-qq {
          font-family: Eurostile, 'Eurostile Bold', 'EurostileExt';
          font-size: clamp(46px, 5vw, 78px);
          color: #b2b2b2;
          line-height: 0.5;
          display: block;
        }
        .tst-qq--open  { margin-bottom: 6px; }
        .tst-qq--close { text-align: right; max-width: 520px; margin-top: 2px; }

        /* Quote paragraph */
        .tst-quote-text {
          color: #2b2b2b;
          font-size: clamp(13px, 1vw, 16px);
          line-height: 1.72;
          margin: 0;
          font-weight: 400;
          max-width: 520px;
        }

        /* Image stack — all images sit on top of each other */
        .tst-img-stack {
          position: absolute;
          inset: 0;
        }

        /* Every image is invisible by default */
        .tst-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          opacity: 0;
          transition: opacity 0.28s ease;
        }

        /* Only the active slide is visible */
        .tst-img--active {
          opacity: 1;
        }

        /* Prev / Next arrow buttons — match INTRO nav icon style */
        .tst-arrow {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid #F7941D;
          background: transparent;
          color: #F7941D;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.22s ease, color 0.22s ease;
          z-index: 10;
          line-height: 1;
          flex-shrink: 0;
        }
        .tst-arrow:hover {
          background: #F7941D;
          color: #fff;
        }

        /* Desktop: absolutely positioned on the sides */
        .tst-desktop .tst-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        .tst-desktop .tst-arrow[aria-label="Previous"] { left:  20px; }
        .tst-desktop .tst-arrow[aria-label="Next"]     { right: 20px; }

        /* Mobile: image flanked by arrows */
        .tst-img-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 18px;
          width: 100%;
        }

        /* Dot indicators */
        .tst-dots {
          position: absolute;
          bottom: 22px;
          left: 8%;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .tst-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #999;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }
        .tst-dot--active {
          width: 30px;
          border-radius: 5px;
          background: #F7941D;
        }


        /* ─────────────────────────────
           MOBILE LAYOUT
        ───────────────────────────── */

        .tst-mobile {
          display: flex;
          flex-direction: column;
          padding: 36px 24px 44px;
          box-sizing: border-box;
          transition: opacity 0.28s ease;
        }

        .tst-mobile .tst-name {
          font-size: clamp(22px, 6vw, 30px);
        }
        .tst-mobile .tst-role {
          font-size: clamp(10px, 2.6vw, 13px);
        }
        .tst-mobile .tst-says {
          font-size: clamp(70px, 21vw, 110px);
        }
        .tst-mobile .tst-about {
          font-size: clamp(12px, 3.2vw, 17px);
          margin-top: 6px;
        }

        /* Mobile image stack is sized like a box (not full-bleed) */
        .tst-img-stack--mobile {
          position: relative;
          width: 62%;
          max-width: 260px;
          aspect-ratio: 3 / 4;
          margin: 18px auto 0;
          overflow: hidden;
        }

        .tst-mobile .tst-quote-block {
          margin-top: 20px;
        }
        .tst-mobile .tst-qq {
          font-size: 50px;
        }
        .tst-mobile .tst-quote-text {
          font-size: clamp(13px, 3.8vw, 16px);
          max-width: 100%;
          text-align: justify;
        }
        .tst-mobile .tst-qq--close {
          max-width: 100%;
        }

        /* Dots on mobile: centred, not absolutely positioned */
        .tst-dots--mobile {
          position: static;
          justify-content: center;
          margin-top: 22px;
        }


        /* ─────────────────────────────
           BREAKPOINT SWITCH
        ───────────────────────────── */

        @media (min-width: 768px) {
          .tst-desktop { display: flex; }
          .tst-mobile  { display: none;  }
        }

      `}</style>
    </section>
  );
}