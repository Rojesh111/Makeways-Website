"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
interface Testimonial {
  id    : number;
  name  : string;
  role  : string;
  quote : string;
  image : string;
}

const DATA: Testimonial[] = [
  {
    id   : 1,
    name : "NIRVANA CHAUDHARY",
    role : "MD - CHAUDHARY GROUP",
    quote: "Our association with Makeways goes beyond a typical client - agency relationship. Their strategic thinking and creativity make them one of the finest agencies in Nepal and my first choice.",
    image: "/images/testimonial/NIRVANACHAUDHARY.png",
  },
  {
    id   : 2,
    name : "HIMANSHU GOLCHA",
    role : "EXECUTIVE DIRECTOR - HULAS STEEL",
    quote: "Our experience working with Makeways has been extremely rewarding. What I appreciate about Makeways is their ability to combine creativity with results-driven campaigns.",
    image: "/images/testimonial/HIMANSHUGOLCHA.png",
  },
  {
    id   : 3,
    name : "MALVIKA SUBBA",
    role : "MISS NEPAL / MEDIA PERSON",
    quote: "Working with Makeways has been a smooth and collaborative experience. They are attentive to detail, responsive to feedback, and committed to delivering top-notch event solutions.",
    image: "/images/testimonial/MalvikaSubba.png",
  },
  {
    id   : 4,
    name : "BHUSAN DAHAL",
    role : "MEDIA LEADER",
    quote: "What I admire about Makeways is their storytelling approach. Their campaigns are not just visually appealing but also culturally relevant and emotionally engaging.",
    image: "/images/testimonial/BHUSANDAHAL.png",
  },
  {
    id   : 5,
    name : "SUDIP THAPA",
    role : "PRESIDENT - ADVERTISING ASSOCIATION OF NEPAL",
    quote: "Over the years, I have observed many campaigns from Makeways that have contributed positively to Nepal's advertising standards. Their work is thoughtful, well-executed, and impactful.",
    image: "/images/testimonial/SUDIPTHAPA.png",
  },
  {
    id   : 6,
    name : "IRAJ SHRESTHA",
    role : "SALES & MARKETING HEAD - GOLDSTAR SHOES",
    quote: "Makeways stands out because they approach branding with clarity and purpose. Their ideas are not only creative but also aligned with long-term brand positioning.",
    image: "/images/testimonial/IRAJSHRESTHA.png",
  },
];

const OUT_MS = 260;
const IN_MS  = 500;

