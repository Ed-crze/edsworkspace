"use client";
import { useRef } from "react";
import { useInView } from "motion/react";
import { tools } from "@/lib/content";

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const row = (copy: 1 | 2) => (
    <ul
      key={copy}
      data-copy={copy}
      aria-hidden={copy === 2 ? "true" : undefined}
      className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16"
    >
      {tools.items.map((t) => (
        <li key={t} className="text-lg font-semibold opacity-55 md:text-xl">
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={tools.label} className="px-6 py-14 md:px-16">
      <p className="mb-8 text-center font-mono text-[11px] text-muted">{tools.label}</p>
      <div ref={ref} data-active={inView} className="marquee mx-auto max-w-[1200px]">
        <div className="marquee-track">
          {row(1)}
          {row(2)}
        </div>
      </div>
    </section>
  );
}
