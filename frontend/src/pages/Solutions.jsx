import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";

/* ---------- Per-audience visuals ---------- */

function AdvertiserVisual() {
  // Mix dial: budget reallocation across channels
  const channels = [
    { name: "Linear",  pct: 22, c: "var(--accent)" },
    { name: "OTT",     pct: 26, c: "#5ac8fa" },
    { name: "YouTube", pct: 18, c: "#7c5cff" },
    { name: "Meta",    pct: 14, c: "#22c55e" },
    { name: "Search",  pct: 20, c: "#f59e0b" },
  ];
  let acc = 0;
  const r = 80, cx = 240, cy = 240, C = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 480 500" className="vz" role="img" aria-label="Advertiser mix">
      <defs>
        <radialGradient id="advCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--bg)" />
          <stop offset="100%" stopColor="var(--bg-alt)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r + 32} fill="var(--accent)" fillOpacity="0.06" />
      <circle cx={cx} cy={cy} r={r}      fill="url(#advCore)" stroke="var(--line)" />

      {channels.map((ch, i) => {
        const dash = (ch.pct / 100) * C;
        const offset = -((acc / 100) * C);
        acc += ch.pct;
        return (
          <g key={ch.name}>
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={ch.c}
              strokeWidth="14"
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              opacity="0.92"
            >
              <animate attributeName="stroke-dasharray" values={`0 ${C}; ${dash} ${C - dash}`} dur="1.6s" begin={`${i * 0.18}s`} fill="freeze" />
            </circle>
          </g>
        );
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--fg-muted)" letterSpacing="2">MEDIA MIX</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="20" fontWeight="600" fill="var(--fg)">100%</text>
      {/* legend */}
      {channels.map((ch, i) => (
        <g key={ch.name} transform={`translate(${50 + (i % 3) * 140} ${376 + Math.floor(i / 3) * 30})`}>
          <rect x="0" y="0" width="10" height="10" rx="2" fill={ch.c} />
          <text x="18" y="9" fontSize="12" fill="var(--fg)" fontWeight="500">{ch.name}</text>
          <text x="118" y="9" fontSize="12" fill="var(--fg-muted)" textAnchor="end">{`${ch.pct}%`}</text>
        </g>
      ))}
    </svg>
  );
}

function AgencyVisual() {
  // Plan vs proof — layered cards with sparkline
  return (
    <svg viewBox="0 0 480 500" className="vz" role="img" aria-label="Agency plan & proof">
      <defs>
        <linearGradient id="proofFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* card 1 — plan */}
      <g>
        <rect x="60" y="80" width="320" height="110" rx="16" fill="var(--bg)" stroke="var(--line-strong)" />
        <text x="80" y="108" fontSize="11" fontWeight="700" letterSpacing="2" fill="var(--fg-muted)">PLAN</text>
        <text x="80" y="138" fontSize="18" fontWeight="600" fill="var(--fg)">Q3 Media Mix</text>
        <text x="80" y="160" fontSize="12" fill="var(--fg-muted)">5 channels · 12 placements</text>
        {[0,1,2,3,4].map((i)=>(
          <rect key={i} x={250+i*22} y={108} width={14} height={66} rx={3} fill={i<3?"var(--accent)":"var(--line-strong)"} opacity={i<3?0.85:0.5}>
            <animate attributeName="height" values={`0;${66 - i*8}`} dur="1.2s" begin={`${i*0.12}s`} fill="freeze" />
          </rect>
        ))}
      </g>

      {/* card 2 — defense (slightly offset / on top) */}
      <g transform="translate(40 120)">
        <rect x="60" y="120" width="340" height="180" rx="18" fill="var(--bg)" stroke="var(--accent)" strokeOpacity="0.4" />
        <text x="80" y="148" fontSize="11" fontWeight="700" letterSpacing="2" fill="var(--accent)">PROOF</text>
        <text x="80" y="178" fontSize="18" fontWeight="600" fill="var(--fg)">Cross-media evidence</text>
        <text x="80" y="200" fontSize="12" fill="var(--fg-muted)">Deduplicated · Outcome-linked</text>
        {/* sparkline */}
        <polyline points="80,260 120,250 160,255 200,238 240,242 280,220 320,225 360,200" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round">
          <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="2.2s" fill="freeze" />
        </polyline>
        <polygon points="80,260 120,250 160,255 200,238 240,242 280,220 320,225 360,200 360,280 80,280" fill="url(#proofFill)" />
        <circle cx="360" cy="200" r="4" fill="var(--accent)">
          <animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

function BroadcasterVisual() {
  // Inventory contribution waterfall + lift markers
  const bars = [
    { label: "Reach",        v: 60, lift: false },
    { label: "Frequency",    v: 78, lift: false },
    { label: "Incremental",  v: 110, lift: true },
    { label: "Search lift",  v: 132, lift: true },
    { label: "App response", v: 96,  lift: true },
  ];
  return (
    <svg viewBox="0 0 480 500" className="vz" role="img" aria-label="Broadcaster value">
      <defs>
        <linearGradient id="bcBar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <text x="40" y="56" fontSize="11" fontWeight="700" letterSpacing="2" fill="var(--fg-muted)">INVENTORY VALUE</text>

      {/* baseline / target line */}
      <line x1="40" y1="280" x2="440" y2="280" stroke="var(--line)" strokeDasharray="4 4" />
      <text x="380" y="296" fontSize="10" fill="var(--fg-muted)">avg target</text>

      {bars.map((b, i) => {
        const x = 60 + i * 76;
        const top = 320 - b.v;
        return (
          <g key={b.label}>
            <rect x={x} y={top} width="46" height={b.v} rx="6"
                  fill={b.lift ? "url(#bcBar)" : "var(--line-strong)"}>
              <animate attributeName="height" values={`0;${b.v}`} dur="1.2s" begin={`${i*0.15}s`} fill="freeze" />
              <animate attributeName="y" values={`320;${top}`} dur="1.2s" begin={`${i*0.15}s`} fill="freeze" />
            </rect>
            {b.lift && (
              <circle cx={x + 23} cy={top - 10} r="4" fill="var(--accent)">
                <animate attributeName="opacity" values="0;1" dur="1.2s" begin={`${i*0.15}s`} fill="freeze" />
              </circle>
            )}
            <text x={x + 23} y="340" textAnchor="middle" fontSize="11" fill="var(--fg)" fontWeight="500">{b.label.split(" ")[0]}</text>
            <text x={x + 23} y="356" textAnchor="middle" fontSize="10" fill="var(--fg-muted)">{b.label.split(" ").slice(1).join(" ") || "—"}</text>
          </g>
        );
      })}

      <rect x="40" y="400" width="400" height="64" rx="12" fill="var(--bg-alt)" stroke="var(--line)" />
      <circle cx="62" cy="432" r="4" fill="var(--accent)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <text x="76" y="436" fontSize="12" fontWeight="600" fill="var(--fg)">+19% incremental contribution vs. category avg</text>
    </svg>
  );
}

/* ---------- Solutions data ---------- */

const SOLUTIONS = [
  {
    tag: "For Advertisers",
    title: "Know what your media is truly doing.",
    body: "Understand cross-screen delivery, where overlap is reducing efficiency, and which channels are actually changing demand in the market.",
    points: [
      "Measure true reach across screens",
      "Identify duplicated audiences and excess frequency",
      "See which channels add new audiences",
      "Connect exposure to search, commerce and app behaviour",
      "Improve planning and reallocation decisions",
    ],
    Visual: AdvertiserVisual,
  },
  {
    tag: "For Agencies",
    title: "Plan smarter. Defend recommendations clearer.",
    body: "Move client conversations from channel claims to cross-media evidence — with stronger post-campaign narratives and sharper optimisation logic.",
    points: [
      "Show deduplicated reach instead of platform-by-platform delivery",
      "Explain overlap and incremental reach clearly to clients",
      "Connect exposure to outcome signals clients care about",
      "Strengthen post-campaign narratives",
      "Build stronger optimisation recommendations",
    ],
    Visual: AgencyVisual,
  },
  {
    tag: "For Broadcasters",
    title: "Prove value beyond GRPs.",
    body: "Move past reach, frequency and impressions. Demonstrate incremental audience contribution and tie inventory to advertiser-relevant outcomes.",
    points: [
      "Incremental audience contribution",
      "Cross-platform overlap",
      "Search response by exposure cohort",
      "Commerce and app outcomes",
      "Renewal and upsell narratives",
    ],
    Visual: BroadcasterVisual,
  },
];

export default function Solutions() {
  return (
    <div className="page-fade" data-testid="solutions-page">
      <Seo
        title="Solutions"
        description="Cross-media measurement solutions for advertisers, agencies and broadcasters — the same honest measurement layer for every team."
        path="/solutions"
        keywords={["cross-media solutions", "advertiser measurement", "agency measurement", "broadcaster measurement"]}
      />
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Solutions</span>
            <h1>Built for every<br/>side of the table.</h1>
            <p className="lead">
              Advertisers, agencies and broadcasters need different answers. SYNC helps each team work from the same honest measurement layer.
            </p>
          </Reveal>
        </div>
      </section>

      {SOLUTIONS.map((s, i) => {
        const reverse = i % 2 === 1;
        const altBg = i % 2 === 1;
        const Visual = s.Visual;
        return (
          <section key={s.tag} className={`module ${altBg ? "tile-alt" : ""}`} data-testid={`solution-${i}`}>
            <div className={`module-grid ${reverse ? "reverse" : ""}`}>
              <Reveal>
                <div className="module-copy">
                  <span className="module-number">0{i + 1} · {s.tag}</span>
                  <h2>{s.title}</h2>
                  <p>{s.body}</p>
                  <ul className="module-list">
                    {s.points.map((p) => (
                      <li key={p}>
                        <CheckCircle2 size={18} className="module-check" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="link-arrow module-cta">
                    Talk to us <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="module-visual tilt">
                  <div className="visual-glow" aria-hidden="true" />
                  <Visual />
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="cta-band">
        <Reveal>
          <h2>Same measurement layer.<br/>Every team.</h2>
          <p>Strategy, planning, analytics and commercial — all working from the same honest picture.</p>
          <div style={{ marginTop: 30 }}>
            <Link to="/contact" className="btn btn-primary">Book a Demo <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
