import React, { useState, useEffect, useRef, useMemo } from "react";
import { Zap, Tv, Play, Sparkles, Star } from "lucide-react";

/**
 * MediaOptimisationCarousel  (re-imagined as an interactive mini-dashboard)
 * Toggle "Enable SYNC" → smoothly transitions between baseline and optimised
 * states with animated numbers, a sliding NEW SYNC card, and an
 * optimisation-impact banner that flies in from the top.
 *
 * Auto-toggles every ~7s until the user interacts; interaction pauses auto.
 */

const BASELINE = {
  banner: false,
  channels: [
    { key: "tv",  name: "Television", sub: "108 channels", spend: 4.19,  spendUnit: "Cr", atc: 8900,  delta: null, Icon: Tv,    tone: "violet" },
    { key: "yt",  name: "YouTube",    sub: "Digital",      spend: 65.09, spendUnit: "L",  atc: 10700, delta: null, Icon: Play,  tone: "red" },
    { key: "jhs", name: "JioHotstar", sub: "Digital",      spend: 43.66, spendUnit: "L",  atc: 1700,  delta: null, Icon: Star,  tone: "blue" },
  ],
  syncCard: null,
  totalSpend: { val: 5.28, unit: "Cr" },
  baselineATC: 21400,
  optimisedATC: null,
};

const OPTIMISED = {
  banner: { liftPct: 39.8, incremental: 8506, totalLabel: "Budget Neutral", totalSpend: "₹5.28 Cr" },
  channels: [
    { key: "tv",  name: "Television", sub: "108 channels", spend: 3.77,  spendUnit: "Cr", atc: 8000,  delta: -10.0, deltaAtc: -10.0, Icon: Tv,    tone: "violet" },
    { key: "yt",  name: "YouTube",    sub: "Digital",      spend: 89.73, spendUnit: "L",  atc: 16100, delta: 37.9,  deltaAtc: 50.1,  Icon: Play,  tone: "red" },
    { key: "jhs", name: "JioHotstar", sub: "Digital",      spend: 21.05, spendUnit: "L",  atc: 916,   delta: -51.8, deltaAtc: -46.1, Icon: Star,  tone: "blue" },
  ],
  syncCard: { name: "SYNC", sub: "NEW", spend: 40.00, spendUnit: "L", atc: 4800, Icon: Sparkles },
  totalSpend: { val: 5.28, unit: "Cr" },
  baselineATC: 21400,
  optimisedATC: 29900,
};

/* Count-up hook — smoothly tweens numeric value */
function useTween(target, duration = 900) {
  const [val, setVal] = useState(target);
  const fromRef = useRef(target);
  const startRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (target === val) return undefined;
    cancelAnimationFrame(rafRef.current);
    fromRef.current = val;
    startRef.current = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - startRef.current) / duration);
      // easeOutCubic
      const e = 1 - Math.pow(1 - t, 3);
      const next = fromRef.current + (target - fromRef.current) * e;
      setVal(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return val;
}

const fmtSpend = (v, unit) =>
  `₹${v.toFixed(2)} ${unit}`;
const fmtAtc = (v) => {
  if (v == null) return "—";
  if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return `${Math.round(v)}`;
};

function ChannelCard({ ch, on }) {
  const tweenedSpend = useTween(ch.spend, 1100);
  const tweenedAtc = useTween(ch.atc, 1100);
  return (
    <div className={`mol-card mol-card-${ch.tone}`} data-testid={`mol-card-${ch.key}`}>
      <div className="mol-card-head">
        <span className={`mol-card-ico mol-card-ico-${ch.tone}`}>
          <ch.Icon size={14} strokeWidth={2.2} />
        </span>
        <div className="mol-card-titles">
          <span className="mol-card-name">{ch.name}</span>
          <span className="mol-card-sub">{ch.sub}</span>
        </div>
      </div>
      <div className="mol-card-metric">
        <div className="mol-card-mhead">
          <span className="mol-card-mlabel">SPEND</span>
          {on && ch.delta != null && (
            <span className={`mol-card-delta ${ch.delta > 0 ? "is-up" : "is-down"}`}>
              {ch.delta > 0 ? "+" : ""}{ch.delta.toFixed(1)}%
            </span>
          )}
        </div>
        <span className="mol-card-val">{fmtSpend(tweenedSpend, ch.spendUnit)}</span>
      </div>
      <div className="mol-card-metric">
        <div className="mol-card-mhead">
          <span className="mol-card-mlabel">ATC</span>
          {on && ch.deltaAtc != null && (
            <span className={`mol-card-delta ${ch.deltaAtc > 0 ? "is-up" : "is-down"}`}>
              {ch.deltaAtc > 0 ? "+" : ""}{ch.deltaAtc.toFixed(1)}%
            </span>
          )}
        </div>
        <span className="mol-card-val">{fmtAtc(tweenedAtc)}</span>
      </div>
    </div>
  );
}

