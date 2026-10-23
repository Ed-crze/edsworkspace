"use client";
import { m, motionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import type { Project } from "@/lib/content";

type Shape = { d: string; fill?: boolean };

const rh = (cx: number, cy: number, w: number, h: number) =>
  `M${cx} ${cy - h}L${cx + w} ${cy}L${cx} ${cy + h}L${cx - w} ${cy}Z`;
const circ = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;

const ticks = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  const p = (r: number) => `${(120 + Math.cos(a) * r).toFixed(1)} ${(80 + Math.sin(a) * r).toFixed(1)}`;
  return `M${p(40)}L${p(50)}`;
}).join("");

// Each variant has three layers (d1 to d3). On hover the layers shift by different amounts.
const ART: Record<Project["art"], Shape[][]> = {
  cards: [
    [{ d: rh(120, 108, 66, 28), fill: true }],
    [{ d: rh(120, 88, 66, 28), fill: true }],
    [{ d: rh(120, 68, 66, 28), fill: true }, { d: "M98 68L120 58L142 68" }],
  ],
  cube: [
    [{ d: "M70 58L70 106L120 132L120 84Z", fill: true }, { d: "M170 58L170 106L120 132L120 84Z", fill: true }],
    [{ d: rh(120, 58, 50, 26), fill: true }],
    [{ d: "M95 45L145 71" }, { d: "M145 45L95 71" }],
  ],
  grid: [
    [{ d: rh(120, 92, 80, 38), fill: true }],
    [
      { d: "M93.6 66.5L173.6 104.5" },
      { d: "M67.2 79.1L147.2 117.1" },
      { d: "M146.4 66.5L66.4 104.5" },
      { d: "M172.8 79.1L92.8 117.1" },
    ],
    [{ d: rh(120, 82, 16, 8), fill: true }],
  ],
  nodes: [
    [{ d: "M72 92L108 56" }, { d: "M132 56L168 92" }, { d: "M74 104L108 108" }, { d: "M128 108L170 104" }],
    [{ d: circ(60, 100, 14), fill: true }, { d: circ(120, 46, 14), fill: true }, { d: circ(180, 100, 14), fill: true }, { d: circ(120, 112, 10), fill: true }],
    [{ d: circ(120, 46, 4) }, { d: circ(60, 100, 4) }, { d: circ(180, 100, 4) }],
  ],
  chat: [
    [{ d: "M50 30h100a10 10 0 0 1 10 10v36a10 10 0 0 1-10 10H96l-16 16V86H50a10 10 0 0 1-10-10V40a10 10 0 0 1 10-10Z", fill: true }],
    [{ d: "M130 78h60a10 10 0 0 1 10 10v24a10 10 0 0 1-10 10h-6v14l-16-14h-38a10 10 0 0 1-10-10V88a10 10 0 0 1 10-10Z", fill: true }],
    [{ d: "M58 50h56" }, { d: "M58 62h36" }, { d: "M144 96h42" }, { d: "M144 108h26" }],
  ],
  image: [
    [{ d: "M64 30h112v92H64Z", fill: true }],
    [{ d: "M80 46h24v24H80Z" }, { d: "M112 46h24v24h-24Z" }, { d: "M144 46h16v24h-16Z" }, { d: "M80 78h24v24H80Z" }],
    [{ d: "M112 78h24v24h-24Z", fill: true }, { d: "M144 78h16v24h-16Z", fill: true }],
  ],
  shield: [
    [{ d: "M120 22L174 42V84C174 112 150 130 120 140C90 130 66 112 66 84V42Z", fill: true }],
    [{ d: "M96 82l16 16 32-34" }],
    [{ d: circ(120, 30, 3) }, { d: "M120 40V52" }],
  ],
  book: [
    [{ d: "M120 44C100 34 72 34 50 42V112C72 104 100 104 120 114Z", fill: true }, { d: "M120 44C140 34 168 34 190 42V112C168 104 140 104 120 114Z", fill: true }],
    [{ d: "M64 58C78 54 94 54 108 60" }, { d: "M64 72C78 68 94 68 108 74" }, { d: "M132 60C146 54 162 54 176 58" }, { d: "M132 74C146 68 162 68 176 72" }],
    [{ d: "M120 10l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z", fill: true }, { d: "M168 22l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" }],
  ],
  device: [
    [{ d: "M68 36H172V104H68Z", fill: true }, { d: "M46 112H194L182 126H58Z", fill: true }],
    [{ d: "M78 46H162V94H78Z" }],
    [{ d: "M104 70H136" }, { d: "M120 58V82" }, { d: circ(120, 70, 12) }],
  ],
  cipher: [
    [{ d: circ(120, 80, 52), fill: true }],
    [{ d: circ(120, 80, 32), fill: true }, { d: ticks }],
    [{ d: "M120 80L148 62" }, { d: circ(120, 80, 4), fill: true }],
  ],
};

function P({ d, i, fill }: { d: string; i: number; fill?: boolean }) {
  const reduce = useReducedMotion();
  const common = { d, fill: fill ? "var(--art-fill, var(--surface))" : "none", vectorEffect: "non-scaling-stroke" as const };
  if (reduce) return <path {...common} />;
  return (
    <m.path
      data-draw
      {...common}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, delay: i * 0.05, ease: EASE_OUT }}
    />
  );
}

export function LineArt({ variant, className = "" }: { variant: Project["art"]; className?: string }) {
  let n = 0;
  return (
    <svg
      viewBox="0 0 240 150"
      aria-hidden="true"
      focusable="false"
      className={`art h-full w-full text-ink ${className}`}
      fill="none"
      stroke="currentColor"
      strokeOpacity={0.7}
      strokeWidth={1}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {ART[variant].map((layer, li) => (
        <g key={li} className={`layer d${li + 1}`}>
          {layer.map((s) => (
            <P key={s.d} d={s.d} fill={s.fill} i={n++} />
          ))}
        </g>
      ))}
    </svg>
  );
}

const zero = motionValue(0);

function Sheet({ cy, k, progress }: { cy: number; k: number; progress?: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const y = useTransform(progress ?? zero, [0, 1], [0, -24 * k]);
  return (
    <m.g style={reduce ? undefined : { y }}>
      <path d={rh(120, cy, 92, 44)} fill="var(--art-fill, var(--surface))" vectorEffect="non-scaling-stroke" />
      <path d={`M${120 + 60} ${cy - 10}L${120 + 40} ${cy - 20}`} vectorEffect="non-scaling-stroke" />
      <path d={`M${120 - 52} ${cy + 4}L${120 + 4} ${cy + 28}`} vectorEffect="non-scaling-stroke" />
      <path d={`M${120 - 36} ${cy - 2}L${120 + 20} ${cy + 22}`} vectorEffect="non-scaling-stroke" />
    </m.g>
  );
}

// Tall stacked-documents illustration. The sheets separate as `progress` goes from 0 to 1.
export function ExplodedDocs({ progress }: { progress?: MotionValue<number> }) {
  return (
    <svg
      viewBox="0 0 240 400"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full text-ink"
      fill="none"
      stroke="currentColor"
      strokeOpacity={0.7}
      strokeWidth={1}
      strokeLinejoin="round"
      style={{ ["--art-fill" as string]: "var(--surface-raised)" }}
    >
      {[330, 270, 210, 150].map((cy, i) => (
        <Sheet key={cy} cy={cy} k={i} progress={progress} />
      ))}
    </svg>
  );
}
