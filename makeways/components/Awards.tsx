"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const CRITY_DESC = "Makeways Ad Agency won 19 awards out of 24 nominations at the 12th Crity Awards the highest number of nominations and wins in the history of the awards. To top it all, we won Gold, Silver, and Bronze in the most prestigious category of the night Best Integrated Campaign. We are grateful, proud, and more motivated than ever.";
const AAN_DESC = "We are proud and humbled to be the first-ever recipients of the 'Aan Samman'an honour presented by the Advertising Association of Nepal for Creative Excellence and for setting new milestones in the advertising industry. It was a privilege to share the stage with some of the biggest names in the industry CocaCola, Ncell, CG, Dabur, JGI, NIC Asia, and more. We Makeways.";

const awards = [
  { id: 1, certificate: "/images/awards/award2.webp", name: "Crity Awards", desc: CRITY_DESC },
  { id: 2, certificate: "/images/awards/Awards 8.webp", name: "Crity Awards", desc: CRITY_DESC },
  { id: 3, certificate: "/images/awards/Awards 9.webp", name: "Crity Awards", desc: CRITY_DESC },
  { id: 4, certificate: "/images/awards/Awards_4.webp", name: "Crity Awards", desc: CRITY_DESC },
  { id: 5, certificate: "/images/awards/Awards 5.webp", name: "Crity Awards", desc: CRITY_DESC },
  { id: 6, certificate: "/images/awards/Awards 10.webp", name: "Crity Awards", desc: CRITY_DESC },
  { id: 7, certificate: "/images/awards/Awards_Critty 2.webp", name: "Crity Awards", desc: CRITY_DESC },
  { id: 8, certificate: "/images/awards/Awards_Critty3.webp", name: "Crity Awards", desc: CRITY_DESC },
  { id: 9, certificate: "/images/awards/Awards 1.webp", name: "Aan Samman", desc: AAN_DESC },
  { id: 10, certificate: "/images/awards/Awards_BRB.webp", name: "Aan Samman", desc: AAN_DESC },
  { id: 11, certificate: "/images/awards/Award_ANN.webp", name: "Aan Samman", desc: AAN_DESC },
];

const TRANS = "0.4s cubic-bezier(0.4,0,0.2,1)";

function CertPlaceholder() {
  return (
    <div className="aw-placeholder">
      <svg width="80" height="80" viewBox="0 0 72 72" fill="none" className="aw-placeholder-svg">
        <rect x="12" y="8" width="42" height="54" rx="3" stroke="#FF8C00" strokeWidth="2" />
        <rect x="18" y="6" width="42" height="54" rx="3" stroke="#FF8C00" strokeWidth="1.2" strokeDasharray="4 3" />
        <line x1="20" y1="26" x2="46" y2="26" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="34" x2="46" y2="34" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="42" x2="38" y2="42" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
        <circle cx="33" cy="17" r="5" stroke="#FF8C00" strokeWidth="1.5" />
        <path d="M30 17 L32 19 L36 15" stroke="#FF8C00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="aw-placeholder-label">Appreciation Certificate</span>
    </div>
  );
}

