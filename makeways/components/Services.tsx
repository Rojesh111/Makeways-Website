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
  { id: 1, title: 'Integrated Campaign',   description: 'Seamless brand storytelling across every channel — TV, digital, print, and beyond — unified under one powerful strategy.',        details: ['Multi-channel planning', 'Unified brand messaging', 'Cross-platform execution', 'Campaign ROI tracking'],        row: 1 },
  { id: 2, title: 'Brand Strategy',        description: 'We define who you are, what you stand for, and how the world sees you — turning brand into competitive advantage.',              details: ['Brand identity & positioning', 'Market & competitor analysis', 'Brand architecture', 'Tone of voice'],           row: 1 },
  { id: 3, title: 'A/V Productions',       description: 'Cinematic-quality video and audio content that commands attention and moves audiences to action.',                               details: ['TVC & commercial production', 'Corporate & documentary video', 'Post-production & editing', 'Sound design'],     row: 1 },
  { id: 4, title: 'Events & Activations',  description: 'Live brand experiences that create genuine emotional connections and lasting memories with your audience.',                      details: ['Brand activation events', 'Product launches', 'Experiential marketing', 'End-to-end production'],                row: 1 },
  { id: 5, title: 'Digital Marketing',     description: 'Data-driven digital strategies that grow your presence, engage your audience, and convert at scale.',                            details: ['Social media management', 'SEO & paid media', 'Content strategy', 'Analytics & reporting'],                    row: 2 },
  { id: 6, title: 'Influencer Campaign',   description: "Authentic creator partnerships that extend your brand's reach and build trust through genuine voices.",                          details: ['Influencer identification', 'Campaign strategy', 'Content collaboration', 'Performance measurement'],            row: 2 },
  { id: 7, title: 'Media Release',         description: 'Strategic PR and media buying that keeps your brand prominent, credible, and in the conversation.',                              details: ['Press release writing', 'Media buying & planning', 'PR strategy', 'Crisis communications'],                    row: 2 },
  { id: 8, title: 'Design & Fabrication',  description: 'Bold visual craft — from concept to physical production — that makes your brand impossible to ignore.',                          details: ['Graphic & print design', 'Exhibition & booth design', 'Signage & wayfinding', 'Physical fabrication'],         row: 2 },
  { id: 9, title: 'OOH',                   description: 'Out-of-home advertising at scale — billboards, transit, and digital screens that dominate the landscape.',                       details: ['Billboard & transit ads', 'DOOH strategy', 'Site selection & booking', 'Creative adaptation'],                 row: 2 },
];

