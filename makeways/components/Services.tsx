'use client';

import { useState, useEffect } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  details: string[];
  row: number;
}

const services: Service[] = [
  {
    id: 1,
    title: "Integrated\nCampaign",
    description: "Seamless brand storytelling across every channel — TV, digital, print, and beyond — unified under one powerful strategy.",
    details: ["Multi-channel planning", "Unified brand messaging", "Cross-platform execution", "Campaign ROI tracking"],
    row: 1
  },
  {
    id: 2,
    title: "Brand Strategy\nand Consulting",
    description: "We define who you are, what you stand for, and how the world sees you — turning brand into competitive advantage.",
    details: ["Brand identity & positioning", "Market & competitor analysis", "Brand architecture", "Tone of voice development"],
    row: 1
  },
  {
    id: 3,
    title: "A/V\nProductions",
    description: "Cinematic-quality video and audio content that commands attention and moves audiences to action.",
    details: ["TVC & commercial production", "Corporate & documentary video", "Post-production & editing", "Sound design & voiceover"],
    row: 1
  },
  {
    id: 4,
    title: "Events &\nActivations",
    description: "Live brand experiences that create genuine emotional connections and lasting memories with your audience.",
    details: ["Brand activation events", "Product launches", "Experiential marketing", "End-to-end event production"],
    row: 1
  },
  {
    id: 5,
    title: "Digital\nMarketing",
    description: "Data-driven digital strategies that grow your presence, engage your audience, and convert at scale.",
    details: ["Social media management", "SEO & paid media", "Content strategy", "Analytics & reporting"],
    row: 2
  },
  {
    id: 6,
    title: "Influencer\nCampaign",
    description: "Authentic creator partnerships that extend your brand's reach and build trust through genuine voices.",
    details: ["Influencer identification", "Campaign strategy & briefing", "Content collaboration", "Performance measurement"],
    row: 2
  },
  {
    id: 7,
    title: "Media\nRelease",
    description: "Strategic PR and media buying that keeps your brand prominent, credible, and in the conversation.",
    details: ["Press release writing", "Media buying & planning", "PR strategy", "Crisis communications"],
    row: 2
  },
  {
    id: 8,
    title: "Design &\nFabrication",
    description: "Bold visual craft — from concept to physical production — that makes your brand impossible to ignore.",
    details: ["Graphic & print design", "Exhibition & booth design", "Signage & wayfinding", "Physical fabrication"],
    row: 2
  },
  {
    id: 9,
    title: "OOH",
    description: "Out-of-home advertising at scale — billboards, transit, and digital screens that dominate the landscape.",
    details: ["Billboard & transit ads", "DOOH strategy", "Site selection & booking", "Creative adaptation"],
    row: 2
  }
];

/* ─── Popup position helper (desktop only) ─── */
function getPopupPos(id: number) {
  if (id === 1 || id === 5) return 'popup-left';
  if (id === 4 || id === 9) return 'popup-right';
  return 'popup-center';
}

