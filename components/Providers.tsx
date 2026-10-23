"use client";
import type { ReactNode } from "react";
import { LazyMotion } from "motion/react";

// domMax adds layout animations (the navbar pill uses layoutId). It loads as a separate chunk.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
