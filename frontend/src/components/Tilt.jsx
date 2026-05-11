import React, { useRef } from "react";

/**
 * Tilt — wrap any element to add mouse-tracked 3D tilt with depth.
 * Pure CSS perspective; falls back gracefully on touch devices.
 *
 * Props:
 *  - max: maximum tilt in degrees (default 8)
 *  - scale: hover scale (default 1.02)
 *  - perspective: px (default 1000)
 *  - glare: bool — render a soft moving glare overlay
 */
export default function Tilt({
  children,
  max = 8,
  scale = 1.02,
  perspective = 1000,
  glare = true,
  className = "",
  ...rest
}) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    el.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
    el.style.setProperty("--tilt-s", scale.toString());
    el.style.setProperty("--tilt-gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--tilt-gy", `${(py * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-rx", "0deg");
    el.style.setProperty("--tilt-ry", "0deg");
    el.style.setProperty("--tilt-s", "1");
  };

  return (
    <div
      ref={ref}
      className={`tilt-wrap ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: `${perspective}px` }}
      {...rest}
    >
      <div className="tilt-inner">
        {children}
        {glare && <span className="tilt-glare" aria-hidden="true" />}
      </div>
    </div>
  );
}
