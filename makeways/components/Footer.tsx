'use client';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

interface Social {
  name: string;
  icon: React.ReactNode;
  url: string;
}

export default function Footer() {
  const socials: Social[] = [
    { name: 'Facebook', icon: <FacebookIcon />, url: '#' },
    { name: 'Instagram', icon: <InstagramIcon />, url: '#' },
    { name: 'YouTube', icon: <YouTubeIcon />, url: '#' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, url: '#' },
    { name: 'TikTok', icon: <TikTokIcon />, url: '#' }
  ];

  return (
    <>
      <footer id="contact" className="footer">

        {/* TOP ROW: Career | Gallery  +  note */}
        <div className="footer-top">
          <nav className="footer-nav">
            <a href="/career" className="nav-link">CAREER</a>
            <span className="divider">|</span>
            <a href="/gallery" className="nav-link">GALLERY</a>
          </nav>
          <p className="new-pages-note">NEW PAGES NEED TO BE ADDED: LINKEDIN / YOUTUBE</p>
        </div>

        {/* MIDDLE ROW: SOCIALS label + icons */}
        <div className="footer-middle">
          <h2 className="socials-label">SOCIALS</h2>
          <div className="social-icons">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className={`social-icon social-icon--${social.name.toLowerCase()}`}
                aria-label={social.name}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: MAKEWAYS + Contact detail (left) | Map (right) */}
        <div className="footer-bottom">
          <div className="footer-brand">
            <h1 className="brand-name">MAKEWAYS</h1>
            <p className="brand-sub">CONTACT DETAIL</p>
            <div className="contact-details">
              <p>Email: info@makeways.com</p>
              <p>Phone: +977-1-4257753 / +977-9851077200</p>
              <p>Address: Tripurshwor, Kathmandu, Nepal</p>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d354.16245901485155!2d85.31081138610872!3d27.69536453178851!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18525635b42d%3A0x6048d789a442de0c!2sMAKEWAYS%20AdAgency!5e1!3m2!1sen!2snp!4v1771174914361!5m2!1sen!2snp"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.app.goo.gl/YXBh3PD7uxfEbF6C7"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              View on Google Maps →
            </a>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="footer-copyright">
          <p>&copy; 2015 MAKEWAYS. All rights reserved.</p>
        </div>

      </footer>

      <style jsx>{`
        .footer {
          background: #fff;
          color: #111;
          font-family: 'Arial', sans-serif;
          border-top: 2px solid #111;
        }

        /* ── TOP ROW ── */
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 60px 0;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 20px;
        }

        .footer-nav {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-link {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #111;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #e63c20;
        }

        .divider {
          font-weight: 300;
          color: #999;
          font-size: 15px;
        }

        .new-pages-note {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #e63c20;
          text-transform: uppercase;
          margin: 0;
        }

        /* ── MIDDLE ROW ── */
        .footer-middle {
          display: flex;
          align-items: center;
          gap: 40px;
          padding: 40px 60px;
          border-bottom: 1px solid #e0e0e0;
        }

        .socials-label {
          font-size: clamp(52px, 7vw, 90px);
          font-weight: 900;
          letter-spacing: -1px;
          margin: 0;
          color: #111;
          text-transform: uppercase;
          line-height: 1;
          white-space: nowrap;
        }

        .social-icons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .social-icon {
          width: 64px;
          height: 64px;
          background: #111;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-decoration: none;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .social-icon:hover {
          background: #e63c20;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(230, 60, 32, 0.35);
        }

        /* ── BOTTOM ROW ── */
        .footer-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          min-height: 340px;
        }

        .footer-brand {
          padding: 40px 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-right: 1px solid #e0e0e0;
        }

        .brand-name {
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 900;
          letter-spacing: -1px;
          margin: 0 0 4px;
          color: #111;
          text-transform: uppercase;
          line-height: 1;
        }

        .brand-sub {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 3px;
          color: #111;
          text-transform: uppercase;
          margin: 0 0 24px;
          opacity: 0.5;
        }

        .contact-details p {
          font-size: 14px;
          line-height: 1.9;
          color: #444;
          margin: 0;
        }

        /* MAP */
        .map-container {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .map-container iframe {
          width: 100%;
          flex: 1;
          min-height: 300px;
          display: block;
        }

        .map-link {
          display: block;
          text-align: center;
          padding: 10px;
          background: #111;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-decoration: none;
          transition: background 0.2s;
        }

        .map-link:hover {
          background: #e63c20;
        }

        /* COPYRIGHT */
        .footer-copyright {
          border-top: 1px solid #e0e0e0;
          padding: 18px 60px;
          text-align: center;
        }

        .footer-copyright p {
          font-size: 12px;
          color: #999;
          margin: 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 20px 24px;
          }

          .footer-middle {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            padding: 32px 24px;
          }

          .footer-bottom {
            grid-template-columns: 1fr;
          }

          .footer-brand {
            padding: 32px 24px;
            border-right: none;
            border-bottom: 1px solid #e0e0e0;
          }

          .map-container iframe {
            min-height: 260px;
          }

          .footer-copyright {
            padding: 18px 24px;
          }

          .social-icon {
            width: 52px;
            height: 52px;
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
}