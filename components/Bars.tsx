"use client";
import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { BAR_AREA_HEIGHT, BAR_COUNT, BAR_PITCH, BAR_WIDTH, barHeights } from "@/lib/bars";

const HEIGHTS = barHeights();
const WIDTH = BAR_COUNT * BAR_PITCH;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

type Props = {
  /** "mount": grow after `delay` seconds. "view": grow when scrolled into view. */
  trigger?: "mount" | "view";
  delay?: number;
  interactive?: boolean;
  barColor?: string;
  className?: string;
};

// Static SVG rendered on the server (visible without JavaScript). The client adds grow, idle drift and pointer swell.
export function Bars({ trigger = "mount", delay = 0, interactive = false, barColor, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const gid = useId().replace(/:/g, "");

  // Collapse the bars before first paint so they can grow in.
  useLayoutEffect(() => {
    if (reduce) return;
    svgRef.current?.querySelectorAll<SVGRectElement>(".bar-rect").forEach((r) => {
      r.style.transform = "scaleY(0)";
    });
  }, [reduce]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg || reduce) return;
    const rects = Array.from(svg.querySelectorAll<SVGRectElement>(".bar-rect"));
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let raf = 0;
    let running = false;
    let visible = false;
    let started = false;
    let t0 = 0;
    const pointer = { x: -9999, on: false };
    const swell = new Float32Array(rects.length);
    const centre = (rects.length - 1) / 2;

    const frame = (now: number) => {
      const wrapRect = wrap.getBoundingClientRect();
      const svgLeft = svg.getBoundingClientRect().left;
      const t = (now - t0) / 1000;
      for (let i = 0; i < rects.length; i++) {
        const x = svgLeft + i * BAR_PITCH + BAR_WIDTH / 2;
        // Only animate bars that are on screen.
        if (x < wrapRect.left - 16 || x > wrapRect.right + 16) continue;
        const d = Math.abs(i - centre) * 0.012;
        const g = easeOut(Math.min(1, Math.max(0, (t - d) / 1.2)));
        const grown = g >= 1;
        const drift = grown ? 1 + 0.06 * Math.sin(now / 2200 + i * 0.35) : 1;
        let target = 0;
        if (pointer.on) {
          const dist = Math.abs(x - pointer.x);
          if (dist < 160) target = 0.35 * Math.pow(1 - dist / 160, 2);
        }
        swell[i] += (target - swell[i]) * 0.14;
        rects[i].style.transform = `scaleY(${(g * drift * (1 + swell[i])).toFixed(4)})`;
      }
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const shouldRun = started && visible && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const start = () => {
      started = true;
      t0 = performance.now();
      sync();
    };

    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && trigger === "view" && !started) start();
        sync();
      },
      { threshold: trigger === "view" ? 0.25 : 0 },
    );
    io.observe(wrap);
    if (trigger === "mount") timer = window.setTimeout(start, delay * 1000);

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
    };
    if (interactive && fine) {
      wrap.addEventListener("pointermove", onMove, { passive: true });
      wrap.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", sync);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [reduce, trigger, delay, interactive]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: BAR_AREA_HEIGHT, ...(barColor ? { ["--bar" as string]: barColor } : {}) }}
    >
      <svg
        ref={svgRef}
        width={WIDTH}
        height={BAR_AREA_HEIGHT}
        viewBox={`0 0 ${WIDTH} ${BAR_AREA_HEIGHT}`}
        className="absolute bottom-0 left-1/2 max-w-none -translate-x-1/2"
        focusable="false"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--bar)" stopOpacity="0" />
            <stop offset="0.75" stopColor="var(--bar)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--bar)" stopOpacity="1" />
          </linearGradient>
        </defs>
        {HEIGHTS.map((h, i) => (
          <rect
            key={i}
            className="bar-rect"
            x={i * BAR_PITCH}
            y={BAR_AREA_HEIGHT - h}
            width={BAR_WIDTH}
            height={h}
            fill={`url(#${gid})`}
          />
        ))}
      </svg>
    </div>
  );
}
