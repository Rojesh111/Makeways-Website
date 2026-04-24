"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const DATA: Testimonial[] = [
  { id: 1, name: "NIRVANA CHAUDHARY", role: "MD - CHAUDHARY GROUP", quote: "Our association with Makeways goes beyond a typical client - agency relationship. Their strategic thinking and creativity make them one of the finest agencies in Nepal and my first choice.", image: "/images/testimonial/NIRVANACHAUDHARY.webp" },
  { id: 2, name: "HIMANSHU GOLCHA", role: "EXECUTIVE DIRECTOR - HULAS STEEL", quote: "Our experience working with Makeways has been extremely rewarding. What I appreciate about Makeways is their ability to combine creativity with results-driven campaigns.", image: "/images/testimonial/HIMANSHUGOLCHA.webp" },
  { id: 3, name: "MALVIKA SUBBA", role: "MISS NEPAL / MEDIA PERSON", quote: "Working with Makeways has been a smooth and collaborative experience. They are attentive to detail, responsive to feedback, and committed to delivering top-notch event solutions.", image: "/images/testimonial/MalvikaSubba.webp" },
  { id: 4, name: "BHUSAN DAHAL", role: "MEDIA LEADER", quote: "What I admire about Makeways is their storytelling approach. Their campaigns are not just visually appealing but also culturally relevant and emotionally engaging.", image: "/images/testimonial/BHUSANDAHAL.webp" },
  { id: 5, name: "SUDIP THAPA", role: "PRESIDENT - ADVERTISING ASSOCIATION OF NEPAL", quote: "Over the years, I have observed many campaigns from Makeways that have contributed positively to Nepal's advertising standards. Their work is thoughtful, well-executed, and impactful.", image: "/images/testimonial/SUDIPTHAPA.webp" },
  { id: 6, name: "IRAJ SHRESTHA", role: "SALES & MARKETING HEAD - GOLDSTAR SHOES", quote: "Makeways stands out because they approach branding with clarity and purpose. Their ideas are not only creative but also aligned with long-term brand positioning.", image: "/images/testimonial/IRAJSHRESTHA.webp" },
];

const OUT_MS      = 260;
const IN_MS       = 500;
const AUTO_DELAY  = 5000;
const INITIAL_IDX = 0; // Nirvana Chaudhary is always first

function QuoteMark() {
  return (
    <svg width="32" height="22" viewBox="0 0 40 28" fill="none" aria-hidden="true" style={{ display: "block", flexShrink: 0 }}>
      <path d="M0 28V16.8C0 7.84 5.6 2.24 16.8 0L18 3.92C13.2 5.04 10.4 7.84 9.6 12.32H16.8V28H0ZM23.2 28V16.8C23.2 7.84 28.8 2.24 40 0L41.2 3.92C36.4 5.04 33.6 7.84 32.8 12.32H40V28H23.2Z" fill="#f47c20" />
    </svg>
  );
}

function EdgeArrow({ onClick, dir }: { onClick: () => void; dir: "prev" | "next" }) {
  return (
    <button onClick={onClick} aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"} className={`tst-edge-arrow tst-edge-arrow--${dir}`}>
      {dir === "prev" ? "‹" : "›"}
    </button>
  );
}

function NavArrow({ onClick, dir }: { onClick: () => void; dir: "prev" | "next" }) {
  return (
    <button onClick={onClick} aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"} className={`tst-nav-text tst-nav-text--${dir}`}>
      {dir === "prev" ? "← PREV" : "NEXT →"}
    </button>
  );
}

function ProgressBar({ running, duration }: { running: boolean; duration: number }) {
  return (
    <div className="tst-progress-track">
      <div className={`tst-progress-fill${running ? " tst-progress-fill--run" : ""}`} style={{ "--tst-duration": `${duration}ms` } as React.CSSProperties} />
    </div>
  );
}

