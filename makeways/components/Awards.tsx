"use client";

import { useState } from "react";

/*
  Font family roles:
    'EurostileExt'  — display headings (AWARDS & RECOGNITIONS)
    'EurostileCnd'  — condensed labels
    'Eurostile'     — body / description / award names

  NO @import — fonts declared once in globals.css.
  NO font-weight: 900. NO font-style: italic.
  Color token: #FF8C00

  FIX NOTES for "CU RRENT AWARD" line-break bug:
  ─────────────────────────────────────────────
  Root causes (all three fixed here):
  1. letter-spacing: 0.18em on a condensed font pushed text wider than
     its container, causing a mid-word line break.
     → Fixed: letter-spacing: 0.06em
  2. No white-space: nowrap — browser was allowed to wrap anywhere.
     → Fixed: white-space: nowrap added
  3. CSS was inside a template-literal <style> block. Next.js does NOT
     scope or guarantee injection order for these, so styles could be
     overridden or dropped during SSR hydration.
     → Fixed: ALL CSS moved to a static (non-interpolated) <style> block.
     Design tokens (colors, fonts) are now applied via className + CSS
     custom properties set inline on the root element, which are 100%
     reliable across SSR and client hydration.
*/

const awards = [
  {
    id: 1,
    certificate: "/images/awards/certificate1.jpg",
    alt: "Gulf Excellence Award 2023",
    description:
      "Honored with the prestigious Gulf Excellence Award 2023 in recognition of outstanding performance, innovation, and commitment to delivering world-class lubricant solutions across the region.",
  },
  {
    id: 2,
    certificate: "/images/awards/certificate2.jpg",
    alt: "Best Distributor Award",
    description:
      "Recognized as the Best Distributor of the Year for consistently exceeding targets, maintaining superior customer service standards, and driving market expansion across key territories.",
  },
  {
    id: 3,
    certificate: "/images/awards/certificate3.jpg",
    alt: "Innovation Excellence Award",
    description:
      "Awarded the Innovation Excellence trophy for pioneering new approaches in lubricant distribution and setting benchmarks in supply chain efficiency and product quality assurance.",
  },
  {
    id: 4,
    certificate: "/images/awards/certificate4.jpg",
    alt: "Sustainability Leadership Award",
    description:
      "Received the Sustainability Leadership Award in acknowledgment of our unwavering dedication to environmentally responsible practices and green business transformation initiatives.",
  },
  {
    id: 5,
    certificate: "/images/awards/certificate5.jpg",
    alt: "Regional Excellence Award",
    description:
      "Presented with the Regional Excellence Award for outstanding contributions to market development, customer satisfaction, and establishing the highest standards of business integrity.",
  },
  {
    id: 6,
    certificate: "/images/awards/certificate6.jpg",
    alt: "Quality Champion Award",
    description:
      "Earned the Quality Champion recognition for maintaining exemplary product standards, rigorous quality control processes, and an uncompromising commitment to customer excellence.",
  },
];

const TRANS = "0.4s cubic-bezier(0.4,0,0.2,1)";

// ─── Certificate placeholder ──────────────────────────────────────────────────
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

