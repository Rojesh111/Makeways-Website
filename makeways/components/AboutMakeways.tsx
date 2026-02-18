'use client';

export default function AboutMakeways() {
  return (
    <>
      <section className="about-section">
        <div className="container">
          <h2 className="section-title"><span className="makeways-black">MAKE</span><span className="makeways-orange">WAYS</span></h2>
          
          <div className="intro-text">
            <p>Makeways Pvt. Ltd. is an independent, full-service advertising agency based in Kathmandu, Nepal, established in 2013. We deliver cutting-edge marcom solutions through a wide range of professional services.</p>
          </div>

          <div className="highlight-block">
            <div className="highlight-bar"></div>
            <div className="highlight-content">
              <h3>Guided by strategic thinking and creative precision, we help brands connect meaningfully with their audiences that translates into measurable results.</h3>
            </div>
          </div>

          <div className="body-text">
            <p>We continuously explore new disciplines and refine our offerings to stay ahead of everchanging trends and platforms.</p>
          </div>

          <div className="award-block">
            <h3>Makeways proudly stands as Nepal's most awarded advertising agency.</h3>
          </div>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Eurostile:wght@400;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .about-section {
          background: #ffffff;
          padding: 100px 20px;
          font-family: 'Eurostile', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          border-top: 6px solid #ff8c00;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }

        .section-title {
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 2px;
          margin: 0 0 40px 0;
          line-height: 1.2;
          font-family: 'Eurostile', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .makeways-black {
          color: #000000;
        }

        .makeways-orange {
          color: #ff8c00;
        }

        .intro-text {
          margin-bottom: 40px;
        }

        .intro-text p {
          font-size: 16px;
          color: #666666;
          line-height: 1.8;
          font-weight: 400;
          letter-spacing: 0.3px;
          margin: 0;
          font-family: 'Eurostile', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          text-align: left;
        }

        .highlight-block {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          margin-bottom: 40px;
          padding: 30px 0;
        }

        .highlight-bar {
          width: 6px;
          min-width: 6px;
          background: #ff8c00;
          border-radius: 3px;
          height: 100%;
          margin-top: 4px;
        }

        .highlight-content h3 {
          font-size: 26px;
          color: #1a1a1a;
          font-weight: 700;
          letter-spacing: 0.4px;
          margin: 0;
          line-height: 1.5;
          font-family: 'Eurostile', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          text-align: left;
        }

        .body-text {
          margin-bottom: 40px;
        }

        .body-text p {
          font-size: 16px;
          color: #666666;
          line-height: 1.8;
          font-weight: 400;
          letter-spacing: 0.3px;
          margin: 0;
          font-family: 'Eurostile', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          text-align: left;
        }

        .award-block {
          padding-top: 20px;
        }

        .award-block h3 {
          font-size: 26px;
          color: #1a1a1a;
          font-weight: 700;
          letter-spacing: 0.4px;
          margin: 0;
          line-height: 1.5;
          font-family: 'Eurostile', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          text-align: left;
        }

        /* Tablet Responsive */
        @media (max-width: 1024px) {
          .about-section {
            padding: 80px 24px;
          }

          .section-title {
            font-size: 40px;
            margin-bottom: 35px;
          }

          .intro-text,
          .body-text {
            margin-bottom: 35px;
          }

          .intro-text p,
          .body-text p {
            font-size: 15px;
          }

          .highlight-content h3,
          .award-block h3 {
            font-size: 22px;
          }

          .highlight-block {
            gap: 20px;
            padding: 25px 0;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .about-section {
            padding: 70px 16px;
            border-top: 5px solid #ff8c00;
          }

          .container {
            max-width: 100%;
          }

          .section-title {
            font-size: 32px;
            letter-spacing: 1.5px;
            margin-bottom: 30px;
          }

          .intro-text,
          .body-text {
            margin-bottom: 30px;
          }

          .intro-text p,
          .body-text p {
            font-size: 15px;
            line-height: 1.7;
          }

          .highlight-block {
            gap: 16px;
            padding: 20px 0;
          }

          .highlight-content h3,
          .award-block h3 {
            font-size: 20px;
            line-height: 1.5;
          }

          .award-block {
            padding-top: 15px;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .about-section {
            padding: 60px 12px;
            border-top: 4px solid #ff8c00;
          }

          .section-title {
            font-size: 28px;
            letter-spacing: 1px;
            margin-bottom: 25px;
          }

          .intro-text,
          .body-text {
            margin-bottom: 25px;
          }

          .intro-text p,
          .body-text p {
            font-size: 14px;
            line-height: 1.7;
          }

          .highlight-block {
            gap: 12px;
            padding: 18px 0;
          }

          .highlight-bar {
            width: 5px;
            margin-top: 3px;
          }

          .highlight-content h3,
          .award-block h3 {
            font-size: 18px;
            line-height: 1.5;
          }

          .award-block {
            padding-top: 12px;
          }
        }
      `}</style>
    </>
  );
}