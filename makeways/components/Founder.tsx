'use client';

export default function Founder() {
  return (
    <section className="founder-section">
      <div className="founder-inner">
        <h1 className="founder-title">FOUNDER</h1>

        <div className="founder-photo">
          <img src="/images/team/BIDHAN.png" alt="Bidhan Rajbhandari" />
        </div>

        <div className="founder-info">
          <h2 className="founder-name">
            BIDHAN<br />
            RAJBHANDARI
          </h2>
          <blockquote className="founder-quote">
            <span className="quote-open">"</span>
            <p className="quote-text">
              MAKEWAYS was born from a simple belief — that great creative work can change how people feel about a brand.
              We've built this agency on honesty, craft, and an obsession with getting things right.
              From TVCs to jingles, every project we take on gets our full heart. We don't chase awards.
              We chase impact. And somewhere along the way, the awards follow. That's the MAKEWAYS way.
            </p>
          </blockquote>
        </div>
      </div>

      <style jsx>{`
        .founder-section {
          background: #D4D4D0;
          width: 100%;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }

        .founder-inner {
          position: relative;
          width: 100%;
          max-width: 1400px;
          height: 655px;
          overflow: hidden;
        }

        .founder-title {
          position: absolute;
          top: 0;
          left: 8%;
          right: 0;
          font-family: 'Eurostile', 'Arial Black', sans-serif;
          font-size: clamp(80px, 14vw, 200px);
          font-weight: 900;
          color: #FF8C00;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1;
          margin: 0;
          padding: 0 0 0 2%;
          z-index: 1;
          white-space: nowrap;
        }

        .founder-photo {
          position: absolute;
          bottom: 0;
          left: 15%;
          z-index: 2;
          width: min(52vw, 520px);
        }

        .founder-photo img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .founder-info {
          position: absolute;
          left: calc(17% + min(52vw, 520px) + 40px);
          top: 55%;
          transform: translateY(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 340px;
        }

        .founder-name {
          font-family: 'Eurostile', 'Arial Black', sans-serif;
          font-size: clamp(24px, 2.2vw, 34px);
          font-weight: 900;
          color: #555555;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1.1;
          margin: 0;
          padding-bottom: 12px;
          border-bottom: 1px solid #aaaaaa;
        }

        .founder-quote {
          position: relative;
          margin: 0;
          padding: 0 0 0 16px;
          border-left: 3px solid #FF8C00;
        }

        .quote-open {
          display: block;
          font-family: 'Eurostile', 'Arial Black', sans-serif;
          font-size: clamp(40px, 4vw, 64px);
          color: #FF8C00;
          line-height: 0.5;
          margin-bottom: 12px;
        }

        .quote-text {
          font-family: 'Eurostile', 'Arial', sans-serif;
          font-size: clamp(11px, 0.85vw, 13px);
          font-weight: 400;
          color: #666666;
          line-height: 1.9;
          letter-spacing: 0.03em;
          margin: 0;
          font-style: normal;
        }

        /* ── 1024px ── */
        @media (max-width: 1024px) {
          .founder-inner { height: 460px; }
          .founder-title { font-size: clamp(70px, 11vw, 130px); }
          .founder-photo { left: 15%; width: min(38vw, 340px); }
          .founder-info {
            left: calc(15% + min(38vw, 340px) + 28px);
            max-width: 280px;
          }
        }

        /* ── MOBILE ≤ 768px ── */
        @media (max-width: 768px) {
          .founder-inner {
            height: auto;
            display: flex;
            flex-direction: column;
            position: relative;
          }

          .founder-title {
            position: static;
            font-size: clamp(44px, 14vw, 90px);
            white-space: nowrap;
            letter-spacing: 0.05em;
            line-height: 1;
            padding: 16px 4vw 0;
            margin: 0;
            text-align: center;
            z-index: 1;
          }

          .founder-photo {
            position: static;
            width: 80%;            
            align-self: center;
            margin-top: -35px;
            z-index: 2;
          }

          .founder-photo img {
            width: 100%;
            height: auto;
            display: block;
          }

          .founder-info {
            position: static;
            transform: none;
            padding: 20px 6vw 32px;
            gap: 12px;
            max-width: 100%;
            z-index: 3;
          }

          .founder-name {
            font-size: clamp(18px, 5.5vw, 28px);
          }

          .quote-open {
            font-size: clamp(30px, 7vw, 50px);
          }

          .quote-text {
            font-size: clamp(11px, 3vw, 14px);
            line-height: 1.7;
          }
        }

        /* ── 480px ── */
        @media (max-width: 480px) {
          .founder-title {
            font-size: clamp(36px, 13.5vw, 58px);
            padding: 12px 3vw 0;
            text-align: center;
          }
          .founder-name { font-size: clamp(15px, 5vw, 22px); }
          .quote-text { font-size: clamp(10px, 2.8vw, 13px); }
          .founder-info { padding: 16px 5vw 28px; gap: 10px; }
        }

        /* ── 360px ── */
        @media (max-width: 360px) {
          .founder-title { 
            font-size: 33px;
            text-align: center;
          }
          .founder-name { font-size: 14px; }
          .quote-text { font-size: 10px; }
        }
      `}</style>
    </section>
  );
}