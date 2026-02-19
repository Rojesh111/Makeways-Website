'use client';

import { useEffect, useRef, type ReactElement } from 'react';

export default function AboutMakeways(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedEls = sectionRef.current?.querySelectorAll<HTMLElement>('.animate');
    animatedEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="about" id="about" ref={sectionRef}>
        <div className="about__inner">

          {/* Title */}
          <h2 className="about__title animate">
            <span className="about__title--black">MAKE</span>
            <span className="about__title--orange">WAYS</span>
          </h2>

          {/* Content block */}
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
              everchanging trends and platforms.
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
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&display=swap');

        /* ── CSS Variables ───────────────────────────────────────────── */
        .about {
          --orange : #ff8c00;
          --black  : #000000;
          --dark   : #1a1a1a;
          --muted  : #666666;
          --white  : #ffffff;
          --font   : 'Eurostile', 'Barlow', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ── Global reset scoped ─────────────────────────────────────── */
        .about *,
        .about *::before,
        .about *::after {
          box-sizing: border-box;
        }

        /* ── Section — Desktop base ──────────────────────────────────── */
        .about {
          background      : var(--white);
          border-top      : 5px solid var(--orange);
          padding         : 100px 48px;
          font-family     : var(--font);
          width           : 100%;
          overflow-x      : hidden;
        }

        .about__inner {
          max-width : 920px;
          margin    : 0 auto;
          width     : 100%;
        }

        /* ── Title ───────────────────────────────────────────────────── */
        .about__title {
          font-size      : clamp(28px, 5vw, 52px);
          font-weight    : 700;
          letter-spacing : 3px;
          line-height    : 1;
          margin         : 0 0 52px 0;
          font-family    : var(--font);
          display        : block;
        }

        .about__title--black  { color: var(--black); }
        .about__title--orange { color: var(--orange); }

        /* ── Indented content block ──────────────────────────────────── */
        .about__content {
          padding-left   : 80px;
          display        : flex;
          flex-direction : column;
          gap            : 36px;
        }

        /* ── Body paragraphs ─────────────────────────────────────────── */
        .about__body {
          font-size      : 15.5px;
          color          : var(--muted);
          line-height    : 1.85;
          letter-spacing : 0.2px;
          margin         : 0;
          font-family    : var(--font);
        }

        /* ── Pull quote ──────────────────────────────────────────────── */
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

        .about__quote p {
          font-size      : clamp(17px, 2.4vw, 26px);
          font-weight    : 700;
          color          : var(--dark);
          line-height    : 1.5;
          letter-spacing : 0.3px;
          margin         : 0;
          font-family    : var(--font);
        }

        /* ── Award statement ─────────────────────────────────────────── */
        .about__award {
          font-size      : clamp(17px, 2.4vw, 26px);
          font-weight    : 700;
          color          : var(--dark);
          line-height    : 1.5;
          letter-spacing : 0.3px;
          margin         : 0;
          font-family    : var(--font);
        }

        /* ── Scroll-triggered fade-up animation ──────────────────────── */
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

        /* ── Tablet landscape — max 1280px ───────────────────────────── */
        @media (max-width: 1280px) {
          .about {
            padding: 88px 40px;
          }
          .about__content {
            padding-left: 64px;
          }
        }

        /* ── Tablet portrait — max 1024px ────────────────────────────── */
        @media (max-width: 1024px) {
          .about {
            padding: 80px 32px;
          }
          .about__title {
            margin-bottom: 44px;
          }
          .about__content {
            padding-left: 48px;
            gap: 32px;
          }
          .about__body {
            font-size: 15px;
          }
        }

        /* ── Large phone — max 768px ─────────────────────────────────── */
        @media (max-width: 768px) {
          .about {
            padding         : 64px 24px;
            border-top-width: 4px;
          }
          .about__inner {
            max-width: 100%;
          }
          .about__title {
            font-size      : 38px;
            letter-spacing : 2px;
            margin-bottom  : 36px;
          }
          .about__content {
            padding-left: 0;
            gap: 28px;
          }
          .about__body {
            font-size  : 15px;
            line-height: 1.8;
          }
          .about__quote {
            gap    : 18px;
            padding: 6px 0;
          }
          .about__quote p,
          .about__award {
            font-size  : 20px;
            line-height: 1.5;
          }
        }

        /* ── Mobile portrait — max 480px ─────────────────────────────── */
        @media (max-width: 480px) {
          .about {
            padding         : 52px 20px;
            border-top-width: 4px;
          }
          .about__title {
            font-size      : 32px;
            letter-spacing : 1.5px;
            margin-bottom  : 28px;
          }
          .about__content {
            gap: 24px;
          }
          .about__body {
            font-size  : 14.5px;
            line-height: 1.78;
          }
          .about__quote {
            gap: 14px;
          }
          .about__quote-bar {
            width: 4px;
          }
          .about__quote p,
          .about__award {
            font-size  : 18px;
            line-height: 1.55;
          }
        }

        /* ── Small mobile — max 360px ────────────────────────────────── */
        @media (max-width: 360px) {
          .about {
            padding         : 44px 16px;
            border-top-width: 3px;
          }
          .about__title {
            font-size      : 27px;
            letter-spacing : 1px;
            margin-bottom  : 24px;
          }
          .about__content {
            gap: 20px;
          }
          .about__body {
            font-size  : 14px;
            line-height: 1.75;
          }
          .about__quote {
            gap: 12px;
          }
          .about__quote-bar {
            width: 3px;
          }
          .about__quote p,
          .about__award {
            font-size  : 16px;
            line-height: 1.55;
          }
        }
      `}</style>
    </>
  );
}