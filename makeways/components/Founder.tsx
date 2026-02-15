'use client';

export default function Founder() {
  return (
    <>
      <section className="founder-section">
        <div className="container">
          <div className="founder-content">
            <div className="founder-image-wrapper">
              <div className="founder-image">
                <div className="image-placeholder"></div>
              </div>
            </div>
            <div className="founder-info">
              <h2 className="founder-label">FOUNDER</h2>
              <h3 className="founder-name">BIDHAN RAJBHANDARI</h3>
              <p className="founder-quote">
                &quot;At MAKEWAYS, we take our work too seriously without taking ourselves seriously.&quot;
              </p>
              <p className="founder-bio">
                With over a decade of experience in creative marketing and brand strategy, 
                Bidhan founded MAKEWAYS with a vision to revolutionize how brands connect 
                with their audiences. His innovative approach combines data-driven insights 
                with artistic excellence to deliver campaigns that truly resonate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .founder-section {
          background: linear-gradient(135deg, var(--orange) 0%, #FFA500 100%);
          padding: 120px 20px;
          position: relative;
          overflow: hidden;
        }

        .founder-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }

        .founder-content {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .founder-image-wrapper {
          animation: slideInLeft 1s ease-out forwards;
        }

        .founder-image {
          position: relative;
        }

        .image-placeholder {
          width: 100%;
          aspect-ratio: 3/4;
          background: white;
          border-radius: 20px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
        }

        .image-placeholder::after {
          content: 'FOUNDER PHOTO';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--gray);
          font-size: 18px;
          font-weight: bold;
        }

        .founder-info {
          color: white;
          animation: slideInRight 1s ease-out forwards;
        }

        .founder-label {
          font-size: 72px;
          font-weight: bold;
          margin-bottom: 20px;
          letter-spacing: 4px;
          opacity: 0.95;
        }

        .founder-name {
          font-size: 36px;
          margin-bottom: 30px;
          letter-spacing: 2px;
          font-weight: 500;
        }

        .founder-quote {
          font-size: 22px;
          font-style: italic;
          margin-bottom: 30px;
          padding-left: 20px;
          border-left: 4px solid white;
          line-height: 1.6;
          opacity: 0.95;
        }

        .founder-bio {
          font-size: 18px;
          line-height: 1.8;
          opacity: 0.9;
        }

        @media (max-width: 968px) {
          .founder-content {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          
          .founder-label {
            font-size: 48px;
          }
          
          .founder-name {
            font-size: 28px;
          }
          
          .founder-quote {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
}