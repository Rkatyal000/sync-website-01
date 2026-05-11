import { Link } from "react-router-dom";
import {
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  EyeOff,
  Layers,
  Target,
  Activity,
  Users,
  Sparkles,
  Brain,
  Database,
  LineChart,
  Compass,
  ShieldCheck,
  Zap,
  Building2,
  Tv,
  Megaphone,
  Network,
  Globe,
} from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import Tilt from "../components/Tilt";

/**
 * About SYNC — text-first hierarchy with subtle, premium visual richness.
 * Copy is verbatim from the supplied "SYNC About Page Research and Final Copy".
 */

const PROBLEM = [
  {
    icon: Layers,
    title: "Siloed reporting",
    body: "TV, OTT, social and digital reporting often live in separate systems.",
  },
  {
    icon: TrendingUp,
    title: "Inflated reach",
    body: "Without de-duplication, the same audience can be counted more than once.",
  },
  {
    icon: EyeOff,
    title: "Weak outcome visibility",
    body: "Impressions and clicks alone rarely explain what moved search, commerce, app usage or business KPIs.",
  },
];

const APPROACH = [
  {
    icon: Network,
    title: "Single-source cross-media measurement",
    body: "One audience view across linear TV, OTT, YouTube, Meta and digital.",
  },
  {
    icon: ShieldCheck,
    title: "De-duplicated reach and frequency",
    body: "A clearer understanding of true reach, overlap, incremental contribution and exposure pressure.",
  },
  {
    icon: Activity,
    title: "Incrementality and causal impact",
    body: "A better basis for understanding what media added, what merely overlapped, and where budget should move.",
  },
  {
    icon: Target,
    title: "People-level attribution",
    body: "Exposure histories linked to downstream behaviour with enough granularity to support real planning and optimisation questions.",
  },
  {
    icon: Compass,
    title: "Decision support, not just reporting",
    body: "Outputs designed for action: where to rebalance spend, where frequency is wasteful, and which combinations are driving results.",
  },
  {
    icon: Brain,
    title: "AI-driven insight generation",
    body: "AI used to surface patterns, explain performance shifts and make complex cross-media evidence easier for business teams to use.",
  },
];

const AUDIENCES = [
  {
    icon: Megaphone,
    title: "Advertisers",
    body: "Understand what media is actually adding across screens, how much duplication exists, and what exposure is changing in the market.",
  },
  {
    icon: Users,
    title: "Agencies",
    body: "Plan more clearly, defend recommendations with stronger evidence, and optimise with a more complete cross-platform view.",
  },
  {
    icon: Tv,
    title: "Broadcasters and publishers",
    body: "Show how inventory contributes incremental audiences and commercial outcomes, not just delivery.",
  },
];

const STEPS = [
  {
    label: "Data",
    body: "Capture exposure signals across linear TV, OTT, YouTube, Meta and digital.",
    Icon: Database,
  },
  {
    label: "Measurement",
    body: "Build a unified exposure history for the same audience, then analyse reach, frequency, overlap and incremental contribution.",
    Icon: LineChart,
  },
  {
    label: "Action",
    body: "Connect exposure to search, commerce, app behaviour and business KPIs so teams can optimise spend with greater confidence.",
    Icon: Zap,
  },
];

const ARTIFICIAL_SOCIETY = [
  {
    icon: Sparkles,
    title: "Vision",
    body: "Move from explaining campaigns after they end to evaluating likely media effects before key decisions are made.",
  },
  {
    icon: Compass,
    title: "Mission",
    body: "Give advertisers, agencies and broadcasters a practical environment for exploring how changes in mix, reach, overlap and frequency may influence audience growth and business outcomes.",
  },
  {
    icon: Layers,
    title: "Deliverables",
    body: "A scenario planner for cross-screen allocation; duplication and frequency-pressure forecasts; incremental reach and outcome-response hypotheses; AI-generated planning notes, risk flags and optimisation recommendations.",
  },
];

