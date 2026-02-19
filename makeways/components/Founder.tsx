'use client';

export default function Founder() {
  return (
    <section className="founder-section">
      {/* Large FOUNDER text in background */}
      <h1 className="founder-title">FOUNDER</h1>

      {/* Content container with photo and info side by side */}
      <div className="founder-content">
        {/* Left side: Photo */}
        <div className="founder-photo-wrapper">
          <div className="founder-photo">
            <img
              src="/images/download.jpeg"
              alt="Bidhan Rajbhandari"
            />
          </div>
        </div>

        {/* Right side: Name and Quote */}
        <div className="founder-info">
          <h2 className="founder-name">
            BIDHAN<br />
            RAJBHANDARI
          </h2>
          <div className="founder-title-role">
            <span className="role-label">FOUNDER & CREATIVE DIRECTOR</span>
          </div>
          <p className="founder-quote">
            "At MAKEWAYS, we take our work too seriously without taking ourselves seriously."
          </p>
        </div>
      </div>

      <style jsx>{`
        /* ── SECTION ── */
        .founder-section {
          position: relative;
          background: #D4D4D0;
          width: 100%;
          min-height: 700px;
          overflow: hidden;
          padding: 60px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── FOUNDER TITLE (Background) ── */
        .founder-title {
          position: absolute;
          top: 20px;
          left: 40px;
          font-family: 'Eurostile', 'Arial Black', sans-serif;
          font-size: clamp(80px, 14vw, 200px);
          font-weight: 900;
          color: #FF8C00;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1;
          margin: 0;
          z-index: 1;
          opacity: 0.95;
        }

        /* ── CONTENT CONTAINER ── */
        .founder-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          gap: 60px;
          max-width: 1200px;
          width: 100%;
          margin-top: 180px;
        }

        /* ── PHOTO ── */
        .founder-photo-wrapper {
          flex-shrink: 0;
        }

        .founder-photo {
          width: clamp(300px, 35vw, 450px);
          height: auto;
          position: relative;
        }

        .founder-photo img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          filter: grayscale(100%);
        }

        /* ── INFO (Name + Quote) ── */
        .founder-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 40px;
        }

        .founder-name {
          font-family: 'Eurostile', 'Arial Black', sans-serif;
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 900;
          color: #333333;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.1;
          margin: 0;
        }

        .founder-title-role {
          margin-bottom: 20px;
        }

        .role-label {
          font-family: 'Eurostile', 'Arial', sans-serif;
          font-size: clamp(12px, 1.2vw, 16px);
          font-weight: 600;
          color: #FF8C00;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .founder-quote {
          font-family: 'Eurostile', 'Arial', sans-serif;
          font-size: clamp(16px, 1.8vw, 22px);
          font-weight: 400;
          color: #555555;
          line-height: 1.6;
          letter-spacing: 0.02em;
          margin: 0;
          font-style: italic;
          padding-left: 20px;
          border-left: 4px solid #FF8C00;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .founder-section {
            padding: 40px 30px;
            min-height: 600px;
          }

          .founder-title {
            font-size: clamp(60px, 12vw, 140px);
            left: 30px;
          }

          .founder-content {
            gap: 40px;
            margin-top: 160px;
          }
        }

        @media (max-width: 768px) {
          .founder-section {
            padding: 40px 20px;
            min-height: auto;
          }

          .founder-title {
            font-size: clamp(50px, 15vw, 100px);
            left: 20px;
            top: 10px;
          }

          .founder-content {
            flex-direction: column;
            align-items: center;
            gap: 30px;
            margin-top: 120px;
          }

          .founder-photo {
            width: 70vw;
            max-width: 350px;
          }

          .founder-info {
            padding-bottom: 0;
            text-align: center;
            align-items: center;
          }

          .founder-quote {
            border-left: none;
            border-top: 4px solid #FF8C00;
            padding-left: 0;
            padding-top: 20px;
          }
        }

        @media (max-width: 480px) {
          .founder-title {
            font-size: 50px;
          }

          .founder-name {
            font-size: 28px;
          }

          .role-label {
            font-size: 11px;
          }

          .founder-quote {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}