"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const DATA: Testimonial[] = [
  {
    id: 1,
    name: "NIRVANA CHAUDHARY",
    role: "MD - CHAUDHARY GROUP",
    quote: "Our association with Makeways goes beyond a typical client - agency relationship. Their strategic thinking and creativity make them one of the finest agencies in Nepal and my first choice.",
    image: "/images/testimonial/NIRVANACHAUDHARY.png",
  },
  {
    id: 2,
    name: "HIMANSHU GOLCHA",
    role: "EXECUTIVE DIRECTOR - HULAS STEEL",
    quote: "Our experience working with Makeways has been extremely rewarding. What I appreciate about Makeways is their ability to combine creativity with results-driven campaigns.",
    image: "/images/testimonial/HIMANSHUGOLCHA.png",
  },
  {
    id: 3,
    name: "MALVIKA SUBBA",
    role: "MISS NEPAL / MEDIA PERSON",
    quote: "Working with Makeways has been a smooth and collaborative experience. They are attentive to detail, responsive to feedback, and committed to delivering top-notch event solutions.",
    image: "/images/testimonial/MalvikaSubba.png",
  },
  {
    id: 4,
    name: "BHUSAN DAHAL",
    role: "MEDIA LEADER",
    quote: "What I admire about Makeways is their storytelling approach. Their campaigns are not just visually appealing but also culturally relevant and emotionally engaging.",
    image: "/images/testimonial/BHUSANDAHAL.png",
  },
  {
    id: 5,
    name: "SUDIP THAPA",
    role: "PRESIDENT - ADVERTISING ASSOCIATION OF NEPAL",
    quote: "Over the years, I have observed many campaigns from Makeways that have contributed positively to Nepal's advertising standards. Their work is thoughtful, well-executed, and impactful.",
    image: "/images/testimonial/SUDIPTHAPA.png",
  },
  {
    id: 6,
    name: "IRAJ SHRESTHA",
    role: "SALES & MARKETING HEAD - GOLDSTAR SHOES",
    quote: "Makeways stands out because they approach branding with clarity and purpose. Their ideas are not only creative but also aligned with long-term brand positioning.",
    image: "/images/testimonial/IRAJSHRESTHA.png",
  },
];

const OUT_MS = 260;
const IN_MS  = 500;

