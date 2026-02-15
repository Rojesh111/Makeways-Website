'use client';

interface Award {
  name: string;
  category: string;
}

export default function AboutMakeways() {
  const awards: Award[] = [
    { name: "Best Creative Agency 2024", category: "Marketing Excellence" },
    { name: "Innovation Award", category: "Digital Campaigns" },
  ];

  return (
    <>
      <section id="about" className="about-section">
        <div className="container">
          <div className="welcome-section">
            <h2 className="section-title fade-in-up">WELCOME TO MAKEWAYS</h2>
            <p className="welcome-text fade-in-up">
              We are a full-service creative agency dedicated to transforming brands 
              through innovative storytelling, strategic marketing, and exceptional design. 
              Our team of passionate creatives brings your vision to life with 
              unparalleled expertise and dedication.
            </p>
          </div>

          <div className="awards-section">
            <h3 className="awards-title">AWARDS & RECOGNITION</h3>
            <div className="awards-grid">
              {awards.map((award, index) => (
                <div key={index} className="award-card" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="award-icon">🏆</div>
                  <h4>{award.name}</h4>
                  <p>{award.category}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="murals-section">
            <h3 className="murals-title">OUR CREATIVE MURALS</h3>
            <div className="mural-showcase">
              <div className="mural-placeholder">
                <span>Featured Mural Artwork</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-section {
          background: var(--white);
          padding: 100px 20px;
        }

        .welcome-section {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: 48px;
          color: var(--dark);
          margin-bottom: 30px;
          letter-spacing: 3px;
        }

        .welcome-text {
          font-size: 20px;
          line-height: 1.8;
          color: var(--gray);
          max-width: 900px;
          margin: 0 auto;
        }

        .awards-section {
          margin-bottom: 80px;
        }

        .awards-title {
          font-size: 36px;
          color: var(--orange);
          text-align: center;
          margin-bottom: 50px;
          letter-spacing: 2px;
        }

        .awards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }

        .award-card {
          background: linear-gradient(135deg, #fff 0%, #f9f9f9 100%);
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .award-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(255,140,0,0.2);
        }

        .award-icon {
          font-size: 60px;
          margin-bottom: 20px;
        }

        .award-card h4 {
          font-size: 22px;
          color: var(--dark);
          margin-bottom: 10px;
        }

        .award-card p {
          font-size: 16px;
          color: var(--gray);
        }

        .murals-section {
          margin-top: 80px;
        }

        .murals-title {
          font-size: 36px;
          color: var(--dark);
          text-align: center;
          margin-bottom: 50px;
          letter-spacing: 2px;
        }

        .mural-showcase {
          max-width: 1000px;
          margin: 0 auto;
        }

        .mural-placeholder {
          background: linear-gradient(135deg, var(--orange) 0%, #FFA500 100%);
          height: 400px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
          box-shadow: 0 15px 40px rgba(255,140,0,0.3);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 32px;
          }
          
          .awards-title, .murals-title {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
}