function SyncCard({ on }) {
  const data = OPTIMISED.syncCard;
  const tweenedSpend = useTween(on ? data.spend : 0, 1100);
  const tweenedAtc = useTween(on ? data.atc : 0, 1100);
  return (
    <div className={`mol-card mol-card-sync ${on ? "is-on" : ""}`} data-testid="mol-card-sync">
      <div className="mol-card-head">
        <span className="mol-card-ico mol-card-ico-sync">
          <Sparkles size={14} strokeWidth={2.2} />
        </span>
        <div className="mol-card-titles">
          <span className="mol-card-name">SYNC</span>
          <span className="mol-card-sub mol-card-sub-new">NEW</span>
        </div>
      </div>
      <div className="mol-card-metric">
        <div className="mol-card-mhead">
          <span className="mol-card-mlabel">SPEND</span>
        </div>
        <span className="mol-card-val">{on ? fmtSpend(tweenedSpend, data.spendUnit) : "—"}</span>
      </div>
      <div className="mol-card-metric">
        <div className="mol-card-mhead">
          <span className="mol-card-mlabel">ATC</span>
        </div>
        <span className="mol-card-val">{on ? fmtAtc(tweenedAtc) : "—"}</span>
      </div>
    </div>
  );
}

function MetricBox({ label, value, accent = false, on = false, dim = false }) {
  return (
    <div className={`mol-metric ${accent ? "mol-metric-accent" : ""} ${on ? "is-on" : ""} ${dim ? "is-dim" : ""}`}>
      <span className="mol-metric-label">{label}</span>
      <span className="mol-metric-val">{value}</span>
    </div>
  );
}

export default function MediaOptimisationCarousel() {
  const [on, setOn] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const autoRef = useRef(null);

  // Auto-toggle every 7s until first user interaction
  useEffect(() => {
    if (interacted) return undefined;
    autoRef.current = setTimeout(() => setOn((s) => !s), 7000);
    return () => clearTimeout(autoRef.current);
  }, [on, interacted]);

  const handleToggle = () => {
    setInteracted(true);
    setOn((s) => !s);
  };

  const data = on ? OPTIMISED : BASELINE;
  const optAtc = useTween(on ? OPTIMISED.optimisedATC : 0, 1200);

  const liftTween = useTween(on ? OPTIMISED.banner.liftPct : 0, 900);
  const incTween = useTween(on ? OPTIMISED.banner.incremental : 0, 1200);

  return (
    <div className="mol" data-testid="media-optimisation-carousel" data-on={on ? "1" : "0"}>
      <div className="mol-backdrop" aria-hidden="true" />

      {/* Top impact banner */}
      <div className={`mol-banner ${on ? "is-on" : ""}`} aria-hidden={!on}>
        <div className="mol-banner-l">
          <span className="mol-banner-eyebrow">OPTIMISATION IMPACT</span>
          <span className="mol-banner-big">
            +{liftTween.toFixed(1)}<span className="mol-banner-unit">% ATC</span>
          </span>
          <span className="mol-banner-sub">+{Math.round(incTween).toLocaleString("en-IN")} incremental</span>
        </div>
        <div className="mol-banner-r">
          <span className="mol-banner-eyebrow">{OPTIMISED.banner.totalLabel}</span>
          <span className="mol-banner-mid">{OPTIMISED.banner.totalSpend}</span>
        </div>
      </div>

      {/* Channel cards row */}
      <div className={`mol-cards mol-cards-${on ? "4" : "3"}`}>
        {data.channels.map((ch) => (
          <ChannelCard key={ch.key} ch={ch} on={on} />
        ))}
        <SyncCard on={on} />
      </div>

      {/* Bottom metrics */}
      <div className="mol-metrics">
        <MetricBox label="TOTAL SPEND" value={`₹${BASELINE.totalSpend.val.toFixed(2)} ${BASELINE.totalSpend.unit}`} />
        <MetricBox label="BASELINE ATC" value={fmtAtc(BASELINE.baselineATC)} />
        <MetricBox
          label="OPTIMISED ATC"
          value={on ? fmtAtc(optAtc) : "—"}
          accent
          on={on}
          dim={!on}
        />
      </div>

      {/* Toggle */}
      <button
        type="button"
        className={`mol-toggle ${on ? "is-on" : ""}`}
        onClick={handleToggle}
        role="switch"
        aria-checked={on}
        data-testid="mol-toggle"
      >
        <span className="mol-toggle-ico">
          <Zap size={13} strokeWidth={2.4} />
        </span>
        <span className="mol-toggle-label">Enable SYNC</span>
        <span className="mol-toggle-track">
          <span className="mol-toggle-thumb" />
        </span>
      </button>
    </div>
  );
}
