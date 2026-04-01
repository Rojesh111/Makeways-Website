'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ROW1 = ['designer', 'editor', 'content creator', 'social media manager'];
const ROW2 = ['client manager', 'videographer', 'script writer'];

export default function CareerPage() {
  return (
    <>
      <Header />

      <main className="cw">
        <section className="cs">

          {/* TOP */}
          <div className="cs-top">
            <h1 className="cs-title">CAREER</h1>
            <div className="cs-roles-wrap">
              <div className="cs-roles">
                {ROW1.map((r, i) => (
                  <span key={r} className="cs-role">
                    {r}{i < ROW1.length - 1 && <span className="cs-pipe"> | </span>}
                  </span>
                ))}
              </div>
              <div className="cs-roles">
                {ROW2.map((r, i) => (
                  <span key={r} className="cs-role">
                    {r}{i < ROW2.length - 1 && <span className="cs-pipe"> | </span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="cs-bottom">
            <div className="cs-col cs-col--left">
              <h2 className="cs-label">APPLY<br />FOR JOB</h2>
              <a href="mailto:jobs@makeways.agency" className="cs-mail">
                jobs@makeways.agency
              </a>
            </div>

            <div className="cs-slash" aria-hidden="true">/</div>

            <div className="cs-col cs-col--right">
              <h2 className="cs-label">APPLY<br />FOR<br />INTERNSHIP</h2>
              <a href="mailto:intern@makeways.agency" className="cs-mail">
                intern@makeways.agency
              </a>
            </div>
          </div>

        </section>
      </main>

      <Footer />

      <style jsx>{`

        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileExt-Normal_Regular.ttf') format('truetype');
          font-weight: 400; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileTBold.ttf') format('truetype');
          font-weight: 700; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileTBold.ttf') format('truetype');
          font-weight: 800; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileTBold.ttf') format('truetype');
          font-weight: 900; font-display: swap;
        }

        /* ── Shell ── */
        .cw {
          margin-top: 104px;
          font-family: 'Eurostile', sans-serif;
        }

        /* ── Section ── */
        .cs {
          background: #FF8C00;
          width: 100%;
          height: 680px;
          box-sizing: border-box;
          padding: 56px 72px 60px;
          display: grid;
          grid-template-rows: 1fr 1fr;
          overflow: hidden;
        }

        /* ── TOP ROW ── */
        .cs-top {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          column-gap: 64px;
          align-self: center;
          min-width: 0;
        }

        .cs-title {
          font-weight: 900;
          font-size: clamp(72px, 9vw, 120px);
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 2px;
          line-height: 1;
          margin: 0;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .cs-roles-wrap {
          min-width: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cs-roles {
          display: flex;
          align-items: baseline;
          flex-wrap: nowrap;
          font-weight: 700;
          font-size: clamp(14px, 1.35vw, 19px);
          color: rgba(255,255,255,0.93);
          letter-spacing: 0.3px;
          line-height: 1.75;
          white-space: nowrap;
        }

        .cs-role {
          white-space: nowrap;
          display: inline-flex;
          align-items: baseline;
        }

        .cs-pipe {
          color: rgba(255,255,255,0.5);
          padding: 0 6px;
        }

        /* ── BOTTOM ROW ── */
        .cs-bottom {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          align-self: center;
          min-width: 0;
          /* pulls both cols inward toward the slash */
          padding: 0 clamp(40px, 7vw, 120px);
        }

        .cs-col {
          display: flex;
          flex-direction: column;
          gap: 22px;
          min-width: 0;
        }

        /* left col: right-align content so it sits flush against the slash */
        .cs-col--left {
          align-items: flex-end;
          text-align: right;
          top: 50%;
          transform: translateY(-15%);
        }

        /* right col: default left-align */
        .cs-col--right {
          align-items: flex-start;
          text-align: left;
        }

        .cs-label {
          margin: 0;
          font-weight: 900;
          font-size: clamp(36px, 5vw, 72px);
          color: #2b2b2b;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.05;
        }

        .cs-mail {
          font-weight: 700;
          font-size: clamp(13px, 1.2vw, 18px);
          color: rgba(255,255,255,0.88);
          letter-spacing: 0.4px;
          text-decoration: none;
          display: block;
          white-space: nowrap;
          transition: color 0.2s, letter-spacing 0.2s;
        }
        .cs-mail:hover {
          color: #fff;
          letter-spacing: 0.8px;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        /* ── Slash ── */
        .cs-slash {
          font-weight: 900;
          font-size: clamp(120px, 16vw, 220px);
          color: #ffffff;
          line-height: 1;
          text-align: center;
          padding: 0 clamp(20px, 3vw, 48px);
          user-select: none;
          flex-shrink: 0;
          letter-spacing: -8px;
        }

        /* ── 900px ── */
        @media (max-width: 900px) {
          .cw { margin-top: 74px; }
          .cs {
            height: auto;
            min-height: 680px;
            padding: 48px 40px 56px;
          }
          .cs-bottom { padding: 0 clamp(20px, 4vw, 60px); }
        }

        /* ── 768px ── */
        @media (max-width: 768px) {
          .cs {
            height: auto;
            min-height: unset;
            padding: 44px 28px 52px;
            grid-template-rows: auto auto;
            gap: 40px;
          }

          .cs-top {
            grid-template-columns: 1fr;
            row-gap: 14px;
          }

          .cs-title { font-size: clamp(52px, 14vw, 80px); }
          .cs-roles { flex-wrap: wrap; white-space: normal; }

          .cs-bottom {
            grid-template-columns: 1fr;
            padding: 0;
            gap: 0;
          }

          .cs-slash { display: none; }

          .cs-col--left {
            align-items: flex-start;
            text-align: left;
            padding-bottom: 32px;
            margin-bottom: 32px;
            border-bottom: 1px solid rgba(255,255,255,0.35);
          }

          .cs-label { font-size: clamp(34px, 10vw, 56px); }
          .cs-mail  { white-space: normal; word-break: break-all; }
        }

        /* ── 520px ── */
        @media (max-width: 520px) {
          .cs       { padding: 36px 20px 44px; gap: 28px; }
          .cs-title { font-size: clamp(40px, 13vw, 60px); }
          .cs-label { font-size: clamp(28px, 9vw, 44px); }
          .cs-roles { font-size: 13px; line-height: 1.7; }
          .cs-mail  { font-size: 13px; }
        }

        /* ── 360px ── */
        @media (max-width: 360px) {
          .cs       { padding: 28px 16px 36px; }
          .cs-title { font-size: 36px; }
          .cs-label { font-size: 26px; }
          .cs-roles { font-size: 12px; }
        }
      `}</style>
    </>
  );
}