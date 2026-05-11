import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import OrbitField from "../components/OrbitField";
import MediaOptimisationCarousel from "../components/MediaOptimisationCarousel";
import ReportingDashboard from "../components/ReportingDashboard";

/* ---------- Premium SVG visuals — AI / cross-media analysis vibe ---------- */

function NetworkVisual() {
  // Audience-resolution: 5 channels → SAME audience lens
  const nodes = [
    { x: 70,  y: 90,  label: "TV" },
    { x: 70,  y: 170, label: "OTT" },
    { x: 70,  y: 250, label: "YouTube" },
    { x: 70,  y: 330, label: "Meta" },
    { x: 70,  y: 410, label: "Digital" },
  ];
  const cx = 380, cy = 250;
  return (
    <svg viewBox="0 0 480 500" className="vz" role="img" aria-label="Audience resolution network">
      <defs>
        <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nodeStroke" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* outer aura */}
      <circle cx={cx} cy={cy} r="160" fill="url(#lensGlow)">
        <animate attributeName="r" values="150;170;150" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r="110" fill="none" stroke="var(--line-strong)" strokeDasharray="2 6" />
      <circle cx={cx} cy={cy} r="78"  fill="none" stroke="var(--line)" />

      {nodes.map((n, i) => (
        <g key={n.label}>
          {/* link */}
          <path
            d={`M${n.x + 6} ${n.y} C ${n.x + 130} ${n.y}, ${cx - 120} ${cy}, ${cx} ${cy}`}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
          {/* travelling dot */}
          <circle r="3" fill="var(--accent)">
            <animateMotion
              dur={`${3 + i * 0.4}s`}
              repeatCount="indefinite"
              path={`M${n.x + 6} ${n.y} C ${n.x + 130} ${n.y}, ${cx - 120} ${cy}, ${cx} ${cy}`}
              begin={`${i * 0.4}s`}
            />
          </circle>
          {/* node label tile */}
          <rect x="20" y={n.y - 16} width="92" height="32" rx="10" fill="var(--bg)" stroke="var(--line-strong)" />
          <circle cx="36" cy={n.y} r="3.5" fill="var(--accent)">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </circle>
          <text x="50" y={n.y + 4} fontSize="12" fontWeight="500" fill="var(--fg)">{n.label}</text>
        </g>
      ))}

      {/* center lens */}
      <circle cx={cx} cy={cy} r="46" fill="var(--bg)" stroke="url(#nodeStroke)" strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r="46" fill="none" stroke="var(--accent)" strokeOpacity="0.6">
        <animate attributeName="r" values="46;52;46" dur="3s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--accent)" letterSpacing="2">SAME</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--fg)">audience</text>
    </svg>
  );
}

function FunnelVisual() {
  const outcomes = ["Search", "Marketplace", "App"];
  // SYNC core position (re-centered to left now that the exposure column is removed)
  const SX = 120;
  const SY = 250;
  const SR = 56;
  // Right card geometry — same width, vertically aligned, equal spacing
  const CARD_X = 300;
  const CARD_W = 130;
  const CARD_H = 56;
  const CARD_YS = [110, 220, 330]; // tops; centers => 138, 248, 358 (centred around SY)
  return (
    <svg viewBox="0 0 480 500" className="vz" role="img" aria-label="SYNC resolves into outcome responses">
      <defs>
        <linearGradient id="flow" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="syncCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
        </radialGradient>
      </defs>

      {/* Center SYNC core */}
      <circle cx={SX} cy={SY} r={SR} fill="var(--accent)" fillOpacity="0.10" />
      <circle cx={SX} cy={SY} r={SR} fill="none" stroke="var(--accent)" strokeOpacity="0.5">
        <animate attributeName="r" values={`${SR};${SR + 10};${SR}`} dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <circle cx={SX} cy={SY} r="28" fill="url(#syncCore)" />
      <text x={SX} y={SY - 2} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="2">SYNC</text>
      <text x={SX} y={SY + 12} textAnchor="middle" fontSize="9" fill="#fff" opacity="0.85">resolve</text>

      {/* Right outcome cards — clean curves from SYNC → each card */}
      {outcomes.map((o, i) => {
        const y = CARD_YS[i];
        const cy = y + CARD_H / 2;
        // Smooth Bezier from SYNC right edge to card left edge
        const startX = SX + SR;
        const path = `M ${startX} ${SY} C ${startX + 70} ${SY}, ${CARD_X - 60} ${cy}, ${CARD_X} ${cy}`;
        return (
          <g key={o}>
            <path d={path} fill="none" stroke="url(#flow)" strokeWidth="1.5" />
            {/* travelling dot */}
            <circle r="2.5" fill="var(--accent)">
              <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={path} begin={`${i * 0.3}s`} />
            </circle>
            {/* card */}
            <rect x={CARD_X} y={y} width={CARD_W} height={CARD_H} rx="14" fill="var(--bg)" stroke="var(--line-strong)" />
            <circle cx={CARD_X + 20} cy={cy} r="3.5" fill="var(--accent)">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <text x={CARD_X + 34} y={cy - 3} fontSize="13" fill="var(--fg)" fontWeight="500">{o}</text>
            <text x={CARD_X + 34} y={cy + 13} fontSize="10" fill="var(--fg-muted)">response</text>
          </g>
        );
      })}
    </svg>
  );
}

