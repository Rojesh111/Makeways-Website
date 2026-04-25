'use client';
import { JSX, useState } from 'react';
import Link from 'next/link';

const FacebookIcon  = () => (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>);
const InstagramIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>);
const YouTubeIcon   = () => (<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>);
const LinkedInIcon  = () => (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const TikTokIcon    = () => (<svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>);

const EmailIcon    = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>);
const PhoneIcon    = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>);
const LocationIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>);

const socials: { name: string; Icon: () => JSX.Element; url: string }[] = [
  { name: 'Facebook',  Icon: FacebookIcon,  url: 'https://www.facebook.com/profile.php?id=100064005604861' },
  { name: 'Instagram', Icon: InstagramIcon, url: 'https://www.instagram.com/makeways_advertising/' },
  { name: 'YouTube',   Icon: YouTubeIcon,   url: 'https://www.youtube.com/@MakewaysAdvertising' },
  { name: 'LinkedIn',  Icon: LinkedInIcon,  url: 'https://www.linkedin.com/in/makeways-advertising-643151402/' },
  { name: 'TikTok',    Icon: TikTokIcon,    url: 'https://www.tiktok.com/@makeways4?_r=1&_t=ZS-95fKscPJE8e' },
];

const contactRows: { Icon: () => JSX.Element; text: string; href?: string }[] = [
  { Icon: EmailIcon,    text: 'info@makeways.com',              href: 'mailto:info@makeways.com' },
  { Icon: PhoneIcon,    text: '+977-1-4257753',                 href: 'tel:+97714257753' },
  { Icon: PhoneIcon,    text: '+977-9851077200',                href: 'tel:+9779851077200' },
  { Icon: LocationIcon, text: 'Tripureshwor, Kathmandu, Nepal' },
];

const MAP_URLS = {
  street   : 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d354.16245901485155!2d85.31081138610872!3d27.69536453178851!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18525635b42d%3A0x6048d789a442de0c!2sMAKEWAYS%20AdAgency!5e0!3m2!1sen!2snp!4v1771174914361!5m2!1sen!2snp',
  satellite: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d354.16245901485155!2d85.31081138610872!3d27.69536453178851!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18525635b42d%3A0x6048d789a442de0c!2sMAKEWAYS%20AdAgency!5e1!3m2!1sen!2snp!4v1771174914361!5m2!1sen!2snp',
};

function SocialBtn({ name, Icon, url }: { name: string; Icon: () => JSX.Element; url: string }) {
  const [hov, setHov] = useState(false);
  return (
      <a href={url} aria-label={name} className={`sb${hov ? ' hov' : ''}`}
        target="_blank" rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <Icon />
      <style jsx>{`
        .sb {
          width: 52px; height: 52px;
          border-radius: 50%;
          background: #1a1a1a; color: #fff;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; flex-shrink: 0;
          transition: background .2s, transform .18s;
          min-width: 52px; min-height: 52px;
        }
        .sb.hov { background: #f47c20; transform: translateY(-3px); }
      `}</style>
    </a>
  );
}

