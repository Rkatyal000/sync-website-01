import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  Activity,
  Sparkles,
  Layers,
  RefreshCw,
  Search,
  ShoppingCart,
  Smartphone,
  Clock,
  Repeat,
  Target,
  Compass,
  Tv,
  PlayCircle,
  Youtube,
} from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import AudienceFlowLoop from "../components/AudienceFlowLoop";

/**
 * Audience — verbatim copy from "SYNC Audience Page.docx" with subtle
 * premium visual richness: animated cross-screen flow, icon cards,
 * propensity bars and micro-flight grid.
 */

const APPROACH_CARDS = [
  {
    icon: Eye,
    n: "01",
    title: "Real Exposure Signals",
    body: "SYNC captures real campaign exposure across screens and platforms, creating a single-source view of how audiences encounter media.",
  },
  {
    icon: Activity,
    n: "02",
    title: "Outcome Behaviour",
    body: "Exposure is connected to actions such as brand search, commerce search, app activity and add-to-cart events.",
  },
  {
    icon: Sparkles,
    n: "03",
    title: "Propensity Modelling",
    body: "SYNC identifies which audience, platform, screen, time and frequency conditions are more likely to create response.",
  },
  {
    icon: Layers,
    n: "04",
    title: "Micro-Flight Activation",
    body: "Campaigns are broken into smaller media cells so budgets can move toward the audience conditions that perform better.",
  },
  {
    icon: RefreshCw,
    n: "05",
    title: "Continuous Learning",
    body: "Every campaign improves the model by feeding performance learnings back into future planning and optimisation.",
  },
];

const QUESTIONS = [
  { icon: Search,      text: "Which audience groups are more likely to search after exposure?" },
  { icon: Tv,          text: "Which platform and screen combinations create stronger response?" },
  { icon: Clock,       text: "Which dayparts perform better for each audience type?" },
  { icon: Repeat,      text: "Where is frequency helping, and where is it becoming waste?" },
  { icon: Target,      text: "Which exposed cohorts perform better than similar unexposed cohorts?" },
];

const FLOW = [
  { label: "Exposure",      sub: "Cross-screen capture",  Icon: Eye },
  { label: "Behaviour",     sub: "Post-exposure actions", Icon: Activity },
  { label: "Propensity",    sub: "Who responds next",     Icon: Sparkles },
  { label: "Micro-Flights", sub: "Budget moves to lift",  Icon: Layers },
  { label: "Activation",    sub: "In-flight deployment",  Icon: PlayCircle },
  { label: "Learning Loop", sub: "Every run sharpens",    Icon: RefreshCw },
];

const FLOW_STATS = [
  { value: "6",   label: "Connected stages" },
  { value: "24h", label: "Signal refresh cadence" },
  { value: "∞",   label: "Compounding learning" },
];

