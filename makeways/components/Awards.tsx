"use client";

import { useState } from "react";

// ─── Award data ───────────────────────────────────────────────────────────────
// Replace `certificate` paths with your actual image paths.
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

interface Award {
  id: number;
  certificate: string;
  alt: string;
  description: string;
}

// ─── Certificate placeholder (shown when image fails to load) ─────────────────
function CertPlaceholder() {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 16,
      background: "linear-gradient(160deg, rgba(247,148,29,0.05) 0%, transparent 80%)",
    }}>
      <svg width="80" height="80" viewBox="0 0 72 72" fill="none" style={{ opacity: 0.28 }}>
        <rect x="12" y="8" width="42" height="54" rx="3" stroke="#F7941D" strokeWidth="2" />
        <rect x="18" y="6" width="42" height="54" rx="3" stroke="#F7941D" strokeWidth="1.2" strokeDasharray="4 3" />
        <line x1="20" y1="26" x2="46" y2="26" stroke="#F7941D" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="34" x2="46" y2="34" stroke="#F7941D" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="42" x2="38" y2="42" stroke="#F7941D" strokeWidth="2" strokeLinecap="round" />
        <circle cx="33" cy="17" r="5" stroke="#F7941D" strokeWidth="1.5" />
        <path d="M30 17 L32 19 L36 15" stroke="#F7941D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{
        fontFamily: font,
        fontSize: 11, fontWeight: 600,
        letterSpacing: "0.15em", textTransform: "uppercase" as const,
        color: "rgba(247,148,29,0.45)",
      }}>Appreciation Certificate</span>
    </div>
  );
}

const font = "'Eurostile', 'Rajdhani', 'Arial Narrow', Arial, sans-serif";
const trans = "0.4s cubic-bezier(0.4,0,0.2,1)";
const orange = "#F7941D";
const dark = "#1a1a1a";

