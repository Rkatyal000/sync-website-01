import React, { useEffect, useRef } from "react";

/**
 * OrbitField — premium animated backdrop.
 *  - Floating glass orbs with parallax (mouse + scroll)
 *  - Animated gradient mesh
 *  - Soft grid overlay
 *  - Respects prefers-reduced-motion
 *
 * Use as the FIRST child inside a `position: relative` hero section.
 */
export default function OrbitField({ density = "default", tone = "blue" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`orbit-field orbit-field--${density} orbit-field--${tone}`}
      aria-hidden="true"
    >
      <span className="of-mesh" />
      <span className="of-grid" />
      <span className="of-orb of-orb-a" />
      <span className="of-orb of-orb-b" />
      <span className="of-orb of-orb-c" />
      <span className="of-orb of-orb-d" />
      <span className="of-ring of-ring-a" />
      <span className="of-ring of-ring-b" />
      <span className="of-spark of-spark-1" />
      <span className="of-spark of-spark-2" />
      <span className="of-spark of-spark-3" />
      <span className="of-spark of-spark-4" />
    </div>
  );
}
