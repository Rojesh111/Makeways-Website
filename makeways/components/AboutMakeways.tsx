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

          {/*
            FIX: Replace flex-column + padding-left:80px with a real two-column grid.
            This fills the 1280px container and eliminates the huge empty right side.
          */}
          <div className="about__content">

            {/* ── Left column ── */}
            <div className="about__left">

              <p className="about__body animate" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                Makeways Pvt. Ltd. is an independent, full-service advertising agency based in
                Kathmandu, Nepal, established in 2013. We deliver cutting-edge marcom solutions
                through a wide range of professional services.
              </p>

              <p className="about__body animate" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                We continuously explore new disciplines and refine our offerings to stay ahead of
                ever-changing trends and platforms.
              </p>

              {/*
                FIX: Award line was clamp(17–24px) bold dark — same size as the quote,
                competing visually. Now a compact branded tag with orange border + icon.
              */}
              <div className="about__award animate" style={{ '--delay': '0.3s' } as React.CSSProperties}>
                <svg className="about__award-star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Nepal&apos;s most awarded advertising agency.
              </div>

            </div>

            {/* ── Right column — pull quote ── */}
            <blockquote
              className="about__quote animate"
              style={{ '--delay': '0.15s' } as React.CSSProperties}
            >
              <span className="about__quote-bar" />
              <p>
                Guided by strategic thinking and creative precision, we help brands connect
                meaningfully with their audiences that translates into measurable results.
              </p>
            </blockquote>

          </div>
        </div>
      </section>

      <style jsx>{`
        /* ── @font-face — corrected paths ────────────────────────────────── */
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileExt-Normal Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileBold.ttf') format('truetype'); font-weight: 700; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileTBold.ttf') format('truetype'); font-weight: 800; font-style: normal; font-display: swap; }
        @font-face { font-family: 'Eurostile'; src: url('/fonts/FONTS/EurostileExt-Bold Regular.ttf') format('truetype'); font-weight: 900; font-style: normal; font-display: swap; }

        /* ── Tokens ─────────────────────────────────────────────────────── */
        .about {
          --eu     : 'Eurostile', 'Arial Narrow', sans-serif;
          --orange : #f47c20;
          --black  : #000000;
          --dark   : #1a1a1a;
          --muted  : #888888;
          --white  : #ffffff;
        }
        .about *, .about *::before, .about *::after { box-sizing: border-box; }

        /* ── Section ────────────────────────────────────────────────────── */
        .about {
          background  : var(--white);
          border-top  : 5px solid var(--orange);
          padding     : 80px 60px;
          font-family : var(--eu);
          width       : 100%;
          overflow-x  : hidden;
        }
        .about__inner { max-width: 1280px; margin: 0 auto; width: 100%; }

        /* ── Heading — identical to cv__heading & svc__heading ───────────── */
        .about__heading {
          font-family    : var(--eu);
          font-weight    : 800;
          font-size      : 54px;
          letter-spacing : 6px;
          text-transform : uppercase;
          line-height    : 1;
          margin         : 0 0 64px 0;
          display        : block;
        }
        .about__heading--black  { color: var(--black); }
        .about__heading--orange { color: var(--orange); }

        /* ── FIX: Content — two-column CSS grid ──────────────────────────── */
        /* WAS: flex-direction:column + padding-left:80px → right half empty  */
        .about__content {
          display               : grid;
          grid-template-columns : 1fr 1fr;
          gap                   : 72px;
          align-items           : start;
        }

        /* ── Left column ────────────────────────────────────────────────── */
        .about__left {
          display        : flex;
          flex-direction : column;
          gap            : 28px;
        }

        /* ── Body copy — matches cv__desc exactly: 13px/400/1.85/0.2px ──── */
        .about__body {
          font-family    : var(--eu);
          font-weight    : 400;
          font-size      : 13px;
          color          : var(--muted);
          line-height    : 1.85;
          letter-spacing : 0.2px;
          margin         : 0;
        }

        /* ── Award — compact inline tag, not a large heading ─────────────── */
        /* FIX: was clamp(17px–24px) bold dark text — too big, wrong weight   */
        .about__award {
          display        : inline-flex;
          align-items    : center;
          gap            : 9px;
          font-family    : var(--eu);
          font-weight    : 700;
          font-size      : 11px;
          letter-spacing : 1.8px;
          text-transform : uppercase;
          color          : var(--orange);
          border         : 1px solid rgba(244,124,32,0.35);
          border-radius  : 4px;
          padding        : 9px 14px;
          width          : fit-content;
        }
        .about__award-star { flex-shrink: 0; color: var(--orange); }

        /* ── Pull quote (right column) ───────────────────────────────────── */
        .about__quote {
          display     : flex;
          gap         : 24px;
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
        /* FIX: was clamp(17px–24px) — dwarfed the 13px body text on the left.  */
        /* Now clamped at 15–20px: impactful as a pull quote but in proportion.   */
        .about__quote p {
          font-family    : var(--eu);
          font-weight    : 700;
          font-size      : clamp(15px, 1.4vw, 20px);
          color          : var(--dark);
          line-height    : 1.65;
          letter-spacing : 0.3px;
          margin         : 0;
        }

        /* ── Scroll reveal ──────────────────────────────────────────────── */
        .animate {
          opacity   : 0;
          transform : translateY(22px);
          transition:
            opacity   0.65s ease calc(var(--delay, 0s)),
            transform 0.65s ease calc(var(--delay, 0s));
        }
        .animate.visible { opacity: 1; transform: translateY(0); }

        /* ── 1024px ─────────────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .about { padding: 70px 40px; }
          .about__heading { font-size: 46px; margin-bottom: 52px; }
          .about__content { gap: 48px; }
        }

        /* ── 768px — collapse to single column ──────────────────────────── */
        @media (max-width: 768px) {
          .about { padding: 56px 24px; border-top-width: 4px; }
          .about__heading { font-size: 40px; letter-spacing: 4px; margin-bottom: 44px; }
          /* Stack: quote first for visual impact, then body copy below */
          .about__content { grid-template-columns: 1fr; gap: 0; }
          .about__left { order: 2; margin-top: 32px; }
          .about__quote { order: 1; }
          .about__quote p { font-size: 17px; line-height: 1.6; }
        }

        /* ── 520px ──────────────────────────────────────────────────────── */
        @media (max-width: 520px) {
          .about { padding: 48px 20px; }
          .about__heading { font-size: 32px; letter-spacing: 3px; margin-bottom: 36px; }
          .about__left { gap: 22px; }
          .about__body { font-size: 13px; line-height: 1.78; }
          .about__quote { gap: 16px; }
          .about__quote-bar { width: 3px; }
          .about__quote p { font-size: 15px; line-height: 1.55; }
          .about__award { font-size: 10px; padding: 8px 12px; letter-spacing: 1.4px; }
        }

        /* ── 360px ──────────────────────────────────────────────────────── */
        @media (max-width: 360px) {
          .about { padding: 44px 16px; border-top-width: 3px; }
          .about__heading { font-size: 27px; letter-spacing: 2px; margin-bottom: 28px; }
          .about__left { gap: 18px; }
          .about__body { font-size: 12.5px; }
          .about__quote p { font-size: 14px; }
          .about__award { font-size: 9.5px; }
        }
      `}</style>
    </>
  );
}