'use client';

import React, { useState } from 'react';

type NavLabel = 'INTRO' | 'WHAT WE DO' | 'PORTFOLIO' | 'GALLERY' | 'CAREER';

const icons: Record<NavLabel, React.ReactElement> = {
  INTRO: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="8.5" strokeWidth="3" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="12" y2="16" />
    </svg>
  ),
  'WHAT WE DO': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
      <path d="M7.76 7.76a6 6 0 0 0 0 8.49" />
    </svg>
  ),
  PORTFOLIO: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  GALLERY: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  CAREER: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const navItems: { label: NavLabel; href: string }[] = [
  { label: 'INTRO', href: '#intro' },
  { label: 'WHAT WE DO', href: '#services' },
  { label: 'PORTFOLIO', href: '#portfolio' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'CAREER', href: '#career' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          {/* Logo */}
          <a href="#" className="logo-link">
            <img src="/images/logo.jpg" alt="MAKEWAYS Logo" className="logo-img" />
          </a>

          {/* Desktop Nav */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-item">
                <span className="nav-circle">
                  <span className="nav-icon">{icons[item.label]}</span>
                </span>
                <span className="nav-label">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Drawer */}
        <div className={`mobile-menu ${menuOpen ? 'visible' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mobile-nav-item"
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-circle">
                <span className="mobile-icon">{icons[item.label]}</span>
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          border-bottom: 2px solid #f0f0f0;
          z-index: 1000;
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Logo */
        .logo-link {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          margin-right: 40px;
        }

        .logo-img {
          height: 72px;
          width: auto;
          object-fit: contain;
        }

        /* Desktop nav */
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-left: auto;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          cursor: pointer;
        }

        /* Circle: white bg + orange border by default */
        .nav-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #ffffff;
          border: 2.5px solid #F5A623;
          transition: background 0.25s ease, border-color 0.25s ease;
        }

        .nav-item:hover .nav-circle {
          background: #F5A623;
          border-color: #ffffff;
        }

        /* Icon: orange by default, white on hover */
        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F5A623;
          transition: color 0.25s ease;
        }

        .nav-item:hover .nav-icon {
          color: #ffffff;
        }

        /* Label: always black, no color change */
        .nav-label {
          font-family: 'Eurostile', 'Arial Black', Arial, sans-serif;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.09em;
          color: #2b2b2b;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 1100;
        }

        .hamburger span {
          display: block;
          height: 2.5px;
          width: 100%;
          background: #2b2b2b;
          border-radius: 3px;
          transition: transform 0.35s ease, opacity 0.3s ease, width 0.3s ease;
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

        /* Mobile drawer */
        .mobile-menu {
          display: none;
          flex-direction: column;
          background: #fff;
          border-top: 1px solid #eee;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .mobile-menu.visible { max-height: 600px; }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 32px;
          font-family: 'Eurostile', 'Arial Black', Arial, sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.09em;
          color: #2b2b2b;
          text-decoration: none;
          text-transform: uppercase;
          border-bottom: 1px solid #f0f0f0;
          transition: background 0.2s ease;
        }

        .mobile-nav-item:hover {
          background: #fff8ef;
        }

        .mobile-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffffff;
          border: 2.5px solid #F5A623;
          flex-shrink: 0;
          transition: background 0.25s ease, border-color 0.25s ease;
        }

        .mobile-nav-item:hover .mobile-circle {
          background: #F5A623;
          border-color: #ffffff;
        }

        .mobile-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F5A623;
          transition: color 0.25s ease;
        }

        .mobile-nav-item:hover .mobile-icon {
          color: #ffffff;
        }

        @media (max-width: 900px) {
          .nav-desktop { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: flex; }
          .header-inner { padding: 10px 20px; }
          .logo-img { height: 54px; }
        }
      `}</style>
    </>
  );
}