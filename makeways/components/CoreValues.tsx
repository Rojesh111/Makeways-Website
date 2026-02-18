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
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 2L11 13"/>
          <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
        </svg>
      )
    },
    { 
      id: 3, 
      title: "Insightfully Social", 
      description: "Businesses come in all shapes and sizes, no matter what yours does; we infuse latest trends and social insights to blend together into a symphony to connect and build seamless relationships with your target group. Our close working relationship is built on a rock solid foundation, and we are available every day to build on it.",
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      )
    },
    { 
      id: 4, 
      title: "Quality Obsessed", 
      description: "What sets us apart from our competitors is our obsession with quality – both in the work we carry out and in the care with which we serve our clients. At MAKEWAYS, we take our work too seriously without taking ourselves seriously.",
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    }
  ];

  return (
    <>
      <section className="core-values-section">
        <div className="container">
          <h2 className="section-title">OUR DNA</h2>
          <div className="values-grid">
            {values.map((value) => (
              <div 
                key={value.id} 
                className="value-card"
              >
                <div className="value-icon-wrapper">
                  <div className="value-icon">
                    {value.icon}
                  </div>
                </div>
                <h3 className="value-title">{value.title}</h3>
                <div className="divider"></div>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Eurostile:wght@400;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .core-values-section {
          background: #ffffff;
          padding: 100px 20px;
          font-family: 'Eurostile', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }

        .section-title {
          font-size: clamp(32px, 5vw, 52px);
          color: #1a1a1a;
          text-align: center;
          margin-bottom: clamp(50px, 8vw, 80px);
          letter-spacing: 3px;
          font-weight: 700;
          font-family: 'Eurostile', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          text-transform: uppercase;
          line-height: 1.2;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: clamp(40px, 6vw, 70px);
          width: 100%;
        }

        .value-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          padding: 20px;
        }

        .value-card:hover {
          transform: translateY(-8px);
        }

        .value-icon-wrapper {
          width: clamp(120px, 22vw, 160px);
          height: clamp(120px, 22vw, 160px);
          margin: 0 auto clamp(20px, 4vw, 35px);
          background: #ffffff;
          border: 2.5px solid #ff8c00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          flex-shrink: 0;
        }

        .value-card:hover .value-icon-wrapper {
          background: #ff8c00;
          border-color: #ff8c00;
          transform: scale(1.1);
          box-shadow: 0 20px 50px rgba(255, 140, 0, 0.25);
        }

        .value-icon {
          color: #ff8c00;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .value-card:hover .value-icon {
          color: #ffffff;
          transform: scale(1.15);
        }

        .value-title {
          font-size: clamp(18px, 4vw, 24px);
          color: #1a1a1a;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: clamp(12px, 2vw, 18px);
          transition: color 0.3s ease;
          line-height: 1.3;
          font-family: 'Eurostile', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          text-transform: capitalize;
        }

        .value-card:hover .value-title {
          color: #ff8c00;
        }

        .divider {
          width: 45px;
          height: 3px;
          background: linear-gradient(90deg, #ff8c00 0%, #ff8c00 100%);
          margin-bottom: clamp(15px, 3vw, 25px);
          transition: width 0.3s ease;
        }

        .value-card:hover .divider {
          width: 60px;
        }

        .value-description {
          font-size: clamp(14px, 2vw, 16px);
          color: #666666;
          line-height: 1.8;
          font-weight: 400;
          letter-spacing: 0.3px;
          font-family: 'Eurostile', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Tablet Responsive */
        @media (max-width: 1024px) {
          .core-values-section {
            padding: 80px 24px;
          }

          .values-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 50px;
          }

          .value-card {
            padding: 16px;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .core-values-section {
            padding: 70px 16px;
          }

          .section-title {
            margin-bottom: 50px;
          }

          .values-grid {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .value-icon-wrapper {
            margin-bottom: 25px;
          }

          .value-title {
            margin-bottom: 12px;
          }

          .value-description {
            font-size: 15px;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .core-values-section {
            padding: 60px 12px;
          }

          .section-title {
            font-size: 28px;
            margin-bottom: 40px;
            letter-spacing: 2px;
          }

          .values-grid {
            gap: 35px;
          }

          .value-icon-wrapper {
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
          }

          .value-title {
            font-size: 16px;
          }

          .value-description {
            font-size: 13px;
            line-height: 1.6;
          }

          .divider {
            width: 35px;
            height: 2px;
            margin-bottom: 15px;
          }

          .value-card {
            padding: 12px;
          }
        }
      `}</style>
    </>
  );
}