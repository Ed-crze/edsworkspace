import type Lenis from "lenis";
import { easeInOut } from "./motion";

let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

const NAV_OFFSET = 88;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (instance) {
    instance.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.2, easing: easeInOut });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - (id === "top" ? 0 : NAV_OFFSET);
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }
  history.replaceState(null, "", `#${id}`);
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
