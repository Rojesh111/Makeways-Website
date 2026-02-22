'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

/* ─── Types ──────────────────────────────────────────────────────── */
interface Caption { eyebrow: string; headline: string; sub: string; }
interface ImageSlide { type: 'image'; src: string; alt: string; fit: 'cover' | 'contain'; bg: string; raw?: boolean; }
interface VideoSlide { type: 'video'; src: string; alt: string; bg: string; caption: Caption; }
type Slide = ImageSlide | VideoSlide;

/* ─── Slides ─────────────────────────────────────────────────────── */
const SLIDES: Slide[] = [
  { type:'image', src:'/images/Hero1.jpeg',   alt:'MAKEWAYS – Data to Decision',  fit:'cover',   bg:'#0a0a0a' },
  { type:'image', src:'/images/Hero2.jpeg',   alt:'MAKEWAYS – Creative Vision',   fit:'cover',   bg:'#0a0a0a' },
  { type:'video', src:'/images/Media1.mp4',   alt:'MAKEWAYS Showreel',            bg:'#0a0a0a',
    caption:{ eyebrow:'MAKEWAYS SHOWREEL', headline:'AWARD-WINNING ADS', sub:'Most Viewed Campaigns in Nepal' } },
  { type:'video', src:'/images/Media2.mp4',   alt:'NSL League – by MAKEWAYS',     bg:'#0a0a0a',
    caption:{ eyebrow:'MAKEWAYS PRODUCTION', headline:'NSL LEAGUE', sub:'First NSL League Video by Makeways' } },
  { type:'image', src:'/images/Picture2.jpg', alt:'MAKEWAYS – Portfolio',         fit:'cover',   bg:'#0a0a0a' },
  { type:'image', src:'/images/Picture3.jpg', alt:'MAKEWAYS – Events',            fit:'cover',   bg:'#0a0a0a' },
  { type:'image', src:'/images/awards1.jpg',  alt:'MAKEWAYS – Crity Awards',      fit:'contain', bg:'#fff', raw:true },
];

const INTERVAL     = 5500;
const RENDER_RANGE = 1;

function preloadImage(src: string) {
  if (typeof window === 'undefined') return;
  const link = document.createElement('link');
  link.rel = 'preload'; link.as = 'image'; link.href = src; link.fetchPriority = 'low';
  document.head.appendChild(link);
}

