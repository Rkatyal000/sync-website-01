import React, { useEffect, useRef, useState } from "react";

/**
 * ReportingDashboard — Module 04 visual
 * Clean, data-first campaign report inspired by the reference.
 * Simplified deliberately: no hero image, no cohort tables, no clutter.
 */

const REACH = { pct: 65.6, count: "1.2M", remaining: 0.8 };
const PLATFORMS = [
  { key: "tv",     label: "Television", pct: 74.6, color: "#0a84ff" },
  { key: "yt",     label: "YouTube",    pct: 55.6, color: "#16a07a" },
  { key: "search", label: "Search",     pct: 65.6, color: "#8b5cf6" },
];
const KPIS = [
  { label: "Branded search", value: "55%",   sub: "vs. baseline" },
  { label: "App downloads",  value: "12.4K", sub: "+2.1K W/W" },
  { label: "Add to carts",   value: "54.2K", sub: "+18% W/W" },
];

/* eased count-up that respects in-view */
function useCountUp(target, active, duration = 1200, decimals = 1) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(0);
  useEffect(() => {
    if (!active) return undefined;
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const from = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(from + (target - from) * e);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration]);
  return Number(val.toFixed(decimals));
}

/* In-view trigger so animations only fire when visible */
function useInView(ref) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setSeen(true); io.disconnect(); break; }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, seen]);
  return seen;
}

/* Donut helper — single SVG, animated stroke-dashoffset */
function Donut({ pct, color = "#0a84ff", size = 100, stroke = 10, active, label, value, big = false }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const targetOffset = c - (c * pct) / 100;
  return (
    <div className={`rd-donut ${big ? "rd-donut-big" : ""}`}>
      <div className="rd-donut-svgwrap" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="color-mix(in srgb, var(--fg-muted) 20%, transparent)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={active ? targetOffset : c}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1)" }}
          />
        </svg>
        <div className="rd-donut-center">
          {value}
        </div>
      </div>
      {label && <div className="rd-donut-label">{label}</div>}
    </div>
  );
}

export default function ReportingDashboard() {
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef);

  const reachPct = useCountUp(REACH.pct, inView, 1200, 1);

  return (
    <div className="rd" ref={wrapRef} data-testid="reporting-dashboard">
      <div className="rd-backdrop" aria-hidden="true" />

      {/* Header */}
      <header className="rd-header">
        <span className="rd-eyebrow">CAMPAIGN REPORT</span>
        <h3 className="rd-title">Q4 Cross-Media</h3>
        <span className="rd-sub">Deduplicated reach · 38.2M</span>
      </header>

      {/* Main: big donut + platforms */}
      <div className="rd-main">
        <div className="rd-reach">
          <span className="rd-cap-label">REACH TARGET</span>
          <Donut
            pct={REACH.pct}
            color="#0a84ff"
            size={148}
            stroke={14}
            active={inView}
            big
            value={
              <>
                <span className="rd-reach-num">{reachPct.toFixed(1)}%</span>
                <span className="rd-reach-sub">({REACH.count})</span>
              </>
            }
          />
          <p className="rd-reach-caption">
            <b>{REACH.pct}%</b> of target reached · <b>{REACH.remaining}%</b> untapped
          </p>
        </div>

        <div className="rd-platforms">
          <span className="rd-cap-label">PLATFORM-LEVEL REACH</span>
          <div className="rd-platforms-row">
            {PLATFORMS.map((p, i) => (
              <Donut
                key={p.key}
                pct={p.pct}
                color={p.color}
                size={64}
                stroke={7}
                active={inView}
                label={p.label}
                value={<span className="rd-mini-num">{p.pct}%</span>}
              />
            ))}
          </div>
        </div>
      </div>

      {/* KPI tiles */}
      <div className="rd-kpis">
        {KPIS.map((k, i) => (
          <div key={k.label} className="rd-kpi" style={{ animationDelay: `${250 + i * 90}ms` }}>
            <span className="rd-kpi-label">{k.label}</span>
            <span className="rd-kpi-val">{k.value}</span>
            <span className="rd-kpi-sub">{k.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
