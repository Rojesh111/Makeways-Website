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

        /* ══════════════════════════════════════
           DESKTOP  (> 768px) — original layout
        ══════════════════════════════════════ */
        .founder-inner {
          position: relative;
          width: 100%;
          max-width: 1400px;
          height: 520px;
          overflow: hidden;
        }

        .founder-title {
          position: absolute;
          top: 0;
          left: 15%;
          right: 0;
          font-family: 'Eurostile', 'Arial Black', sans-serif;
          font-size: clamp(80px, 14vw, 200px);
          font-weight: 1000;
          color: #FF8C00;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1;
          margin: 0;
          padding: 0;
          z-index: 1;
          white-space: nowrap;
        }

        .founder-photo {
          position: absolute;
          bottom: 0;
          left: 22%;
          z-index: 2;
          width: min(35vw, 350px);
        }

        .founder-photo img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .founder-info {
          position: absolute;
          left: calc(22% + min(34vw, 350px) + 28px);
          top: 55%;
          transform: translateY(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 320px;
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

        /* ── 1024px ── */
        @media (max-width: 1024px) {
          .founder-inner { height: 460px; }
          .founder-title { font-size: clamp(70px, 11vw, 130px); }
          .founder-photo { left: 18%; width: min(36vw, 320px); }
          .founder-info {
            left: calc(18% + min(38vw, 320px) + 20px);
            max-width: 280px;
          }
        }

        /* ══════════════════════════════════════
           MOBILE  (≤ 768px)
           Grid layout: FOUNDER top, photo + info side by side below.
           No gaps, no absolute positioning.
        ══════════════════════════════════════ */
        @media (max-width: 768px) {
          .founder-inner {
            height: auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto 1fr;
          }

          /* Row 1: FOUNDER spans both columns */
          .founder-title {
            position: static;
            grid-column: 1 / -1;
            grid-row: 1;
            font-size: clamp(44px, 14vw, 90px);
            white-space: nowrap;
            letter-spacing: 0.05em;
            line-height: 0.9;
            padding: 0 4vw;
            margin: 0;
          }

          /* Row 2, col 1: photo anchored to bottom */
          .founder-photo {
            position: static;
            grid-column: 1;
            grid-row: 2;
            width: 100%;
            align-self: end;
          }

          .founder-photo img {
            width: 100%;
            height: auto;
            display: block;
          }

          /* Row 2, col 2: name + quote centered vertically */
          .founder-info {
            position: static;
            grid-column: 2;
            grid-row: 2;
            transform: none;
            align-self: center;
            padding: 12px 4vw 12px 2vw;
            gap: 10px;
            max-width: 100%;
          }

          .founder-name {
            font-size: clamp(13px, 3.5vw, 22px);
          }

          .founder-quote {
            font-size: clamp(10px, 2vw, 13px);
            line-height: 1.55;
          }
        }

        /* ── 480px ── */
        @media (max-width: 480px) {
          .founder-title {
            font-size: clamp(36px, 13.5vw, 58px);
            padding: 0 3vw;
          }
          .founder-name {
            font-size: clamp(11px, 3.8vw, 18px);
          }
          .founder-quote {
            font-size: clamp(9px, 2.2vw, 12px);
          }
          .founder-info {
            padding: 8px 3vw 8px 1vw;
            gap: 7px;
          }
        }

        /* ── 360px ── */
        @media (max-width: 360px) {
          .founder-title { font-size: 33px; }
          .founder-name { font-size: 10px; }
          .founder-quote { font-size: 8.5px; }
        }
      `}</style>
    </section>
  );
}