export default function HeroSlider() {
  const [current,  setCurrent]  = useState(0);
  const [prev,     setPrev]     = useState<number | null>(null);
  const [busy,     setBusy]     = useState(false);
  const [ready,    setReady]    = useState(false);
  const [videoPct, setVideoPct] = useState(0);
  const [muted,    setMuted]    = useState(true);

  const preloadedRef = useRef<Set<number>>(new Set([0]));
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef       = useRef<number | null>(null);
  const readyRef     = useRef(false);
  const videoRefs    = useRef<Map<number, HTMLVideoElement>>(new Map());

  const setVideoRef = (i: number) => (el: HTMLVideoElement | null) => {
    if (el) videoRefs.current.set(i, el);
    else    videoRefs.current.delete(i);
  };

  const isVideo = SLIDES[current].type === 'video';

  const markReady = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true; setReady(true);
  }, []);

  const preloadNeighbors = useCallback((idx: number) => {
    [(idx + 1) % SLIDES.length, (idx - 1 + SLIDES.length) % SLIDES.length].forEach(i => {
      if (preloadedRef.current.has(i)) return;
      preloadedRef.current.add(i);
      const s = SLIDES[i];
      if (s.type === 'image' && !s.raw) preloadImage(s.src);
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => { const t = setTimeout(markReady, 1500); return () => clearTimeout(t); }, [markReady]);
  useEffect(() => { if (ready) preloadNeighbors(current); }, [current, ready, preloadNeighbors]);
  useEffect(() => { const t = setTimeout(() => preloadNeighbors(0), 800); return () => clearTimeout(t); }, [preloadNeighbors]);

  const goTo = useCallback((idx: number) => {
    if (busy) return;
    const next = (idx + SLIDES.length) % SLIDES.length;
    if (next === current) return;
    const vid = videoRefs.current.get(current);
    if (vid) { vid.pause(); vid.currentTime = 0; }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setBusy(true); setPrev(current); setCurrent(next); setVideoPct(0);
    setTimeout(() => { setPrev(null); setBusy(false); }, 1000);
  }, [busy, current]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isVideo) return;
    timerRef.current = setTimeout(goNext, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, goNext, isVideo]);

  useEffect(() => {
    if (!isVideo) return;
    const t = setTimeout(() => {
      const vid = videoRefs.current.get(current);
      if (!vid) return;
      vid.currentTime = 0; vid.muted = muted; vid.play().catch(() => {});
      const tick = () => {
        if (vid.duration) setVideoPct((vid.currentTime / vid.duration) * 100);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 50);
    return () => { clearTimeout(t); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isVideo, current, muted]);

  useEffect(() => {
    const vid = videoRefs.current.get(current);
    if (vid) vid.muted = muted;
  }, [muted, current]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')            goPrev();
      if (e.key === 'ArrowRight')           goNext();
      if (e.key === 'm' || e.key === 'M')   setMuted(m => !m);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const shouldRender = (i: number) => {
    if (i === current || i === prev) return true;
    const dist = Math.min(Math.abs(i - current), SLIDES.length - Math.abs(i - current));
    return dist <= RENDER_RANGE;
  };

  return (
    <>
      <section className={`hs${ready ? ' hs--ready' : ''}`} aria-label="Hero slider">
        <div className={`hs__shimmer${ready ? ' hs__shimmer--gone' : ''}`} aria-hidden="true" />

        <div className="hs__track">
          {SLIDES.map((slide, i) => {
            if (!shouldRender(i)) return null;
            const isActive = i === current;
            const isExit   = i === prev;
            return (
              <div key={i}
                className={['hs__slide', isActive?'hs__slide--in':'', isExit?'hs__slide--out':''].join(' ')}
                style={{ backgroundColor: slide.bg }}
                aria-hidden={!isActive}
              >
                {slide.type === 'image' && (
                  <div className={`hs__zoom${isActive?' hs__zoom--on':''}`}>
                    {slide.raw ? (
                      <img src={slide.src} alt={slide.alt}
                        style={{ position:'absolute', inset:0, width:'100%', height:'100%',
                          objectFit:slide.fit, objectPosition:'center', display:'block' }} />
                    ) : (
                      <Image src={slide.src} alt={slide.alt} fill
                        priority={i===0} loading={i===0?'eager':'lazy'}
                        quality={80} sizes="100vw"
                        onLoad={i===0?markReady:undefined}
                        onError={i===0?markReady:undefined}
                        style={{ objectFit:slide.fit, objectPosition:'center' }} />
                    )}
                  </div>
                )}

                {slide.type === 'video' && (
                  <>
                    <video ref={setVideoRef(i)} className="hs__video"
                      src={slide.src} muted playsInline loop={false}
                      preload="metadata" onEnded={goNext} aria-label={slide.alt} />
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

        {/* ── Nav arrows ────────────────────────────────────────── */}
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

        {/*
          ── Sound toggle ────────────────────────────────────────
          FIX: previous version had duplicate top/right/transform
          declarations in one CSS block — later values silently
          overwrote earlier ones, making the button invisible.
          Now: single unambiguous position (bottom-right corner),
          pill shape with glassmorphism, orange accent when live.
        */}
        {isVideo && (
          <button
            className={`hs__sound${muted ? ' hs__sound--muted' : ' hs__sound--live'}`}
            onClick={() => setMuted(m => !m)}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            title={muted ? 'Unmute (M)' : 'Mute (M)'}
          >
            <span className="hs__sound-ico">
              {muted ? (
                /* X over speaker */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                /* Speaker with waves */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              )}
            </span>
            <span className="hs__sound-lbl">{muted ? 'SOUND OFF' : 'SOUND ON'}</span>
          </button>
        )}

        {/* ── Bottom dot bar + counter ──────────────────────────── */}
        <div className="hs__bar">
          <div className="hs__dots" role="tablist">
            {SLIDES.map((s, i) => (
              <button key={i} role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}`}
                className={['hs__dot', i===current?'hs__dot--on':'', s.type==='video'?'hs__dot--vid':''].join(' ')}
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

        {/* ── Progress bar ──────────────────────────────────────── */}
        <div className="hs__prog" aria-hidden="true">
          {isVideo
            ? <div className="hs__prog-fill" style={{ width:`${videoPct}%`, transition:'width 0.1s linear', animation:'none' }} />
            : <div className="hs__prog-fill" key={current} />
          }
        </div>
      </section>

      <style jsx>{`
        @font-face { font-family:'Eurostile'; src:url('/fonts/FONTS/EurostileExt-Normal Regular.ttf') format('truetype'); font-weight:400; font-style:normal; font-display:swap; }
        @font-face { font-family:'Eurostile'; src:url('/fonts/FONTS/EurostileBold.ttf') format('truetype'); font-weight:700; font-style:normal; font-display:swap; }
        @font-face { font-family:'Eurostile'; src:url('/fonts/FONTS/EurostileTBold.ttf') format('truetype'); font-weight:800; font-style:normal; font-display:swap; }
        @font-face { font-family:'Eurostile'; src:url('/fonts/FONTS/EurostileExt-Bold Regular.ttf') format('truetype'); font-weight:900; font-style:normal; font-display:swap; }

        /* ── Container ───────────────────────────────────────────── */
        .hs { position:relative; width:100%; height:calc(100vh - 55px); min-height:480px; max-height:920px; overflow:hidden; background:#0a0a0a; margin-top:55px; opacity:0; }
        .hs--ready { opacity:1; transition:opacity 0.6s ease; }

        /* ── Shimmer ─────────────────────────────────────────────── */
        .hs__shimmer { position:absolute; inset:0; z-index:30; pointer-events:none; background:linear-gradient(110deg,#0f0f0f 25%,#1a1a1a 37%,#0f0f0f 63%); background-size:400% 100%; animation:shimmer 1.6s ease infinite; transition:opacity 0.5s ease; }
        .hs__shimmer--gone { opacity:0; pointer-events:none; }
        @keyframes shimmer { 0%{background-position:100% 50%} 100%{background-position:0% 50%} }

        /* ── Track / Slides ──────────────────────────────────────── */
        .hs__track { position:absolute; inset:0; }
        .hs__slide { position:absolute; inset:0; opacity:0; pointer-events:none; }
        .hs__slide--in  { opacity:1; pointer-events:auto; z-index:2; transition:opacity 0.95s cubic-bezier(0.25,0.46,0.45,0.94); }
        .hs__slide--out { opacity:0; z-index:1; transition:opacity 0.95s cubic-bezier(0.25,0.46,0.45,0.94); }

        /* ── Ken-Burns ───────────────────────────────────────────── */
        .hs__zoom { position:absolute; inset:0; will-change:transform; }
        .hs__zoom--on { animation:kenburns 6s ease-in-out infinite alternate; }
        @keyframes kenburns { 0%{transform:scale(1)} 100%{transform:scale(1.06)} }

        /* ── Video ───────────────────────────────────────────────── */
        .hs__video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; display:block; }
        .hs__vgrad { position:absolute; inset:0; z-index:2; pointer-events:none; background:linear-gradient(to top,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.22) 55%,transparent 100%); }

        /* ── Caption ─────────────────────────────────────────────── */
        .hs__cap { position:absolute; bottom:90px; left:60px; z-index:10; display:flex; flex-direction:column; gap:12px; pointer-events:none; }
        .hs__cap-eye { display:inline-block; font-family:'Eurostile','Arial Narrow',sans-serif; font-weight:700; font-size:11px; letter-spacing:0.38em; text-transform:uppercase; color:#f47c20; border:1.5px solid rgba(244,124,32,0.5); background:rgba(244,124,32,0.10); padding:6px 16px; border-radius:2px; width:fit-content; animation:capEye 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .hs__cap-hl  { font-family:'Eurostile','Arial Narrow',sans-serif; font-weight:900; font-size:clamp(28px,5vw,66px); letter-spacing:0.05em; text-transform:uppercase; color:#fff; margin:0; line-height:1; animation:capHl 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s both; }
        .hs__cap-sub { font-family:'Eurostile','Arial Narrow',sans-serif; font-weight:400; font-size:clamp(10px,1.3vw,14px); letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.60); margin:0; animation:capSub 0.8s ease 0.7s both; }
        @keyframes capEye { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes capHl  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes capSub { from{opacity:0} to{opacity:1} }

        /* ─────────────────────────────────────────────────────────
           SOUND TOGGLE — FIXED POSITIONING
           Single clean declaration, no duplicate properties.
           Pill shape, glassmorphism, bottom-right corner.
        ───────────────────────────────────────────────────────── */
        .hs__sound {
          /* Position — one block, no overrides */
          position        : absolute;
          bottom          : 48px;      /* above progress bar + dot row gap */
          right           : 28px;
          z-index         : 25;

          /* Pill shape */
          display         : inline-flex;
          align-items     : center;
          gap             : 7px;
          padding         : 0 14px 0 10px;
          height          : 34px;
          border-radius   : 17px;

          /* Glassmorphism base */
          background      : rgba(0,0,0,0.52);
          border          : 1px solid rgba(255,255,255,0.16);
          backdrop-filter : blur(14px);
          -webkit-backdrop-filter: blur(14px);

          /* Type */
          font-family     : 'Eurostile','Arial Narrow',sans-serif;
          font-weight     : 700;
          font-size       : 9px;
          letter-spacing  : 0.18em;
          text-transform  : uppercase;
          color           : rgba(255,255,255,0.55);

          cursor          : pointer;
          transition      : background 0.22s, border-color 0.22s, color 0.22s, transform 0.18s;
          animation       : soundIn 0.38s cubic-bezier(0.22,1,0.36,1) 0.4s both;
        }
        @keyframes soundIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }

        .hs__sound:hover {
          background   : rgba(10,10,10,0.72);
          border-color : rgba(255,255,255,0.32);
          color        : #fff;
          transform    : translateY(-1px);
        }

        /* Muted state — neutral glass */
        .hs__sound--muted { /* default above */ }

        /* Sound ON — orange accent */
        .hs__sound--live {
          background   : rgba(244,124,32,0.16);
          border-color : rgba(244,124,32,0.55);
          color        : #f47c20;
        }
        .hs__sound--live:hover {
          background   : rgba(244,124,32,0.28);
          border-color : #f47c20;
          color        : #fff;
        }

        .hs__sound-ico { display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .hs__sound-lbl { white-space:nowrap; line-height:1; }

        /* ── Arrows ──────────────────────────────────────────────── */
        .hs__arrow { position:absolute; top:50%; transform:translateY(-50%); z-index:20; width:46px; height:46px; border-radius:50%; border:1.5px solid rgba(255,255,255,0.28); background:rgba(0,0,0,0.22); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; padding:0; transition:background 0.22s,border-color 0.22s,transform 0.22s; }
        .hs__arrow:hover { background:#f47c20; border-color:#f47c20; transform:translateY(-50%) scale(1.1); }
        .hs__arrow--l { left:24px; }
        .hs__arrow--r { right:24px; }

        /* ── Bottom bar ──────────────────────────────────────────── */
        .hs__bar { position:absolute; bottom:28px; left:0; right:0; z-index:20; display:flex; align-items:center; justify-content:center; gap:20px; pointer-events:none; }
        .hs__dots { display:flex; gap:8px; align-items:center; pointer-events:auto; }
        .hs__dot { width:6px; height:6px; border-radius:6px; border:none; background:rgba(255,255,255,0.35); cursor:pointer; padding:0; display:flex; align-items:center; justify-content:center; color:transparent; transition:width 0.35s cubic-bezier(0.4,0,0.2,1),background 0.35s; }
        .hs__dot--on { width:26px; background:#f47c20; }
        .hs__dot--vid { width:14px; height:14px; border-radius:50%; border:1.5px solid rgba(255,255,255,0.5); background:rgba(255,255,255,0.12); }
        .hs__dot--vid.hs__dot--on { width:14px; background:#f47c20; border-color:#f47c20; color:#fff; }

        /* ── Counter ─────────────────────────────────────────────── */
        .hs__count { font-family:'Eurostile',monospace; font-size:11px; letter-spacing:0.14em; color:rgba(255,255,255,0.45); user-select:none; pointer-events:auto; }
        .hs__count b { color:#fff; font-weight:700; }
        .hs__sep { margin:0 2px; opacity:0.5; }

        /* ── Progress bar ────────────────────────────────────────── */
        .hs__prog { position:absolute; bottom:0; left:0; right:0; height:2px; background:rgba(255,255,255,0.08); z-index:20; overflow:hidden; }
        .hs__prog-fill { height:100%; width:0; background:#f47c20; animation:hsProg ${INTERVAL}ms linear forwards; }
        @keyframes hsProg { from{width:0%} to{width:100%} }

        /* ── Mobile ──────────────────────────────────────────────── */
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
          /* Sound pill moves up to clear the dot bar */
          .hs__sound { bottom:56px; right:16px; height:30px; padding:0 11px 0 9px; font-size:8px; }
        }
        @media(max-width:480px) {
          .hs__arrow { display:none; }
          /* Icon-only circle on very small screens */
          .hs__sound-lbl { display:none; }
          .hs__sound { padding:0; width:32px; height:32px; justify-content:center; border-radius:50%; bottom:52px; right:14px; }
        }
      `}</style>
    </>
  );
}