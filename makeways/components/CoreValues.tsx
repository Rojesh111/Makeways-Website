'use client';

interface Value {
  id: number;
  title: string;
  icon: string;
}

export default function CoreValues() {
  const values: Value[] = [
    { id: 1, title: "Innovation", icon: "💡" },
    { id: 2, title: "Excellence", icon: "⭐" },
    { id: 3, title: "Integrity", icon: "🤝" },
    { id: 4, title: "Passion", icon: "❤️" }
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
                  <div className="value-icon">{value.icon}</div>
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
          background: linear-gradient(135deg, var(--orange) 0%, #FFA500 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(255,140,0,0.3);
          transition: all 0.4s ease;
        }

        .value-card:hover .value-icon-wrapper {
          transform: rotate(360deg) scale(1.1);
          box-shadow: 0 15px 40px rgba(255,140,0,0.5);
        }

        .value-icon {
          font-size: 50px;
        }

        .value-title {
          font-size: 24px;
          color: var(--dark);
          font-weight: bold;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 36px;
          }
          
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }
      `}</style>
    </>
  );
}