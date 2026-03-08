'use client';

import { useEffect, useRef, JSX } from 'react';

interface Value {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const values: Value[] = [
  {
    id: 1,
    title: 'Creatively Led',
    description:
      "Creativity is the oxygen we breathe. We're always evolving, and our creative, entrepreneurial spirit uniquely empowers us to offer our clients fresh & friendly ideas to add value in their sectors and at large",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18h6" /><path d="M10 22h4" />
        <path d="M8 14a6 6 0 1 1 8 0c-1 1-2 2-2 4h-4c0-2-1-3-2-4z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Strategically Driven',
    description:
      'Our creative eyes are always looking and breaking down the campaigns of companies who experience the results of a flourishing marketing strategy put into kinetic motion to build business in both profile and profit',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Insightfully Social',
    description:
      'Businesses come in all shapes and sizes. We infuse the latest trends and social insights to connect and build seamless relationships with your target group available every day, built on a rock-solid foundation',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Quality Obsessed',
    description:
      "What sets us apart is our obsession with quality both in the work we carry out and in the care with which we serve our clients. At MAKEWAYS, we take our work too seriously without taking ourselves seriously",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

export default function CoreValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('.animate');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="cv" id="core-values" ref={sectionRef}>
        <div className="cv__inner">

          {/* H2 heading */}
          <h2 className="cv__heading animate">
            OUR <span className="cv__heading--accent">DNA</span>
          </h2>

          {/* 4-col card grid */}
          <div className="cv__grid">
            {values.map((v, i) => (
              <div
                key={v.id}
                className="cv__card animate"
                style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className="cv__icon-ring" aria-hidden="true">
                  <div className="cv__icon">{v.icon}</div>
                </div>

                {/* H4/overline: EurostileCnd · 14–16px · ls 0.1em */}
                <h3 className="cv__title">{v.title}</h3>

                <div className="cv__rule" aria-hidden="true" />

                {/* Body: Eurostile 400 · 14–16px · lh 1.7 · ls 0.01em */}
                <p className="cv__desc">{v.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/*
        NO @font-face here — fonts are declared once in globals.css.
        Components only reference font-family names.
      */}
      <style jsx>{`

        /* ── Section ── */
        .cv {
          background  : #f0f0f0;
          padding     : 96px 60px;
          width       : 100%;
          overflow-x  : hidden;
          font-family : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
        }
        .cv__inner {
          max-width : 1280px;
          margin    : 0 auto;
        }

        /* ── H2 heading — Eurostile 700 · lh 1.2 · ls -0.01em ── */
        .cv__heading {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : clamp(40px, 3.75vw, 48px);
          line-height    : 1.2;
          letter-spacing : -0.01em;
          text-transform : uppercase;
          color          : #9a9a9a;
          margin         : 0 0 72px 0;
        }
        .cv__heading--accent { color: #9a9a9a; }

        /* ── 4-col grid ── */
        .cv__grid {
          display               : grid;
          grid-template-columns : repeat(4, 1fr);
          gap                   : 48px 40px;
        }

        /* ── Card ── */
        .cv__card {
          display        : flex;
          flex-direction : column;
          align-items    : center;
          text-align     : center;
          transition     : transform 0.3s ease;
        }
        .cv__card:hover { transform: translateY(-6px); }

        /* ── Icon ring ── */
        .cv__icon-ring {
          width            : 112px;
          height           : 112px;
          border           : 1.5px solid #f47c20;
          border-radius    : 50%;
          display          : flex;
          align-items      : center;
          justify-content  : center;
          margin-bottom    : 28px;
          flex-shrink      : 0;
          transition       :
            background  0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55),
            transform   0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55),
            box-shadow  0.35s ease;
        }
        .cv__card:hover .cv__icon-ring {
          background : #f47c20;
          transform  : scale(1.08);
          box-shadow : 0 8px 28px rgba(244, 124, 32, 0.28);
        }
        .cv__icon {
          color           : #f47c20;
          display         : flex;
          align-items     : center;
          justify-content : center;
          transition      : color 0.3s ease, transform 0.3s ease;
        }
        .cv__card:hover .cv__icon { color: #ffffff; transform: scale(1.1); }

        /* ── Card title — EurostileCnd 700 · 14–16px · lh 1.5 · ls 0.1em ── */
        .cv__title {
          font-family    : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : clamp(14px, 1.1vw, 16px);
          line-height    : 1.5;
          letter-spacing : 0.1em;
          text-transform : uppercase;
          color          : #1a1a1a;
          margin         : 0 0 12px 0;
          transition     : color 0.25s ease;
        }
        .cv__card:hover .cv__title { color: #f47c20; }

        /* ── Divider ── */
        .cv__rule {
          width      : 32px;
          height     : 2px;
          background : #d8d8d8;
          margin     : 0 auto 20px;
          transition : width 0.3s ease, background 0.3s ease;
        }
        .cv__card:hover .cv__rule { width: 48px; background: #f47c20; }

        /* ── Description — Eurostile 400 · 14–16px · lh 1.7 · ls 0.01em ── */
        .cv__desc {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 400;
          font-size      : clamp(14px, 1vw, 16px);
          line-height    : 1.7;
          letter-spacing : 0.01em;
          color          : #666666;
          margin         : 0 auto;
          text-align     : center;
          max-width      : 260px;
        }

        /* ── Scroll reveal ── */
        .animate {
          opacity    : 0;
          transform  : translateY(20px);
          transition :
            opacity   0.65s ease var(--delay, 0s),
            transform 0.65s ease var(--delay, 0s);
          will-change : opacity, transform;
        }
        .animate.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 1280px) {
          .cv          { padding: 80px 48px; }
          .cv__grid    { gap: 44px 32px; }
        }
        @media (max-width: 1024px) {
          .cv              { padding: 72px 40px; }
          .cv__heading     { font-size: clamp(36px, 4vw, 44px); margin-bottom: 56px; }
          .cv__grid        { grid-template-columns: repeat(2, 1fr); gap: 48px 36px; }
          .cv__icon-ring   { width: 96px; height: 96px; margin-bottom: 22px; }
        }
        @media (max-width: 768px) {
          .cv              { padding: 60px 24px; }
          .cv__heading     { font-size: clamp(32px, 5vw, 40px); margin-bottom: 48px; }
          .cv__grid        { grid-template-columns: repeat(2, 1fr); gap: 40px 24px; }
          .cv__icon-ring   { width: 88px; height: 88px; }
          .cv__title       { font-size: 13px; letter-spacing: 0.08em; }
          .cv__desc        { font-size: 14px; line-height: 1.65; }
        }
        @media (max-width: 520px) {
          .cv              { padding: 52px 20px; }
          .cv__heading     { font-size: clamp(28px, 7vw, 36px); margin-bottom: 40px; }
          .cv__grid        { grid-template-columns: 1fr; gap: 40px; }
          .cv__icon-ring   { width: 80px; height: 80px; margin-bottom: 18px; }
        }
        @media (max-width: 360px) {
          .cv              { padding: 44px 16px; }
          .cv__heading     { font-size: 28px; margin-bottom: 32px; }
          .cv__icon-ring   { width: 72px; height: 72px; }
          .cv__title       { font-size: 12px; }
          .cv__desc        { font-size: 13px; }
        }
      `}</style>
    </>
  );
}