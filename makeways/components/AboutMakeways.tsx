'use client';

import { useEffect, useRef, type ReactElement } from 'react';

export default function AboutMakeways(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('.animate');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="about" id="about" ref={sectionRef}>
        <div className="about__inner">

          <h2 className="about__heading animate">
            <span className="about__heading--grey">MAKEWAYS</span>
          </h2>

          {/* ── Award tag — moved below heading ── */}
          <div className="about__award animate" style={{ '--delay': '0.05s' } as React.CSSProperties}>
            <svg className="about__award-star" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Nepal&apos;s most awarded advertising agency
          </div>

          <div className="about__content">

            {/* ── Left column ── */}
            <div className="about__left">

              <p className="about__lead animate" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                Makeways Pvt Ltd is an independent, full-service advertising agency based in
                Kathmandu, Nepal, established in 2013 We deliver cutting-edge marcom solutions
                through a wide range of professional services
              </p>

              <p className="about__body animate" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                We continuously explore new disciplines and refine our offerings to stay ahead of
                ever-changing trends and platforms
              </p>

            </div>

              <blockquote className="about__quote animate" style={{ '--delay': '0.18s' } as React.CSSProperties}>
              <span className="about__quote-bar" />
              <div className="about__quote-inner">
                <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
                  <path d="M0 28V16.8C0 7.84 5.6 2.24 16.8 0L18 3.92C13.2 5.04 10.4 7.84 9.6 12.32H16.8V28H0ZM23.2 28V16.8C23.2 7.84 28.8 2.24 40 0L41.2 3.92C36.4 5.04 33.6 7.84 32.8 12.32H40V28H23.2Z" fill="#f47c20" fillOpacity="0.15"/>
                </svg>
                <p>
                  Guided by strategic thinking and creative precision, we help brands connect
                  meaningfully with their audiences — translating intent into measurable results.
                </p>
              </div>
            </blockquote>
          </div>
          <div className="founder-section animate" style={{ '--delay': '0.25s' } as React.CSSProperties}>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ── @font-face ──────────────────────────────────────────────────── */
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileExt-Normal_Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileBold.ttf') format('truetype'); font-weight: 700; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/Eurostile_Bold.ttf') format('truetype'); font-weight: 800; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileExt-Bold_Regular.ttf') format('truetype'); font-weight: 900; font-style: normal; font-display: swap; }

        /* ── Design Tokens ───────────────────────────────────────────────── */
        .about {
          --eu     : 'Eurostile', 'Arial Narrow', sans-serif;
          --orange : #f47c20;
          --black  : #000000;
          --dark   : #1a1a1a;
          --muted  : #666666;
          --white  : #ffffff;
          --grey   : #9a9a9a;
        }
        .about *, .about *::before, .about *::after { box-sizing: border-box; }

        /* ── Section ────────────────────────────────────────────────────── */
        .about {
          background  : var(--white);
          border-top  : 5px solid var(--orange);
          padding     : 96px 60px;
          font-family : var(--eu);
          width       : 100%;
          overflow-x  : hidden;
        }
        .about__inner { max-width: 1280px; margin: 0 auto; width: 100%; font-family: var(--eu); }

        /* ── H2 Section Heading ─────────────────────────────────────────── */
        .about__heading {
          font-family    : 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight    : 700;
          font-size      : clamp(36px, 3.75vw, 48px);
          letter-spacing : 8px;
          text-transform : uppercase;
          line-height    : 1;
          margin         : 0 0 24px 0;
          display        : block;
        }
        .about__heading--black  { color: var(--black);  font-family: 'Eurostile', 'Arial Narrow', sans-serif; font-weight: 700; }
        .about__heading--orange { color: var(--orange); font-family: 'Eurostile', 'Arial Narrow', sans-serif; font-weight: 700; }
        .about__heading--grey   { color: var(--grey);   font-family: 'Eurostile', 'Arial Narrow', sans-serif; font-weight: 700; }

        /* ── Award tag — below heading ───────────────────────────────────── */
        .about__award {
          display        : inline-flex;
          align-items    : center;
          gap            : 9px;
          font-family    : var(--eu);
          font-weight    : 700;
          font-size      : clamp(11px, 0.85vw, 13px);
          letter-spacing : 2px;
          text-transform : uppercase;
          color          : var(--orange);
          border         : 1px solid rgba(244,124,32,0.4);
          border-radius  : 4px;
          padding        : 10px 16px;
          width          : fit-content;
          line-height    : 1.5;
          margin-bottom  : 56px;
        }
        .about__award-star { flex-shrink: 0; color: var(--orange); }

        /* ── Two-column grid ─────────────────────────────────────────────── */
        .about__content {
          display               : grid;
          grid-template-columns : 1fr 1fr;
          gap                   : 80px;
          align-items           : start;
        }

        /* ── Left column ────────────────────────────────────────────────── */
        .about__left {
          display        : flex;
          flex-direction : column;
          gap            : 32px;
        }

        /* ── Lead / intro text ───────────────────────────────────────────── */
        .about__lead {
          font-family    : 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight    : 400;
          font-size      : clamp(16px, 1.4vw, 18px);
          color          : var(--dark);
          line-height    : 1.75;
          letter-spacing : 0.25px;
          margin         : 0;
          text-align     : justify;
        }

        /* ── Regular body ────────────────────────────────────────────────── */
        .about__body {
          font-family    : 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight    : 400;
          font-size      : clamp(14px, 1.1vw, 16px);
          color          : var(--muted);
          line-height    : 1.7;
          letter-spacing : 0.2px;
          margin         : 0;
          text-align     : justify;
        }

        /* ── Pull quote ──────────────────────────────────────────────────── */
        .about__quote {
          display     : flex;
          gap         : 28px;
          align-items : stretch;
          margin      : 0;
          padding     : 0;
          font-family : 'Eurostile', 'Arial Narrow', sans-serif;
        }
        .about__quote-bar {
          display       : block;
          flex-shrink   : 0;
          width         : 5px;
          align-self    : stretch;
          background    : var(--orange);
          border-radius : 2px;
        }
        .about__quote p {
          font-family    : 'Eurostile', 'Arial Narrow', sans-serif;
          font-weight    : 700;
          font-size      : clamp(18px, 1.8vw, 24px);
          color          : var(--dark);
          line-height    : 1.85;
          letter-spacing : 0.6px;
          word-spacing   : 2px;
          margin         : 0;
          text-align     : justify;
        }

        /* ── Scroll reveal ──────────────────────────────────────────────── */
        .animate {
          opacity   : 0;
          transform : translateY(24px);
          transition:
            opacity   0.65s ease calc(var(--delay, 0s)),
            transform 0.65s ease calc(var(--delay, 0s));
        }
        .animate.visible { opacity: 1; transform: translateY(0); }

        /* ── 1280px ─────────────────────────────────────────────────────── */
        @media (max-width: 1280px) {
          .about { padding: 80px 48px; }
          .about__content { gap: 60px; }
        }

        /* ── 1024px ─────────────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .about { padding: 72px 40px; }
          .about__heading { font-size: clamp(32px, 4vw, 42px); margin-bottom: 20px; }
          .about__award { margin-bottom: 44px; }
          .about__content { gap: 48px; }
          .about__quote p { font-size: clamp(16px, 1.6vw, 22px); }
        }

        /* ── 768px — collapse to single column ──────────────────────────── */
        @media (max-width: 768px) {
          .about { padding: 60px 24px; border-top-width: 4px; }
          .about__heading { font-size: clamp(28px, 5vw, 38px); letter-spacing: 5px; margin-bottom: 16px; }
          .about__award { margin-bottom: 36px; }
          .about__content { grid-template-columns: 1fr; gap: 0; }
          .about__left { order: 2; margin-top: 36px; }
          .about__quote { order: 1; }
          .about__lead { font-size: 16px; }
          .about__body { font-size: 15px; }
          .about__quote p { font-size: 18px; line-height: 1.8; }
        }

        /* ── 520px ──────────────────────────────────────────────────────── */
        @media (max-width: 520px) {
          .about { padding: 52px 20px; }
          .about__heading { font-size: clamp(26px, 7vw, 34px); letter-spacing: 4px; margin-bottom: 14px; }
          .about__award { margin-bottom: 32px; font-size: 11px; padding: 9px 13px; letter-spacing: 1.6px; }
          .about__left { gap: 24px; }
          .about__lead { font-size: 15px; line-height: 1.7; }
          .about__body { font-size: 14px; line-height: 1.7; }
          .about__quote { gap: 18px; }
          .about__quote-bar { width: 3px; }
          .about__quote p { font-size: 16px; line-height: 1.8; }
        }

        /* ── 360px ──────────────────────────────────────────────────────── */
        @media (max-width: 360px) {
          .about { padding: 44px 16px; border-top-width: 3px; }
          .about__heading { font-size: 26px; letter-spacing: 3px; margin-bottom: 12px; }
          .about__award { margin-bottom: 28px; font-size: 10px; }
          .about__left { gap: 20px; }
          .about__lead { font-size: 14px; }
          .about__body { font-size: 13px; }
          .about__quote p { font-size: 15px; }
        }
      `}</style>
    </>
  );
}