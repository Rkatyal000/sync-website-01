import { Link } from "react-router-dom";
import { ArrowRight, Radar, Gauge, Sparkles, LineChart, Target, Shield } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import ClientMarquee from "../components/ClientMarquee";
import FAQ from "../components/FAQ";
import HeroHub from "../components/HeroHub";
import SyncPulse from "../components/SyncPulse";
import OrbitField from "../components/OrbitField";

/* ---------- Animated hero backdrop ---------- */
function HeroOrbit() {
  // subtle orbital network — premium AI feel, no chips/SaaS noise
  return (
    <svg className="hero-orbit" viewBox="0 0 1200 800" aria-hidden="true">
      <defs>
        <radialGradient id="heroSpot" cx="50%" cy="40%" r="60%">
          <stop offset="0%"  stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ringStroke" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%"  stopColor="var(--accent)" stopOpacity="0.0" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#heroSpot)" />
      <g transform="translate(600 380)">
        {[160, 250, 340, 440].map((r, i) => (
          <ellipse key={r} cx="0" cy="0" rx={r * 1.6} ry={r * 0.55} fill="none"
                   stroke="url(#ringStroke)" strokeWidth="1"
                   transform={`rotate(${i * 8})`}
                   opacity={0.6 - i * 0.12}>
            <animateTransform attributeName="transform" type="rotate"
              from={`${i * 8}`} to={`${i * 8 + 360}`}
              dur={`${28 + i * 8}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
        {/* travelling dots on innermost orbits */}
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} r="3" fill="var(--accent)" opacity="0.85">
            <animateMotion dur={`${12 + i * 2}s`} repeatCount="indefinite"
              path={`M0 0 m -${(160 + i * 60) * 1.6},0 a ${(160 + i * 60) * 1.6},${(160 + i * 60) * 0.55} 0 1,1 ${(160 + i * 60) * 3.2},0 a ${(160 + i * 60) * 1.6},${(160 + i * 60) * 0.55} 0 1,1 -${(160 + i * 60) * 3.2},0`} />
          </circle>
        ))}
      </g>
    </svg>
  );
}

/* ---------- Mini visuals for product showcase cards ---------- */

function MiniNet() {
  return (
    <svg viewBox="0 0 200 100" className="mini-vz" aria-hidden="true">
      {[20, 50, 80].map((y, i) => (
        <g key={y}>
          <circle cx="20" cy={y} r="4" fill="var(--accent)" opacity="0.85" />
          <line x1="24" y1={y} x2="120" y2="50" stroke="var(--accent)" strokeOpacity="0.5" strokeDasharray="2 4" />
          <circle r="2" fill="var(--accent)">
            <animateMotion dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite"
              path={`M24 ${y} L 120 50`} begin={`${i * 0.3}s`} />
          </circle>
        </g>
      ))}
      <circle cx="120" cy="50" r="14" fill="none" stroke="var(--accent)" />
      <circle cx="120" cy="50" r="6" fill="var(--accent)" />
      {[20, 50, 80].map((y) => (
        <g key={`r-${y}`}>
          <line x1="120" y1="50" x2="180" y2={y} stroke="var(--accent)" strokeOpacity="0.4" />
          <circle cx="180" cy={y} r="3" fill="var(--bg)" stroke="var(--accent)" />
        </g>
      ))}
    </svg>
  );
}

function MiniChart() {
  return (
    <svg viewBox="0 0 200 100" className="mini-vz" aria-hidden="true">
      <defs>
        <linearGradient id="mc" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="10,80 30,72 50,76 70,58 90,62 110,42 130,48 150,30 170,36 190,18 190,90 10,90" fill="url(#mc)" />
      <polyline points="10,80 30,72 50,76 70,58 90,62 110,42 130,48 150,30 170,36 190,18"
        fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="2.4s" fill="freeze" />
      </polyline>
      <circle cx="190" cy="18" r="4" fill="var(--accent)">
        <animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function MiniBars() {
  const before = [40, 60, 80, 30];
  const after  = [20, 40, 90, 70];
  return (
    <svg viewBox="0 0 200 100" className="mini-vz" aria-hidden="true">
      {before.map((b, i) => (
        <g key={i}>
          <rect x={20 + i * 40} y={90 - b} width="14" height={b} rx="3" fill="var(--fg)" opacity="0.4" />
          <rect x={36 + i * 40} y={90} width="14" rx="3" fill="var(--accent)">
            <animate attributeName="height" values={`0;${after[i]}`} dur="1.2s" begin={`${i * 0.12}s`} fill="freeze" />
            <animate attributeName="y" values={`90;${90 - after[i]}`} dur="1.2s" begin={`${i * 0.12}s`} fill="freeze" />
          </rect>
        </g>
      ))}
    </svg>
  );
}

function MiniReport() {
  return (
    <svg viewBox="0 0 200 100" className="mini-vz" aria-hidden="true">
      <rect x="10" y="14" width="110" height="72" rx="8" fill="var(--bg)" stroke="var(--line-strong)" />
      <rect x="22" y="26" width="50" height="6" rx="3" fill="var(--fg-muted)" opacity="0.35" />
      <rect x="22" y="40" width="80" height="4" rx="2" fill="var(--fg-muted)" opacity="0.25" />
      <polyline points="22,72 38,66 54,68 70,58 86,62 102,52" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
      <rect x="130" y="14" width="58" height="34" rx="8" fill="var(--bg)" stroke="var(--line-strong)" />
      <text x="138" y="32" fontSize="9" fontWeight="700" fill="var(--fg-muted)" letterSpacing="1.2">LIFT</text>
      <text x="138" y="44" fontSize="13" fontWeight="600" fill="var(--accent)">+19%</text>
      <rect x="130" y="52" width="58" height="34" rx="8" fill="var(--bg)" stroke="var(--line-strong)" />
      <text x="138" y="68" fontSize="9" fontWeight="700" fill="var(--fg-muted)" letterSpacing="1.2">FREQ</text>
      <text x="138" y="80" fontSize="13" fontWeight="600" fill="var(--fg)">−38%</text>
    </svg>
  );
}

export default function Home() {
  return (
    <div className="page-fade" data-testid="home-page">
      <Seo
        title="Single-source cross-media intelligence"
        description="SYNC is a single-source cross-media intelligence platform — measure the same people across linear TV, OTT, YouTube, Meta and digital, then connect exposure to real outcomes."
        path="/"
        keywords={["cross-media measurement", "single-source intelligence", "advertising measurement", "media optimisation", "deduplicated reach"]}
      />
      {/* Hero — single unified frame: text + diagram */}
      <section className="hero-unified" data-testid="hero-unified-section">
        <div className="hu-aurora" aria-hidden="true">
          <span className="hu-aurora-a" />
          <span className="hu-aurora-b" />
          <span className="hu-aurora-grid" />
        </div>
        <div className="container">
          <HeroHub
            heroSlot={
              <>
                <Reveal>
                  <span className="hero-eyebrow-pill" data-testid="hero-eyebrow">
                    <span className="hero-eyebrow-dot" />
                    Single-Source Cross-Media Measurement
                  </span>
                </Reveal>
                <Reveal delay={120}>
                  <h1 data-testid="hero-title" className="hero-simple-title">
                    Single-source <span className="hero-title-grad">cross-media measurement</span> for modern advertising
                  </h1>
                </Reveal>
                <Reveal delay={220}>
                  <p className="hero-simple-body">
                    SYNC measures the same people across linear TV, OTT, YouTube, Meta and digital. It de-duplicates reach and frequency across platforms, then connects ad exposure to downstream outcomes such as search, commerce and app behaviour.
                  </p>
                </Reveal>
                <Reveal delay={320}>
                  <p className="hero-simple-body hero-simple-body-2">
                    Built to help advertisers, agencies and broadcasters move from fragmented reporting to one clearer view of audiences, overlap, incremental reach and business impact.
                  </p>
                </Reveal>
                <Reveal delay={380}>
                  <div className="hero-mini-stats" data-testid="hero-mini-stats">
                    <div className="hms-cell"><span className="hms-num">60+</span><span className="hms-lbl">brands</span></div>
                    <span className="hms-sep" />
                    <div className="hms-cell"><span className="hms-num">9</span><span className="hms-lbl">screens measured</span></div>
                    <span className="hms-sep" />
                    <div className="hms-cell"><span className="hms-num">24h</span><span className="hms-lbl">to first insight</span></div>
                  </div>
                </Reveal>
                <Reveal delay={460}>
                  <div className="hero-simple-cta">
                    <Link to="/contact" className="btn btn-primary" data-testid="hero-cta-primary">
                      Book a Demo <ArrowRight size={16} />
                    </Link>
                    <Link to="/products" className="btn btn-secondary" data-testid="hero-cta-secondary">
                      See How It Works
                    </Link>
                  </div>
                </Reveal>
                <Reveal delay={540}>
                  <p className="hero-simple-trust">
                    Trusted by leading brands, agencies and broadcasters
                  </p>
                </Reveal>
              </>
            }
          />
        </div>
      </section>

      {/* Client logo marquee */}
      <ClientMarquee />

      {/* Value proposition */}
      <section className="tile tile-alt">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
              <span className="eyebrow">Why SYNC</span>
              <h2>Measurement, rethought</h2>
              <p style={{ marginTop: 20 }}>
                Three pillars that move teams from fragmented reporting to confident decisions
              </p>
            </div>
          </Reveal>

          <div className="value-grid">
            {[
              { icon: Radar, title: "Single-source clarity", body: "Measure the same people across linear TV, OTT, YouTube, Meta and digital — not stitched reports." },
              { icon: Gauge, title: "Outcome intelligence", body: "Connect exposure to search, commerce, app usage and custom KPIs that matter to the business." },
              { icon: Sparkles, title: "Action, not dashboards", body: "A decision layer for strategy, analytics and commercial teams. Ready to use, ready to defend." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 120}>
                <div className="value-card" data-testid={`value-card-${i}`}>
                  <span className="value-icon pulse"><v.icon size={22} strokeWidth={1.6} /></span>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                  <span className="value-ring" aria-hidden="true" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sync Pulse mobile app showcase */}
      <SyncPulse />

      {/* Product showcase */}
      <section className="tile">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 720 }}>
              <span className="eyebrow">The Platform</span>
              <h2>Everything you need.<br/>Nothing you don't</h2>
            </div>
          </Reveal>
          <div className="product-grid">
            {[
              { dark: true,  tag: "Cross-media measurement", title: "See the same people, across every screen.", body: "De-duplicated reach and frequency. Real incremental contribution. One audience view — built for how media actually runs.", Mini: MiniNet,   testid: "product-card-measurement" },
              { dark: false, tag: "Outcomes measurement",     title: "From impression to real response.",          body: "Connect exposure to search lift, marketplace demand, quick-commerce activity and app behaviour. Proof beyond delivery metrics.", Mini: MiniChart, testid: "product-card-outcomes" },
              { dark: false, tag: "Media optimisation",       title: "Move budget where it moves markets.",        body: "Spot overlap, frequency waste, and under-performing inventory. Reallocate with evidence, not instinct.", Mini: MiniBars,  testid: "product-card-optimisation" },
              { dark: true,  tag: "Reporting & diagnostics",  title: "Reports your stakeholders will actually read.", body: "Strategy-ready outputs. Explainable methodology. One decision layer for every team in the room.", Mini: MiniReport, testid: "product-card-diagnostics" },
            ].map((p, i) => (
              <Reveal key={p.tag} delay={(i % 2) * 80}>
                <div className={`product-card ${p.dark ? "dark" : ""}`} data-testid={p.testid}>
                  <div>
                    <span className="product-tag">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                  <div className="product-mini"><p.Mini /></div>
                  <div className="product-foot">
                    <Link to="/products" className="link-arrow">Learn more <ArrowRight size={16} /></Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Philosophy */}
      <section className="tile tile-dark philosophy-tile">
        <div className="philosophy-bg" aria-hidden="true">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="phiGlow" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0a84ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="120" r="240" fill="url(#phiGlow)" />
            <circle cx="980" cy="480" r="280" fill="url(#phiGlow)" />
          </svg>
        </div>
        <div className="container">
          <Reveal>
            <div className="philosophy-block">
              <span className="eyebrow philosophy-eyebrow">Our Philosophy</span>
              <h2 className="philosophy-h2">
                <span className="phi-line">Media is now cross-screen</span>
                <span className="phi-divider" aria-hidden="true" />
                <span className="phi-line phi-accent">Measurement should be too</span>
              </h2>
              <p className="philosophy-body">
                Budgets are tighter, mixes are broader, and proof is expected.
                SYNC gives senior teams one honest view of audiences, overlap,
                and outcomes — so every media decision stands on evidence
              </p>
            </div>
          </Reveal>

          <div className="stats-row" style={{ borderTopColor: "rgba(255,255,255,0.08)" }}>
            {[
              ["3.2x", "lift in incremental audience contribution"],
              ["−38%", "frequency waste on average"],
              ["94%",  "deduplication accuracy"],
              ["24h",  "to first cross-media view"],
            ].map(([n, l], i) => (
              <Reveal key={l} delay={i * 100}>
                <div className="stat-cell">
                  <div className="stat-num">{n}</div>
                  <div className="stat-label" style={{ color: "#a1a1a6" }}>{l}</div>
                  <span className="stat-rule" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="tile tile-alt">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 720 }}>
              <span className="eyebrow">Proof</span>
              <h2>Outcomes, in the open</h2>
            </div>
          </Reveal>

          <div className="case-grid">
            {[
              { icon: LineChart, tag: "FMCG · TV + OTT", title: "True incremental audience across TV and digital", body: "Fragmented reports overstated reach by 19%. The real incremental story was sharper — and smaller — than anyone expected." },
              { icon: Target,    tag: "Commerce · TV + Digital", title: "From exposure to marketplace response", body: "Certain media combinations drove stronger search and marketplace response than their impression counts suggested." },
              { icon: Shield,    tag: "Broadcaster Network", title: "Proving value beyond GRPs", body: "Inventory showed measurable incremental audience — enabling stronger renewal conversations and premium positioning." },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <div className="case-card glow" data-testid={`case-card-${i}`}>
                  <span className="case-meta">{c.tag}</span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                  <Link to="/case-studies" className="link-arrow" style={{ marginTop: "auto" }}>
                    Read case study <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="cta-band">
        <Reveal>
          <span className="eyebrow">Ready when you are</span>
          <h2>See what your plan is really delivering</h2>
          <p>A 30-minute walkthrough with the team. No slides. Just your media mix, measured honestly</p>
          <div style={{ marginTop: 34, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-primary" data-testid="cta-book-demo">Book a Demo</Link>
            <Link to="/products" className="btn btn-secondary" data-testid="cta-see-platform">See the Platform</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
