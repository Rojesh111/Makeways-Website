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

          {/* Section heading — same Eurostile 800 / 54px / 6px ls as CoreValues & Services */}
          <h2 className="about__heading animate">
            <span className="about__heading--black">MAKE</span>
            <span className="about__heading--orange">WAYS</span>
          </h2>

          <div className="about__content">

            <p
              className="about__body animate"
              style={{ '--delay': '0.1s' } as React.CSSProperties}
            >
              Makeways Pvt. Ltd. is an independent, full-service advertising agency based in
              Kathmandu, Nepal, established in 2013. We deliver cutting-edge marcom solutions
              through a wide range of professional services.
            </p>

            <blockquote
              className="about__quote animate"
              style={{ '--delay': '0.2s' } as React.CSSProperties}
            >
              <span className="about__quote-bar" />
              <p>
                Guided by strategic thinking and creative precision, we help brands connect
                meaningfully with their audiences that translates into measurable results.
              </p>
            </blockquote>

            <p
              className="about__body animate"
              style={{ '--delay': '0.3s' } as React.CSSProperties}
            >
              We continuously explore new disciplines and refine our offerings to stay ahead of
              ever-changing trends and platforms.
            </p>

            <p
              className="about__award animate"
              style={{ '--delay': '0.4s' } as React.CSSProperties}
            >
              Makeways proudly stands as Nepal&apos;s most awarded advertising agency.
            </p>

          </div>
        </div>
      </section>

      <style jsx>{`
        /* ── @font-face — local Eurostile (same as CoreValues & Services) ── */
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/EurostileBold.ttf') format('truetype');
          font-weight: 700; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/EurostileExt-Normal Regular.ttf') format('truetype');
          font-weight: 400; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/EurostileExt-Bold Regular.ttf') format('truetype');
          font-weight: 900; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/EurostileTBold.ttf') format('truetype');
          font-weight: 800; font-style: normal; font-display: swap;
        }

        /* ── Design tokens — kept identical to CoreValues & Services ──── */
        .about {
          --eu     : 'Eurostile', 'Arial Narrow', sans-serif;
          --orange : #f47c20;
          --black  : #000000;
          --dark   : #1a1a1a;
          --muted  : #666666;
          --white  : #ffffff;
        }

        .about *, .about *::before, .about *::after { box-sizing: border-box; }

        /* ── Section ─────────────────────────────────────────────────── */
        .about {
          background   : var(--white);
          border-top   : 5px solid var(--orange);
          padding      : 80px 60px;            /* matches CoreValues & Services top padding */
          font-family  : var(--eu);
          width        : 100%;
          overflow-x   : hidden;
        }

        .about__inner {
          max-width : 1280px;                  /* matches CoreValues & Services max-width */
          margin    : 0 auto;
          width     : 100%;
        }

        /* ── Heading — IDENTICAL spec to .cv__heading & .svc__heading ── */
        .about__heading {
          font-family    : var(--eu);
          font-weight    : 800;
          font-size      : 54px;               /* same as CoreValues & Services */
          letter-spacing : 6px;               /* same as CoreValues & Services */
          text-transform : uppercase;
          line-height    : 1;
          margin         : 0 0 64px 0;         /* same bottom margin as CoreValues & Services */
          display        : block;
        }
        .about__heading--black  { color: var(--black); }
        .about__heading--orange { color: var(--orange); }

        /* ── Content block — indented to align with card content ──────── */
        .about__content {
          padding-left   : 80px;
          display        : flex;
          flex-direction : column;
          gap            : 36px;
          max-width      : 860px;
        }

        /* ── Body paragraphs ──────────────────────────────────────────── */
        /* font-size 15px aligns with .svc-label (13–14px) scaled up for
           long-form reading — maintains same Eurostile typeface feel      */
        .about__body {
          font-family    : var(--eu);
          font-weight    : 400;
          font-size      : 14px;               /* aligns with cv__desc (13px) + 1px for readability */
          color          : var(--muted);
          line-height    : 1.9;
          letter-spacing : 0.3px;
          margin         : 0;
        }

        /* ── Pull quote ───────────────────────────────────────────────── */
        .about__quote {
          display     : flex;
          gap         : 22px;
          align-items : flex-start;
          margin      : 0;
          padding     : 8px 0;
        }

        .about__quote-bar {
          display       : block;
          flex-shrink   : 0;
          width         : 5px;
          align-self    : stretch;
          background    : var(--orange);
          border-radius : 2px;
        }

        /* Quote text — matches cv__title weight (700) scaled up for impact */
        .about__quote p {
          font-family    : var(--eu);
          font-weight    : 700;
          font-size      : clamp(17px, 2.2vw, 24px);
          color          : var(--dark);
          line-height    : 1.55;
          letter-spacing : 0.4px;
          margin         : 0;
        }

        /* ── Award line — same weight/size as quote for visual parity ─── */
        .about__award {
          font-family    : var(--eu);
          font-weight    : 700;
          font-size      : clamp(17px, 2.2vw, 24px);
          color          : var(--dark);
          line-height    : 1.55;
          letter-spacing : 0.4px;
          margin         : 0;
        }

        /* ── Scroll-triggered fade-up ─────────────────────────────────── */
        .animate {
          opacity   : 0;
          transform : translateY(22px);
          transition:
            opacity   0.65s ease calc(var(--delay, 0s)),
            transform 0.65s ease calc(var(--delay, 0s));
        }
        .animate.visible {
          opacity   : 1;
          transform : translateY(0);
        }

        /* ── Tablet landscape — 1024px (matches CoreValues breakpoint) ── */
        @media (max-width: 1024px) {
          .about { padding: 70px 40px; }        /* matches cv 1024px padding */
          .about__heading { font-size: 46px; margin-bottom: 52px; }
          .about__content { padding-left: 48px; gap: 30px; }
        }

        /* ── Tablet portrait — 768px ─────────────────────────────────── */
        @media (max-width: 768px) {
          .about {
            padding          : 56px 24px;       /* matches cv 768px padding */
            border-top-width : 4px;
          }
          .about__heading {
            font-size      : 40px;              /* matches cv 768px heading */
            letter-spacing : 4px;
            margin-bottom  : 44px;
          }
          .about__content { padding-left: 0; gap: 26px; }
          .about__body { font-size: 13px; line-height: 1.82; }
          .about__quote { gap: 16px; padding: 6px 0; }
          .about__quote p,
          .about__award  { font-size: 19px; line-height: 1.5; }
        }

        /* ── Mobile — 520px (matches cv smallest grid breakpoint) ──────── */
        @media (max-width: 520px) {
          .about { padding: 48px 20px; }        /* matches cv 520px padding */
          .about__heading {
            font-size      : 32px;
            letter-spacing : 3px;
            margin-bottom  : 36px;
          }
          .about__content { gap: 22px; }
          .about__body { font-size: 13px; line-height: 1.78; }
          .about__quote { gap: 14px; }
          .about__quote-bar { width: 4px; }
          .about__quote p,
          .about__award  { font-size: 17px; line-height: 1.52; }
        }

        /* ── Small mobile — 360px ────────────────────────────────────── */
        @media (max-width: 360px) {
          .about {
            padding          : 44px 16px;
            border-top-width : 3px;
          }
          .about__heading {
            font-size      : 27px;
            letter-spacing : 2px;
            margin-bottom  : 28px;
          }
          .about__content { gap: 18px; }
          .about__body { font-size: 12.5px; }
          .about__quote { gap: 12px; }
          .about__quote-bar { width: 3px; }
          .about__quote p,
          .about__award  { font-size: 15px; }
        }
      `}</style>
    </>
  );
}