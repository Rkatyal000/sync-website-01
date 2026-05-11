import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Layers, Target, Sparkles } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import ClientMarquee from "../components/ClientMarquee";

const CASES = [
  {
    tag: "FMCG · TV + OTT + YouTube",
    industry: "FMCG",
    title: "Showing true incremental audience across TV and digital",
    challenge: "A large campaign was being evaluated through siloed platform reporting, making it hard to understand which channels were actually adding new audiences.",
    measured: "Deduplicated reach, platform overlap, and incremental contribution across linear TV, OTT, YouTube and digital.",
    finding: "Apparent reach was overstated by fragmented reporting; the real incremental story was sharper once overlap was removed.",
    impact: "The team reframed media value around audience gain, not duplicated delivery.",
    accent: "blue",
    kpis: [
      { value: 38, suffix: "%", label: "Reach overstatement found" },
      { value: 22, suffix: "%", label: "Incremental audience uplift" },
      { value: 4, suffix: "x", label: "Faster decision cycle" },
    ],
  },
  {
    tag: "Commerce · TV + Digital",
    industry: "Commerce",
    title: "Connecting cross-media exposure to search and marketplace response",
    challenge: "A brand needed to understand whether exposure across screens was translating into real downstream behaviour beyond reach metrics.",
    measured: "Exposure by platform, downstream search response, and marketplace behaviour across Amazon and Flipkart.",
    finding: "Certain media combinations produced stronger response than their delivery metrics alone suggested.",
    impact: "Allocation decisions could be defended with evidence tied to consumer action.",
    accent: "violet",
    kpis: [
      { value: 2.7, suffix: "x", label: "Search response lift" },
      { value: 31, suffix: "%", label: "Marketplace conversion" },
      { value: 18, suffix: "%", label: "Spend reallocated" },
    ],
  },
  {
    tag: "Broadcaster · Media Network",
    industry: "Broadcaster",
    title: "Helping a broadcaster prove value beyond delivery metrics",
    challenge: "A broadcaster needed a stronger post-campaign story than reach, frequency and GRPs.",
    measured: "Incremental audience contribution, cross-platform overlap, and downstream advertiser-relevant outcomes.",
    finding: "The broadcaster could clearly demonstrate how its inventory added audience value and drove real response signals.",
    impact: "Sales and strategy teams gained a stronger proof layer for renewals and premium positioning.",
    accent: "emerald",
    kpis: [
      { value: 12, suffix: "%", label: "Premium pricing gain" },
      { value: 3.4, suffix: "x", label: "Renewal evidence" },
      { value: 100, suffix: "%", label: "Cross-platform proof" },
    ],
  },
  {
    tag: "Agency · Multi-platform",
    industry: "Agency",
    title: "Optimising overlap across a multi-platform campaign",
    challenge: "An agency needed to explain why some channels were adding less new audience than delivery reports suggested.",
    measured: "Cross-media overlap, frequency build-up and incremental reach by channel.",
    finding: "Several high-delivery environments duplicated audiences already exposed elsewhere.",
    impact: "The agency built a sharper optimisation recommendation for the next burst.",
    accent: "amber",
    kpis: [
      { value: 27, suffix: "%", label: "Wasted overlap removed" },
      { value: 14, suffix: "%", label: "Incremental reach gain" },
      { value: 2, suffix: "x", label: "Plan efficiency" },
    ],
  },
  {
    tag: "App-led brand · Mobile-heavy mix",
    industry: "App",
    title: "Linking exposure to app usage for an app-led brand",
    challenge: "A mobile-led business wanted to understand whether exposure was changing app visitation and engagement.",
    measured: "Exposure cohorts, app usage behaviour and response by media combination.",
    finding: "Balanced TV and digital exposure created stronger app response than isolated platform delivery.",
    impact: "The brand had a clearer basis for app-growth media planning.",
    accent: "rose",
    kpis: [
      { value: 41, suffix: "%", label: "App visit lift" },
      { value: 1.9, suffix: "x", label: "Engagement uplift" },
      { value: 23, suffix: "%", label: "Acquisition efficiency" },
    ],
  },
  {
    tag: "Large brand · Broad media mix",
    industry: "FMCG",
    title: "Finding saturation and frequency waste",
    challenge: "A large brand campaign needed to know where reach growth was slowing and repeated exposure was rising.",
    measured: "Frequency distribution, saturation, overlap and response by exposure cohort.",
    finding: "Heavy frequency accumulated in specific audience pockets without proportional response.",
    impact: "The team identified where spend could shift to improve efficiency.",
    accent: "slate",
    kpis: [
      { value: 19, suffix: "%", label: "Frequency waste cut" },
      { value: 11, suffix: "%", label: "Reach gain at same spend" },
      { value: 6, suffix: "+", label: "Saturation pockets fixed" },
    ],
  },
];

const INDUSTRIES = ["All", "FMCG", "Commerce", "Broadcaster", "Agency", "App"];

/* Animated count-up that triggers when in view */
function CountUp({ value, suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasRun) {
            setHasRun(true);
            const start = performance.now();
            const isFloat = !Number.isInteger(value);
            const tick = (now) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              const next = value * eased;
              setDisplay(isFloat ? Math.round(next * 10) / 10 : Math.round(next));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, duration, hasRun]);

  return (
    <span ref={ref} className="cu-num">
      {display}
      {suffix}
    </span>
  );
}

