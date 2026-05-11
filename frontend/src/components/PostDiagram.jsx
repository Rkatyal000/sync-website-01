import React from "react";

/**
 * Minimal, on-brand system diagrams used as blog post covers.
 * No stock photography — all SVG, accent color only.
 * Variant is chosen deterministically from the post slug so the diagram is
 * stable across renders and unique-looking across posts.
 */

const hash = (s = "") => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

function ConvergeDiagram() {
  // Four source nodes on the left converge into a hub node, then emit one outcome line
  return (
    <svg viewBox="0 0 480 270" className="post-diagram" aria-hidden="true">
      <defs>
        <linearGradient id="pd-line-1" x1="0" x2="1">
          <stop offset="0%"  stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.75" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {[50, 100, 170, 220].map((y, i) => (
        <g key={y}>
          <circle cx="60" cy={y} r="5" fill="currentColor" />
          <path d={`M 70 ${y} C 180 ${y}, 240 135, 310 135`} fill="none" stroke="url(#pd-line-1)" strokeWidth="1.4" />
        </g>
      ))}
      <circle cx="325" cy="135" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <circle cx="325" cy="135" r="7" fill="currentColor" />
      <path d="M 342 135 L 430 135" stroke="currentColor" strokeOpacity="0.45" strokeDasharray="3 4" />
      <circle cx="430" cy="135" r="4" fill="currentColor" />
    </svg>
  );
}

function ChartDiagram() {
  // Simple reach/frequency curve + bars
  const bars = [40, 68, 92, 74, 110, 86, 124, 102];
  return (
    <svg viewBox="0 0 480 270" className="post-diagram" aria-hidden="true">
      <line x1="40" y1="220" x2="440" y2="220" stroke="currentColor" strokeOpacity="0.25" />
      <line x1="40" y1="70"  x2="40"  y2="220" stroke="currentColor" strokeOpacity="0.25" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={60 + i * 46}
          y={220 - h}
          width="26"
          height={h}
          fill="currentColor"
          opacity={0.18 + (i / bars.length) * 0.5}
          rx="2"
        />
      ))}
      <path
        d="M 60 170 C 130 90, 200 150, 270 90 S 380 120, 440 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {[60, 150, 240, 330, 420].map((x, i) => (
        <circle key={x} cx={x} cy={i % 2 ? 130 : 95} r="3" fill="currentColor" />
      ))}
    </svg>
  );
}

function OverlapDiagram() {
  // Venn-style overlap (dedup) diagram
  return (
    <svg viewBox="0 0 480 270" className="post-diagram" aria-hidden="true">
      <circle cx="185" cy="135" r="86" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.6" />
      <circle cx="295" cy="135" r="86" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.6" />
      <circle cx="240" cy="80"  r="86" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.6" />
      <circle cx="240" cy="135" r="4" fill="currentColor" />
      <text x="100" y="135" className="post-diagram-t" fill="currentColor" opacity="0.7">TV</text>
      <text x="360" y="135" className="post-diagram-t" fill="currentColor" opacity="0.7">OTT</text>
      <text x="220" y="30"  className="post-diagram-t" fill="currentColor" opacity="0.7">Digital</text>
    </svg>
  );
}

function LoopDiagram() {
  // Measurement → Decision → Outcome → Learn loop (ellipse with orbits)
  return (
    <svg viewBox="0 0 480 270" className="post-diagram" aria-hidden="true">
      <ellipse cx="240" cy="135" rx="170" ry="90" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="4 4" />
      {[
        { x: 70,  y: 135, l: "Plan" },
        { x: 240, y: 45,  l: "Buy" },
        { x: 410, y: 135, l: "Measure" },
        { x: 240, y: 225, l: "Optimise" },
      ].map((p) => (
        <g key={p.l}>
          <circle cx={p.x} cy={p.y} r="5" fill="currentColor" />
          <text x={p.x} y={p.y - 14} textAnchor="middle" className="post-diagram-t" fill="currentColor" opacity="0.8">{p.l}</text>
        </g>
      ))}
      <circle cx="240" cy="135" r="6" fill="currentColor" />
    </svg>
  );
}

function GridDiagram() {
  // Micro-flight / audience cell grid
  const active = new Set([3, 7, 12, 17, 18, 21, 26, 29, 33, 38, 44, 47]);
  const rows = 5, cols = 10, cell = 28, gap = 6;
  const w = cols * cell + (cols - 1) * gap;
  const h = rows * cell + (rows - 1) * gap;
  const ox = (480 - w) / 2;
  const oy = (270 - h) / 2;
  return (
    <svg viewBox="0 0 480 270" className="post-diagram" aria-hidden="true">
      {Array.from({ length: rows * cols }).map((_, k) => {
        const r = Math.floor(k / cols);
        const c = k % cols;
        const on = active.has(k);
        return (
          <rect
            key={k}
            x={ox + c * (cell + gap)}
            y={oy + r * (cell + gap)}
            width={cell}
            height={cell}
            rx="3"
            fill={on ? "currentColor" : "currentColor"}
            fillOpacity={on ? 0.85 : 0.15}
          />
        );
      })}
    </svg>
  );
}

const VARIANTS = [ConvergeDiagram, ChartDiagram, OverlapDiagram, LoopDiagram, GridDiagram];

export default function PostDiagram({ slug = "", tag = "" }) {
  // Choose variant by slug hash; bias by tag so similar posts feel different
  const idx = (hash(slug) + hash(tag)) % VARIANTS.length;
  const Diagram = VARIANTS[idx];
  return (
    <span className="post-diagram-wrap" aria-hidden="true">
      <Diagram />
    </span>
  );
}
