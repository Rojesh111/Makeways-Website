"use client";

import { useState } from "react";

// Award data - each entry has an image src, alt text, and description
const awards = [
  {
    id: 1,
    image: "/awards/award1.png", // Replace with actual image paths
    alt: "Gulf Award 2023",
    description:
      "Honored with the prestigious Gulf Excellence Award 2023 in recognition of outstanding performance, innovation, and commitment to delivering world-class lubricant solutions across the region.",
  },
  {
    id: 2,
    image: "/awards/award2.png",
    alt: "Best Distributor Award",
    description:
      "Recognized as the Best Distributor of the Year for consistently exceeding targets, maintaining superior customer service standards, and driving market expansion across key territories.",
  },
  {
    id: 3,
    image: "/awards/award3.png",
    alt: "Innovation Award",
    description:
      "Awarded the Innovation Excellence trophy for pioneering new approaches in lubricant distribution and setting benchmarks in supply chain efficiency and product quality assurance.",
  },
  {
    id: 4,
    image: "/awards/award4.png",
    alt: "Sustainability Award",
    description:
      "Received the Sustainability Leadership Award in acknowledgment of our unwavering dedication to environmentally responsible practices and green business transformation initiatives.",
  },
];

export default function Awards() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');

        /* Eurostile fallback stack */
        :root {
          --font-eurostile: 'Eurostile', 'Rajdhani', 'Arial Narrow', Arial, sans-serif;
          --orange: #F7941D;
          --dark: #1a1a1a;
          --transition: 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .awards-section {
          font-family: var(--font-eurostile);
          display: flex;
          flex-direction: row;
          width: 100%;
          height: calc(100vh - 112px);
          min-height: 560px;
          overflow: hidden;
        }

        /* ── LEFT PANEL (dark) ── */
        .awards-left {
          background-color: var(--dark);
          flex: 0 0 50%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 48px 32px;
          overflow: hidden;
        }

        .awards-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 40% 60%, rgba(247,148,29,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .trophy-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trophy-glow {
          position: absolute;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(247,148,29,0.18) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.12); opacity: 1; }
        }

        .trophy-placeholder {
          position: relative;
          width: clamp(180px, 18vw, 300px);
          height: clamp(260px, 55vh, 480px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          transition: opacity var(--transition), transform var(--transition);
          animation: floatTrophy 4s ease-in-out infinite;
        }

        .trophy-placeholder.fade-out {
          opacity: 0;
          transform: scale(0.92) translateY(8px);
        }

        .trophy-placeholder.fade-in {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .trophy-placeholder-label {
          font-family: var(--font-eurostile);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(247,148,29,0.5);
          text-align: center;
        }

        @keyframes floatTrophy {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        /* ── RIGHT PANEL (orange) ── */
        .awards-right {
          background-color: var(--orange);
          flex: 0 0 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
          padding: 80px 80px 60px 80px;
          position: relative;
          overflow: hidden;
        }

        .awards-right::after {
          content: '';
          position: absolute;
          bottom: -60px;
          right: -60px;
          width: 200px;
          height: 200px;
          border: 2px solid rgba(255,255,255,0.08);
          border-radius: 50%;
        }

        .awards-right::before {
          content: '';
          position: absolute;
          bottom: -20px;
          right: -20px;
          width: 120px;
          height: 120px;
          border: 2px solid rgba(255,255,255,0.08);
          border-radius: 50%;
        }

        .awards-heading {
          font-family: var(--font-eurostile);
          font-size: clamp(36px, 5vw, 72px);
          font-weight: 800;
          font-style: italic;
          color: #ffffff;
          line-height: 1.0;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          margin: 0 0 32px 0;
        }

        .awards-description {
          font-family: var(--font-eurostile);
          font-size: clamp(15px, 1.5vw, 20px);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.92);
          line-height: 1.7;
          letter-spacing: 0.01em;
          flex: 1;
          max-width: 520px;
          transition: opacity var(--transition), transform var(--transition);
        }

        .awards-description.fade-out {
          opacity: 0;
          transform: translateY(10px);
        }

        .awards-description.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── DOTS ── */
        .awards-dots {
          display: flex;
          gap: 12px;
          margin-top: 48px;
          position: relative;
          z-index: 1;
        }

        .awards-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.3);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.25s, transform 0.25s;
          outline: none;
        }

        .awards-dot.active {
          background: #000000;
          transform: scale(1.25);
        }

        .awards-dot:hover:not(.active) {
          background: rgba(0, 0, 0, 0.5);
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .awards-section {
            flex-direction: column;
            height: auto;
            min-height: unset;
          }

          /* On mobile: right (orange) goes first = heading only */
          .awards-right {
            order: 1;
            flex: unset;
            height: auto;
            padding: 48px 28px 28px 28px;
            justify-content: flex-start;
          }

          /* On mobile: left (dark / image) goes second */
          .awards-left {
            order: 2;
            flex: unset;
            height: auto;
            padding: 40px 28px;
            min-height: 300px;
          }

          /* On mobile: description panel goes third */
          .awards-description-mobile-panel {
            order: 3;
            background-color: var(--orange);
            padding: 0 28px 40px 28px;
          }

          .awards-heading {
            font-size: clamp(28px, 8vw, 40px);
          }

          .trophy-placeholder {
            width: 150px;
            height: 220px;
          }

          .trophy-glow {
            width: 200px;
            height: 200px;
          }

          .awards-description {
            display: none; /* hide inside right panel on mobile */
          }

          .awards-dots {
            display: none; /* hide dots inside right panel on mobile */
          }

          .mobile-description-text {
            font-family: var(--font-eurostile);
            font-size: clamp(14px, 4vw, 16px);
            font-weight: 400;
            color: rgba(255, 255, 255, 0.92);
            line-height: 1.65;
            letter-spacing: 0.01em;
            transition: opacity var(--transition), transform var(--transition);
            padding-bottom: 8px;
          }

          .mobile-description-text.fade-out {
            opacity: 0;
            transform: translateY(10px);
          }

          .mobile-description-text.fade-in {
            opacity: 1;
            transform: translateY(0);
          }

          .mobile-dots {
            display: flex;
            gap: 10px;
            margin-top: 24px;
            padding-bottom: 8px;
          }
        }

        @media (min-width: 769px) {
          .awards-description-mobile-panel {
            display: none;
          }
        }
      `}</style>

      <AwardsContent awards={awards} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </>
  );
}

interface Award {
  id: number;
  image: string;
  alt: string;
  description: string;
}

function AwardsContent({
  awards,
  activeIndex,
  setActiveIndex,
}: {
  awards: Award[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}) {
  const [fading, setFading] = useState(false);

  const handleDotClick = (index: number) => {
    if (index === activeIndex) return;
    setFading(true);
    setTimeout(() => {
      setActiveIndex(index);
      setFading(false);
    }, 350);
  };

  const currentAward = awards[activeIndex];

  return (
    <section className="awards-section">
      {/* LEFT – Trophy image */}
      <div className="awards-left">
        <div className="trophy-wrapper">
          <div className="trophy-glow" />
          {/* Replace the SVG below with your <img> once you have the real asset */}
          <div className={`trophy-placeholder ${fading ? "fade-out" : "fade-in"}`}>
            <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{maxWidth: '320px', maxHeight: '460px'}}>
              {/* Cup body */}
              <path
                d="M35 20 Q30 60 28 80 Q26 100 40 112 Q50 120 60 122 Q70 120 80 112 Q94 100 92 80 Q90 60 85 20 Z"
                fill="url(#cupGrad)"
                stroke="rgba(247,148,29,0.4)"
                strokeWidth="1"
              />
              {/* Flame / wing top */}
              <path
                d="M60 20 Q55 8 58 0 Q62 8 65 0 Q68 10 60 20Z"
                fill="url(#flameGrad)"
              />
              <path
                d="M48 22 Q38 12 42 4 Q50 14 55 18Z"
                fill="rgba(247,148,29,0.6)"
              />
              <path
                d="M72 22 Q82 12 78 4 Q70 14 65 18Z"
                fill="rgba(247,148,29,0.6)"
              />
              {/* Handles */}
              <path
                d="M35 40 Q18 40 18 60 Q18 78 34 78"
                stroke="url(#handleGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M85 40 Q102 40 102 60 Q102 78 86 78"
                stroke="url(#handleGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Stem */}
              <rect x="54" y="122" width="12" height="28" fill="url(#stemGrad)" rx="2" />
              {/* Base */}
              <path
                d="M30 150 Q34 146 86 146 Q90 150 92 160 Q88 166 32 166 Q28 160 30 150Z"
                fill="url(#baseGrad)"
              />
              <path
                d="M26 160 Q30 156 90 156 Q94 160 96 172 Q92 178 28 178 Q24 172 26 160Z"
                fill="url(#base2Grad)"
              />
              {/* Star on cup */}
              <path
                d="M60 55 L62.5 62 L70 62 L64 66.5 L66.5 74 L60 69.5 L53.5 74 L56 66.5 L50 62 L57.5 62 Z"
                fill="rgba(255,220,100,0.7)"
              />
              {/* Shine */}
              <ellipse cx="45" cy="60" rx="4" ry="10" fill="rgba(255,255,255,0.12)" transform="rotate(-15 45 60)" />

              <defs>
                <linearGradient id="cupGrad" x1="35" y1="20" x2="85" y2="122" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D4A017" />
                  <stop offset="40%" stopColor="#F7C948" />
                  <stop offset="100%" stopColor="#A07010" />
                </linearGradient>
                <linearGradient id="flameGrad" x1="60" y1="0" x2="60" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fff5c0" />
                  <stop offset="100%" stopColor="#F7941D" />
                </linearGradient>
                <linearGradient id="handleGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#F7C948" />
                  <stop offset="100%" stopColor="#A07010" />
                </linearGradient>
                <linearGradient id="stemGrad" x1="54" y1="122" x2="66" y2="150" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C49010" />
                  <stop offset="100%" stopColor="#8A6A00" />
                </linearGradient>
                <linearGradient id="baseGrad" x1="30" y1="146" x2="92" y2="166" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C49010" />
                  <stop offset="50%" stopColor="#F0C040" />
                  <stop offset="100%" stopColor="#A07010" />
                </linearGradient>
                <linearGradient id="base2Grad" x1="26" y1="156" x2="96" y2="178" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8A6A00" />
                  <stop offset="50%" stopColor="#C49010" />
                  <stop offset="100%" stopColor="#6A5000" />
                </linearGradient>
              </defs>
            </svg>
            <span className="trophy-placeholder-label">Award Image</span>
          </div>
        </div>
      </div>

      {/* RIGHT – Heading + description (desktop) */}
      <div className="awards-right">
        <div>
          <h2 className="awards-heading">
            Awards &<br />Recognitions
          </h2>
          <p className={`awards-description ${fading ? "fade-out" : "fade-in"}`}>
            {currentAward.description}
          </p>
        </div>
        <div className="awards-dots">
          {awards.map((_, i) => (
            <button
              key={i}
              className={`awards-dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => handleDotClick(i)}
              aria-label={`Award ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* MOBILE-ONLY – description below image */}
      <div className="awards-description-mobile-panel">
        <p className={`mobile-description-text ${fading ? "fade-out" : "fade-in"}`}>
          {currentAward.description}
        </p>
        <div className="mobile-dots">
          {awards.map((_, i) => (
            <button
              key={i}
              className={`awards-dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => handleDotClick(i)}
              aria-label={`Award ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}