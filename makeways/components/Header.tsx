'use client';

/**
 * Header.tsx — MAKEWAYS
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

type NavLabel = 'INTRO' | 'WHAT WE DO' | 'PORTFOLIO' | 'GALLERY' | 'CAREER';

const icons: Record<NavLabel, React.ReactElement> = {
  INTRO: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="8.5" strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="12" x2="12" y2="16" />
    </svg>
  ),
  'WHAT WE DO': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
      <path d="M7.76 7.76a6 6 0 0 0 0 8.49" />
    </svg>
  ),
  PORTFOLIO: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  GALLERY: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  CAREER: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const HOME_NAV: { label: NavLabel; href: string }[] = [
  { label: 'INTRO',      href: '#about'     },
  { label: 'WHAT WE DO', href: '#services'  },
  { label: 'PORTFOLIO',  href: '#portfolio' },
  { label: 'GALLERY',    href: '/gallery'   },
  { label: 'CAREER',     href: '/career'    },
];

const AWAY_NAV: { label: NavLabel; href: string }[] = [
  { label: 'INTRO',      href: '/#about'    },
  { label: 'WHAT WE DO', href: '/#services' },
  { label: 'PORTFOLIO',  href: '/#portfolio'},
  { label: 'GALLERY',    href: '/gallery'   },
  { label: 'CAREER',     href: '/career'    },
];

function getActiveLabel(pathname: string): NavLabel | null {
  if (pathname === '/gallery') return 'GALLERY';
  if (pathname === '/career')  return 'CAREER';
  return null;
}

export default function Header() {
  const pathname    = usePathname();
  const isHome      = pathname === '/';
  const navItems    = isHome ? HOME_NAV : AWAY_NAV;
  const activeLabel = getActiveLabel(pathname);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const rafId = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      setScrolled(window.scrollY > 10);
      rafId.current = null;
    });
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={[styles.header, scrolled ? styles.headerScrolled : ''].join(' ')}
        role="banner"
      >
        <div className={styles.headerInner}>

          {/* Logo */}
          <a href="/" className={styles.logoLink} aria-label="MAKEWAYS — go to home">
            <Image
              src="/images/Logo/logo.png"
              alt="MAKEWAYS Logo"
              width={190}
              height={60}
              priority
              quality={90}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'left center',
              }}
            />
          </a>

          {/* Desktop Nav — no circle wrapper, icon shown directly */}
          <nav className={styles.navDesktop} aria-label="Primary navigation">
            {navItems.map((item) => {
              const isActive = activeLabel === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={[styles.navItem, isActive ? styles.navItemActive : ''].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={styles.navIcon}>
                    {icons[item.label]}
                  </span>
                  <span className={styles.navLabel}>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Hamburger */}
          <button
            className={[styles.hamburger, menuOpen ? styles.hamburgerOpen : ''].join(' ')}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>

        {/* Mobile Drawer */}
        <nav
          id="mobile-menu"
          className={[styles.mobileMenu, menuOpen ? styles.mobileMenuVisible : ''].join(' ')}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          {navItems.map((item) => {
            const isActive = activeLabel === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                className={[styles.mobileNavItem, isActive ? styles.mobileNavItemActive : ''].join(' ')}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className={styles.mobileCircle}>
                  <span className={styles.mobileIcon}>
                    {icons[item.label]}
                  </span>
                </span>
                {item.label}
              </a>
            );
          })}
        </nav>
      </header>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}