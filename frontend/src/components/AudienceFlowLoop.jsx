import React, { useEffect, useRef, useState } from "react";

/**
 * AudienceFlowLoop — Premium circular loop visualisation of the
 * 6-step "How it works" sequence for the Audience page.
 *
 * Desktop : 6 nodes arranged on a soft circle with curved SVG
 *           connectors and a travelling gradient dot that loops.
 * Mobile  : gracefully degrades to a clean vertical timeline.
 *
 * Honours prefers-reduced-motion (no spin / no traveller).
 */
export default function AudienceFlowLoop({ steps = [] }) {
  const wrapRef = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!wrapRef.current || seen) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setSeen(true); io.disconnect(); break; }
        }
      },
      { threshold: 0.2 }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [seen]);

  // Layout geometry — viewBox 600x600, ring radius 230, node radius 50
  const VB = 600;
  const cx = VB / 2;
  const cy = VB / 2;
  const ringR = 232;
  const nodeR = 52;
  const startAngle = -Math.PI / 2; // 12 o'clock

  const positions = steps.map((_, i) => {
    const a = startAngle + (i * 2 * Math.PI) / steps.length;
    return { x: cx + ringR * Math.cos(a), y: cy + ringR * Math.sin(a) };
  });

  // Build a single closed path through all nodes (with gentle inward control points)
  // so the gradient traveller animates one continuous loop.
  const loopPath = (() => {
    if (!positions.length) return "";
    const cmds = [];
    for (let i = 0; i < positions.length; i++) {
      const p0 = positions[i];
      const p1 = positions[(i + 1) % positions.length];
      // Pull control points toward the centre so each connector arcs inward
      const mx = (p0.x + p1.x) / 2;
      const my = (p0.y + p1.y) / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const pull = 0.32; // 0..1 — how strongly the curve bows inward
      const ctrlX = cx + dx * (1 - pull);
      const ctrlY = cy + dy * (1 - pull);
      if (i === 0) cmds.push(`M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)}`);
      cmds.push(`Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`);
    }
    return cmds.join(" ");
  })();

  return (
    <div className={`afl ${seen ? "is-seen" : ""}`} ref={wrapRef} data-testid="aud-flow-loop">
      {/* Mobile vertical timeline */}
      <ol className="afl-list" aria-label="Audience flow steps">
        {steps.map((s, i) => {
          const Ic = s.Icon;
          return (
            <li key={s.label} className="afl-list-item" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="afl-list-rail" aria-hidden="true" />
              <span className="afl-list-node">
                <span className="afl-list-ico"><Ic size={16} strokeWidth={1.8} /></span>
              </span>
              <span className="afl-list-meta">
                <span className="afl-list-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="afl-list-label">{s.label}</span>
                {s.sub ? <span className="afl-list-sub">{s.sub}</span> : null}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Desktop circular loop */}
      <div className="afl-stage" aria-hidden="true">
        {/* Soft radial centre glow */}
        <div className="afl-core">
          <span className="afl-core-pulse" />
          <span className="afl-core-label">SYNC</span>
          <span className="afl-core-sub">intelligence loop</span>
        </div>

        <svg viewBox={`0 0 ${VB} ${VB}`} className="afl-svg" role="img" aria-label="6 step intelligence loop">
          <defs>
            <linearGradient id="afl-stroke" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%"  stopColor="#0a84ff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#7bb8ff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="afl-ring-glow" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="rgba(10,132,255,0)" />
              <stop offset="100%" stopColor="rgba(10,132,255,0.06)" />
            </radialGradient>
            <filter id="afl-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* outer faint ring */}
          <circle cx={cx} cy={cy} r={ringR + 32} fill="url(#afl-ring-glow)" />
          <circle cx={cx} cy={cy} r={ringR + 16} fill="none" stroke="color-mix(in srgb, var(--accent) 14%, transparent)" strokeDasharray="2 6" />

          {/* the loop path itself */}
          <path d={loopPath} fill="none" stroke="url(#afl-stroke)" strokeWidth="1.6" strokeLinecap="round" />

          {/* inner faint ring */}
          <circle cx={cx} cy={cy} r={ringR - nodeR - 14} fill="none" stroke="color-mix(in srgb, var(--fg-muted) 12%, transparent)" />

          {/* travelling dot (loop) */}
          <circle r="5" fill="#0a84ff" className="afl-traveller">
            <animateMotion dur="9s" repeatCount="indefinite" path={loopPath} rotate="auto" />
            <animate attributeName="opacity" values="0.85;1;0.85" dur="2.4s" repeatCount="indefinite" />
          </circle>
          {/* trail dot, slightly delayed for premium feel */}
          <circle r="3" fill="#a78bfa" className="afl-traveller-trail" opacity="0.7">
            <animateMotion dur="9s" repeatCount="indefinite" path={loopPath} rotate="auto" begin="-0.35s" />
          </circle>
        </svg>

        {/* Nodes (HTML on top of SVG so text is crisp) */}
        {steps.map((s, i) => {
          const p = positions[i];
          const Ic = s.Icon;
          // Convert SVG coords (0..600) to % so they scale with the stage
          const left = (p.x / VB) * 100;
          const top = (p.y / VB) * 100;
          return (
            <div
              key={s.label}
              className="afl-node"
              style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${250 + i * 110}ms` }}
            >
              <span className="afl-node-glow" />
              <span className="afl-node-ico"><Ic size={18} strokeWidth={1.7} /></span>
              <span className="afl-node-meta">
                <span className="afl-node-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="afl-node-label">{s.label}</span>
                {s.sub ? <span className="afl-node-sub">{s.sub}</span> : null}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
