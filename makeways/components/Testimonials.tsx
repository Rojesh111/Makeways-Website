'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Testimonial {
  id    : number;
  name  : string;
  role  : string;
  quote : string;
  image : string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id   : 1,
    name : 'NIRVANA CHAUDHARY',
    role : 'MD - CHAUDHARY GROUP',
    quote: 'Our association with Makeways goes beyond a typical client - agency relationship. Their strategic thinking and creativity make them one of the finest agencies in Nepal and my first choice.',
    image: '/images/testimonial/NIRVANACHAUDHARY.png',
  },
  {
    id   : 2,
    name : 'HIMANSHU GOLCHA',
    role : 'EXECUTIVE DIRECTOR - HULAS STEEL',
    quote: 'Our experience working with Makeways has been extremely rewarding. What I appreciate about Makeways is their ability to combine creativity with results-driven campaigns.',
    image: '/images/testimonial/HIMANSHUGOLCHA.png',
  },
  {
    id   : 3,
    name : 'MALVIKA SUBBA',
    role : 'MISS NEPAL / MEDIA PERSON',
    quote: 'Working with Makeways has been a smooth and collaborative experience. They are attentive to detail, responsive to feedback, and committed to delivering top-notch event solutions.',
    image: '/images/testimonial/MalvikaSubba.png',
  },
  {
    id   : 4,
    name : 'BHUSAN DAHAL',
    role : 'MEDIA LEADER',
    quote: 'What I admire about Makeways is their storytelling approach. Their campaigns are not just visually appealing but also culturally relevant and emotionally engaging.',
    image: '/images/testimonial/BHUSANDAHAL.png',
  },
  {
    id   : 5,
    name : 'SUDIP THAPA',
    role : 'PRESIDENT - ADVERTISING ASSOCIATION OF NEPAL',
    quote: "Over the years, I have observed many campaigns from Makeways that have contributed positively to Nepal's advertising standards. Their work is thoughtful, well-executed, and impactful.",
    image: '/images/testimonial/SUDIPTHAPA.png',
  },
  {
    id   : 6,
    name : 'IRAJ SHRESTHA',
    role : 'SALES & MARKETING HEAD - GOLDSTAR SHOES',
    quote: 'Makeways stands out because they approach branding with clarity and purpose. Their ideas are not only creative but also aligned with long-term brand positioning.',
    image: '/images/testimonial/IRAJSHRESTHA.png',
  },
];

type Phase = 'idle' | 'exit' | 'enter';

