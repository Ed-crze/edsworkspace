// Decides whether the first-visit intro plays (all screen sizes; skipped for reduced motion). Used by Intro and Hero so they agree.
export const INTRO_KEY = "es-intro";
export const INTRO_MS = 1100;

export function introShouldPlay(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) !== "1";
  } catch {
    return false;
  }
}
