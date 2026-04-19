"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const awards = [
  {
    id: 1,
    certificate: "/images/awards/Awards 9.jpg",
    alt: "Gulf Excellence Award 2023",
    description:
      "Honored with the prestigious Gulf Excellence Award 2023 in recognition of outstanding performance, innovation, and commitment to delivering world-class lubricant solutions across the region.",
  },
  {
    id: 2,
    certificate: "/images/awards/award2.jpg",
    alt: "Best Distributor Award",
    description:
      "Recognized as the Best Distributor of the Year for consistently exceeding targets, maintaining superior customer service standards, and driving market expansion across key territories.",
  },
  {
    id: 3,
    certificate: "/images/awards/award3.png",
    alt: "Innovation Excellence Award",
    description:
      "Awarded the Innovation Excellence trophy for pioneering new approaches in lubricant distribution and setting benchmarks in supply chain efficiency and product quality assurance.",
  },
  {
    id: 4,
    certificate: "/images/awards/Awards_4.jpg",
    alt: "Sustainability Leadership Award",
    description:
      "Received the Sustainability Leadership Award in acknowledgment of our unwavering dedication to environmentally responsible practices and green business transformation initiatives.",
  },
  {
    id: 5,
    certificate: "/images/awards/Awards 5.jpg",
    alt: "Regional Excellence Award",
    description:
      "Presented with the Regional Excellence Award for outstanding contributions to market development, customer satisfaction, and establishing the highest standards of business integrity.",
  }, 
  {
    id: 7,
    certificate: "/images/awards/Awards 7.jpg",
    alt: "Performance Excellence Award",
    description:
      "Commended for delivering exceptional performance metrics across all key business verticals, demonstrating consistent growth and operational excellence throughout the fiscal year.",
  },
  {
    id: 8,
    certificate: "/images/awards/Awards 8.jpg",
    alt: "Customer Satisfaction Award",
    description:
      "Awarded in recognition of achieving the highest customer satisfaction ratings, reflecting our commitment to building lasting partnerships and providing unparalleled service experiences.",
  },
  {
    id: 9,
    certificate: "/images/awards/Awards 10.jpg",
    alt: "Market Leadership Award",
    description:
      "Recognized as a market leader for driving significant business growth, expanding our footprint across new territories, and maintaining dominant market share in the lubricant sector.",
  },
  {
    id: 10,
    certificate: "/images/awards/Award_ANN.jpg",
    alt: "Annual Achievement Award",
    description:
      "Presented with the Annual Achievement Award for outstanding yearly performance, demonstrating consistent excellence and dedication to business growth and customer satisfaction.",
  },
  {
    id: 11,
    certificate: "/images/awards/Awards_BRB.jpg",
    alt: "Business Recognition Award",
    description:
      "Honored with the Business Recognition Award for exemplary business conduct, ethical practices, and significant contributions to the industry's growth and development.",
  },
  {
    id: 12,
    certificate: "/images/awards/Awards_Critty 2.jpg",
    alt: "Critical Excellence Award",
    description:
      "Recognized for critical excellence in operations and customer delivery, consistently surpassing benchmarks and setting new industry standards for quality and service.",
  },
  {
    id: 13,
    certificate: "/images/awards/Awards_Critty3.jpg",
    alt: "Critty Excellence Award",
    description:
      "Awarded for exceptional operational standards and outstanding contributions toward sustainable and innovative lubricant solutions that positively impact our clients and communities.",
  },
  {
    id: 14,
    certificate: "/images/awards/Awards 1.jpg",
    alt: "Premier Partner Award",
    description:
      "Presented as a Premier Partner in acknowledgment of our exemplary collaboration, mutual growth initiatives, and unwavering commitment to shared business goals and values.",
  },
  {
    id: 15,
    certificate: "/images/awards/awards1.jpg",
    alt: "Outstanding Service Award",
    description:
      "Honored with the Outstanding Service Award for delivering consistent excellence across all client touchpoints, reflecting our core values of integrity, reliability, and superior quality.",
  },
];

const TRANS = "0.4s cubic-bezier(0.4,0,0.2,1)";
const AUTO_INTERVAL = 3000;

