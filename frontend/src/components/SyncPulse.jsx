import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, ArrowDownRight, TrendingUp, Eye, BarChart3,
  Repeat, Zap, AlertTriangle, Bell, Monitor, Smartphone as PhoneIcon, Tv, Tablet,
  Video, Youtube, Share2, Globe
} from "lucide-react";

/**
 * Sync Pulse — premium, data-rich analytics showcase.
 * Desktop: Left copy / Right large phone mockup
 * Mobile: Phone on top, copy below.
 * Phone interior is dark regardless of site theme.
 */

const PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.syncmedia.demo_sdk&hl=en";

/* Snapshot rotation — phone metrics refresh every 2-3s for a live feel */
const SNAPSHOTS = [
  { hero: 19.4, dedup: 94, lift: 3.2, freq: 2.1, waste: 12, tv: 38, ott: 27, youtube: 16, meta: 12, digital: 7,  trend: 24, updated: "2 min ago" },
  { hero: 21.7, dedup: 95, lift: 3.4, freq: 1.9, waste: 9,  tv: 41, ott: 26, youtube: 15, meta: 11, digital: 7,  trend: 28, updated: "just now"  },
  { hero: 18.6, dedup: 92, lift: 3.0, freq: 2.3, waste: 14, tv: 36, ott: 29, youtube: 17, meta: 12, digital: 6,  trend: 19, updated: "1 min ago" },
  { hero: 22.9, dedup: 96, lift: 3.6, freq: 1.8, waste: 8,  tv: 42, ott: 25, youtube: 16, meta: 10, digital: 7,  trend: 31, updated: "just now"  },
  { hero: 20.3, dedup: 93, lift: 3.3, freq: 2.0, waste: 11, tv: 39, ott: 27, youtube: 16, meta: 11, digital: 7,  trend: 26, updated: "just now"  },
];

/* ─────────── primitives ─────────── */

