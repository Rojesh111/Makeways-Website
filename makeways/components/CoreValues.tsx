'use client';

import { JSX } from "react";

interface Value {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

export default function CoreValues() {
  const values: Value[] = [
    { 
      id: 1, 
      title: "Creatively Led", 
      description: "Creativity is the oxygen we breathe. We're always evolving, and our creative, entrepreneurial spirit uniquely empowers us to offer our clients with fresh & friendly ideas to add value in their sectors and at large.",
      icon: (
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18h6"/>
          <path d="M10 22h4"/>
          <path d="M8 14a6 6 0 1 1 8 0c-1 1-2 2-2 4h-4c0-2-1-3-2-4z"/>
        </svg>
      )
    },
    { 
      id: 2, 
      title: "Strategically Driven", 
      description: "Our creative eyes are always looking and breaking down the campaigns of companies who experience the results of a flourishing marketing strategy put into kinetic motion. Our objective on every project, whatever the budget, is to build business in both, profile and profit.",
      icon: (
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      )
    },
    { 
      id: 3, 
      title: "Insightfully Social", 
      description: "Businesses come in all shapes and sizes, no matter what yours does; we infuse latest trends and social insights to blend together into a symphony to connect and build seamless relationships with your target group. Our close working relationship is built on a rock solid foundation, and we are available every day to build on it.",
      icon: (
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      )
    },
    { 
      id: 4, 
      title: "Quality Obsessed", 
      description: "What sets us apart from our competitors is our obsession with quality – both in the work we carry out and in the care with which we serve our clients. At MAKEWAYS, we take our work too seriously without taking ourselves seriously.",
      icon: (
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    }
  ];

  return (
    <>
      <section className="core-values-section">
        <div className="container">

          {/* Section Title — matches mockup: "OUR DNA" top-left aligned, large, dark */}
          <h2 className="section-title">OUR DNA</h2>

          {/* Cards Grid */}
          <div className="values-grid">
            {values.map((value) => (
              <div key={value.id} className="value-card">

                {/* Circle Icon */}
                <div className="value-icon-wrapper">
                  <div className="value-icon">
                    {value.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="value-title">{value.title}</h3>

                {/* Divider */}
                <div className="divider"></div>

                {/* Description */}
                <p className="value-description">{value.description}</p>

              </div>
            ))}
          </div>

        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /*
          Font stack: Eurostile (if installed on user's machine/server)
          fallback: Barlow (closest free match — wide, condensed, geometric sans)
        */
        .core-values-section {
          background: #f0f0f0;
          padding: 70px 40px 80px;
          font-family: 'Eurostile', 'Barlow', 'Arial Narrow', ui-sans-serif, sans-serif;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }

        /* ── Section Title ── */
        /* Mockup shows "OUR DNA" in large, bold, dark uppercase — left-aligned */
        .section-title {
          font-family: 'Eurostile', 'Barlow', 'Arial Narrow', ui-sans-serif, sans-serif;
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 800;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: clamp(40px, 6vw, 65px);
          line-height: 1;
        }

        /* ── Grid ── */
        /* 4 equal columns on desktop, matching mockup layout */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(24px, 4vw, 48px);
        }

        /* ── Card ── */
        .value-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 10px 8px;
          transition: transform 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-6px);
        }

        /* ── Icon Circle ── */
        /* Mockup: thin orange circle outline, icon inside, no fill */
        .value-icon-wrapper {
          width: clamp(90px, 13vw, 130px);
          height: clamp(90px, 13vw, 130px);
          border: 1.5px solid #ff8c00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: clamp(18px, 3vw, 30px);
          background: transparent;
          flex-shrink: 0;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .value-icon {
          color: #ff8c00;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }

        .value-card:hover .value-icon-wrapper {
          background: #ff8c00;
          transform: scale(1.08);
          box-shadow: 0 12px 36px rgba(255, 140, 0, 0.22);
        }

        .value-card:hover .value-icon {
          color: #ffffff;
          transform: scale(1.1);
        }

        /* ── Card Title ── */
        /* Mockup: medium-large, dark gray, uppercase, bold */
        .value-title {
          font-family: 'Eurostile', 'Barlow', 'Arial Narrow', ui-sans-serif, sans-serif;
          font-size: clamp(14px, 2vw, 19px);
          font-weight: 700;
          color: #2a2a2a;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: clamp(10px, 1.5vw, 16px);
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .value-card:hover .value-title {
          color: #ff8c00;
        }

        /* ── Divider ── */
        /* Mockup: short gray horizontal rule centered below title */
        .divider {
          width: 40px;
          height: 2px;
          background: #cccccc;
          margin-bottom: clamp(12px, 2vw, 20px);
          transition: width 0.3s ease, background 0.3s ease;
        }

        .value-card:hover .divider {
          width: 56px;
          background: #ff8c00;
        }

        /* ── Description ── */
        /* Mockup: small, light gray, centered, generous line height */
        .value-description {
          font-family: 'Eurostile', 'Barlow', 'Arial Narrow', ui-sans-serif, sans-serif;
          font-size: clamp(12px, 1.3vw, 14px);
          color: #888888;
          line-height: 1.85;
          font-weight: 400;
          letter-spacing: 0.2px;
        }

        /* ════════════════════════════
           RESPONSIVE
        ════════════════════════════ */

        /* Tablet landscape */
        @media (max-width: 1024px) {
          .core-values-section {
            padding: 60px 32px 70px;
          }

          .values-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 36px;
          }

          .value-card {
            padding: 12px 16px;
          }
        }

        /* Tablet portrait */
        @media (max-width: 768px) {
          .core-values-section {
            padding: 56px 24px 64px;
          }

          .section-title {
            font-size: 32px;
            margin-bottom: 44px;
          }

          .values-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 36px 28px;
          }

          .value-icon-wrapper {
            width: 96px;
            height: 96px;
          }

          .value-title {
            font-size: 14px;
          }

          .value-description {
            font-size: 12.5px;
            line-height: 1.8;
          }
        }

        /* Mobile */
        @media (max-width: 520px) {
          .core-values-section {
            padding: 48px 20px 56px;
          }

          .section-title {
            font-size: 26px;
            letter-spacing: 2px;
            margin-bottom: 36px;
          }

          .values-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .value-card {
            padding: 8px 12px;
          }

          .value-icon-wrapper {
            width: 90px;
            height: 90px;
            margin-bottom: 16px;
          }

          .value-icon svg {
            width: 36px;
            height: 36px;
          }

          .value-title {
            font-size: 15px;
            letter-spacing: 0.8px;
          }

          .divider {
            width: 32px;
          }

          .value-description {
            font-size: 13px;
            line-height: 1.8;
          }
        }

        /* Very small */
        @media (max-width: 360px) {
          .core-values-section {
            padding: 40px 16px 48px;
          }

          .section-title {
            font-size: 22px;
          }

          .value-icon-wrapper {
            width: 78px;
            height: 78px;
          }

          .value-icon svg {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </>
  );
}