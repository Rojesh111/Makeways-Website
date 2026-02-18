'use client';

import { useState } from 'react';

const navItems = [
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
                <span className="nav-circle" />
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
              <span className="mobile-circle" />
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
          border-bottom: 1px solid #e5e5e5;
          z-index: 1000;
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 25px 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo-link {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        /* Smaller logo */
        .logo-img {
          height: 60px;
          width: auto;
          object-fit: contain;
        }

        /* Desktop nav */
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          cursor: pointer;
        }

        /* Smaller circles */
        .nav-circle {
          display: block;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #F5A623;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 2px 6px rgba(245, 166, 35, 0.3);
        }

        .nav-item:hover .nav-circle {
          background: #d4891a;
          transform: scale(1.1);
          box-shadow: 0 4px 14px rgba(245, 166, 35, 0.5);
        }

        .nav-label {
          font-family: 'Arial Black', Arial, sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.07em;
          color: #2b2b2b;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 0.25s ease;
        }

        .nav-item:hover .nav-label {
          color: #F5A623;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 34px;
          height: 34px;
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

        .mobile-menu.visible { max-height: 500px; }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 32px;
          font-family: 'Arial Black', Arial, sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #2b2b2b;
          text-decoration: none;
          text-transform: uppercase;
          border-bottom: 1px solid #f0f0f0;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .mobile-nav-item:hover { background: #fff8ef; color: #F5A623; }

        .mobile-circle {
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #F5A623;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .nav-desktop { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: flex; }
          .header-inner { padding: 8px 20px; }
        }
      `}</style>
    </>
  );
}