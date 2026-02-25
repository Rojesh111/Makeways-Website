'use client';

export default function Founder() {
  return (
    <section className="founder-section">
      <div className="founder-inner">
        {/* FOUNDER background text */}
        <h1 className="founder-title">FOUNDER</h1>

        {/* Photo */}
        <div className="founder-photo">
          <img
            src="/images/BIDHAN.png"
            alt="Bidhan Rajbhandari"
          />
        </div>

        {/* Name + quote */}
        <div className="founder-info">
          <h2 className="founder-name">
            BIDHAN<br />
            RAJBHANDARI
          </h2>
          <p className="founder-quote">
            At MAKEWAYS, we take our work too seriously without
            taking ourselves seriously.
          </p>
        </div>
      </div>

      <style jsx>{`
        /* ── SECTION ── */
        .founder-section {
          background: #D4D4D0;
          width: 100%;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }

        /* ── INNER CONTAINER — caps the layout at a max width ── */
        .founder-inner {
          position: relative;
          width: 100%;
          max-width: 1400px;
          height: 520px;
          overflow: hidden;
        }

        /* ── FOUNDER TITLE ── */
        .founder-title {
          position: absolute;
          top: 0;
          left: 15%;
          right: 0;
          font-family: 'Eurostile', 'Arial Black', sans-serif;
          font-size: clamp(80px, 25vw, 200px);
          font-weight: 1000;
          color: #FF8C00;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1;
          margin: 0;
          padding: 0;
          z-index: 1;
          white-space: nowrap;
          text-align: justify;
          text-align-last: justify;
        }

        /* ── PHOTO ── */
        .founder-photo {
          position: absolute;
          bottom: 0;
          left: 22%;
          z-index: 2;
          width: min(21vw, 350px);
        }

        .founder-photo img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        /* ── INFO — pushed to the right, vertically centred ── */
        .founder-info {
          position: absolute;
          left: 60%;
          top: 55%;
          transform: translateY(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 380px;
        }

        .founder-name {
          font-family: 'Eurostile', 'Arial Black', sans-serif;
          font-size: clamp(20px, 2.4vw, 38px);
          font-weight: 800;
          color: #666666;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1.1;
          margin: 0;
        }

        .founder-quote {
          font-family: 'Eurostile', 'Arial', sans-serif;
          font-size: clamp(12px, 0.9vw, 15px);
          font-weight: 400;
          color: #666666;
          line-height: 1.7;
          letter-spacing: 0.01em;
          margin: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .founder-inner {
            height: 460px;
          }
          .founder-title {
            font-size: clamp(70px, 11vw, 130px);
          }
          .founder-photo {
            width: min(34vw, 340px);
          }
          .founder-info {
            left: 40%;
            max-width: 55%;
          }
        }

        @media (max-width: 768px) {
          .founder-inner {
            height: 400px;
          }
          .founder-title {
            font-size: clamp(60px, 12vw, 110px);
          }
          .founder-photo {
            width: min(38vw, 280px);
          }
          .founder-info {
            left: 42%;
            max-width: 54%;
            gap: 12px;
          }
          .founder-name {
            font-size: clamp(16px, 2.8vw, 26px);
          }
          .founder-quote {
            font-size: clamp(11px, 1.4vw, 14px);
          }
        }

        @media (max-width: 480px) {
          .founder-inner {
            height: 320px;
          }
          .founder-title {
            font-size: clamp(44px, 13vw, 80px);
          }
          .founder-photo {
            width: 42vw;
          }
          .founder-info {
            left: 44%;
            max-width: 52%;
            gap: 8px;
          }
          .founder-name {
            font-size: 14px;
          }
          .founder-quote {
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
}