const icons: Record<number, React.ReactNode> = {
  1: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  2: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  3: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  4: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  5: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  6: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  7: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  8: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  9: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
};

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [openId,   setOpenId]   = useState<number | null>(null);
  const sectionRef              = useRef<HTMLElement>(null);

  const active = services.find(s => s.id === activeId) ?? null;
  const row1   = services.filter(s => s.row === 1);
  const row2   = services.filter(s => s.row === 2);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll<HTMLElement>('.animate')
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="services" className="svc" ref={sectionRef}>
        <div className="svc__inner">

          <h2 className="svc__heading animate">
            SERV<span className="svc__fade">ICES</span>
          </h2>

          {isMobile ? (
            <div className="mob-grid">
              {services.map(s => (
                <div
                  key={s.id}
                  className={`mob-card${openId === s.id ? ' mob-card--open' : ''}`}
                  onClick={() => setOpenId(p => p === s.id ? null : s.id)}
                >
                  <div className="mob-ring">
                    <span className="mob-icon">{icons[s.id]}</span>
                  </div>
                  <span className="mob-label">{s.title}</span>

                  {openId === s.id && (
                    <div className="mob-sheet">
                      <div className="mob-sheet__handle" />
                      <span className="mob-sheet__num">{String(s.id).padStart(2, '0')}</span>
                      <h3 className="mob-sheet__title">{s.title}</h3>
                      <p className="mob-sheet__desc">{s.description}</p>
                      <div className="mob-sheet__rule" />
                      <ul className="mob-sheet__list">
                        {s.details.map((d, i) => (
                          <li key={i}>
                            <span className="mob-sheet__i">{String(i + 1).padStart(2, '0')}</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="svc-wrap">

              {/* Row 1 */}
              <div className="svc-row svc-row--4">
                {row1.map((s, i) => (
                  <div
                    key={s.id}
                    className={`svc-card${activeId === s.id ? ' svc-card--on' : ''}`}
                    style={{ animationDelay: `${i * 0.07}s` }}
                    onMouseEnter={() => setActiveId(s.id)}
                    onMouseLeave={() => setActiveId(null)}
                  >
                    <div className="svc-ring">
                      <span className="svc-icon">{icons[s.id]}</span>
                    </div>
                    <span className="svc-num">{String(s.id).padStart(2, '0')}</span>
                    <span className="svc-label">{s.title}</span>
                  </div>
                ))}
              </div>

              {/* Detail strip row 1 */}
              <div className={`svc-strip${active?.row === 1 ? ' svc-strip--on' : ''}`}>
                {active?.row === 1 && <StripInner s={active} />}
              </div>

              {/* Row 2 */}
              <div className="svc-row svc-row--5">
                {row2.map((s, i) => (
                  <div
                    key={s.id}
                    className={`svc-card${activeId === s.id ? ' svc-card--on' : ''}`}
                    style={{ animationDelay: `${(i + 4) * 0.07}s` }}
                    onMouseEnter={() => setActiveId(s.id)}
                    onMouseLeave={() => setActiveId(null)}
                  >
                    <div className="svc-ring">
                      <span className="svc-icon">{icons[s.id]}</span>
                    </div>
                    <span className="svc-num">{String(s.id).padStart(2, '0')}</span>
                    <span className="svc-label">{s.title}</span>
                  </div>
                ))}
              </div>

              {/* Detail strip row 2 */}
              <div className={`svc-strip${active?.row === 2 ? ' svc-strip--on' : ''}`}>
                {active?.row === 2 && <StripInner s={active} />}
              </div>

            </div>
          )}
        </div>
      </section>

      {isMobile && openId !== null && (
        <div className="mob-overlay" onClick={() => setOpenId(null)} />
      )}

      <style jsx global>{`

        @font-face {
          font-family  : 'Eurostile';
          src          : url('/fonts/FONTS/EurostileBold.ttf') format('truetype');
          font-weight  : 700;
          font-style   : normal;
          font-display : swap;
        }
        @font-face {
          font-family  : 'Eurostile';
          src          : url('/fonts/FONTS/EurostileTBold.ttf') format('truetype');
          font-weight  : 800;
          font-style   : normal;
          font-display : swap;
        }
        @font-face {
          font-family  : 'Eurostile';
          src          : url('/fonts/FONTS/EurostileExtended.ttf') format('truetype');
          font-weight  : 900;
          font-style   : normal;
          font-display : swap;
        }
        @font-face {
          font-family  : 'Eurostile';
          src          : url('/fonts/FONTS/EurostileExt-Normal Regular.ttf') format('truetype');
          font-weight  : 400;
          font-style   : normal;
          font-display : swap;
          unicode-range: U+0020-00FF;
        }

        .svc,
        .svc * { font-style: normal !important; }

        /* ─── Section ───────────────────────────────────────────────── */
        .svc {
          background  : #f0f0f0;
          padding     : 96px 60px 112px;
          font-family : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          overflow    : hidden;
          position    : relative;
        }
        .svc__inner { max-width: 1280px; margin: 0 auto; }

        /* ─── Heading ───────────────────────────────────────────────── */
        .svc__heading {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 800;
          font-size      : clamp(36px, 3.75vw, 48px);
          letter-spacing : 8px;
          text-transform : uppercase;
          color          : #f47c20;
          margin         : 0 0 64px;
          line-height    : 1;
        }

        /* ─── Scroll reveal ─────────────────────────────────────────── */
        .animate { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .animate.visible { opacity: 1; transform: translateY(0); }

        /* ─── Desktop layout ────────────────────────────────────────── */
        .svc-wrap { display: flex; flex-direction: column; align-items: center; }
        .svc-row  { display: flex; max-width: 960px; width: 100%; padding: 4px 0 24px; }
        .svc-row--4 { justify-content: space-around; }
        .svc-row--5 { justify-content: space-between; }

        /* ─── Desktop card ──────────────────────────────────────────── */
        .svc-card {
          display        : flex;
          flex-direction : column;
          align-items    : center;
          gap            : 10px;
          width          : 140px;
          flex-shrink    : 0;
          cursor         : pointer;
          padding        : 4px 0;
          animation      : cardUp 0.5s ease both;
        }
        @keyframes cardUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Icon ring — outlined orange, fills solid on hover ─────── */
        .svc-ring {
          width           : 90px;
          height          : 90px;
          border-radius   : 50%;
          border          : 2px solid #f47c20;
          background      : transparent;
          display         : flex;
          align-items     : center;
          justify-content : center;
          transition      : background 0.22s ease;
          flex-shrink     : 0;
        }
        .svc-card--on   .svc-ring,
        .svc-card:hover .svc-ring {
          background : #f47c20;
        }

        /* ─── Icon — orange at rest, white on hover ─────────────────── */
        .svc-icon {
          color           : #f47c20;
          display         : flex;
          align-items     : center;
          justify-content : center;
          transition      : color 0.22s ease;
        }
        .svc-card--on   .svc-icon,
        .svc-card:hover .svc-icon { color: #ffffff; }

        /* ─── Card number ───────────────────────────────────────────── */
        .svc-num {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 800;
          font-size      : 9px;
          letter-spacing : 2px;
          color          : rgba(0, 0, 0, 0.3);
          line-height    : 1;
          display        : block;
          transition     : color 0.22s ease;
        }
        .svc-card--on   .svc-num,
        .svc-card:hover .svc-num { color: #f47c20; }

        /* ─── Card label ────────────────────────────────────────────── */
        .svc-label {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 400;
          font-size      : clamp(10px, 0.8vw, 12px);
          letter-spacing : 0.5px;
          color          : rgba(0, 0, 0, 0.55);
          text-align     : center;
          line-height    : 1.45;
          display        : block;
          transition     : color 0.22s ease;
        }
        .svc-card--on   .svc-label,
        .svc-card:hover .svc-label { color: #1a1a1a; }

        /* ─── Detail strip container ────────────────────────────────── */
        .svc-strip {
          width      : 100%;
          max-width  : 960px;
          height     : 0;
          overflow   : hidden;
          opacity    : 0;
          margin     : 0 auto;
          transition : height 0.38s cubic-bezier(0.4, 0, 0.2, 1),
                       opacity 0.28s ease,
                       margin-bottom 0.38s ease;
        }
        .svc-strip--on { height: 116px; opacity: 1; margin-bottom: 32px; }

        /* ─── Strip inner — orange bg, white text ───────────────────── */
        .strip {
          display               : grid;
          grid-template-columns : 72px 1fr 280px;
          gap                   : 0 28px;
          align-items           : center;
          height                : 116px;
          background            : #f47c20;
          border-radius         : 8px;
          padding               : 20px 28px;
          box-sizing            : border-box;
          box-shadow            : 0 8px 32px rgba(244, 124, 32, 0.35);
          animation             : stripIn 0.32s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes stripIn {
          from { opacity: 0; transform: translateY(-10px) scaleY(0.92); }
          to   { opacity: 1; transform: translateY(0)     scaleY(1); }
        }

        .strip__num {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 900;
          font-size      : clamp(36px, 3.8vw, 48px);
          color          : rgba(255, 255, 255, 0.2);
          line-height    : 1;
          letter-spacing : -2px;
          display        : block;
        }

        .strip__body { display: flex; flex-direction: column; gap: 7px; }

        .strip__title {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 800;
          font-size      : clamp(12px, 1vw, 15px);
          letter-spacing : 3px;
          text-transform : uppercase;
          color          : #ffffff;
          line-height    : 1;
          display        : block;
        }

        .strip__desc {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 400;
          font-size      : clamp(11px, 0.85vw, 13px);
          color          : rgba(255, 255, 255, 0.92);
          line-height    : 1.65;
          letter-spacing : 0.2px;
          display        : block;
        }

        .strip__tags {
          display               : grid;
          grid-template-columns : 1fr 1fr;
          gap                   : 5px;
          align-content         : center;
        }
        .strip__tag {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 600;
          font-size      : 9px;
          letter-spacing : 1.2px;
          text-transform : uppercase;
          color          : #ffffff;
          border         : 1px solid rgba(255, 255, 255, 0.55);
          border-radius  : 3px;
          padding        : 5px 8px;
          white-space    : nowrap;
          overflow       : hidden;
          text-overflow  : ellipsis;
          display        : block;
          transition     : background 0.18s ease, border-color 0.18s ease;
        }
        .strip__tag:hover { background: rgba(255,255,255,0.2); border-color: #ffffff; }

        /* ─── MOBILE ────────────────────────────────────────────────── */
        .mob-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px 12px; }
        .mob-card {
          display                    : flex;
          flex-direction             : column;
          align-items                : center;
          gap                        : 8px;
          cursor                     : pointer;
          -webkit-tap-highlight-color: transparent;
        }

        /* Mobile ring — outlined orange, fills on open */
        .mob-ring {
          width           : 64px;
          height          : 64px;
          border-radius   : 50%;
          border          : 2px solid #f47c20;
          background      : transparent;
          display         : flex;
          align-items     : center;
          justify-content : center;
          transition      : background 0.22s ease;
          flex-shrink     : 0;
        }
        .mob-card--open .mob-ring {
          background : #f47c20;
        }

        /* Mobile icon — orange at rest, white when open */
        .mob-icon {
          color           : #f47c20;
          display         : flex;
          align-items     : center;
          justify-content : center;
          transition      : color 0.22s ease;
        }
        .mob-card--open .mob-icon { color: #ffffff; }

        .mob-label {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 400;
          font-size      : clamp(9px, 2.4vw, 11px);
          letter-spacing : 0.4px;
          color          : rgba(0, 0, 0, 0.55);
          text-align     : center;
          line-height    : 1.4;
          display        : block;
          transition     : color 0.2s ease;
        }
        .mob-card--open .mob-label { color: #1a1a1a; }

        .mob-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 499; }

        /* Mobile sheet */
        .mob-sheet {
          position      : fixed;
          bottom        : 0; left: 0; right: 0;
          background    : #f47c20;
          border-radius : 16px 16px 0 0;
          padding       : 0 24px 44px;
          z-index       : 500;
          animation     : sheetUp 0.28s ease both;
          max-height    : 70vh;
          overflow-y    : auto;
        }
        @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

        .mob-sheet__handle { width: 36px; height: 3px; background: rgba(255,255,255,0.4); border-radius: 2px; margin: 14px auto 22px; }
        .mob-sheet__num    { font-family: 'Eurostile','Arial Narrow',Arial,sans-serif; font-weight: 800; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.7); display: block; margin-bottom: 6px; }
        .mob-sheet__title  { font-family: 'Eurostile','Arial Narrow',Arial,sans-serif; font-weight: 800; font-size: clamp(18px,4.5vw,22px); letter-spacing: 1.5px; text-transform: uppercase; color: #ffffff; line-height: 1.15; margin: 0 0 12px; }
        .mob-sheet__desc   { font-family: 'Eurostile','Arial Narrow',Arial,sans-serif; font-weight: 400; font-size: clamp(13px,3.5vw,15px); color: rgba(255,255,255,0.9); line-height: 1.75; letter-spacing: 0.2px; margin: 0 0 16px; display: block; }
        .mob-sheet__rule   { height: 1px; background: rgba(255,255,255,0.3); margin: 0 0 14px; }
        .mob-sheet__list   { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .mob-sheet__list li { display: flex; align-items: center; gap: 12px; font-family: 'Eurostile','Arial Narrow',Arial,sans-serif; font-weight: 400; font-size: clamp(12px,3vw,14px); color: #ffffff; letter-spacing: 0.2px; line-height: 1.4; }
        .mob-sheet__i      { font-family: 'Eurostile','Arial Narrow',Arial,sans-serif; font-weight: 800; font-size: 9px; letter-spacing: 1.5px; color: rgba(255,255,255,0.65); flex-shrink: 0; }

        /* ─── Responsive ────────────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1100px) {
          .svc                    { padding: 72px 40px 96px; }
          .svc__heading           { margin-bottom: 52px; }
          .svc-card               { width: 120px; }
          .svc-ring               { width: 76px; height: 76px; }
          .svc-row--4,.svc-row--5 { max-width: 780px; }
          .strip                  { grid-template-columns: 56px 1fr; height: auto; min-height: 90px; }
          .strip__tags            { display: none; }
          .svc-strip--on          { height: auto; min-height: 90px; }
        }
        @media (max-width: 767px) {
          .svc          { padding: 56px 20px 80px; }
          .svc__heading { font-size: clamp(28px,7vw,36px); letter-spacing: 5px; margin-bottom: 40px; }
        }
        @media (max-width: 520px) {
          .svc__heading { font-size: clamp(24px,7vw,30px); letter-spacing: 4px; margin-bottom: 32px; }
          .mob-grid     { gap: 22px 10px; }
        }
        @media (max-width: 380px) { .mob-ring { width: 56px; height: 56px; } }
        @media (max-width: 360px) {
          .svc          { padding: 44px 16px 64px; }
          .svc__heading { font-size: 24px; letter-spacing: 3px; margin-bottom: 28px; }
        }
      `}</style>
    </>
  );
}

function StripInner({ s }: { s: Service }) {
  return (
    <div className="strip">
      <span className="strip__num">{String(s.id).padStart(2, '0')}</span>
      <div className="strip__body">
        <span className="strip__title">{s.title}</span>
        <span className="strip__desc">{s.description}</span>
      </div>
      <div className="strip__tags">
        {s.details.map((d, i) => (
          <span key={i} className="strip__tag">{d}</span>
        ))}
      </div>
    </div>
  );
}