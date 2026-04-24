'use client';

import { useState, useEffect, useRef } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  row: number;
}

const services: Service[] = [
  { id: 1, title: 'Integrated Campaign', description: 'Seamless brand storytelling across every channel — TV, digital, print, and beyond unified under one powerful strategy.', row: 1 },
  { id: 2, title: 'Brand Strategy', description: 'We define who you are, what you stand for, and how the world sees you turning brand into competitive advantage.', row: 1 },
  { id: 3, title: 'A/V Productions', description: 'Cinematic quality video and audio content that commands attention and moves audiences to action.', row: 1 },
  { id: 4, title: 'Events & Activations', description: 'Live brand experiences that create genuine emotional connections and lasting memories with your audience.', row: 1 },
  { id: 5, title: 'Digital Marketing', description: 'Data-driven digital strategies that grow your presence, engage your audience, and convert at scale.', row: 2 },
  { id: 6, title: 'Influencer Campaign', description: "Authentic creator partnerships that extend your brand's reach and build trust through genuine voices.", row: 2 },
  { id: 7, title: 'Media Release', description: 'Strategic PR and media buying that keeps your brand prominent, credible, and in the conversation.', row: 2 },
  { id: 8, title: 'Design & Fabrication', description: 'Bold visual craft from concept to physical production that makes your brand impossible to ignore.', row: 2 },
  { id: 9, title: 'OOH', description: 'Out-of-home advertising at scale billboards, transit, and digital screens that dominate the landscape.', row: 2 },
];

