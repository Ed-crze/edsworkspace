"use client";
import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT, REVEAL_OFFSET } from "@/lib/motion";
import { useIsMobile } from "@/lib/hooks";

type Props = { children: ReactNode; delay?: number; y?: number; className?: string };

export function Reveal({ children, delay = 0, y, className }: Props) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  if (reduce) return <div className={className}>{children}</div>;
  const offset = y ?? (mobile ? REVEAL_OFFSET.mobile : REVEAL_OFFSET.desktop);
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DUR.reveal, delay, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}

type FadeProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: number;
  go?: boolean; // when set, animate on this flag instead of on scroll
  className?: string;
};

// Fade up with blur. Used for pill labels, subtitles and the hero extras.
export function Fade({ children, delay = 0, y = 12, blur = 6, go, className }: FadeProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const from = { opacity: 0, y, filter: `blur(${blur}px)` };
  const to = { opacity: 1, y: 0, filter: "blur(0px)" };
  const transition = { duration: DUR.reveal, delay, ease: EASE_OUT };
  return (
    <m.div
      data-reveal
      className={className}
      initial={from}
      {...(go === undefined
        ? { whileInView: to, viewport: { once: true, margin: "-80px" } }
        : { animate: go ? to : from })}
      transition={transition}
    >
      {children}
    </m.div>
  );
}
