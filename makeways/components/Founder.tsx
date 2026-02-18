'use client';

export default function FounderSection() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Russo+One&family=Barlow:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <section className="founder-section">

        {/* FOUNDER — full width behind everything */}
        <h1 className="founder-title">FOUNDER</h1>

        {/* PHOTO — absolute, bottom-left, overlaps the FOUNDER text */}
        <div className="founder-photo">
          <img
           src="/images/images.jpeg"
            alt="Bidhan Rajbhandari"
          />
        </div>

        {/* NAME + QUOTE — absolute, right side, vertically centered in lower half */}
        <div className="founder-right">
          <h2 className="founder-name">
            BIDHAN<br />RAJBHANDARI
          </h2>
          <p className="founder-quote">
            At MAKEWAYS, we take our<br />
            work too seriously without<br />
            taking ourselves seriously.
          </p>
        </div>

      </section>

      <style jsx>{`
        /* ── SECTION: positioning context ── */
        .founder-section {
          position: relative;
          background: #d4d4d0;
          width: 100%;
          height: 520px;
          overflow: hidden;
          font-family: 'Russo One', 'Eurostile', 'Arial Narrow', sans-serif;
        }

        /* ── FOUNDER: full-width, top, behind photo ── */
        .founder-title {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          font-family: 'Russo One', 'Eurostile', sans-serif;
          font-size: clamp(100px, 15vw, 185px);
          font-weight: 900;
          color: #f07c00;
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height: 1;
          margin: 0;
          padding: 28px 0 0 40px;
          z-index: 1;
          white-space: nowrap;
        }

        /* ── PHOTO: bottom-left, overlaps FOUNDER text ── */
        .founder-photo {
          position: absolute;
          bottom: 0;
          left: 40px;
          z-index: 2; /* in front of FOUNDER text */
          width: clamp(220px, 32%, 400px);
        }

        .founder-photo img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: bottom;
          filter: grayscale(100%);
          /* Remove any white/checkered box — image must be PNG with transparent bg */
        }

        /* ── RIGHT SIDE: name + quote ── */
        .founder-right {
          position: absolute;
          right: 60px;
          /* vertically: start around middle of section, just below FOUNDER text */
          top: 50%;
          transform: translateY(-20%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 420px;
        }

        .founder-name {
          font-family: 'Russo One', 'Eurostile', sans-serif;
          font-size: clamp(28px, 3.5vw, 50px);
          font-weight: 900;
          color: #888;
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height: 1.1;
          margin: 0;
        }

        .founder-quote {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(13px, 1.1vw, 15px);
          color: #555;
          line-height: 1.9;
          letter-spacing: 0.4px;
          margin: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .founder-section {
            height: auto;
            min-height: 460px;
          }

          .founder-title {
            font-size: clamp(72px, 18vw, 130px);
          }

          .founder-right {
            right: 24px;
            top: 45%;
            max-width: 50%;
          }
        }

        @media (max-width: 600px) {
          .founder-section {
            min-height: 520px;
          }

          .founder-title {
            font-size: 72px;
            padding: 20px 0 0 20px;
          }

          .founder-photo {
            left: 16px;
            width: 55vw;
          }

          .founder-right {
            right: 16px;
            top: auto;
            bottom: 32px;
            transform: none;
            max-width: 48%;
          }

          .founder-name {
            font-size: 22px;
          }

          .founder-quote {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}