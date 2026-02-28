'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

/* ─── Types ──────────────────────────────────────────────────────── */
interface Caption  { eyebrow: string; headline: string; sub: string; }
interface ImageSlide { type: 'image'; src: string; alt: string; fit: 'cover' | 'contain'; bg: string; raw?: boolean; }
interface VideoSlide { type: 'video'; src: string; alt: string; bg: string; caption: Caption; }
type Slide = ImageSlide | VideoSlide;

/* ─── Slides — edit paths here ───────────────────────────────────── */
const SLIDES: Slide[] = [
  { type: 'video', src: '/Videos/neta2.mp4',  alt: 'MAKEWAYS Showreel',       bg: '#0a0a0a', caption: { eyebrow: '', headline: '', sub: '' } },
  { type: 'video', src: '/Videos/nbank.mp4',  alt: 'Nabilbank – MAKEWAYS',    bg: '#0a0a0a', caption: { eyebrow: '', headline: '', sub: '' } },
  { type: 'video', src: '/Videos/hulas.mp4',  alt: 'Hulas – MAKEWAYS',        bg: '#0a0a0a', caption: { eyebrow: '', headline: '', sub: '' } },
  { type: 'video', src: '/Videos/neta.mp4',  alt: 'Neta EV – MAKEWAYS',   bg: '#0a0a0a', caption: { eyebrow: '', headline: '', sub: '' } },
  { type: 'video', src: '/Videos/super.mp4',  alt: 'NSL League – MAKEWAYS',   bg: '#0a0a0a', caption: { eyebrow: '', headline: '', sub: '' } },
  { type: 'video', src: '/Videos/suzuki.mp4', alt: 'Suzuki – MAKEWAYS',       bg: '#0a0a0a', caption: { eyebrow: '', headline: '', sub: '' } },
  { type: 'video', src: '/Videos/yamaha.mp4', alt: 'Yamaha – MAKEWAYS',       bg: '#0a0a0a', caption: { eyebrow: '', headline: '', sub: '' } },
];

const INTERVAL     = 6000;   // ms between auto-advance (images only)
const RENDER_RANGE = 1;       // how many slides either side to keep mounted

