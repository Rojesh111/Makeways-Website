'use client';

import { useState, useEffect, useRef } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  details: string[];
  row: number;
}

const services: Service[] = [
  { id: 1, title: 'Integrated\nCampaign', description: 'Seamless brand storytelling across every channel — TV, digital, print, and beyond — unified under one powerful strategy.', details: ['Multi-channel planning', 'Unified brand messaging', 'Cross-platform execution', 'Campaign ROI tracking'], row: 1 },
  { id: 2, title: 'Brand Strategy\nand Consulting', description: 'We define who you are, what you stand for, and how the world sees you — turning brand into competitive advantage.', details: ['Brand identity & positioning', 'Market & competitor analysis', 'Brand architecture', 'Tone of voice development'], row: 1 },
  { id: 3, title: 'A/V\nProductions', description: 'Cinematic-quality video and audio content that commands attention and moves audiences to action.', details: ['TVC & commercial production', 'Corporate & documentary video', 'Post-production & editing', 'Sound design & voiceover'], row: 1 },
  { id: 4, title: 'Events &\nActivations', description: 'Live brand experiences that create genuine emotional connections and lasting memories with your audience.', details: ['Brand activation events', 'Product launches', 'Experiential marketing', 'End-to-end event production'], row: 1 },
  { id: 5, title: 'Digital\nMarketing', description: 'Data-driven digital strategies that grow your presence, engage your audience, and convert at scale.', details: ['Social media management', 'SEO & paid media', 'Content strategy', 'Analytics & reporting'], row: 2 },
  { id: 6, title: 'Influencer\nCampaign', description: "Authentic creator partnerships that extend your brand's reach and build trust through genuine voices.", details: ['Influencer identification', 'Campaign strategy & briefing', 'Content collaboration', 'Performance measurement'], row: 2 },
  { id: 7, title: 'Media\nRelease', description: 'Strategic PR and media buying that keeps your brand prominent, credible, and in the conversation.', details: ['Press release writing', 'Media buying & planning', 'PR strategy', 'Crisis communications'], row: 2 },
  { id: 8, title: 'Design &\nFabrication', description: 'Bold visual craft — from concept to physical production — that makes your brand impossible to ignore.', details: ['Graphic & print design', 'Exhibition & booth design', 'Signage & wayfinding', 'Physical fabrication'], row: 2 },
  { id: 9, title: 'OOH', description: 'Out-of-home advertising at scale — billboards, transit, and digital screens that dominate the landscape.', details: ['Billboard & transit ads', 'DOOH strategy', 'Site selection & booking', 'Creative adaptation'], row: 2 },
];

const icons: Record<number, React.ReactNode> = {
  1: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  2: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  3: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  4: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  5: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  6: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  7: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  8: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  9: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
};

function getPopupPos(id: number) {
  if (id === 1 || id === 5) return 'popup-left';
  if (id === 4 || id === 9) return 'popup-right';
  return 'popup-center';
}