function CertPlaceholder() {
  return (
    <div className="aw-placeholder">
      <svg width="80" height="80" viewBox="0 0 72 72" fill="none" className="aw-placeholder-svg">
        <rect x="12" y="8" width="42" height="54" rx="3" stroke="#FF8C00" strokeWidth="2" />
        <rect x="18" y="6" width="42" height="54" rx="3" stroke="#FF8C00" strokeWidth="1.2" strokeDasharray="4 3" />
        <line x1="20" y1="26" x2="46" y2="26" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="34" x2="46" y2="34" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="42" x2="38" y2="42" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
        <circle cx="33" cy="17" r="5" stroke="#FF8C00" strokeWidth="1.5" />
        <path d="M30 17 L32 19 L36 15" stroke="#FF8C00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="aw-placeholder-label">Appreciation Certificate</span>
    </div>
  );
}

export default function Awards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading,      setFading]      = useState(false);
  const [certFailed,  setCertFailed]  = useState(false);
  const [paused,      setPaused]      = useState(false);
  const [progress,    setProgress]    = useState(0);
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadingRef   = useRef(false);

  const resetTimer = useCallback(() => {
    if (timerRef.current)    clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
  }, []);

  const switchTo = useCallback((index: number) => {
    if (fadingRef.current) return;
    setActiveIndex((prev) => {
      if (index === prev) return prev;
      fadingRef.current = true;
      setFading(true);
      setCertFailed(false);
      resetTimer();
      setTimeout(() => { setActiveIndex(index); setFading(false); fadingRef.current = false; }, 380);
      return prev;
    });
  }, [resetTimer]);

  const prev = useCallback(() => {
    setActiveIndex((cur) => {
      const target = (cur - 1 + awards.length) % awards.length;
      switchTo(target);
      return cur;
    });
  }, [switchTo]);

  const next = useCallback(() => {
    setActiveIndex((cur) => {
      const target = (cur + 1) % awards.length;
      switchTo(target);
      return cur;
    });
  }, [switchTo]);

  // Auto-slide timer
  useEffect(() => {
    if (paused || fading) return;
    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / AUTO_INTERVAL) * 100, 100));
    }, 30);
    timerRef.current = setInterval(() => {
      setProgress(0);
      setActiveIndex((cur) => {
        const target = (cur + 1) % awards.length;
        fadingRef.current = true;
        setFading(true);
        setCertFailed(false);
        setTimeout(() => { setActiveIndex(target); setFading(false); fadingRef.current = false; }, 380);
        return cur;
      });
    }, AUTO_INTERVAL);
    return () => {
      if (timerRef.current)    clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [paused, fading, activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  { prev(); resetTimer(); }
      if (e.key === "ArrowRight") { next(); resetTimer(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, resetTimer]);

  const cur = awards[activeIndex];

  return (
    <>
      <style>{`

        .aw-placeholder {
          width           : 100%;
          height          : 100%;
          display         : flex;
          flex-direction  : column;
          align-items     : center;
          justify-content : center;
          gap             : 16px;
          background      : linear-gradient(160deg, rgba(244,124,32,0.05) 0%, transparent 80%);
        }
        .aw-placeholder-svg { opacity: 0.28; }

        .aw-placeholder-label {
          font-family    : var(--font-condensed);
          font-weight    : 700;
          font-size      : 11px;
          letter-spacing : 0.06em;
          white-space    : nowrap;
          text-transform : uppercase;
          color          : rgba(244,124,32,0.45);
        }

        .aw-root {
          display    : flex;
          width      : 100%;
          height     : calc(100vh - 112px);
          min-height : 580px;
          overflow   : hidden;
        }

        /* ── LEFT PANEL ── */
        .aw-left {
          background : #FF8C00;
          flex       : 0 0 50%;
          height     : 100%;
          position   : relative;
          overflow   : hidden;
          display    : flex;
          align-items: center;
          justify-content: center;
        }
        .aw-left::after {
          content    : '';
          position   : absolute;
          top        : 10%;
          bottom     : 10%;
          right      : 0;
          width      : 1px;
          background : rgba(0,0,0,0.10);
          z-index    : 2;
        }
        .aw-cert-frame {
          position       : relative;
          width          : 100%;
          height         : 100%;
          display        : flex;
          align-items    : center;
          justify-content: center;
          padding        : 40px;
          z-index        : 1;
        }
        .aw-cert-img {
          max-width    : 100%;
          max-height   : 100%;
          width        : auto;
          height       : auto;
          aspect-ratio : 4 / 3;
          object-fit   : contain;
          display      : block;
          border-radius: 6px;
        }


        /* ── PROGRESS BAR ── */
        .aw-progress {
          position   : absolute;
          bottom     : 0;
          left       : 0;
          height     : 3px;
          background : linear-gradient(90deg, rgba(0,0,0,0.35), rgba(0,0,0,0.18));
          z-index    : 12;
          transition : width 0.03s linear;
          border-radius: 0 2px 0 0;
        }

        /* ── NAV ARROWS ── */
        .aw-arrow {
          position        : absolute;
          top             : 50%;
          transform       : translateY(-50%);
          z-index         : 10;
          width           : 44px;
          height          : 44px;
          border-radius   : 50%;
          background      : rgba(0,0,0,0.12);
          border          : 1.5px solid rgba(0,0,0,0.18);
          color           : rgba(0,0,0,0.6);
          display         : flex;
          align-items     : center;
          justify-content : center;
          cursor          : pointer;
          transition      : background 0.2s, border-color 0.2s, color 0.2s;
          backdrop-filter : blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .aw-arrow:hover  { background: rgba(0,0,0,0.20); border-color: rgba(0,0,0,0.30); color: rgba(0,0,0,0.8); }
        .aw-arrow.left   { left: 18px; }
        .aw-arrow.right  { right: 18px; }
        .aw-arrow svg    { width: 18px; height: 18px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

        /* ── RIGHT PANEL ── */
        .aw-right {
          background      : #FF8C00;
          flex            : 0 0 50%;
          height          : 100%;
          display         : flex;
          flex-direction  : column;
          justify-content : center;
          padding         : 72px 72px 56px;
          position        : relative;
          overflow        : hidden;
        }
        .aw-right::after {
          content       : '';
          position      : absolute;
          bottom        : -70px;
          right         : -70px;
          width         : 220px;
          height        : 220px;
          border        : 2px solid rgba(255,255,255,0.07);
          border-radius : 50%;
          pointer-events: none;
        }
        .aw-right::before {
          content       : '';
          position      : absolute;
          bottom        : -24px;
          right         : -24px;
          width         : 130px;
          height        : 130px;
          border        : 2px solid rgba(255,255,255,0.07);
          border-radius : 50%;
          pointer-events: none;
        }

        .aw-heading {
          font-family    : var(--font-extended);
          font-weight    : 700;
          font-size      : clamp(32px, 4vw, 60px);
          line-height    : 1.05;
          letter-spacing : 0.06em;
          text-transform : uppercase;
          color          : #ffffff;
          margin         : 0 0 20px;
        }

        .aw-line {
          width         : 52px;
          height        : 3px;
          background    : rgba(0,0,0,0.22);
          border-radius : 2px;
          margin-bottom : 28px;
          flex-shrink   : 0;
        }

        .aw-counter {
          font-family    : var(--font-primary);
          font-weight    : 700;
          font-size      : 11px;
          letter-spacing : 0.08em;
          text-transform : uppercase;
          color          : #000000;
          margin-bottom  : 4px;
        }

        .aw-sublabel {
          font-family    : var(--font-primary);
          font-weight    : 700;
          font-size      : 11px;
          letter-spacing : 0.06em;
          text-transform : uppercase;
          white-space    : nowrap;
          overflow       : hidden;
          text-overflow  : clip;
          color          : #000000;
          margin-bottom  : 8px;
        }

        .aw-award-name {
          font-family    : var(--font-primary);
          font-weight    : 700;
          font-size      : clamp(15px, 1.5vw, 22px);
          letter-spacing : 0.06em;
          text-transform : uppercase;
          line-height    : 1.25;
          color          : #000000;
          margin-bottom  : 22px;
        }

        .aw-desc {
          font-family    : var(--font-primary);
          font-weight    : 400;
          font-size      : clamp(14px, 1.2vw, 17px);
          line-height    : 1.75;
          letter-spacing : 0.01em;
          color          : rgba(255,255,255,0.92);
          max-width      : 500px;
          margin         : 0;
          flex           : 1;
        }

        /* ── DOTS ── */
        .aw-dots {
          display     : flex;
          flex-wrap   : wrap;
          gap         : 8px;
          margin-top  : 48px;
          flex-shrink : 0;
          z-index     : 1;
          max-width   : 320px;
        }
        .aw-dot {
          width         : 8px;
          height        : 8px;
          border-radius : 99px;
          background    : rgba(0,0,0,0.25);
          border        : none;
          cursor        : pointer;
          padding       : 0;
          outline       : none;
          transition    : background 0.25s, width 0.38s cubic-bezier(0.34,1.56,0.64,1);
        }
        .aw-dot.active             { width: 26px; background: rgba(0,0,0,0.55); }
        .aw-dot:hover:not(.active) { background: rgba(0,0,0,0.4); }
        .aw-dot:focus-visible      { outline: 2px solid rgba(0,0,0,0.5); outline-offset: 2px; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .aw-root          { flex-direction: column; height: auto; min-height: unset; }
          .aw-left          { display: none; }
          .aw-right         { display: none; }

          .aw-mob-header {
            background : #FF8C00;
            padding    : 36px 28px 28px;
            position   : relative;
            overflow   : hidden;
          }
          .aw-mob-header::after {
            content       : '';
            position      : absolute;
            top           : -40px;
            right         : -40px;
            width         : 160px;
            height        : 160px;
            border        : 2px solid rgba(255,255,255,0.07);
            border-radius : 50%;
            pointer-events: none;
          }

          .aw-mob-heading {
            font-family    : var(--font-extended);
            font-weight    : 700;
            font-size      : clamp(28px, 9vw, 48px);
            line-height    : 1.05;
            letter-spacing : 0.06em;
            text-transform : uppercase;
            color          : #ffffff;
            margin         : 0 0 18px;
          }
          .aw-mob-line {
            width         : 44px;
            height        : 3px;
            background    : rgba(0,0,0,0.22);
            border-radius : 2px;
          }

          .aw-mob-cert {
            background   : #1a1a1a;
            width        : 100%;
            aspect-ratio : 4 / 3;
            position     : relative;
            overflow     : hidden;
            flex-shrink  : 0;
          }
          .aw-mob-cert img {
            width: 100%; height: 100%;
            object-fit: cover; display: block;
          }

          /* mobile nav arrows */
          .aw-mob-nav {
            position       : absolute;
            inset          : 0;
            display        : flex;
            align-items    : center;
            justify-content: space-between;
            padding        : 0 12px;
            pointer-events : none;
            z-index        : 5;
          }
          .aw-mob-arrow {
            pointer-events  : all;
            width           : 36px;
            height          : 36px;
            border-radius   : 50%;
            background      : rgba(255,255,255,0.12);
            border          : 1.5px solid rgba(255,255,255,0.2);
            color           : #fff;
            display         : flex;
            align-items     : center;
            justify-content : center;
            cursor          : pointer;
          }
          .aw-mob-arrow svg { width:16px; height:16px; stroke:currentColor; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }

          .aw-mob-content {
            background : #FF8C00;
            padding    : 28px 28px 40px;
            position   : relative;
            overflow   : hidden;
          }
          .aw-mob-content::after {
            content       : '';
            position      : absolute;
            bottom        : -50px;
            right         : -50px;
            width         : 180px;
            height        : 180px;
            border        : 2px solid rgba(255,255,255,0.07);
            border-radius : 50%;
            pointer-events: none;
          }

          .aw-mob-counter {
            font-family    : var(--font-primary);
            font-weight    : 700;
            font-size      : 11px;
            letter-spacing : 0.08em;
            text-transform : uppercase;
            color          : rgba(0,0,0,0.3);
            margin-bottom  : 4px;
          }
          .aw-mob-sublabel {
            font-family    : var(--font-primary);
            font-weight    : 700;
            font-size      : 11px;
            letter-spacing : 0.06em;
            text-transform : uppercase;
            white-space    : nowrap;
            overflow       : hidden;
            text-overflow  : clip;
            color          : rgba(0,0,0,0.35);
            margin-bottom  : 6px;
          }
          .aw-mob-award-name {
            font-family    : var(--font-primary);
            font-weight    : 700;
            font-size      : clamp(14px, 4vw, 19px);
            letter-spacing : 0.06em;
            text-transform : uppercase;
            line-height    : 1.25;
            color          : rgba(0,0,0,0.45);
            margin-bottom  : 14px;
          }
          .aw-mob-desc {
            font-family    : var(--font-primary);
            font-weight    : 400;
            font-size      : clamp(13px, 3.8vw, 16px);
            line-height    : 1.75;
            letter-spacing : 0.01em;
            color          : rgba(255,255,255,0.92);
            margin         : 0 0 24px;
          }
          .aw-mob-dots { display: flex; flex-wrap: wrap; gap: 8px; max-width: 260px; }
        }

        @media (min-width: 769px) {
          .aw-mob-header,
          .aw-mob-cert,
          .aw-mob-content { display: none; }
        }

      `}</style>

      <div
        className="aw-root"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        {/* ══ DESKTOP LEFT ══ */}
        <div className="aw-left">
          <div className="aw-cert-frame">
            {!certFailed ? (
              <img
                key={cur.certificate}
                src={cur.certificate}
                alt={`${cur.alt} certificate`}
                className="aw-cert-img"
                onError={() => setCertFailed(true)}
                style={{
                  transition: `opacity ${TRANS}, transform ${TRANS}`,
                  opacity  : fading ? 0 : 1,
                  transform: fading ? "scale(0.96)" : "scale(1)",
                }}
              />
            ) : (
              <CertPlaceholder />
            )}
          </div>
          <div className="aw-vignette" />
          <div className="aw-progress" style={{ width: `${progress}%` }} />

          {/* Desktop nav arrows on image */}
          <button className="aw-arrow left"  onClick={() => { prev(); resetTimer(); }} aria-label="Previous award">
            <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="aw-arrow right" onClick={() => { next(); resetTimer(); }} aria-label="Next award">
            <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* ══ DESKTOP RIGHT ══ */}
        <div className="aw-right">
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 className="aw-heading">Awards &amp;<br />Recognitions</h2>
            <div className="aw-line" />
            <div className="aw-counter">{activeIndex + 1} / {awards.length}</div>
            <div className="aw-sublabel">Current Award</div>
            <div
              className="aw-award-name"
              style={{
                transition: `opacity ${TRANS}, transform ${TRANS}`,
                opacity  : fading ? 0 : 1,
                transform: fading ? "translateY(6px)" : "translateY(0)",
              }}
            >
              {cur.alt}
            </div>
            <p
              className="aw-desc"
              style={{
                transition: `opacity ${TRANS}, transform ${TRANS}`,
                opacity  : fading ? 0 : 1,
                transform: fading ? "translateY(12px)" : "translateY(0)",
              }}
            >
              {cur.description}
            </p>
          </div>

          <div className="aw-dots">
            {awards.map((_: typeof awards[0], i: number) => (
              <button
                key={i}
                className={`aw-dot${i === activeIndex ? " active" : ""}`}
                onClick={() => { switchTo(i); resetTimer(); }}
                aria-label={`Award ${i + 1}`}
              />
            ))}
          </div>
      
        </div>

        {/* ══ MOBILE: 1 — Header ══ */}
        <div className="aw-mob-header">
          <h2 className="aw-mob-heading">Awards &amp;<br />Recognitions</h2>
          <div className="aw-mob-line" />
        </div>

        {/* ══ MOBILE: 2 — Certificate ══ */}
        <div className="aw-mob-cert">
          {!certFailed ? (
            <img
              key={`mob-${cur.certificate}`}
              src={cur.certificate}
              alt={`${cur.alt} certificate`}
              onError={() => setCertFailed(true)}
              style={{
                transition: `opacity ${TRANS}`,
                opacity   : fading ? 0 : 1,
              }}
            />
          ) : (
            <CertPlaceholder />
          )}
          {/* Mobile nav arrows */}
          <div className="aw-mob-nav">
            <button className="aw-mob-arrow" onClick={() => { prev(); resetTimer(); }} aria-label="Previous award">
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="aw-mob-arrow" onClick={() => { next(); resetTimer(); }} aria-label="Next award">
              <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        {/* ══ MOBILE: 3 — Content + dots ══ */}
        <div className="aw-mob-content">
          <div className="aw-mob-counter">{activeIndex + 1} / {awards.length}</div>
          <div className="aw-mob-sublabel">Current Award</div>
          <div
            className="aw-mob-award-name"
            style={{
              transition: `opacity ${TRANS}, transform ${TRANS}`,
              opacity  : fading ? 0 : 1,
              transform: fading ? "translateY(6px)" : "translateY(0)",
            }}
          >
            {cur.alt}
          </div>
          <p
            className="aw-mob-desc"
            style={{
              transition: `opacity ${TRANS}, transform ${TRANS}`,
              opacity  : fading ? 0 : 1,
              transform: fading ? "translateY(10px)" : "translateY(0)",
            }}
          >
            {cur.description}
          </p>
          <div className="aw-mob-dots">
            {awards.map((_: typeof awards[0], i: number) => (
              <button
                key={i}
                className={`aw-dot${i === activeIndex ? " active" : ""}`}
                onClick={() => { switchTo(i); resetTimer(); }}
                aria-label={`Award ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}