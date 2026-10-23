"use client";
import type { ReactNode, PointerEvent } from "react";

// White card. When interactive, it lifts on hover and a soft spotlight follows the cursor.
export function SpotCard({
  children,
  interactive,
  className = "",
}: {
  children: ReactNode;
  interactive?: boolean;
  className?: string;
}) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div onPointerMove={onMove} className={`card ${interactive ? "card-i" : ""} ${className}`}>
      {children}
    </div>
  );
}