const icons: Record<number, React.ReactNode> = {
  1: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  2: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
  3: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>,
  4: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  5: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
  6: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
  7: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  8: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  9: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
};

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const active = services.find(s => s.id === activeId) ?? null;
  const row1 = services.filter(s => s.row === 1);
  const row2 = services.filter(s => s.row === 2);

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

          {/* H2 heading */}
          <h2 className="svc__heading animate">
            SERV<span className="svc__heading--fade">ICES</span>
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
                  {/* H4/overline: EurostileCnd · 12–13px · ls 0.1em */}
                  <span className="mob-label">{s.title}</span>

                  {openId === s.id && (
                    <div className="mob-sheet">
                      <div className="mob-sheet__handle" aria-hidden="true" />
                      {/* H3: Eurostile 700 · 20–24px · lh 1.3 · ls 0em */}
                      <h3 className="mob-sheet__title">{s.title}</h3>
                      {/* Body: Eurostile 400 · 16px · lh 1.6 · ls 0.01em */}
                      <p className="mob-sheet__desc">{s.description}</p>
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
                    {/* H4/overline: EurostileCnd · 12–14px · ls 0.1em */}
                    <span className="svc-label">{s.title}</span>
                  </div>
                ))}
              </div>

              {/* Detail strip — row 1 */}
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
                    <span className="svc-label">{s.title}</span>
                  </div>
                ))}
              </div>

              {/* Detail strip — row 2 */}
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

      {/*
        NO @font-face here — fonts are declared once in globals.css.
        Components only reference font-family names.
      */}
      <style jsx global>{`

        /* ── Section ── */
        .svc {
          background  : #f0f0f0;
          padding     : 96px 60px 112px;
          font-family : var(--font-primary);
          font-style  : normal;
          overflow    : hidden;
          position    : relative;
        }
        .svc__inner { max-width: 1280px; margin: 0 auto; }

        /* ── H2 heading — Eurostile 700 · lh 1.2 · ls -0.01em ── */
        .svc__heading {
          font-family    : var(--font-primary);
          font-weight    : 700;
          font-size      : clamp(40px, 3.75vw, 48px);
          line-height    : 1.2;
          letter-spacing : -0.01em;
          text-transform : uppercase;
          color          : #9a9a9a;
          margin         : 0 0 64px;
        }
        .svc__heading--fade { color: #9a9a9a; }

        /* ── Desktop layout ── */
        .svc-wrap { display: flex; flex-direction: column; align-items: center; }
        .svc-row  { display: flex; max-width: 960px; width: 100%; padding: 4px 0 24px; }
        .svc-row--4 { justify-content: space-around; }
        .svc-row--5 { justify-content: space-between; }

        /* ── Desktop card ── */
        .svc-card {
          display        : flex;
          flex-direction : column;
          align-items    : center;
          gap            : 12px;
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

        /* ── Icon ring ── */
        .svc-ring {
          width            : 90px;
          height           : 90px;
          border-radius    : 50%;
          border           : 2px solid #f47c20;
          background       : transparent;
          display          : flex;
          align-items      : center;
          justify-content  : center;
          flex-shrink      : 0;
          transition       : background 0.22s ease;
        }
        .svc-card--on .svc-ring,
        .svc-card:hover .svc-ring { background: #f47c20; }

        .svc-icon {
          color           : #f47c20;
          display         : flex;
          align-items     : center;
          justify-content : center;
          transition      : color 0.22s ease;
        }
        .svc-card--on .svc-icon,
        .svc-card:hover .svc-icon { color: #ffffff; }

        /* ── Card label — EurostileCnd 700 · 12–14px · lh 1.5 · ls 0.1em ── */
        .svc-label {
          font-family    : var(--font-condensed);
          font-weight    : 700;
          font-size      : clamp(12px, 1vw, 14px);
          line-height    : 1.5;
          letter-spacing : 0.1em;
          text-transform : uppercase;
          color          : rgba(0, 0, 0, 0.55);
          text-align     : center;
          display        : block;
          transition     : color 0.22s ease;
        }
        .svc-card--on .svc-label,
        .svc-card:hover .svc-label { color: #1a1a1a; }

        /* ── Detail strip ── */
        .svc-strip {
          width         : 100%;
          max-width     : 960px;
          height        : 0;
          overflow      : hidden;
          opacity       : 0;
          margin        : 0 auto;
          transition    :
            height        0.38s cubic-bezier(0.4, 0, 0.2, 1),
            opacity       0.28s ease,
            margin-bottom 0.38s ease;
        }
        .svc-strip--on { height: 120px; opacity: 1; margin-bottom: 32px; }

        .strip {
          display         : flex;
          flex-direction  : column;
          justify-content : center;
          gap             : 8px;
          height          : 120px;
          background      : #f47c20;
          border-radius   : 8px;
          padding         : 20px 28px;
          box-sizing      : border-box;
          box-shadow      : 0 8px 32px rgba(244, 124, 32, 0.35);
          animation       : stripIn 0.32s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes stripIn {
          from { opacity: 0; transform: translateY(-10px) scaleY(0.92); }
          to   { opacity: 1; transform: translateY(0) scaleY(1); }
        }

        .strip__body { display: flex; flex-direction: column; gap: 8px; }

        /* Strip title — EurostileCnd 700 · 12–14px · ls 0.12em */
        .strip__title {
          font-family    : var(--font-condensed);
          font-weight    : 700;
          font-size      : clamp(12px, 1vw, 14px);
          line-height    : 1.5;
          letter-spacing : 0.12em;
          text-transform : uppercase;
          color          : #ffffff;
          display        : block;
        }

        /* Strip desc — Eurostile 400 · 13–15px · lh 1.6 · ls 0.01em */
        .strip__desc {
          font-family    : var(--font-primary);
          font-weight    : 400;
          font-size      : clamp(13px, 0.9vw, 15px);
          line-height    : 1.6;
          letter-spacing : 0.01em;
          color          : rgba(255, 255, 255, 0.92);
          display        : block;
        }

        /* ── Mobile grid ── */
        .mob-grid {
          display               : grid;
          grid-template-columns : repeat(3, 1fr);
          gap                   : 28px 12px;
        }
        .mob-card {
          display                     : flex;
          flex-direction              : column;
          align-items                 : center;
          gap                         : 8px;
          cursor                      : pointer;
          -webkit-tap-highlight-color : transparent;
        }
        .mob-ring {
          width            : 64px;
          height           : 64px;
          border-radius    : 50%;
          border           : 2px solid #f47c20;
          background       : transparent;
          display          : flex;
          align-items      : center;
          justify-content  : center;
          flex-shrink      : 0;
          transition       : background 0.22s ease;
        }
        .mob-card--open .mob-ring { background: #f47c20; }
        .mob-icon {
          color           : #f47c20;
          display         : flex;
          align-items     : center;
          justify-content : center;
          transition      : color 0.22s ease;
        }
        .mob-card--open .mob-icon { color: #ffffff; }

        /* Mobile label — EurostileCnd 700 · 11–13px · ls 0.1em */
        .mob-label {
          font-family    : var(--font-condensed);
          font-weight    : 700;
          font-size      : clamp(11px, 2.6vw, 13px);
          line-height    : 1.5;
          letter-spacing : 0.1em;
          text-transform : uppercase;
          color          : rgba(0, 0, 0, 0.55);
          text-align     : center;
          display        : block;
          transition     : color 0.2s ease;
        }
        .mob-card--open .mob-label { color: #1a1a1a; }

        /* ── Mobile bottom sheet ── */
        .mob-overlay {
          position   : fixed;
          inset      : 0;
          background : rgba(0, 0, 0, 0.5);
          z-index    : 499;
        }
        .mob-sheet {
          position      : fixed;
          bottom        : 0;
          left          : 0;
          right         : 0;
          background    : #f47c20;
          border-radius : 16px 16px 0 0;
          padding       : 0 24px 44px;
          z-index       : 500;
          animation     : sheetUp 0.28s ease both;
          max-height    : 70vh;
          overflow-y    : auto;
        }
        @keyframes sheetUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .mob-sheet__handle {
          width         : 36px;
          height        : 3px;
          background    : rgba(255, 255, 255, 0.4);
          border-radius : 2px;
          margin        : 14px auto 22px;
        }

        /* Sheet title — Eurostile 700 · 20–24px · lh 1.3 · ls 0em */
        .mob-sheet__title {
          font-family    : var(--font-primary);
          font-weight    : 700;
          font-size      : clamp(20px, 4.5vw, 24px);
          line-height    : 1.3;
          letter-spacing : 0em;
          text-transform : uppercase;
          color          : #ffffff;
          margin         : 0 0 12px;
        }

        /* Sheet desc — Eurostile 400 · 16px · lh 1.6 · ls 0.01em */
        .mob-sheet__desc {
          font-family    : var(--font-primary);
          font-weight    : 400;
          font-size      : 16px;
          line-height    : 1.6;
          letter-spacing : 0.01em;
          color          : rgba(255, 255, 255, 0.92);
          margin         : 0 0 16px;
          display        : block;
        }

        /* ── Responsive ── */
        @media (min-width: 768px) and (max-width: 1100px) {
          .svc                      { padding: 72px 40px 96px; }
          .svc__heading             { font-size: clamp(36px, 4vw, 44px); margin-bottom: 52px; }
          .svc-card                 { width: 120px; }
          .svc-ring                 { width: 76px; height: 76px; }
          .svc-row--4,
          .svc-row--5               { max-width: 780px; }
          .strip                    { height: auto; min-height: 90px; }
          .svc-strip--on            { height: auto; min-height: 90px; }
        }
        @media (max-width: 767px) {
          .svc          { padding: 56px 20px 80px; }
          .svc__heading { font-size: clamp(32px, 7vw, 40px); letter-spacing: -0.005em; margin-bottom: 40px; }
        }
        @media (max-width: 520px) {
          .svc__heading { font-size: clamp(28px, 7vw, 34px); margin-bottom: 32px; }
          .mob-grid     { gap: 22px 10px; }
        }
        @media (max-width: 380px) { .mob-ring { width: 56px; height: 56px; } }
        @media (max-width: 360px) {
          .svc          { padding: 44px 16px 64px; }
          .svc__heading { font-size: 28px; margin-bottom: 28px; }
          .mob-label    { font-size: 11px; letter-spacing: 0.08em; }
        }
      `}</style>
    </>
  );
}

function StripInner({ s }: { s: Service }) {
  return (
    <div className="strip">
      <div className="strip__body">
        <span className="strip__title">{s.title}</span>
        <span className="strip__desc">{s.description}</span>
      </div>
    </div>
  );
}