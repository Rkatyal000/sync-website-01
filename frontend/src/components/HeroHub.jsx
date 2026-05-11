import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Tv, Video, Mic2, ThumbsUp, MousePointer2, Image as ImageIcon,
  Users, Award, Heart, ShoppingCart, DollarSign, BarChart3, ChevronRight, Activity, ArrowUpRight
} from "lucide-react";

/**
 * HeroHub — faithful recreation of the cross-media intelligence reference.
 * Left : Media & Exposure  — flat rows (no boxed card), icon circle + title + sub + mini chart
 * Center: Unified Audience Intelligence — dot-mesh swirl orb with 6 stat callouts + rounded-square icon
 * Right: Outcomes & Results — rounded cards with +% and mini area chart
 * Bottom: Always-on data connections | Audience Explorer | Integrated measurement
 */

/* ── tiny mini charts ── */
function MiniBar({ tone = "blue" }) {
  const heights = [8, 14, 10, 20, 13, 24, 18];
  const stroke = tone === "violet" ? "#a78bfa" : "#7bb8ff";
  const fill   = tone === "violet" ? "rgba(167,139,250,0.55)" : "rgba(123,184,255,0.55)";
  return (
    <svg viewBox="0 0 70 30" className="hh-mini" aria-hidden="true">
      {heights.map((h, i) => (
        <rect key={i} x={i * 10 + 1} y={28 - h} width="6" height={h} rx="1.2" fill={fill} stroke={stroke} strokeWidth="0.5" />
      ))}
    </svg>
  );
}
function MiniArea({ tone = "blue", points = "0,22 12,18 24,20 36,10 48,14 60,6 72,8" }) {
  const stroke = tone === "violet" ? "#a78bfa" : "#5fb0ff";
  const id = `hhg-${tone}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg viewBox="0 0 72 30" className="hh-mini" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"  stopColor={stroke} stopOpacity="0.4" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`0,30 ${points} 72,30`} fill={`url(#${id})`} stroke="none" />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MiniWave() {
  return (
    <svg viewBox="0 0 70 30" className="hh-mini" aria-hidden="true">
      {[...Array(16)].map((_, i) => {
        const h = 6 + Math.abs(Math.sin(i * 0.7 + 1)) * 18;
        return <rect key={i} x={i * 4.3 + 1.5} y={(30 - h) / 2} width="2.3" height={h} rx="1.1" fill="#a78bfa" />;
      })}
    </svg>
  );
}

const SOURCES = [
  { icon: Tv,            title: "TV",            sub: "Broadcast, Cable, CTV",      Mini: () => <MiniBar tone="blue" /> },
  { icon: Video,         title: "Digital Video", sub: "YouTube, Social, OLV",       Mini: () => <MiniArea tone="blue" /> },
  { icon: Mic2,          title: "Audio",         sub: "Streaming, Podcasts, Radio", Mini: () => <MiniWave /> },
  { icon: ThumbsUp,      title: "Social",        sub: "Meta, TikTok, X, LinkedIn",  Mini: () => <MiniBar tone="violet" /> },
  { icon: MousePointer2, title: "Web",          sub: "Web clicks, website visits", Mini: () => <MiniArea tone="blue" points="0,24 12,18 24,20 36,12 48,16 60,8 72,10" /> },
  { icon: ImageIcon,     title: "Mobile In-App", sub: "Brand search, ecom search",  Mini: () => <MiniBar tone="blue" /> },
];

const OUTCOMES = [
  { icon: ShoppingCart, title: "Conversions",   value: "+24%", sub: "Conversion Lift",        tone: "blue",   trend: "+3.2 pp", Mini: () => <MiniArea tone="blue" /> },
  { icon: Award,        title: "KPI Lift",      value: "+15%", sub: "Performance Index Lift", tone: "violet", trend: "+1.8 pp", Mini: () => <MiniArea tone="violet" /> },
  { icon: Award,        title: "Brand Lift",    value: "+18%", sub: "Ad Recall Lift",         tone: "blue",   trend: "+2.1 pp", Mini: () => <MiniArea tone="blue" /> },
  { icon: DollarSign,   title: "Sales Impact",  value: "+31%", sub: "Incremental Sales Lift", tone: "blue",   trend: "+4.8 pp", Mini: () => <MiniArea tone="blue" points="0,26 12,20 24,22 36,12 48,14 60,6 72,4" /> },
];

/* Minimal sparse dots — subtle texture only, NOT a swirl */
function OrbSparkles() {
  const dots = [];
  for (let i = 0; i < 28; i++) {
    const ang = (i / 28) * Math.PI * 2;
    const r = 150 + (i % 3) * 18;
    const x = 230 + Math.cos(ang) * r * 0.78;
    const y = 280 + Math.sin(ang) * r * 0.95;
    dots.push(<circle key={i} cx={x} cy={y} r={1.2} fill={i % 3 === 0 ? "#a78bfa" : "#5fb0ff"} opacity={0.35} />);
  }
  return <g className="hh-sparkles">{dots}</g>;
}

function CentralOrb() {
  return (
    <svg viewBox="0 0 460 580" className="hh-orb-svg" role="img" aria-label="Unified audience intelligence">
      <defs>
        <linearGradient id="orbStroke" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%"  stopColor="#0a84ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="orbGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%"  stopColor="#c9dbff" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#dcd1ff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#dcd1ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="valueGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"  stopColor="#0a84ff" />
          <stop offset="100%" stopColor="#5fb0ff" />
        </linearGradient>
      </defs>

      {/* Single clean ring — outer (sized so side labels don't collide) */}
      <ellipse cx="230" cy="280" rx="120" ry="156" fill="url(#orbGlow)"
               stroke="url(#orbStroke)" strokeWidth="1.2" opacity="0.9" />

      {/* Subtle sparkle dots — minimal texture */}
      <OrbSparkles />

      {/* Stat anchor dots on ring — placed at clean cardinal points only */}
      {[
        { x: 230, y: 124 },
        { x: 230, y: 436 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="white" stroke="#0a84ff" strokeWidth="1.3" />
          <circle cx={p.x} cy={p.y} r="1.7" fill="#0a84ff" />
        </g>
      ))}

      {/* Center rounded-square with people icon */}
      <g className="hh-core-group">
        <rect x="190" y="240" width="80" height="80" rx="18"
              fill="white" stroke="rgba(10,30,80,0.08)" strokeWidth="1" />
        <rect x="186" y="236" width="88" height="88" rx="22"
              fill="none" stroke="#0a84ff" strokeOpacity="0.16" strokeWidth="6" filter="blur(4px)" />
        <g transform="translate(230, 280)" stroke="url(#valueGrad)" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="-10" cy="-5" r="5" />
          <circle cx="10"  cy="-5" r="5" />
          <circle cx="0"   cy="-2" r="6" fill="white" stroke="url(#valueGrad)" />
          <path d="M -20 14 a 10 10 0 0 1 20 0" />
          <path d="M 0   14 a 10 10 0 0 1 20 0" />
          <path d="M -10 16 a 10 10 0 0 1 20 0" />
        </g>
      </g>

      {/* Stats — positioned symmetrically around orb center (cy=280) */}
      <g className="hh-svg-stats">
        {/* Top pair (label above value) — pair center 223 above cy */}
        <text x="230" y="42" textAnchor="middle" className="hh-svg-label">Reach</text>
        <text x="230" y="72" textAnchor="middle" className="hh-svg-value">78%</text>

        {/* Top side pair — pair center 58 above cy */}
        <text x="14"  y="208" textAnchor="start" className="hh-svg-label">Frequency</text>
        <text x="14"  y="236" textAnchor="start" className="hh-svg-value">5.3x</text>

        <text x="446" y="208" textAnchor="end"   className="hh-svg-label">Attention</text>
        <text x="446" y="236" textAnchor="end"   className="hh-svg-value">68%</text>

        {/* Bottom side pair — mirror of top side: pair center 58 below cy */}
        <text x="14"  y="324" textAnchor="start" className="hh-svg-label">Unique Audience</text>
        <text x="14"  y="352" textAnchor="start" className="hh-svg-value">42.1M</text>

        <text x="446" y="324" textAnchor="end"   className="hh-svg-label">Incremental Reach</text>
        <text x="446" y="352" textAnchor="end"   className="hh-svg-value">23%</text>

        {/* Bottom pair — mirror of top: pair center 223 below cy */}
        <text x="230" y="488" textAnchor="middle" className="hh-svg-label">Exposure Quality</text>
        <text x="230" y="518" textAnchor="middle" className="hh-svg-value hh-svg-value-accent">High</text>
      </g>
    </svg>
  );
}

/* Interactive handset price scroller (0 → 150L+) */
function HandsetRangeScroller() {
  const [pct, setPct] = useState(40);
  const trackRef = useRef(null);
  const draggingRef = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const next = Math.max(0, Math.min(100, ratio * 100));
    setPct(next);
  }, []);

  const onPointerDown = useCallback((e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  }, [setFromClientX]);

  const onPointerMove = useCallback((e) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  }, [setFromClientX]);

  const onPointerUp = useCallback((e) => {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }, []);

  const onKeyDown = useCallback((e) => {
    if (e.key === "ArrowRight") { setPct((p) => Math.min(100, p + 2)); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { setPct((p) => Math.max(0, p - 2)); e.preventDefault(); }
    else if (e.key === "Home") { setPct(0); e.preventDefault(); }
    else if (e.key === "End") { setPct(100); e.preventDefault(); }
  }, []);

  // Auto-animate gently when user not interacting (subtle motion to show it's alive)
  useEffect(() => {
    let raf;
    let dir = 1;
    const tick = () => {
      if (!draggingRef.current) {
        setPct((p) => {
          let next = p + dir * 0.18;
          if (next >= 78) { dir = -1; next = 78; }
          if (next <= 22) { dir = 1; next = 22; }
          return next;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Map pct (0..100) to handset units (Lakhs)
  const lakhs = Math.round((pct / 100) * 150);
  const ariaText = `Handsets ${lakhs}${lakhs >= 150 ? "L+" : "L"}`;

  return (
    <div className="hh-explore-row hh-explore-row-range" data-testid="hh-range-handset">
      <span className="hh-er-key">Mobile</span>
      <span className="hh-er-val">Handset type</span>
      <div className="hh-er-range">
        <div
          className="hh-er-range-track"
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          aria-valuetext={ariaText}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onKeyDown={onKeyDown}
          data-testid="hh-range-track"
        >
          <span className="hh-er-range-fill" style={{ width: `${pct}%` }} />
          <span
            className="hh-er-range-thumb"
            style={{ left: `${pct}%` }}
            data-testid="hh-range-thumb"
          />
        </div>
        <div className="hh-er-range-scale" aria-hidden="true">
          <span>0</span>
          <span>30L</span>
          <span>60L</span>
          <span>90L</span>
          <span>120L</span>
          <span>150L+</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroHub({ heroSlot = null }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  // Scale the diagram canvas to fit narrower viewports while preserving the full desktop layout
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const DESIGN_WIDTH = 1080;
    let rafId = 0;

    const apply = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const w = wrap.clientWidth;
        const s = Math.min(1, w / DESIGN_WIDTH);
        canvas.style.transform = `scale(${s})`;
        // Use the (post-scale) bounding height for the wrapper
        const h = canvas.scrollHeight * s;
        wrap.style.height = h + "px";
      });
    };

    apply();
    // Observe the parent (whose width determines layout) not the wrap itself
    // to avoid the ResizeObserver -> height change -> observe loop.
    const parent = wrap.parentElement;
    const ro = new ResizeObserver(apply);
    if (parent) ro.observe(parent);
    const onResize = () => apply();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    const t1 = setTimeout(apply, 200);
    const t2 = setTimeout(apply, 800);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="hh" data-testid="hero-hub">
      {heroSlot && <div className="hh-hero-slot">{heroSlot}</div>}

      {/* Diagram canvas — scaled as a single image on small screens (no overlap, no stacking) */}
      <div className="hh-canvas-wrap" ref={wrapRef} data-testid="hero-hub-canvas-wrap">
        <div className="hh-canvas" ref={canvasRef}>

      <div className="hh-grid">
        {/* LEFT — Media & Exposure (flat rows) */}
        <div className="hh-col hh-col-left">
          <div className="hh-col-head"><span className="hh-col-head-pulse" />Media &amp; Exposure</div>
          <ul className="hh-source-list">
            {SOURCES.map(({ icon: Icon, title, sub, Mini }) => (
              <li key={title} className="hh-source-row">
                <span className="hh-source-ico"><Icon size={18} strokeWidth={1.8} /></span>
                <div className="hh-source-meta">
                  <div className="hh-source-title">{title}</div>
                  <div className="hh-source-sub">{sub}</div>
                </div>
                <div className="hh-source-mini"><Mini /></div>
              </li>
            ))}
          </ul>
        </div>

        {/* CENTER — Unified Audience Intelligence */}
        <div className="hh-center">
          <div className="hh-col-head hh-col-head-center">
            <span className="hh-col-head-pulse hh-col-head-pulse-live" />
            Unified Audience Intelligence
          </div>
          <div className="hh-orb-wrap"><CentralOrb /></div>
        </div>

        {/* RIGHT — Outcomes & Results */}
        <div className="hh-col hh-col-right">
          <div className="hh-col-head"><span className="hh-col-head-pulse" />Outcomes &amp; Results</div>
          <ul className="hh-list">
            {OUTCOMES.map(({ icon: Icon, title, value, sub, tone, trend, Mini }) => (
              <li key={title} className={`hh-card hh-card-${tone}`}>
                <div className="hh-card-head">
                  <span className="hh-card-ico"><Icon size={14} strokeWidth={2} /></span>
                  <span className="hh-card-title">{title}</span>
                  <span className="hh-card-trend"><ArrowUpRight size={10} strokeWidth={2.4} />{trend}</span>
                </div>
                <div className="hh-card-row">
                  <div className={`hh-card-value tone-${tone}`}>{value}</div>
                  <div className="hh-card-mini"><Mini /></div>
                </div>
                <div className="hh-card-sub">{sub}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom row */}
      <div className="hh-foot-grid">
        {/* Always-on */}
        <div className="hh-foot hh-foot-l" data-testid="hh-always-on">
          <span className="hh-always-ico" aria-hidden="true">
            <span className="hh-always-dot" />
            <span className="hh-always-ring" />
            <span className="hh-always-ring hh-always-ring-2" />
          </span>
          <div className="hh-foot-meta">
            <div className="hh-foot-title">Always-on data connections <ChevronRight size={14} /></div>
            <div className="hh-foot-sub">Privacy-safe · Compliant · Scalable</div>
          </div>
        </div>

        {/* Audience Explorer */}
        <div className="hh-foot hh-foot-c" data-testid="hh-audience-explorer">
          <div className="hh-explore-head">
            <span className="hh-explore-eyebrow"><Users size={14} strokeWidth={2} /> Audience Explorer</span>
            <a href="#" className="hh-explore-link" onClick={(e)=>e.preventDefault()}>See segments <ChevronRight size={12} /></a>
          </div>
          <div className="hh-explore-avatars" aria-hidden="true">
            {[
              { seed: "Maya",   name: "Maya K." },
              { seed: "Arjun",  name: "Arjun S." },
              { seed: "Priya",  name: "Priya R." },
              { seed: "Neel",   name: "Neel M." },
              { seed: "Aisha",  name: "Aisha P." },
              { seed: "Karan",  name: "Karan V." },
            ].map(({ seed, name }, i) => (
              <img
                key={seed}
                src={`https://api.dicebear.com/7.x/personas/svg?seed=${seed}&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                alt={name}
                title={name}
                className={`hh-av hh-av-${i}`}
                loading="lazy"
                width="30"
                height="30"
              />
            ))}
            <span className="hh-av-add" role="button" tabIndex={0} aria-label="Add audience"><span>+</span></span>
            <span className="hh-av-more">+12</span>
          </div>
          <div className="hh-explore-rows">
            {[
              ["Affinity",   "Travel Enthusiasts", 56, "blue",   "28%"],
              ["Life Stage", "Young Families",     32, "violet", "16%"],
              ["Income",     "HHI Rs 100k+",       64, "blue",   "32%"],
              ["Appography", "Daily app users",    54, "violet", "27%"],
            ].map(([k, v, w, t, pct]) => (
              <div key={k} className="hh-explore-row">
                <span className="hh-er-key">{k}</span>
                <span className="hh-er-val">{v}</span>
                <div className="hh-er-track"><span className={`hh-er-fill hh-er-${t}`} style={{ width: `${w}%` }} /></div>
                <span className="hh-er-pct">{pct}</span>
              </div>
            ))}

            {/* Mobile handset price scroller — 0 → 150 Lakhs+, interactive */}
            <HandsetRangeScroller />
          </div>
        </div>

        {/* Integrated measurement */}
        <div className="hh-foot hh-foot-r" data-testid="hh-integrated">
          <span className="hh-integ-ico" aria-hidden="true">
            <BarChart3 size={18} strokeWidth={2} />
          </span>
          <div className="hh-foot-meta">
            <div className="hh-foot-title">Integrated measurement <ChevronRight size={14} /></div>
            <div className="hh-foot-sub">Cross-media · Outcomes-driven · Actionable</div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