function AllocationVisual() {
  const data = [
    { label: "Linear",  before: 124, after:  72 },
    { label: "Digital", before: 168, after: 112 },
    { label: "OTT",     before:  72, after: 144 },
    { label: "Search",  before:  96, after: 188 },
  ];
  return (
    <svg viewBox="0 0 480 500" className="vz" role="img" aria-label="Allocation shift">
      <defs>
        <linearGradient id="optBar" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <text x="40"  y="60" fontSize="11" fontWeight="700" letterSpacing="2" fill="var(--fg-muted)">CURRENT</text>
      <text x="270" y="60" fontSize="11" fontWeight="700" letterSpacing="2" fill="var(--accent)">OPTIMISED</text>
      <line x1="240" y1="48" x2="270" y2="48" stroke="var(--line-strong)" />
      <polygon points="270,44 280,48 270,52" fill="var(--accent)" />

      {data.map((d, i) => {
        const y = 110 + i * 86;
        return (
          <g key={d.label}>
            <text x="40" y={y - 8} fontSize="12" fill="var(--fg-muted)" fontWeight="500">{d.label}</text>

            {/* Current bar */}
            <rect x="40"  y={y} width="200" height="14" rx="7" fill="var(--bg-alt)" />
            <rect x="40"  y={y} width={d.before} height="14" rx="7" fill="var(--fg)" opacity="0.45" />

            {/* Optimised bar */}
            <rect x="270" y={y} width="180" height="14" rx="7" fill="var(--bg-alt)" />
            <rect x="270" y={y} height="14" rx="7" fill="url(#optBar)">
              <animate attributeName="width" values={`0;${d.after}`} dur="1.4s" begin={`${i * 0.15}s`} fill="freeze" />
            </rect>
            {/* highlight tip */}
            <circle cx={270 + d.after} cy={y + 7} r="3" fill="var(--accent)">
              <animate attributeName="cx" values={`270;${270 + d.after}`} dur="1.4s" begin={`${i * 0.15}s`} fill="freeze" />
              <animate attributeName="opacity" values="0;1" dur="1.4s" begin={`${i * 0.15}s`} fill="freeze" />
            </circle>
          </g>
        );
      })}

      <line x1="40" y1="450" x2="440" y2="450" stroke="var(--line)" />
      <text x="40" y="472" fontSize="11" fill="var(--fg-muted)">Reallocation modeled on incremental contribution.</text>
    </svg>
  );
}

