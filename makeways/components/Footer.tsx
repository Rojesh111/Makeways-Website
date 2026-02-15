'use client';

interface Social {
  name: string;
  icon: string;
  url: string;
}

export default function Footer() {
  const socials: Social[] = [
    { name: 'Facebook', icon: 'FB', url: '#' },
    { name: 'Instagram', icon: 'IG', url: '#' },
    { name: 'YouTube', icon: 'YT', url: '#' },
    { name: 'LinkedIn', icon: 'LI', url: '#' },
    { name: 'TikTok', icon: 'TT', url: '#' }
  ];

  return (
    <>
      <footer id="contact" className="footer">
        <div className="footer-wrapper">
          <div className="footer-content">

            {/* LEFT - Logo + Map */}
            <div className="footer-left">
              <h2 className="footer-logo">MAKEWAYS</h2>
              <p className="footer-tagline">
                Taking our work too seriously<br />without taking ourselves seriously
              </p>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d354.16245901485155!2d85.31081138610872!3d27.69536453178851!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18525635b42d%3A0x6048d789a442de0c!2sMAKEWAYS%20AdAgency!5e1!3m2!1sen!2snp!4v1771174914361!5m2!1sen!2snp"
                  width="600"
                  height="800"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              <a
                href="https://maps.app.goo.gl/YXBh3PD7uxfEbF6C7"
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                View on Google Maps →
              </a>
            </div>

            {/* MIDDLE - Services */}
            <div className="footer-section">
              <h3>Services</h3>
              <ul>
                <li>TVC Production</li>
                <li>Print Campaigns</li>
                <li>Digital Marketing</li>
                <li>Event Management</li>
                <li>Jingle Creation</li>
              </ul>
            </div>

            {/* RIGHT - Contact + Socials */}
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Email: info@makeways.com</p>
              <p>Phone: +977-1-4257753</p>
              <p>+977-9851077200</p>
              <p>Address: Tripurshwor, Kathmandu, Nepal</p>

              <h3 className="socials-heading">Socials</h3>
              <div className="social-links">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="social-icon"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2015 MAKEWAYS. All rights reserved.</p>
        </div>

      </footer>

      <style jsx>{`
        .footer {
          background: var(--dark);
          color: white;
          overflow: hidden;
          max-height: 80vh;
        }

        /* EQUAL PADDING WRAPPER */
        .footer-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 80px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.2fr;
          gap: 60px;
          align-items: start;
        }

        /* LEFT */
        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          font-size: 38px;
          color: var(--orange);
          letter-spacing: 4px;
          font-weight: bold;
          margin: 0;
        }

        .footer-tagline {
          font-size: 14px;
          line-height: 1.7;
          opacity: 0.7;
          font-style: italic;
          margin: 0;
        }

        .map-container {
          position: relative;
          width: 100%;
          height: 240px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .map-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .map-link {
          color: var(--orange);
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .map-link:hover {
          color: white;
          transform: translateX(5px);
        }

        /* MIDDLE + RIGHT */
        .footer-section {
          display: flex;
          flex-direction: column;
          padding-top: 7px;
        }

        .footer-section h3 {
          font-size: 16px;
          color: var(--orange);
          margin: 0 0 20px 50px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0 0 0 50px;
        }

        .footer-section li {
          font-size: 14px;
          line-height: 2.4;
          opacity: 0.75;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .footer-section li:hover {
          opacity: 1;
          color: var(--orange);
          padding-left: 6px;
        }

        .footer-section p {
          font-size: 14px;
          line-height: 1.95;
          opacity: 0.75;
          margin: 0 0 2px 50px;
        }

        .socials-heading {
          margin-top: 36px !important;
          margin-bottom: 16px !important;
        }

        /* SOCIAL ICONS */
        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .social-icon {
          width: 42px;
          height: 42px;
          background: rgba(255, 255, 255, 0.07);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .social-icon:hover {
          background: var(--orange);
          border-color: var(--orange);
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(255, 140, 0, 0.3);
        }

        /* BOTTOM BAR */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 22px 80px;
          text-align: center;
        }

        .footer-bottom p {
          font-size: 13px;
          opacity: 0.45;
          margin: 0;
        }

        /* MOBILE */
        @media (max-width: 1024px) {
          .footer-wrapper {
            padding: 50px 40px;
          }

          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          .footer-left {
            grid-column: 1 / -1;
          }

          .map-container {
            height: 200px;
          }
        }

        @media (max-width: 640px) {
          .footer-wrapper {
            padding: 40px 24px;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .footer-left {
            grid-column: auto;
          }

          .footer-bottom {
            padding: 22px 24px;
          }
        }
      `}</style>
    </>
  );
}