export default function Testimonials() {
  const [current, setCurrent] = useState<number>(0);
  const [phase,   setPhase  ] = useState<Phase>('idle');
  const timerRef              = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const startTransition = useCallback((next: number) => {
    if (phase !== 'idle' || next === current) return;
    clearInterval(timerRef.current);
    setPhase('exit');
    setTimeout(() => {
      setCurrent(next);
      setPhase('enter');
      setTimeout(() => setPhase('idle'), 500);
    }, 280);
  }, [phase, current]);

  const goNext = useCallback(
    () => startTransition((current + 1) % TESTIMONIALS.length),
    [current, startTransition],
  );
  const goPrev = useCallback(
    () => startTransition((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    [current, startTransition],
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp'  ) goPrev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [goNext, goPrev]);

  useEffect(() => {
    timerRef.current = setInterval(goNext, 6000);
    return () => clearInterval(timerRef.current);
  }, [goNext]);

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).style.display = 'none';
  };

  const t      = TESTIMONIALS[current];
  const isExit = phase === 'exit';

  const anim = (delay = '0ms'): React.CSSProperties => ({
    opacity   : isExit ? 0 : 1,
    transform : isExit ? 'translateY(-8px)' : 'translateY(0)',
    transition: isExit
      ? 'opacity .20s ease-in, transform .20s ease-in'
      : `opacity .40s ease-out ${delay}, transform .40s ease-out ${delay}`,
  });

  const photoAnim: React.CSSProperties = {
    opacity   : isExit ? 0 : 1,
    transition: isExit ? 'opacity .20s ease-in' : 'opacity .46s ease-out .04s',
  };

  return (
    <section className="tw" aria-label="Client Testimonials" tabIndex={-1}>

      <div className="tw__shell">

        {/* ═══ LEFT — text ═══ */}
        <div className="tw__left">

          {/* Name + Role */}
          <div className="tw__meta" style={anim('0ms')}>
            <h3 className="tw__name">{t.name}</h3>
            <p  className="tw__role">{t.role}</p>
          </div>

          {/* SAYS — frozen static */}
          <div className="tw__says-block" aria-hidden="true">
            <span className="tw__says">SAYS</span>
            <span className="tw__about">ABOUT MAKEWAYS</span>
          </div>

          {/* Quote — hanging ❝ layout matching PDF exactly */}
          <div className="tw__quote-wrap" style={anim('55ms')}>
            {/*
              PDF layout:
                ❝  Quote text line 1
                   Quote text line 2
                                  ❞
              The opening mark sits to the LEFT, the body text is
              indented so it starts to the right of the mark.
              We achieve this with CSS grid: [mark] [text body].
            */}
            <div className="tw__quote-inner">
              <span className="tw__oq" aria-hidden="true">&ldquo;</span>
              <div className="tw__quote-body">
                <p className="tw__quote">{t.quote}</p>
                <span className="tw__cq" aria-hidden="true">&rdquo;</span>
              </div>
            </div>
          </div>

          {/* Desktop nav dots */}
          <nav className="tw__dots" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === current ? 'true' : 'false'}
                className={`tw__dot${i === current ? ' tw__dot--on' : ''}`}
                onClick={() => startTransition(i)}
              />
            ))}
          </nav>
        </div>

        {/* ═══ RIGHT — portrait ═══ */}
        <div className="tw__right">

          <button className="tw__arrow tw__arrow--prev"
            onClick={goPrev} aria-label="Previous testimonial" tabIndex={-1}>
            <Chevron dir="left" />
          </button>

          {/*
            ── PORTRAIT IMAGE APPROACH ──────────────────────────────
            These are tall transparent-background PNG cutouts.
            Goal: person fills the FULL HEIGHT of the panel, centered
            horizontally, feet anchored to the bottom — exactly as PDF.

            Approach:
              • Frame: flex, align-items:flex-end, justify:center, overflow:hidden
              • img:  height:100%, width:auto  → fills panel height, natural width
              • overflow:hidden clips any width excess cleanly

            This produces the same visual as the Adobe mockup where the
            full-body portrait stands edge-to-edge vertically in the right half.
            ──────────────────────────────────────────────────────── */}
          <div
            className="tw__frame"
            role="img"
            aria-label={`Photo of ${t.name}`}
            style={photoAnim}
          >
            <img
              key={t.id}
              src={t.image}
              alt={t.name}
              className="tw__img"
              onError={onImgError}
            />
          </div>

          <button className="tw__arrow tw__arrow--next"
            onClick={goNext} aria-label="Next testimonial">
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      {/* Mobile dots */}
      <nav className="tw__mobile-dots" aria-label="Testimonial navigation">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} aria-label={`Go to testimonial ${i + 1}`}
            className={`tw__dot${i === current ? ' tw__dot--on' : ''}`}
            onClick={() => startTransition(i)} />
        ))}
      </nav>

      <style jsx>{`

        /* ══════════════════════════════════════
           EUROSTILE FONT STACK
           weight 400 = Regular
           weight 700 = Bold
           weight 800 = T-Bold  
           weight 900 = Extended Bold  ← SAYS uses this
           EurostileCnd = Condensed Bold  ← role + ABOUT uses this
        ══════════════════════════════════════ */
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileExt-Normal Regular.ttf') format('truetype');
          font-weight : 400; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileBold.ttf') format('truetype');
          font-weight : 700; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileTBold.ttf') format('truetype');
          font-weight : 800; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family : 'Eurostile';
          src         : url('/fonts/FONTS/EurostileExt-Bold Regular.ttf') format('truetype');
          font-weight : 900; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family : 'EurostileCnd';
          src         : url('/fonts/FONTS/EurostileCnd-Bold Regular.ttf') format('truetype');
          font-weight : 700; font-style: normal; font-display: swap;
        }

        /* ══════════════════════════════════════
           DESIGN TOKENS — sampled from PDF
        ══════════════════════════════════════ */
        .tw {
          --orange    : #F0A500;   /* brand amber — name, SAYS                  */
          --bg        : #C8C8C8;   /* flat uniform grey                          */
          --role-col  : #3C3C3C;   /* role dark charcoal                         */
          --about-col : #8A8A8A;   /* ABOUT MAKEWAYS mid-grey                    */
          --quote-col : #303030;   /* quote body                                 */
          --oq-col    : #ADADAD;   /* ❝ ❞ light grey                            */
          --dot-off   : rgba(0,0,0,.22);
          --dot-on    : #1C1C1C;
          --arrow-col : #F0A500;
          --arrow-hov : #C88000;

          /*
           * SPLIT: left=46%, right=54%
           * In the PDF the photo panel is WIDER than the text panel.
           * This lets the person start near the horizontal center of
           * the whole component — matching the PDF proportion exactly.
           */
          --split  : 46%;
          --h      : clamp(420px, 48vw, 630px);
          --pad-l  : clamp(36px, 5.5vw, 96px);
          --pad-r  : clamp(16px, 2vw, 36px);

          background : var(--bg);
          width      : 100%;
          overflow   : hidden;
          outline    : none;
          font-family: 'Eurostile', 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif;
        }

        .tw__shell {
          display    : flex;
          align-items: stretch;
          height     : var(--h);
          width      : 100%;
        }

        /* ══════════════════════
           LEFT — text panel
        ══════════════════════ */
        .tw__left {
          flex           : 0 0 var(--split);
          min-width      : 0;
          display        : flex;
          flex-direction : column;
          justify-content: center;
          padding        : 0 var(--pad-r) 0 var(--pad-l);
          position       : relative;
          z-index        : 2;
        }

        /* ── Name ── */
        .tw__meta {
          display       : flex;
          flex-direction: column;
          gap           : 4px;
          will-change   : opacity, transform;
        }

        /*
         * NAME — orange, Eurostile Bold, uppercase, tracked
         * Matches the orange name text in every PDF slide exactly.
         */
        .tw__name {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(14px, 1.6vw, 22px);
          font-weight   : 700;
          color         : var(--orange);
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height   : 1;
          margin        : 0;
        }

        /*
         * ROLE — dark, EurostileCnd, small caps tracking
         * "MD - CHAUDHARY GROUP" style.
         */
        .tw__role {
          font-family   : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(8px, 0.68vw, 11px);
          font-weight   : 700;
          color         : var(--role-col);
          letter-spacing: 3.2px;
          text-transform: uppercase;
          margin        : 0;
          line-height   : 1.1;
        }

        /* ── SAYS block — absolutely frozen, zero animation ever ── */
        .tw__says-block {
          display       : flex;
          flex-direction: column;
          pointer-events: none;
          user-select   : none;
          will-change   : auto;
          transition    : none !important;
          animation     : none !important;
          transform     : none !important;
          opacity       : 1   !important;
        }

        /*
         * SAYS
         * Eurostile Extended Bold (weight 900) — the widest, heaviest cut.
         * Dominant visual element. Sized so it fills ~60% of left panel width.
         * PDF shows no letter-spacing (Extended Bold glyphs are already very wide).
         */
        .tw__says {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(90px, 14.5vw, 195px);
          font-weight   : 900;
          color         : var(--orange);
          letter-spacing: -3px;
          line-height   : 0.82;
          text-transform: uppercase;
          display       : block;
          margin-left   : -3px;   /* optical glyph alignment */
          transition    : none !important;
          animation     : none !important;
          transform     : none !important;
          opacity       : 1   !important;
        }

        /*
         * ABOUT MAKEWAYS
         * EurostileCnd Bold, tiny, very wide letter-spacing.
         * Sits below SAYS as a small label — identical to PDF.
         */
        .tw__about {
          font-family   : 'EurostileCnd', 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(7px, 0.56vw, 9.5px);
          font-weight   : 700;
          color         : var(--about-col);
          letter-spacing: 6px;
          text-transform: uppercase;
          display       : block;
          margin-top    : 10px;
          padding-left  : 3px;
          transition    : none !important;
          animation     : none !important;
          transform     : none !important;
          opacity       : 1   !important;
        }

        /* ── Quote block ── */
        .tw__quote-wrap {
          margin-top  : 14px;
          margin-bottom: 20px;
          max-width   : 470px;
          will-change : opacity, transform;
        }

        /*
         * HANGING QUOTE LAYOUT — matches PDF exactly
         * PDF shows:  ❝  text text text text
         *                text text text text
         *                                 ❞
         * The ❝ is to the LEFT of the text block.
         * We use CSS grid with two columns: [mark] [body]
         */
        .tw__quote-inner {
          display              : grid;
          grid-template-columns: auto 1fr;
          gap                  : 0 8px;
          align-items          : start;
        }

        /* Opening ❝ — Eurostile, light grey, large */
        .tw__oq {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(30px, 3.2vw, 46px);
          font-weight   : 700;
          color         : var(--oq-col);
          line-height   : 1;
          margin-top    : 0;
          user-select   : none;
          /* Align the mark top with first line of text */
          padding-top   : 0.05em;
        }

        .tw__quote-body {
          display       : flex;
          flex-direction: column;
        }

        /* Quote body — Eurostile regular italic, dark grey */
        .tw__quote {
          font-family   : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size     : clamp(12.5px, 1.05vw, 15px);
          font-weight   : 400;
          font-style    : italic;
          color         : var(--quote-col);
          line-height   : 1.85;
          letter-spacing: 0.1px;
          margin        : 0;
          padding       : 0;
        }

        /* Closing ❞ — same Eurostile, light grey, right-aligned after body */
        .tw__cq {
          font-family : 'Eurostile', 'Arial Narrow', Arial, sans-serif;
          font-size   : clamp(20px, 2.2vw, 30px);
          font-weight : 700;
          color       : var(--oq-col);
          line-height : 1;
          display     : inline-block;
          margin-top  : 2px;
          align-self  : flex-start;
          user-select : none;
        }

        /* ── Nav dots ── */
        .tw__dots {
          display    : flex;
          align-items: center;
          gap        : 9px;
        }
        .tw__mobile-dots {
          display        : none;
          justify-content: center;
          align-items    : center;
          gap            : 9px;
          padding        : 16px 0 22px;
          background     : var(--bg);
        }
        .tw__dot {
          width        : 8px;
          height       : 8px;
          border-radius: 50%;
          border       : none;
          background   : var(--dot-off);
          cursor       : pointer;
          padding      : 0;
          flex-shrink  : 0;
          transition   : background .20s, transform .20s;
        }
        .tw__dot--on                     { background: var(--dot-on); transform: scale(1.5); }
        .tw__dot:hover:not(.tw__dot--on) { background: rgba(0,0,0,.42); }
        .tw__dot:focus-visible           { outline: 2px solid var(--orange); outline-offset: 3px; }

        /* ══════════════════════
           RIGHT — photo panel
        ══════════════════════ */
        .tw__right {
          position  : relative;
          flex      : 1 1 0;   /* fills remaining 54% */
          min-width : 0;
          overflow  : hidden;
          background: var(--bg);
        }

        /*
         * FRAME
         * flex, align-items:flex-end  → anchors feet to bottom
         * justify-content:center      → horizontally centered
         * overflow:hidden             → clips any width excess
         *
         * This matches the PDF precisely: person stands at bottom,
         * fills full panel height, centered in the right half.
         */
        .tw__frame {
          position       : absolute;
          inset          : 0;
          z-index        : 1;
          display        : flex;
          align-items    : flex-end;
          justify-content: center;
          overflow       : hidden;
          will-change    : opacity;
        }

        /*
         * IMG
         * height:100%, width:auto
         * → fills full panel height (no shrinking, no object-fit box issues)
         * → width scales naturally from the PNG's aspect ratio
         * → overflow:hidden on .tw__frame clips any horizontal excess
         *
         * This is the EXACT approach needed for tall portrait PNGs
         * to display full-body as in the client's Adobe mockup.
         */
        .tw__img {
          height     : 100%;
          width      : auto;
          display    : block;
          flex-shrink: 0;
        }

        /* ── Orange triangle arrows ── */
        .tw__arrow {
          position       : absolute;
          top            : 50%;
          transform      : translateY(-50%);
          width          : 46px;
          height         : 46px;
          background     : var(--arrow-col);
          border         : none;
          cursor         : pointer;
          display        : flex;
          align-items    : center;
          justify-content: center;
          z-index        : 20;
          transition     : background .15s, opacity .15s;
        }
        .tw__arrow svg    { width: 14px; height: 14px; flex-shrink: 0; }
        .tw__arrow:hover  { background: var(--arrow-hov); }
        .tw__arrow:active { opacity: .65; }
        .tw__arrow:focus-visible { outline: 2px solid var(--dot-on); outline-offset: 2px; }

        .tw__arrow--next {
          right       : 0;
          clip-path   : polygon(0 0, 100% 50%, 0 100%);
          padding-left: 10px;
        }
        /* Prev hidden desktop */
        .tw__arrow--prev {
          left          : 0;
          clip-path     : polygon(100% 0, 0 50%, 100% 100%);
          padding-right : 10px;
          visibility    : hidden;
          pointer-events: none;
          opacity       : 0;
        }

        /* ══════════════════════
           TABLET ≤ 960px
        ══════════════════════ */
        @media (max-width: 960px) {
          .tw { --split: 48%; }
          .tw__left  { padding: 0 16px 0 5vw; }
          .tw__says  { font-size: clamp(76px, 14.5vw, 150px); }
          .tw__name  { font-size: clamp(13px, 1.65vw, 19px); }
          .tw__quote { font-size: clamp(12px, 1.35vw, 14.5px); }
        }

        /* ══════════════════════
           MOBILE ≤ 700px
        ══════════════════════ */
        @media (max-width: 700px) {
          .tw__shell { flex-direction: column; height: auto; }

          .tw__right {
            order     : 1;
            flex      : none;
            width     : 100%;
            height    : 78vw;
            min-height: 280px;
            max-height: 480px;
          }
          /* On mobile centre vertically — head mustn't be cut */
          .tw__frame  { align-items: center; }

          .tw__arrow--prev {
            visibility: visible; opacity: 1; pointer-events: auto;
            display: flex; left: 0; width: 48px; height: 48px;
          }
          .tw__arrow--next { width: 48px; height: 48px; }

          .tw__left {
            order: 2; flex: none; width: 100%;
            padding: 28px 24px 14px;
          }
          .tw__dots        { display: none; }
          .tw__mobile-dots { display: flex; }

          .tw__says       { font-size: clamp(70px, 22vw, 115px); }
          .tw__name       { font-size: clamp(14px, 5vw, 20px); }
          .tw__quote      { font-size: 14px; line-height: 1.74; }
          .tw__quote-wrap { margin-bottom: 6px; }
          .tw__about      { margin-top: 8px; }
          .tw__oq         { font-size: clamp(24px, 6vw, 38px); }
        }

        /* ══════════════════════
           SMALL PHONE ≤ 420px
        ══════════════════════ */
        @media (max-width: 420px) {
          .tw__right { height: 82vw; max-height: 380px; }
          .tw__left  { padding: 20px 16px 12px; }
          .tw__arrow--prev,
          .tw__arrow--next { width: 40px; height: 40px; }
          .tw__says   { font-size: clamp(52px, 25vw, 86px); }
          .tw__name   { font-size: clamp(13px, 5.5vw, 17px); }
          .tw__quote  { font-size: 13px; }
          .tw__role   { font-size: clamp(8px, 2.8vw, 10.5px); }
        }

        /* ══════════════════════
           Reduced motion
        ══════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .tw__meta, .tw__quote-wrap, .tw__frame {
            transition: opacity .15s linear !important;
            transform : none !important;
          }
        }
      `}</style>
    </section>
  );
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff"
      strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === 'right'
        ? <polyline points="9 18 15 12 9 6" />
        : <polyline points="15 18 9 12 15 6" />
      }
    </svg>
  );
}