function ContactRow({ Icon, text, href }: { Icon: () => JSX.Element; text: string; href?: string }) {
  const [hov, setHov] = useState(false);
  const inner = (
    <span className={`cr__inner${hov ? ' hov' : ''}`}>
      <span className="cr__icon"><Icon /></span>
      <span className="cr__text">{text}</span>
      <style jsx>{`
        .cr__inner {
          display: flex; align-items: center; gap: 10px;
          color: #555; transition: color .2s;
          cursor: ${href ? 'pointer' : 'default'};
        }
        .cr__inner.hov { color: #f47c20; }
        .cr__icon { color: #f47c20; display: flex; align-items: center; flex-shrink: 0; margin-top: 1px; }
        .cr__text {
          font-family: var(--font-primary);
          font-size: clamp(11px, 1vw, 14px);
          font-weight: 400; letter-spacing: 0.02em; line-height: 1.4;
        }
      `}</style>
    </span>
  );
  if (href) return <a href={href} style={{ textDecoration: 'none' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{inner}</a>;
  return <div>{inner}</div>;
}

export default function Footer() {
  const [mapView, setMapView] = useState<'street' | 'satellite'>('street');

  return (
    <>
      <footer className="ft" id="contact">

        <div className="ft__topbar" />

        {/* FIX: Next.js <Link> for client-side navigation — no full reload */}
        <div className="ft__nav-row">
          <div className="ft__nav-links">
            <Link href="/career"  className="ft__navlink">CAREER</Link>
            <span className="ft__pipe">|</span>
            <Link href="/gallery" className="ft__navlink">GALLERY</Link>
          </div>
        </div>

        <div className="ft__main-row">

          <div className="ft__left">
            <h2 className="ft__wordmark">MAKEWAYS</h2>
            <p className="ft__contact-label">CONTACT DETAIL</p>
            <ul className="ft__contact-list">
              {contactRows.map((row, i) => (
                <li key={i}><ContactRow {...row} /></li>
              ))}
            </ul>
          </div>

          <div className="ft__right">
            <div className="ft__socials-row">
              <h2 className="ft__socials-heading">SOCIALS</h2>
              <div className="ft__icons">
                {socials.map(s => <SocialBtn key={s.name} {...s} />)}
              </div>
            </div>

            <div className="ft__map-card">
              <div className="ft__toggle">
                {(['street', 'satellite'] as const).map(v => (
                  <button key={v} className={`ft__tog${mapView === v ? ' active' : ''}`} onClick={() => setMapView(v)}>
                    {v === 'street' ? 'STREET' : 'SATELLITE'}
                  </button>
                ))}
              </div>

              <div className="ft__iframe-wrap">
                <iframe
                  key={mapView}
                  src={MAP_URLS[mapView]}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MAKEWAYS location"
                />
              </div>

              <a href="https://maps.app.goo.gl/YXBh3PD7uxfEbF6C7" target="_blank" rel="noopener noreferrer" className="ft__map-cta">
                VIEW ON GOOGLE MAPS →
              </a>
            </div>
          </div>
        </div>

        <div className="ft__copyright">
          © 2015 MAKEWAYS. ALL RIGHTS RESERVED.
        </div>

      </footer>

      <style jsx>{`
        .ft {
          background: #ffffff;
          font-family: var(--font-primary);
          color: #111111;
          contain: layout;
        }

        .ft__topbar { height: 4px; background: #f47c20; }

        .ft__nav-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px clamp(24px, 4.5vw, 60px);
          border-bottom: 1px solid #e8e8e8;
          min-height: 44px;
        }
        .ft__nav-links { display: flex; align-items: center; gap: 12px; }
        .ft__navlink {
          font-family: var(--font-condensed);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; color: #111;
          text-decoration: none; text-transform: uppercase;
          transition: color .2s; white-space: nowrap;
        }
        .ft__navlink:hover { color: #f47c20; }
        .ft__pipe { color: #bbb; font-size: 14px; }

        .ft__main-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 28px clamp(24px, 4.5vw, 60px) 24px;
          align-items: start;
          gap: 48px;
          min-height: 280px;
        }

        .ft__left  { display: flex; flex-direction: column; }
        .ft__right { display: flex; flex-direction: column; }

        .ft__wordmark {
          font-family: var(--font-extended);
          font-size: clamp(38px, 5.2vw, 64px);
          font-weight: 700; letter-spacing: 0.06em;
          color: #111; text-transform: uppercase;
          line-height: 1; margin: 0 0 5px;
          size-adjust: 100%;
        }

        .ft__contact-label {
          font-family: var(--font-condensed);
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.25em; color: #888;
          text-transform: uppercase; margin: 0 0 18px;
          white-space: nowrap;
        }

        .ft__contact-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 12px;
        }

        .ft__socials-row {
          display: flex; align-items: center; gap: 18px;
          padding-bottom: 18px; margin-bottom: 18px;
          border-bottom: 1px solid #e8e8e8;
          flex-wrap: wrap;
          min-height: 52px;
        }

        .ft__socials-heading {
          font-family: var(--font-extended);
          font-size: clamp(24px, 3.2vw, 44px);
          font-weight: 700; letter-spacing: 0.06em;
          color: #111; text-transform: uppercase;
          line-height: 1; margin: 0; white-space: nowrap;
        }

        .ft__icons { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }

        .ft__map-card {
          border: 1px solid #ddd; border-radius: 2px;
          overflow: hidden; display: flex; flex-direction: column;
          min-height: 276px;
        }

        .ft__toggle { display: flex; border-bottom: 1px solid #ddd; flex-shrink: 0; }

        .ft__tog {
          flex: 1; padding: 9px 0;
          background: #f5f5f5; border: none;
          font-family: var(--font-condensed);
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.15em; color: #999;
          text-transform: uppercase; cursor: pointer;
          transition: background .18s, color .18s;
          white-space: nowrap;
          min-height: 38px;
        }
        .ft__tog:first-child         { border-right: 1px solid #ddd; }
        .ft__tog.active              { background: #1a1a1a; color: #fff; }
        .ft__tog:not(.active):hover  { background: #e8e8e8; color: #111; }

        .ft__iframe-wrap {
          height: 200px;
          min-height: 200px;
          flex-shrink: 0;
          background: #f0f0f0;
          position: relative;
        }

        .ft__map-cta {
          display: block; text-align: center;
          padding: 10px 16px; min-height: 38px;
          background: #1a1a1a; color: #fff;
          font-family: var(--font-condensed);
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.15em;
          text-decoration: none; text-transform: uppercase;
          transition: background .18s, color .18s;
          flex-shrink: 0; white-space: nowrap;
        }
        .ft__map-cta:hover { background: #f47c20; }

        .ft__copyright {
          text-align: center;
          font-family: var(--font-condensed);
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.2em; color: #bbb;
          text-transform: uppercase;
          padding: 12px 0 15px;
          border-top: 1px solid #e8e8e8;
          white-space: nowrap;
          min-height: 40px;
        }

        @media (max-width: 760px) {
          .ft__main-row { grid-template-columns: 1fr; gap: 28px; }
        }
        @media (max-width: 480px) {
          .ft__socials-row { flex-wrap: wrap; gap: 14px; }
          .ft__iframe-wrap { height: 165px; min-height: 165px; }
        }
      `}</style>
    </>
  );
}