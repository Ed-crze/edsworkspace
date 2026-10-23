"use client";
import { useEffect, useState } from "react";
import { m } from "motion/react";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { INTRO_KEY, INTRO_MS, introShouldPlay } from "@/lib/intro";

const BARS = Array.from({ length: 56 }, (_, i) => 30 + ((Math.sin(i * 1.7) + 1) / 2) * 90);

// First visit per session only. Client-only and aria-hidden: the page content is already in the DOM underneath.
export default function Intro() {
  const [play] = useState(introShouldPlay);
  const [blocking, setBlocking] = useState(true);

  useEffect(() => {
    if (!play) return;
    const t = window.setTimeout(() => {
      setBlocking(false);
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* storage unavailable: intro may replay, which is fine */
      }
    }, INTRO_MS);
    return () => window.clearTimeout(t);
  }, [play]);

  if (!play) return null;
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      style={{ pointerEvents: blocking ? "auto" : "none" }}
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.8, delay: 0.3, ease: EASE_IN_OUT }}
    >
      <div className="absolute inset-x-0 bottom-0 flex h-40 items-end justify-center gap-[6px] overflow-hidden">
        {BARS.map((h, i) => (
          <m.span
            key={i}
            className="w-[2px] shrink-0 origin-bottom bg-[var(--bar)]"
            style={{ height: h }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: i * 0.006, ease: EASE_OUT }}
          />
        ))}
      </div>
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink font-sans text-lg font-semibold text-on-ink">
        ES
      </div>
    </m.div>
  );
}
