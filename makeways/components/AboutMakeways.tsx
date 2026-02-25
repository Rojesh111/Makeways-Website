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
            <span className="about__heading--black">MAKE</span>
            <span className="about__heading--orange">WAYS</span>
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

            {/* ── Right column — pull quote ── */}
            <blockquote
              className="about__quote animate"
              style={{ '--delay': '0.15s' } as React.CSSProperties}
            >
              <span className="about__quote-bar" />
              <p>
                Guided by strategic thinking and creative precision, we help brands connect
                meaningfully with their audiences that translates into measurable results
              </p>
            </blockquote>

          </div>
        </div>
      </section>

      <style jsx>{`
        /* ── @font-face ──────────────────────────────────────────────────── */
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileExt-Normal Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileBold.ttf') format('truetype'); font-weight: 700; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileTBold.ttf') format('truetype'); font-weight: 800; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileExt-Bold Regular.ttf') format('truetype'); font-weight: 900; font-style: normal; font-display: swap; }

        /* ── Design Tokens ───────────────────────────────────────────────── */
        .about {
          --eu     : 'Eurostile', 'Arial Narrow', sans-serif;
          --orange : #f47c20;
          --black  : #000000;
          --dark   : #1a1a1a;
          --muted  : #666666;
          --white  : #ffffff;
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
          font-family    : var(--eu);
          font-weight    : 800;
          font-size      : clamp(36px, 3.75vw, 48px);
          letter-spacing : 8px;
          text-transform : uppercase;
          line-height    : 1;
          margin         : 0 0 24px 0;
          display        : block;
        }
        .about__heading--black  { color: var(--black);  font-family: var(--eu); }
        .about__heading--orange { color: var(--orange); font-family: var(--eu); }

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
          font-family    : var(--eu);
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
          font-family    : var(--eu);
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
          align-items : flex-start;
          margin      : 0;
          padding     : 0;
        }
        .about__quote-bar {
          display       : block;
          flex-shrink   : 0;
          width         : 4px;
          align-self    : stretch;
          background    : var(--orange);
          border-radius : 2px;
          min-height    : 100%;
        }
        .about__quote p {
          font-family    : var(--eu);
          font-weight    : 700;
          font-size      : clamp(18px, 1.6vw, 22px);
          color          : var(--dark);
          line-height    : 1.65;
          letter-spacing : 0.3px;
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
          .about__quote p { font-size: clamp(17px, 2vw, 20px); }
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
          .about__quote p { font-size: 18px; line-height: 1.6; }
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
          .about__quote p { font-size: 16px; line-height: 1.6; }
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