/* Hero illustration: floating screen sources funnelling into "audience model" */
function HeroFlow() {
  const sources = [
    { x: 150, y: 40,  label: "TV",      Icon: Tv },
    { x: 150, y: 100, label: "OTT",     Icon: PlayCircle },
    { x: 150, y: 160, label: "YouTube", Icon: Youtube },
    { x: 150, y: 220, label: "Mobile",  Icon: Smartphone },
  ];
  return (
    <svg className="aud-hero-svg" viewBox="0 0 880 270" aria-hidden="true">
      <defs>
        <linearGradient id="audLine" x1="0" x2="1">
          <stop offset="0%"   stopColor="#0066cc" stopOpacity="0" />
          <stop offset="50%"  stopColor="#0066cc" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0066cc" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="audHubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#0066cc" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0066cc" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hub glow */}
      <circle cx="600" cy="135" r="90" fill="url(#audHubGlow)" />

      {/* Source nodes & labels */}
      {sources.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r="6" fill="#0066cc" />
          <circle cx={s.x} cy={s.y} r="10" fill="none" stroke="#0066cc" strokeOpacity="0.25" />
          <text x={s.x - 18} y={s.y + 4} textAnchor="end" className="aud-hero-svg-label">
            {s.label}
          </text>
        </g>
      ))}

      {/* Convergence curves */}
      {sources.map((s, i) => (
        <path
          key={`p-${i}`}
          d={`M ${s.x + 8} ${s.y} C 320 ${s.y}, 440 135, 590 135`}
          fill="none"
          stroke="url(#audLine)"
          strokeWidth="1.4"
          className="aud-hero-svg-path"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}

      {/* Travelling particles along each path */}
      {sources.map((s, i) => (
        <circle key={`d-${i}`} r="3" fill="#0066cc" className="aud-hero-svg-dot">
          <animateMotion
            dur="3.6s"
            repeatCount="indefinite"
            begin={`${i * 0.45}s`}
            path={`M ${s.x + 8} ${s.y} C 320 ${s.y}, 440 135, 590 135`}
          />
        </circle>
      ))}

      {/* Central node — concentric rings */}
      <circle cx="600" cy="135" r="26" fill="none" stroke="#0066cc" strokeOpacity="0.18" />
      <circle cx="600" cy="135" r="18" fill="none" stroke="#0066cc" strokeWidth="1.5" className="aud-hero-svg-pulse" />
      <circle cx="600" cy="135" r="8"  fill="#0066cc" />

      {/* Hub label (above so it never overlaps the outcome line) */}
      <text x="600" y="100" textAnchor="middle" className="aud-hero-svg-label-strong">Audience model</text>
      <text x="600" y="172" textAnchor="middle" className="aud-hero-svg-label">propensity · micro-flights · learning</text>

      {/* Outcome line + endpoint */}
      <path d="M 626 135 L 800 135" stroke="#0066cc" strokeOpacity="0.5" strokeDasharray="4 5" className="aud-hero-svg-outcome" />
      <circle cx="800" cy="135" r="4" fill="#0066cc" />
      <text x="800" y="118" textAnchor="middle" className="aud-hero-svg-label">Outcomes</text>
    </svg>
  );
}

