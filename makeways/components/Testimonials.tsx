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

/* ─────────────────────────────────────────────────────────────────
   TRANSITION CONSTANTS
   OUT  = fade-out duration before content swap
   IN   = fade-in duration after content swap
───────────────────────────────────────────────────────────────── */
const OUT_MS = 260;
const IN_MS  = 500;

/* ─────────────────────────────────────────────────────────────────
   ARROW BUTTON
───────────────────────────────────────────────────────────────── */
function ArrowBtn({
  onClick,
  dir,
  size = 44,
}: {
  onClick: () => void;
  dir: "prev" | "next";
  size?: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className={`tst-arrow${hov ? " tst-arrow--hov" : ""}`}
      style={{ width: size, height: size }}
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

          timers.current.push(
            setTimeout(() => setPhase("idle"), IN_MS)
          );
        }, OUT_MS)
      );
    },
    [idx, phase]
  );

  useEffect(() => () => clearTimers(), []);

  const prev = () => goTo((idx - 1 + DATA.length) % DATA.length);
  const next = () => goTo((idx + 1) % DATA.length);
  const t    = DATA[idx];
// ── Keyboard navigation ──────────────────────────────────────
useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    // Only fire when focus is NOT inside a form element
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   prev();
    if (e.key === "ArrowRight" || e.key === "ArrowDown")  next();
  };

  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [idx, phase]); // re-bind when idx/phase change so prev/next are current
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          SCOPED CSS — uses globals.css tokens throughout
          "SAYS" and "ABOUT MAKEWAYS" have NO animation class.
          Only .tst-animate receives phase classes.
      ═════════════════════════════════════════════════════════ */}
      <style>{`

        /* ── Section shell ─────────────────────────────────── */
        .tst-section {
          font-family      : var(--font-primary);
          background       : var(--mw-bg-grey);
          width            : 100%;
          overflow         : hidden;
          position         : relative;
        }

        /* ════════════════════════════════════════════════════
           DESKTOP LAYOUT  (≥ 768 px)
        ════════════════════════════════════════════════════ */
        .tst-desktop {
          display    : none;           /* mobile-first; enabled below */
          position   : relative;
          width      : 100%;
          height     : calc(100vh - 90px);
          max-height : 820px;
          min-height : 500px;
        }

        /* ── Left text column ──────────────────────────────── */
        .tst-left {
          position        : absolute;
          inset           : 0 47% 0 0;
          display         : flex;
          flex-direction  : column;
          justify-content : center;
          padding         : 0 clamp(24px, 3vw, 48px) 0 clamp(32px, 8%, 96px);
          z-index         : 2;
        }

        /* ── Right photo column ────────────────────────────── */
        .tst-right {
          position : absolute;
          inset    : 0 0 0 53%;
          overflow : hidden;
        }

        /* ════════════════════════════════════════════════════
           PHOTO STACK — shared desktop + mobile
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
          object-fit      : cover;
          object-position : top center;
          opacity         : 0;
          transition      : opacity 0.55s ease;
          z-index         : 0;
        }

        .tst-photo--active {
          opacity : 1;
          z-index : 1;
        }

        /* ════════════════════════════════════════════════════
           ANIMATED ELEMENTS
           .tst-animate is the wrapper that receives phase.
           "SAYS" and "ABOUT MAKEWAYS" are NOT wrapped here —
           they sit outside and never receive a phase class.
        ════════════════════════════════════════════════════ */

        /* ── Phase: out (fade + lift) ── */
        .tst-animate--out {
          opacity    : 0;
          transform  : translateY(-10px);
          transition :
            opacity   ${OUT_MS}ms ease,
            transform ${OUT_MS}ms ease;
        }

        /* ── Phase: in — step 1: snap to start (no transition) ── */
        .tst-animate--snap {
          opacity    : 0;
          transform  : translateY(16px);
          transition : none;
        }

        /* ── Phase: in — step 2: animate to rest (transition applied) ── */
        .tst-animate--in {
          opacity    : 1;
          transform  : translateY(0);
          transition :
            opacity   ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms),
            transform ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms);
        }

        /* ── Phase: idle (rest state) ── */
        .tst-animate--idle {
          opacity    : 1;
          transform  : translateY(0);
          transition :
            opacity   ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms),
            transform ${IN_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) var(--tst-delay, 0ms);
        }

        /* ════════════════════════════════════════════════════
           TEXT ELEMENTS — using design-system tokens
        ════════════════════════════════════════════════════ */

        /* ── Person name ── */
        .tst-name {
          font-family    : var(--font-primary);
          font-weight    : var(--fw-black);
          font-size      : clamp(22px, 2.5vw, 46px);
          line-height    : var(--lh-tight);
          letter-spacing : var(--ls-display);
          text-transform : uppercase;
          color          : var(--mw-orange);
          margin         : 0;
        }

        /* ── Person role ── */
        .tst-role {
          font-family    : var(--font-primary);
          font-weight    : var(--fw-bold);
          font-size      : clamp(10px, 0.95vw, 15px);
          line-height    : var(--lh-snug);
          letter-spacing : var(--ls-label);
          text-transform : uppercase;
          color          : var(--mw-dark);
          margin         : var(--space-1) 0 0;
        }

        /* ── SAYS — FIXED, never animates ── */
        .tst-says {
          font-family    : var(--font-primary);
          font-weight    : var(--fw-black);
          font-size      : clamp(98px, 15.5vw, 232px);
          line-height    : 0.83;
          letter-spacing : -1px;
          text-transform : uppercase;
          color          : var(--mw-orange);
          user-select    : none;
          margin         : var(--space-1) 0 0 -3px;
          /* ⚠ NO animation, NO transition — intentionally fixed */
        }

        /* ── ABOUT MAKEWAYS — FIXED, never animates ── */
        .tst-about {
          font-family    : var(--font-primary);
          font-weight    : var(--fw-bold);
          font-size      : clamp(10px, 0.95vw, 15px);
          line-height    : var(--lh-snug);
          letter-spacing : var(--ls-label);
          text-transform : uppercase;
          color          : var(--mw-dark);
          margin-top     : var(--space-2);
          /* ⚠ NO animation, NO transition — intentionally fixed */
        }

        /* ── Quote wrapper ── */
        .tst-quote-wrap {
          margin-top : var(--space-6);
        }

        /* ── Opening quote mark ── */
        .tst-qq-open {
          display       : block;
          font-family   : Georgia, 'Times New Roman', serif;
          font-size     : clamp(40px, 3.8vw, 68px);
          font-weight   : 700;
          line-height   : 0.55;
          color         : var(--mw-grey-4);
          margin-bottom : var(--space-3);
        }

        /* ── Closing quote mark ── */
        .tst-qq-close {
          display     : block;
          font-family : Georgia, 'Times New Roman', serif;
          font-size   : clamp(40px, 3.8vw, 68px);
          font-weight : 700;
          line-height : 0.55;
          color       : var(--mw-grey-4);
          text-align  : right;
          max-width   : 500px;
          margin-top  : var(--space-2);
        }

        /* ── Quote text ── */
        .tst-quote-text {
          font-family    : var(--font-primary);
          font-weight    : var(--fw-regular);
          font-size      : clamp(12px, 0.88vw, 14.5px);
          line-height    : var(--lh-loose);
          letter-spacing : var(--ls-body);
          color          : var(--mw-dark-2);
          max-width      : 500px;
          margin         : 0;
        }

        /* ════════════════════════════════════════════════════
           CONTROLS — arrows + pill dots
        ════════════════════════════════════════════════════ */
        .tst-controls {
          display     : flex;
          align-items : center;
          gap         : var(--space-3);
          margin-top  : var(--space-7);
        }

        /* ── Arrow button ── */
        .tst-arrow {
          border-radius  : 50%;
          border         : 2px solid var(--mw-orange);
          background     : transparent;
          color          : var(--mw-orange);
          font-size      : 27px;
          display        : flex;
          align-items    : center;
          justify-content: center;
          cursor         : pointer;
          flex-shrink    : 0;
          padding        : 0 0 2px 0;
          outline        : none;
          transition     :
            background  var(--ease-default),
            color       var(--ease-default),
            transform   0.15s ease,
            box-shadow  var(--ease-default);
          font-family    : var(--font-primary);
        }
        .tst-arrow:hover,
        .tst-arrow--hov {
          background : var(--mw-orange);
          color      : var(--mw-white);
          transform  : scale(1.1);
          box-shadow : var(--shadow-orange);
        }
        .tst-arrow:active {
          transform  : scale(0.94);
          box-shadow : none;
        }
        .tst-arrow:focus-visible {
          outline        : 2px solid var(--mw-orange);
          outline-offset : 3px;
        }

        /* ── Dot indicators ── */
        .tst-dots {
          display     : flex;
          align-items : center;
          gap         : var(--space-2);
        }

        .tst-dot {
          height         : 9px;
          border-radius  : var(--radius-full);
          background     : var(--mw-grey-4);
          border         : none;
          cursor         : pointer;
          padding        : 0;
          outline        : none;
          flex-shrink    : 0;
          transition     : all 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
          width          : 9px;
        }
        .tst-dot--active {
          width      : 28px;
          background : var(--mw-orange);
        }
        .tst-dot:not(.tst-dot--active):hover {
          background : var(--mw-grey-2);
        }
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

        .tst-mobile-img-row {
          display         : flex;
          align-items     : center;
          justify-content : center;
          gap             : var(--space-3);
          margin-top      : var(--space-5);
        }

        .tst-mobile-img-wrap {
          position    : relative;
          width       : 56%;
          max-width   : 230px;
          aspect-ratio: 3 / 4;
          overflow    : hidden;
          flex-shrink : 0;
        }

        .tst-mobile .tst-quote-wrap      { margin-top: var(--space-5); }
        .tst-mobile .tst-qq-open         { font-size: 44px; }
        .tst-mobile .tst-qq-close        { font-size: 44px; max-width: 100%; }
        .tst-mobile .tst-quote-text      { font-size: clamp(12px, 3.7vw, 15px); max-width: 100%; text-align: justify; }
        .tst-mobile .tst-dots            { justify-content: center; margin-top: var(--space-6); }

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
          .tst-arrow,
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

          {/* ── LEFT COLUMN ── */}
          <div className="tst-left">

            {/* Name + Role — animated */}
            <div
              className={`tst-animate--${phase === "out" ? "out" : phase === "in" ? "snap" : "idle"}`}
              style={{ "--tst-delay": "0ms" } as React.CSSProperties}
            >
              <h2 className="tst-name">{t.name}</h2>
              <p  className="tst-role">{t.role}</p>
            </div>

            {/* ╔══════════════════════════════╗
                ║  SAYS — COMPLETELY FIXED     ║
                ║  No animation class. Ever.   ║
                ╚══════════════════════════════╝ */}
            <div className="tst-says" aria-hidden="true">SAYS</div>

            {/* ╔══════════════════════════════╗
                ║ ABOUT MAKEWAYS — FIXED       ║
                ╚══════════════════════════════╝ */}
            <div className="tst-about">ABOUT MAKEWAYS</div>

            {/* Quote — animated, staggered 65 ms after name */}
            <div
              className={`tst-quote-wrap tst-animate--${phase === "out" ? "out" : phase === "in" ? "snap" : "idle"}`}
              style={{ "--tst-delay": "65ms" } as React.CSSProperties}
            >
              <span className="tst-qq-open">&ldquo;</span>
              <p className="tst-quote-text">{t.quote}</p>
              <span className="tst-qq-close">&rdquo;</span>
            </div>

            {/* Controls */}
            <div className="tst-controls">
              <ArrowBtn onClick={prev} dir="prev" />
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
              <ArrowBtn onClick={next} dir="next" />
            </div>
          </div>

          {/* ── RIGHT COLUMN — photo ── */}
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

          {/* Name + Role — animated */}
          <div
            className={`tst-animate--${phase === "out" ? "out" : phase === "in" ? "snap" : "idle"}`}
            style={{ "--tst-delay": "0ms" } as React.CSSProperties}
          >
            <h2 className="tst-name">{t.name}</h2>
            <p  className="tst-role">{t.role}</p>
          </div>

          {/* SAYS — FIXED */}
          <div className="tst-says" aria-hidden="true">SAYS</div>

          {/* ABOUT MAKEWAYS — FIXED */}
          <div className="tst-about">ABOUT MAKEWAYS</div>

          {/* Photo row with flanking arrows */}
          <div className="tst-mobile-img-row">
            <ArrowBtn onClick={prev} dir="prev" size={40} />
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
            <ArrowBtn onClick={next} dir="next" size={40} />
          </div>

          {/* Quote — animated */}
          <div
            className={`tst-quote-wrap tst-animate--${phase === "out" ? "out" : phase === "in" ? "snap" : "idle"}`}
            style={{ "--tst-delay": "65ms" } as React.CSSProperties}
          >
            <span className="tst-qq-open">&ldquo;</span>
            <p className="tst-quote-text">{t.quote}</p>
            <span className="tst-qq-close">&rdquo;</span>
          </div>

          {/* Dots */}
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
      </section>
    </>
  );
}