/* ─── Individual card ─── */
function ServiceCard({
  service,
  index,
  isMobile,
  isOpen,
  onToggle,
}: {
  service: Service;
  index: number;
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const popupPos = getPopupPos(service.id);
  const label = service.title.replace('\n', ' ');

  /* Mobile: tap expands inline accordion */
  if (isMobile) {
    return (
      <div className={`mob-card ${isOpen ? 'mob-card--open' : ''}`} onClick={onToggle}>
        <div className="mob-circle-wrap">
          <div className="mob-circle">
            <div className="mob-circle-inner" />
          </div>
          {isOpen && <div className="mob-open-indicator" />}
        </div>
        <p className="mob-label">{service.title}</p>

        {/* Expanded panel */}
        <div className={`mob-panel ${isOpen ? 'mob-panel--visible' : ''}`}>
          <div className="popup-eyebrow">Our Service</div>
          <h3 className="popup-title">{label}</h3>
          <p className="popup-desc">{service.description}</p>
          <div className="popup-divider" />
          <ul className="popup-items">
            {service.details.map((d, i) => (
              <li key={i}><span className="popup-dot" />{d}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  /* Desktop: hover popup */
  return (
    <div
      className="svc-card"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="svc-circle">
        <div className="svc-circle-inner" />
      </div>
      <p className="svc-label">{service.title}</p>

      <div className={`svc-popup ${popupPos}`}>
        <div className="popup-eyebrow">Our Service</div>
        <h3 className="popup-title">{label}</h3>
        <p className="popup-desc">{service.description}</p>
        <div className="popup-divider" />
        <ul className="popup-items">
          {service.details.map((d, i) => (
            <li key={i}><span className="popup-dot" />{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function Services() {
  const [isMobile, setIsMobile] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const toggle = (id: number) => setOpenId(prev => prev === id ? null : id);

  const row1 = services.filter(s => s.row === 1);
  const row2 = services.filter(s => s.row === 2);

  return (
    <>
      <section id="services" className="services-section">
        <div className="svc-container">
          <h2 className="section-title">SERVICES</h2>

          {isMobile ? (
            /* ── MOBILE GRID: 3 columns ── */
            <div className="mob-grid">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  isMobile={true}
                  isOpen={openId === service.id}
                  onToggle={() => toggle(service.id)}
                />
              ))}
            </div>
          ) : (
            /* ── DESKTOP: 2 rows ── */
            <>
              <div className="svc-row row-1">
                {row1.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={i}
                    isMobile={false}
                    isOpen={false}
                    onToggle={() => {}}
                  />
                ))}
              </div>
              <div className="svc-row row-2">
                {row2.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={i + 4}
                    isMobile={false}
                    isOpen={false}
                    onToggle={() => {}}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        /* ════════════════════════════════
           SECTION BASE
        ════════════════════════════════ */
        .services-section {
          background: linear-gradient(135deg, #F47B20 0%, #FFA500 100%);
          padding: 80px 60px 100px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: visible;
        }

        .svc-container {
          max-width: 1080px;
          margin: 0 auto;
        }

        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 54px;
          color: white;
          letter-spacing: 6px;
          margin: 0 0 64px 0;
          line-height: 1;
        }

        /* ════════════════════════════════
           DESKTOP — ROWS
        ════════════════════════════════ */
        .svc-row {
          display: flex;
          justify-content: center;
        }
        .row-1 { margin-bottom: 40px; }

        /* ── Card ── */
        .svc-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 190px;
          padding: 0 12px;
          cursor: pointer;
          animation: fadeUp 0.55s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Circle ── */
        .svc-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.7);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          transition: border-color 0.3s ease, background 0.3s ease,
                      transform 0.3s ease, box-shadow 0.3s ease;
        }
        .svc-card:hover .svc-circle {
          border-color: white;
          background: rgba(255,255,255,0.15);
          transform: scale(1.07);
          box-shadow: 0 0 0 6px rgba(255,255,255,0.12);
        }

        .svc-circle-inner {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          transition: background 0.3s ease;
        }
        .svc-card:hover .svc-circle-inner {
          background: rgba(255,255,255,0.22);
        }

        /* ── Label ── */
        .svc-label {
          font-size: 14px;
          font-weight: 500;
          color: #2C1000;
          text-align: center;
          line-height: 1.4;
          white-space: pre-line;
          margin: 0;
          transition: color 0.25s ease;
        }
        .svc-card:hover .svc-label { color: white; }

        /* ════════════════════════════════
           DESKTOP POPUP
        ════════════════════════════════ */
        .svc-popup {
          position: absolute;
          bottom: calc(100% + 16px);
          width: 260px;
          background: #fff;
          border-radius: 16px;
          padding: 22px 22px 18px;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.04),
            0 8px 24px rgba(0,0,0,0.10),
            0 24px 56px rgba(0,0,0,0.14);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 300;
        }
        .svc-popup::after {
          content: '';
          position: absolute;
          top: 100%;
          border: 9px solid transparent;
          border-top-color: #fff;
        }

        /* Center */
        .popup-center {
          left: 50%;
          transform: translateX(-50%) translateY(8px);
        }
        .svc-card:hover .popup-center {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }
        .popup-center::after { left: 50%; transform: translateX(-50%); }

        /* Left-anchored */
        .popup-left { left: 0; transform: translateY(8px); }
        .svc-card:hover .popup-left {
          opacity: 1; transform: translateY(0); pointer-events: auto;
        }
        .popup-left::after { left: 46px; }

        /* Right-anchored */
        .popup-right { right: 0; transform: translateY(8px); }
        .svc-card:hover .popup-right {
          opacity: 1; transform: translateY(0); pointer-events: auto;
        }
        .popup-right::after { right: 46px; }

        /* ════════════════════════════════
           SHARED POPUP CONTENT STYLES
           (used in both desktop & mobile)
        ════════════════════════════════ */
        .popup-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #F47B20;
          margin-bottom: 6px;
        }
        .popup-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #111;
          margin: 0 0 10px 0;
          line-height: 1.1;
        }
        .popup-desc {
          font-size: 12px;
          color: #666;
          line-height: 1.65;
          margin: 0 0 12px 0;
        }
        .popup-divider {
          height: 1px;
          background: #F0F0F0;
          margin-bottom: 10px;
        }
        .popup-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .popup-items li {
          font-size: 12px;
          color: #444;
          padding: 4px 0;
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .popup-dot {
          width: 5px;
          height: 5px;
          min-width: 5px;
          border-radius: 50%;
          background: #F47B20;
        }

        /* ════════════════════════════════
           MOBILE GRID
        ════════════════════════════════ */
        .mob-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px 12px;
        }

        /* ── Mobile card ── */
        .mob-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .mob-circle-wrap {
          position: relative;
          margin-bottom: 12px;
        }

        .mob-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.65);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
        }
        .mob-card--open .mob-circle {
          border-color: white;
          background: rgba(255,255,255,0.18);
          transform: scale(1.06);
        }

        .mob-circle-inner {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          transition: background 0.25s;
        }
        .mob-card--open .mob-circle-inner {
          background: rgba(255,255,255,0.22);
        }

        /* Small open indicator dot */
        .mob-open-indicator {
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
        }

        .mob-label {
          font-size: 11px;
          font-weight: 500;
          color: #2C1000;
          text-align: center;
          line-height: 1.35;
          white-space: pre-line;
          margin: 0;
          transition: color 0.2s;
        }
        .mob-card--open .mob-label { color: white; }

        /* ── Mobile expanded panel ── */
        /* 
          The expanded panel spans across the full grid width
          by using a full-width absolute row that pushes down via margin.
          We achieve this by making the panel a grid-column-spanning sibling
          via the "mob-panel-row" technique using display:contents + a full-span div.
          Simpler approach: each card is in a wrapper that is grid-column: span 1,
          but the panel is placed AFTER the grid as a separate styled element when open.
          
          Cleanest reliable approach for React: the panel is inside the card, 
          full viewport width, positioned to overflow outside the card 
          and sit below the row. We use a bottom-anchored sheet style.
        */
        .mob-panel {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #fff;
          border-radius: 20px 20px 0 0;
          padding: 24px 24px 36px;
          box-shadow: 0 -8px 40px rgba(0,0,0,0.18);
          z-index: 500;
          animation: slideUp 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        .mob-panel--visible {
          display: block;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* Close hint bar */
        .mob-panel::before {
          content: '';
          display: block;
          width: 40px;
          height: 4px;
          background: #E0E0E0;
          border-radius: 2px;
          margin: 0 auto 20px;
        }

        /* Backdrop overlay when panel is open */
        .mob-panel--visible ~ * {
          pointer-events: none;
        }

        /* ════════════════════════════════
           TABLET (768–1024px) — 2-row layout
           but slightly smaller cards
        ════════════════════════════════ */
        @media (min-width: 768px) and (max-width: 1024px) {
          .services-section { padding: 70px 40px 90px; }
          .svc-card { width: 155px; padding: 0 8px; }
          .svc-circle { width: 86px; height: 86px; }
          .svc-circle-inner { width: 52px; height: 52px; }
          .svc-label { font-size: 13px; }
          .svc-popup { width: 240px; }
        }

        /* ════════════════════════════════
           MOBILE BASE (< 768px)
        ════════════════════════════════ */
        @media (max-width: 767px) {
          .services-section {
            padding: 52px 20px 80px;
            overflow: hidden; /* clip any stray overflow */
          }
          .section-title {
            font-size: 40px;
            margin-bottom: 44px;
            letter-spacing: 4px;
          }
        }

        /* Smaller phones */
        @media (max-width: 380px) {
          .mob-grid { gap: 22px 8px; }
          .mob-circle { width: 60px; height: 60px; }
          .mob-circle-inner { width: 36px; height: 36px; }
          .mob-label { font-size: 10px; }
        }
      `}</style>

      {/* Backdrop for mobile panel — close on tap outside */}
      {isMobile && openId !== null && (
        <div
          onClick={() => setOpenId(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 499,
          }}
        />
      )}
    </>
  );
}