// ─── Main component ───────────────────────────────────────────────────────────
export default function Awards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [certFailed, setCertFailed] = useState(false);

  const switchTo = (index: number) => {
    if (index === activeIndex) return;
    setFading(true);
    setCertFailed(false);
    setTimeout(() => { setActiveIndex(index); setFading(false); }, 380);
  };

  const cur = awards[activeIndex];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&display=swap');

        .aw-root {
          font-family: ${font};
          display: flex;
          width: 100%;
          height: calc(100vh - 112px);
          min-height: 580px;
          overflow: hidden;
        }

        /* ── LEFT panel ── */
        .aw-left {
          background: ${dark};
          flex: 0 0 50%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .aw-cert-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .aw-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* ── RIGHT panel ── */
        .aw-right {
          background: ${orange};
          flex: 0 0 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 72px 72px 56px;
          position: relative;
          overflow: hidden;
        }

        .aw-right::after {
          content: '';
          position: absolute;
          bottom: -70px; right: -70px;
          width: 220px; height: 220px;
          border: 2px solid rgba(255,255,255,0.07);
          border-radius: 50%;
          pointer-events: none;
        }
        .aw-right::before {
          content: '';
          position: absolute;
          bottom: -24px; right: -24px;
          width: 130px; height: 130px;
          border: 2px solid rgba(255,255,255,0.07);
          border-radius: 50%;
          pointer-events: none;
        }

        .aw-heading {
          font-family: ${font};
          font-size: clamp(38px, 4.8vw, 72px);
          font-weight: 700;
          font-style: normal;
          color: #fff;
          line-height: 1.0;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          margin: 0 0 20px;
        }

        .aw-line {
          width: 52px; height: 3px;
          background: rgba(0,0,0,0.22);
          border-radius: 2px;
          margin-bottom: 30px;
          flex-shrink: 0;
        }

        .aw-sublabel {
          font-family: ${font};
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.32);
          margin-bottom: 8px;
        }

        .aw-award-name {
          font-family: ${font};
          font-size: clamp(17px, 1.8vw, 24px);
          font-weight: 700;
          color: rgba(0,0,0,0.5);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 22px;
          line-height: 1.2;
        }

        .aw-desc {
          font-family: ${font};
          font-size: clamp(15px, 1.45vw, 20px);
          font-weight: 400;
          color: rgba(255,255,255,0.92);
          line-height: 1.72;
          letter-spacing: 0.01em;
          max-width: 500px;
          margin: 0;
          flex: 1;
        }

        .aw-dots {
          display: flex;
          gap: 10px;
          margin-top: 48px;
          flex-shrink: 0;
          z-index: 1;
        }

        .aw-dot {
          width: 14px; height: 14px;
          border-radius: 50%;
          background: rgba(0,0,0,0.25);
          border: none; cursor: pointer;
          padding: 0; outline: none;
          transition: background 0.25s, transform 0.25s;
        }
        .aw-dot.active {
          background: #000;
          transform: scale(1.28);
        }
        .aw-dot:hover:not(.active) {
          background: rgba(0,0,0,0.45);
        }

        /* ════════════════════════════════════
           MOBILE  ≤ 768px
           Layout:
             1. Orange header block  (heading + line)
             2. Dark cert image
             3. Orange content block (sublabel + name + desc + dots)
        ════════════════════════════════════ */
        @media (max-width: 768px) {
          .aw-root {
            flex-direction: column;
            height: auto;
            min-height: unset;
          }

          /* Hide desktop panels */
          .aw-left  { display: none; }
          .aw-right { display: none; }

          /* Mobile header block */
          .aw-mob-header {
            background: ${orange};
            padding: 36px 28px 28px;
            position: relative;
            overflow: hidden;
          }
          .aw-mob-header::after {
            content: '';
            position: absolute;
            top: -40px; right: -40px;
            width: 160px; height: 160px;
            border: 2px solid rgba(255,255,255,0.07);
            border-radius: 50%;
            pointer-events: none;
          }

          .aw-mob-heading {
            font-family: ${font};
            font-size: clamp(32px, 9vw, 52px);
            font-weight: 700;
            font-style: italic;
            color: #fff;
            line-height: 1.0;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            margin: 0 0 18px;
          }

          .aw-mob-line {
            width: 44px; height: 3px;
            background: rgba(0,0,0,0.22);
            border-radius: 2px;
          }

          /* Mobile certificate image */
          .aw-mob-cert {
            background: ${dark};
            width: 100%;
            aspect-ratio: 4 / 3;
            position: relative;
            overflow: hidden;
            flex-shrink: 0;
          }

          .aw-mob-cert img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          /* Mobile content block */
          .aw-mob-content {
            background: ${orange};
            padding: 28px 28px 40px;
            position: relative;
            overflow: hidden;
          }
          .aw-mob-content::after {
            content: '';
            position: absolute;
            bottom: -50px; right: -50px;
            width: 180px; height: 180px;
            border: 2px solid rgba(255,255,255,0.07);
            border-radius: 50%;
            pointer-events: none;
          }

          .aw-mob-sublabel {
            font-family: ${font};
            font-size: 10px; font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(0,0,0,0.32);
            margin-bottom: 6px;
          }

          .aw-mob-award-name {
            font-family: ${font};
            font-size: clamp(15px, 4.5vw, 20px);
            font-weight: 700;
            color: rgba(0,0,0,0.5);
            letter-spacing: 0.04em;
            text-transform: uppercase;
            margin-bottom: 16px;
            line-height: 1.2;
          }

          .aw-mob-desc {
            font-family: ${font};
            font-size: clamp(14px, 4vw, 16px);
            font-weight: 400;
            color: rgba(255,255,255,0.92);
            line-height: 1.68;
            letter-spacing: 0.01em;
            margin: 0 0 24px;
          }

          .aw-mob-dots {
            display: flex;
            gap: 10px;
          }
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
                transition: `opacity ${trans}, transform ${trans}`,
                opacity: fading ? 0 : 1,
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
            <div className="aw-sublabel">Current Award</div>
            <div
              className="aw-award-name"
              style={{
                transition: `opacity ${trans}, transform ${trans}`,
                opacity: fading ? 0 : 1,
                transform: fading ? "translateY(6px)" : "translateY(0)",
              }}
            >{cur.alt}</div>
            <p
              className="aw-desc"
              style={{
                transition: `opacity ${trans}, transform ${trans}`,
                opacity: fading ? 0 : 1,
                transform: fading ? "translateY(12px)" : "translateY(0)",
              }}
            >{cur.description}</p>
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

        {/* ══ MOBILE: 2 — Certificate photo ══ */}
        <div className="aw-mob-cert">
          {!certFailed ? (
            <img
              key={`mob-${cur.certificate}`}
              src={cur.certificate}
              alt={`${cur.alt} certificate`}
              onError={() => setCertFailed(true)}
              style={{
                transition: `opacity ${trans}`,
                opacity: fading ? 0 : 1,
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
              transition: `opacity ${trans}, transform ${trans}`,
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(6px)" : "translateY(0)",
            }}
          >{cur.alt}</div>
          <p
            className="aw-mob-desc"
            style={{
              transition: `opacity ${trans}, transform ${trans}`,
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(10px)" : "translateY(0)",
            }}
          >{cur.description}</p>
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