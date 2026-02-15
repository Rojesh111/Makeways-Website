'use client';

import { JSX } from "react";

interface Value {
  id: number;
  title: string;
  icon: JSX.Element;
}

export default function CoreValues() {
  const values: Value[] = [
    { 
      id: 1, 
      title: "Creatively Led", 
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
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      )
    },
    { 
      id: 4, 
      title: "Quality Obsessed", 
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
          <h2 className="section-title">CORE VALUES</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div 
                key={value.id} 
                className="value-card"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="value-icon-wrapper">
                  <div className="value-icon">
                    {value.icon}
                  </div>
                </div>
                <h3 className="value-title">{value.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .core-values-section {
          background: white;
          padding: 100px 20px;
        }

        .section-title {
          font-size: 48px;
          color: var(--dark);
          text-align: center;
          margin-bottom: 70px;
          letter-spacing: 3px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 50px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .value-card {
          text-align: center;
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .value-icon-wrapper {
          width: 120px;
          height: 120px;
          margin: 0 auto 25px;
          background: white;
          border: 3px solid var(--orange);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
        }

        .value-card:hover .value-icon-wrapper {
          background: var(--orange);
          border-color: white;
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(255,140,0,0.5);
        }

        .value-icon {
          color: var(--orange);
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .value-card:hover .value-icon {
          color: white;
          transform: scale(1.1);
          position: relative;
          z-index: 1;
        }

        .value-icon :global(svg) {
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        .value-card:hover .value-icon :global(svg) {
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
        }

        .value-title {
          font-size: 20px;
          color: var(--dark);
          font-weight: bold;
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
        }

        .value-card:hover .value-title {
          color: var(--orange);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 36px;
          }
          
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
          
          .value-icon-wrapper {
            width: 100px;
            height: 100px;
          }
          
          .value-icon :global(svg) {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </>
  );
}