function CaseCard({ c, i, featured = false }) {
  return (
    <article
      className={`case-rich accent-${c.accent} ${featured ? "case-rich--feature" : ""}`}
      data-testid={`case-full-${i}`}
      style={{ "--idx": i }}
    >
      <div className="case-rich-cover" aria-hidden="true">
        <span className="post-cover-grid" />
        <span className="post-cover-orb" />
        <span className="post-cover-orb post-cover-orb-2" />
        <span className="case-rich-tag">{c.tag}</span>
        <span className="case-rich-glyph">
          {c.industry.slice(0, 2).toUpperCase()}
        </span>
      </div>

      <div className="case-rich-body">
        <h3 className="case-rich-title">{c.title}</h3>

        <ul className="case-rich-kpis">
          {c.kpis.map((k) => (
            <li key={k.label}>
              <strong>
                <CountUp value={k.value} suffix={k.suffix} />
              </strong>
              <span>{k.label}</span>
            </li>
          ))}
        </ul>

        <dl className="case-rich-dl">
          <div>
            <dt><Sparkles size={13} /> Challenge</dt>
            <dd>{c.challenge}</dd>
          </div>
          <div>
            <dt><Layers size={13} /> Key finding</dt>
            <dd>{c.finding}</dd>
          </div>
          <div>
            <dt><Target size={13} /> Impact</dt>
            <dd>{c.impact}</dd>
          </div>
        </dl>

        <Link to="/contact" className="case-rich-link">
          Talk to us about a similar mix <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

export default function CaseStudies() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? CASES : CASES.filter((c) => c.industry === active)),
    [active]
  );

  return (
    <div className="page-fade" data-testid="case-studies-page">
      <Seo
        title="Case Studies"
        description="Real teams. Real mixes. Honest outcomes — across advertisers, agencies and broadcasters."
        path="/case-studies"
        keywords={["cross-media case studies", "advertising case studies", "broadcaster case studies"]}
      />

      {/* HERO */}
      <section className="case-hero">
        <div className="case-hero-bg" aria-hidden="true">
          <span className="blog-hero-grid" />
          <span className="blog-hero-orb" />
          <span className="blog-hero-orb blog-hero-orb-2" />
        </div>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Case Studies</span>
            <h1 className="case-hero-title">
              Proof that goes <span className="grad">beyond delivery.</span>
            </h1>
            <p className="lead case-hero-lead">
              Real teams. Real mixes. Honest outcomes — across advertisers, agencies and broadcasters.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="case-hero-stats">
              <div className="case-stat">
                <strong><CountUp value={60} suffix="+" /></strong>
                <span>Brands measured</span>
              </div>
              <div className="case-stat">
                <strong><CountUp value={12} suffix="+" /></strong>
                <span>Industries covered</span>
              </div>
              <div className="case-stat">
                <strong><CountUp value={1.2} suffix="B+" /></strong>
                <span>Cross-screen impressions</span>
              </div>
              <div className="case-stat">
                <strong><CountUp value={98} suffix="%" /></strong>
                <span>Renewal rate</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLIENT MARQUEE */}
      <ClientMarquee
        eyebrow="Selected partners"
        heading="From category leaders to challengers — across every screen."
        variant="compact"
      />

      {/* FILTER + GRID */}
      <section className="tile">
        <div className="container">
          <Reveal>
            <div className="case-filter">
              <span className="case-filter-label">Filter by industry</span>
              <div className="cat-strip">
                {INDUSTRIES.map((c) => (
                  <button
                    key={c}
                    className={`cat-chip ${active === c ? "on" : ""}`}
                    onClick={() => setActive(c)}
                    data-testid={`case-filter-${c.toLowerCase()}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {filtered.length === 0 ? (
            <Reveal>
              <div className="empty-state">
                <p>No case studies in this industry yet. Try another filter.</p>
              </div>
            </Reveal>
          ) : (
            <div className="case-rich-grid" key={active}>
              {filtered.map((c, i) => (
                <Reveal key={c.title} delay={(i % 2) * 120}>
                  <CaseCard c={c} i={i} featured={i === 0 && active === "All"} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* OUTCOMES BAND */}
      <section className="tile tile-alt">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 820 }}>
              <span className="eyebrow">Outcomes</span>
              <h2>The patterns we keep seeing.</h2>
              <p style={{ marginTop: 18 }}>
                Across categories and mixes, single-source measurement consistently changes
                what teams decide next.
              </p>
            </div>
          </Reveal>

          <div className="outcome-row">
            <Reveal delay={80}>
              <div className="outcome-cell">
                <span className="outcome-icon"><TrendingUp size={20} /></span>
                <strong><CountUp value={20} suffix="-30%" /></strong>
                <span>Reach overstatement uncovered when platforms are de-duplicated.</span>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="outcome-cell">
                <span className="outcome-icon"><Layers size={20} /></span>
                <strong><CountUp value={15} suffix="-25%" /></strong>
                <span>Frequency waste typically removable without losing reach.</span>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="outcome-cell">
                <span className="outcome-icon"><Target size={20} /></span>
                <strong><CountUp value={2} suffix="–4x" /></strong>
                <span>Stronger downstream signal for the right combinations.</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <Reveal>
          <h2>Want the same clarity for your plan?</h2>
          <p>We'll show you what your next campaign is really doing — before you run it.</p>
          <div style={{ marginTop: 34 }}>
            <Link to="/contact" className="btn btn-primary">Book a Demo <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