const LEADERSHIP = [
  {
    name: "Anubhav Sharma",
    role: "Founder & CEO",
    body: "Anubhav started SYNC to fix a simple but expensive gap in modern advertising: media became cross-screen, but measurement stayed siloed. He leads company strategy, category direction and the push to make media decisions more grounded in audience truth and real outcomes.",
    tone: "a",
  },
  {
    name: "Vikas Saxena",
    role: "Co-founder & COO",
    body: "Vikas helps translate the company's category vision into an operating system: partnerships, execution discipline and the commercial infrastructure needed to scale a measurement business that clients can trust.",
    tone: "b",
  },
  {
    name: "Prakhar Gupta",
    role: "Chief Product Officer",
    body: "Prakhar leads product, data and platform design across measurement, outcome-linkage and AI-assisted insight generation. His focus is turning complexity into tools that business teams can actually act on.",
    tone: "c",
  },
  {
    name: "Jeena Duggal",
    role: "Chief Revenue Officer",
    body: "Jeena leads market adoption, revenue growth and client relationships. Her role is to make sure the platform solves real commercial problems for advertisers, agencies and media owners, not just analytical ones.",
    tone: "d",
  },
];

const INVESTORS = [
  {
    icon: ShieldCheck,
    role: "Director & Investor",
    body: "Advises on governance, category development and disciplined long-term scale.",
  },
  {
    icon: Building2,
    role: "Director & Investor",
    body: "Supports strategic partnerships, operating maturity and board-level decision-making.",
  },
];

/* Subtle hero illustration: cross-screen lines converging into one node. */
function HeroDiagram() {
  const sources = [
    { x: 150, y: 40,  label: "TV" },
    { x: 150, y: 95,  label: "OTT" },
    { x: 150, y: 150, label: "YouTube" },
    { x: 150, y: 205, label: "Meta" },
  ];
  return (
    <svg className="about-hero-diagram" viewBox="0 0 880 260" aria-hidden="true">
      <defs>
        <linearGradient id="aboutLine" x1="0" x2="1">
          <stop offset="0%" stopColor="#0066cc" stopOpacity="0" />
          <stop offset="50%" stopColor="#0066cc" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0066cc" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="aboutHubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#0066cc" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0066cc" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* hub glow */}
      <circle cx="600" cy="125" r="80" fill="url(#aboutHubGlow)" />

      {/* Source nodes + labels */}
      {sources.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="6" fill="#0066cc" />
          <circle cx={n.x} cy={n.y} r="10" fill="none" stroke="#0066cc" strokeOpacity="0.25" />
          <text x={n.x - 18} y={n.y + 4} textAnchor="end" className="about-hero-diagram-label">
            {n.label}
          </text>
        </g>
      ))}

      {/* Convergence curves */}
      {sources.map((n, i) => (
        <path
          key={`p-${i}`}
          d={`M ${n.x + 8} ${n.y} C 320 ${n.y}, 440 125, 590 125`}
          fill="none"
          stroke="url(#aboutLine)"
          strokeWidth="1.4"
          className="about-hero-diagram-path"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}

      {/* Travelling particles along each path */}
      {sources.map((n, i) => (
        <circle key={`d-${i}`} r="3" fill="#0066cc" className="about-hero-diagram-dot">
          <animateMotion
            dur="3.6s"
            repeatCount="indefinite"
            begin={`${i * 0.45}s`}
            path={`M ${n.x + 8} ${n.y} C 320 ${n.y}, 440 125, 590 125`}
          />
        </circle>
      ))}

      {/* Central node — concentric rings + core */}
      <circle cx="600" cy="125" r="22" fill="none" stroke="#0066cc" strokeOpacity="0.18" />
      <circle cx="600" cy="125" r="14" fill="none" stroke="#0066cc" strokeWidth="1.5" className="about-hero-diagram-pulse" />
      <circle cx="600" cy="125" r="6"  fill="#0066cc" />

      {/* Hub label (positioned away from outcome line, above) */}
      <text x="600" y="92" textAnchor="middle" className="about-hero-diagram-label-strong">
        One audience view
      </text>

      {/* Outcome line + endpoint */}
      <path
        d="M 622 125 L 800 125"
        stroke="#0066cc"
        strokeOpacity="0.5"
        strokeDasharray="4 5"
        className="about-hero-diagram-outcome"
      />
      <circle cx="800" cy="125" r="4" fill="#0066cc" />
      <text x="800" y="148" textAnchor="middle" className="about-hero-diagram-label">Outcomes</text>
    </svg>
  );
}

