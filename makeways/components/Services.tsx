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
    row: 1,
  },
  {
    id: 2,
    title: "Brand Strategy\nand Consulting",
    description: "We define who you are, what you stand for, and how the world sees you — turning brand into competitive advantage.",
    details: ["Brand identity & positioning", "Market & competitor analysis", "Brand architecture", "Tone of voice development"],
    row: 1,
  },
  {
    id: 3,
    title: "A/V\nProductions",
    description: "Cinematic-quality video and audio content that commands attention and moves audiences to action.",
    details: ["TVC & commercial production", "Corporate & documentary video", "Post-production & editing", "Sound design & voiceover"],
    row: 1,
  },
  {
    id: 4,
    title: "Events &\nActivations",
    description: "Live brand experiences that create genuine emotional connections and lasting memories with your audience.",
    details: ["Brand activation events", "Product launches", "Experiential marketing", "End-to-end event production"],
    row: 1,
  },
  {
    id: 5,
    title: "Digital\nMarketing",
    description: "Data-driven digital strategies that grow your presence, engage your audience, and convert at scale.",
    details: ["Social media management", "SEO & paid media", "Content strategy", "Analytics & reporting"],
    row: 2,
  },
  {
    id: 6,
    title: "Influencer\nCampaign",
    description: "Authentic creator partnerships that extend your brand's reach and build trust through genuine voices.",
    details: ["Influencer identification", "Campaign strategy & briefing", "Content collaboration", "Performance measurement"],
    row: 2,
  },
  {
    id: 7,
    title: "Media\nRelease",
    description: "Strategic PR and media buying that keeps your brand prominent, credible, and in the conversation.",
    details: ["Press release writing", "Media buying & planning", "PR strategy", "Crisis communications"],
    row: 2,
  },
  {
    id: 8,
    title: "Design &\nFabrication",
    description: "Bold visual craft — from concept to physical production — that makes your brand impossible to ignore.",
    details: ["Graphic & print design", "Exhibition & booth design", "Signage & wayfinding", "Physical fabrication"],
    row: 2,
  },
  {
    id: 9,
    title: "OOH",
    description: "Out-of-home advertising at scale — billboards, transit, and digital screens that dominate the landscape.",
    details: ["Billboard & transit ads", "DOOH strategy", "Site selection & booking", "Creative adaptation"],
    row: 2,
  },
];

