import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const DEFAULT_FAQS = [
  {
    q: "What is single-source cross-media measurement?",
    a: "Single-source cross-media measurement means measuring TV, OTT, CTV, YouTube, mobile and commerce exposure from the same observed audience source, then connecting those exposures to outcomes. SYNC helps brands understand who saw what, where they saw it, how often they saw it, and what happened after.",
  },
  {
    q: "Why does de-duplication matter?",
    a: "De-duplication shows the real audience reached across TV, OTT, CTV, YouTube, mobile and commerce, not the inflated total created by adding platform reports together. Without de-duplication, brands may keep paying to reach the same people again and again, creating hidden media wastage. It also reveals the true CPM — the real cost paid for unique online ad exposures — so teams can separate genuine incremental reach from repeated impressions.",
  },
  {
    q: "What outcomes can SYNC measure?",
    a: "SYNC can connect media exposure to downstream consumer actions such as brand search, commerce search, app activity, website behaviour and add-to-cart events. This helps brands move beyond impressions and understand which media combinations are actually influencing business outcomes.",
  },
  {
    q: "Who is this useful for?",
    a: "SYNC is useful for advertisers, media agencies, broadcasters, OTT platforms, publishers and marketing leaders who need a single view of cross-media reach, frequency, overlap and outcomes. It is built for teams that want better planning, sharper optimisation and stronger proof of media effectiveness.",
  },
  {
    q: "How does this differ from platform reporting?",
    a: "Platform reporting shows performance inside one platform's own environment. SYNC measures across platforms, screens and outcomes, so brands can see the full media journey instead of separate channel snapshots. That means clearer attribution, better de-duplication and more confident budget decisions.",
  },
];

function FaqItem({ q, a, isOpen, onToggle, idx }) {
  const bodyRef = useRef(null);
  const [maxH, setMaxH] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setMaxH(isOpen ? bodyRef.current.scrollHeight : 0);
    }
  }, [isOpen, a]);

  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`} data-testid={`faq-item-${idx}`}>
      <button
        type="button"
        className="faq-q"
        onClick={onToggle}
        aria-expanded={isOpen}
        data-testid={`faq-toggle-${idx}`}
      >
        <span className="faq-q-text">{q}</span>
        <span className="faq-q-icon" aria-hidden="true">
          <Plus size={18} />
        </span>
      </button>
      <div
        className="faq-a-wrap"
        style={{ maxHeight: maxH }}
        aria-hidden={!isOpen}
      >
        <div ref={bodyRef} className="faq-a">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({
  eyebrow = "FAQ",
  heading = "Questions teams ask before they decide.",
  sub = "Answers from the SYNC team.",
  faqs = DEFAULT_FAQS,
}) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq-section" data-testid="faq-section">
      <div className="container">
        <div className="faq-grid">
          <Reveal>
            <div className="faq-head">
              <span className="eyebrow">{eyebrow}</span>
              <h2>{heading}</h2>
              <p className="faq-sub">{sub}</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <FaqItem
                  key={f.q}
                  idx={i}
                  q={f.q}
                  a={f.a}
                  isOpen={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