function ReportVisual() {
  // Animated chart + decision layer
  const points = "60,260 95,240 130,250 165,210 200,220 235,180 270,190 300,150";
  return (
    <svg viewBox="0 0 480 500" className="vz" role="img" aria-label="Reporting cards">
      <defs>
        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.30" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* main card */}
      <rect x="40" y="60" width="280" height="240" rx="18" fill="var(--bg)" stroke="var(--line-strong)" />
      <text x="60" y="92"  fontSize="11" fontWeight="700" letterSpacing="2" fill="var(--accent)">CAMPAIGN</text>
      <text x="60" y="120" fontSize="20" fontWeight="600" fill="var(--fg)">Q4 Cross-Media</text>
      <text x="60" y="142" fontSize="12" fill="var(--fg-muted)">Deduplicated reach · 38.2M</text>

      {/* chart axis */}
      <line x1="60" y1="270" x2="300" y2="270" stroke="var(--line)" />
      {/* area fill */}
      <polygon points={`${points} 300,270 60,270`} fill="url(#chartFill)" />
      {/* line */}
      <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="2.4s" fill="freeze" />
      </polyline>
      {/* end pulse */}
      <circle cx="300" cy="150" r="4" fill="var(--accent)">
        <animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite" />
      </circle>

      {/* small card 1 */}
      <rect x="340" y="60"  width="100" height="110" rx="14" fill="var(--bg)" stroke="var(--line-strong)" />
      <text x="356" y="92"  fontSize="10" fontWeight="700" fill="var(--fg-muted)" letterSpacing="1.5">INCREMENTAL</text>
      <text x="356" y="124" fontSize="22" fontWeight="600" fill="var(--fg)">+19%</text>
      <polyline points="356,150 372,142 388,148 404,134 420,138" fill="none" stroke="var(--accent)" strokeWidth="2" />

      {/* small card 2 */}
      <rect x="340" y="190" width="100" height="110" rx="14" fill="var(--bg)" stroke="var(--line-strong)" />
      <text x="356" y="222" fontSize="10" fontWeight="700" fill="var(--fg-muted)" letterSpacing="1.5">FREQUENCY</text>
      <text x="356" y="254" fontSize="22" fontWeight="600" fill="var(--accent)">−38%</text>
      <polyline points="356,280 372,278 388,272 404,268 420,260" fill="none" stroke="var(--accent)" strokeWidth="2" />

      {/* decision layer footer */}
      <rect x="40" y="320" width="400" height="120" rx="14" fill="var(--bg-alt)" stroke="var(--line)" />
      <circle cx="62" cy="346" r="4" fill="var(--accent)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <text x="76" y="350" fontSize="11" fontWeight="700" fill="var(--fg-muted)" letterSpacing="2">DECISION LAYER · LIVE</text>
      <text x="60" y="384" fontSize="14" fill="var(--fg)">Reallocate 12% from Linear → Search · OTT</text>
      <text x="60" y="406" fontSize="12" fill="var(--fg-muted)">Estimated outcome lift: +6.4%</text>
      <rect x="60" y="418" width="220" height="6" rx="3" fill="var(--bg)" />
      <rect x="60" y="418" height="6" rx="3" fill="var(--accent)">
        <animate attributeName="width" values="0;220" dur="2.8s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

/* ---------- Module data ---------- */

const MODULES = [
  {
    n: "01", tag: "Measurement",
    title: "Cross-media measurement",
    body: "Resolve exposure across linear TV, OTT, YouTube, Meta and digital into one unified audience view. Understand reach, overlap, and incremental contribution with real evidence.",
    features: ["Deduplicated reach & frequency", "Incremental audience by channel", "Exposure distribution", "Overlap analytics"],
    Visual: NetworkVisual,
  },
  {
    n: "02", tag: "Outcomes",
    title: "Outcomes measurement",
    body: "Connect exposure to real-world behaviour: search, marketplace, quick-commerce and app usage — plus custom KPIs tailored to your business.",
    features: ["Search lift modelling", "Marketplace demand signals", "Quick-commerce attribution", "App engagement cohorts"],
    Visual: FunnelVisual,
  },
  {
    n: "03", tag: "Optimisation",
    title: "Media optimisation",
    body: "Reallocate with confidence. Identify overlap, eliminate frequency waste, and optimise under-performing inventory with predictive modelling.",
    features: ["Allocation scenarios", "Frequency management", "Overlap reduction", "Response-weighted planning"],
    Visual: MediaOptimisationCarousel,
  },
  {
    n: "04", tag: "Reporting",
    title: "Reporting & diagnostics",
    body: "Explainable outputs designed for strategy, commercial, and analytics teams — not just dashboards.",
    features: ["Stakeholder-ready reports", "Post-campaign diagnostics", "Transparent methodology", "Decision-layer exports"],
    Visual: ReportingDashboard,
  },
];

export default function Products() {
  return (
    <div className="page-fade" data-testid="products-page">
      <Seo
        title="The Platform"
        description="Four modules — measurement, outcomes, optimisation, and reporting — built on a single-source cross-media intelligence layer."
        path="/products"
        keywords={["cross-media measurement platform", "outcomes measurement", "media optimisation", "reporting"]}
      />
      <section className="page-hero">
        <OrbitField density="default" tone="blue" />
        <div className="container">
          <Reveal>
            <span className="eyebrow">The Platform</span>
            <h1>Four modules.<br/><span className="grad-accent">One measurement truth</span></h1>
            <p className="lead">
              Exposure, audiences and outcomes — together in one decision layer, built for the teams who decide where money moves.
            </p>
          </Reveal>
        </div>
      </section>

      {MODULES.map((m, i) => {
        const reverse = i % 2 === 1;
        const altBg = i % 2 === 1;
        const Visual = m.Visual;
        return (
          <section key={m.n} className={`module ${altBg ? "tile-alt" : ""}`} data-testid={`module-${m.n}`}>
            <div className={`module-grid ${reverse ? "reverse" : ""}`}>
              <Reveal>
                <div className="module-copy">
                  <span className="module-number">{m.n} · {m.tag}</span>
                  <h2>{m.title}</h2>
                  <p>{m.body}</p>
                  <ul className="module-list">
                    {m.features.map((f) => (
                      <li key={f}>
                        <CheckCircle2 size={18} className="module-check" /> <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="link-arrow module-cta" data-testid={`module-cta-${m.n}`}>
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
          <h2>See it on your plan.</h2>
          <p>A walkthrough with your campaigns, your mix, your outcomes.</p>
          <div style={{ marginTop: 34 }}>
            <Link to="/contact" className="btn btn-primary">Book a Demo</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
