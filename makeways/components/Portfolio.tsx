'use client';

import Link from 'next/link';

/*
  Font family roles — matches the system-wide convention:
    'EurostileExt'  — large display title (PORTFOLIO)
    'EurostileCnd'  — category labels below circles
    'Eurostile'     — fallback / base

  NO font-weight: 900 — Eurostile has no 900 variant, 700 = bold.
  NO 'Arial Black' fallback — replaced with proper Eurostile stack.
  Color token: #f47c20 (unified across all components).

  Categories: TVC | STATIC (print + digital) | EVENT | JINGLE | ACTIVATION
*/

const categories = [
  {
    label: 'TVC',
    href: '/portfolio/tvc',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="13" rx="2" ry="2" />
        <polyline points="17 2 12 7 7 2" />
      </svg>
    ),
  },
  {
    // STATIC = Print + Digital
    label: 'STATIC',
    href: '/portfolio/static',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    ),
  },
  {
    label: 'EVENT',
    href: '/portfolio/eventss',
    icon: (
      // Calendar icon — more fitting for events
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: 'JINGLE',
    href: '/portfolio/jingle',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    label: 'ACTIVATION',
    href: '/portfolio/activation',
    icon: (
      // Megaphone/bullhorn icon — brand activation, campaigns, experiential
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
  },
];

export default function Portfolio() {
  return (
    <>
      <section id="portfolio" className="portfolio">
        <div className="portfolio__inner">

          {/* Big display title */}
          <h2 className="portfolio__title">PORTFOLIO</h2>

          {/* Circle buttons */}
          <div className="portfolio__circles">
            {categories.map((cat) => (
              <Link key={cat.label} href={cat.href} className="portfolio__item">
                <div className="portfolio__circle">
                  <span className="portfolio__icon">{cat.icon}</span>
                </div>
                <span className="portfolio__label">{cat.label}</span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <style jsx>{`

        .portfolio {
          background  : #f47c20;
          width       : 100%;
          padding     : 60px 40px 70px;
          font-family : var(--font-primary);
        }

        .portfolio__inner {
          max-width       : 1200px;
          margin          : 0 auto;
          display         : flex;
          flex-direction  : column;
          align-items     : center;
          gap             : 0;
        }

        /* ── EurostileExt Bold — large display heading ── */
        .portfolio__title {
          font-family    : var(--font-extended);
          font-weight    : 700;
          font-size      : clamp(60px, 13vw, 160px);
          color          : #ffffff;
          letter-spacing : 0.06em;
          text-transform : uppercase;
          line-height    : 1;
          margin         : 0 0 8px 0;
          text-align     : center;
        }

        /* Row of circles */
        .portfolio__circles {
          display         : flex;
          align-items     : flex-start;
          justify-content : center;
          gap             : clamp(16px, 3vw, 40px);
          flex-wrap       : wrap;
          width           : 100%;
        }

        /* Each item = circle + label */
        .portfolio__item {
          display                    : flex;
          flex-direction             : column;
          align-items                : center;
          gap                        : 20px;
          text-decoration            : none;
          cursor                     : pointer;
          -webkit-tap-highlight-color: transparent;
          width                      : clamp(110px, 14vw, 180px);
        }

        /* Circle — dark charcoal by default */
        .portfolio__circle {
          width           : clamp(110px, 14vw, 180px);
          height          : clamp(110px, 14vw, 180px);
          border-radius   : 50%;
          background      : #1a1a1a;
          display         : flex;
          align-items     : center;
          justify-content : center;
          transition      : background 0.25s ease;
          color           : #ffffff;
          pointer-events  : none;
        }

        .portfolio__icon {
          display         : flex;
          align-items     : center;
          justify-content : center;
          color           : inherit;
          transition      : color 0.25s ease;
          pointer-events  : none;
        }

        /* Hover: circle turns white, icon turns orange */
        .portfolio__item:hover .portfolio__circle { background: #ffffff; }
        .portfolio__item:hover .portfolio__icon   { color: #f47c20; }

        /* ── EurostileCnd Bold — category label ── */
        .portfolio__label {
          font-family    : var(--font-condensed);
          font-weight    : 700;
          font-size      : clamp(11px, 1.2vw, 14px);
          color          : #ffffff;
          text-transform : uppercase;
          letter-spacing : 0.1em;
          pointer-events : none;
          display        : block;
          width          : 100%;
          text-align     : center;
          white-space    : nowrap;
        }

        /* Mobile */
        @media (max-width: 600px) {
          .portfolio { padding: 48px 20px 56px; }
          .portfolio__circles { gap: 14px; }
          .portfolio__circle { width: 90px; height: 90px; }
          .portfolio__icon :global(svg) { width: 36px; height: 36px; }
        }
      `}</style>
    </>
  );
}