/* ─────────────────────────────────────────────────────────────────
   EDGE ARROW
───────────────────────────────────────────────────────────────── */
function EdgeArrow({ onClick, dir }: { onClick: () => void; dir: "prev" | "next" }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className={`tst-edge-arrow tst-edge-arrow--${dir}${hov ? " tst-edge-arrow--hov" : ""}`}
    >
      {dir === "prev" ? "‹" : "›"}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const [idx,   setIdx]   = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");

  const pending = useRef<number>(0);
  const timers  = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const goTo = useCallback(
    (to: number) => {
      if (phase !== "idle" || to === idx) return;
      pending.current = to;
      clearTimers();
      setPhase("out");
      timers.current.push(
        setTimeout(() => {
          setIdx(pending.current);
          setPhase("in");
          timers.current.push(setTimeout(() => setPhase("idle"), IN_MS));
        }, OUT_MS)
      );
    },
    [idx, phase]
  );

  useEffect(() => () => clearTimers(), []);

  const prev = () => goTo((idx - 1 + DATA.length) % DATA.length);
  const next = () => goTo((idx + 1) % DATA.length);
  const t    = DATA[idx];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   prev();
      if (e.key === "ArrowRight" || e.key === "ArrowDown")  next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, phase]);

  const animClass = phase === "out" ? "out" : phase === "in" ? "snap" : "idle";

  return (
    <>
      <style>{`

        /* ════════════════════════════════════════════════════
           @font-face — Eurostile loaded directly
           Adjust paths if your fonts folder is elsewhere.
           Using EurostileExt-Normal for regular weight and
           EurostileExt-Bold for bold/black weights.
        ════════════════════════════════════════════════════ */
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileExt-Normal_Regular.ttf') format('truetype');
          font-weight : 400;
          font-style  : normal;
          font-display: swap;
        }
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileExt-Bold_Regular.ttf') format('truetype');
          font-weight : 700;
          font-style  : normal;
          font-display: swap;
        }
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileTBold.ttf') format('truetype');
          font-weight : 900;
          font-style  : normal;
          font-display: swap;
        }

        /* ════════════════════════════════════════════════════
           SECTION SHELL
        ════════════════════════════════════════════════════ */
        .tst-section {
          font-family : 'Eurostile', var(--font-primary);
          background  : var(--mw-bg-grey);
          width       : 100%;
          overflow    : hidden;
          position    : relative;
        }

        /* ════════════════════════════════════════════════════
           EDGE ARROWS
        ════════════════════════════════════════════════════ */
        .tst-edge-arrow {
          position        : absolute;
          top             : 50%;
          transform       : translateY(-50%);
          z-index         : 10;
          width           : 48px;
          height          : 48px;
          border-radius   : 50%;
          border          : 2px solid var(--mw-orange);
          background      : transparent;
          color           : var(--mw-orange);
          font-size       : 28px;
          display         : flex;
          align-items     : center;
          justify-content : center;
          cursor          : pointer;
          padding         : 0 0 2px 0;
          outline         : none;
          font-family     : 'Eurostile', var(--font-primary);
          transition      :
            background 0.2s ease,
            color      0.2s ease,
            transform  0.15s ease,
            box-shadow 0.2s ease;
        }
        .tst-edge-arrow--prev { left  : clamp(12px, 2vw, 30px); }
        .tst-edge-arrow--next { right : clamp(12px, 2vw, 30px); }
        .tst-edge-arrow--hov,
        .tst-edge-arrow:hover {
          background : var(--mw-orange);
          color      : var(--mw-white);
          transform  : translateY(-50%) scale(1.1);
          box-shadow : var(--shadow-orange);
        }
        .tst-edge-arrow:active {
          transform  : translateY(-50%) scale(0.94);
          box-shadow : none;
        }
        .tst-edge-arrow:focus-visible {
          outline        : 2px solid var(--mw-orange);
          outline-offset : 3px;
        }

        /* ════════════════════════════════════════════════════
           DESKTOP LAYOUT  (≥ 768 px)
        ════════════════════════════════════════════════════ */
        .tst-desktop {
          display    : none;
          position   : relative;
          width      : 100%;
          height     : calc(100vh - 90px);
          max-height : 820px;
          min-height : 500px;
        }

        .tst-left {
          position        : absolute;
          inset           : 0 47% 0 10%;
          display         : flex;
          flex-direction  : column;
          justify-content : center;
          padding         : 0 clamp(24px, 3vw, 48px) 0 clamp(72px, 9%, 112px);
          z-index         : 2;
        }

        .tst-right {
          position         : absolute;
          inset            : 0 0 0 53%;
          overflow         : hidden;
          background-color : var(--mw-bg-grey);
        }

        /* ════════════════════════════════════════════════════
           PHOTO STACK
        ════════════════════════════════════════════════════ */
        .tst-photo-stack {
          position : relative;
          width    : 100%;
          height   : 100%;
        }
        .tst-photo {
          position        : absolute;
          inset           : 0;
          width           : 100%;
          height          : 100%;
          object-fit      : contain;
          object-position : bottom center;
          opacity         : 0;
          transition      : opacity 0.55s ease;
          z-index         : 0;
        }
        .tst-photo--active {
          opacity : 1;
          z-index : 1;
        }

        /* ════════════════════════════════════════════════════
           ANIMATION PHASES
        ════════════════════════════════════════════════════ */
        .tst-animate--out {
          opacity    : 0;
          transform  : translateY(-10px);
          transition :
            opacity   ${OUT_MS}ms ease,
            transform ${OUT_MS}ms ease;
        }
        .tst-animate--snap {
          opacity    : 0;
          transform  : translateY(16px);
          transition : none;
        }
        .tst-animate--in {
          opacity    : 1;
          transform  : translateY(0);
          transition :
            opacity   ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms),
            transform ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms);
        }
        .tst-animate--idle {
          opacity    : 1;
          transform  : translateY(0);
          transition :
            opacity   ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms),
            transform ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms);
        }

        /* ════════════════════════════════════════════════════
           TEXT — all Eurostile, no Georgia anywhere
        ════════════════════════════════════════════════════ */
        .tst-name {
          font-family    : 'Eurostile', var(--font-primary);
          font-weight    : 900;
          font-size      : clamp(22px, 2.5vw, 46px);
          line-height    : 1.1;
          letter-spacing : var(--ls-display);
          text-transform : uppercase;
          color          : var(--mw-orange);
          margin         : 0;
        }
        .tst-role {
          font-family    : 'Eurostile', var(--font-primary);
          font-weight    : 700;
          font-size      : clamp(10px, 0.95vw, 15px);
          line-height    : 1.4;
          letter-spacing : var(--ls-label);
          text-transform : uppercase;
          color          : var(--mw-dark);
          margin         : var(--space-1) 0 0;
        }

        /* SAYS — fixed */
        .tst-says {
          font-family    : 'Eurostile', var(--font-primary);
          font-weight    : 900;
          font-size      : clamp(130px, 17vw, 350px);
          line-height    : 0.83;
          letter-spacing : 25px;
          text-transform : uppercase;
          color          : var(--mw-orange);
          user-select    : none;
          margin : 4px 0 0 30px;
        }

        /* ABOUT MAKEWAYS — fixed */
        .tst-about {
          font-family    : 'Eurostile', var(--font-primary);
          font-weight    : 700;
          font-size      : clamp(10px, 0.95vw, 15px);
          line-height    : 1.4;
          letter-spacing : var(--ls-label);
          text-transform : uppercase;
          color          : var(--mw-dark);
          margin-top     : var(--space-2);
        }

        /* ════════════════════════════════════════════════════
           QUOTE BLOCK — matches mockup exactly
           Opening " floats LEFT beside text,
           closing " sits bottom-right under text block
        ════════════════════════════════════════════════════ */
        .tst-quote-wrap {
          margin-top : var(--space-6);
          max-width  : 520px;
        }

        /* Outer row: " on left, text+close on right */
        .tst-quote-body {
          display   : flex;
          gap       : clamp(8px, 1vw, 14px);
          align-items: flex-start;
        }

        /* Opening " — large, sits to the left */
        .tst-qq-open {
          font-family    : 'Eurostile', var(--font-primary);
          font-weight    : 900;
          font-size      : clamp(44px, 4.5vw, 80px);
          line-height    : 1;
          color          : var(--mw-grey-4);
          flex-shrink    : 0;
          margin-top     : -4px;
          letter-spacing : -2px;
          user-select    : none;
        }

        /* Right side: text + closing " stacked */
        .tst-quote-right {
          display        : flex;
          flex-direction : column;
          flex           : 1;
        }

        .tst-quote-text {
          font-family    : 'Eurostile', var(--font-primary);
          font-weight    : 400;
          font-size      : clamp(14px, 1.1vw, 17px);
          line-height    : 1.75;
          letter-spacing : 0.01em;
          color          : var(--mw-dark-2);
          margin         : 0;
        }

        /* Closing " — right-aligned below text */
        .tst-qq-close {
          font-family    : 'Eurostile', var(--font-primary);
          font-weight    : 900;
          font-size      : clamp(44px, 4.5vw, 80px);
          line-height    : 0.8;
          color          : var(--mw-grey-4);
          text-align     : right;
          margin-top     : 4px;
          letter-spacing : -2px;
          user-select    : none;
        }

        /* ════════════════════════════════════════════════════
           DOTS
        ════════════════════════════════════════════════════ */
        .tst-controls {
          display     : flex;
          align-items : center;
          margin-top  : var(--space-7);
        }
        .tst-dots {
          display     : flex;
          align-items : center;
          gap         : var(--space-2);
        }
        .tst-dot {
          height        : 9px;
          border-radius : var(--radius-full);
          background    : var(--mw-grey-4);
          border        : none;
          cursor        : pointer;
          padding       : 0;
          outline       : none;
          flex-shrink   : 0;
          transition    : all 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
          width         : 9px;
        }
        .tst-dot--active                     { width: 28px; background: var(--mw-orange); }
        .tst-dot:not(.tst-dot--active):hover { background: var(--mw-grey-2); }
        .tst-dot:focus-visible {
          outline        : 2px solid var(--mw-orange);
          outline-offset : 2px;
        }

        /* ════════════════════════════════════════════════════
           MOBILE LAYOUT  (< 768 px)
        ════════════════════════════════════════════════════ */
        .tst-mobile {
          display        : flex;
          flex-direction : column;
          padding        : clamp(32px, 8vw, 48px) var(--section-px) clamp(48px, 10vw, 64px);
        }

        .tst-mobile .tst-name  { font-size: clamp(20px, 6vw, 28px); letter-spacing: 4px; }
        .tst-mobile .tst-role  { font-size: clamp(9px, 2.5vw, 12px); }
        .tst-mobile .tst-says  { font-size: clamp(70px, 21.5vw, 116px); }
        .tst-mobile .tst-about { font-size: clamp(9px, 2.5vw, 12px); }

        .tst-mobile-img-wrap {
          position         : relative;
          width            : 100%;
          aspect-ratio     : 3 / 4;
          overflow         : hidden;
          margin-top       : var(--space-5);
          background-color : var(--mw-bg-grey);
        }

        .tst-mobile .tst-quote-wrap { margin-top: var(--space-5); }
        .tst-mobile .tst-qq-open    { font-size: 40px; }
        .tst-mobile .tst-qq-close   { font-size: 40px; }
        .tst-mobile .tst-quote-text { font-size: clamp(13px, 3.8vw, 16px); }

        .tst-mobile-nav {
          display         : flex;
          align-items     : center;
          justify-content : center;
          gap             : var(--space-3);
          margin-top      : var(--space-6);
        }
        .tst-mobile-arrow {
          width           : 38px;
          height          : 38px;
          border-radius   : 50%;
          border          : 2px solid var(--mw-orange);
          background      : transparent;
          color           : var(--mw-orange);
          font-size       : 22px;
          display         : flex;
          align-items     : center;
          justify-content : center;
          cursor          : pointer;
          padding         : 0 0 2px 0;
          outline         : none;
          font-family     : 'Eurostile', var(--font-primary);
          flex-shrink     : 0;
          transition      :
            background 0.2s ease,
            color      0.2s ease,
            transform  0.15s ease;
        }
        .tst-mobile-arrow:hover  { background: var(--mw-orange); color: var(--mw-white); transform: scale(1.08); }
        .tst-mobile-arrow:active { transform: scale(0.93); }
        .tst-mobile-arrow:focus-visible {
          outline        : 2px solid var(--mw-orange);
          outline-offset : 3px;
        }

        /* ════════════════════════════════════════════════════
           BREAKPOINT SWITCH
        ════════════════════════════════════════════════════ */
        @media (min-width: 768px) {
          .tst-desktop { display: block; }
          .tst-mobile  { display: none;  }
        }

        /* ════════════════════════════════════════════════════
           REDUCED MOTION
        ════════════════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .tst-animate--out,
          .tst-animate--snap,
          .tst-animate--in,
          .tst-animate--idle,
          .tst-photo,
          .tst-edge-arrow,
          .tst-mobile-arrow,
          .tst-dot {
            transition : none !important;
            animation  : none !important;
          }
          .tst-animate--out  { opacity: 0; }
          .tst-animate--snap { opacity: 0; }
          .tst-animate--in   { opacity: 1; }
          .tst-animate--idle { opacity: 1; }
        }

      `}</style>

      <section className="tst-section">

        {/* ════════════════ DESKTOP ════════════════════════ */}
        <div className="tst-desktop">

          <EdgeArrow onClick={prev} dir="prev" />
          <EdgeArrow onClick={next} dir="next" />

          <div className="tst-left">

            <div
              className={`tst-animate--${animClass}`}
              style={{ "--tst-delay": "0ms" } as React.CSSProperties}
            >
              <h2 className="tst-name">{t.name}</h2>
              <p  className="tst-role">{t.role}</p>
            </div>

            <div className="tst-says" aria-hidden="true">SAYS</div>
            <div className="tst-about">ABOUT MAKEWAYS</div>

            {/* Quote — block open mark, text, block close mark */}
            <div
              className={`tst-quote-wrap tst-animate--${animClass}`}
              style={{ "--tst-delay": "65ms" } as React.CSSProperties}
            >
              <div className="tst-quote-body">
                <span className="tst-qq-open">&ldquo;</span>
                <div className="tst-quote-right">
                  <p className="tst-quote-text">{t.quote}</p>
                  <span className="tst-qq-close">&rdquo;</span>
                </div>
              </div>
            </div>

            <div className="tst-controls">
              <div className="tst-dots">
                {DATA.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`tst-dot${i === idx ? " tst-dot--active" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="tst-right">
            <div className="tst-photo-stack">
              {DATA.map((item, i) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.name}
                  className={`tst-photo${i === idx ? " tst-photo--active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════ MOBILE ═════════════════════════ */}
        <div className="tst-mobile">

          <div
            className={`tst-animate--${animClass}`}
            style={{ "--tst-delay": "0ms" } as React.CSSProperties}
          >
            <h2 className="tst-name">{t.name}</h2>
            <p  className="tst-role">{t.role}</p>
          </div>

          <div className="tst-says" aria-hidden="true">SAYS</div>
          <div className="tst-about">ABOUT MAKEWAYS</div>

          <div className="tst-mobile-img-wrap">
            <div className="tst-photo-stack">
              {DATA.map((item, i) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.name}
                  className={`tst-photo${i === idx ? " tst-photo--active" : ""}`}
                />
              ))}
            </div>
          </div>

          <div
            className={`tst-quote-wrap tst-animate--${animClass}`}
            style={{ "--tst-delay": "65ms" } as React.CSSProperties}
          >
            <div className="tst-quote-body">
              <span className="tst-qq-open">&ldquo;</span>
              <div className="tst-quote-right">
                <p className="tst-quote-text">{t.quote}</p>
                <span className="tst-qq-close">&rdquo;</span>
              </div>
            </div>
          </div>

          <div className="tst-mobile-nav">
            <button className="tst-mobile-arrow" onClick={prev} aria-label="Previous testimonial">‹</button>
            <div className="tst-dots">
              {DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`tst-dot${i === idx ? " tst-dot--active" : ""}`}
                />
              ))}
            </div>
            <button className="tst-mobile-arrow" onClick={next} aria-label="Next testimonial">›</button>
          </div>
        </div>
      </section>
    </>
  );
}