'use client';

export default function Founder() {
  return (
    <section className="founder-section">
      <div className="founder-inner">

        <h1 className="founder-title">FOUNDER</h1>

        <div className="founder-photo">
          <img src="/images/team/BIDHAN.webp" alt="Bidhan Rajbhandari" />
        </div>

        <div className="founder-info">
          <h2 className="founder-name">BIDHAN<br />RAJBHANDARI</h2>
          <blockquote className="founder-quote">
            <p className="quote-text">
              Bidhan Rajbhandari is the Founder and Managing Director of Makeways Pvt. Ltd.
              With more than 20 years of experience in advertising, branding, and marketing
              strategy, he is widely regarded as one of the most creative and most awarded
              advertising professionals in Nepal. He has consistently adapted to the evolving
              marketing landscape from traditional media to digital transformation and
              AI-driven marketing. He has received multiple recognitions for his creative
              excellence, including the Best Creative Youth Award, and has been honored with
              the AAN Samman, considered the highest degree of advertising honor presented by
              Nepal&apos;s advertising fraternity. Bidhan has also represented Nepal on major
              international creative platforms such as Cannes Lions International Festival of
              Creativity in France and ADFEST in Thailand. Beyond his role at Makeways, he
              also serves as the Governor of AD Club Nepal. His professional journey also
              includes experience with J. Walter Thompson and TBWA, where he served as
              Country Head for TBWA in Nepal.
            </p>
          </blockquote>
        </div>

      </div>

      <style jsx>{`
        .founder-section {
          background      : #D4D4D0;
          width           : 100%;
          height          : 92vh;
          display         : flex;
          justify-content : center;
          overflow        : hidden;
        }

        .founder-inner {
          position  : relative;
          width     : 100%;
          max-width : 1400px;
          height    : 100vh;
          overflow  : hidden;
        }

        /* ── Big title — spans top ── */
        .founder-title {
          position       : absolute;
          top            : 0;
          left           : 7%;
          right          : 0;
          font-family    : var(--font-extended);
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

        /* ── Photo — left, overlaps title ── */
        .founder-photo {
          position : absolute;
          bottom   : 0;
          top      : 8%;
          left     : 9%;
          z-index  : 2;
          width    : min(50vw, 600px);
        }
        .founder-photo img {
          display         : block;
          width           : 100%;
          height          : 100%;
          object-fit      : contain;
          object-position : bottom center;
        }

        /* ── Info — right side, vertically centered ── */
        .founder-info {
          position        : absolute;
          left            : calc(5% + min(50vw, 600px) + 32px);
          right           : 6%;
          top             : 55%;
          transform       : translateY(-50%);
          z-index         : 3;
          display         : flex;
          flex-direction  : column;
          gap             : 20px;
        }

        .founder-name {
          font-family    : var(--font-extended);
          font-weight    : 700;
          font-size      : clamp(20px, 1.8vw, 28px);
          letter-spacing : 0.1em;
          text-transform : uppercase;
          line-height    : 1.2;
          color          : #1a1a1a;
          margin         : 0;
          padding-bottom : 14px;
          border-bottom  : 1px solid rgba(26,26,26,0.18);
        }

        .founder-quote {
          margin      : 0;
          padding     : 0 0 0 16px;
          border-left : 3px solid #f47c20;
        }

        .quote-text {
          font-family    : var(--font-primary);
          font-weight    : 400;
          font-size      : clamp(13px, 0.82vw, 10px);
          line-height    : 2;
          letter-spacing : 0.01em;
          color          : var(--mw-body);
          margin         : 0;
          text-align     : justify;
        }

        /* ── 1024px ── */
        @media (max-width: 1024px) {
          .founder-title  { font-size: clamp(60px, 10vw, 120px); left: 12%; }
          .founder-photo  { left: 4%; width: min(40vw, 360px); }
          .founder-info   { left: calc(4% + min(40vw, 360px) + 24px); right: 3%; }
          .quote-text     { font-size: clamp(10px, 0.8vw, 12px); }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .founder-section { height: auto; }
          .founder-inner {
            height         : auto;
            display        : flex;
            flex-direction : column;
            overflow       : visible;
          }
          .founder-title {
            position   : static;
            font-size  : clamp(44px, 14vw, 90px);
            padding    : 16px 4vw 0;
            text-align : center;
            white-space: nowrap;
          }
          .founder-photo {
            position   : static;
            width      : 75%;
            align-self : center;
            margin-top : -30px;
            height     : auto;
          }
          .founder-photo img { object-fit: contain; height: auto; }
          .founder-info {
            position  : static;
            transform : none;
            padding   : 20px 6vw 40px;
            gap       : 14px;
          }
          .founder-name  { font-size: clamp(14px, 4.5vw, 22px); }
          .quote-text    { font-size: clamp(12px, 3.2vw, 15px); }
        }

        @media (max-width: 480px) {
          .founder-title { font-size: clamp(36px, 13vw, 56px); }
          .founder-name  { font-size: clamp(13px, 4vw, 18px); }
          .quote-text    { font-size: clamp(11px, 2.8vw, 13px); }
        }

        @media (max-width: 360px) {
          .founder-title { font-size: 32px; }
          .founder-name  { font-size: 13px; }
          .quote-text    { font-size: 11px; }
        }
      `}</style>
    </section>
  );
}