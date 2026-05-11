import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Eye, Target, FileCheck2 } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";

const STEPS = [
  {
    n: "01",
    title: "Single-source design",
    body: "Measurement is built around one unified audience view, not stitched-together platform reports. The same person is analysed across screens — not approximated, not modelled away.",
    Icon: Eye,
  },
  {
    n: "02",
    title: "Person-level exposure history",
    body: "Exposure across linear, OTT, YouTube, Meta and digital is resolved at the person level. Overlap, build-up and frequency become analysable with confidence.",
    Icon: Target,
  },
  {
    n: "03",
    title: "Outcome linkage",
    body: "Exposure history is connected to downstream behaviour — search, marketplace, quick-commerce and app activity — so decisions sit on evidence, not impressions.",
    Icon: FileCheck2,
  },
  {
    n: "04",
    title: "Explainable outputs",
    body: "The measurement logic is defensible to marketing, agency, broadcaster and leadership teams. If a chart can't be explained, it can't drive a decision.",
    Icon: ShieldCheck,
  },
];

const TENETS = [
  ["Privacy-conscious", "Measurement quality, governance, and trust by design."],
  ["Independent",       "No commercial bias toward any platform or seller."],
  ["Transparent",       "Methodology is reviewable end-to-end."],
  ["Decision-ready",    "Outputs land in the right format, for the right team."],
];

function MethodFlowVisual() {
  // Horizontal pipeline: capture → resolve → connect → decide
  const stages = ["Capture", "Resolve", "Connect", "Decide"];
  const xs = [80, 200, 320, 440];
  return (
    <svg viewBox="0 0 540 240" className="vz" role="img" aria-label="Measurement pipeline">
      <defs>
        <linearGradient id="rail" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"  stopColor="var(--accent)" stopOpacity="0.0" />
          <stop offset="20%" stopColor="var(--accent)" stopOpacity="0.6" />
          <stop offset="80%" stopColor="var(--accent)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
        </linearGradient>
        <radialGradient id="stageCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* horizontal rail */}
      <line x1="40" y1="120" x2="500" y2="120" stroke="url(#rail)" strokeWidth="2" />
      {/* travelling pulse */}
      <circle r="4" fill="var(--accent)">
        <animateMotion dur="4.5s" repeatCount="indefinite" path="M40 120 L 500 120" />
        <animate attributeName="opacity" values="0;1;1;0" dur="4.5s" repeatCount="indefinite" />
      </circle>

      {stages.map((s, i) => (
        <g key={s}>
          <circle cx={xs[i]} cy="120" r="22" fill="url(#stageCore)" />
          <circle cx={xs[i]} cy="120" r="22" fill="none" stroke="var(--accent)" strokeOpacity="0.5">
            <animate attributeName="r" values="22;30;22" dur="3.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <text x={xs[i]} y="125" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{`0${i + 1}`}</text>
          <text x={xs[i]} y="172" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--fg)">{s}</text>
          <text x={xs[i]} y="190" textAnchor="middle" fontSize="11" fill="var(--fg-muted)">
            {["exposure","audience","outcomes","action"][i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function Methodology() {
  return (
    <div className="page-fade" data-testid="methodology-page">
      <Seo
        title="Methodology"
        description="How SYNC measures media — single-source design, person-level exposure history, outcome linkage, and explainable outputs."
        path="/methodology"
        keywords={["measurement methodology", "single-source design", "person-level exposure", "explainable measurement"]}
      />
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Methodology</span>
            <h1>How SYNC<br/>measures media.</h1>
            <p className="lead">
              Serious media decisions need serious measurement. The framework below shows how exposure is captured, audiences are resolved, and outcomes are connected back.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="method-flow">
              <MethodFlowVisual />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="tile">
        <div className="container">
          <div className="step-grid">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <article className="step-card">
                  <div className="step-card-head">
                    <span className="step-num">{s.n}</span>
                    <span className="step-icon"><s.Icon size={20} strokeWidth={1.6} /></span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <div className="step-progress" aria-hidden="true"><span style={{ animationDelay: `${i * 0.2}s` }} /></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tile tile-alt">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 720 }}>
              <span className="eyebrow">Tenets</span>
              <h2>Four guardrails<br/>behind every output.</h2>
            </div>
          </Reveal>
          <div className="tenet-grid">
            {TENETS.map(([h, b], i) => (
              <Reveal key={h} delay={i * 80}>
                <div className="tenet-card">
                  <span className="tenet-dot" />
                  <h4>{h}</h4>
                  <p>{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <Reveal>
          <h2>Want to apply it to your mix?</h2>
          <p>A short, honest walkthrough — using your campaigns, your audiences, your outcomes.</p>
          <div style={{ marginTop: 30 }}>
            <Link to="/contact" className="btn btn-primary">Talk to the team <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