/* Propensity visualization — animated bars + a small response cohort */
function PropensityViz() {
  const data = [
    { label: "Mobile · Afternoon",    pct: 78 },
    { label: "YouTube · Evening",     pct: 64 },
    { label: "CTV · Primetime",       pct: 52 },
    { label: "Linear TV · Late",      pct: 31 },
    { label: "Mobile · Late night",   pct: 22 },
  ];
  return (
    <div className="aud-propensity" data-testid="aud-propensity-viz">
      <div className="aud-propensity-head">
        <span className="eyebrow">Propensity sample</span>
        <span className="aud-propensity-meta">Higher → stronger response</span>
      </div>
      <ul className="aud-propensity-bars">
        {data.map((d, i) => (
          <li key={d.label} style={{ animationDelay: `${0.08 * i}s` }}>
            <span className="aud-propensity-label">{d.label}</span>
            <span className="aud-propensity-track">
              <span
                className="aud-propensity-fill"
                style={{ "--pct": `${d.pct}%`, animationDelay: `${0.12 * i + 0.2}s` }}
              />
            </span>
            <span className="aud-propensity-value">{d.pct}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Micro-flight grid — small cells representing media cells, accent ones light up */
/* Micro-Flight cells — labeled media cells with audience, platform, daypart and propensity */
function MicroFlightGrid() {
  const cells = [
    {
      audience: "Young Families",
      platform: "YouTube · Mobile",
      daypart: "Evening · 8–11pm",
      Icon: Youtube,
      pct: 86,
      delta: "+18%",
      status: "scaling",
      tone: "blue",
    },
    {
      audience: "Travel Enthusiasts",
      platform: "CTV · OTT",
      daypart: "Primetime · 9–11pm",
      Icon: PlayCircle,
      pct: 72,
      delta: "+9%",
      status: "scaling",
      tone: "blue",
    },
    {
      audience: "HHI 100k+",
      platform: "Mobile In-App",
      daypart: "Afternoon · 2–5pm",
      Icon: Smartphone,
      pct: 64,
      delta: "+4%",
      status: "active",
      tone: "blue",
    },
    {
      audience: "Daily App Users",
      platform: "Mobile Display",
      daypart: "Late Night · 11pm–1am",
      Icon: Smartphone,
      pct: 38,
      delta: "−6%",
      status: "optimising",
      tone: "amber",
    },
    {
      audience: "Broad Reach",
      platform: "Linear TV",
      daypart: "Late · 11pm+",
      Icon: Tv,
      pct: 21,
      delta: "−14%",
      status: "pruning",
      tone: "muted",
    },
  ];

  return (
    <div className="aud-mfcards" data-testid="aud-microflight-grid">
      <div className="aud-mfcards-head">
        <span className="eyebrow">Micro-flight cells</span>
        <span className="aud-mfcards-meta">
          <span className="aud-mfcards-live" /> Live · 24h refresh
        </span>
      </div>

      <ul className="aud-mfcards-list">
        {cells.map((c, i) => {
          const Ic = c.Icon;
          return (
            <li
              key={c.audience}
              className={`aud-mfcard tone-${c.tone}`}
              style={{ animationDelay: `${0.08 * i}s` }}
              data-testid={`aud-mfcard-${i}`}
            >
              <span className="aud-mfcard-ico"><Ic size={18} strokeWidth={1.7} /></span>
              <div className="aud-mfcard-meta">
                <div className="aud-mfcard-aud">{c.audience}</div>
                <div className="aud-mfcard-ctx">
                  <span>{c.platform}</span>
                  <span className="aud-mfcard-dot" aria-hidden="true" />
                  <span>{c.daypart}</span>
                </div>
                <div className="aud-mfcard-track">
                  <span
                    className="aud-mfcard-fill"
                    style={{ "--pct": `${c.pct}%`, animationDelay: `${0.12 * i + 0.2}s` }}
                  />
                </div>
              </div>
              <div className="aud-mfcard-right">
                <span className="aud-mfcard-pct">{c.pct}<span className="aud-mfcard-pct-sm">%</span></span>
                <span className={`aud-mfcard-status status-${c.status}`}>
                  {c.status === "scaling" && <span className="aud-mfcard-up">▲</span>}
                  {c.status === "pruning" && <span className="aud-mfcard-down">▼</span>}
                  {c.status === "scaling" ? "Scaling" : c.status === "active" ? "Active" : c.status === "optimising" ? "Optimising" : "Pruning"}
                </span>
                <span className={`aud-mfcard-delta delta-${c.tone}`}>{c.delta}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="aud-mfcards-foot">
        <span className="aud-mfcards-legend"><span className="aud-mfcards-leg-dot tone-blue" /> Scaling</span>
        <span className="aud-mfcards-legend"><span className="aud-mfcards-leg-dot tone-amber" /> Optimising</span>
        <span className="aud-mfcards-legend"><span className="aud-mfcards-leg-dot tone-muted" /> Pruning</span>
      </div>
    </div>
  );
}

/* Closed-loop visual for "Built to Learn From Every Campaign" */
function LearningLoop() {
  return (
    <svg className="aud-loop" viewBox="0 0 320 200" aria-hidden="true">
      <defs>
        <linearGradient id="loopLine" x1="0" x2="1">
          <stop offset="0%"   stopColor="#0066cc" stopOpacity="0.2" />
          <stop offset="50%"  stopColor="#0066cc" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0066cc" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="100" rx="120" ry="64" fill="none" stroke="url(#loopLine)" strokeWidth="1.4" strokeDasharray="4 4" className="aud-loop-ellipse" />
      <circle r="5" fill="#0066cc" className="aud-loop-orbit">
        <animateMotion dur="6s" repeatCount="indefinite" path="M 160 36 a 120 64 0 1 1 -0.001 0" />
      </circle>
      {[
        { x: 40, y: 100,  l: "Plan" },
        { x: 160, y: 36,  l: "Buy" },
        { x: 280, y: 100, l: "Measure" },
        { x: 160, y: 164, l: "Optimise" },
      ].map((p) => (
        <g key={p.l}>
          <circle cx={p.x} cy={p.y} r="4" fill="#0066cc" />
          <text x={p.x} y={p.y - 12} textAnchor="middle" className="aud-loop-label">{p.l}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Audience() {
  return (
    <div className="page-fade audience-page" data-testid="audience-page">
      <Seo
        title="Audience Intelligence for Cross-Media Measurement"
        description="SYNC builds outcome-ready audiences from real cross-media exposure and consumer behaviour across TV, OTT, CTV, YouTube, mobile and commerce journeys."
        path="/audience"
        keywords={[
          "cross-media audience intelligence",
          "audience measurement",
          "cross-media audience planning",
          "outcome-based audience targeting",
          "media activation",
          "propensity modelling",
          "single-source panel",
          "incremental reach",
          "campaign optimisation",
        ]}
      />

      {/* HERO — framed card (matches homepage hero pattern) */}
      <section className="hero-unified" data-testid="audience-hero-section">
        <div className="hu-aurora" aria-hidden="true">
          <span className="hu-aurora-a" />
          <span className="hu-aurora-b" />
          <span className="hu-aurora-grid" />
        </div>
        <div className="container">
          <div className="hh audience-hh">
            <div className="hh-hero-slot">
              <Reveal>
                <span className="hero-eyebrow-pill" data-testid="audience-hero-eyebrow">
                  <span className="hero-eyebrow-dot" />
                  Audience
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h1 data-testid="audience-hero-title" className="hero-simple-title audience-hero-simple-title">
                  Audiences should not be guessed<br />
                  They should be <span className="hero-title-grad">observed, understood, and activated</span> with evidence
                </h1>
              </Reveal>
              <Reveal delay={220}>
                <p className="hero-simple-body audience-hero-simple-body">
                  SYNC builds audience intelligence from real cross-media exposure and real consumer actions. Our first-party single-source panel captures how people are exposed to campaigns across TV, OTT, CTV, YouTube, mobile and commerce journeys. These exposure signals are connected with downstream behaviour such as brand search, commerce search, app activity and add-to-cart events. This allows SYNC to move beyond broad demographic targeting and build calibrated audience models that show which people, platforms, screens, contexts, dayparts and frequency levels are more likely to create business outcomes.
                </p>
              </Reveal>
              <Reveal delay={340}>
                <div className="hero-simple-cta">
                  <Link to="/contact" className="btn btn-primary" data-testid="audience-primary-cta">
                    Turn exposure into audience intelligence <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={420}>
                <div className="hero-mini-stats audience-hero-mini-stats" data-testid="audience-hero-stats" aria-label="Audience platform highlights">
                  <div className="hms-cell"><span className="hms-num">1.2M</span><span className="hms-lbl">panel</span></div>
                  <span className="hms-sep" />
                  <div className="hms-cell"><span className="hms-num">10+</span><span className="hms-lbl">outcome signals</span></div>
                  <span className="hms-sep" />
                  <div className="hms-cell"><span className="hms-num">24h</span><span className="hms-lbl">refresh</span></div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={520}>
              <div className="about-hero-diagram-wrap" data-testid="audience-hero-diagram">
                <HeroFlow />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SYSTEM FLOW */}
      <section className="tile aud-flow-section">
        <div className="aud-flow-aurora" aria-hidden="true">
          <span className="aud-flow-aurora-a" />
          <span className="aud-flow-aurora-b" />
          <span className="aud-flow-aurora-grid" />
        </div>
        <div className="container aud-flow-container">
          <Reveal>
            <div className="aud-flow-head">
              <span className="eyebrow">How it works</span>
              <h2 className="aud-flow-title">From exposure to activation — one continuous loop.</h2>
              <p className="aud-flow-sub">Six connected stages that turn every campaign into sharper intelligence for the next one.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <AudienceFlowLoop steps={FLOW} />
          </Reveal>
          <Reveal delay={220}>
            <div className="aud-flow-stats" data-testid="aud-flow-stats">
              {FLOW_STATS.map((s) => (
                <div className="aud-flow-stat" key={s.label}>
                  <div className="aud-flow-stat-value">{s.value}</div>
                  <div className="aud-flow-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SHIFT — Demographic to Behaviour-led */}
      <section className="tile tile-alt">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 880 }}>
              <span className="eyebrow">The shift</span>
              <h2>From Demographic Targeting to Behaviour-Led Audiences</h2>
              <p style={{ marginTop: 22 }}>
                Most media plans still begin with broad audience definitions: age, gender, geography, income group or consumer segment. These are useful starting points. But they do not answer the more important question: which exposure actually creates response?
              </p>
              <p style={{ marginTop: 14 }}>
                SYNC goes deeper. We study how real people behave after media exposure. Did they search for the brand? Did they visit a commerce platform? Did they open an app? Did they add a product to cart? Did the response improve when the exposure happened on a specific screen, platform, content context or time of day?
              </p>
              <p style={{ marginTop: 14 }}>
                This helps brands understand not just who they reached, but which audience conditions created measurable business response.
              </p>
            </div>
          </Reveal>
          <div className="aud-shift" style={{ marginTop: 40 }}>
            <Reveal delay={120}>
              <div className="aud-shift-pair">
                <span className="aud-shift-side aud-shift-side--from">
                  <span className="eyebrow">From</span>
                  <h3>Broad demographics</h3>
                  <ul>
                    <li>Age &middot; Gender</li>
                    <li>Geo &middot; Income</li>
                    <li>Generic segments</li>
                  </ul>
                </span>
                <span className="aud-shift-arrow" aria-hidden="true">
                  <ArrowRight size={22} strokeWidth={1.6} />
                </span>
                <span className="aud-shift-side aud-shift-side--to">
                  <span className="eyebrow eyebrow--accent">To</span>
                  <h3>Behaviour-led audiences</h3>
                  <ul>
                    <li>Search after exposure</li>
                    <li>Commerce intent</li>
                    <li>App engagement</li>
                    <li>Add-to-cart actions</li>
                  </ul>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* APPROACH CARDS */}
      <section className="tile">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 820 }}>
              <span className="eyebrow">Approach</span>
              <h2>How SYNC Builds Outcome-Ready Audiences</h2>
            </div>
          </Reveal>
          <div className="diff-grid about-cards" style={{ marginTop: 36 }}>
            {APPROACH_CARDS.map((c, i) => {
              const Ic = c.icon;
              return (
                <Reveal key={c.title} delay={(i % 3) * 90}>
                  <article className="diff-card about-card about-card--feature">
                    <span className="about-card-step">{c.n}</span>
                    <span className="about-card-icon about-card-icon--lg"><Ic size={24} strokeWidth={1.6} /></span>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                    <span className="about-card-rule" aria-hidden="true" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROPENSITY LAYER */}
      <section className="tile tile-alt">
        <div className="container aud-split">
          <Reveal>
            <div className="aud-split-text">
              <span className="eyebrow">Layer 1</span>
              <h2>Outcome Propensity Layer</h2>
              <p style={{ marginTop: 22 }}>
                Outcome propensity means the likelihood that a specific audience, exposed in a specific media condition, will take a desired action. SYNC studies exposure and behaviour together to identify where response is stronger or weaker than the campaign baseline.
              </p>
              <p style={{ marginTop: 14 }}>
                For example, one audience group may respond better to mobile video in the afternoon. Another may respond better to YouTube in the evening. Some may need repeated exposure before they act, while others may show quick search or commerce intent after fewer exposures.
              </p>
              <p style={{ marginTop: 14 }}>
                SYNC turns these behavioural patterns into audience intelligence that can guide planning, buying and optimisation. This layer helps brands answer:
              </p>
              <ul className="aud-questions" style={{ marginTop: 18 }}>
                {QUESTIONS.map((q) => {
                  const Ic = q.icon;
                  return (
                    <li key={q.text}>
                      <span className="aud-questions-icon"><Ic size={16} strokeWidth={1.7} /></span>
                      <span>{q.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="aud-split-viz">
              <PropensityViz />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MICRO-FLIGHT LAYER */}
      <section className="tile">
        <div className="container aud-split aud-split--rev">
          <Reveal>
            <div className="aud-split-text">
              <span className="eyebrow">Layer 2</span>
              <h2>Micro-Flight Planning Layer</h2>
              <p style={{ marginTop: 22 }}>
                A micro-flight is a smaller media cell built around a specific audience, platform, screen, context, time and frequency condition. Instead of treating a campaign as one large media buy, SYNC breaks it into smaller exposure cells. Each cell can be evaluated based on its likelihood to drive search, commerce action, add-to-cart behaviour or incremental reach.
              </p>
              <p style={{ marginTop: 14 }}>
                This allows budgets to move toward the audience conditions that are more likely to produce outcomes, and away from cells where reach is duplicated, frequency is saturated or response is weak.
              </p>
              <p style={{ marginTop: 14 }}>
                SYNC does not simply buy broad media. SYNC identifies which exposure conditions matter and uses those learnings to guide campaign allocation. A broad campaign may begin with a simple target audience. SYNC then refines it into more precise audience opportunities based on observed behaviour: platform, screen, content, geography, daypart, frequency and outcome response.
              </p>
              <p style={{ marginTop: 14 }}>
                This makes audience planning more accountable, more adaptive and more connected to business impact.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="aud-split-viz">
              <MicroFlightGrid />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTINUOUS LEARNING */}
      <section className="tile tile-alt">
        <div className="container aud-split">
          <Reveal>
            <div className="aud-split-text">
              <span className="eyebrow">Continuous learning</span>
              <h2>Built to Learn From Every Campaign</h2>
              <p style={{ marginTop: 22 }}>
                SYNC does not build a static audience model once and reuse it blindly. Every campaign adds new learning. We test which micro-flights delivered stronger search lift, commerce search, add-to-cart behaviour, incremental reach or improved frequency efficiency. These learnings are fed back into the audience model, making future planning sharper.
              </p>
              <p style={{ marginTop: 14 }}>
                Over time, SYNC helps brands understand not only where their audiences are, but how different audience groups respond across media environments.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="aud-split-viz aud-split-viz--center">
              <LearningLoop />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SCALE */}
      <section className="tile">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 880 }}>
              <span className="eyebrow">Scale</span>
              <h2>Audience Intelligence That Scales</h2>
              <p style={{ marginTop: 22 }}>
                SYNC&rsquo;s audience models are built from observed exposure and outcome behaviour, then calibrated for activation across the larger addressable media universe. This allows brands to use real behavioural evidence to guide media decisions across TV, OTT, CTV, YouTube, mobile, digital and commerce-linked environments.
              </p>
              <p style={{ marginTop: 14 }}>
                The result is a more intelligent audience system: one that connects measurement, planning, activation and optimisation into a continuous loop.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <Reveal>
          <span className="eyebrow">Move from assumed audiences to outcome-ready audiences</span>
          <h2>Build audiences from real behaviour.</h2>
          <p>
            SYNC identifies which exposure conditions create response, converts those learnings into actionable micro-flights, and continuously improves campaign planning with every new campaign.
          </p>
          <div style={{ marginTop: 30, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-primary" data-testid="audience-cta-primary">Build audiences from real behaviour</Link>
            <Link to="/products" className="btn btn-secondary" data-testid="audience-cta-secondary">See how SYNC measures outcomes</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