function getPopupPos(id: number) {
  if (id === 1 || id === 5) return 'popup-left';
  if (id === 4 || id === 9) return 'popup-right';
  return 'popup-center';
}

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
  const label = service.title.replace('\n', ' ');

  if (isMobile) {
    return (
      <div className={`mob-card${isOpen ? ' mob-card--open' : ''}`} onClick={onToggle}>
        <div className="mob-ring-wrap">
          <div className="mob-ring"><div className="mob-ring-inner" /></div>
          {isOpen && <div className="mob-open-dot" />}
        </div>
        <p className="mob-label">{service.title}</p>

        <div className={`mob-panel${isOpen ? ' mob-panel--visible' : ''}`}>
          <div className="pop-eyebrow">Our Service</div>
          <h3 className="pop-title">{label}</h3>
          <p className="pop-desc">{service.description}</p>
          <div className="pop-rule" />
          <ul className="pop-list">
            {service.details.map((d, i) => (
              <li key={i}><span className="pop-dot" />{d}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const popupPos = getPopupPos(service.id);

  return (
    <div className="svc-card" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="svc-ring"><div className="svc-ring-inner" /></div>
      <p className="svc-label">{service.title}</p>

      <div className={`svc-popup ${popupPos}`}>
        <div className="pop-eyebrow">Our Service</div>
        <h3 className="pop-title">{label}</h3>
        <p className="pop-desc">{service.description}</p>
        <div className="pop-rule" />
        <ul className="pop-list">
          {service.details.map((d, i) => (
            <li key={i}><span className="pop-dot" />{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);
  const [openId, setOpenId]     = useState<number | null>(null);

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
      <section id="services" className="svc">
        <div className="svc__inner">
          <h2 className="svc__heading">SERVICES</h2>

          {isMobile ? (
            <div className="mob-grid">
              {services.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i}
                  isMobile isOpen={openId === s.id} onToggle={() => toggle(s.id)} />
              ))}
            </div>
          ) : (
            <>
              <div className="svc-row svc-row--1">
                {row1.map((s, i) => (
                  <ServiceCard key={s.id} service={s} index={i}
                    isMobile={false} isOpen={false} onToggle={() => {}} />
                ))}
              </div>
              <div className="svc-row svc-row--2">
                {row2.map((s, i) => (
                  <ServiceCard key={s.id} service={s} index={i + 4}
                    isMobile={false} isOpen={false} onToggle={() => {}} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Backdrop for mobile panel */}
      {isMobile && openId !== null && (
        <div
          onClick={() => setOpenId(null)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.42)', zIndex:499 }}
        />
      )}

      <style jsx global>{`
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileExt-Normal Regular.ttf') format('truetype');
          font-weight: 400; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileBold.ttf') format('truetype');
          font-weight: 700; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileTBold.ttf') format('truetype');
          font-weight: 800; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileExt-Bold Regular.ttf') format('truetype');
          font-weight: 900; font-style: normal; font-display: swap;
        }

        /* ── Section ─────────────────────────────────────────── */
        .svc {
          background: linear-gradient(135deg, #f47c20 0%, #ffa500 100%);
          padding: 80px 60px 100px;        /* matches CoreValues top padding */
          font-family: 'Eurostile', 'Arial Narrow', sans-serif;
          position: relative;
          overflow: visible;
        }
        .svc__inner {
          max-width: 1280px;               /* matches CoreValues max-width */
          margin: 0 auto;
        }

        /* ── Section heading — IDENTICAL to CoreValues ───────── */
        .svc__heading {
          font-family: 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight: 800;
          font-size: 54px;                 /* same as cv__heading */
          letter-spacing: 6px;             /* same as cv__heading */
          text-transform: uppercase;
          color: #fff;                     /* white on orange vs dark on grey */
          margin: 0 0 64px 0;              /* same as cv__heading */
          line-height: 1;
        }

        /* ── Desktop rows ────────────────────────────────────── */
        .svc-row {
          display: flex;
          justify-content: center;
        }
        .svc-row--1 { margin-bottom: 40px; }

        /* ── Desktop card ────────────────────────────────────── */
        .svc-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 190px;
          padding: 0 12px;
          cursor: pointer;
          animation: svcUp 0.55s ease both;
        }
        @keyframes svcUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Desktop circle ──────────────────────────────────── */
        .svc-ring {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          transition: border-color 0.3s, background 0.3s,
                      transform 0.3s, box-shadow 0.3s;
        }
        .svc-card:hover .svc-ring {
          border-color: #fff;
          background: rgba(255,255,255,0.15);
          transform: scale(1.07);
          box-shadow: 0 0 0 6px rgba(255,255,255,0.12);
        }
        .svc-ring-inner {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255,255,255,0.10);
          transition: background 0.3s;
        }
        .svc-card:hover .svc-ring-inner { background: rgba(255,255,255,0.22); }

        /* ── Desktop label ───────────────────────────────────── */
        .svc-label {
          font-family: 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight: 400;
          font-size: 13px;                 /* matches cv__desc body size */
          letter-spacing: 0.5px;
          color: #2c1000;
          text-align: center;
          line-height: 1.45;
          white-space: pre-line;
          margin: 0;
          transition: color 0.25s;
        }
        .svc-card:hover .svc-label { color: #fff; }

        /* ── Desktop popup ───────────────────────────────────── */
        .svc-popup {
          position: absolute;
          bottom: calc(100% + 16px);
          width: 260px;
          background: #fff;
          border-radius: 14px;
          padding: 22px 22px 18px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.04),
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

        .popup-left { left: 0; transform: translateY(8px); }
        .svc-card:hover .popup-left { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .popup-left::after { left: 46px; }

        .popup-right { right: 0; transform: translateY(8px); }
        .svc-card:hover .popup-right { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .popup-right::after { right: 46px; }

        /* ── Shared popup content ─────────────────────────────
           ALL font sizes and spacing below are aligned with
           cv__title (14px/700) and cv__desc (13px/400)         */
        .pop-eyebrow {
          font-family: 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #f47c20;
          margin-bottom: 6px;
        }
        .pop-title {
          font-family: 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight: 800;
          font-size: 16px;                 /* slightly larger than cv__title for popup context */
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #1a1a1a;
          margin: 0 0 10px 0;
          line-height: 1.2;
        }
        .pop-desc {
          font-family: 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight: 400;
          font-size: 12px;                 /* slightly smaller for compact popup */
          color: #666;
          line-height: 1.75;
          margin: 0 0 12px 0;
          letter-spacing: 0.2px;
        }
        .pop-rule {
          height: 1px;
          background: #ebebeb;
          margin-bottom: 10px;
        }
        .pop-list {
          list-style: none;
          padding: 0; margin: 0;
        }
        .pop-list li {
          font-family: 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #444;
          padding: 4px 0;
          display: flex;
          align-items: center;
          gap: 10px;
          letter-spacing: 0.2px;
          line-height: 1.5;
        }
        .pop-dot {
          width: 5px; height: 5px;
          min-width: 5px;
          border-radius: 50%;
          background: #f47c20;
        }

        /* ── Mobile grid ──────────────────────────────────────── */
        .mob-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px 12px;
        }

        .mob-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .mob-ring-wrap { position: relative; margin-bottom: 12px; }
        .mob-ring {
          width: 72px; height: 72px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
        }
        .mob-card--open .mob-ring {
          border-color: #fff;
          background: rgba(255,255,255,0.18);
          transform: scale(1.06);
        }
        .mob-ring-inner {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.10);
          transition: background 0.25s;
        }
        .mob-card--open .mob-ring-inner { background: rgba(255,255,255,0.22); }

        .mob-open-dot {
          position: absolute;
          bottom: -4px; left: 50%;
          transform: translateX(-50%);
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #fff;
        }

        .mob-label {
          font-family: 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.3px;
          color: #2c1000;
          text-align: center;
          line-height: 1.4;
          white-space: pre-line;
          margin: 0;
          transition: color 0.2s;
        }
        .mob-card--open .mob-label { color: #fff; }

        /* ── Mobile bottom sheet panel ───────────────────────── */
        .mob-panel {
          display: none;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: #fff;
          border-radius: 20px 20px 0 0;
          padding: 28px 28px 40px;
          box-shadow: 0 -8px 40px rgba(0,0,0,0.18);
          z-index: 500;
          animation: sheetUp 0.28s cubic-bezier(0.25,0.46,0.45,0.94) both;
        }
        .mob-panel--visible { display: block; }

        @keyframes sheetUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .mob-panel::before {
          content: '';
          display: block;
          width: 40px; height: 4px;
          background: #e0e0e0;
          border-radius: 2px;
          margin: 0 auto 22px;
        }

        /* ── Responsive ──────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1024px) {
          .svc { padding: 70px 40px 90px; }
          .svc__heading { font-size: 46px; margin-bottom: 52px; }
          .svc-card { width: 155px; padding: 0 8px; }
          .svc-ring { width: 86px; height: 86px; }
          .svc-ring-inner { width: 52px; height: 52px; }
          .svc-label { font-size: 12px; }
          .svc-popup { width: 240px; }
        }

        @media (max-width: 767px) {
          .svc { padding: 52px 20px 80px; overflow: hidden; }
          .svc__heading { font-size: 40px; letter-spacing: 4px; margin-bottom: 44px; }
        }

        @media (max-width: 380px) {
          .mob-grid { gap: 22px 8px; }
          .mob-ring { width: 60px; height: 60px; }
          .mob-ring-inner { width: 36px; height: 36px; }
          .mob-label { font-size: 10px; }
        }
      `}</style>
    </>
  );
}