/* ─────────────────────────────────────────────────────────────────
   SVG QUOTE MARK — reused in both desktop and mobile
   Identical path to AboutMakeways, consistent system-wide
───────────────────────────────────────────────────────────────── */
function QuoteMark() {
  return (
    <svg
      width="32" height="22"
      viewBox="0 0 40 28"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M0 28V16.8C0 7.84 5.6 2.24 16.8 0L18 3.92C13.2 5.04 10.4 7.84 9.6 12.32H16.8V28H0ZM23.2 28V16.8C23.2 7.84 28.8 2.24 40 0L41.2 3.92C36.4 5.04 33.6 7.84 32.8 12.32H40V28H23.2Z"
        fill="#f47c20"
        fillOpacity="0.22"
      />
    </svg>
  );
}

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

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

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
  const t = DATA[idx];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   prev();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, phase]);

  const animClass = phase === "out" ? "out" : phase === "in" ? "snap" : "idle";

  return (
    <>
      <style>{`

        /*
          NO @font-face here — fonts declared once in globals.css.
          Font-weight 700 = bold, 400 = regular. No synthetic 900.

          Font family roles:
            'EurostileExt'  — large display title (SAYS)
            'EurostileCnd'  — role / overline labels
            'Eurostile'     — name, quote body
        */

        /* ════════════════════════════════════════════════════
           SECTION SHELL
        ════════════════════════════════════════════════════ */
        .tst-section {
          font-family : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          background  : #D4D4D0;
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
          width           : 44px;
          height          : 44px;
          border-radius   : 50%;
          border          : 1.5px solid #f47c20;
          background      : transparent;
          color           : #f47c20;
          font-size       : 26px;
          display         : flex;
          align-items     : center;
          justify-content : center;
          cursor          : pointer;
          padding         : 0 0 2px 0;
          outline         : none;
          font-family     : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
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
          background : #f47c20;
          color      : #ffffff;
          transform  : translateY(-50%) scale(1.08);
          box-shadow : 0 4px 16px rgba(244,124,32,0.28);
        }
        .tst-edge-arrow:active       { transform: translateY(-50%) scale(0.94); box-shadow: none; }
        .tst-edge-arrow:focus-visible { outline: 2px solid #f47c20; outline-offset: 3px; }

        /* ════════════════════════════════════════════════════
           DESKTOP LAYOUT  (≥ 768px)
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
          background-color : #D4D4D0;
        }

        /* ════════════════════════════════════════════════════
           PHOTO STACK
        ════════════════════════════════════════════════════ */
        .tst-photo-stack { position: relative; width: 100%; height: 100%; }
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
        .tst-photo--active { opacity: 1; z-index: 1; }

        /* ════════════════════════════════════════════════════
           ANIMATION PHASES
        ════════════════════════════════════════════════════ */
        .tst-animate--out {
          opacity   : 0;
          transform : translateY(-10px);
          transition:
            opacity   ${OUT_MS}ms ease,
            transform ${OUT_MS}ms ease;
        }
        .tst-animate--snap {
          opacity   : 0;
          transform : translateY(16px);
          transition: none;
        }
        .tst-animate--in {
          opacity   : 1;
          transform : translateY(0);
          transition:
            opacity   ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms),
            transform ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms);
        }
        .tst-animate--idle {
          opacity   : 1;
          transform : translateY(0);
          transition:
            opacity   ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms),
            transform ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms);
        }

        /* ════════════════════════════════════════════════════
           TEXT STYLES

           .tst-name       → Eurostile Bold 700 · orange · prominent
           .tst-role       → EurostileCnd Bold 700 · dark · overline label
           .tst-says       → EurostileExt Bold 700 · large display
           .tst-about      → EurostileCnd Bold 700 · dark · overline label
           .tst-quote-text → Eurostile Regular 400 · #666666 body
        ════════════════════════════════════════════════════ */

        /* Eurostile Bold — name, orange */
        .tst-name {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : clamp(20px, 2.2vw, 38px);
          line-height    : 1.1;
          letter-spacing : 0.06em;
          text-transform : uppercase;
          color          : #f47c20;
          margin         : 0;
        }

        /* FIX 3 — EurostileCnd Bold for role, tight condensed overline */
        .tst-role {
          font-family    : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : clamp(10px, 0.85vw, 13px);
          line-height    : 1.5;
          letter-spacing : 0.1em;
          text-transform : uppercase;
          color          : #1a1a1a;
          margin         : 6px 0 0;
        }

        /* EurostileExt Bold — SAYS display title */
        .tst-says {
          font-family    : 'EurostileExt', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : clamp(100px, 14vw, 280px);
          line-height    : 0.85;
          letter-spacing : 0.04em;
          text-transform : uppercase;
          color          : #f47c20;
          user-select    : none;
          margin         : 6px 0 0 0;
        }

        /* EurostileCnd Bold — ABOUT MAKEWAYS label */
        .tst-about {
          font-family    : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : clamp(10px, 0.85vw, 13px);
          line-height    : 1.5;
          letter-spacing : 0.1em;
          text-transform : uppercase;
          color          : #1a1a1a;
          margin-top     : 4px;
        }

        /* ════════════════════════════════════════════════════
           QUOTE BLOCK
        ════════════════════════════════════════════════════ */
        .tst-quote-wrap {
          margin-top : clamp(20px, 2.5vw, 32px);
          max-width  : 520px;
        }

        /* Quote mark + text side by side */
        .tst-quote-body {
          display     : flex;
          gap         : clamp(10px, 1.2vw, 16px);
          align-items : flex-start;
        }

        /* FIX 2 — quote text #666666, matching AboutMakeways .about__body */
        .tst-quote-text {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 400;
          font-size      : clamp(14px, 1.05vw, 16px);
          line-height    : 1.75;
          letter-spacing : 0.01em;
          color          : #666666;
          margin         : 0;
        }

        /* ════════════════════════════════════════════════════
           DOTS
        ════════════════════════════════════════════════════ */
        .tst-controls {
          display     : flex;
          align-items : center;
          margin-top  : clamp(20px, 2.5vw, 32px);
        }
        .tst-dots {
          display     : flex;
          align-items : center;
          gap         : 8px;
        }
        .tst-dot {
          height        : 8px;
          border-radius : 99px;
          background    : rgba(26,26,26,0.2);
          border        : none;
          cursor        : pointer;
          padding       : 0;
          outline       : none;
          flex-shrink   : 0;
          transition    : all 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
          width         : 8px;
        }
        .tst-dot--active                     { width: 26px; background: #f47c20; }
        .tst-dot:not(.tst-dot--active):hover { background: rgba(26,26,26,0.35); }
        .tst-dot:focus-visible               { outline: 2px solid #f47c20; outline-offset: 2px; }

        /* ════════════════════════════════════════════════════
           MOBILE LAYOUT  (< 768px)
        ════════════════════════════════════════════════════ */
        .tst-mobile {
          display        : flex;
          flex-direction : column;
          padding        : clamp(32px, 8vw, 48px) clamp(20px, 6vw, 40px) clamp(48px, 10vw, 64px);
        }

        .tst-mobile .tst-name  { font-size: clamp(18px, 5.5vw, 26px); }
        .tst-mobile .tst-role  { font-size: clamp(9px, 2.3vw, 12px); }
        .tst-mobile .tst-says  { font-size: clamp(64px, 20vw, 110px); }
        .tst-mobile .tst-about { font-size: clamp(9px, 2.3vw, 12px); }

        .tst-mobile-img-wrap {
          position         : relative;
          width            : 100%;
          aspect-ratio     : 3 / 4;
          overflow         : hidden;
          margin-top       : clamp(16px, 4vw, 24px);
          background-color : #D4D4D0;
        }

        .tst-mobile .tst-quote-wrap { margin-top: clamp(16px, 4vw, 24px); }
        .tst-mobile .tst-quote-text { font-size: clamp(13px, 3.6vw, 16px); }

        .tst-mobile-nav {
          display         : flex;
          align-items     : center;
          justify-content : center;
          gap             : clamp(12px, 3vw, 20px);
          margin-top      : clamp(20px, 5vw, 32px);
        }
        .tst-mobile-arrow {
          width           : 38px;
          height          : 38px;
          border-radius   : 50%;
          border          : 1.5px solid #f47c20;
          background      : transparent;
          color           : #f47c20;
          font-size       : 22px;
          display         : flex;
          align-items     : center;
          justify-content : center;
          cursor          : pointer;
          padding         : 0 0 2px 0;
          outline         : none;
          font-family     : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          flex-shrink     : 0;
          transition      :
            background 0.2s ease,
            color      0.2s ease,
            transform  0.15s ease;
        }
        .tst-mobile-arrow:hover        { background: #f47c20; color: #ffffff; transform: scale(1.08); }
        .tst-mobile-arrow:active       { transform: scale(0.93); }
        .tst-mobile-arrow:focus-visible { outline: 2px solid #f47c20; outline-offset: 3px; }

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

            <div className="tst-says"  aria-hidden="true">SAYS</div>
            <div className="tst-about">ABOUT MAKEWAYS</div>

            {/* FIX 1 — SVG quote mark replaces &ldquo; / &rdquo; */}
            <div
              className={`tst-quote-wrap tst-animate--${animClass}`}
              style={{ "--tst-delay": "65ms" } as React.CSSProperties}
            >
              <div className="tst-quote-body">
                <QuoteMark />
                <p className="tst-quote-text">{t.quote}</p>
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

          <div className="tst-says"  aria-hidden="true">SAYS</div>
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

          {/* FIX 1 — SVG quote mark on mobile too */}
          <div
            className={`tst-quote-wrap tst-animate--${animClass}`}
            style={{ "--tst-delay": "65ms" } as React.CSSProperties}
          >
            <div className="tst-quote-body">
              <QuoteMark />
              <p className="tst-quote-text">{t.quote}</p>
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