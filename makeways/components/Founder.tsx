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
            <div className="scroll-box">
              <p className="quote-text">
                Bidhan Rajbhandari is the Founder and Managing Director of Makeways Pvt. Ltd. With more than 17 years of experience in advertising, branding, and marketing strategy, he is widely regarded as one of the most creative and most awarded advertising professionals in Nepal. He has consistently adapted to the evolving marketing landscape from traditional media to digital transformation and AI-driven marketing.
                He has received multiple recognitions for his creative excellence, including the Best Creative Youth Award, and has been honored with the AAN Samman, considered the highest degree of advertising honor presented by Nepal's advertising fraternity. Bidhan has also represented Nepal on major international creative platforms such as Cannes Lions International Festival of Creativity in France and ADFEST in Thailand, contributing to greater international exposure for the country's advertising community.
                Beyond his role at Makeways, he also serves as the Governor of AD Club Nepal, where he actively contributes to strengthening Nepal's advertising and creative ecosystem. His professional journey also includes experience with leading multinational advertising networks such as J. Walter Thompson and TBWA, where he served as the Country Head for TBWA in Nepal.
              </p>
            </div>
          </blockquote>
        </div>
      </div>

      <style jsx>{`

        /*
          NO @font-face here — fonts are declared once in globals.css.
          Components only reference font-family names.
        */

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

        /* Eurostile Bold (900) — big background title */
        .founder-title {
          position: absolute;
          top: 0;
          left: 15%;
          right: 0;
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
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
          top: 10%;
          left: 18%;
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
          right: 3%;
          top: 55%;
          transform: translateY(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: none;
        }

        /* Eurostile Bold (700) — name */
        .founder-name {
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: clamp(24px, 2.2vw, 34px);
          font-weight: 700;
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

        /* Eurostile Bold (700) — opening quote mark */
        .quote-open {
          display: block;
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: clamp(40px, 4vw, 64px);
          font-weight: 700;
          color: #FF8C00;
          line-height: 0.5;
          margin-bottom: 12px;
        }

        .scroll-box {
          max-height: 200px;
          overflow-y: auto;
          padding-right: 8px;
          scrollbar-width: thin;
          scrollbar-color: #FF8C00 #c4c4c0;
        }

        .scroll-box::-webkit-scrollbar {
          width: 4px;
        }

        .scroll-box::-webkit-scrollbar-track {
          background: #c4c4c0;
          border-radius: 2px;
        }

        .scroll-box::-webkit-scrollbar-thumb {
          background: #FF8C00;
          border-radius: 2px;
        }

        /* Eurostile Regular (400) — body paragraph */
        .quote-text {
          font-family: 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size: clamp(15px, 1vw, 16px);
          font-weight: 400;
          color: #666666;
          line-height: 1.9;
          letter-spacing: 0.03em;
          margin: 0;
          font-style: normal;
        }

        /* ── 1280px ── */
        @media (max-width: 1280px) {
          .founder-inner { height: 600px; }
          .founder-info {
            left: calc(17% + min(52vw, 520px) + 30px);
            right: 2%;
          }
          .scroll-box { max-height: 190px; }
        }

        /* ── 1024px ── */
        @media (max-width: 1024px) {
          .founder-inner { height: 460px; }
          .founder-title { font-size: clamp(70px, 11vw, 130px); }
          .founder-photo { left: 15%; width: min(38vw, 340px); }
          .founder-info {
            left: calc(15% + min(38vw, 340px) + 28px);
            right: 2%;
            max-width: none;
          }
          .scroll-box { max-height: 160px; }
          .quote-text { font-size: clamp(12px, 1vw, 14px); }
        }

        /* ── MOBILE ≤ 768px ── */
        @media (max-width: 768px) {
          .founder-inner {
            height: auto;
            display: flex;
            flex-direction: column;
            overflow: visible;
          }

          .founder-title {
            position: static;
            font-size: clamp(44px, 14vw, 90px);
            white-space: nowrap;
            padding: 16px 4vw 0;
            margin: 0;
            text-align: center;
            left: auto;
          }

          .founder-photo {
            position: static;
            width: 80%;
            align-self: center;
            margin-top: -35px;
            top: auto;
            left: auto;
          }

          .founder-info {
            position: static;
            transform: none;
            padding: 20px 6vw 32px;
            gap: 12px;
            right: auto;
            left: auto;
            max-width: 100%;
          }

          .founder-name { font-size: clamp(18px, 5.5vw, 28px); }
          .quote-open { font-size: clamp(30px, 7vw, 50px); }
          .quote-text { font-size: clamp(11px, 3vw, 14px); line-height: 1.7; }
          .scroll-box { max-height: 180px; }
        }

        /* ── 480px ── */
        @media (max-width: 480px) {
          .founder-title { font-size: clamp(36px, 13.5vw, 58px); padding: 12px 3vw 0; }
          .founder-name { font-size: clamp(15px, 5vw, 22px); }
          .quote-text { font-size: clamp(10px, 2.8vw, 13px); }
          .founder-info { padding: 16px 5vw 28px; gap: 10px; }
          .scroll-box { max-height: 150px; }
        }

        /* ── 360px ── */
        @media (max-width: 360px) {
          .founder-title { font-size: 33px; text-align: center; }
          .founder-name { font-size: 14px; }
          .quote-text { font-size: 10px; }
        }
      `}</style>
    </section>
  );
}