'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

/* ─── Types ──────────────────────────────────────────────────────── */
interface Caption { eyebrow: string; headline: string; sub: string; }

interface ImageSlide {
  type: 'image'; src: string; alt: string;
  fit: 'cover' | 'contain'; bg: string; raw?: boolean;
}
interface VideoSlide {
  type: 'video'; src: string; alt: string; bg: string; caption: Caption;
}
type Slide = ImageSlide | VideoSlide;

/* ─── Slides ─────────────────────────────────────────────────────── */
const SLIDES: Slide[] = [
  { type:'image', src:'/images/Hero1.jpeg',   alt:'MAKEWAYS – Data to Decision',   fit:'cover',   bg:'#0a0a0a' },
  { type:'image', src:'/images/Hero2.jpeg',   alt:'MAKEWAYS – Creative Vision',    fit:'cover',   bg:'#0a0a0a' },
  { type:'video', src:'/images/Media1.mp4',   alt:'MAKEWAYS Showreel',             bg:'#0a0a0a',
    caption:{ eyebrow:'MAKEWAYS SHOWREEL', headline:'AWARD-WINNING ADS', sub:'Most Viewed Campaigns in Nepal' } },
  { type:'image', src:'/images/Picture2.jpg', alt:'MAKEWAYS – Portfolio',          fit:'cover',   bg:'#0a0a0a' },
  { type:'image', src:'/images/Picture3.jpg', alt:'MAKEWAYS – Events',             fit:'cover',   bg:'#0a0a0a' },
  { type:'image', src:'/images/awards1.jpg',  alt:'MAKEWAYS – Crity Awards',       fit:'contain', bg:'#fff', raw:true },
];

/* ─── Config ─────────────────────────────────────────────────────── */
const INTERVAL     = 5500;
// Only render slides that are current, previous, or next — reduces DOM work
const RENDER_RANGE = 1;