export default function About() {
  return (
    <div className="page-fade about-page" data-testid="about-page">
      <Seo
        title="About SYNC — single-source cross-media measurement"
        description="SYNC is a single-source cross-media measurement and outcomes optimisation company. We measure the same people across linear TV, OTT, YouTube, Meta and digital, de-duplicate reach and frequency, and connect ad exposure to downstream outcomes."
        path="/about"
        keywords={[
          "about SYNC",
          "single-source cross-media measurement",
          "cross-media measurement India",
          "de-duplicated reach and frequency",
          "incrementality measurement",
          "people-level attribution",
          "SYNC Artificial Society",
          "outcome optimisation",
        ]}
      />

      {/* HERO — framed card (matches homepage hero pattern) */}
      <section className="hero-unified about-page-hero" data-testid="about-hero-section">
        <div className="hu-aurora" aria-hidden="true">
          <span className="hu-aurora-a" />
          <span className="hu-aurora-b" />
          <span className="hu-aurora-grid" />
        </div>
        <div className="container">
          <div className="hh about-hh">
            <div className="hh-hero-slot">
              <Reveal>
                <span className="hero-eyebrow-pill" data-testid="about-hero-eyebrow">
                  <span className="hero-eyebrow-dot" />
                  About SYNC
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h1 data-testid="about-hero-title" className="hero-simple-title about-hero-simple-title">
                  We show brands what media is <span className="hero-title-grad">really doing</span> across screens
                </h1>
              </Reveal>
              <Reveal delay={220}>
                <p className="hero-simple-body about-hero-simple-body">
                  SYNC is a single-source cross-media measurement and outcomes optimisation company. SYNC measures the same people across linear TV, OTT, YouTube, Meta and digital. SYNC de-duplicates reach and frequency across platforms. SYNC connects ad exposure to downstream outcomes such as search, commerce and app behaviour.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="hero-simple-body about-hero-simple-body hero-simple-body-2">
                  That gives advertisers, agencies and broadcasters one clearer view of reach, overlap, incremental audience contribution and business impact.
                </p>
              </Reveal>
              <Reveal delay={380}>
                <div className="hero-simple-cta">
                  <Link to="/products" className="btn btn-primary" data-testid="about-cta-platform">
                    See the Platform <ArrowRight size={16} />
                  </Link>
                  <Link to="/contact" className="btn btn-secondary" data-testid="about-cta-demo">
                    Book a Demo <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Premium 3D stat row */}
            <Reveal delay={460}>
              <div className="about-stats-row" data-testid="about-stats-row">
                {[
                  { n: "60+",  l: "category-leader brands trust SYNC", Icon: Building2 },
                  { n: "5",    l: "screens unified into one audience view", Icon: Tv },
                  { n: "94%",  l: "deduplication accuracy across platforms", Icon: ShieldCheck },
                  { n: "24h",  l: "to first cross-media truth, end to end", Icon: Zap },
                ].map((s, i) => (
                  <Tilt key={s.l} max={6} scale={1.015} className="about-stat-tilt">
                    <div className="about-stat-card" data-testid={`about-stat-${i}`}>
                      <span className="about-stat-icon"><s.Icon size={18} strokeWidth={1.8} /></span>
                      <div className="about-stat-num">{s.n}</div>
                      <div className="about-stat-label">{s.l}</div>
                    </div>
                  </Tilt>
                ))}
              </div>
            </Reveal>

            {/* Coverage ribbon */}
            <Reveal delay={540}>
              <div className="coverage-ribbon" aria-label="Coverage">
                <span>Linear TV</span>
                <span>OTT / CTV</span>
                <span>YouTube</span>
                <span>Meta</span>
                <span>Digital</span>
                <span>Commerce</span>
              </div>
            </Reveal>

            <Reveal delay={620}>
              <div className="about-hero-diagram-wrap" data-testid="about-hero-diagram">
                <HeroDiagram />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="tile tile-alt">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 880 }}>
              <span className="eyebrow">The problem</span>
              <h2>Media has fragmented. Measurement usually has not.</h2>
              <p style={{ marginTop: 22 }}>
                People move across screens all day, but reporting still often arrives platform by platform. That can overstate reach, hide overlap, miss frequency waste and separate media exposure from real business outcomes.
              </p>
              <p style={{ marginTop: 14 }}>
                Brands then face a familiar problem: they can see delivery, but not always contribution. They know what ran. They do not always know what added new audiences, what duplicated old ones, or what actually changed behaviour.
              </p>
            </div>
          </Reveal>
          <div className="diff-grid about-cards" style={{ marginTop: 36 }}>
            {PROBLEM.map((p, i) => {
              const Ic = p.icon;
              return (
                <Reveal key={p.title} delay={(i % 3) * 90}>
                  <article className="diff-card about-card about-card--warn">
                    <span className="about-card-icon"><Ic size={20} strokeWidth={1.6} /></span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                    <span className="about-card-rule" aria-hidden="true" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="tile">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 880 }}>
              <span className="eyebrow">Our approach</span>
              <h2>We measure audiences once, then connect them to outcomes.</h2>
              <p style={{ marginTop: 22 }}>
                SYNC is built to replace stitched-together views with one measurement system that follows exposure across screens and links it to what happens next. The goal is not more reporting. The goal is better decisions.
              </p>
            </div>
          </Reveal>
          <div className="diff-grid about-cards" style={{ marginTop: 36 }}>
            {APPROACH.map((a, i) => {
              const Ic = a.icon;
              return (
                <Reveal key={a.title} delay={(i % 3) * 90}>
                  <article className="diff-card about-card">
                    <span className="about-card-icon"><Ic size={20} strokeWidth={1.6} /></span>
                    <h3>{a.title}</h3>
                    <p>{a.body}</p>
                    <span className="about-card-rule" aria-hidden="true" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MISSION — framed mini hero card */}
      <section className="mission-band" data-testid="about-mission">
        <div className="hu-aurora" aria-hidden="true">
          <span className="hu-aurora-a" />
          <span className="hu-aurora-b" />
          <span className="hu-aurora-grid" />
        </div>
        <div className="container">
          <div className="hh mission-hh">
            <Reveal>
              <span className="hero-eyebrow-pill" data-testid="mission-eyebrow">
                <span className="hero-eyebrow-dot" />
                Mission
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mission-title">
                Our mission is to make media measurement{" "}
                <span className="hero-title-grad">more accurate, transparent and actionable.</span>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <div className="mission-pillars" data-testid="mission-pillars">
                <div className="mission-pillar">
                  <span className="mission-pillar-ico"><ShieldCheck size={18} strokeWidth={1.8} /></span>
                  <span className="mission-pillar-text"><strong>Accurate</strong> single-source signal across screens</span>
                </div>
                <span className="mission-pillar-sep" aria-hidden="true" />
                <div className="mission-pillar">
                  <span className="mission-pillar-ico"><Compass size={18} strokeWidth={1.8} /></span>
                  <span className="mission-pillar-text"><strong>Transparent</strong> methodology, defendable in any room</span>
                </div>
                <span className="mission-pillar-sep" aria-hidden="true" />
                <div className="mission-pillar">
                  <span className="mission-pillar-ico"><Zap size={18} strokeWidth={1.8} /></span>
                  <span className="mission-pillar-text"><strong>Actionable</strong> intelligence — not just dashboards</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="tile tile-alt">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 880 }}>
              <span className="eyebrow">Who we serve</span>
              <h2>Built for the teams making and defending media decisions.</h2>
            </div>
          </Reveal>
          <div className="diff-grid about-cards" style={{ marginTop: 36 }}>
            {AUDIENCES.map((a, i) => {
              const Ic = a.icon;
              return (
                <Reveal key={a.title} delay={(i % 3) * 90}>
                  <article className="diff-card about-card about-card--feature">
                    <span className="about-card-icon about-card-icon--lg"><Ic size={24} strokeWidth={1.6} /></span>
                    <h3>{a.title}</h3>
                    <p>{a.body}</p>
                    <span className="about-card-rule" aria-hidden="true" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — Data → Measurement → Action */}
      <section className="tile">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 880 }}>
              <span className="eyebrow">How it works</span>
              <h2>Data to measurement. Measurement to action.</h2>
            </div>
          </Reveal>
          <div className="about-process" data-testid="about-process">
            <span className="about-process-rail" aria-hidden="true">
              <span className="about-process-rail-fill" />
            </span>
            {STEPS.map((s, i) => {
              const Ic = s.Icon;
              return (
                <Reveal key={s.label} delay={i * 140}>
                  <article className="about-process-step about-process-step--clean">
                    <span className="about-process-icon" aria-hidden="true">
                      <Ic size={22} strokeWidth={1.6} />
                    </span>
                    <h3 className="about-process-title">{s.label}</h3>
                    <p className="about-process-body">{s.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SYNC ARTIFICIAL SOCIETY */}
      <section className="tile tile-alt">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 880 }}>
              <span className="eyebrow">Looking ahead</span>
              <h2>SYNC Artificial Society</h2>
              <p style={{ marginTop: 22 }}>
                SYNC Artificial Society is our forward-looking decision-intelligence layer. It is designed to sit on top of measured exposure, audience overlap and outcome signals so teams can test scenarios before budgets move.
              </p>
            </div>
          </Reveal>
          <div className="diff-grid about-cards" style={{ marginTop: 36 }}>
            {ARTIFICIAL_SOCIETY.map((a, i) => {
              const Ic = a.icon;
              return (
                <Reveal key={a.title} delay={(i % 3) * 90}>
                  <article className="diff-card about-card about-card--feature">
                    <span className="about-card-icon about-card-icon--lg"><Ic size={24} strokeWidth={1.6} /></span>
                    <h3>{a.title}</h3>
                    <p>{a.body}</p>
                    <span className="about-card-rule" aria-hidden="true" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="tile">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 880 }}>
              <span className="eyebrow">Leadership team</span>
              <h2>The team behind SYNC.</h2>
            </div>
          </Reveal>
          <div className="about-people" style={{ marginTop: 40 }}>
            {LEADERSHIP.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 120}>
                <article className={`about-person about-person--${p.tone}`} data-testid={`about-person-${p.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span className="about-person-stripe" aria-hidden="true" />
                  <span className="about-person-avatar" aria-hidden="true">
                    <span className="about-person-avatar-ring" />
                    <span className="about-person-avatar-mono">
                      {p.name
                        .split(" ")
                        .map((s) => s[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  </span>
                  <div className="about-person-body-wrap">
                    <h3 className="about-person-name">{p.name}</h3>
                    <span className="about-person-role">{p.role}</span>
                    <p className="about-person-body">{p.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Investors */}
          <Reveal delay={120}>
            <div style={{ marginTop: 56, maxWidth: 880 }}>
              <span className="eyebrow">Investor lines</span>
              <h3 className="about-roadmap-title">Board &amp; capital partners</h3>
            </div>
          </Reveal>
          <div className="about-investors" style={{ marginTop: 22 }}>
            {INVESTORS.map((inv, i) => {
              const Ic = inv.icon;
              return (
                <Reveal key={`${inv.role}-${i}`} delay={(i % 2) * 90}>
                  <article className="about-investor">
                    <span className="about-investor-side" aria-hidden="true" />
                    <span className="about-investor-icon">
                      <Ic size={20} strokeWidth={1.6} />
                    </span>
                    <span className="about-investor-tag">Board member</span>
                    <h3>{inv.role}</h3>
                    <p>{inv.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY TEAMS TRUST SYNC */}
      <section className="tile tile-alt">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 880 }}>
              <span className="eyebrow">Why teams trust SYNC</span>
              <h2>Built for serious media decisions.</h2>
              <p style={{ marginTop: 22 }}>
                SYNC is built for serious media decisions: one clearer audience view, measurable overlap and incrementality, explainable methodology, and outcome linkage that helps teams move from reporting to action.
              </p>
              <p style={{ marginTop: 14 }}>
                In April 2026, JioStar publicly described a deterministic, single-source attribution study by Worldpanel by Numerator in partnership with SYNC, linking exposure across TV, OTT and digital to outcomes such as search activity, website visits and transactions.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" data-testid="about-cta-band">
        <Reveal>
          <span className="eyebrow">Talk to us</span>
          <h2>See one clearer view of media performance.</h2>
          <p>
            If you want to understand what each screen is adding, where duplication is reducing efficiency, and how exposure connects to outcomes, we should talk.
          </p>
          <div style={{ marginTop: 30, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-primary" data-testid="about-final-cta-demo">Book a Demo</Link>
            <Link to="/products" className="btn btn-secondary" data-testid="about-final-cta-platform">See the Platform <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
