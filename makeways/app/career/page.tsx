'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import Header and Footer with SSR disabled.
// This prevents them from running during 'npm run build' and crashing the process.
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

const ROW1 = ['designer', 'editor', 'ai content creator', 'social media manager'];
const ROW2 = ['client manager', 'videographer', 'script writer'];

export default function CareerPage() {
  // Guard against hydration mismatch and prerender errors
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During build/prerender, return a simple loader or empty shell 
  // to avoid executing code that depends on browser APIs.
  if (!mounted) {
    return <div style={{ background: '#FF8C00', height: '100vh' }} />;
  }

  return (
    <>
      <Header />

      <main className="cw">
        <section className="cs">
          <div className="cs-top">
            <h1 className="cs-title">CAREER</h1>
            <div className="cs-roles-wrap">
              <div className="cs-roles">
                {ROW1.map((r, i) => (
                  <span key={r} className="cs-role">
                    {r}{i < ROW1.length - 1 && <span className="cs-pipe"> | </span>}
                  </span>
                ))}
              </div>
              <div className="cs-roles">
                {ROW2.map((r, i) => (
                  <span key={r} className="cs-role">
                    {r}{i < ROW2.length - 1 && <span className="cs-pipe"> | </span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="cs-bottom">
            <div className="cs-col cs-col--left">
              <h2 className="cs-label">APPLY<br />FOR JOB</h2>
              <a href="mailto:jobs@makeways.agency" className="cs-mail">jobs@makeways.agency</a>
            </div>
            <div className="cs-slash" aria-hidden="true">/</div>
            <div className="cs-col cs-col--right">
              <h2 className="cs-label">APPLY<br />FOR<br />INTERNSHIP</h2>
              <a href="mailto:intern@makeways.agency" className="cs-mail">intern@makeways.agency</a>
            </div>
          </div>

          <div className="cs-nav-links">
            <Link href="/#about" className="cs-nav-link">Intro</Link>
            <Link href="/#services" className="cs-nav-link">What We Do</Link>
            <Link href="/#portfolio" className="cs-nav-link">Portfolio</Link>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .cw {
          padding-top: var(--header-h);
          font-family: var(--font-primary);
        }
        .cs {
          background: #FF8C00;
          width: 100%;
          height: calc(100dvh - var(--header-h));
          min-height: 560px;
          box-sizing: border-box;
          padding: 48px 72px 56px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }
        .cs-top {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 56px;
          width: 100%;
          flex-shrink: 0;
        }
        .cs-title {
          font-weight: 700;
          font-size: clamp(72px, 9vw, 128px);
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 2px;
          line-height: 1;
          margin: 0;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .cs-roles-wrap {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cs-roles {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          font-weight: 700;
          font-size: clamp(13px, 1.15vw, 17px);
          color: rgba(255,255,255,0.93);
          letter-spacing: 0.3px;
          line-height: 1.85;
        }
        .cs-role {
          display: inline-flex;
          align-items: baseline;
          white-space: nowrap;
        }
        .cs-pipe {
          color: rgba(255,255,255,0.5);
          padding: 0 6px;
        }
        .cs-bottom {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cs-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
          min-width: 0;
        }
        .cs-col--left  { align-items: flex-end; text-align: right; }
        .cs-col--right { align-items: flex-start; text-align: left; }
        .cs-label {
          margin: 0;
          font-weight: 700;
          font-size: clamp(36px, 5vw, 72px);
          color: #2b2b2b;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.05;
        }
        .cs-mail {
          font-weight: 700;
          font-size: clamp(12px, 1.1vw, 16px);
          color: rgba(255,255,255,0.88);
          letter-spacing: 0.4px;
          text-decoration: none;
          display: block;
          white-space: nowrap;
          transition: color 0.2s, letter-spacing 0.2s;
        }
        .cs-mail:hover {
          color: #fff;
          letter-spacing: 0.8px;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .cs-slash {
          font-weight: 700;
          font-size: clamp(120px, 16vw, 220px);
          color: #ffffff;
          line-height: 1;
          text-align: center;
          padding: 0 clamp(16px, 2.5vw, 48px);
          user-select: none;
          flex-shrink: 0;
          letter-spacing: -8px;
        }
        .cs-nav-links {
          display: flex;
          gap: 24px;
          flex-shrink: 0;
        }
        .cs-nav-link {
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: color 0.2s;
        }
        .cs-nav-link:hover { color: #fff; }

        @media (max-width: 900px) {
          .cw { padding-top: var(--header-h-mobile); }
          .cs {
            height: calc(100dvh - var(--header-h-mobile));
            padding: 40px 40px 48px;
          }
        }
        @media (max-width: 768px) {
          .cs {
            height: auto;
            min-height: unset;
            padding: 40px 28px 48px;
            gap: 40px;
          }
          .cs-top { flex-direction: column; align-items: flex-start; gap: 10px; }
          .cs-title { font-size: clamp(52px, 14vw, 80px); }
          .cs-bottom { flex-direction: column; align-items: flex-start; gap: 0; }
          .cs-slash { display: none; }
          .cs-col { flex: unset; width: 100%; }
          .cs-col--left {
            align-items: flex-start; text-align: left;
            padding-bottom: 28px; margin-bottom: 28px;
            border-bottom: 1px solid rgba(255,255,255,0.35);
          }
          .cs-col--right { align-items: flex-start; }
          .cs-label { font-size: clamp(34px, 10vw, 56px); }
          .cs-mail  { white-space: normal; word-break: break-all; }
        }
        @media (max-width: 520px) {
          .cs       { padding: 32px 20px 40px; }
          .cs-title { font-size: clamp(40px, 13vw, 60px); }
          .cs-label { font-size: clamp(28px, 9vw, 44px); }
          .cs-roles { font-size: 13px; }
          .cs-mail  { font-size: 13px; }
        }
      `}</style>
    </>
  );
}