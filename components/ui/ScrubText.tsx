"use client";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useHydrated } from "@/lib/hooks";

function Word({ w, i, n, progress, on }: { w: string; i: number; n: number; progress: MotionValue<number>; on: boolean }) {
  const start = (i / n) * 0.7;
  const opacity = useTransform(progress, [start, start + 0.3], [0.35, 1]);
  return <m.span style={on ? { opacity } : undefined}>{w}</m.span>;
}

// Words fade from 35% to 100% as the paragraph crosses the viewport.
// At rest (server, no JS, reduced motion) every word is at full opacity.
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  const on = hydrated && !reduce;
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <Word w={w} i={i} n={words.length} progress={scrollYProgress} on={on} />
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
