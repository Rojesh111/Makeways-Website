'use client';

/*
  Header.tsx — MAKEWAYS  (complete rewrite of old styled-jsx version)
  ─────────────────────────────────────────────────────────────────────
  TWO FIXES APPLIED:

  FIX 1 — Logo render delay
    Old:  <img src="/images/logo.jpg"> — loaded AFTER JS hydration
    New:  <Image priority> — Next.js injects <link rel="preload"> in
          <head> so the logo fetches alongside the HTML itself.
          Result: logo visible on first paint, zero blank flash.

  FIX 2 — Nav column flash on load
    Old:  <style jsx>{`...`}> — styled-jsx injects CSS client-side,
          so display:flex on .nav-desktop doesn't exist until after
          hydration (~300ms). Nav falls back to block → vertical stack.
    New:  CSS Modules (Header.module.css) — bundled into the critical
          CSS chunk delivered with the HTML. display:flex is applied
          from the very first server render. No flash ever.
  ─────────────────────────────────────────────────────────────────────
  REQUIRES: Header.module.css in the same directory
  LOGO:     /public/images/logo.jpg  (your existing file — no change needed)
*/

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

type NavLabel = 'INTRO' | 'WHAT WE DO' | 'PORTFOLIO' | 'GALLERY' | 'CAREER';

/* ── Icons (unchanged from your original) ── */
const icons: Record<NavLabel, React.ReactElement> = {
  INTRO: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="8.5" strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="12" x2="12" y2="16" />
    </svg>
  ),
  'WHAT WE DO': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
      <path d="M7.76 7.76a6 6 0 0 0 0 8.49" />
    </svg>
  ),
  PORTFOLIO: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  GALLERY: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  CAREER: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

/* ── Nav items ── */
const NAV_ITEMS: { label: NavLabel; homeHref: string; awayHref: string }[] = [
  { label: 'INTRO',      homeHref: '#about',     awayHref: '/#about'     },
  { label: 'WHAT WE DO', homeHref: '#services',  awayHref: '/#services'  },
  { label: 'PORTFOLIO',  homeHref: '#portfolio', awayHref: '/#portfolio' },
  { label: 'GALLERY',    homeHref: '/gallery',   awayHref: '/gallery'    },
  { label: 'CAREER',     homeHref: '/career',    awayHref: '/career'     },
];

/* ── Component ── */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome   = pathname === '/';

  /* Scroll → frosted glass shadow on nav */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // run once on mount to catch pre-scrolled state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll while mobile drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Close drawer on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerInner}>

          {/*
            ── LOGO ──────────────────────────────────────────────
            next/image with priority={true} is the key fix.

            It tells Next.js to add:
              <link rel="preload" as="image" href="/images/logo.jpg">
            to the document <head>, so the browser starts fetching
            the logo immediately — before any JS runs, before
            hydration, before anything.

            Your logo file path is unchanged: /public/images/logo.jpg
            width={200} height={72} matches your original logo-img
            height: 72px. Adjust if your logo has different proportions.
          */}
          <Link href="/" className={styles.logoLink} aria-label="MAKEWAYS — Home">
            <Image
              src="/images/logo.jpg"
              alt="MAKEWAYS"
              width={200}
              height={72}
              priority                    /* ← THE fix for logo delay */
              sizes="200px"
              quality={90}
              style={{
                objectFit     : 'contain',
                objectPosition: 'left center',
                width         : '100%',
                height        : '100%',
              }}
            />
          </Link>

          {/*
            ── DESKTOP NAV ───────────────────────────────────────
            CSS Module = critical CSS = display:flex from first paint.
            The old <style jsx> caused display:block on first render.
          */}
          <nav className={styles.navDesktop} aria-label="Primary navigation">
            {NAV_ITEMS.map(({ label, homeHref, awayHref }) => {
              const href     = isHome ? homeHref : awayHref;
              const isActive =
                (label === 'GALLERY' && pathname === '/gallery') ||
                (label === 'CAREER'  && pathname === '/career');

              return (
                <Link
                  key={label}
                  href={href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={styles.navCircle} aria-hidden="true">
                    <span className={styles.navIcon}>{icons[label]}</span>
                  </span>
                  <span className={styles.navLabel}>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── Hamburger ── */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        <nav
          id="mobile-nav"
          className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuVisible : ''}`}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          {NAV_ITEMS.map(({ label, homeHref, awayHref }) => {
            const href     = isHome ? homeHref : awayHref;
            const isActive =
              (label === 'GALLERY' && pathname === '/gallery') ||
              (label === 'CAREER'  && pathname === '/career');

            return (
              <Link
                key={label}
                href={href}
                className={`${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ''}`}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={styles.mobileCircle}>
                  <span className={styles.mobileIcon}>{icons[label]}</span>
                </span>
                {label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Backdrop — closes drawer when tapped outside */}
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