export default function Testimonials() {
  const [idx,     setIdx]     = useState(INITIAL_IDX);
  const [phase,   setPhase]   = useState<"idle" | "out" | "in">("idle");
  const [autoRun, setAutoRun] = useState(true);
  const [paused,  setPaused]  = useState(false);

  const pending   = useRef<number>(0);
  const timers    = useRef<ReturnType<typeof setTimeout>[]>([]);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const clearAuto   = () => { if (autoTimer.current) { clearTimeout(autoTimer.current); autoTimer.current = null; } };

  const goTo = useCallback((to: number, isAuto = false) => {
    if (phase !== "idle" || to === idx) return;
    if (!isAuto) { clearAuto(); setPaused(false); }
    pending.current = to;
    clearTimers();
    setPhase("out");
    setAutoRun(false);
    timers.current.push(setTimeout(() => {
      setIdx(pending.current);
      setPhase("in");
      timers.current.push(setTimeout(() => { setPhase("idle"); setAutoRun(true); }, IN_MS));
    }, OUT_MS));
  }, [idx, phase]);

  useEffect(() => {
    if (paused) return;
    clearAuto();
    autoTimer.current = setTimeout(() => {
      const nextIdx = idx === DATA.length - 1 ? INITIAL_IDX : idx + 1;
      goTo(nextIdx, true);
    }, AUTO_DELAY);
    return clearAuto;
  }, [idx, paused, goTo]);

  useEffect(() => () => { clearTimers(); clearAuto(); }, []);

  const prev = () => goTo(idx === INITIAL_IDX ? DATA.length - 1 : idx - 1);
  const next = () => goTo(idx === DATA.length - 1 ? INITIAL_IDX : idx + 1);
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
        .tst-section {
          font-family : var(--font-primary, sans-serif);
          background  : #D4D4D0;
          width       : 100%;
          overflow    : hidden;
          position    : relative;
        }

        /* ── Desktop edge arrows — solid orange ── */
        .tst-edge-arrow {
          position        : absolute;
          top             : 50%;
          transform       : translateY(-50%);
          z-index         : 10;
          width           : 48px;
          height          : 48px;
          border-radius   : 50%;
          border          : none;
          background      : #f47c20;
          color           : #ffffff;
          font-size       : 26px;
          display         : flex;
          align-items     : center;
          justify-content : center;
          cursor          : pointer;
          padding         : 0 0 2px 0;
          outline         : none;
          box-shadow      : 0 4px 16px rgba(244,124,32,0.35);
          transition      : background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
        }
        .tst-edge-arrow--prev { left  : clamp(12px, 2vw, 30px); }
        .tst-edge-arrow--next { right : clamp(12px, 2vw, 30px); }
        .tst-edge-arrow:hover { background: #d96a10; transform: translateY(-50%) scale(1.1); box-shadow: 0 6px 22px rgba(244,124,32,0.45); }
        .tst-edge-arrow:active        { transform: translateY(-50%) scale(0.94); box-shadow: none; }
        .tst-edge-arrow:focus-visible { outline: 2px solid #f47c20; outline-offset: 3px; }

        /* ── Desktop layout ── */
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

        /* ── Photo stack ── */
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

        /* ── Animation phases ── */
        .tst-animate--out  { opacity: 0; transform: translateY(-10px); transition: opacity ${OUT_MS}ms ease, transform ${OUT_MS}ms ease; }
        .tst-animate--snap { opacity: 0; transform: translateY(16px); transition: none; }
        .tst-animate--in   { opacity: 1; transform: translateY(0); transition: opacity ${IN_MS}ms cubic-bezier(0.22,0.61,0.36,1) var(--tst-delay,0ms), transform ${IN_MS}ms cubic-bezier(0.22,0.61,0.36,1) var(--tst-delay,0ms); }
        .tst-animate--idle { opacity: 1; transform: translateY(0); transition: opacity ${IN_MS}ms cubic-bezier(0.22,0.61,0.36,1) var(--tst-delay,0ms), transform ${IN_MS}ms cubic-bezier(0.22,0.61,0.36,1) var(--tst-delay,0ms); }

        /* ── Text styles ── */
        .tst-name { font-family: var(--font-primary,sans-serif); font-weight: 700; font-size: clamp(20px,2.2vw,38px); line-height: 1.1; letter-spacing: 0.06em; text-transform: uppercase; color: #f47c20; margin: 0; }
        .tst-role { font-family: var(--font-condensed,sans-serif); font-weight: 700; font-size: clamp(10px,0.85vw,13px); line-height: 1.5; letter-spacing: 0.1em; text-transform: uppercase; color: #1a1a1a; margin: 6px 0 0; }
        .tst-says { font-family: var(--font-extended,sans-serif); font-weight: 700; font-size: clamp(100px,14vw,280px); line-height: 0.85; letter-spacing: 0.04em; text-transform: uppercase; color: #f47c20; user-select: none; margin: 6px 0 0 0; }
        .tst-about { font-family: var(--font-condensed,sans-serif); font-weight: 700; font-size: clamp(10px,0.85vw,13px); line-height: 1.5; letter-spacing: 0.1em; text-transform: uppercase; color: #1a1a1a; margin-top: 4px; }

        /* ── Quote block ── */
        .tst-quote-wrap { margin-top: clamp(20px,2.5vw,32px); max-width: 520px; }
        .tst-quote-body { display: flex; gap: clamp(10px,1.2vw,16px); align-items: flex-start; }
        .tst-quote-text { font-family: var(--font-primary,sans-serif); font-weight: 400; font-size: clamp(14px,1.05vw,16px); line-height: 1.75; letter-spacing: 0.01em; color: var(--mw-body,#333); margin: 0; }

        /* ── Bottom controls ── */
        .tst-controls { display: flex; align-items: center; gap: 14px; margin-top: clamp(20px,2.5vw,32px); }

        /* ── Nav text buttons (bottom) ── */
        .tst-nav-text {
          background     : none;
          border         : none;
          color          : #f47c20;
          font-family    : var(--font-condensed, sans-serif);
          font-weight    : 700;
          font-size      : 20px;
          letter-spacing : 0.14em;
          text-transform : uppercase;
          cursor         : pointer;
          padding        : 4px 0;
          outline        : none;
          flex-shrink    : 0;
          transition     : opacity 0.2s ease, letter-spacing 0.2s ease;
          white-space    : nowrap;
        }
        .tst-nav-text:hover        { opacity: 0.7; letter-spacing: 0.2em; }
        .tst-nav-text:active       { opacity: 0.5; }
        .tst-nav-text:focus-visible { outline: 2px solid #f47c20; outline-offset: 3px; }

        /* ── Dots ── */
        .tst-dots { display: flex; align-items: center; gap: 8px; }
        .tst-dot { height: 8px; border-radius: 99px; background: rgba(26,26,26,0.2); border: none; cursor: pointer; padding: 0; outline: none; flex-shrink: 0; transition: all 0.38s cubic-bezier(0.34,1.56,0.64,1); width: 8px; }
        .tst-dot--active { width: 26px; background: #f47c20; }
        .tst-dot:not(.tst-dot--active):hover { background: rgba(26,26,26,0.35); }
        .tst-dot:focus-visible { outline: 2px solid #f47c20; outline-offset: 2px; }

        /* ── Progress bar ── */
        .tst-progress-track { width: 80px; height: 3px; border-radius: 99px; background: rgba(26,26,26,0.15); overflow: hidden; flex-shrink: 0; }
        .tst-progress-fill  { height: 100%; width: 0%; background: #f47c20; border-radius: 99px; }
        .tst-progress-fill--run { animation: tst-progress var(--tst-duration, 5000ms) linear forwards; }
        @keyframes tst-progress { from { width: 0%; } to { width: 100%; } }

        /* ── Mobile layout ── */
        .tst-mobile { display: flex; flex-direction: column; padding: clamp(32px,8vw,48px) clamp(20px,6vw,40px) clamp(48px,10vw,64px); }
        .tst-mobile .tst-name  { font-size: clamp(18px,5.5vw,26px); }
        .tst-mobile .tst-role  { font-size: clamp(9px,2.3vw,12px); }
        .tst-mobile .tst-says  { font-size: clamp(64px,20vw,110px); }
        .tst-mobile .tst-about { font-size: clamp(9px,2.3vw,12px); }
        .tst-mobile-img-wrap { position: relative; width: 100%; aspect-ratio: 3/4; overflow: hidden; margin-top: clamp(16px,4vw,24px); background-color: #D4D4D0; }
        .tst-mobile-img-wrap .tst-photo { object-fit: cover; object-position: top center; }

        /* ── Mobile image arrows — solid orange ── */
        .tst-img-arrow {
          position        : absolute;
          top             : 50%;
          transform       : translateY(-50%);
          z-index         : 10;
          width           : 40px;
          height          : 40px;
          border-radius   : 50%;
          border          : none;
          background      : #f47c20;
          color           : #fff;
          font-size       : 22px;
          display         : flex;
          align-items     : center;
          justify-content : center;
          cursor          : pointer;
          padding         : 0 0 1px 0;
          outline         : none;
          box-shadow      : 0 3px 12px rgba(244,124,32,0.45);
          transition      : background 0.2s ease, transform 0.15s ease;
        }
        .tst-img-arrow--prev { left: 10px; }
        .tst-img-arrow--next { right: 10px; }
        .tst-img-arrow:hover        { background: #d96a10; }
        .tst-img-arrow:active       { transform: translateY(-50%) scale(0.93); }
        .tst-img-arrow:focus-visible { outline: 2px solid #f47c20; outline-offset: 3px; }

        .tst-mobile .tst-quote-wrap { margin-top: clamp(16px,4vw,24px); }
        .tst-mobile .tst-quote-text { font-size: clamp(13px,3.6vw,16px); }

        .tst-mobile-nav { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: clamp(20px,5vw,32px); }

        @media (min-width: 768px) { .tst-desktop { display: block; } .tst-mobile { display: none; } }

        @media (prefers-reduced-motion: reduce) {
          .tst-animate--out,.tst-animate--snap,.tst-animate--in,.tst-animate--idle,.tst-photo,.tst-edge-arrow,.tst-img-arrow,.tst-nav-text,.tst-dot,.tst-progress-fill { transition: none !important; animation: none !important; }
          .tst-animate--out  { opacity: 0; }
          .tst-animate--snap { opacity: 0; }
          .tst-animate--in   { opacity: 1; }
          .tst-animate--idle { opacity: 1; }
          .tst-progress-fill--run { width: 100%; }
        }
      `}</style>

      <section className="tst-section" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

        {/* ══ DESKTOP ══ */}
        <div className="tst-desktop">
          <EdgeArrow onClick={prev} dir="prev" />
          <EdgeArrow onClick={next} dir="next" />
          <div className="tst-left">
            <div className={`tst-animate--${animClass}`} style={{ "--tst-delay": "0ms" } as React.CSSProperties}>
              <h2 className="tst-name">{t.name}</h2>
              <p  className="tst-role">{t.role}</p>
            </div>
            <div className="tst-says"  aria-hidden="true">SAYS</div>
            <div className="tst-about">ABOUT MAKEWAYS</div>
            <div className={`tst-quote-wrap tst-animate--${animClass}`} style={{ "--tst-delay": "65ms" } as React.CSSProperties}>
              <div className="tst-quote-body">
                <QuoteMark />
                <p className="tst-quote-text">{t.quote}</p>
              </div>
            </div>
            <div className="tst-controls">
              <NavArrow onClick={prev} dir="prev" />
              <div className="tst-dots">
                {DATA.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} aria-label={`Go to testimonial ${i + 1}`} className={`tst-dot${i === idx ? " tst-dot--active" : ""}`} />
                ))}
              </div>
              <NavArrow onClick={next} dir="next" />
              <ProgressBar running={autoRun && !paused} duration={AUTO_DELAY} />
            </div>
          </div>
          <div className="tst-right">
            <div className="tst-photo-stack">
              {DATA.map((item, i) => (
                <img key={item.id} src={item.image} alt={item.name} loading={i === 0 ? "eager" : "lazy"} className={`tst-photo${i === idx ? " tst-photo--active" : ""}`} />
              ))}
            </div>
          </div>
        </div>

        {/* ══ MOBILE ══ */}
        <div className="tst-mobile">
          <div className={`tst-animate--${animClass}`} style={{ "--tst-delay": "0ms" } as React.CSSProperties}>
            <h2 className="tst-name">{t.name}</h2>
            <p  className="tst-role">{t.role}</p>
          </div>
          <div className="tst-says"  aria-hidden="true">SAYS</div>
          <div className="tst-about">ABOUT MAKEWAYS</div>
          <div className="tst-mobile-img-wrap">
            <button className="tst-img-arrow tst-img-arrow--prev" onClick={prev} aria-label="Previous testimonial">‹</button>
            <button className="tst-img-arrow tst-img-arrow--next" onClick={next} aria-label="Next testimonial">›</button>
            <div className="tst-photo-stack">
              {DATA.map((item, i) => (
                <img key={item.id} src={item.image} alt={item.name} loading={i === 0 ? "eager" : "lazy"} className={`tst-photo${i === idx ? " tst-photo--active" : ""}`} />
              ))}
            </div>
          </div>
          <div className={`tst-quote-wrap tst-animate--${animClass}`} style={{ "--tst-delay": "65ms" } as React.CSSProperties}>
            <div className="tst-quote-body">
              <QuoteMark />
              <p className="tst-quote-text">{t.quote}</p>
            </div>
          </div>
          <div className="tst-mobile-nav">
            <NavArrow onClick={prev} dir="prev" />
            <div className="tst-dots">
              {DATA.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={`Go to testimonial ${i + 1}`} className={`tst-dot${i === idx ? " tst-dot--active" : ""}`} />
              ))}
            </div>
            <NavArrow onClick={next} dir="next" />
            <ProgressBar running={autoRun && !paused} duration={AUTO_DELAY} />
          </div>
        </div>
      </section>
    </>
  );
}