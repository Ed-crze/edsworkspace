import { cubicBezier } from "motion/react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const easeInOut = cubicBezier(0.65, 0, 0.35, 1);
export const SPRING = { type: "spring", stiffness: 260, damping: 30 } as const;
export const DUR = { micro: 0.18, ui: 0.35, reveal: 0.7, hero: 1.0 } as const;
export const STAGGER = { card: 0.08, word: 0.06, bar: 0.012 } as const;
export const REVEAL_OFFSET = { desktop: 30, mobile: 20 } as const;
