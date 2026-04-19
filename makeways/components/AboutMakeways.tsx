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

          <div
            className="about__award animate"
            style={{ '--delay': '0.05s' } as React.CSSProperties}
          >
            <svg
              className="about__award-star"
              width="12" height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Nepal&apos;s most awarded advertising company
          </div>

          <div className="about__content">

            <div className="about__left">
              <p
                className="about__lead animate"
                style={{ '--delay': '0.1s' } as React.CSSProperties}
              >
                Makeways Pvt Ltd is an independent, full-service advertising agency based in
                Kathmandu, Nepal, established in 2013. We deliver cutting-edge marcom solutions
                through a wide range of professional services
              </p>

              <p
                className="about__body animate"
                style={{ '--delay': '0.2s' } as React.CSSProperties}
              >
                We continuously explore new disciplines and refine our offerings to stay ahead of
                ever changing trends and platforms
              </p>
            </div>

            <blockquote
              className="about__quote animate"
              style={{ '--delay': '0.18s' } as React.CSSProperties}
            >
              <span className="about__quote-bar" aria-hidden="true" />
              <div className="about__quote-inner">
                <svg
                  className="about__quote-mark"
                  width="36" height="26"
                  viewBox="0 0 40 28"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 28V16.8C0 7.84 5.6 2.24 16.8 0L18 3.92C13.2 5.04 10.4 7.84 9.6 12.32H16.8V28H0ZM23.2 28V16.8C23.2 7.84 28.8 2.24 40 0L41.2 3.92C36.4 5.04 33.6 7.84 32.8 12.32H40V28H23.2Z"
                    fill="#f47c20"
                    fillOpacity="1"
                  />
                </svg>
                <p>
                  Guided by strategic thinking and creative precision, we help brands connect
                  meaningfully with their audiences translating intent into measurable results
                </p>
              </div>
            </blockquote>

          </div>

          <div
            className="founder-section animate"
            style={{ '--delay': '0.25s' } as React.CSSProperties}
          />
        </div>
      </section>

      <style jsx>{`

        /* ── Section ── */
        .about {
          background  : #ffffff;
          border-top  : 5px solid #f47c20;
          padding     : var(--section-py) var(--section-px);
          width       : 100%;
          overflow-x  : hidden;
          font-family : var(--font-primary);
        }
        .about__inner {
          max-width : 1280px;
          margin    : 0 auto;
          width     : 100%;
        }

        .animate {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          transition-delay: var(--delay, 0s);
        }
        .animate.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── H2 heading ── */
        .about__heading {
          font-family    : var(--font-primary);
          font-weight    : 700;
          font-size      : clamp(40px, 3.75vw, 48px);
          line-height    : 1.15;
          letter-spacing : -0.01em;
          text-transform : uppercase;
          margin         : 0 0 24px 0;
          display        : block;
        }
        .about__heading--grey   { color: #9a9a9a; }
        .about__heading--black  { color: #000000; }
        .about__heading--orange { color: #f47c20; }

        /* ── Award tag ── */
        .about__award {
          display        : inline-flex;
          align-items    : center;
          gap            : 8px;
          font-family    : var(--font-condensed);
          font-weight    : 700;
          font-size      : clamp(12px, 0.85vw, 14px);
          line-height    : 1.5;
          letter-spacing : 0.1em;
          text-transform : uppercase;
          color          : #f47c20;
          border         : 1px solid rgba(244, 124, 32, 0.35);
          border-radius  : 4px;
          padding        : 9px 16px;
          width          : fit-content;
          margin-bottom  : 56px;
        }
        .about__award-star { flex-shrink: 0; color: #f47c20; }

        /* ── Two-column grid ── */
        .about__content {
          display               : grid;
          grid-template-columns : 1fr 1fr;
          gap                   : 80px;
          align-items           : start;
        }
        .about__left {
          display        : flex;
          flex-direction : column;
          gap            : 24px;
        }

        /* ── Lead ── */
        .about__lead {
          font-family    : var(--font-primary);
          font-weight    : 400;
          font-size      : clamp(16px, 1.4vw, 18px);
          line-height    : 1.65;
          letter-spacing : 0.01em;
          color          : #1a1a1a;
          margin         : 0;
          text-align     : left;
        }

        /* ── Body ── */
        .about__body {
          font-family    : var(--font-primary);
          font-weight    : 400;
          font-size      : clamp(16px, 1.1vw, 18px);
          line-height    : 1.7;
          letter-spacing : 0.01em;
          color          : var(--mw-body);
          margin         : 0;
          text-align     : left;
        }

        /* ── Pull quote ── */
        .about__quote {
          display     : flex;
          gap         : 24px;
          align-items : stretch;
          margin      : 0;
          padding     : 0;
        }
        .about__quote-bar {
          display       : block;
          flex-shrink   : 0;
          width         : 4px;
          align-self    : stretch;
          background    : #f47c20;
          border-radius : 2px;
        }
        .about__quote-inner {
          display        : flex;
          flex-direction : column;
          gap            : 16px;
        }
        .about__quote-mark { flex-shrink: 0; }
        .about__quote p {
          font-family    : var(--font-primary);
          font-weight    : 700;
          font-size      : clamp(22px, 2vw, 28px);
          line-height    : 1.3;
          letter-spacing : 0em;
          color          : #1a1a1a;
          margin         : 0;
          text-transform : uppercase;
          text-align     : left;
        }

        @media (max-width: 1280px) {
          .about         { padding: 80px 48px; }
          .about__content { gap: 60px; }
        }
        @media (max-width: 1024px) {
          .about              { padding: 72px 40px; }
          .about__heading     { font-size: clamp(36px, 4vw, 44px); }
          .about__award       { margin-bottom: 44px; }
          .about__content     { gap: 48px; }
          .about__quote p     { font-size: clamp(20px, 1.8vw, 26px); }
        }
        @media (max-width: 768px) {
          .about              { padding: 60px 24px; border-top-width: 4px; }
          .about__heading     { font-size: clamp(32px, 5vw, 40px); margin-bottom: 20px; }
          .about__award       { margin-bottom: 36px; font-size: 12px; }
          .about__content     { grid-template-columns: 1fr; gap: 40px; }
          .about__left        { order: 2; }
          .about__quote       { order: 1; }
          .about__lead        { font-size: 16px; }
          .about__body        { font-size: 16px; }
          .about__quote p     { font-size: clamp(20px, 3.5vw, 24px); }
        }
        @media (max-width: 520px) {
          .about              { padding: 52px 20px; }
          .about__heading     { font-size: clamp(28px, 7vw, 36px); }
          .about__award       { font-size: 11px; letter-spacing: 0.08em; padding: 8px 13px; margin-bottom: 28px; }
          .about__left        { gap: 20px; }
          .about__quote       { gap: 16px; }
          .about__quote-bar   { width: 3px; }
          .about__quote p     { font-size: 18px; line-height: 1.45; }
        }
        @media (max-width: 360px) {
          .about              { padding: 44px 16px; border-top-width: 3px; }
          .about__heading     { font-size: 28px; }
          .about__award       { font-size: 10px; margin-bottom: 24px; }
          .about__left        { gap: 18px; }
          .about__lead        { font-size: 15px; }
          .about__body        { font-size: 15px; }
          .about__quote p     { font-size: 17px; }
        }
      `}</style>
    </>
  );
}