"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Roll } from "./Roll";
import { usePointerFine } from "@/lib/hooks";
import { SPRING } from "@/lib/motion";

type Props = {
  label?: string;
  children?: ReactNode;
  href?: string;
  download?: boolean;
  variant?: "primary" | "ghost" | "light" | "glass";
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

const RADIUS = 60;
const MAX = 8;

export function MagneticButton({
  label,
  children,
  href,
  download,
  variant = "primary",
  arrow,
  className = "",
  type = "button",
  disabled,
  onClick,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const fine = usePointerFine();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  useEffect(() => {
    if (reduce || !fine) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const outX = Math.max(Math.abs(dx) - r.width / 2, 0);
      const outY = Math.max(Math.abs(dy) - r.height / 2, 0);
      if (Math.hypot(outX, outY) <= RADIUS) {
        x.set(Math.max(-MAX, Math.min(MAX, dx * 0.25)));
        y.set(Math.max(-MAX, Math.min(MAX, dy * 0.25)));
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, fine, x, y]);

  const cls = `btn roll-host btn-${variant} ${className}`;
  const inner = children ?? (
    <>
      <Roll>{label ?? ""}</Roll>
      {arrow ? <ArrowRight size={16} className="arrow" aria-hidden="true" /> : null}
    </>
  );
  const motionProps = { style: { x, y }, whileTap: { scale: 0.97 } };

  if (href) {
    return (
      <m.a
        ref={(n: HTMLAnchorElement | null) => {
          ref.current = n;
        }}
        href={href}
        download={download ? "" : undefined}
        className={cls}
        {...motionProps}
      >
        {inner}
      </m.a>
    );
  }
  return (
    <m.button
      ref={(n: HTMLButtonElement | null) => {
        ref.current = n;
      }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cls}
      {...motionProps}
    >
      {inner}
    </m.button>
  );
}
