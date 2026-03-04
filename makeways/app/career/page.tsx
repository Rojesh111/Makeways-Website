'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CareerPage() {
  return (
    <>
      <Header />

      {/*
        CRITICAL FIX: Header is position:fixed.
        Desktop: padding(16px) + logo(72px) + padding(16px) = 104px
        Mobile ≤900px: padding(10px) + logo(54px) + padding(10px) = 74px
        The <main> must push down by exactly these amounts.
      */}
      <main className="career-main">
        <section className="career">

          {/* ── TOP: CAREER title + role list ── */}
          <div className="career__top">
            <h1 className="career__title">CAREER</h1>
            <div className="career__top-right">
              <p className="career__tagline">
                Join Nepal's most awarded advertising agency.
              </p>
              <p className="career__roles">
                designer&nbsp;&nbsp;|&nbsp;&nbsp;editor&nbsp;&nbsp;|&nbsp;&nbsp;content creator<br />
                social media manager&nbsp;&nbsp;|&nbsp;&nbsp;client manager<br />
                videographer&nbsp;&nbsp;|&nbsp;&nbsp;script writer
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="career__rule" />

          {/* ── BOTTOM: Apply for Job / Internship ── */}
          <div className="career__bottom">

            <div className="career__col">
              <h2 className="career__apply">
                APPLY<br />FOR JOB
              </h2>
              <a href="mailto:jobs@makeways.agency" className="career__email">
                jobs@makeways.agency
              </a>
            </div>

            <div className="career__divider" aria-hidden="true">/</div>

            <div className="career__col">
              <h2 className="career__apply">
                APPLY<br />FOR<br />INTERNSHIP
              </h2>
              <a href="mailto:intern@makeways.agency" className="career__email">
                intern@makeways.agency
              </a>
            </div>

          </div>

        </section>
      </main>

      <Footer />

      <style jsx>{`

        /* ── @font-face ──────────────────────────────────────────────── */
        @font-face {
          font-family  : 'Eurostile';
          src          : url('/fonts/FONTS/EurostileExt-Normal_Regular.ttf') format('truetype');
          font-weight  : 400;
          font-style   : normal;
          font-display : swap;
        }
        @font-face {
          font-family  : 'Eurostile';
          src          : url('/fonts/FONTS/EurostileTBold.ttf') format('truetype');
          font-weight  : 700;
          font-style   : normal;
          font-display : swap;
        }
        @font-face {
          font-family  : 'Eurostile';
          src          : url('/fonts/FONTS/EurostileTBold.ttf') format('truetype');
          font-weight  : 800;
          font-style   : normal;
          font-display : swap;
        }
        @font-face {
          font-family  : 'Eurostile';
          src          : url('/fonts/FONTS/EurostileExtended.ttf') format('truetype');
          font-weight  : 900;
          font-style   : normal;
          font-display : swap;
        }

        /* ── Tokens ──────────────────────────────────────────────────── */
        .career {
          --eu     : 'Eurostile', 'Eurostile Bold', 'EurostileExt';
          --orange : #f47c20;
          --dark   : #1a1a1a;
          --white  : #ffffff;
        }

        /* ─────────────────────────────────────────────────────────────
           CRITICAL: margin-top on <main> clears the fixed header.
           Desktop header = 16px pad + 72px logo + 16px pad = 104px
           This is set here on the wrapper, NOT on the section,
           so the orange background still fills full viewport height.
        ───────────────────────────────────────────────────────────── */
        .career-main {
          margin-top : 104px;               /* clears fixed header desktop */
          min-height : calc(100vh - 104px); /* section fills remaining vh  */
          display    : flex;
          flex-direction: column;
        }

        /* ── Section ─────────────────────────────────────────────────── */
        .career {
          background     : var(--orange);
          width          : 100%;
          flex           : 1;              /* stretches to fill career-main */
          padding        : 72px 60px 80px;
          display        : flex;
          flex-direction : column;
          justify-content: center;
          gap            : 52px;
          box-sizing     : border-box;
          font-family    : var(--eu);
          overflow-x     : hidden;
        }

        /* ── TOP ROW ─────────────────────────────────────────────────── */
        .career__top {
          display     : flex;
          align-items : center;
          gap         : 48px;
        }

        /* H1 Display — clamp(56px, 7.5vw, 96px) fw 900 */
        .career__title {
          font-family    : var(--eu);
          font-weight    : 900;
          font-size      : clamp(56px, 7.5vw, 96px);
          color          : var(--white);
          text-transform : uppercase;
          letter-spacing : 4px;
          line-height    : 1;
          margin         : 0;
          white-space    : nowrap;
          flex-shrink    : 0;
        }

        .career__top-right {
          display        : flex;
          flex-direction : column;
          gap            : 10px;
        }

        /* Tagline — clamp(11px, 0.85vw, 13px) fw 700 uppercase muted */
        .career__tagline {
          font-family    : var(--eu);
          font-weight    : 700;
          font-size      : clamp(11px, 0.85vw, 13px);
          color          : rgba(255,255,255,0.65);
          letter-spacing : 2.5px;
          text-transform : uppercase;
          line-height    : 1.4;
          margin         : 0;
        }

        /* Role list — clamp(13px, 1.1vw, 15px) fw 400 lh 2 */
        .career__roles {
          font-family    : var(--eu);
          font-weight    : 400;
          font-size      : clamp(13px, 1.1vw, 15px);
          color          : rgba(255,255,255,0.92);
          line-height    : 2;
          letter-spacing : 0.4px;
          margin         : 0;
        }

        /* ── Rule ────────────────────────────────────────────────────── */
        .career__rule {
          width      : 100%;
          height     : 1px;
          background : rgba(255,255,255,0.22);
          flex-shrink: 0;
        }

        /* ── BOTTOM ROW ──────────────────────────────────────────────── */
        .career__bottom {
          display     : flex;
          align-items : flex-start;
        }

        .career__col {
          flex           : 1;
          display        : flex;
          flex-direction : column;
          gap            : 20px;
        }

        /* Centre slash — decorative divider */
        .career__divider {
          font-family    : var(--eu);
          font-weight    : 900;
          font-size      : clamp(80px, 11vw, 152px);
          color          : var(--white);
          opacity        : 0.28;
          line-height    : 1;
          padding        : 0 clamp(24px, 3.5vw, 56px);
          align-self     : center;
          user-select    : none;
          letter-spacing : -4px;
        }

        /* H2 Apply — clamp(32px, 4.5vw, 60px) fw 800 dark */
        .career__apply {
          font-family    : var(--eu);
          font-weight    : 800;
          font-size      : clamp(32px, 4.5vw, 60px);
          color          : var(--dark);
          text-transform : uppercase;
          letter-spacing : 1.5px;
          line-height    : 1.05;
          margin         : 0;
        }

        /* Email — clamp(12px, 1vw, 15px) fw 400 */
        .career__email {
          font-family       : var(--eu);
          font-weight       : 400;
          font-size         : clamp(12px, 1vw, 15px);
          color             : var(--white);
          letter-spacing    : 0.6px;
          line-height       : 1.5;
          text-decoration   : none;
          opacity           : 0.88;
          display           : inline-block;
          transition        : opacity 0.2s ease, letter-spacing 0.2s ease;
        }
        .career__email:hover {
          opacity               : 1;
          letter-spacing        : 1px;
          text-decoration       : underline;
          text-underline-offset : 4px;
        }

        /* ── 1280px ──────────────────────────────────────────────────── */
        @media (max-width: 1280px) {
          .career { padding: 64px 48px 72px; gap: 44px; }
        }

        /* ── 1024px ──────────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .career { padding: 56px 40px 64px; gap: 40px; }
          .career__top { gap: 36px; }
        }

        /* ── 900px — header switches to mobile (74px tall) ───────────── */
        /*   Header: padding(10px) + logo(54px) + padding(10px) = 74px   */
        @media (max-width: 900px) {
          .career-main {
            margin-top : 74px;
            min-height : calc(100vh - 74px);
          }
          .career { padding: 56px 28px 64px; gap: 36px; }
        }

        /* ── 768px — stack layout ────────────────────────────────────── */
        @media (max-width: 768px) {
          .career {
            padding         : 48px 28px 56px;
            gap             : 32px;
            justify-content : flex-start;
          }

          /* Stack title + roles vertically */
          .career__top {
            flex-direction : column;
            align-items    : flex-start;
            gap            : 14px;
          }

          .career__title {
            white-space : normal;
            font-size   : clamp(52px, 12vw, 72px);
          }

          /* Stack apply cols vertically */
          .career__bottom { flex-direction: column; }

          /* Hide slash on mobile */
          .career__divider { display: none; }

          /* Separator between job + internship */
          .career__col:first-child {
            padding-bottom : 32px;
            margin-bottom  : 32px;
            border-bottom  : 1px solid rgba(255,255,255,0.28);
          }

          .career__apply { font-size: clamp(36px, 10vw, 54px); }
          .career__roles { line-height: 1.85; }
        }

        /* ── 520px ───────────────────────────────────────────────────── */
        @media (max-width: 520px) {
          .career {
            padding : 40px 20px 48px;
            gap     : 24px;
          }
          .career__title   { font-size: clamp(42px, 12vw, 60px); letter-spacing: 2px; }
          .career__apply   { font-size: clamp(30px, 10vw, 46px); letter-spacing: 1px; }
          .career__roles   { font-size: 13px; line-height: 1.8; }
          .career__tagline { font-size: 11px; }
          .career__email   { font-size: 13px; }
        }

        /* ── 360px ───────────────────────────────────────────────────── */
        @media (max-width: 360px) {
          .career  { padding: 36px 16px 44px; gap: 20px; }
          .career__title { font-size: 38px; }
          .career__apply { font-size: 28px; }
          .career__roles { font-size: 12px; }
        }
      `}</style>
    </>
  );
}