export default function Awards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [certFailed, setCertFailed] = useState(false);
  const fadingRef = useRef(false);

  const switchTo = useCallback((index: number) => {
    if (fadingRef.current || index === activeIndex) return;
    fadingRef.current = true;
    setFading(true);
    setCertFailed(false);
    setTimeout(() => { setActiveIndex(index); setFading(false); fadingRef.current = false; }, 380);
  }, [activeIndex]);

  const prev = useCallback(() => switchTo((activeIndex - 1 + awards.length) % awards.length), [activeIndex, switchTo]);
  const next = useCallback(() => switchTo((activeIndex + 1) % awards.length), [activeIndex, switchTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const cur = awards[activeIndex];
  const fadeStyle = {
    transition: `opacity ${TRANS}, transform ${TRANS}`,
    opacity: fading ? 0 : 1,
    transform: fading ? "translateY(6px)" : "translateY(0)",
  };

  return (
    <>
      <style>{`
        .aw-placeholder { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; background:linear-gradient(160deg,rgba(244,124,32,0.05) 0%,transparent 80%); }
        .aw-placeholder-svg { opacity:0.28; }
        .aw-placeholder-label { font-family:var(--font-condensed); font-weight:700; font-size:11px; letter-spacing:0.06em; white-space:nowrap; text-transform:uppercase; color:rgba(244,124,32,0.45); }

        .aw-root { display:flex; width:100%; overflow:hidden; height:calc(100vh - 112px); min-height:580px; }

        .aw-left { background:#FF8C00; flex:0 0 50%; height:100%; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; }
        .aw-left::after { content:''; position:absolute; top:10%; bottom:10%; right:0; width:1px; background:rgba(0,0,0,0.10); z-index:2; }
        .aw-cert-frame { position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding:40px; z-index:1; }
        .aw-cert-img { max-width:100%; max-height:100%; width:auto; height:auto; aspect-ratio:4/3; object-fit:contain; display:block; border-radius:6px; }

        .aw-arrow { position:absolute; top:50%; transform:translateY(-50%); z-index:10; width:44px; height:44px; border-radius:50%; background:rgba(0,0,0,0.12); border:1.5px solid rgba(0,0,0,0.18); color:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background 0.2s,border-color 0.2s,color 0.2s; backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); }
        .aw-arrow:hover { background:rgba(0,0,0,0.20); border-color:rgba(0,0,0,0.30); color:rgba(0,0,0,0.8); }
        .aw-arrow.left { left:18px; }
        .aw-arrow.right { right:18px; }
        .aw-arrow svg { width:18px; height:18px; stroke:currentColor; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }

        .aw-right { background:#FF8C00; flex:0 0 50%; height:100%; display:flex; flex-direction:column; justify-content:center; padding:72px 72px 56px; position:relative; overflow:hidden; }
        .aw-right::after { content:''; position:absolute; bottom:-70px; right:-70px; width:220px; height:220px; border:2px solid rgba(255,255,255,0.07); border-radius:50%; pointer-events:none; }
        .aw-right::before { content:''; position:absolute; bottom:-24px; right:-24px; width:130px; height:130px; border:2px solid rgba(255,255,255,0.07); border-radius:50%; pointer-events:none; }

        .aw-heading { font-family:var(--font-extended); font-weight:700; font-size:clamp(32px,4vw,60px); line-height:1.05; letter-spacing:0.06em; text-transform:uppercase; color:#ffffff; margin:0 0 28px; }
        .aw-award-name { font-family:var(--font-primary); font-weight:700; font-size:clamp(15px,1.5vw,22px); letter-spacing:0.06em; text-transform:uppercase; line-height:1.25; color:#000000; margin-bottom:22px; }
        .aw-desc { font-family:var(--font-primary); font-weight:400; font-size:clamp(14px,1.2vw,17px); line-height:1.75; letter-spacing:0.01em; color:rgba(255,255,255,0.92); max-width:500px; margin:0; flex:1; }
        .aw-dots { display:flex; flex-wrap:wrap; gap:8px; margin-top:48px; flex-shrink:0; z-index:1; max-width:320px; }
        .aw-dot { width:8px; height:8px; border-radius:99px; background:rgba(0,0,0,0.25); border:none; cursor:pointer; padding:0; outline:none; flex-shrink:0; transition:background 0.25s,width 0.38s cubic-bezier(0.34,1.56,0.64,1); }
        .aw-dot.active { width:26px; background:rgba(0,0,0,0.55); }
        .aw-dot:hover:not(.active) { background:rgba(0,0,0,0.4); }
        .aw-dot:focus-visible { outline:2px solid rgba(0,0,0,0.5); outline-offset:2px; }

        .aw-mob-header, .aw-mob-cert, .aw-mob-content { display:none; }

        @media (max-width:768px) {
          .aw-root { flex-direction:column; height:auto; min-height:unset; }
          .aw-left, .aw-right { display:none !important; }

          .aw-mob-header { display:block; background:#FF8C00; padding:40px 24px 32px; position:relative; overflow:hidden; }
          .aw-mob-header::after { content:''; position:absolute; top:-40px; right:-40px; width:160px; height:160px; border:2px solid rgba(255,255,255,0.07); border-radius:50%; pointer-events:none; }
          .aw-mob-heading { font-family:var(--font-extended); font-weight:700; font-size:clamp(30px,9vw,48px); line-height:1.05; letter-spacing:0.06em; text-transform:uppercase; color:#ffffff; margin:0; }

          .aw-mob-cert { display:flex; align-items:center; justify-content:center; background:#1a1a1a; width:100%; aspect-ratio:1/1; position:relative; overflow:hidden; flex-shrink:0; }
          .aw-mob-cert img { max-width:100%; max-height:100%; width:auto; height:auto; object-fit:contain; display:block; }
          .aw-mob-cert .aw-placeholder { position:absolute; inset:0; }

          .aw-mob-nav { position:absolute; inset:0; display:flex; align-items:center; justify-content:space-between; padding:0 8px; pointer-events:none; z-index:5; }
          .aw-mob-arrow { pointer-events:all; width:38px; height:38px; border-radius:50%; background:rgba(0,0,0,0.40); border:1px solid rgba(255,255,255,0.30); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background 0.2s; }
          .aw-mob-arrow:hover { background:rgba(0,0,0,0.55); }
          .aw-mob-arrow svg { width:16px; height:16px; stroke:currentColor; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }

          .aw-mob-content { display:block; background:#FF8C00; padding:28px 24px 44px; position:relative; overflow:hidden; }
          .aw-mob-content::after { content:''; position:absolute; bottom:-50px; right:-50px; width:180px; height:180px; border:2px solid rgba(255,255,255,0.07); border-radius:50%; pointer-events:none; }
          .aw-mob-award-name { font-family:var(--font-primary); font-weight:700; font-size:clamp(15px,4.5vw,20px); letter-spacing:0.06em; text-transform:uppercase; line-height:1.25; color:#000000; margin-bottom:14px; }
          .aw-mob-desc { font-family:var(--font-primary); font-weight:400; font-size:clamp(14px,3.8vw,16px); line-height:1.75; letter-spacing:0.01em; color:rgba(255,255,255,0.92); margin:0 0 28px; }
          .aw-mob-dots { display:flex; flex-wrap:wrap; gap:8px; max-width:100%; }
        }

        @media (max-width:380px) {
          .aw-mob-header { padding:32px 18px 26px; }
          .aw-mob-content { padding:22px 18px 36px; }
        }
      `}</style>

      <div className="aw-root">

        {/* DESKTOP LEFT */}
        <div className="aw-left">
          <div className="aw-cert-frame">
            {!certFailed ? (
              <img
                key={cur.certificate}
                src={cur.certificate}
                className="aw-cert-img"
                draggable="false"
                onError={() => setCertFailed(true)}
                style={{ transition: `opacity ${TRANS}, transform ${TRANS}`, opacity: fading ? 0 : 1, transform: fading ? "scale(0.96)" : "scale(1)" }}
              />
            ) : <CertPlaceholder />}
          </div>
          <button className="aw-arrow left" onClick={prev} aria-label="Previous award">
            <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button className="aw-arrow right" onClick={next} aria-label="Next award">
            <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

        {/* DESKTOP RIGHT */}
        <div className="aw-right">
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 className="aw-heading">Awards &amp;<br />Recognitions</h2>
            <div className="aw-award-name" style={fadeStyle}>{cur.name}</div>
            <p className="aw-desc" style={fadeStyle}>{cur.desc}</p>
          </div>
          <div className="aw-dots">
            {awards.map((_, i) => (
              <button key={i} className={`aw-dot${i === activeIndex ? " active" : ""}`} onClick={() => switchTo(i)} aria-label={`Award ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* MOBILE — Header */}
        <div className="aw-mob-header">
          <h2 className="aw-mob-heading">Awards &amp;<br />Recognitions</h2>
        </div>

        {/* MOBILE — Certificate */}
        <div className="aw-mob-cert">
          {!certFailed ? (
            <img key={`mob-${cur.certificate}`} src={cur.certificate} draggable="false" onError={() => setCertFailed(true)} style={{ transition: `opacity ${TRANS}`, opacity: fading ? 0 : 1 }} />
          ) : <CertPlaceholder />}
          <div className="aw-mob-nav">
            <button className="aw-mob-arrow" onClick={prev} aria-label="Previous award">
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button className="aw-mob-arrow" onClick={next} aria-label="Next award">
              <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>

        {/* MOBILE — Content */}
        <div className="aw-mob-content">
          <div className="aw-mob-award-name" style={fadeStyle}>{cur.name}</div>
          <p className="aw-mob-desc" style={fadeStyle}>{cur.desc}</p>
          <div className="aw-mob-dots">
            {awards.map((_, i) => (
              <button key={i} className={`aw-dot${i === activeIndex ? " active" : ""}`} onClick={() => switchTo(i)} aria-label={`Award ${i + 1}`} />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}