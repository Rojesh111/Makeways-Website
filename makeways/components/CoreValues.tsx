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
      "Creativity is the oxygen we breathe. We're always evolving, and our creative, entrepreneurial spirit uniquely empowers us to offer our clients fresh & friendly ideas to add value in their sectors and at large.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" /><path d="M10 22h4" />
        <path d="M8 14a6 6 0 1 1 8 0c-1 1-2 2-2 4h-4c0-2-1-3-2-4z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Strategically Driven',
    description:
      'Our creative eyes are always looking and breaking down the campaigns of companies who experience the results of a flourishing marketing strategy put into kinetic motion — to build business in both profile and profit.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Insightfully Social',
    description:
      'Businesses come in all shapes and sizes. We infuse the latest trends and social insights to connect and build seamless relationships with your target group — available every day, built on a rock-solid foundation.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Quality Obsessed',
    description:
      "What sets us apart is our obsession with quality — both in the work we carry out and in the care with which we serve our clients. At MAKEWAYS, we take our work too seriously without taking ourselves seriously.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
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

          <h2 className="cv__heading animate">OUR <span className="cv__heading--orange">DNA</span></h2>

          <div className="cv__grid">
            {values.map((v, i) => (
              <div
                key={v.id}
                className="cv__card animate"
                style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className="cv__icon-ring">
                  <div className="cv__icon">{v.icon}</div>
                </div>
                <h3 className="cv__title">{v.title}</h3>
                <div className="cv__rule" />
                <p className="cv__desc">{v.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <style jsx>{`
        /* ── @font-face ──────────────────────────────────────────────────── */
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

        /* ── Tokens ──────────────────────────────────────────────────────── */
        .cv {
          --eu     : 'Eurostile', 'Arial Narrow', sans-serif;
          --orange : #f47c20;
          --dark   : #1a1a1a;
          --muted  : #888888;
          --rule   : #e0e0e0;
          --bg     : #f0f0f0;
        }
        .cv *, .cv *::before, .cv *::after { box-sizing: border-box; }

        /* ── Section ─────────────────────────────────────────────────────── */
        .cv {
          background  : var(--bg);
          padding     : 80px 60px;
          font-family : var(--eu);
          width       : 100%;
          overflow-x  : hidden;
        }
        .cv__inner {
          max-width : 1280px;
          margin    : 0 auto;
        }

        /* ── Heading ─────────────────────────────────────────────────────── */
        .cv__heading {
          font-family    : var(--eu);
          font-weight    : 800;
          font-size      : 54px;
          letter-spacing : 6px;
          text-transform : uppercase;
          color          : var(--dark);
          margin         : 0 0 64px 0;
          line-height    : 1;
        }
        .cv__heading--orange { color: var(--orange); }

        /* ── 4-col grid ──────────────────────────────────────────────────── */
        .cv__grid {
          display               : grid;
          grid-template-columns : repeat(4, 1fr);
          gap                   : 48px 36px;
        }

        /* ── Card ────────────────────────────────────────────────────────── */
        .cv__card {
          display        : flex;
          flex-direction : column;
          align-items    : center;
          text-align     : center;
          transition     : transform 0.3s ease;
        }
        .cv__card:hover { transform: translateY(-6px); }

        /* ── Icon ring ───────────────────────────────────────────────────── */
        .cv__icon-ring {
          width         : 120px;
          height        : 120px;
          border        : 1.5px solid var(--orange);
          border-radius : 50%;
          display       : flex;
          align-items   : center;
          justify-content: center;
          margin-bottom : 28px;
          flex-shrink   : 0;
          transition    : background 0.35s cubic-bezier(0.68,-0.55,0.265,1.55),
                          transform  0.35s cubic-bezier(0.68,-0.55,0.265,1.55),
                          box-shadow 0.35s ease;
        }
        .cv__card:hover .cv__icon-ring {
          background : var(--orange);
          transform  : scale(1.08);
          box-shadow : 0 8px 28px rgba(244,124,32,0.28);
        }

        .cv__icon {
          color      : var(--orange);
          display    : flex;
          align-items: center;
          justify-content: center;
          transition : color 0.3s ease, transform 0.3s ease;
        }
        .cv__card:hover .cv__icon { color: #fff; transform: scale(1.1); }

        /* ── Title ───────────────────────────────────────────────────────── */
        .cv__title {
          font-family    : var(--eu);
          font-weight    : 700;
          font-size      : 13px;
          letter-spacing : 1.5px;
          text-transform : uppercase;
          color          : var(--dark);
          margin         : 0 0 14px 0;
          line-height    : 1.35;
          transition     : color 0.25s ease;
        }
        .cv__card:hover .cv__title { color: var(--orange); }

        /* ── Rule ────────────────────────────────────────────────────────── */
        .cv__rule {
          width      : 36px;
          height     : 2px;
          background : var(--rule);
          margin     : 0 auto 18px;
          transition : width 0.3s ease, background 0.3s ease;
        }
        .cv__card:hover .cv__rule { width: 52px; background: var(--orange); }

        /* ── Description ─────────────────────────────────────────────────── */
        .cv__desc {
          font-family    : var(--eu);
          font-weight    : 400;
          font-size      : 13px;
          color          : var(--muted);
          line-height    : 1.85;
          letter-spacing : 0.2px;
          margin         : 0;
        }

        /* ── Scroll animation ────────────────────────────────────────────── */
        .animate {
          opacity   : 0;
          transform : translateY(22px);
          transition:
            opacity   0.65s ease calc(var(--delay, 0s)),
            transform 0.65s ease calc(var(--delay, 0s));
        }
        .animate.visible { opacity: 1; transform: translateY(0); }

        /* ── 1024px ──────────────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .cv { padding: 70px 40px; }
          .cv__heading { font-size: 46px; margin-bottom: 52px; }
          .cv__grid { grid-template-columns: repeat(2, 1fr); gap: 44px 36px; }
          .cv__icon-ring { width: 100px; height: 100px; margin-bottom: 22px; }
        }

        /* ── 768px ───────────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          .cv { padding: 56px 24px; }
          .cv__heading { font-size: 40px; letter-spacing: 4px; margin-bottom: 44px; }
          .cv__grid { grid-template-columns: repeat(2, 1fr); gap: 36px 24px; }
          .cv__icon-ring { width: 88px; height: 88px; }
          .cv__title { font-size: 12px; }
          .cv__desc { font-size: 12px; line-height: 1.75; }
        }

        /* ── 520px ───────────────────────────────────────────────────────── */
        @media (max-width: 520px) {
          .cv { padding: 48px 20px; }
          .cv__heading { font-size: 32px; letter-spacing: 3px; margin-bottom: 36px; }
          .cv__grid { grid-template-columns: 1fr; gap: 36px; }
          .cv__icon-ring { width: 80px; height: 80px; margin-bottom: 18px; }
        }

        /* ── 360px ───────────────────────────────────────────────────────── */
        @media (max-width: 360px) {
          .cv { padding: 44px 16px; }
          .cv__heading { font-size: 27px; letter-spacing: 2px; margin-bottom: 28px; }
        }
      `}</style>
    </>
  );
}