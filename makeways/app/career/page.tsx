'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CareerPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Russo+One&family=Barlow:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <Header />

      <main>
        <section className="career-section">

          {/* TOP ROW: CAREER + job roles */}
          <div className="career-top">
            <h1 className="career-title">CAREER</h1>
            <p className="career-roles">
              designer | editor | content creator<br />
              social media manager | client manager<br />
              videographer | script writer
            </p>
          </div>

          {/* BOTTOM ROW: Apply for Job / Apply for Internship */}
          <div className="career-bottom">

            {/* LEFT: Apply for Job */}
            <div className="career-col">
              <h2 className="apply-heading">APPLY<br />FOR JOB</h2>
              <a href="mailto:jobs@makeways.agency" className="apply-email">
                jobs@makeways.agency
              </a>
            </div>

            {/* DIVIDER */}
            <div className="career-divider">/</div>

            {/* RIGHT: Apply for Internship */}
            <div className="career-col">
              <h2 className="apply-heading">APPLY<br />FOR<br />INTERNSHIP</h2>
              <a href="mailto:intern@makeways.agency" className="apply-email">
                intern@makeways.agency
              </a>
            </div>

          </div>

        </section>
      </main>

      <Footer />

      <style jsx>{`
        .career-section {
          background: #f07c00;
          width: 100%;
          min-height: calc(100vh - 112px); /* fills screen minus header */
          padding: 64px 60px 72px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 52px;
          font-family: 'Russo One', 'Eurostile', 'Microgramma', 'Arial Narrow', sans-serif;
          box-sizing: border-box;
        }

        /* ── TOP ROW ── */
        .career-top {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .career-title {
          font-family: 'Russo One', 'Eurostile', sans-serif;
          font-size: clamp(52px, 7vw, 100px);
          font-weight: 900;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin: 0;
          line-height: 1;
          white-space: nowrap;
        }

        .career-roles {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(13px, 1.3vw, 17px);
          color: #fff;
          line-height: 1.9;
          letter-spacing: 0.3px;
          margin: 0;
          opacity: 0.95;
        }

        /* ── BOTTOM ROW ── */
        .career-bottom {
          display: flex;
          align-items: flex-start;
        }

        .career-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .career-divider {
          font-family: 'Russo One', sans-serif;
          font-size: clamp(80px, 12vw, 160px);
          color: #fff;
          opacity: 0.45;
          line-height: 1;
          padding: 0 40px;
          align-self: center;
          user-select: none;
        }

        .apply-heading {
          font-family: 'Russo One', 'Eurostile', sans-serif;
          font-size: clamp(32px, 4.5vw, 64px);
          font-weight: 900;
          color: #3d2800;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.05;
          margin: 0;
        }

        .apply-email {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(13px, 1.2vw, 16px);
          color: #fff;
          letter-spacing: 0.5px;
          text-decoration: none;
          opacity: 0.9;
          transition: opacity 0.2s;
          display: inline-block;
        }

        .apply-email:hover {
          opacity: 1;
          text-decoration: underline;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .career-section {
            padding: 48px 28px 56px;
            gap: 36px;
            min-height: unset;
          }

          .career-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .career-bottom {
            flex-direction: column;
            gap: 36px;
          }

          .career-divider {
            display: none;
          }

          .career-col:first-child {
            padding-bottom: 36px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
    </>
  );
}