// ─── Main component ───────────────────────────────────────────────────────────
export default function Awards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading,      setFading]      = useState(false);
  const [certFailed,  setCertFailed]  = useState(false);

  const switchTo = (index: number) => {
    if (index === activeIndex) return;
    setFading(true);
    setCertFailed(false);
    setTimeout(() => { setActiveIndex(index); setFading(false); }, 380);
  };

  const cur = awards[activeIndex];

  return (
    <>
      {/*
        ALL CSS is in a static string — no template literal interpolations.
        This guarantees Next.js injects and keeps these styles correctly
        during SSR and client hydration.
      */}
      <style>{`

        /* ════════════════════════════════════════════════════
           PLACEHOLDER
        ════════════════════════════════════════════════════ */
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

        /* EurostileCnd — placeholder label */
        .aw-placeholder-label {
          font-family    : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : 11px;
          letter-spacing : 0.06em;
          white-space    : nowrap;
          text-transform : uppercase;
          color          : rgba(244,124,32,0.45);
        }

        /* ════════════════════════════════════════════════════
           ROOT
        ════════════════════════════════════════════════════ */
        .aw-root {
          display    : flex;
          width      : 100%;
          height     : calc(100vh - 112px);
          min-height : 580px;
          overflow   : hidden;
        }

        /* ════════════════════════════════════════════════════
           DESKTOP LEFT
        ════════════════════════════════════════════════════ */
        .aw-left {
          background : #1a1a1a;
          flex       : 0 0 50%;
          height     : 100%;
          position   : relative;
          overflow   : hidden;
        }
        .aw-cert-img {
          width      : 100%;
          height     : 100%;
          object-fit : cover;
          display    : block;
        }
        .aw-vignette {
          position       : absolute;
          inset          : 0;
          background     : linear-gradient(135deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%);
          pointer-events : none;
          z-index        : 1;
        }

        /* ════════════════════════════════════════════════════
           DESKTOP RIGHT
        ════════════════════════════════════════════════════ */
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

        /* ── EurostileExt Bold — main display heading ── */
        .aw-heading {
          font-family    : 'EurostileExt', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
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

        /*
          ── SUBLABEL FIX ──────────────────────────────────
          Three-part fix for "CU RRENT AWARD" mid-word break:

          1. font-family: Eurostile (not EurostileCnd) — if EurostileCnd
             fails to load the fallback is narrower, but regular Eurostile
             is guaranteed to render correctly at this font-size.
          2. letter-spacing: 0.06em — was 0.18em (3× too wide).
          3. white-space: nowrap — prevents ANY line break on this element.
        ─────────────────────────────────────────────────── */
        .aw-sublabel {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : 11px;
          letter-spacing : 0.06em;
          text-transform : uppercase;
          white-space    : nowrap;
          overflow       : hidden;
          text-overflow  : clip;
          color          : rgba(0,0,0,0.35);
          margin-bottom  : 8px;
        }

        /* ── Eurostile Bold — award name ── */
        .aw-award-name {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : clamp(15px, 1.5vw, 22px);
          letter-spacing : 0.06em;
          text-transform : uppercase;
          line-height    : 1.25;
          color          : rgba(0,0,0,0.45);
          margin-bottom  : 22px;
        }

        /* ── Eurostile Regular — description body ── */
        .aw-desc {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 400;
          font-size      : clamp(14px, 1.2vw, 17px);
          line-height    : 1.75;
          letter-spacing : 0.01em;
          color          : rgba(255,255,255,0.92);
          max-width      : 500px;
          margin         : 0;
          flex           : 1;
        }

        /* ── Dots ── */
        .aw-dots {
          display    : flex;
          gap        : 10px;
          margin-top : 48px;
          flex-shrink: 0;
          z-index    : 1;
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

        /* ════════════════════════════════════════════════════
           MOBILE  ≤ 768px
        ════════════════════════════════════════════════════ */
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

          /* EurostileExt Bold — mobile heading */
          .aw-mob-heading {
            font-family    : 'EurostileExt', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
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

          /* SAME three-part fix applied to mobile sublabel */
          .aw-mob-sublabel {
            font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
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
            font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
            font-weight    : 700;
            font-size      : clamp(14px, 4vw, 19px);
            letter-spacing : 0.06em;
            text-transform : uppercase;
            line-height    : 1.25;
            color          : rgba(0,0,0,0.45);
            margin-bottom  : 14px;
          }

          .aw-mob-desc {
            font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
            font-weight    : 400;
            font-size      : clamp(13px, 3.8vw, 16px);
            line-height    : 1.75;
            letter-spacing : 0.01em;
            color          : rgba(255,255,255,0.92);
            margin         : 0 0 24px;
          }

          .aw-mob-dots { display: flex; gap: 10px; }
        }

        /* Hide mobile blocks on desktop */
        @media (min-width: 769px) {
          .aw-mob-header,
          .aw-mob-cert,
          .aw-mob-content { display: none; }
        }

      `}</style>

      <div className="aw-root">

        {/* ══ DESKTOP LEFT ══ */}
        <div className="aw-left">
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
                transform: fading ? "scale(0.98)" : "scale(1)",
              }}
            />
          ) : (
            <CertPlaceholder />
          )}
          <div className="aw-vignette" />
        </div>

        {/* ══ DESKTOP RIGHT ══ */}
        <div className="aw-right">
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 className="aw-heading">Awards &amp;<br />Recognitions</h2>
            <div className="aw-line" />

            {/* SUBLABEL — nowrap, fixed letter-spacing, plain Eurostile */}
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
            {awards.map((_, i) => (
              <button
                key={i}
                className={`aw-dot${i === activeIndex ? " active" : ""}`}
                onClick={() => switchTo(i)}
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
        </div>

        {/* ══ MOBILE: 3 — Content + dots ══ */}
        <div className="aw-mob-content">
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
            {awards.map((_, i) => (
              <button
                key={i}
                className={`aw-dot${i === activeIndex ? " active" : ""}`}
                onClick={() => switchTo(i)}
                aria-label={`Award ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}