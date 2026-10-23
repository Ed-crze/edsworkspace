"use client";
import { useEffect } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { usePointerFine } from "@/lib/hooks";

// Custom pointer for mouse users: a dot that sticks to the mouse and a ring that glides after it.
// The native arrow is hidden only after the first mouse move, and only over non-text areas.
export default function Cursor() {
  const reduce = useReducedMotion();
  const fine = usePointerFine();
  const dx = useMotionValue(-100);
  const dy = useMotionValue(-100);
  const rx = useSpring(useMotionValue(-100), { stiffness: 220, damping: 24, mass: 0.6 });
  const ry = useSpring(useMotionValue(-100), { stiffness: 220, damping: 24, mass: 0.6 });
  const ringScale = useSpring(useMotionValue(1), { stiffness: 300, damping: 24 });
  const opacity = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (reduce || !fine) return;
    const root = document.documentElement;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      root.classList.add("has-cursor");
      dx.set(e.clientX - 4);
      dy.set(e.clientY - 4);
      rx.set(e.clientX - 18);
      ry.set(e.clientY - 18);
      const el = e.target as Element | null;
      const text = el?.closest("input, textarea, select");
      opacity.set(text ? 0 : 1);
      ringScale.set(el?.closest("a, button, [role='button'], summary") ? 1.6 : 1);
    };
    const leave = () => opacity.set(0);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      root.classList.remove("has-cursor");
    };
  }, [reduce, fine, dx, dy, rx, ry, ringScale, opacity]);

  if (reduce || !fine) return null;
  return (
    <>
      <m.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-9 w-9 rounded-full border-[1.5px] border-white mix-blend-difference"
        style={{ x: rx, y: ry, scale: ringScale, opacity }}
      />
      <m.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{ x: dx, y: dy, opacity }}
      />
    </>
  );
}