function ServiceCard({ service, index, isMobile, isOpen, onToggle }: {
  service: Service; index: number; isMobile: boolean; isOpen: boolean; onToggle: () => void;
}) {
  const label = service.title.replace('\n', ' ');

  if (isMobile) {
    return (
      <div className={`mob-card${isOpen ? ' mob-card--open' : ''}`} onClick={onToggle}>
        <div className="mob-ring-wrap">
          <div className="mob-ring"><div className="mob-icon">{icons[service.id]}</div></div>
          {isOpen && <div className="mob-open-dot" />}
        </div>
        <p className="mob-label">{service.title}</p>
        <div className={`mob-panel${isOpen ? ' mob-panel--visible' : ''}`}>
          <div className="pop-eyebrow">Our Service</div>
          <h3 className="pop-title">{label}</h3>
          <p className="pop-desc">{service.description}</p>
          <div className="pop-rule" />
          <ul className="pop-list">{service.details.map((d, i) => <li key={i}><span className="pop-dot" />{d}</li>)}</ul>
        </div>
      </div>
    );
  }

  return (
    <div className="svc-card" style={{ animationDelay: `${index * 0.07}s` }}>
      {/* ── FIX: icon now rendered INSIDE the ring, not a separate inner div ── */}
      <div className="svc-ring">
        <div className="svc-icon">{icons[service.id]}</div>
      </div>
      <p className="svc-label">{service.title}</p>
      <div className={`svc-popup ${getPopupPos(service.id)}`}>
        <div className="pop-eyebrow">Our Service</div>
        <h3 className="pop-title">{label}</h3>
        <p className="pop-desc">{service.description}</p>
        <div className="pop-rule" />
        <ul className="pop-list">{service.details.map((d, i) => <li key={i}><span className="pop-dot" />{d}</li>)}</ul>
      </div>
    </div>
  );
}

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);
  const [openId, setOpenId]     = useState<number | null>(null);
  const sectionRef              = useRef<HTMLElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll<HTMLElement>('.animate')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const row1 = services.filter(s => s.row === 1);
  const row2 = services.filter(s => s.row === 2);

  return (
    <>
      <section id="services" className="svc" ref={sectionRef}>
        <div className="svc__inner">
          <h2 className="svc__heading animate">SERV<span className="svc__heading--fade">ICES</span></h2>

          {isMobile ? (
            <div className="mob-grid">
              {services.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} isMobile isOpen={openId === s.id} onToggle={() => setOpenId(p => p === s.id ? null : s.id)} />
              ))}
            </div>
          ) : (
            /* ── FIX: unified grid-wrap so both rows share the same column grid ── */
            <div className="svc-grid-wrap">
              {/* Row 1 — 4 cards centred inside a max-width container */}
              <div className="svc-row svc-row--4">
                {row1.map((s, i) => <ServiceCard key={s.id} service={s} index={i} isMobile={false} isOpen={false} onToggle={() => {}} />)}
              </div>
              {/* Row 2 — 5 cards spread across same max-width */}
              <div className="svc-row svc-row--5">
                {row2.map((s, i) => <ServiceCard key={s.id} service={s} index={i + 4} isMobile={false} isOpen={false} onToggle={() => {}} />)}
              </div>
            </div>
          )}
        </div>
      </section>

      {isMobile && openId !== null && (
        <div onClick={() => setOpenId(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 499 }} />
      )}

      <style jsx global>{`
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileExt-Normal Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileBold.ttf') format('truetype'); font-weight: 700; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileTBold.ttf') format('truetype'); font-weight: 800; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileExt-Bold Regular.ttf') format('truetype'); font-weight: 900; font-style: normal; font-display: swap; }

        .svc {
          background : linear-gradient(135deg, #e8720e 0%, #f79028 55%, #ffa84a 100%);
          padding    : 80px 60px 100px;
          font-family: 'Eurostile', 'Arial Narrow', sans-serif;
          position   : relative;
          overflow   : visible;
        }
        .svc__inner { max-width: 1280px; margin: 0 auto; }

        /* ── Heading ──────────────────────────────────────────────────────── */
        .svc__heading {
          font-family    : 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight    : 800;
          font-size      : 54px;
          letter-spacing : 6px;
          text-transform : uppercase;
          color          : #fff;
          margin         : 0 0 72px 0;
          line-height    : 1;
        }
        .svc__heading--fade { opacity: 0.38; }

        .animate { opacity: 0; transform: translateY(22px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .animate.visible { opacity: 1; transform: translateY(0); }

        /* ── FIX: Grid wrapper — both rows share same max-width + alignment ── */
        .svc-grid-wrap {
          display        : flex;
          flex-direction : column;
          align-items    : center;
          gap            : 52px;
        }
        .svc-row {
          display         : flex;
          /* FIX: both rows constrained to same 1000px so columns visually align */
          max-width       : 1000px;
          width           : 100%;
        }
        /* 4-item row: space-around leaves equal breathing room either side */
        .svc-row--4 { justify-content: space-around; }
        /* 5-item row: space-between pins items to edges, matching overall width */
        .svc-row--5 { justify-content: space-between; }

        /* ── Desktop card ─────────────────────────────────────────────────── */
        .svc-card {
          position       : relative;
          display        : flex;
          flex-direction : column;
          align-items    : center;
          width          : 160px;
          flex-shrink    : 0;
          padding        : 0 8px;
          cursor         : pointer;
          animation      : svcUp 0.55s ease both;
        }
        @keyframes svcUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Desktop ring ─────────────────────────────────────────────────── */
        .svc-ring {
          width           : 108px;
          height          : 108px;
          border-radius   : 50%;
          border          : 1.5px solid rgba(255,255,255,0.65);
          display         : flex;
          align-items     : center;
          justify-content : center;
          margin-bottom   : 20px;
          transition      : border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .svc-card:hover .svc-ring {
          border-color : #fff;
          background   : rgba(255,255,255,0.16);
          transform    : scale(1.08);
          box-shadow   : 0 0 0 8px rgba(255,255,255,0.09);
        }

        /* ── FIX: icon in ring — was missing entirely on desktop ─────────── */
        .svc-icon {
          color           : rgba(255,255,255,0.88);
          display         : flex;
          align-items     : center;
          justify-content : center;
          transition      : color 0.3s, transform 0.3s;
        }
        .svc-card:hover .svc-icon { color: #fff; transform: scale(1.12); }

        /* ── FIX: label — was dark brown, invisible on orange bg ─────────── */
        .svc-label {
          font-family    : 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight    : 400;
          font-size      : 12px;
          letter-spacing : 0.5px;
          /* WAS: rgba(44,16,0,0.85) — near-black on orange = unreadable */
          color          : rgba(255,255,255,0.80);
          text-align     : center;
          line-height    : 1.5;
          white-space    : pre-line;
          margin         : 0;
          transition     : color 0.25s;
        }
        .svc-card:hover .svc-label { color: #fff; }

        /* ── Popup ────────────────────────────────────────────────────────── */
        .svc-popup {
          position       : absolute;
          bottom         : calc(100% + 16px);
          width          : 268px;
          background     : #fff;
          border-radius  : 14px;
          padding        : 22px 22px 18px;
          box-shadow     : 0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.10), 0 24px 56px rgba(0,0,0,0.14);
          opacity        : 0;
          pointer-events : none;
          transition     : opacity 0.22s ease, transform 0.22s ease;
          z-index        : 300;
        }
        .svc-popup::after { content: ''; position: absolute; top: 100%; border: 9px solid transparent; border-top-color: #fff; }
        .popup-center { left: 50%; transform: translateX(-50%) translateY(8px); }
        .svc-card:hover .popup-center { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
        .popup-center::after { left: 50%; transform: translateX(-50%); }
        .popup-left { left: 0; transform: translateY(8px); }
        .svc-card:hover .popup-left { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .popup-left::after { left: 40px; }
        .popup-right { right: 0; transform: translateY(8px); }
        .svc-card:hover .popup-right { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .popup-right::after { right: 40px; }

        .pop-eyebrow { font-family: 'Eurostile','Arial Narrow',sans-serif; font-weight: 700; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #f47c20; margin-bottom: 6px; }
        .pop-title   { font-family: 'Eurostile','Arial Narrow',sans-serif; font-weight: 800; font-size: 15px; letter-spacing: 1.5px; text-transform: uppercase; color: #1a1a1a; margin: 0 0 10px; line-height: 1.25; }
        .pop-desc    { font-family: 'Eurostile','Arial Narrow',sans-serif; font-weight: 400; font-size: 12px; color: #888; line-height: 1.78; margin: 0 0 12px; letter-spacing: 0.2px; }
        .pop-rule    { height: 1px; background: #ebebeb; margin-bottom: 10px; }
        .pop-list    { list-style: none; padding: 0; margin: 0; }
        .pop-list li { font-family: 'Eurostile','Arial Narrow',sans-serif; font-weight: 400; font-size: 12px; color: #555; padding: 4px 0; display: flex; align-items: center; gap: 10px; letter-spacing: 0.2px; line-height: 1.5; }
        .pop-dot     { width: 5px; height: 5px; min-width: 5px; border-radius: 50%; background: #f47c20; }

        /* ── Mobile ───────────────────────────────────────────────────────── */
        .mob-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px 16px; }
        .mob-card { display: flex; flex-direction: column; align-items: center; cursor: pointer; -webkit-tap-highlight-color: transparent; }
        .mob-ring-wrap { position: relative; margin-bottom: 12px; }
        .mob-ring { width: 72px; height: 72px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.65); display: flex; align-items: center; justify-content: center; transition: border-color 0.25s, background 0.25s, transform 0.25s; }
        .mob-card--open .mob-ring { border-color: #fff; background: rgba(255,255,255,0.18); transform: scale(1.06); }
        .mob-icon { color: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; transition: color 0.25s; }
        .mob-card--open .mob-icon { color: #fff; }
        .mob-open-dot { position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 6px; height: 6px; border-radius: 50%; background: #fff; }
        .mob-label { font-family: 'Eurostile','Arial Narrow',sans-serif; font-weight: 400; font-size: 11px; letter-spacing: 0.3px; color: rgba(255,255,255,0.80); text-align: center; line-height: 1.45; white-space: pre-line; margin: 0; transition: color 0.2s; }
        .mob-card--open .mob-label { color: #fff; }
        .mob-panel { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-radius: 20px 20px 0 0; padding: 28px 28px 44px; box-shadow: 0 -8px 40px rgba(0,0,0,0.18); z-index: 500; animation: sheetUp 0.28s cubic-bezier(0.25,0.46,0.45,0.94) both; }
        .mob-panel--visible { display: block; }
        @keyframes sheetUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .mob-panel::before { content: ''; display: block; width: 40px; height: 4px; background: #e0e0e0; border-radius: 2px; margin: 0 auto 22px; }

        /* ── Responsive ───────────────────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1100px) {
          .svc { padding: 70px 40px 90px; }
          .svc__heading { font-size: 46px; margin-bottom: 56px; }
          .svc-card { width: 140px; }
          .svc-ring { width: 90px; height: 90px; }
          .svc-row--4, .svc-row--5 { max-width: 780px; }
          .svc-popup { width: 240px; }
        }
        @media (max-width: 767px) { .svc { padding: 52px 20px 80px; overflow: hidden; } .svc__heading { font-size: 40px; letter-spacing: 4px; margin-bottom: 44px; } }
        @media (max-width: 520px) { .svc__heading { font-size: 32px; letter-spacing: 3px; margin-bottom: 36px; } .mob-grid { gap: 24px 12px; } }
        @media (max-width: 380px) { .mob-ring { width: 60px; height: 60px; } .mob-label { font-size: 10px; } }
        @media (max-width: 360px) { .svc { padding: 44px 16px 72px; } .svc__heading { font-size: 27px; letter-spacing: 2px; margin-bottom: 28px; } }
      `}</style>
    </>
  );
}