import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";

const ARTICLES = [
  {
    tag: "Cross-media measurement",
    title: "What is single-source cross-media measurement?",
    body: "Why fragmented reporting creates confusion, what single-source actually means, and how cross-media clarity changes decisions.",
    minutes: "6 min read",
  },
  {
    tag: "Deduplicated reach",
    title: "What is deduplicated reach?",
    body: "Why raw platform reach can mislead, what deduplicated means in plain English, and why overlap matters more than headline numbers.",
    minutes: "5 min read",
  },
  {
    tag: "Incremental reach",
    title: "Incremental reach explained — in plain English",
    body: "Total reach vs incremental reach. Why big platforms aren't always incremental, and why planners need this view.",
    minutes: "4 min read",
  },
  {
    tag: "Reporting",
    title: "Why platform reporting overstates reach",
    body: "The silo problem, audience overlap across screens, and what a better cross-media framework looks like.",
    minutes: "7 min read",
  },
  {
    tag: "Outcomes",
    title: "How media exposure influences search behaviour",
    body: "Why search is a meaningful downstream signal, and how cross-media patterns affect demand signals.",
    minutes: "6 min read",
  },
  {
    tag: "Broadcasters",
    title: "What broadcasters should prove beyond GRPs",
    body: "Why delivery metrics are no longer enough, and what advertisers increasingly want to see — incremental contribution and outcome-linked proof.",
    minutes: "8 min read",
  },
];

const TOPICS = [
  "Cross-Media Measurement",
  "Deduplicated Reach",
  "Incremental Reach",
  "Search & Commerce Outcomes",
  "Broadcaster Value",
  "Media Optimisation",
];

export default function Insights() {
  return (
    <div className="page-fade" data-testid="insights-page">
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Insights</span>
            <h1>Plain language.<br/>Strong points of view.</h1>
            <p className="lead">
              Guides, explainers and writing on audience de-duplication, media effectiveness, exposure-to-outcome measurement, and smarter cross-media decisions.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="tile-alt" style={{ padding: "32px 0" }}>
        <div className="container">
          <div className="topic-strip">
            {TOPICS.map((t) => (
              <span key={t} className="topic-chip">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="tile">
        <div className="container">
          <div className="case-grid">
            {ARTICLES.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 100}>
                <article className="case-card" data-testid={`insight-${i}`}>
                  <span className="case-meta">{a.tag} · {a.minutes}</span>
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                  <Link to="/contact" className="link-arrow" style={{ marginTop: "auto" }}>
                    Read article <ArrowRight size={16} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <Reveal>
          <h2>Want this delivered?</h2>
          <p>One thoughtful note a month. No fluff, no "ten tips" lists.</p>
          <div style={{ marginTop: 30 }}>
            <Link to="/contact" className="btn btn-primary">Subscribe</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