/* ─── Preload image helper (browser-level, bypasses React lifecycle) */
function preloadImage(src: string) {
  if (typeof window === 'undefined') return;
  const link = document.createElement('link');
  link.rel  = 'preload';
  link.as   = 'image';
  link.href = src;
  link.fetchPriority = 'low'; // don't compete with the hero image
  document.head.appendChild(link);
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function HeroSlider() {
  const [current,  setCurrent]  = useState(0);
  const [prev,     setPrev]     = useState<number | null>(null);
  const [busy,     setBusy]     = useState(false);
  const [ready,    setReady]    = useState(false);
  const [videoPct, setVideoPct] = useState(0);
  // Track which slides have been "visited" so we only preload once
  const preloadedRef = useRef<Set<number>>(new Set([0]));

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef   = useRef<number | null>(null);
  const readyRef = useRef(false);

  const isVideo = SLIDES[current].type === 'video';

  /* ── Mark ready ──────────────────────────────────────────────── */
  const markReady = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    setReady(true);
  }, []);

  /* ── Preload NEXT slide image after current one is visible ──── 
     Strategy: preload only 1 slide ahead, not all at once.
     This avoids saturating the network on page load.            */
  const preloadNeighbors = useCallback((idx: number) => {
    const targets = [
      (idx + 1) % SLIDES.length, // next
      (idx - 1 + SLIDES.length) % SLIDES.length, // prev
    ];
    targets.forEach(i => {
      if (preloadedRef.current.has(i)) return;
      preloadedRef.current.add(i);
      const slide = SLIDES[i];
      if (slide.type === 'image' && !slide.raw) {
        preloadImage(slide.src);
      }
    });
  }, []);

  /* ── Scroll restoration fix ──────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  /* ── Fallback ready after 1.5s (reduced from 2s) ────────────── */
  useEffect(() => {
    const t = setTimeout(markReady, 1500);
    return () => clearTimeout(t);
  }, [markReady]);

  /* ── Preload neighbors when current changes ──────────────────── */
  useEffect(() => {
    if (ready) preloadNeighbors(current);
  }, [current, ready, preloadNeighbors]);

  /* ── Start preloading slide 2 shortly after first paint ─────── */
  useEffect(() => {
    const t = setTimeout(() => preloadNeighbors(0), 800);
    return () => clearTimeout(t);
  }, [preloadNeighbors]);

  /* ── Navigation ──────────────────────────────────────────────── */
  const goTo = useCallback((idx: number) => {
    if (busy) return;
    const next = (idx + SLIDES.length) % SLIDES.length;
    if (next === current) return;
    setBusy(true);
    setPrev(current);
    setCurrent(next);
    setVideoPct(0);
    setTimeout(() => { setPrev(null); setBusy(false); }, 1000);
  }, [busy, current]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* ── Image auto-advance ──────────────────────────────────────── */
  useEffect(() => {
    if (isVideo) return;
    timerRef.current = setTimeout(goNext, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, goNext, isVideo]);

  /* ── Video: play + rAF progress ─────────────────────────────── */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isVideo) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
      const tick = () => {
        if (vid.duration) setVideoPct((vid.currentTime / vid.duration) * 100);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    } else {
      vid.pause();
      vid.currentTime = 0;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
  }, [isVideo, current]);

  /* ── Keyboard ────────────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  /* ── Should this slide be in the DOM? ───────────────────────── */
  const shouldRender = (i: number) => {
    if (i === current || i === prev) return true;
    // Keep neighbors mounted (preloaded in browser cache via <Image>)
    const dist = Math.min(
      Math.abs(i - current),
      SLIDES.length - Math.abs(i - current)
    );
    return dist <= RENDER_RANGE;
  };

  /* ─── Render ─────────────────────────────────────────────────── */
  return (
    <>
      {/*
        ── CRITICAL: Preload first image at <head> level ──────────
        Add this to your layout.tsx <head> for the absolute fastest
        first-paint (even faster than priority={true} on <Image>):

        <link
          rel="preload"
          as="image"
          href="/images/Hero1.jpeg"
          fetchPriority="high"
        />
      */}

      <section className={`hs${ready ? ' hs--ready' : ''}`} aria-label="Hero slider">

        {/* Shimmer — visible until ready */}
        <div className={`hs__shimmer${ready ? ' hs__shimmer--gone' : ''}`} aria-hidden="true" />

        {/* Slide stack — only render current + neighbors */}
        <div className="hs__track">
          {SLIDES.map((slide, i) => {
            if (!shouldRender(i)) return null; // ← KEY: don't mount far slides

            const isActive = i === current;
            const isExit   = i === prev;
            return (
              <div
                key={i}
                className={['hs__slide', isActive ? 'hs__slide--in' : '', isExit ? 'hs__slide--out' : ''].join(' ')}
                style={{ backgroundColor: slide.bg }}
                aria-hidden={!isActive}
              >
                {slide.type === 'image' && (
                  <div className={`hs__zoom${isActive ? ' hs__zoom--on' : ''}`}>
                    {slide.raw ? (
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        style={{
                          position:'absolute', inset:0, width:'100%', height:'100%',
                          objectFit: slide.fit, objectPosition:'center', display:'block'
                        }}
                      />
                    ) : (
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        // Slide 0 = high priority, fetched immediately
                        // Others = lazy, only load when near current
                        priority={i === 0}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        // IMPORTANT: quality 80 vs 75 is negligible visually
                        // but the REAL fix is server-side caching (see next.config)
                        quality={80}
                        // Explicit sizes helps Next.js pick the right srcset entry
                        sizes="(max-width: 768px) 100vw, 100vw"
                        onLoad={i === 0 ? markReady : undefined}
                        onError={i === 0 ? markReady : undefined}
                        style={{ objectFit: slide.fit, objectPosition:'center' }}
                        // placeholder="blur" requires blurDataURL — add if you generate them
                      />
                    )}
                  </div>
                )}

                {slide.type === 'video' && (
                  <>
                    <video
                      ref={videoRef}
                      className="hs__video"
                      src={slide.src}
                      muted playsInline loop={false}
                      // ← CHANGED from "auto" to "metadata"
                      // "auto" downloads the ENTIRE video on page load
                      // "metadata" only fetches duration/dimensions — saves huge bandwidth
                      preload="metadata"
                      onEnded={goNext}
                      aria-label={slide.alt}
                    />
                    <div className="hs__vgrad" aria-hidden="true" />
                    {isActive && (
                      <div className="hs__cap">
                        <span className="hs__cap-eye">{slide.caption.eyebrow}</span>
                        <h2   className="hs__cap-hl">{slide.caption.headline}</h2>
                        <p    className="hs__cap-sub">{slide.caption.sub}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button className="hs__arrow hs__arrow--l" onClick={goPrev} aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M11 3.5L6 9L11 14.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="hs__arrow hs__arrow--r" onClick={goNext} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M7 3.5L12 9L7 14.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Bottom bar */}
        <div className="hs__bar">
          <div className="hs__dots" role="tablist">
            {SLIDES.map((s, i) => (
              <button key={i} role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}`}
                className={['hs__dot', i===current?'hs__dot--on':'', s.type==='video'?'hs__dot--video':''].join(' ')}
                onClick={() => goTo(i)}
              >
                {s.type === 'video' && (
                  <svg width="5" height="6" viewBox="0 0 5 6" fill="currentColor" aria-hidden="true">
                    <path d="M0 0L5 3L0 6Z"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
          <span className="hs__count" aria-live="polite">
            <b>{String(current + 1).padStart(2, '0')}</b>
            <span className="hs__sep"> / </span>
            {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Progress bar */}
        <div className="hs__prog" aria-hidden="true">
          {isVideo
            ? <div className="hs__prog-fill" style={{ width:`${videoPct}%`, transition:'width 0.1s linear', animation:'none' }} />
            : <div className="hs__prog-fill" key={current} />
          }
        </div>
      </section>

      <style jsx>{`
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileExt-Normal Regular.ttf') format('truetype');
          font-weight: 400; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileBold.ttf') format('truetype');
          font-weight: 700; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileTBold.ttf') format('truetype');
          font-weight: 800; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'Eurostile';
          src: url('/fonts/FONTS/EurostileExt-Bold Regular.ttf') format('truetype');
          font-weight: 900; font-style: normal; font-display: swap;
        }

        /* ── Container ──────────────────────────────────────────── */
        .hs {
          position:relative; width:100%;
          height:calc(100vh - 55px); min-height:480px; max-height:920px;
          overflow:hidden; background:#0a0a0a; margin-top:55px;
          opacity:0;
        }
        .hs--ready { opacity:1; transition:opacity 0.6s ease; }

        /* ── Shimmer ────────────────────────────────────────────── */
        .hs__shimmer {
          position:absolute; inset:0; z-index:30; pointer-events:none;
          background:linear-gradient(110deg,#0f0f0f 25%,#1a1a1a 37%,#0f0f0f 63%);
          background-size:400% 100%;
          animation:shimmer 1.6s ease infinite;
          transition:opacity 0.5s ease;
        }
        .hs__shimmer--gone { opacity:0; pointer-events:none; }
        @keyframes shimmer {
          0%  { background-position:100% 50%; }
          100%{ background-position:0%   50%; }
        }

        /* ── Track ──────────────────────────────────────────────── */
        .hs__track { position:absolute; inset:0; }

        /* ── Slides ─────────────────────────────────────────────── */
        .hs__slide { position:absolute; inset:0; opacity:0; pointer-events:none; }
        .hs__slide--in  {
          opacity:1; pointer-events:auto; z-index:2;
          transition:opacity 0.95s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .hs__slide--out {
          opacity:0; z-index:1;
          transition:opacity 0.95s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        /* ── Ken-Burns ──────────────────────────────────────────── */
        .hs__zoom { position:absolute; inset:0; will-change:transform; }
        .hs__zoom--on { animation:kenburns 6s ease-in-out infinite alternate; }
        @keyframes kenburns {
          0%  { transform:scale(1);    }
          100%{ transform:scale(1.06); }
        }

        /* ── Video ──────────────────────────────────────────────── */
        .hs__video {
          position:absolute; inset:0; width:100%; height:100%;
          object-fit:cover; object-position:center; display:block;
        }
        .hs__vgrad {
          position:absolute; inset:0; z-index:2; pointer-events:none;
          background:linear-gradient(to top,rgba(0,0,0,0.80) 0%,rgba(0,0,0,0.20) 50%,transparent 100%);
        }

        /* ── Video caption ──────────────────────────────────────── */
        .hs__cap {
          position:absolute; bottom:90px; left:60px; z-index:10;
          display:flex; flex-direction:column; gap:12px; pointer-events:none;
        }
        .hs__cap-eye {
          display:inline-block;
          font-family:'Eurostile','Arial Narrow',sans-serif; font-weight:700;
          font-size:11px; letter-spacing:0.38em; text-transform:uppercase;
          color:#f47c20; border:1.5px solid rgba(244,124,32,0.5);
          background:rgba(244,124,32,0.10); padding:6px 16px; border-radius:2px;
          width:fit-content;
          animation:capEye 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s both;
        }
        .hs__cap-hl {
          font-family:'Eurostile','Arial Narrow',sans-serif; font-weight:900;
          font-size:clamp(28px,5vw,66px); letter-spacing:0.05em;
          text-transform:uppercase; color:#fff; margin:0; line-height:1;
          animation:capHl 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s both;
        }
        .hs__cap-sub {
          font-family:'Eurostile','Arial Narrow',sans-serif; font-weight:400;
          font-size:clamp(10px,1.3vw,14px); letter-spacing:0.22em;
          text-transform:uppercase; color:rgba(255,255,255,0.60); margin:0;
          animation:capSub 0.8s ease 0.7s both;
        }
        @keyframes capEye { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes capHl  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes capSub { from{opacity:0} to{opacity:1} }

        /* ── Arrows ─────────────────────────────────────────────── */
        .hs__arrow {
          position:absolute; top:50%; transform:translateY(-50%); z-index:20;
          width:46px; height:46px; border-radius:50%;
          border:1.5px solid rgba(255,255,255,0.28); background:rgba(0,0,0,0.22);
          backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
          color:#fff; cursor:pointer; display:flex; align-items:center;
          justify-content:center; padding:0;
          transition:background 0.22s,border-color 0.22s,transform 0.22s;
        }
        .hs__arrow:hover { background:#f47c20; border-color:#f47c20; transform:translateY(-50%) scale(1.1); }
        .hs__arrow--l { left:24px; }
        .hs__arrow--r { right:24px; }

        /* ── Bottom bar ─────────────────────────────────────────── */
        .hs__bar {
          position:absolute; bottom:28px; left:0; right:0; z-index:20;
          display:flex; align-items:center; justify-content:center;
          gap:20px; pointer-events:none;
        }
        .hs__dots { display:flex; gap:8px; align-items:center; pointer-events:auto; }
        .hs__dot {
          width:6px; height:6px; border-radius:6px; border:none;
          background:rgba(255,255,255,0.35); cursor:pointer; padding:0;
          display:flex; align-items:center; justify-content:center; color:transparent;
          transition:width 0.35s cubic-bezier(0.4,0,0.2,1), background 0.35s;
        }
        .hs__dot--on { width:26px; background:#f47c20; }
        .hs__dot--video {
          width:14px; height:14px; border-radius:50%;
          border:1.5px solid rgba(255,255,255,0.5); background:rgba(255,255,255,0.12);
        }
        .hs__dot--video.hs__dot--on { width:14px; background:#f47c20; border-color:#f47c20; color:#fff; }

        /* ── Slide counter ──────────────────────────────────────── */
        .hs__count {
          font-family:'Eurostile',monospace; font-size:11px; letter-spacing:0.14em;
          color:rgba(255,255,255,0.45); user-select:none; pointer-events:auto;
        }
        .hs__count b { color:#fff; font-weight:700; }
        .hs__sep { margin:0 2px; opacity:0.5; }

        /* ── Progress bar ───────────────────────────────────────── */
        .hs__prog {
          position:absolute; bottom:0; left:0; right:0;
          height:2px; background:rgba(255,255,255,0.08); z-index:20; overflow:hidden;
        }
        .hs__prog-fill {
          height:100%; width:0; background:#f47c20;
          animation:hsProg ${INTERVAL}ms linear forwards;
        }
        @keyframes hsProg { from{width:0%} to{width:100%} }

        /* ── Mobile ─────────────────────────────────────────────── */
        @media(max-width:768px) {
          .hs { margin-top:70px; height:calc(100vh - 70px); min-height:280px; }
          .hs__arrow { width:38px; height:38px; }
          .hs__arrow--l { left:12px; }
          .hs__arrow--r { right:12px; }
          .hs__count { display:none; }
          .hs__bar { bottom:18px; }
          .hs__cap { bottom:60px; left:20px; right:20px; gap:8px; }
          .hs__cap-eye { font-size:9px; letter-spacing:0.22em; }
          .hs__cap-sub { letter-spacing:0.12em; }
        }
        @media(max-width:480px) { .hs__arrow { display:none; } }
      `}</style>
    </>
  );
}