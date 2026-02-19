'use client';

import Link from 'next/link';

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
    label: 'PRINT',
    href: '/portfolio/print',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    ),
  },
  {
    label: 'DIGITAL',
    href: '/portfolio/digital',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    label: 'EVENT',
    href: '/portfolio/eventss',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
];

export default function Portfolio() {
  return (
    <>
      <section id="portfolio" className="portfolio">
        <div className="portfolio__inner">

          {/* Big title */}
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
          background: #FF8C00;
          width: 100%;
          padding: 60px 40px 70px;
          font-family: 'Eurostile', 'Arial Black', Arial, sans-serif;
        }

        .portfolio__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* PORTFOLIO heading */
        .portfolio__title {
          font-family: 'Eurostile', 'Arial Black', Arial, sans-serif;
          font-size: clamp(60px, 13vw, 160px);
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1;
          margin: 0 0 8px 0;
          text-align: center;
        }

        /* Row of circles */
        .portfolio__circles {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: clamp(16px, 3vw, 40px);
          flex-wrap: wrap;
          width: 100%;
        }

        /* Each item = circle + label */
        .portfolio__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          cursor: pointer;
        }

        /* Circle — dark charcoal by default */
        .portfolio__circle {
          width: clamp(110px, 14vw, 180px);
          height: clamp(110px, 14vw, 180px);
          border-radius: 50%;
          background: #1c1c1c;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s ease;
          color: #ffffff;
        }

        /* Icon inherits color from circle */
        .portfolio__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: inherit;
          transition: color 0.25s ease;
        }

        /* Hover: circle turns white, icon turns orange */
        .portfolio__item:hover .portfolio__circle {
          background: #ffffff;
        }
        .portfolio__item:hover .portfolio__icon {
          color: #FF8C00;
        }

        /* Label */
        .portfolio__label {
          font-family: 'Eurostile', 'Arial Black', Arial, sans-serif;
          font-size: clamp(11px, 1.4vw, 16px);
          font-weight: 900;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        /* Mobile */
        @media (max-width: 600px) {
          .portfolio {
            padding: 48px 20px 56px;
          }
          .portfolio__circles {
            gap: 14px;
          }
          .portfolio__circle {
            width: 90px;
            height: 90px;
          }
          .portfolio__icon :global(svg) {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </>
  );
}