/* ─── Tiny helper: preload image link ───────────────────────────── */
function preloadImage(src: string) {
  if (typeof window === 'undefined') return;
  const link = document.createElement('link');
  link.rel = 'preload'; link.as = 'image'; link.href = src; link.fetchPriority = 'low';
  document.head.appendChild(link);
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function HeroSlider() {
  const [current,   setCurrent]  = useState(0);
  const [prev,      setPrev]     = useState<number | null>(null);
  const [busy,      setBusy]     = useState(false);
  const [ready,     setReady]    = useState(false);
  const [videoPct,  setVideoPct] = useState(0);
  const [muted,     setMuted]    = useState(true);
  const [hasAudio,  setHasAudio] = useState(false);   // true once we detect an audio track

  const preloadedRef = useRef<Set<number>>(new Set([0]));
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef       = useRef<number | null>(null);
  const readyRef     = useRef(false);
  const videoRefs    = useRef<Map<number, HTMLVideoElement>>(new Map());

  /* ── Video ref collector ─────────────────────────────────────── */
  const setVideoRef = (i: number) => (el: HTMLVideoElement | null) => {
    if (el) videoRefs.current.set(i, el);
    else    videoRefs.current.delete(i);
  };

  const isVideo = SLIDES[current].type === 'video';

  /* ── Mark slider ready (fade-in shimmer away) ─────────────────── */
  const markReady = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true; setReady(true);
  }, []);

  /* ── Preload neighbor slides ──────────────────────────────────── */
  const preloadNeighbors = useCallback((idx: number) => {
    [(idx + 1) % SLIDES.length, (idx - 1 + SLIDES.length) % SLIDES.length].forEach(i => {
      if (preloadedRef.current.has(i)) return;
      preloadedRef.current.add(i);
      const s = SLIDES[i];
      if (s.type === 'image' && !s.raw) preloadImage(s.src);
    });
  }, []);

  /* ── Lock scroll to top on mount ─────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => { const t = setTimeout(markReady, 1500);       return () => clearTimeout(t); }, [markReady]);
  useEffect(() => { if (ready) preloadNeighbors(current); },     [current, ready, preloadNeighbors]);
  useEffect(() => { const t = setTimeout(() => preloadNeighbors(0), 800); return () => clearTimeout(t); }, [preloadNeighbors]);

  /* ── Core navigation ─────────────────────────────────────────── */
  const goTo = useCallback((idx: number) => {
    if (busy) return;
    const next = (idx + SLIDES.length) % SLIDES.length;
    if (next === current) return;

    // Pause & reset outgoing video
    const outVid = videoRefs.current.get(current);
    if (outVid) { outVid.pause(); outVid.currentTime = 0; }

    // Cancel RAF progress tracker
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    setBusy(true); setPrev(current); setCurrent(next); setVideoPct(0); setHasAudio(false);
    setTimeout(() => { setPrev(null); setBusy(false); }, 1000);
  }, [busy, current]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* ── Auto-advance for image slides ───────────────────────────── */
  useEffect(() => {
    if (isVideo) return;
    timerRef.current = setTimeout(goNext, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, goNext, isVideo]);

  /* ─────────────────────────────────────────────────────────────────
     VIDEO PLAYBACK ENGINE
     ─ Starts the active video 50ms after slide becomes current
       (gives React time to commit the DOM node).
     ─ Applies current mute state immediately before play().
     ─ Detects audio tracks via HTMLMediaElement.audioTracks (Chrome/Edge)
       OR a canplaythrough + volume probe fallback for Safari/FF.
     ─ Runs a RAF loop to track progress %.
     ─ onEnded fires goNext so videos self-advance.
  ───────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isVideo) return;

    let cancelled = false;
    let rafId: number;

    const t = setTimeout(async () => {
      if (cancelled) return;
      const vid = videoRefs.current.get(current);
      if (!vid) return;

      vid.currentTime = 0;
      vid.muted = muted;

      // ── Audio detection ──────────────────────────────────────
      // Method 1: audioTracks API (Chrome, Edge, Brave)
      const tracks = (vid as any).audioTracks as { length: number; onaddtrack: (() => void) | null } | undefined;
      if (tracks !== undefined) {
        const check = () => { if (!cancelled) setHasAudio(tracks.length > 0); };
        if (tracks.length > 0) { check(); }
        else { tracks.onaddtrack = check; }
      } else {
        // Method 2: Metadata-based heuristic — check if video has audio
        // We probe by briefly unmuting and watching volume level
        const onMeta = () => {
          if (cancelled) return;
          // Safari exposes webkitAudioDecodedByteCount
          const wk = (vid as any).webkitAudioDecodedByteCount;
          if (typeof wk === 'number') {
            // give it 300ms to decode a few audio bytes
            setTimeout(() => {
              if (!cancelled) setHasAudio((vid as any).webkitAudioDecodedByteCount > 0);
            }, 300);
          } else {
            // Fallback: assume audio exists (button will appear; worst case = silent toggle)
            setHasAudio(true);
          }
        };
        if (vid.readyState >= 1) onMeta();
        else vid.addEventListener('loadedmetadata', onMeta, { once: true });
      }

      // ── Play ─────────────────────────────────────────────────
      try { await vid.play(); } catch { /* Autoplay blocked — still muted so rare */ }

      // ── RAF progress tracker ─────────────────────────────────
      const tick = () => {
        if (cancelled) return;
        if (vid.duration && vid.duration > 0) {
          setVideoPct((vid.currentTime / vid.duration) * 100);
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }, 50);

    return () => {
      cancelled = true;
      clearTimeout(t);
      if (rafId) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideo, current]);

  /* ── Keep mute state in sync with active video ───────────────── */
  useEffect(() => {
    const vid = videoRefs.current.get(current);
    if (vid) vid.muted = muted;
  }, [muted, current]);

  /* ── Keyboard shortcuts ───────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't fire if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;
      switch (e.key) {
        case 'ArrowLeft':  e.preventDefault(); goPrev();                   break;
        case 'ArrowRight': e.preventDefault(); goNext();                   break;
        case 'ArrowUp':    e.preventDefault(); goNext();                   break;
        case 'ArrowDown':  e.preventDefault(); goPrev();                   break;
        case 'm':
        case 'M':          e.preventDefault(); setMuted(m => !m);          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  /* ── Touch / swipe ───────────────────────────────────────────── */
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) { dx < 0 ? goNext() : goPrev(); }
    touchStartX.current = null;
  };

  /* ── Determine which slides to keep in DOM ───────────────────── */
  const shouldRender = (i: number) => {
    if (i === current || i === prev) return true;
    const dist = Math.min(Math.abs(i - current), SLIDES.length - Math.abs(i - current));
    return dist <= RENDER_RANGE;
  };

  /* ─────────────────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────────────────── */
  return (
    <>
      <section
        className={`hs${ready ? ' hs--ready' : ''}`}
        aria-label="Hero slider"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Shimmer skeleton while first slide loads */}
        <div className={`hs__shimmer${ready ? ' hs__shimmer--gone' : ''}`} aria-hidden="true" />

        {/* Keyboard hint badge — appears once then fades */}
        <div className="hs__hint" aria-hidden="true">
          <kbd>←</kbd><kbd>→</kbd>&nbsp; navigate &nbsp;·&nbsp; <kbd>M</kbd>&nbsp; sound
        </div>

        {/* Slide track */}
        <div className="hs__track">
          {SLIDES.map((slide, i) => {
            if (!shouldRender(i)) return null;
            const isActive = i === current;
            const isExit   = i === prev;
            return (
              <div
                key={i}
                className={['hs__slide', isActive ? 'hs__slide--in' : '', isExit ? 'hs__slide--out' : ''].join(' ')}
                style={{ backgroundColor: slide.bg }}
                aria-hidden={!isActive}
              >
                {/* ── Image slide ──────────────────────────────── */}
                {slide.type === 'image' && (
                  <div className={`hs__zoom${isActive ? ' hs__zoom--on' : ''}`}>
                    {slide.raw ? (
                      <img
                        src={slide.src} alt={slide.alt}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                          objectFit: slide.fit, objectPosition: 'center', display: 'block' }}
                      />
                    ) : (
                      <Image
                        src={slide.src} alt={slide.alt} fill
                        priority={i === 0} loading={i === 0 ? 'eager' : 'lazy'}
                        quality={80} sizes="100vw"
                        onLoad={i === 0 ? markReady : undefined}
                        onError={i === 0 ? markReady : undefined}
                        style={{ objectFit: slide.fit, objectPosition: 'center' }}
                      />
                    )}
                  </div>
                )}

                {/* ── Video slide ──────────────────────────────── */}
                {slide.type === 'video' && (
                  <>
                    <video
                      ref={setVideoRef(i)}
                      className="hs__video"
                      src={slide.src}
                      muted
                      playsInline
                      loop={false}
                      preload={i === 0 ? 'auto' : 'metadata'}
                      onEnded={goNext}
                      onCanPlay={i === 0 ? markReady : undefined}
                      onError={i === 0 ? markReady : undefined}
                      aria-label={slide.alt}
                    />
                    <div className="hs__vgrad" aria-hidden="true" />

                    {/* Caption — only on active slide, only if non-empty */}
                    {isActive && (slide.caption.headline || slide.caption.eyebrow) && (
                      <div className="hs__cap">
                        {slide.caption.eyebrow && (
                          <span className="hs__cap-eye">{slide.caption.eyebrow}</span>
                        )}
                        {slide.caption.headline && (
                          <h2 className="hs__cap-hl">{slide.caption.headline}</h2>
                        )}
                        {slide.caption.sub && (
                          <p className="hs__cap-sub">{slide.caption.sub}</p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ─── Navigation arrows ───────────────────────────────── */}
        <button className="hs__arrow hs__arrow--l" onClick={goPrev} aria-label="Previous slide">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M11 3.5L6 9L11 14.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="hs__arrow hs__arrow--r" onClick={goNext} aria-label="Next slide">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M7 3.5L12 9L7 14.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* ─── Sound toggle — only shown on video slides with audio ─ */}
        {isVideo && hasAudio && (
          <button
            className={`hs__sound${muted ? ' hs__sound--muted' : ' hs__sound--live'}`}
            onClick={() => setMuted(m => !m)}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            title={muted ? 'Unmute (M)' : 'Mute (M)'}
          >
            <span className="hs__sound-ico" aria-hidden="true">
              {muted ? (
                /* Muted — speaker with X */
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                /* Unmuted — speaker with waves */
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              )}
            </span>
            <span className="hs__sound-lbl">{muted ? 'SOUND OFF' : 'SOUND ON'}</span>
          </button>
        )}

        {/* ─── Bottom bar: dots + counter ──────────────────────── */}
        <div className="hs__bar">
          <div className="hs__dots" role="tablist" aria-label="Slide navigation">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                className={[
                  'hs__dot',
                  i === current ? 'hs__dot--on' : '',
                  s.type === 'video' ? 'hs__dot--vid' : '',
                ].join(' ')}
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
          <span className="hs__count" aria-live="polite" aria-atomic="true">
            <b>{String(current + 1).padStart(2, '0')}</b>
            <span className="hs__sep"> / </span>
            {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        {/* ─── Progress bar ────────────────────────────────────── */}
        <div className="hs__prog" aria-hidden="true" role="progressbar" aria-valuenow={Math.round(videoPct)}>
          {isVideo
            ? <div className="hs__prog-fill hs__prog-fill--vid" style={{ width: `${videoPct}%` }} />
            : <div className="hs__prog-fill" key={current} />
          }
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          STYLES
          All CSS is scoped via JSX — no global pollution.
      ───────────────────────────────────────────────────────────── */}
      <style jsx>{`
        /* ── Fonts ───────────────────────────────────────────────── */
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

        /* ── Container ───────────────────────────────────────────── */
        .hs {
          position:   relative;
          width:      100%;
          height:     calc(100vh - 55px);
          min-height: 480px;
          max-height: 920px;
          overflow:   hidden;
          background: #0a0a0a;
          margin-top: 55px;
          opacity:    0;
          /* Prepare GPU layer early for smooth compositing */
          will-change: opacity;
        }
        .hs--ready {
          opacity:    1;
          transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* ── Shimmer skeleton ────────────────────────────────────── */
        .hs__shimmer {
          position:    absolute;
          inset:       0;
          z-index:     30;
          pointer-events: none;
          background:  linear-gradient(110deg, #0f0f0f 25%, #1c1c1c 37%, #0f0f0f 63%);
          background-size: 400% 100%;
          animation:   shimmer 1.6s ease infinite;
          transition:  opacity 0.5s ease;
        }
        .hs__shimmer--gone { opacity: 0; pointer-events: none; }
        @keyframes shimmer {
          0%   { background-position: 100% 50%; }
          100% { background-position:   0% 50%; }
        }

        /* ── Keyboard hint ───────────────────────────────────────── */
        .hs__hint {
          position:    absolute;
          top:         18px;
          left:        50%;
          transform:   translateX(-50%);
          z-index:     25;
          display:     inline-flex;
          align-items: center;
          gap:         4px;
          padding:     5px 14px;
          border-radius: 20px;
          background:  rgba(0,0,0,0.42);
          border:      1px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          font-family: 'Eurostile', 'Arial Narrow', monospace;
          font-size:   9px;
          letter-spacing: 0.12em;
          color:       rgba(255,255,255,0.30);
          /* Show on mount, fade after 3s */
          animation:   hintFade 4.5s ease 1.5s forwards;
          pointer-events: none;
          white-space: nowrap;
        }
        .hs__hint kbd {
          display:       inline-flex;
          align-items:   center;
          justify-content: center;
          min-width:     18px;
          height:        16px;
          padding:       0 4px;
          border-radius: 3px;
          background:    rgba(255,255,255,0.10);
          border:        1px solid rgba(255,255,255,0.18);
          font-family:   inherit;
          font-size:     8px;
          color:         rgba(255,255,255,0.55);
        }
        @keyframes hintFade {
          0%   { opacity: 1; }
          70%  { opacity: 1; }
          100% { opacity: 0; }
        }

        /* ── Track / Slides ──────────────────────────────────────── */
        .hs__track { position: absolute; inset: 0; }
        .hs__slide {
          position:       absolute;
          inset:          0;
          opacity:        0;
          pointer-events: none;
        }
        .hs__slide--in {
          opacity:        1;
          pointer-events: auto;
          z-index:        2;
          transition:     opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hs__slide--out {
          opacity:        0;
          z-index:        1;
          transition:     opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* ── Ken-Burns (image slides) ────────────────────────────── */
        .hs__zoom { position: absolute; inset: 0; will-change: transform; }
        .hs__zoom--on { animation: kenburns 7s ease-in-out infinite alternate; }
        @keyframes kenburns {
          0%   { transform: scale(1)     translateX(0)     translateY(0); }
          100% { transform: scale(1.07)  translateX(-1%)   translateY(-0.5%); }
        }

        /* ── Video ───────────────────────────────────────────────── */
        .hs__video {
          position:        absolute;
          inset:           0;
          width:           100%;
          height:          100%;
          object-fit:      cover;
          object-position: center;
          display:         block;
          /* Hardware-accelerate the video element */
          will-change:     transform;
          transform:       translateZ(0);
        }

        /* Gradient veil — bottom heavy for caption legibility */
        .hs__vgrad {
          position:    absolute;
          inset:       0;
          z-index:     2;
          pointer-events: none;
          background:  linear-gradient(
            to top,
            rgba(0,0,0,0.85) 0%,
            rgba(0,0,0,0.30) 45%,
            rgba(0,0,0,0.08) 75%,
            transparent      100%
          );
        }

        /* ── Caption ─────────────────────────────────────────────── */
        .hs__cap {
          position:   absolute;
          bottom:     90px;
          left:       60px;
          z-index:    10;
          display:    flex;
          flex-direction: column;
          gap:        12px;
          pointer-events: none;
        }
        .hs__cap-eye {
          display:      inline-block;
          font-family:  'Eurostile', 'Arial Narrow', sans-serif;
          font-weight:  700;
          font-size:    11px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color:        #f47c20;
          border:       1.5px solid rgba(244,124,32,0.50);
          background:   rgba(244,124,32,0.10);
          padding:      6px 16px;
          border-radius: 2px;
          width:        fit-content;
          animation:    capEye 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s both;
        }
        .hs__cap-hl {
          font-family:    'Eurostile', 'Arial Narrow', sans-serif;
          font-weight:    900;
          font-size:      clamp(28px, 5vw, 66px);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color:          #fff;
          margin:         0;
          line-height:    1;
          animation:      capHl 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s both;
        }
        .hs__cap-sub {
          font-family:    'Eurostile', 'Arial Narrow', sans-serif;
          font-weight:    400;
          font-size:      clamp(10px, 1.3vw, 14px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color:          rgba(255,255,255,0.60);
          margin:         0;
          animation:      capSub 0.8s ease 0.7s both;
        }
        @keyframes capEye { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes capHl  { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes capSub { from { opacity:0; }                             to { opacity:1; } }

        /* ─────────────────────────────────────────────────────────
           SOUND TOGGLE BUTTON
           • Positioned bottom-right, above progress + dot row.
           • Pill shape with glassmorphism.
           • Neutral (muted) vs orange accent (live).
           • Slide-in animation on mount / slide change.
        ───────────────────────────────────────────────────────── */
        .hs__sound {
          position:        absolute;
          bottom:          52px;
          right:           28px;
          z-index:         25;

          display:         inline-flex;
          align-items:     center;
          gap:             7px;
          padding:         0 14px 0 11px;
          height:          34px;
          border-radius:   17px;

          background:      rgba(0, 0, 0, 0.52);
          border:          1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);

          font-family:    'Eurostile', 'Arial Narrow', sans-serif;
          font-weight:    700;
          font-size:      9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color:          rgba(255, 255, 255, 0.55);

          cursor:     pointer;
          transition: background 0.22s ease, border-color 0.22s ease,
                      color 0.22s ease, transform 0.18s ease, opacity 0.18s ease;
          animation:  soundIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }
        @keyframes soundIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        .hs__sound:hover {
          background:   rgba(10, 10, 10, 0.72);
          border-color: rgba(255, 255, 255, 0.35);
          color:        #fff;
          transform:    translateY(-1px);
        }
        .hs__sound:active { transform: translateY(0) scale(0.97); }

        /* Muted state — subtle neutral glass */
        .hs__sound--muted {
          /* defaults above — intentionally understated */
        }

        /* Live (unmuted) — orange accent */
        .hs__sound--live {
          background:   rgba(244, 124, 32, 0.16);
          border-color: rgba(244, 124, 32, 0.55);
          color:        #f47c20;
        }
        .hs__sound--live:hover {
          background:   rgba(244, 124, 32, 0.30);
          border-color: #f47c20;
          color:        #fff;
        }

        .hs__sound-ico {
          display:         flex;
          align-items:     center;
          justify-content: center;
          flex-shrink:     0;
        }
        .hs__sound-lbl {
          white-space: nowrap;
          line-height: 1;
        }

        /* ── Nav arrows ──────────────────────────────────────────── */
        .hs__arrow {
          position:        absolute;
          top:             50%;
          transform:       translateY(-50%);
          z-index:         20;
          width:           46px;
          height:          46px;
          border-radius:   50%;
          border:          1.5px solid rgba(255, 255, 255, 0.22);
          background:      rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color:           rgba(255, 255, 255, 0.85);
          cursor:          pointer;
          display:         flex;
          align-items:     center;
          justify-content: center;
          padding:         0;
          transition:      background 0.2s ease, border-color 0.2s ease,
                           transform 0.2s ease, color 0.2s ease;
        }
        .hs__arrow:hover {
          background:   #f47c20;
          border-color: #f47c20;
          color:        #fff;
          transform:    translateY(-50%) scale(1.1);
        }
        .hs__arrow:active { transform: translateY(-50%) scale(0.96); }
        .hs__arrow--l { left:  24px; }
        .hs__arrow--r { right: 24px; }

        /* ── Bottom bar ──────────────────────────────────────────── */
        .hs__bar {
          position:    absolute;
          bottom:      22px;
          left:        0;
          right:       0;
          z-index:     20;
          display:     flex;
          align-items: center;
          justify-content: center;
          gap:         20px;
          pointer-events: none;
        }
        .hs__dots {
          display:     flex;
          gap:         8px;
          align-items: center;
          pointer-events: auto;
        }
        .hs__dot {
          width:         6px;
          height:        6px;
          border-radius: 6px;
          border:        none;
          background:    rgba(255, 255, 255, 0.30);
          cursor:        pointer;
          padding:       0;
          display:       flex;
          align-items:   center;
          justify-content: center;
          color:         transparent;
          transition:    width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                         background 0.35s ease;
        }
        .hs__dot:hover:not(.hs__dot--on) { background: rgba(255,255,255,0.55); }
        .hs__dot--on { width: 28px; background: #f47c20; }
        .hs__dot--vid {
          width:         14px;
          height:        14px;
          border-radius: 50%;
          border:        1.5px solid rgba(255, 255, 255, 0.45);
          background:    rgba(255, 255, 255, 0.10);
        }
        .hs__dot--vid.hs__dot--on {
          width:        14px;
          background:   #f47c20;
          border-color: #f47c20;
          color:        #fff;
        }

        /* ── Slide counter ───────────────────────────────────────── */
        .hs__count {
          font-family:  'Eurostile', monospace;
          font-size:    11px;
          letter-spacing: 0.14em;
          color:        rgba(255, 255, 255, 0.40);
          user-select:  none;
          pointer-events: auto;
        }
        .hs__count b    { color: #fff; font-weight: 700; }
        .hs__sep        { margin: 0 2px; opacity: 0.45; }

        /* ── Progress bar ────────────────────────────────────────── */
        .hs__prog {
          position: absolute;
          bottom:   0;
          left:     0;
          right:    0;
          height:   2px;
          background: rgba(255, 255, 255, 0.07);
          z-index:  20;
          overflow: hidden;
        }
        .hs__prog-fill {
          height:     100%;
          width:      0;
          background: #f47c20;
          /* Image slides: CSS animation drives the bar */
          animation:  hsProg ${INTERVAL}ms linear forwards;
        }
        /* Video slides: width driven by inline style — no CSS animation */
        .hs__prog-fill--vid {
          animation:  none;
          transition: width 0.1s linear;
        }
        @keyframes hsProg { from { width: 0%; } to { width: 100%; } }

        /* ═══════════════════════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════════════════════ */
        @media (max-width: 768px) {
          .hs         { margin-top: 70px; height: calc(100vh - 70px); min-height: 280px; }
          .hs__arrow  { width: 38px; height: 38px; }
          .hs__arrow--l { left:  12px; }
          .hs__arrow--r { right: 12px; }
          .hs__count  { display: none; }
          .hs__bar    { bottom: 16px; }
          .hs__cap    { bottom: 60px; left: 20px; right: 20px; gap: 8px; }
          .hs__cap-eye { font-size: 9px; letter-spacing: 0.22em; }
          .hs__cap-sub { letter-spacing: 0.12em; }
          /* Sound pill sits above dot bar on mobile */
          .hs__sound  { bottom: 54px; right: 16px; height: 30px; padding: 0 11px 0 9px; font-size: 8px; }
          .hs__hint   { display: none; }   /* too cluttered on mobile */
        }

        @media (max-width: 480px) {
          .hs__arrow  { display: none; }   /* swipe replaces arrows on small phones */
          /* Icon-only circle on tiny screens */
          .hs__sound-lbl  { display: none; }
          .hs__sound {
            padding:       0;
            width:         32px;
            height:        32px;
            justify-content: center;
            border-radius: 50%;
            bottom:        50px;
            right:         14px;
          }
        }

        /* Respect reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          .hs__slide--in,
          .hs__slide--out  { transition-duration: 0.01ms !important; }
          .hs__zoom--on    { animation: none !important; }
          .hs__prog-fill   { animation: none !important; }
        }
      `}</style>
    </>
  );
}