function CountUp({ to, decimals = 0, suffix = "", prefix = "", duration = 1.2, active }) {
  const [val, setVal] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    if (!active) return;
    const controls = animate(fromRef.current, to, {
      duration,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setVal(v),
      onComplete: () => { fromRef.current = to; },
    });
    return () => controls.stop();
  }, [to, duration, active]);
  return (
    <span>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Sparkline({ active }) {
  // 24 data points (hourly) with an upward drift
  const data = [
    22, 24, 21, 26, 28, 30, 27, 32, 31, 34, 36, 35, 38, 40, 43, 41, 45, 48, 46, 50, 52, 55, 58, 62,
  ];
  const w = 280;
  const h = 88;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const step = w / (data.length - 1);
  const pts = data.map((d, i) => [i * step, h - ((d - min) / (max - min)) * (h - 10) - 4]);
  const path = pts.reduce((acc, [x, y], i) => acc + (i === 0 ? `M${x},${y}` : ` L${x},${y}`), "");
  const area = `${path} L${w},${h} L0,${h} Z`;
  const last = pts[pts.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="sp-spark-svg">
      <defs>
        <linearGradient id="spSparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4da3ff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#4da3ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="spSparkStroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#0a84ff" />
          <stop offset="100%" stopColor="#5fb0ff" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#spSparkFill)"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#spSparkStroke)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.2, 0.7, 0.2, 1] }}
      />
      <motion.circle
        cx={last[0]}
        cy={last[1]}
        r="4"
        fill="#5fb0ff"
        initial={{ scale: 0, opacity: 0 }}
        animate={active ? { scale: [0, 1.4, 1], opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.6 }}
      />
      <motion.circle
        cx={last[0]}
        cy={last[1]}
        r="4"
        fill="none"
        stroke="#5fb0ff"
        strokeWidth="1.5"
        initial={{ scale: 1, opacity: 0 }}
        animate={active ? { scale: [1, 2.4], opacity: [0.9, 0] } : {}}
        transition={{ duration: 1.6, repeat: Infinity, delay: 2 }}
      />
    </svg>
  );
}

function MetricCard({ icon: Icon, label, value, delta, tone = "up", active, delay = 0, valueSuffix = "", decimals = 0, testid }) {
  const trendIcon = tone === "up" ? <ArrowUpRight size={11} strokeWidth={2.4} /> : tone === "down" ? <ArrowDownRight size={11} strokeWidth={2.4} /> : null;
  return (
    <motion.div
      className="sp-metric"
      data-testid={testid}
      initial={{ opacity: 0, y: 10 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div className="sp-metric-head">
        <span className="sp-metric-ico"><Icon size={11} strokeWidth={2} /></span>
        <span className="sp-metric-label">{label}</span>
      </div>
      <div className="sp-metric-val">
        <CountUp to={value} decimals={decimals} suffix={valueSuffix} active={active} />
      </div>
      {delta ? (
        <div className={`sp-metric-delta tone-${tone}`}>
          {trendIcon}<span>{delta}</span>
        </div>
      ) : <div className="sp-metric-delta sp-healthy">healthy</div>}
    </motion.div>
  );
}

function ChannelBar({ label, icon: Icon, pct, active, delay }) {
  return (
    <div className="sp-ch-row">
      <span className="sp-ch-label">
        <Icon size={11} strokeWidth={2} /> {label}
      </span>
      <div className="sp-ch-track">
        <motion.span
          className="sp-ch-fill"
          initial={{ width: 0 }}
          animate={active ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.2, 0.7, 0.2, 1] }}
        />
      </div>
      <span className="sp-ch-pct">{pct}%</span>
    </div>
  );
}

/* ─────────── Phone ─────────── */

function PhoneMockup({ active, snap }) {
  const ref = useRef(null);
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty("--lx", `${(x * 100 + 50).toFixed(0)}%`);
    el.style.setProperty("--ly", `${(y * 100 + 40).toFixed(0)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "-4deg");
    el.style.setProperty("--ry", "-6deg");
  };
  useEffect(() => {
    onLeave(); // set default tilt
    // eslint-disable-next-line
  }, []);

  // Scale the whole stage (phone + side chips) as a single image on narrow viewports
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const DESIGN_WIDTH = 660;
    let rafId = 0;
    const apply = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const w = wrap.clientWidth;
        const s = Math.min(1, w / DESIGN_WIDTH);
        canvas.style.transform = `scale(${s})`;
        const h = canvas.scrollHeight * s;
        wrap.style.height = h + "px";
      });
    };
    apply();
    const parent = wrap.parentElement;
    const ro = new ResizeObserver(apply);
    if (parent) ro.observe(parent);
    const onResize = () => apply();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    const t1 = setTimeout(apply, 200);
    const t2 = setTimeout(apply, 800);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="sp-stage-canvas-wrap" ref={wrapRef} data-testid="sp-stage-canvas-wrap">
      <div className="sp-stage-canvas" ref={canvasRef}>
    <div className="sp-stage">
      <div className="sp-halo" aria-hidden="true" />
      <div
        ref={ref}
        className="sp-phone"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-testid="sync-pulse-phone"
      >
        <div className="sp-phone-body">
          <div className="sp-phone-notch" />
          <div className="sp-phone-screen">
            {/* Top bar */}
            <div className="sp-topbar">
              <div className="sp-topbar-l">
                <span className="sp-livedot" />
                <span className="sp-live-text">Live</span>
                <span className="sp-topbar-sep">·</span>
                <span className="sp-topbar-updated" key={snap.updated}>Updated {snap.updated}</span>
              </div>
              <div className="sp-avatar" data-testid="sp-avatar">RM</div>
            </div>

            <div className="sp-screen-scroll">
              {/* Hero card */}
              <motion.div
                className="sp-hero"
                initial={{ opacity: 0, y: 14 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                data-testid="sp-hero-card"
              >
                <div className="sp-hero-bg" />
                <div className="sp-hero-head">
                  <span className="sp-hero-eyebrow">
                    <Zap size={10} strokeWidth={2.4} /> Live Impact
                  </span>
                  <span className="sp-hero-badge">24h</span>
                </div>
                <div className="sp-hero-value" data-testid="sp-hero-value">
                  +<CountUp to={snap.hero} decimals={1} suffix="%" active={active} />
                </div>
                <div className="sp-hero-sub">
                  incremental reach <span className="sp-dot-sep">·</span> vs baseline
                </div>
                <div className="sp-hero-spark"><Sparkline active={active} /></div>
              </motion.div>

              {/* 2x2 Metrics */}
              <div className="sp-grid">
                <MetricCard icon={Eye}    label="Dedup"     value={snap.dedup}  valueSuffix="%"  delta="2% vs yest." tone="down"    active={active} delay={0.2} testid="sp-metric-dedup" />
                <MetricCard icon={BarChart3} label="Lift"   value={snap.lift} decimals={1} valueSuffix="x" delta="0.4x" tone="up"  active={active} delay={0.28} testid="sp-metric-lift" />
                <MetricCard icon={Repeat} label="Frequency" value={snap.freq} decimals={1} valueSuffix=" avg"                           active={active} delay={0.36} testid="sp-metric-frequency" />
                <MetricCard icon={AlertTriangle} label="Wastage" value={snap.waste} valueSuffix="%" delta="flag" tone="warn"          active={active} delay={0.44} testid="sp-metric-wastage" />
              </div>

              {/* Reach trend */}
              <motion.div
                className="sp-trend"
                initial={{ opacity: 0, y: 10 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                data-testid="sp-trend-card"
              >
                <div className="sp-trend-head">
                  <div>
                    <div className="sp-trend-title">Reach Trend</div>
                    <div className="sp-trend-sub">Last 24h · cross-screen</div>
                  </div>
                  <span className="sp-trend-tag">
                    <TrendingUp size={10} strokeWidth={2.4} /> +{snap.trend}%
                  </span>
                </div>
                <div className="sp-trend-chart"><Sparkline active={active} /></div>
              </motion.div>

              {/* Alert */}
              <motion.div
                className="sp-alert"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={active ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                data-testid="sp-alert"
              >
                <div className="sp-alert-ico"><AlertTriangle size={14} strokeWidth={2} /></div>
                <div className="sp-alert-body">
                  <div className="sp-alert-title">Frequency spike on Connected TV</div>
                  <div className="sp-alert-sub">15% budget overlap · last 6h</div>
                </div>
                <button type="button" className="sp-alert-cta" data-testid="sp-alert-cta">
                  Optimize <ArrowRight size={10} strokeWidth={2.4} />
                </button>
              </motion.div>

              {/* Channels */}
              <motion.div
                className="sp-channels"
                initial={{ opacity: 0, y: 10 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                data-testid="sp-channels"
              >
                <div className="sp-ch-head">Channel mix</div>
                <ChannelBar label="TV"      icon={Tv}      pct={snap.tv}      active={active} delay={0.8} />
                <ChannelBar label="OTT"     icon={Video}   pct={snap.ott}     active={active} delay={0.9} />
                <ChannelBar label="YouTube" icon={Youtube} pct={snap.youtube} active={active} delay={1.0} />
                <ChannelBar label="Meta"    icon={Share2}  pct={snap.meta}    active={active} delay={1.1} />
                <ChannelBar label="Digital" icon={Globe}   pct={snap.digital} active={active} delay={1.2} />
              </motion.div>

              <div className="sp-foot">
                <span className="sp-foot-dot" />
                Synced with Kantar cross-media panel
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Side floating chips */}
        <motion.div
          className="sp-chip sp-chip-a"
          initial={{ opacity: 0, x: -20, y: 10 }}
          animate={active ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          data-testid="sp-chip-alert"
        >
          <span className="sp-chip-ico sp-chip-ico-alert"><Bell size={12} strokeWidth={2} /></span>
          <div>
            <div className="sp-chip-title">Push alert</div>
            <div className="sp-chip-sub">CTV overlap detected</div>
          </div>
        </motion.div>

        <motion.div
          className="sp-chip sp-chip-b"
          initial={{ opacity: 0, x: 20, y: -10 }}
          animate={active ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          data-testid="sp-chip-lift"
        >
          <span className="sp-chip-ico sp-chip-ico-up"><TrendingUp size={12} strokeWidth={2} /></span>
          <div>
            <div className="sp-chip-title">Outcome lift</div>
            <div className="sp-chip-sub">+{snap.hero.toFixed(1)}% · 24h</div>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
}

/* ─────────── Section ─────────── */

export default function SyncPulse() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px -15% 0px" });
  const [snapIdx, setSnapIdx] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let t;
    const tick = () => {
      setSnapIdx((i) => (i + 1) % SNAPSHOTS.length);
      t = setTimeout(tick, 2000 + Math.random() * 1000); // 2–3s
    };
    t = setTimeout(tick, 2000 + Math.random() * 1000);
    return () => clearTimeout(t);
  }, [inView]);
  const snap = SNAPSHOTS[snapIdx];

  return (
    <section
      ref={sectionRef}
      className="sp-section"
      data-testid="sync-pulse-section"
      aria-label="Sync Pulse mobile app"
    >
      <div className="sp-aurora" aria-hidden="true">
        <span className="sp-aurora-a" />
        <span className="sp-aurora-b" />
        <span className="sp-aurora-grid" />
      </div>

      <div className="container sp-container">
        {/* LEFT — COPY */}
        <motion.div
          className="sp-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sp-eyebrow" data-testid="sp-eyebrow">
            <span className="sp-eyebrow-dot" />
            Sync Pulse · Mobile
          </span>

          <h2 className="sp-title" data-testid="sp-title">
            Sync <span className="sp-title-accent">Pulse</span>
          </h2>

          <p className="sp-lede">
            Your cross-media intelligence — in your pocket. Track reach, frequency,
            and outcome lift in real time, across every screen. Built for operators
            who decide on the move.
          </p>

          <ul className="sp-bullets" data-testid="sp-bullets">
            <li>
              <span className="sp-bullet-ico"><Eye size={16} strokeWidth={2} /></span>
              <div>
                <b>Live cross-screen reach &amp; dedup</b>
                <span>One audience view, de-duplicated across TV, CTV, YouTube &amp; digital.</span>
              </div>
            </li>
            <li>
              <span className="sp-bullet-ico"><BarChart3 size={16} strokeWidth={2} /></span>
              <div>
                <b>Outcome-tied lift, refreshed hourly</b>
                <span>Search, commerce &amp; app response connected to exposure in near-real-time.</span>
              </div>
            </li>
            <li>
              <span className="sp-bullet-ico"><Bell size={16} strokeWidth={2} /></span>
              <div>
                <b>Push alerts on frequency waste</b>
                <span>Catch overlap and over-delivery before it eats the plan.</span>
              </div>
            </li>
          </ul>

          <div className="sp-cta">
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary sp-btn"
              data-testid="sync-pulse-play-cta"
            >
              Get on Google Play <ArrowRight size={16} />
            </a>
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sp-link"
              data-testid="sync-pulse-learn"
            >
              See it live <ArrowRight size={14} />
            </a>
          </div>

          <div className="sp-trust" data-testid="sp-trust">
            <span className="sp-trust-label">Powered in partnership with</span>
            <img
              src="/kantar-logo.png"
              alt="Kantar"
              className="sp-trust-logo"
              loading="lazy"
            />
          </div>

          <div className="sp-stats" data-testid="sp-stats">
            <div className="sp-stat">
              <div className="sp-stat-value">TV · CTV</div>
              <div className="sp-stat-label">YouTube &amp; Digital — one view</div>
            </div>
            <div className="sp-stat">
              <div className="sp-stat-value">&lt; 60s</div>
              <div className="sp-stat-label">Data refresh latency</div>
            </div>
            <div className="sp-stat">
              <div className="sp-stat-value">Android</div>
              <div className="sp-stat-label">iOS coming soon</div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — PHONE */}
        <div className="sp-right">
          <PhoneMockup active={inView} snap={snap} />
        </div>
      </div>
    </section>
  );
}
