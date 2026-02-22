'use client';
import { JSX, useState } from 'react';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const socials = [
  { name: 'Facebook',  Icon: FacebookIcon,  url: '#' },
  { name: 'Instagram', Icon: InstagramIcon, url: '#' },
  { name: 'YouTube',   Icon: YouTubeIcon,   url: '#' },
  { name: 'LinkedIn',  Icon: LinkedInIcon,  url: '#' },
  { name: 'TikTok',    Icon: TikTokIcon,    url: '#' },
];

// Street view default, satellite as alternative
const MAP_URLS = {
  street: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d354.16245901485155!2d85.31081138610872!3d27.69536453178851!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18525635b42d%3A0x6048d789a442de0c!2sMAKEWAYS%20AdAgency!5e0!3m2!1sen!2snp!4v1771174914361!5m2!1sen!2snp',
  satellite: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d354.16245901485155!2d85.31081138610872!3d27.69536453178851!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18525635b42d%3A0x6048d789a442de0c!2sMAKEWAYS%20AdAgency!5e1!3m2!1sen!2snp!4v1771174914361!5m2!1sen!2snp',
};

function SocialBtn({ name, Icon, url }: { name: string; Icon: () => JSX.Element; url: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={url} aria-label={name}
      className={`s-btn${hov ? ' hov' : ''}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Icon />
      <style jsx>{`
        .s-btn {
          width: 46px; height: 46px; border-radius: 50%;
          background: #111; color: #fff;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; flex-shrink: 0;
          transition: background .2s, transform .2s;
        }
        .s-btn.hov { background: #FF8C00; transform: translateY(-3px); }
      `}</style>
    </a>
  );
}

export default function Footer() {
  const [mapView, setMapView] = useState<'street' | 'satellite'>('street');

  return (
    <>
      <footer id="contact" className="ft">

        {/* ROW 1 — nav */}
        <div className="ft__nav">
          <a href="/career"  className="ft__nl">CAREER</a>
          <span className="ft__pipe">|</span>
          <a href="/gallery" className="ft__nl">GALLERY</a>
        </div>

        {/* ROW 2 — main grid */}
        <div className="ft__main">

          {/* LEFT: MAKEWAYS + contact */}
          <div className="ft__brand">
            <h2 className="ft__name">MAKEWAYS</h2>
            <p className="ft__sub">CONTACT DETAIL</p>
            <div className="ft__info">
              <p>Email: info@makeways.com</p>
              <p>Phone: +977-1-4257753</p>
              <p>Mobile: +977-9851077200</p>
              <p>Address: Tripurshwor, Kathmandu, Nepal</p>
            </div>
          </div>

          {/* RIGHT: SOCIALS heading + icons, then map */}
          <div className="ft__right">

            {/* SOCIALS — same font size as MAKEWAYS */}
            <div className="ft__socials">
              <h2 className="ft__sl">SOCIALS</h2>
              <div className="ft__icons">
                {socials.map(s => <SocialBtn key={s.name} {...s} />)}
              </div>
            </div>

            {/* MAP with street/satellite toggle */}
            <div className="ft__map">
              {/* Toggle bar */}
              <div className="ft__toggle">
                <button
                  className={`ft__tog${mapView === 'street' ? ' active' : ''}`}
                  onClick={() => setMapView('street')}
                >
                  STREET
                </button>
                <button
                  className={`ft__tog${mapView === 'satellite' ? ' active' : ''}`}
                  onClick={() => setMapView('satellite')}
                >
                  SATELLITE
                </button>
              </div>

              {/* Map iframe */}
              <div className="ft__iframe-wrap">
                <iframe
                  key={mapView}
                  src={MAP_URLS[mapView]}
                  width="100%" height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* View on Google Maps */}
              <a href="https://maps.app.goo.gl/YXBh3PD7uxfEbF6C7"
                target="_blank" rel="noopener noreferrer"
                className="ft__mapbtn">
                VIEW ON GOOGLE MAPS →
              </a>
            </div>

          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="ft__copy">
          © 2015 MAKEWAYS. ALL RIGHTS RESERVED.
        </div>

      </footer>

      <style jsx global>{`
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileBold.ttf') format('truetype');
          font-weight: 700 900;
          font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileExt-Normal Regular.ttf') format('truetype');
          font-weight: 400;
          font-display: swap;
        }
      `}</style>

      <style jsx>{`
        .ft {
          background: #fff;
          border-top: 3px solid #FF8C00;
          font-family: 'Eurostile', 'Arial Black', Arial, sans-serif;
          padding: 0 52px;
        }

        /* NAV */
        .ft__nav {
          display: flex; align-items: center; gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }
        .ft__nl {
          font-size: 10px; font-weight: 700;
          letter-spacing: 2.5px; color: #111;
          text-decoration: none; text-transform: uppercase;
          transition: color .2s;
        }
        .ft__nl:hover { color: #FF8C00; }
        .ft__pipe { color: #ddd; font-size: 14px; }

        /* MAIN GRID */
        .ft__main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 20px 0 18px;
          align-items: start;
        }

        /* LEFT */
        .ft__name {
          font-size: clamp(36px, 5vw, 68px);
          font-weight: 900; color: #111;
          letter-spacing: -1px; line-height: 1;
          margin: 0 0 4px; text-transform: uppercase;
        }
        .ft__sub {
          font-size: 9px; font-weight: 700;
          letter-spacing: 4px; color: #aaa;
          text-transform: uppercase; margin: 0 0 14px;
        }
        .ft__info p {
          font-size: 12px; color: #555;
          margin: 0; line-height: 1.9;
        }

        /* RIGHT COLUMN */
        .ft__right {
          display: flex; flex-direction: column; gap: 14px;
        }

        /* SOCIALS — same size as MAKEWAYS */
        .ft__socials {
          display: flex; align-items: center; gap: 16px;
        }
        .ft__sl {
          font-size: clamp(36px, 5vw, 68px);
          font-weight: 900; letter-spacing: -1px;
          color: #111; text-transform: uppercase;
          line-height: 1; white-space: nowrap;
          margin: 0;
        }
        .ft__icons {
          display: flex; gap: 9px; align-items: center;
          flex-wrap: wrap;
        }

        /* MAP */
        .ft__map {
          overflow: hidden; border-radius: 3px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.1);
          display: flex; flex-direction: column;
        }

        /* Toggle buttons */
        .ft__toggle {
          display: flex;
          border-bottom: 1px solid #eee;
          flex-shrink: 0;
        }
        .ft__tog {
          flex: 1; padding: 8px 0;
          background: #f5f5f5; border: none;
          font-family: 'Eurostile', 'Arial Black', Arial, sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 2px; color: #999;
          text-transform: uppercase;
          cursor: pointer;
          transition: background .2s, color .2s;
        }
        .ft__tog:first-child {
          border-right: 1px solid #eee;
        }
        .ft__tog.active {
          background: #111; color: #fff;
        }
        .ft__tog:not(.active):hover {
          background: #eee; color: #111;
        }

        .ft__iframe-wrap {
          height: 185px; flex-shrink: 0;
        }
        .ft__iframe-wrap iframe {
          width: 100%; height: 100%; display: block; border: 0;
        }

        .ft__mapbtn {
          display: block; text-align: center;
          padding: 9px 16px;
          background: #111; color: #fff;
          font-family: 'Eurostile', 'Arial Black', Arial, sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 2px; text-decoration: none;
          text-transform: uppercase;
          transition: background .2s;
          flex-shrink: 0;
        }
        .ft__mapbtn:hover { background: #FF8C00; }

        /* COPYRIGHT */
        .ft__copy {
          text-align: center;
          font-size: 9px; letter-spacing: 2px;
          color: #bbb; text-transform: uppercase;
          padding: 10px 0 14px;
          border-top: 1px solid #eee;
        }

        @media (max-width: 768px) {
          .ft { padding: 0 20px; }
          .ft__main { grid-template-columns: 1fr; gap: 20px; }
          .ft__socials { flex-wrap: wrap; }
          .ft__iframe-wrap { height: 160px; }
        }
      `}</style>
    </>
  );
}