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

          {/* FIX 3 — EurostileCnd so name sits clearly below FOUNDER in hierarchy */}
          <h2 className="founder-name">
            BIDHAN<br />
            RAJBHANDARI
          </h2>

          <blockquote className="founder-quote">

            {/* FIX 1 — SVG quote mark, identical to AboutMakeways treatment */}
            <svg
              className="quote-svg-mark"
              width="28" height="20"
              viewBox="0 0 40 28"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 28V16.8C0 7.84 5.6 2.24 16.8 0L18 3.92C13.2 5.04 10.4 7.84 9.6 12.32H16.8V28H0ZM23.2 28V16.8C23.2 7.84 28.8 2.24 40 0L41.2 3.92C36.4 5.04 33.6 7.84 32.8 12.32H40V28H23.2Z"
                fill="#f47c20"
                fillOpacity="0.22"
              />
            </svg>

            <div className="scroll-box">
              {/* FIX 2 — #666666 body color matching AboutMakeways .about__body */}
              <p className="quote-text">
                Bidhan Rajbhandari is the Founder and Managing Director of Makeways Pvt. Ltd.
                With more than 17 years of experience in advertising, branding, and marketing
                strategy, he is widely regarded as one of the most creative and most awarded
                advertising professionals in Nepal. He has consistently adapted to the evolving
                marketing landscape from traditional media to digital transformation and
                AI-driven marketing.
                He has received multiple recognitions for his creative excellence, including the
                Best Creative Youth Award, and has been honored with the AAN Samman, considered
                the highest degree of advertising honor presented by Nepal&apos;s advertising
                fraternity. Bidhan has also represented Nepal on major international creative
                platforms such as Cannes Lions International Festival of Creativity in France and
                ADFEST in Thailand, contributing to greater international exposure for the
                country&apos;s advertising community.
                Beyond his role at Makeways, he also serves as the Governor of AD Club Nepal,
                where he actively contributes to strengthening Nepal&apos;s advertising and
                creative ecosystem. His professional journey also includes experience with leading
                multinational advertising networks such as J. Walter Thompson and TBWA, where he
                served as the Country Head for TBWA in Nepal.
              </p>
            </div>
          </blockquote>
        </div>
      </div>

      <style jsx>{`

        /*
          NO @font-face here — fonts declared once in globals.css.
          Font-weight 700 = bold, 400 = regular. No synthetic 900.

          Font family roles:
            'EurostileExt'  — large display title (FOUNDER)
            'EurostileCnd'  — name / condensed labels
            'Eurostile'     — body / quote text
        */

        .founder-section {
          background      : #D4D4D0;
          width           : 100%;
          display         : flex;
          justify-content : center;
          overflow        : hidden;
        }

        .founder-inner {
          position  : relative;
          width     : 100%;
          max-width : 1400px;
          height    : 655px;
          overflow  : hidden;
        }

        /* ── EurostileExt Bold — wide squared letterforms ── */
        .founder-title {
          position       : absolute;
          top            : 0;
          left           : 15%;
          right          : 0;
          font-family    : 'EurostileExt', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : clamp(80px, 14vw, 200px);
          color          : #f47c20;
          letter-spacing : 0.08em;
          text-transform : uppercase;
          line-height    : 1;
          margin         : 0;
          padding        : 0 0 0 2%;
          z-index        : 1;
          white-space    : nowrap;
        }

        .founder-photo {
          position : absolute;
          bottom   : 0;
          top      : 10%;
          left     : 18%;
          z-index  : 2;
          width    : min(52vw, 520px);
        }
        .founder-photo img {
          display    : block;
          width      : 100%;
          height     : auto;
          object-fit : cover;
        }

        .founder-info {
          position       : absolute;
          left           : calc(17% + min(52vw, 520px) + 40px);
          right          : 3%;
          top            : 55%;
          transform      : translateY(-50%);
          z-index        : 3;
          display        : flex;
          flex-direction : column;
          gap            : 18px;
        }

        /* ── FIX 3 — EurostileCnd Bold
             Condensed letterforms sit clearly subordinate to the
             large FOUNDER title — tight, label-weight, no competition ── */
        .founder-name {
          font-family    : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 700;
          font-size      : clamp(20px, 1.8vw, 28px);
          letter-spacing : 0.1em;
          text-transform : uppercase;
          line-height    : 1.2;
          color          : #1a1a1a;
          margin         : 0;
          padding-bottom : 14px;
          border-bottom  : 1px solid rgba(26, 26, 26, 0.18);
        }

        .founder-quote {
          position     : relative;
          margin       : 0;
          padding      : 0 0 0 16px;
          border-left  : 3px solid #f47c20;
          border-radius: 0 0 0 2px;
        }

        /* FIX 1 — SVG mark, same as AboutMakeways */
        .quote-svg-mark {
          display       : block;
          margin-bottom : 10px;
        }

        .scroll-box {
          max-height      : 200px;
          overflow-y      : auto;
          padding-right   : 8px;
          scrollbar-width : thin;
          scrollbar-color : #f47c20 rgba(26,26,26,0.08);
        }
        .scroll-box::-webkit-scrollbar       { width: 3px; }
        .scroll-box::-webkit-scrollbar-track { background: rgba(26,26,26,0.08); border-radius: 2px; }
        .scroll-box::-webkit-scrollbar-thumb { background: #f47c20; border-radius: 2px; }

        /* FIX 2 — #666666, matching AboutMakeways .about__body ── */
        .quote-text {
          font-family    : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-weight    : 400;
          font-size      : clamp(13px, 0.95vw, 15px);
          line-height    : 1.75;
          letter-spacing : 0.01em;
          color          : #666666;
          margin         : 0;
          font-style     : normal;
        }

        /* ── 1280px ── */
        @media (max-width: 1280px) {
          .founder-inner { height: 600px; }
          .founder-info  { left: calc(17% + min(52vw, 520px) + 30px); right: 2%; }
          .scroll-box    { max-height: 190px; }
        }

        /* ── 1024px ── */
        @media (max-width: 1024px) {
          .founder-inner { height: 460px; }
          .founder-title { font-size: clamp(70px, 11vw, 130px); }
          .founder-photo { left: 15%; width: min(38vw, 340px); }
          .founder-info  { left: calc(15% + min(38vw, 340px) + 28px); right: 2%; }
          .scroll-box    { max-height: 160px; }
          .quote-text    { font-size: clamp(11px, 0.9vw, 13px); }
        }

        /* ── Mobile ≤ 768px ── */
        @media (max-width: 768px) {
          .founder-inner {
            height         : auto;
            display        : flex;
            flex-direction : column;
            overflow       : visible;
          }
          .founder-title {
            position    : static;
            font-size   : clamp(44px, 14vw, 90px);
            white-space : nowrap;
            padding     : 16px 4vw 0;
            margin      : 0;
            text-align  : center;
            left        : auto;
          }
          .founder-photo {
            position   : static;
            width      : 80%;
            align-self : center;
            margin-top : -35px;
            top        : auto;
            left       : auto;
          }
          .founder-info {
            position  : static;
            transform : none;
            padding   : 20px 6vw 32px;
            gap       : 14px;
            right     : auto;
            left      : auto;
          }
          .founder-name { font-size: clamp(14px, 4.5vw, 22px); }
          .quote-text   { font-size: clamp(12px, 3.2vw, 15px); line-height: 1.7; }
          .scroll-box   { max-height: 180px; }
        }

        /* ── 480px ── */
        @media (max-width: 480px) {
          .founder-title { font-size: clamp(36px, 13.5vw, 58px); padding: 12px 3vw 0; }
          .founder-name  { font-size: clamp(13px, 4vw, 18px); }
          .quote-text    { font-size: clamp(11px, 2.8vw, 13px); }
          .founder-info  { padding: 16px 5vw 28px; gap: 10px; }
          .scroll-box    { max-height: 150px; }
        }

        /* ── 360px ── */
        @media (max-width: 360px) {
          .founder-title { font-size: 33px; text-align: center; }
          .founder-name  { font-size: 13px; }
          .quote-text    { font-size: 11px; }
        }
      `}</style>
    </section>
  );
}